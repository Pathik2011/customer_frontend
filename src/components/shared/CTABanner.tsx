// // import React from 'react';
// // import { ArrowRight } from 'lucide-react';

// // const CTABanner = () => {
// //   return (
// //     <div 
// //       className="relative mx-auto overflow-hidden"
// //       style={{
// //         width: '1432px',
// //         height: '448px',
// //         borderRadius: '22px',
// //         // backgroundColor: '#2d5a1e'
// //       }}
// //     >
// //       {/* Background Image */}
// //       <div className="absolute inset-0">
// //         <img 
// //           // src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=1600" 
// //           src="/CTABanner/CTABanner.png" // Updated to use your local image
// //           alt="CTA Banner"
// //           className="w-full h-full object-cover"
// //         />
// //         {/* <div className="absolute inset-0 bg-[#013220]/50 mix-blend-multiply" /> */}
// //       </div>

// //       {/* Decorative Images Removed */}
      
// //       {/* Content Text */}
// //       <div 
// //         className="absolute text-white text-center flex items-center justify-center"
// //         style={{
// //           width: '639px',
// //           height: '66px',
// //           top: '158px',
// //           left: '397px',
// //           fontFamily: '"Google Sans", "Plus Jakarta Sans", sans-serif',
// //           fontWeight: 500,
// //           fontSize: '52px',
// //           lineHeight: '100%',
// //           letterSpacing: '0%',
// //           textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
// //         }}
// //       >
// //         If you have any questions?
// //       </div>

// //       {/* Contact Button */}
// //       <button 
// //         className="absolute flex items-center justify-center gap-1 hover:bg-yellow-300 transition-colors cursor-pointer"
// //         style={{
// //           width: '182px',
// //           height: '50px',
// //           top: '248px',
// //           left: '625px',
// //           borderRadius: '12px',
// //           padding: '13px 34px 15px 34px',
// //           backgroundColor: '#FFEB6D',
// //           color: '#003C22',
// //           fontFamily: '"Google Sans", "Plus Jakarta Sans", sans-serif',
// //           fontWeight: 600
// //         }}
// //       >
// //         <span className="text-sm font-bold whitespace-nowrap">Contact Us</span>
// //         <ArrowRight size={16} className="stroke-2" />
// //       </button>
// //     </div>
// //   );
// // };

// // export default CTABanner;
// // import React from 'react';
// // import { ArrowRight } from 'lucide-react';

// // const CTABanner = () => {
// //   return (
// //     // UPDATED: px-0 on mobile (full width), px-4 on md+ (tablet/desktop spacing)
// //     <div className="w-full flex justify-center px-0 md:px-4 xl:px-0 font-jakarta">
// //       <div 
// //         // UPDATED: Removed rounded corners on mobile (md:rounded-[22px] only)
// //         className="relative overflow-hidden md:rounded-[22px] transition-all duration-300"
// //         style={{
// //           width: '100%',
// //           maxWidth: '1432px', 
// //         }}
// //       >
// //         {/* --- Height Control Wrapper --- 
// //             Mobile: 523px | Desktop: 448px 
// //         */}
// //         <div className="h-[523px] md:h-[448px] w-full relative">
          
// //           {/* 1. Mobile Background Image (< 768px) */}
// //           <div className="absolute inset-0 md:hidden">
// //             <img 
// //               src="/CTABanner/Mobile_CTABanner.png" 
// //               alt="Contact Us"
// //               className="w-full h-full object-cover"
// //             />
// //           </div>

// //           {/* 2. Desktop/Tablet Background Image (>= 768px) */}
// //           <div className="absolute inset-0 hidden md:block">
// //             <img 
// //               src="/CTABanner/CTABanner.png" 
// //               alt="Contact Us"
// //               className="w-full h-full object-cover"
// //             />
// //           </div>

// //           {/* --- Content Overlay --- */}
// //           <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-10">
            
