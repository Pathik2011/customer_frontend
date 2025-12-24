import { HomePageBottomResponse } from '@/types/homeApi';
import { QUERY_CONFIG } from '@/config/queryConfig'; // [!code ++] 

export const getHomeBottom = async (): Promise<HomePageBottomResponse> => {
  const res = await fetch('https://6jk2hyyxsl.execute-api.ap-south-1.amazonaws.com/dev/user/homepage/sections/bottom', {
    next: { revalidate: QUERY_CONFIG.HOME.REVALIDATE_TIME }
  });

  if (!res.ok) {
    throw new Error('Failed to fetch home bottom section');
  }

  return res.json();
};