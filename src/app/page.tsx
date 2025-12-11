// // import Image from "next/image";
// // import GoogleLoginButton from "../components/GoogleLoginButton"; // Adjust path if needed
// // export default function Home() {
// //   return (
// //     <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
// //       <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
// //         <Image
// //           className="dark:invert"
// //           src="/next.svg"
// //           alt="Next.js logo"
// //           width={100}
// //           height={20}
// //           priority
// //         />
// //         <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
// //           <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
// //             To get started, edit the page.tsx file.
// //           </h1>
// //           <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
// //             Looking for a starting point or more instructions? Head over to{" "}
// //             <a
// //               href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //               className="font-medium text-zinc-950 dark:text-zinc-50"
// //             >
// //               Templates
// //             </a>{" "}
// //             or the{" "}
// //             <a
// //               href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //               className="font-medium text-zinc-950 dark:text-zinc-50"
// //             >
// //               Learning
// //             </a>{" "}
// //             center.
// //           </p>
// //         </div>
        
// //         <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
// //           <a
// //             className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
// //             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //             target="_blank"
// //             rel="noopener noreferrer"
// //           >
// //             <Image
// //               className="dark:invert"
// //               src="/vercel.svg"
// //               alt="Vercel logomark"
// //               width={16}
// //               height={16}
// //             />
// //             Deploy Now
// //           </a>
// //           <a
// //             className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
// //             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //             target="_blank"
// //             rel="noopener noreferrer"
// //           >
// //             Documentation
// //           </a>
// //         </div>
// //       </main>
// //     </div>
// //   );
// // }

// // import GoogleLoginButton from "../components/GoogleLoginButton"; 

// // export default function Home() {
// //   return (
// //     <div style={{ 
// //       display: 'flex', 
// //       flexDirection: 'column', 
// //       alignItems: 'center', 
// //       justifyContent: 'center', 
// //       height: '100vh' 
// //     }}>
// //       <h1>Welcome to the Store</h1>
// //       <p>Please log in to continue</p>
      
// //       {/* The Button */}
// //       <GoogleLoginButton />
// //     </div>
// //   );
// // }
// // import { redirect } from 'next/navigation';

// // export default function Home() {
// //   // For now, let's just redirect to Shop since that is where the UI is
// //   redirect('/shop');
  
// //   // OR if you want to keep the blank page:
// //   // return <div>Home Page</div>;
// // }

// // import { redirect } from 'next/navigation';

// // // In Next.js 15/16, searchParams is a Promise
// // export default async function Home({
// //   searchParams,
// // }: {
// //   searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
// // }) {
// //   const resolvedParams = await searchParams;
// //   const params = new URLSearchParams();

// //   // 1. Forward all query parameters (IMPORTANT: this passes the Google 'code' and 'state')
// //   Object.entries(resolvedParams).forEach(([key, value]) => {
// //     if (typeof value === 'string') {
// //       params.append(key, value);
// //     } else if (Array.isArray(value)) {
// //       value.forEach(v => params.append(key, v));
// //     }
// //   });

// //   const queryString = params.toString();
  
// //   // 2. Redirect to shop WITH the params
// //   const destination = queryString ? `/shop?${queryString}` : '/shop';

// //   redirect(destination);
// // }
// // 'use client';

// // import React, { Suspense } from 'react';

// // // Layout Imports
// // import TopBar from '@/components/layout/TopBar';
// // import Header from '@/components/layout/Header';
// // import NavBar from '@/components/layout/NavBar';
// // import Footer from '@/components/layout/Footer';

// // // Shared Components
// // import CTABanner from '@/components/shared/CTABanner';
// // import Spinner from '@/components/shared/Spinner';

// // // Home Component Imports
// // import HomeBanner from '@/components/home/HomeBanner';
// // import ExploreCategories from '@/components/home/ExploreCategories';
// // import FarmersChoice from '@/components/home/FarmersChoice';
// // import SeasonalSolutions from '@/components/home/SeasonalSolutions';
// // import BrandTicker from '@/components/home/BrandTicker';
// // import ProductsAccordingToCrop from '@/components/home/ProductsAccordingToCrop';
// // import YouTubeSection from '@/components/home/YouTubeSection';
// // import SeedCollection from '@/components/home/SeedCollection';
// // import UpcomingSeason from '@/components/home/UpcomingSeason';
// // import PopularProducts from '@/components/home/PopularProducts';
// // import SectionSeparator from '@/components/home/SectionSeparator';
// // import DrippingService from '@/components/home/DrippingService';

// // export default function HomePage() {
// //   return (
// //     <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      
// //       {/* 1. Header Section */}
// //       <TopBar />
// //       <Header />
// //       <NavBar />

