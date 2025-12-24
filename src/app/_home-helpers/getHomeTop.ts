import { HomePageTopResponse } from '@/types/homeApi';
import { QUERY_CONFIG } from '@/config/queryConfig'; // [!code ++]

export const getHomeTop = async (): Promise<HomePageTopResponse> => {
  const res = await fetch('https://6jk2hyyxsl.execute-api.ap-south-1.amazonaws.com/dev/user/homepage/sections/top', {
    next: { revalidate: QUERY_CONFIG.HOME.REVALIDATE_TIME } // Re-fetch every 60 seconds
  });

  if (!res.ok) throw new Error('Failed to fetch home top section');
  return res.json();
};