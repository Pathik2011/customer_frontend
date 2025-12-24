import { HomePageMidResponse } from '@/types/homeApi';
import { QUERY_CONFIG } from '@/config/queryConfig'; // [!code ++]  

export const getHomeMid = async (): Promise<HomePageMidResponse> => {
  const res = await fetch('https://6jk2hyyxsl.execute-api.ap-south-1.amazonaws.com/dev/user/homepage/sections/mid', {
    next: { revalidate: QUERY_CONFIG.HOME.REVALIDATE_TIME }
  });

  if (!res.ok) {
    throw new Error('Failed to fetch home mid section');
  }

  return res.json();
};