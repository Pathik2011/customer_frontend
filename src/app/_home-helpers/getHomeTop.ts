import { HomePageTopResponse } from '@/types/homeApi';
import { QUERY_CONFIG } from '@/config/queryConfig';
import { API_CONFIG } from '@/config/apiConfig'; // 🟢 Import Config

export const getHomeTop = async (): Promise<HomePageTopResponse> => {
  // 🟢 Use Config
  const res = await fetch(API_CONFIG.ENDPOINTS.HOME_TOP, {
    next: { revalidate: QUERY_CONFIG.HOME.REVALIDATE_TIME } 
  });

  if (!res.ok) throw new Error('Failed to fetch home top section');
  return res.json();
};