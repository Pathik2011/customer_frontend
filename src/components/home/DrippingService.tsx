// 'use client';

// import React from 'react';
// import { ArrowRight } from 'lucide-react';

// const DrippingService = () => {
//   return (
//     <section className="w-full flex justify-center  font-jakarta bg-white">
//       {/* Main Container */}
//       <div 
//         className="relative w-full  h-[523px] lg:h-[528px] overflow-hidden rounded-[1px] mx-auto"
//       >
//         {/* Background Image */}
//         <div className="absolute inset-0 z-0">
//           <img 
//             src="/Home/Dripping/1.png" 
//             alt="Dripping Service Background" 
//             className="w-full h-full object-cover"
//           />
          
//           {/* Mobile Gradient (Default) */}
//           <div 
//             className="absolute inset-0 lg:hidden"
//             style={{
//                 background: 'linear-gradient(310deg, rgba(0, 60, 34, 0) 0%, rgba(0, 60, 34, 0.4) 50.32%, rgba(0, 60, 34, 0.7) 100%)'
//             }}
//           ></div>

//           {/* Desktop Gradient (lg:block) */}
//           <div 
//             className="absolute inset-0 hidden lg:block"
//             style={{
//                 background: 'linear-gradient(-100deg, rgba(0, 60, 34, 0) 0%, rgba(0, 60, 34, 0.2) 50.32%, rgba(0, 60, 34, 0.7) 100%)'
//             }}
//           ></div>
//         </div>

//         {/* Content Container */}
//         <div className="relative z-10 h-full w-full">
            
//             {/* Header Text */}
//             <h2 
//                 className="absolute text-white font-medium"
//                 style={{
//                     fontFamily: '"Google Sans", sans-serif',
//                     letterSpacing: '0%',
//                 }}
//             >
//                 {/* Mobile View */}
//                 <span className="block lg:hidden text-2xl leading-9 absolute top-12 left-6 w-[258px]">
//                     100% Branded Product<br/>
//                     Dripping Service
//                 </span>

//                 {/* Desktop View */}
//                 <span 
//                     className="hidden lg:block absolute"
//                     style={{
//                         width: '301px',
//                         height: '84px',
//                         top: '185px', 
//                         left: '152px',
//                         fontSize: '28px',
//                         lineHeight: '42px',
//                     }}
//                 >
//                     100% Branded Product<br/>
//                     Dripping Service
//                 </span>
//             </h2>

//             {/* Contact Button */}
//             <button 
//                 className="
//                     absolute flex items-center justify-between 
//                     bg-white text-[#003C22] hover:bg-gray-100 transition-colors shadow-lg group
                    
//                     /* Mobile Dimensions & Position */
//                     w-[272px] h-[40px]
//                     top-[425px] left-[24px] 
//                     px-[18px] py-[9px]
                    
//                     /* Desktop Dimensions & Position overrides */
//                     lg:w-[341px] lg:h-[50px]
//                     lg:top-[293px] lg:left-[152px]
//                     lg:pt-[13px] lg:pr-[34px] lg:pb-[15px] lg:pl-[34px]
//                 "
//                 style={{
//                     borderRadius: '12px',
//                     gap: '4px'
//                 }}
//             >
//                 <span className="font-semibold text-sm">Contact Us for Dripping Service</span>
//                 <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
//             </button>

//         </div>
//       </div>
//     </section>
//   );
// };

// export default DrippingService;
// 'use client';

// import React from 'react';
// import { ArrowRight } from 'lucide-react';
// import Link from 'next/link'; // 1. Import Link

// const DrippingService = () => {
//   return (
//     <section className="w-full flex justify-center font-jakarta bg-white">
//       {/* Main Container */}
//       <div 
//         className="relative w-full h-[523px] lg:h-[528px] overflow-hidden rounded-[1px] mx-auto"
//       >
//         {/* Background Image */}
//         <div className="absolute inset-0 z-0">
//           <img 
//             src="/Home/Dripping/1.png" 
//             alt="Dripping Service Background" 
//             className="w-full h-full object-cover"
//           />
          
//           {/* Mobile Gradient (Default) */}
//           <div 
//             className="absolute inset-0 lg:hidden"
//             style={{
//                 background: 'linear-gradient(310deg, rgba(0, 60, 34, 0) 0%, rgba(0, 60, 34, 0.4) 50.32%, rgba(0, 60, 34, 0.7) 100%)'
//             }}
//           ></div>

//           {/* Desktop Gradient (lg:block) */}
//           <div 
//             className="absolute inset-0 hidden lg:block"
//             style={{
//                 background: 'linear-gradient(-100deg, rgba(0, 60, 34, 0) 0%, rgba(0, 60, 34, 0.2) 50.32%, rgba(0, 60, 34, 0.7) 100%)'
//             }}
//           ></div>
//         </div>

//         {/* Content Container */}
//         <div className="relative z-10 h-full w-full">
            
//             {/* Header Text */}
//             <h2 
//                 className="absolute text-white font-medium"
//                 style={{
//                     fontFamily: '"Google Sans", sans-serif',
//                     letterSpacing: '0%',
//                 }}
//             >
//                 {/* Mobile View */}
//                 <span className="block lg:hidden text-2xl leading-9 absolute top-12 left-6 w-[258px]">
//                     100% Branded Product<br/>
//                     Dripping Service
//                 </span>

