// src/hooks/useFilterData.ts
'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchFilterOptions } from '@/services/filterService';
import { QUERY_CONFIG } from '@/config/queryConfig';

export const useFilterData = () => {
  return useQuery({
    queryKey: ['filterOptions'],
    queryFn: () => {
       console.log('🔴 [useFilterData] FETCHING FILTERS FROM API (Not Cached)');
       return fetchFilterOptions();
    },
   staleTime: QUERY_CONFIG.FILTERS.STALE_TIME, 
    gcTime: QUERY_CONFIG.FILTERS.GC_TIME,
    
    // [!code ++] Debugging
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};