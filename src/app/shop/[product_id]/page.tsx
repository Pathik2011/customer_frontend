import { notFound } from "next/navigation";
import { Metadata } from "next";
import ProductDetailsClient from "./_components/ProductDetailsClient";
import { productService } from "@/services/productService";

async function getProductDetails(productId: string) {
    try {
        const product = await productService.getProductById(productId);
        return product;
    } catch (error) {
        console.error("Error fetching product details:", error);
        return null;
    }
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
            title: "Product Not Found",
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
