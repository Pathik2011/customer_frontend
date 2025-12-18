// 'use client';

// import React, { useEffect } from 'react';
// import { QUERY_CONFIG } from '@/config/queryConfig'; // [!code ++]
// import { useQuery } from '@tanstack/react-query';
// import { getHomeTop } from '@/app/_home-helpers/getHomeTop';
// import { getHomeMid } from '@/app/_home-helpers/getHomeMid';
// import { getHomeBottom } from '@/app/_home-helpers/getHomeBottom'; // [!code ++]

// // --- LAYOUT COMPONENTS (Restored) ---
// import TopBar from '@/components/layout/TopBar';
// import Header from '@/components/layout/Header';
// import NavBar from '@/components/layout/NavBar';
// import Footer from '@/components/layout/Footer';

// // --- SHARED COMPONENTS ---
// import CTABanner from '@/components/shared/CTABanner';
// import Spinner from '@/components/shared/Spinner';

// // --- STATIC HOME SECTIONS ---
// import HomeBanner from '@/components/home/HomeBanner';
// import ExploreCategories from '@/components/home/ExploreCategories';
// import ProductsAccordingToCrop from '@/components/home/ProductsAccordingToCrop';




// import SectionSeparator from '@/components/home/SectionSeparator';
// import DrippingService from '@/components/home/DrippingService';

// // --- DYNAMIC SECTIONS (API) ---
// import FarmersChoice from '@/components/home/FarmersChoice'; 
// import SeasonalSolutions from '@/components/home/SeasonalSolutions';
// import BrandTicker from '@/components/home/BrandTicker';
// import YouTubeSection from '@/components/home/YouTubeSection'; // New modular import
// import SeedCollection from '@/components/home/SeedCollection'; // New modular import
// import UpcomingSeason from '@/components/home/UpcomingSeason'; // Modular import
// import PopularProducts from '@/components/home/PopularProducts'; // [!code ++] New Import
// export default function HomeClient() {
//   // 1. Top
//   const { data: topData, isLoading: isTopLoading } = useQuery({
//     queryKey: ['home', 'top'],
//     queryFn: getHomeTop,
//     // [!code highlight] Use Config
//     staleTime: QUERY_CONFIG.HOME.STALE_TIME, 
//   });

//   // 2. Mid
//   const { data: midData, isLoading: isMidLoading } = useQuery({
//     queryKey: ['home', 'mid'],
//     queryFn: getHomeMid,
//     staleTime: QUERY_CONFIG.HOME.STALE_TIME,
//   });

//   // 3. Bottom
//   const { data: bottomData, isLoading: isBottomLoading } = useQuery({
//     queryKey: ['home', 'bottom'],
//     queryFn: getHomeBottom,
//     staleTime: QUERY_CONFIG.HOME.STALE_TIME,
//   });

//   const isLoading = isTopLoading || isMidLoading;

//   return (
//     <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      
//       {/* [!code highlight] RESTORED HEADER ELEMENTS */}
//       <TopBar />
//       <Header />
//       <NavBar />

//       <main>
//         {/* Banner & Categories (Static) */}
//         <HomeBanner />
//         <ExploreCategories />
        
//         {/* Dynamic Content */}
//         {isLoading ? (
//            <div className="h-96 w-full flex justify-center items-center">
//              <Spinner className="w-8 h-8 text-[#013220]" />
//            </div>
//         ) : (
//            <>
//              {/* TOP SECTION API */}
//              {topData?.farmers_bundle && <FarmersChoice data={topData.farmers_bundle.items} />}
             
//              <SectionSeparator />
             
//              {topData?.prob_solution && (
//                <SeasonalSolutions 
//                   data={topData.prob_solution.items} 
//                   title={topData.prob_solution.display_title} 
//                />
//              )}
             
//              <BrandTicker 
//                 data={topData?.brand?.items || []} 
//                 title={topData?.brand?.display_title || "Top Brands"} 
//              />

//              {/* MID SECTION API */}
//              {midData?.crop && midData.crop.items.length > 0 && (
//                 <ProductsAccordingToCrop 
//                    data={midData.crop.items} 
//                    title={midData.crop.display_title} 
//                 />
//              )}
//            </>
//         )}

//         {/* Static Bottom Sections */}
//         <DrippingService />
//         {/* [!code highlight] YouTube Section */}
//         {midData?.youtube_video && (
//            <YouTubeSection 
//               data={midData.youtube_video.items} 
//               title={midData.youtube_video.display_title} 
//            />
//         )}
//         {/* [!code highlight] SEED COLLECTION */}
//         {midData?.seed && (
//            <SeedCollection 
//               data={midData.seed.items} 
//               title={midData.seed.display_title} 
//            />
//         )}
        
//         <SectionSeparator />
//         {/* [!code highlight] BOTTOM: Upcoming Season */}
//              {bottomData?.products_upcoming && (
//                 <UpcomingSeason 
//                    data={bottomData.products_upcoming.items} 
//                    title={bottomData.products_upcoming.display_title} 
//                 />
//              )}
            
//         {/* [!code highlight] POPULAR PRODUCTS */}
//              {bottomData?.popular_products && (
//                 <PopularProducts 
//                    data={bottomData.popular_products.items} 
//                    title={bottomData.popular_products.display_title} 
//                 />
//              )}
        
