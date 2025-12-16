// 'use client';
// import React, { useRef } from 'react';
// import { useDraggableScroll } from '@/hooks/useDraggableScroll';
// import { ApiBrand } from '@/types/homeApi';
// import { useRouter } from 'next/navigation'; // [!code ++] 1. Import Router

// const scrollStyles = `
//   .no-scrollbar::-webkit-scrollbar { display: none; }
//   .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
// `;

// interface BrandTickerProps {
//   data: ApiBrand[];
//   title?: string;
// }

// const BrandTicker = ({ data, title }: BrandTickerProps) => {
//   const scrollRef = useRef<HTMLDivElement>(null);
//   useDraggableScroll(scrollRef);
//   const router = useRouter(); // [!code ++] 2. Init Router

//   if (!data || data.length === 0) return null;

//   // [!code ++] 3. Navigation Handler
//   const handleBrandClick = (brandName: string) => {
//     router.push(`/shop?brand=${encodeURIComponent(brandName)}`);
//   };

//   return (
//     <section className="w-full bg-white border-y border-[#E0E2E7] flex items-center overflow-hidden font-jakarta h-[469px] min-[834px]:h-[268px]">
//       <style>{scrollStyles}</style>
//       <div className="w-full max-w-[1600px] mx-auto px-4 xl:px-0 flex flex-col min-[834px]:flex-row items-center h-full justify-center min-[834px]:justify-start">
        
//         {/* Label Section */}
//         <div className="flex flex-col shrink-0 min-[834px]:ml-[128px] min-[834px]:mr-[62px] text-center min-[834px]:text-left mb-8 min-[834px]:mb-0">
//             <h2 className="text-[#000000] mb-3 text-[20px] font-medium min-[834px]:text-2xl" style={{ fontFamily: '"Google Sans", sans-serif' }}>
//               {title || "Top Brands"}
//             </h2>
//             <p className="text-[#4D4D4D] text-[14px] leading-[26px] font-semibold min-[834px]:font-normal min-[834px]:text-sm max-w-[283px] min-[834px]:max-w-[247px] text-center min-[834px]:text-left">
//               We work with the best agricultural brands to ensure quality.
//             </p>
//         </div>

//         {/* Scrollable Logos (Desktop) / Grid (Mobile) */}
//         <div 
//           ref={scrollRef} 
//           className="
//             w-full min-[834px]:w-auto h-auto min-[834px]:h-full
//             grid grid-cols-3 gap-x-3 gap-y-4 px-2
//             min-[834px]:flex min-[834px]:gap-6 min-[834px]:overflow-x-auto min-[834px]:no-scrollbar min-[834px]:items-center min-[834px]:px-0
//             select-none cursor-grab justify-items-center
//           "
//         >
//             {data.map((brand) => (
//                 <div 
//                   key={brand.brand_id} 
//                   // [!code ++] 4. Click Event & Pointer Cursor
//                   onClick={() => handleBrandClick(brand.brand_name)}
//                   className="flex justify-center items-center shrink-0 bg-white hover:shadow-sm transition-shadow rounded-xl border border-[#E0E2E7] cursor-pointer"
//                   style={{ 
//                     // Dimensions handled via inner div or utility classes below
//                   }} 
//                 >
//                     <div className="
//                       flex items-center justify-center p-2 min-[834px]:p-4
//                       w-[106px] h-[52px]
//                       min-[834px]:w-[206px] min-[834px]:h-[100px]
//                     ">
//                       <img 
//                         src={brand.logo_url || "https://placehold.co/200x100?text=Brand"} 
//                         alt={brand.brand_name} 
//                         className="max-w-full max-h-full object-contain" 
//                       />
//                     </div>
//                 </div>
//             ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default BrandTicker;
'use client';

import React, { useRef, useState } from 'react';
import { useDraggableScroll } from '@/hooks/useDraggableScroll';
import { ApiBrand } from '@/types/homeApi';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion'; // [!code ++] Import Motion

const scrollStyles = `
  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
`;

interface BrandTickerProps {
  data: ApiBrand[];
  title?: string;
}

const BrandTicker = ({ data, title }: BrandTickerProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  useDraggableScroll(scrollRef);
  const router = useRouter();
  
  // [!code ++] State to track which brand is clicked
  const [clickingId, setClickingId] = useState<number | null>(null);

  if (!data || data.length === 0) return null;

  const handleBrandClick = (brandName: string, id: number) => {
    // 1. Trigger Haptic Feedback (Android/Supported Devices)
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(100);
    }

    // 2. Set Visual Pop State
    setClickingId(id);

    // 3. Navigate
    router.push(`/shop?brand=${encodeURIComponent(brandName)}`);
  };

  return (
    <section className="w-full bg-white border-y border-[#E0E2E7] flex items-center overflow-hidden font-jakarta h-[469px] min-[834px]:h-[268px]">
      <style>{scrollStyles}</style>
      <div className="w-full max-w-[1600px] mx-auto px-4 xl:px-0 flex flex-col min-[834px]:flex-row items-center h-full justify-center min-[834px]:justify-start">
        
        {/* Label Section */}
        <div className="flex flex-col shrink-0 min-[834px]:ml-[128px] min-[834px]:mr-[62px] text-center min-[834px]:text-left mb-8 min-[834px]:mb-0">
            <h2 className="text-[#000000] mb-3 text-[20px] font-medium min-[834px]:text-2xl" style={{ fontFamily: '"Google Sans", sans-serif' }}>
              {title || "Top Brands"}
            </h2>
            <p className="text-[#4D4D4D] text-[14px] leading-[26px] font-semibold min-[834px]:font-normal min-[834px]:text-sm max-w-[283px] min-[834px]:max-w-[247px] text-center min-[834px]:text-left">
              We work with the best agricultural brands to ensure quality.
            </p>
        </div>

        {/* Scrollable Logos (Desktop) / Grid (Mobile) */}
        <div 
          ref={scrollRef} 
          className="
            w-full min-[834px]:w-auto h-auto min-[834px]:h-full
            grid grid-cols-3 gap-x-3 gap-y-4 px-2
            min-[834px]:flex min-[834px]:gap-6 min-[834px]:overflow-x-auto min-[834px]:no-scrollbar min-[834px]:items-center min-[834px]:px-0
            select-none cursor-grab justify-items-center
          "
        >
            {data.map((brand) => {
                const isClicked = clickingId === brand.brand_id;
                
                return (
                  // [!code changed] Converted div to motion.div
                  <motion.div 
                    key={brand.brand_id} 
                    onClick={() => handleBrandClick(brand.brand_name, brand.brand_id)}
                    // [!code ++] Animation Props
                    animate={isClicked ? { scale: 1.05, filter: 'brightness(1.05)' } : { scale: 1, filter: 'brightness(1)' }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    
                    className="flex justify-center items-center shrink-0 bg-white hover:shadow-sm transition-shadow rounded-xl border border-[#E0E2E7] cursor-pointer"
                    style={{ 
                      WebkitTapHighlightColor: 'transparent' // Remove mobile tap highlight
                    }} 
                  >
                      <div className="
                        flex items-center justify-center p-2 min-[834px]:p-4
                        w-[106px] h-[52px]
                        min-[834px]:w-[206px] min-[834px]:h-[100px]
                      ">
                        <img 
                          src={brand.logo_url || "https://placehold.co/200x100?text=Brand"} 
                          alt={brand.brand_name} 
                          className="max-w-full max-h-full object-contain" 
                        />
                      </div>
                  </motion.div>
                );
            })}
        </div>
      </div>
    </section>
  );
};

export default BrandTicker;