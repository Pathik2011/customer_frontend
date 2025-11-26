import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ProductDetailsClient from './_components/ProductDetailsClient';
import { productService } from '@/services/productService';
import { Product } from '@/types/product';

async function getProductDetails(productId: string): Promise<Product | null> {
    const response = await productService.getProductById(productId);

    if (response.success && response.res) {
        return response.res;
    }

    console.error('Error fetching product details:', response.error);
    return null;
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ product_id: string }>;
}): Promise<Metadata> {
    const { product_id } = await params;
    const product = await getProductDetails(product_id);

    if (!product) {
        return {
            title: 'Product Not Found',
        };
    }

    return {
        title: `${product.product_name} - ${product.brand}`,
        description: product.description.substring(0, 160),
    };
}

export default async function ProductDetailsPage({
    params,
}: {
    params: Promise<{ product_id: string }>;
}) {
    const { product_id } = await params;
    const product = await getProductDetails(product_id);

    if (!product) {
        notFound();
    }

    return <ProductDetailsClient product={product} />;
}
