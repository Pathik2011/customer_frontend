import { HomePageBottomResponse } from '@/types/homeApi';
import { QUERY_CONFIG } from '@/config/queryConfig';
import { API_CONFIG } from '@/config/apiConfig'; // 🟢 Import Config

export const getHomeBottom = async (): Promise<HomePageBottomResponse> => {
  // 🟢 Use Config
  const res = await fetch(API_CONFIG.ENDPOINTS.HOME_BOTTOM, {
    next: { revalidate: QUERY_CONFIG.HOME.REVALIDATE_TIME }
  });

  if (!res.ok) {
    throw new Error('Failed to fetch home bottom section');
  }

  return res.json();
};