// //             {/* Text */}
// //             <h2 
// //               className="text-white font-medium mb-8 md:mb-10 drop-shadow-md"
// //               style={{
// //                 fontFamily: '"Google Sans", "Plus Jakarta Sans", sans-serif',
// //                 fontSize: 'clamp(32px, 5vw, 52px)', 
// //                 lineHeight: '1.1',
// //                 textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
// //                 maxWidth: '639px'
// //               }}
// //             >
// //               If you have any questions?
// //             </h2>

// //             {/* Button */}
// //             <button 
// //               className="flex items-center justify-center gap-2 hover:bg-yellow-300 transition-colors cursor-pointer bg-[#FFEB6D] text-[#003C22] rounded-[12px]"
// //               style={{
// //                 width: '182px',
// //                 height: '50px',
// //                 padding: '13px 34px 15px 34px',
// //                 fontFamily: '"Google Sans", "Plus Jakarta Sans", sans-serif',
// //                 fontWeight: 600
// //               }}
// //             >
// //               <span className="text-sm font-bold whitespace-nowrap">Contact Us</span>
// //               <ArrowRight size={16} className="stroke-2" />
// //             </button>

// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CTABanner;

// import React from 'react';
// import { ArrowRight } from 'lucide-react';

// const CTABanner = () => {
//   return (
//     <div className="w-full flex justify-center px-0 md:px-4 xl:px-0 font-jakarta">
//       <div 
//         className="relative overflow-hidden md:rounded-[22px] transition-all duration-300"
//         style={{
//           width: '100%',
//           maxWidth: '1432px', 
//         }}
//       >
//         <div className="h-[523px] md:h-[448px] w-full relative">
          
//           {/* Mobile Background Image (< 768px) */}
//           <div className="absolute inset-0 md:hidden">
//             <img 
//               src="/CTABanner/Mobile_CTABanner.png" 
//               alt="Contact Us"
//               className="w-full h-full object-cover"
//             />
//           </div>

//           {/* Desktop/Tablet Background Image (>= 768px) */}
//           <div className="absolute inset-0 hidden md:block">
//             <img 
//               src="/CTABanner/CTABanner.png" 
//               alt="Contact Us"
//               className="w-full h-full object-cover"
//             />
//           </div>

//           {/* --- Mobile Content Overlay (Specific Coordinates) --- */}
//           <div 
//             className="absolute flex flex-col items-start justify-between z-20 md:hidden"
//             style={{
//               top: '375px', // Calculated: 1682px (Element Top) - 1307px (Banner Top)
//               left: '24px',
//               width: '295px',
//               height: '90px',
//               borderRadius: '8px',
//             }}
//           >
//              <h2 
//               className="text-white font-medium drop-shadow-md text-left"
//               style={{
//                 fontFamily: '"Google Sans", "Plus Jakarta Sans", sans-serif',
//                 fontSize: '20px',
//                 lineHeight: '100%',
//               }}
//             >
//               If you have any questions?
//             </h2>

//             <button 
//               className="flex items-center justify-center gap-2 hover:bg-yellow-300 transition-colors cursor-pointer bg-[#FFEB6D] text-[#003C22] rounded-[12px]"
//               style={{
//                 width: '182px', 
//                 height: '50px',
//                 padding: '13px 20px',
//                 fontFamily: '"Google Sans", "Plus Jakarta Sans", sans-serif',
//                 fontWeight: 600
//               }}
//             >
//               <span className="text-sm font-bold whitespace-nowrap">Contact Us</span>
//               <ArrowRight size={16} className="stroke-2" />
//             </button>
//           </div>

//           {/* --- Desktop Content Overlay (Centered) --- */}
//           <div className="absolute inset-0 hidden md:flex flex-col items-center justify-center text-center p-6 z-10">
//             <h2 
//               className="text-white font-medium mb-8 md:mb-10 drop-shadow-md"
//               style={{
//                 fontFamily: '"Google Sans", "Plus Jakarta Sans", sans-serif',
//                 fontSize: '52px',
//                 lineHeight: '1.1',
//                 textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
//                 maxWidth: '639px'
//               }}
//             >
//               If you have any questions?
//             </h2>

