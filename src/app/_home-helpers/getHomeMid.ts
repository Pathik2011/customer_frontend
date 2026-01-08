import { HomePageMidResponse } from '@/types/homeApi';
import { QUERY_CONFIG } from '@/config/queryConfig'; 
import { API_CONFIG } from '@/config/apiConfig'; // 🟢 Import Config

export const getHomeMid = async (): Promise<HomePageMidResponse> => {
  // 🟢 Use Config
  const res = await fetch(API_CONFIG.ENDPOINTS.HOME_MID, {
    next: { revalidate: QUERY_CONFIG.HOME.REVALIDATE_TIME }
  });

  if (!res.ok) {
    throw new Error('Failed to fetch home mid section');
  }

  return res.json();
};