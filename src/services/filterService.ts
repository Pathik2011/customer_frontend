
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