//             <button 
//               className="flex items-center justify-center gap-2 hover:bg-yellow-300 transition-colors cursor-pointer bg-[#FFEB6D] text-[#003C22] rounded-[12px]"
//               style={{
//                 width: '182px',
//                 height: '50px',
//                 padding: '13px 34px 15px 34px',
//                 fontFamily: '"Google Sans", "Plus Jakarta Sans", sans-serif',
//                 fontWeight: 600
//               }}
//             >
//               <span className="text-sm font-bold whitespace-nowrap">Contact Us</span>
//               <ArrowRight size={16} className="stroke-2" />
//             </button>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default CTABanner;
'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

const CTABanner = () => {
  return (
    <div className="w-full flex justify-center px-0 md:px-4 xl:px-0 font-jakarta">
      <div 
        className="relative overflow-hidden md:rounded-[22px] transition-all duration-300"
        style={{
          width: '100%',
          maxWidth: '1432px', 
        }}
      >
        <div className="h-[523px] md:h-[448px] w-full relative">
          
          {/* Mobile Background Image (< 768px) */}
          <div className="absolute inset-0 md:hidden">
            <img 
              src="/CTABanner/Mobile_CTABanner.png" 
              alt="Contact Us"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Desktop/Tablet Background Image (>= 768px) */}
          <div className="absolute inset-0 hidden md:block">
            <img 
              src="/CTABanner/CTABanner.png" 
              alt="Contact Us"
              className="w-full h-full object-cover"
            />
          </div>

          {/* --- Mobile Content Overlay --- */}
          <div 
            className="absolute flex flex-col items-start justify-between z-20 md:hidden"
            style={{
              top: '375px',
              left: '24px',
              width: '295px',
              height: '90px',
              borderRadius: '8px',
            }}
          >
             <h2 
              className="text-white font-medium drop-shadow-md text-left"
              style={{
                fontFamily: '"Google Sans", "Plus Jakarta Sans", sans-serif',
                fontSize: '20px',
                lineHeight: '100%',
              }}
            >
              If you have any questions?
            </h2>

            <button 
              className="flex items-center justify-center gap-2 hover:bg-yellow-300 transition-colors cursor-pointer bg-[#FFEB6D] text-[#003C22] rounded-[12px]"
              style={{
                width: '182px', 
                height: '50px',
                padding: '13px 20px',
                fontFamily: '"Google Sans", "Plus Jakarta Sans", sans-serif',
                fontWeight: 600
              }}
            >
              <span className="text-sm font-bold whitespace-nowrap">Contact Us</span>
              <ArrowRight size={16} className="stroke-2" />
            </button>
          </div>

          {/* --- Desktop Content Overlay (Absolute Positioning) --- */}
          <div className="absolute inset-0 hidden md:block z-10 pointer-events-none">
            {/* Text */}
            <div 
              className="absolute text-white flex items-center justify-center text-center drop-shadow-md"
              style={{
                width: '639px',
                height: '66px',
                top: '158px',
                left: '397px',
                fontFamily: '"Google Sans", "Plus Jakarta Sans", sans-serif',
                fontWeight: 500,
                fontStyle: 'normal',
                fontSize: '52px',
                lineHeight: '100%',
                letterSpacing: '0%',
                textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
              }}
            >
              If you have any questions?
            </div>

            {/* Button */}
            <button 
              className="absolute flex items-center justify-center gap-2 hover:bg-yellow-300 transition-colors cursor-pointer bg-[#FFEB6D] text-[#003C22] rounded-[12px] pointer-events-auto"
              style={{
                width: '182px',
                height: '50px',
                top: '248px',
                left: '625px',
                padding: '13px 34px 15px 34px',
                fontFamily: '"Google Sans", "Plus Jakarta Sans", sans-serif',
                fontWeight: 600
              }}
            >
              <span className="text-sm font-bold whitespace-nowrap">Contact Us</span>
              <ArrowRight size={16} className="stroke-2" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CTABanner;