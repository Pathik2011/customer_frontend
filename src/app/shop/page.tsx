import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import { fetchProducts } from '@/services/productService';
import { ProductFilters } from '@/types';
import { QUERY_CONFIG } from '@/config/queryConfig';
import ShopClient from '@/components/shop/ShopClient';
import { Suspense } from 'react';

// SEO Metadata
export const metadata: Metadata = {
  title: 'Shop All Products | Sapana Fertilizers',
  description: 'Browse our wide range of agricultural products including fertilizers, seeds, and equipment.',
};

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ShopPage({ searchParams }: PageProps) {
  const queryClient = new QueryClient();
  const resolvedParams = await searchParams;

  // 1. Parse URL Params to match Filter Interface
  const parseArray = (param: string | string[] | undefined): string[] => {
    if (!param) return [];
    return Array.isArray(param) ? param : [param];
  };

  const filters: ProductFilters = {
    categories: parseArray(resolvedParams.category),
    brands: parseArray(resolvedParams.brand),
    crops: parseArray(resolvedParams.crop),
    minPrice: resolvedParams.min_price ? Number(resolvedParams.min_price) : undefined,
    maxPrice: resolvedParams.max_price ? Number(resolvedParams.max_price) : undefined,
  };

  // 2. Prefetch Infinite Query
  // Note: We match the exact key structure used in useProducts hook: ['products', filters]
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['products', filters],
    queryFn: ({ pageParam = 0 }) => fetchProducts(pageParam as number, QUERY_CONFIG.PRODUCTS.PAGE_SIZE, filters),
    initialPageParam: 0,
    // Note: We don't need staleTime here as dehydration handles it, 
    // but React Query defaults are fine.
  });

  return (
    // Suspense is required when using useSearchParams in the Client Component
    <Suspense fallback={<div className="h-screen w-full flex justify-center items-center">Loading Shop...</div>}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ShopClient />
      </HydrationBoundary>
    </Suspense>
  );
}