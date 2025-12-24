import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import HomeClient from './HomeClient';
import { getHomeTop } from '@/app/_home-helpers/getHomeTop';
import { getHomeMid } from '@/app/_home-helpers/getHomeMid';
import { getHomeBottom } from '@/app/_home-helpers/getHomeBottom'; // [!code ++]

// export default async function HomeServer() {
//   const queryClient = new QueryClient();

//   // 1. Top
//   await queryClient.prefetchQuery({ queryKey: ['home', 'top'], queryFn: getHomeTop });

//   // 2. Mid
//   await queryClient.prefetchQuery({ queryKey: ['home', 'mid'], queryFn: getHomeMid });

//   // 3. [!code ++] Bottom
//   await queryClient.prefetchQuery({ queryKey: ['home', 'bottom'], queryFn: getHomeBottom });

//   return (
//     <HydrationBoundary state={dehydrate(queryClient)}>
//       <HomeClient />
//     </HydrationBoundary>
//   );
// }
export default async function HomeServer() {
  const queryClient = new QueryClient();

  // CHANGE: Fire all three prefetches simultaneously
  await Promise.all([
    queryClient.prefetchQuery({ queryKey: ['home', 'top'], queryFn: getHomeTop }),
    queryClient.prefetchQuery({ queryKey: ['home', 'mid'], queryFn: getHomeMid }),
    queryClient.prefetchQuery({ queryKey: ['home', 'bottom'], queryFn: getHomeBottom }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomeClient />
    </HydrationBoundary>
  );
}