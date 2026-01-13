

// 'use client';

// import React, { useRef, useState, useEffect } from 'react';
// import { useDraggableScroll } from '@/hooks/useDraggableScroll';
// import { ApiBrand } from '@/types/homeApi';
// import { useRouter } from 'next/navigation';
// import { motion } from 'framer-motion';

// const scrollStyles = `
//   .no-scrollbar::-webkit-scrollbar { display: none; }
//   .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
// `;

// interface BrandTickerProps {
//   data: ApiBrand[];
//   title?: string;
//   subtitle?: string;
// }

// const BrandTicker = ({ data, title, subtitle }: BrandTickerProps) => {
//   const scrollRef = useRef<HTMLDivElement>(null);
//   useDraggableScroll(scrollRef);
//   const router = useRouter();
  
//   const [clickingId, setClickingId] = useState<number | null>(null);
//   const [isPaused, setIsPaused] = useState(false);

//   // Duplicate data for infinite scroll buffer on desktop
//   const displayData = [...data, ...data];

//   useEffect(() => {
//     const scrollContainer = scrollRef.current;
//     if (!scrollContainer) return;

//     const interval = setInterval(() => {
//         // Run only if: 1. Not Paused 2. Is Desktop 3. Content overflows
//         if (!isPaused && window.innerWidth >= 834 && scrollContainer.scrollWidth > scrollContainer.clientWidth) {
            
//             scrollContainer.scrollLeft += 1;

//             // Infinite Loop Reset
//             if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
//                 scrollContainer.scrollLeft = 0;
//             }
//         }
//     }, 20); 

//     return () => clearInterval(interval);
//   }, [isPaused, data]);

//   if (!data || data.length === 0) return null;

//   const handleBrandClick = (brandName: string, id: number) => {
//     if (typeof navigator !== 'undefined' && navigator.vibrate) {
//         navigator.vibrate(100);
//     }
//     setClickingId(id);
//     router.push(`/shop?brand=${encodeURIComponent(brandName)}`);
//   };

//   return (
//     <section className="w-full bg-white border-y border-[#E0E2E7] flex items-center overflow-hidden font-jakarta h-[469px] min-[834px]:h-[268px]">
//       <style>{scrollStyles}</style>
//       <div className="w-full max-w-[1600px] mx-auto px-4 xl:px-0 flex flex-col min-[834px]:flex-row items-center h-full justify-center min-[834px]:justify-start">
        
//         {/* Label Section */}
//         <div className="flex flex-col shrink-0 min-[834px]:ml-[152px] min-[834px]:mr-[62px] text-center min-[834px]:text-left mb-8 min-[834px]:mb-0">
//             <h2 
//               className="text-[#000000] mb-3 text-[20px] font-bold leading-[100%] tracking-[0] min-[834px]:text-[28px]" 
//               style={{ fontFamily: '"Google Sans", sans-serif' }}
//             >
//               {title || "Featured Brands"}
//             </h2>
            
//             <p 
//               className="text-[#4D4D4D] text-[14px] font-bold leading-[26px] tracking-[0.01em] min-[834px]:text-[15px] max-w-[283px] min-[834px]:max-w-[247px] text-center min-[834px]:text-left"
//               style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
//             >
//              {subtitle || "We work with the best agricultural brands to ensure quality."}
//             </p>
//         </div>

//         {/* Brand Container */}
//         <div 
//           ref={scrollRef} 
//           onMouseEnter={() => setIsPaused(true)}
//           onMouseLeave={() => setIsPaused(false)}
//           className="
//             w-full min-[834px]:w-auto h-auto min-[834px]:h-full
            
//             /* Mobile Grid */
//             grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-x-3 gap-y-4 px-2
            
//             /* Desktop Flex Slider */
//             min-[834px]:flex min-[834px]:gap-6 min-[834px]:overflow-x-auto no-scrollbar min-[834px]:items-center min-[834px]:px-0
            
//             select-none cursor-grab justify-items-center
//           "
//         >
//             {displayData.map((brand, index) => {
//                 const isClicked = clickingId === brand.brand_id;
                
//                 // [!code changed] Identify if this item is a duplicate (index >= original length)
//                 const isDuplicate = index >= data.length;

//                 return (
//                   <motion.div 
//                     key={`${brand.brand_id}-${index}`} 
//                     onClick={() => handleBrandClick(brand.brand_name, brand.brand_id)}
//                     animate={isClicked ? { scale: 1.05, filter: 'brightness(1.05)' } : { scale: 1, filter: 'brightness(1)' }}
//                     transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    
//                     className={`
//                       /* [!code changed] MOBILE FIX: Hide duplicates on mobile, show on Desktop */
//                       ${isDuplicate ? 'hidden min-[834px]:flex' : 'flex'}
                      