// //       <main>
// //         {/* 2. Top Fold (Loads Immediately) */}
// //         <HomeBanner />
// //         <ExploreCategories />
        
// //         {/* 3. Middle Section (Suspense boundaries for data-fetching components) */}
// //         <Suspense fallback={<div className="h-96 w-full flex justify-center items-center"><Spinner className="w-8 h-8 text-[#013220]" /></div>}>
// //           <FarmersChoice />
// //         </Suspense>

// //         <SectionSeparator />
        
// //         <Suspense fallback={<div className="h-96 w-full flex justify-center items-center"><Spinner className="w-8 h-8 text-[#013220]" /></div>}>
// //           <SeasonalSolutions />
// //         </Suspense>
        
// //         <BrandTicker />

// //         <ProductsAccordingToCrop />

// //         <DrippingService />
// //         <YouTubeSection />
        
// //         <SeedCollection />
        
// //         <SectionSeparator />
        
// //         <UpcomingSeason />
        
// //         <PopularProducts />
        
// //         {/* Bottom CTA Banner */}
// //         <div className="w-full flex justify-center pb-16 pt-8 px-0 md:px-4 xl:px-0">
// //            <CTABanner />
// //         </div>
// //       </main>

// //       <Footer />
// //     </div>
// //   );
// // }

// 'use client';

// import React from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { getHomeTop } from '@/app/_home-helpers/getHomeTop';

// // --- SHARED COMPONENTS ---
// import CTABanner from '@/components/shared/CTABanner';
// import Spinner from '@/components/shared/Spinner';

// // --- STATIC SECTIONS (Loaded directly) ---
// import HomeBanner from '@/components/home/HomeBanner';
// import ExploreCategories from '@/components/home/ExploreCategories';
// import ProductsAccordingToCrop from '@/components/home/ProductsAccordingToCrop';
// import YouTubeSection from '@/components/home/YouTubeSection';
// import SeedCollection from '@/components/home/SeedCollection';
// import UpcomingSeason from '@/components/home/UpcomingSeason';
// import PopularProducts from '@/components/home/PopularProducts';
// import SectionSeparator from '@/components/home/SectionSeparator';
// import DrippingService from '@/components/home/DrippingService';

// // --- DYNAMIC SECTIONS (Data from API) ---
// // Note: We import these from their new modular folders
// import FarmersChoice from '@/components/home/FarmersChoice'; 
// import SeasonalSolutions from '@/components/home/SeasonalSolutions';
// import BrandTicker from '@/components/home/BrandTicker';

// export default function HomeClient() {
//   // 1. Fetch Data
//   // This uses the cache if the Server Component already fetched it!
//   const { data, isLoading } = useQuery({
//     queryKey: ['home', 'top'],
//     queryFn: getHomeTop,
//     staleTime: 60 * 1000, // 1 minute cache
//   });

//   return (
//     <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      
//       {/* Note: Header/Footer are in layout.tsx, so we don't need them here */}

//       <main>
//         {/* --- STATIC: Banner & Categories --- */}
//         <HomeBanner />
//         <ExploreCategories />
        
//         {/* --- DYNAMIC: Top Section API Content --- */}
//         {isLoading ? (
//            <div className="h-96 w-full flex justify-center items-center">
//              <Spinner className="w-8 h-8 text-[#013220]" />
//            </div>
//         ) : (
//            <>
//              {/* 1. Farmers Choice Bundle */}
//              {data?.farmers_bundle && (
//                <FarmersChoice data={data.farmers_bundle.items} />
//              )}
             
//              {/* Divider */}
//              <SectionSeparator />
             
//              {/* 2. Seasonal Solutions */}
//              {data?.prob_solution && (
//                <SeasonalSolutions data={data.prob_solution.items} />
//              )}
             
//              {/* 3. Brand Ticker */}
//              {/* Note: Your API response didn't show 'brand', so we safeguard it with || [] */}
//              <BrandTicker data={data?.brand?.items || []} />
//            </>
//         )}

//         {/* --- STATIC: Bottom Sections --- */}
//         <ProductsAccordingToCrop />
        
//         <DrippingService />
        
//         <YouTubeSection />
        
//         <SeedCollection />
        
//         <SectionSeparator />
        
//         <UpcomingSeason />
        
//         <PopularProducts />
        
//         {/* Bottom CTA Banner */}
//         <div className="w-full flex justify-center pb-16 pt-8 px-0 md:px-4 xl:px-0">
//            <CTABanner />
//         </div>
//       </main>

//     </div>
//   );
// }
import HomeServer from '@/app/_home-sections/HomeServer';

export default function HomePage() {
  return (
    <HomeServer />
  );
}