//         <div className="w-full flex justify-center pb-16 pt-8 px-0 md:px-4 xl:px-0">
//            <CTABanner />
//         </div>
//       </main>

//       {/* [!code highlight] RESTORED FOOTER */}
//       <Footer />
//     </div>
//   );
// }
'use client';

import React from 'react';
import { QUERY_CONFIG } from '@/config/queryConfig';
import { useQuery } from '@tanstack/react-query';
import { getHomeTop } from '@/app/_home-helpers/getHomeTop';
import { getHomeMid } from '@/app/_home-helpers/getHomeMid';
import { getHomeBottom } from '@/app/_home-helpers/getHomeBottom';

// --- LAYOUT COMPONENTS ---
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';

// --- SHARED COMPONENTS ---
import CTABanner from '@/components/shared/CTABanner';
import Spinner from '@/components/shared/Spinner';

// --- STATIC HOME SECTIONS ---
import HomeBanner from '@/components/home/HomeBanner';
import ExploreCategories from '@/components/home/ExploreCategories';
import SectionSeparator from '@/components/home/SectionSeparator';
import DrippingService from '@/components/home/DrippingService';

// --- DYNAMIC SECTIONS (API) ---
import FarmersChoice from '@/components/home/FarmersChoice'; 
import SeasonalSolutions from '@/components/home/SeasonalSolutions';
import BrandTicker from '@/components/home/BrandTicker';
import YouTubeSection from '@/components/home/YouTubeSection';
import ProductsAccordingToCrop from '@/components/home/ProductsAccordingToCrop';
import SeedCollection from '@/components/home/SeedCollection';
import UpcomingSeason from '@/components/home/UpcomingSeason';
import PopularProducts from '@/components/home/PopularProducts';

export default function HomeClient() {
  const { data: topData, isLoading: isTopLoading } = useQuery({
    queryKey: ['home', 'top'],
    queryFn: getHomeTop,
    staleTime: QUERY_CONFIG.HOME.STALE_TIME, 
  });

  const { data: midData, isLoading: isMidLoading } = useQuery({
    queryKey: ['home', 'mid'],
    queryFn: getHomeMid,
    staleTime: QUERY_CONFIG.HOME.STALE_TIME,
  });

  const { data: bottomData, isLoading: isBottomLoading } = useQuery({
    queryKey: ['home', 'bottom'],
    queryFn: getHomeBottom,
    staleTime: QUERY_CONFIG.HOME.STALE_TIME,
  });

  const isLoading = isTopLoading || isMidLoading;

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      <TopBar />
      <Header />
      <NavBar />

      <main>
        <HomeBanner />
        <ExploreCategories />
        
        {isLoading ? (
           <div className="h-96 w-full flex justify-center items-center">
             <Spinner className="w-8 h-8 text-[#013220]" />
           </div>
        ) : (
           <>
             {/* TOP SECTION API */}
             {topData?.farmers_bundle && (
               <FarmersChoice 
                 data={topData.farmers_bundle.items} 
                 title={topData.farmers_bundle.display_title}
                 subtitle={topData.farmers_bundle.display_description} // [!code ++]
               />
             )}
             
             <SectionSeparator />
             
             {topData?.prob_solution && (
               <SeasonalSolutions 
                  data={topData.prob_solution.items} 
                  title={topData.prob_solution.display_title} 
                  subtitle={topData.prob_solution.display_description} // [!code ++]
               />
             )}
             
             {topData?.brand && (
               <BrandTicker 
                 data={topData.brand.items} 
                 title={topData.brand.display_title} 
                 subtitle={topData.brand.display_description} // [!code ++]
               />
             )}

             {/* MID SECTION API */}
             {midData?.crop && midData.crop.items.length > 0 && (
                <ProductsAccordingToCrop 
                   data={midData.crop.items} 
                   title={midData.crop.display_title} 
                   subtitle={midData.crop.display_description} // [!code ++]
                />
             )}
           </>
        )}

        <DrippingService />

        {midData?.youtube_video && (
           <YouTubeSection 
              data={midData.youtube_video.items} 
              title={midData.youtube_video.display_title} 
              subtitle={midData.youtube_video.display_description} // [!code ++]
           />
        )}

        {midData?.seed && (
           <SeedCollection 
              data={midData.seed.items} 
              title={midData.seed.display_title} 
              subtitle={midData.seed.display_description} // [!code ++]
           />
        )}
        
        <SectionSeparator />

        {bottomData?.products_upcoming && (
           <UpcomingSeason 
              data={bottomData.products_upcoming.items} 
              title={bottomData.products_upcoming.display_title} 
              subtitle={bottomData.products_upcoming.display_description} // [!code ++]
           />
        )}
           
        {bottomData?.popular_products && (
           <PopularProducts 
              data={bottomData.popular_products.items} 
              title={bottomData.popular_products.display_title} 
              subtitle={bottomData.popular_products.display_description} // [!code ++]
           />
        )}
        
        <div className="w-full flex justify-center pb-16 pt-8 px-0 md:px-4 xl:px-0">
           <CTABanner />
        </div>
      </main>

      <Footer />
    </div>
  );
}