//                       justify-center items-center shrink-0 bg-white 
//                       hover:shadow-sm transition-shadow rounded-xl border border-[#E0E2E7] cursor-pointer
//                       w-full min-[834px]:w-auto
//                     `}
//                     style={{ 
//                       WebkitTapHighlightColor: 'transparent' 
//                     }} 
//                   >
//                       <div className="
//                         flex items-center justify-center p-2 min-[834px]:p-4
//                         w-full max-w-[106px] h-[52px]
//                         min-[834px]:w-[206px] min-[834px]:h-[100px] min-[834px]:max-w-none
//                       ">
//                         <img 
//                           src={brand.logo_url || "https://placehold.co/200x100?text=Brand"} 
//                           alt={brand.brand_name} 
//                           className="max-w-full max-h-full object-contain" 
//                         />
//                       </div>
//                   </motion.div>
//                 );
//             })}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default BrandTicker;
'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useDraggableScroll } from '@/hooks/useDraggableScroll';
import { ApiBrand } from '@/types/homeApi';
import { useRouter } from 'next/navigation';
// [!code highlight] 1. Replace motion with AnimatedPress
import AnimatedPress from '@/components/shared/AnimatedPress'; 

const scrollStyles = `
  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
`;

interface BrandTickerProps {
  data: ApiBrand[];
  title?: string;
  subtitle?: string;
}

const BrandTicker = ({ data, title, subtitle }: BrandTickerProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  useDraggableScroll(scrollRef);
  const router = useRouter();
  
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate data for infinite scroll buffer on desktop
  const displayData = [...data, ...data];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const interval = setInterval(() => {
        // Run only if: 1. Not Paused 2. Is Desktop 3. Content overflows
        if (!isPaused && window.innerWidth >= 834 && scrollContainer.scrollWidth > scrollContainer.clientWidth) {
            
            scrollContainer.scrollLeft += 1;

            // Infinite Loop Reset
            if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
                scrollContainer.scrollLeft = 0;
            }
        }
    }, 20); 

    return () => clearInterval(interval);
  }, [isPaused, data]);

  if (!data || data.length === 0) return null;

  const handleBrandClick = (brandName: string) => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(100);
    }
    // [!code highlight] 2. Add delay so animation is visible
    setTimeout(() => {
        router.push(`/shop?brand=${encodeURIComponent(brandName)}`);
    }, 150);
  };

  return (
    <section className="w-full bg-white border-y border-[#E0E2E7] flex items-center overflow-hidden font-jakarta h-[469px] min-[834px]:h-[268px]">
      <style>{scrollStyles}</style>
      <div className="w-full max-w-[1600px] mx-auto px-4 xl:px-0 flex flex-col min-[834px]:flex-row items-center h-full justify-center min-[834px]:justify-start">
        
        {/* Label Section */}
        <div className="flex flex-col shrink-0 min-[834px]:ml-[152px] min-[834px]:mr-[62px] text-center min-[834px]:text-left mb-8 min-[834px]:mb-0">
            <h2 
              className="text-[#000000] mb-3 text-[20px] font-bold leading-[100%] tracking-[0] min-[834px]:text-[28px]" 
              style={{ fontFamily: '"Google Sans", sans-serif' }}
            >
              {title || "Featured Brands"}
            </h2>
            
            <p 
              className="text-[#4D4D4D] text-[14px] font-bold leading-[26px] tracking-[0.01em] min-[834px]:text-[15px] max-w-[283px] min-[834px]:max-w-[247px] text-center min-[834px]:text-left"
              style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
            >
             {subtitle || "We work with the best agricultural brands to ensure quality."}
            </p>
        </div>

        {/* Brand Container */}
        <div 
          ref={scrollRef} 
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="
            w-full min-[834px]:w-auto h-auto min-[834px]:h-full
            
            /* Mobile Grid */
            grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-x-3 gap-y-4 px-2
            
            /* Desktop Flex Slider */
            min-[834px]:flex min-[834px]:gap-6 min-[834px]:overflow-x-auto no-scrollbar min-[834px]:items-center min-[834px]:px-0
            
            select-none cursor-grab justify-items-center
          "
        >
            {displayData.map((brand, index) => {
                const isDuplicate = index >= data.length;

                return (
                  // [!code highlight] 3. Use AnimatedPress Wrapper
                  <AnimatedPress 
                    key={`${brand.brand_id}-${index}`} 
                    onClick={() => handleBrandClick(brand.brand_name)}
                    className={`
                      ${isDuplicate ? 'hidden min-[834px]:flex' : 'flex'}
                      justify-center items-center shrink-0 bg-white 
                      hover:shadow-sm transition-shadow rounded-xl border border-[#E0E2E7] cursor-pointer
                      w-full min-[834px]:w-auto
                    `}
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                      <div className="
                        flex items-center justify-center p-2 min-[834px]:p-4
                        w-full max-w-[106px] h-[52px]
                        min-[834px]:w-[206px] min-[834px]:h-[100px] min-[834px]:max-w-none
                      ">
                        <img 
                          src={brand.logo_url || "https://placehold.co/200x100?text=Brand"} 
                          alt={brand.brand_name} 
                          className="max-w-full max-h-full object-contain mix-blend-multiply" 
                        />
                      </div>
                  </AnimatedPress>
                );
            })}
        </div>
      </div>
    </section>
  );
};

export default BrandTicker;