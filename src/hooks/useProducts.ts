// src/hooks/useProducts.ts
'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchProducts } from '@/services/productService';
import { ProductFilters } from '@/types';
import { QUERY_CONFIG } from '@/config/queryConfig';

export const useProducts = (filters: ProductFilters) => {
  // [!code ++] DEBUG LOGS
  console.log('🔍 [useProducts] Hook initialized.');
  console.log('   👉 Current Filters:', filters);
  console.log('   ⏱️ Configured StaleTime:', QUERY_CONFIG?.PRODUCTS?.STALE_TIME);
  console.log('   🗑️ Configured GcTime:', QUERY_CONFIG?.PRODUCTS?.GC_TIME);

  return useInfiniteQuery({
    queryKey: ['products', filters],
    
    queryFn: async ({ pageParam = 0 }) => {
      // [!code ++] If you see this log, the Cache FAILED or Expired
      console.log(`🔴 [useProducts] FETCHING FROM API (Not Cached). Page: ${pageParam}`);
      return fetchProducts(pageParam as number, QUERY_CONFIG.PRODUCTS.PAGE_SIZE, filters);
    },
    
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < QUERY_CONFIG.PRODUCTS.PAGE_SIZE) {
        return undefined;
      }
      return allPages.length * QUERY_CONFIG.PRODUCTS.PAGE_SIZE;
    },

    // Apply Config
    staleTime: QUERY_CONFIG.PRODUCTS.STALE_TIME,
    gcTime: QUERY_CONFIG.PRODUCTS.GC_TIME,
    
    // [!code ++] Force it to NOT refetch on mount if data exists
    refetchOnMount: false, 
    refetchOnWindowFocus: false,
  });
};