//                 {/* Desktop View */}
//                 <span 
//                     className="hidden lg:block absolute"
//                     style={{
//                         width: '301px',
//                         height: '84px',
//                         top: '185px', 
//                         left: '152px',
//                         fontSize: '28px',
//                         lineHeight: '42px',
//                     }}
//                 >
//                     100% Branded Product<br/>
//                     Dripping Service
//                 </span>
//             </h2>

//             {/* Contact Button (Now a Link) */}
//             <Link 
//                 href="/contact-drip"
//                 className="
//                     absolute flex items-center justify-between 
//                     bg-white text-[#003C22] hover:bg-gray-100 transition-colors shadow-lg group
                    
//                     /* Mobile Dimensions & Position */
//                     w-[272px] h-[40px]
//                     top-[425px] left-[24px] 
//                     px-[18px] py-[9px]
                    
//                     /* Desktop Dimensions & Position overrides */
//                     lg:w-[341px] lg:h-[50px]
//                     lg:top-[293px] lg:left-[152px]
//                     lg:pt-[13px] lg:pr-[34px] lg:pb-[15px] lg:pl-[34px]
//                 "
//                 style={{
//                     borderRadius: '12px',
//                     gap: '4px'
//                 }}
//             >
//                 <span className="font-semibold text-sm">Contact Us for Dripping Service</span>
//                 <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
//             </Link>

//         </div>
//       </div>
//     </section>
//   );
// };

// export default DrippingService;

'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const DrippingService = () => {
  return (
    <section className="w-full flex justify-center font-jakarta bg-white">
      <div 
        className="relative w-full h-[523px] lg:h-[528px] overflow-hidden rounded-[1px] mx-auto"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/Home/Dripping/1.png" 
            alt="Dripping Service Background" 
            className="w-full h-full object-cover"
          />
          
          {/* Gradients */}
          <div 
            className="absolute inset-0 lg:hidden"
            style={{
                background: 'linear-gradient(310deg, rgba(0, 60, 34, 0) 0%, rgba(0, 60, 34, 0.4) 50.32%, rgba(0, 60, 34, 0.7) 100%)'
            }}
          ></div>

          <div 
            className="absolute inset-0 hidden lg:block"
            style={{
                background: 'linear-gradient(-100deg, rgba(0, 60, 34, 0) 0%, rgba(0, 60, 34, 0.2) 50.32%, rgba(0, 60, 34, 0.7) 100%)'
            }}
          ></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 h-full w-full">
            
            {/* Header Text */}
            <h2 
                className="absolute text-white font-medium"
                style={{
                    fontFamily: '"Google Sans", sans-serif',
                    letterSpacing: '0%',
                }}
            >
                {/* Mobile View (Default) */}
                <span className="
                    block lg:hidden absolute 
                    top-12 left-6 
                    text-2xl leading-9
                    w-[258px]
                    /* Tablet Scaling: slightly larger to fill space */
                    md:text-4xl md:w-[450px] md:top-20 md:left-12
                ">
                    100% Branded Product<br/>
                    Dripping Service
                </span>

                {/* Desktop View (Fixed Position) */}
                <span 
                    className="hidden lg:block absolute"
                    style={{
                        width: '301px',
                        height: '84px',
                        top: '185px', 
                        left: '152px',
                        fontSize: '28px',
                        lineHeight: '42px',
                    }}
                >
                    100% Branded Product<br/>
                    Dripping Service
                </span>
            </h2>

            {/* Contact Button */}
            <Link 
                href="/contact-drip"
                className="
                    absolute flex items-center justify-between 
                    bg-white text-[#003C22] hover:bg-gray-100 transition-colors shadow-lg group
                    
                    /* [!code highlight] MOBILE & EXTREME SMALL DEVICE LOGIC */
                    /* 1. Calculate Width: Fill screen minus 48px margins (24px each side) */
                    w-[calc(100%-48px)]
                    /* 2. Cap Width: Stop expanding at 272px (Your Default Size) */
                    max-w-[272px]
                    /* 3. Height: Grow if text wraps on tiny screens */
                    min-h-[40px] h-auto
                    
                    /* Positioning */
                    top-[425px] left-[24px] 
                    px-[18px] py-[9px]
                    
                    /* Tablet Adjustment (Intermediate) */
                    md:max-w-[320px] md:top-[380px] md:left-[48px]
                    
                    /* [!code highlight] DESKTOP LOGIC (Restored Exact Fixed Position) */
                    lg:w-[341px] lg:h-[50px]
                    lg:top-[293px] lg:left-[152px]
                    lg:max-w-none lg:min-h-0
                    lg:pt-[13px] lg:pr-[34px] lg:pb-[15px] lg:pl-[34px]
                "
                style={{
                    borderRadius: '12px',
                    gap: '4px'
                }}
            >
                <span className="font-semibold text-sm lg:text-sm">Contact Us for Dripping Service</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform shrink-0" />
            </Link>

        </div>
      </div>
    </section>
  );
};

export default DrippingService;