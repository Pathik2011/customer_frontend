// // // src/services/filterService.ts
// // import { FilterApiResponse } from '@/types';

// // // Use env variable if available, otherwise default to the dev URL
// // const API_HOST = process.env.NEXT_PUBLIC_PRODUCT_API_URL || 'https://6jk2hyyxsl.execute-api.ap-south-1.amazonaws.com/dev';
// // const API_URL = `${API_HOST}/products/list-for-search-dropdown`;

// // export const fetchFilterOptions = async (): Promise<FilterApiResponse> => {
// //   try {
// //     // In Next.js 13+, you can configure caching here if needed
// //     // e.g. { next: { revalidate: 3600 } } for 1 hour cache
// //     const response = await fetch(API_URL);

// //     if (!response.ok) {
// //       throw new Error(`Failed to fetch filters: ${response.status}`);
// //     }

// //     const data = await response.json();
// //     return data;
// //   } catch (error) {
// //     console.error('Error fetching filter options:', error);
// //     throw error;
// //   }
// // };
// import { FilterApiResponse } from '@/types';
// import { QUERY_CONFIG } from '@/config/queryConfig'; // [!code ++]

// // Use env variable if available, otherwise default to the dev URL
// // const API_HOST = process.env.NEXT_PUBLIC_PRODUCT_API_URL;
// const API_HOST = process.env.NEXT_PUBLIC_PRODUCT_API_URL || 'https://6jk2hyyxsl.execute-api.ap-south-1.amazonaws.com/dev';
// // const API_URL = `${API_HOST}/products/list-for-search-dropdown`;
// // Construct the full URL using the base host
// const API_URL = `${API_HOST}/products/list-for-search-dropdown`;

// export const fetchFilterOptions = async (): Promise<FilterApiResponse> => {
//   try {
//     const response = await fetch(API_URL, {
//        // [!code ++] Enable Server-Side Caching (ISR)
//        // This prevents AWS from running the Lambda on every request
//        next: { revalidate: QUERY_CONFIG.FILTERS.REVALIDATE_TIME } 
//     });

//     if (!response.ok) {
//       throw new Error(`Failed to fetch filters: ${response.status}`);
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error fetching filter options:', error);
//     throw error;
//   }
// };
import { FilterApiResponse } from '@/types';
import { QUERY_CONFIG } from '@/config/queryConfig';
import { API_CONFIG } from '@/config/apiConfig'; // 🟢 Import Config

const API_URL = API_CONFIG.ENDPOINTS.FILTERS;

// [!code ++] Define Cache Key
const CACHE_KEY = 'filter_options_cache';

export const fetchFilterOptions = async (): Promise<FilterApiResponse> => {
  try {
    // [!code ++] 1. Check Client-Side LocalStorage first
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        const age = Date.now() - parsed.timestamp;
        
        // If cache is younger than the configured STALE_TIME (e.g., 1 hour), use it!
        if (age < QUERY_CONFIG.FILTERS.STALE_TIME) {
           console.log("🟢 [filterService] Serving Filters from LocalStorage (Instant)");
           return parsed.data;
        }
      }
    }

    // 2. If no cache, Fetch from Network (Server-Side Cache via 'next: revalidate')
    console.log("🌍 [filterService] Fetching Filters from Network...");
    const response = await fetch(API_URL, {
       next: { revalidate: QUERY_CONFIG.FILTERS.REVALIDATE_TIME } 
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch filters: ${response.status}`);
    }

    const data = await response.json();

    // [!code ++] 3. Save new data to LocalStorage for next time
    if (typeof window !== 'undefined') {
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        data,
        timestamp: Date.now()
      }));
    }

    return data;
  } catch (error) {
    console.error('Error fetching filter options:', error);
    throw error;
  }
};