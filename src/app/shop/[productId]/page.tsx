import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import { fetchProductById } from '@/services/productService';
import ProductDetailClient from '@/components/shop/product/ProductDetailClient';

interface PageProps {
  params: Promise<{ productId: string }>;
}

// 1. Generate SEO Metadata (Server Side)
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { productId } = await params;
  
  try {
    const product = await fetchProductById(productId);
    
    return {
      title: `${product.product_name} | Sapana Fertilizers`,
      description: product.description.substring(0, 160), // SEO friendly description
      openGraph: {
        images: [product.image_url || ''],
      },
    };
  } catch (error) {
    return {
      title: 'Product Details | Sapana Fertilizers',
    };
  }
}

// 2. Main Server Page
export default async function ProductPage({ params }: PageProps) {
  const { productId } = await params;
  const queryClient = new QueryClient();

  // 3. Prefetch Product Data
  await queryClient.prefetchQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchProductById(productId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductDetailClient productId={productId} />
    </HydrationBoundary>
  );
}