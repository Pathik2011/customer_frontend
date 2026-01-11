
// 'use client';

// import React from 'react';
// import { useRouter } from 'next/navigation';
// import { BundleItem, BUY_BTN_CLASS } from './types';

// interface LargeCardProps {
//   item: BundleItem;
//   onBuy: () => void;
// }

// const LargeCard = ({ item, onBuy }: LargeCardProps) => {
//   const router = useRouter();

//   const handleNavigate = () => {
//     router.push(`/shop/${item.id}`);
//   };

//   const handleBuy = (e: React.MouseEvent) => {
//     e.stopPropagation(); // Prevent navigation when clicking Buy
//     onBuy();
//   };

//   return (
//     <div 
//       onClick={handleNavigate}
//       className="
//         bg-white border border-[#E0E2E7] rounded-[12px] flex flex-col items-center relative 
//         hover:shadow-lg transition-shadow overflow-hidden font-jakarta cursor-pointer group
//       "
//       // Ensure it fills the fluid container provided by index.tsx
//       style={{ width: '100%', height: '100%' }}
//     >
//       {/* Badge */}
//       <div className="absolute top-4 left-4 z-10 bg-[#E6F4EA] text-[#003C22] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
//         Best Seller
//       </div>

//       {/* Image Section */}
//       <div className="w-full flex justify-center mt-8 lg:mt-10 mb-4 lg:mb-6">
//         <div className="w-[100px] h-[140px] lg:w-[120px] lg:h-[180px] relative transition-transform duration-300 group-hover:scale-105">
//           <img 
//             src={item.image} 
//             alt={item.title} 
//             className="w-full h-full object-contain mix-blend-multiply" 
//           />
//         </div>
//       </div>
      
//       {/* Content Section */}
//       <div 
//         className="flex flex-col items-center text-center px-4 w-full"
//         // Kept max-width for readability, but margin auto keeps it centered in fluid container
//         style={{ maxWidth: '290px', margin: '0 auto' }}
//       >
//         <h3 className="font-bold text-gray-900 text-[18px] lg:text-[22px] mb-2 lg:mb-3 leading-tight group-hover:text-[#003C22] transition-colors">
//           {item.title}
//         </h3>

//         <p 
//           className="text-[#4D4D4D] text-[13px] lg:text-[14px] leading-relaxed font-medium mb-3 overflow-hidden text-ellipsis"
//           style={{
//             display: '-webkit-box',
//             WebkitLineClamp: 3, 
//             WebkitBoxOrient: 'vertical',
//           }}
//         >
//           {item.desc}
//         </p>

//         {item.subDesc && (
//           <p className="text-[#4D4D4D] text-[13px] lg:text-[14px] leading-relaxed">
//             {item.subDesc}
//           </p>
//         )}
//       </div>

//       {/* Footer Section */}
//       {/* Added flex-wrap for safety on very small mobile screens (<320px) */}
//       <div className="mt-auto w-full pb-6 lg:pb-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 px-4">
//            <div className="flex items-baseline gap-1 whitespace-nowrap">
//              <span className="font-bold text-[#003C22] text-[24px] lg:text-[28px]">
//                 ₹{Number(item.price).toFixed(0)} 
//              </span>
//              <span className="text-[#4D4D4D] text-[14px] lg:text-[16px] font-medium">
//                 for {item.unit}
//              </span>
//            </div>
           
//            <button 
//              onClick={handleBuy}
//              className={`${BUY_BTN_CLASS} px-6 py-0 h-[40px] lg:h-[44px] text-[14px] lg:text-[16px] shrink-0 hover:scale-105 active:scale-95 transform transition-all`}
//              style={{ borderRadius: '12px' }}
//            >
//              Buy
//            </button>
//       </div>
//     </div>
//   );
// };

// export default LargeCard;
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { BundleItem, BUY_BTN_CLASS } from './types';
// ✅ Import Animation Wrapper
import AnimatedPress from '@/components/shared/AnimatedPress';

interface LargeCardProps {
  item: BundleItem;
  onBuy: () => void;
}

const LargeCard = ({ item, onBuy }: LargeCardProps) => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push(`/shop/${item.id}`);
  };

  const handleBuy = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation/animation when clicking Buy
    onBuy();
  };

  return (
    // ✅ 1. Wrap in AnimatedPress
    // Added 'group' here so the hover effect flows down to the image
    <AnimatedPress 
      onClick={handleNavigate} 
      className="w-full h-full group"
    >
      <div 
        className="
          bg-white border border-[#E0E2E7] rounded-[12px] flex flex-col items-center relative 
          hover:shadow-lg transition-shadow overflow-hidden font-jakarta
          h-full w-full
        "
      >
        {/* Badge */}
        <div className="absolute top-4 left-4 z-10 bg-[#E6F4EA] text-[#003C22] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Best Seller
        </div>

        {/* Image Section */}
        <div className="w-full flex justify-center mt-8 lg:mt-10 mb-4 lg:mb-6">
          <div className="w-[100px] h-[140px] lg:w-[120px] lg:h-[180px] relative transition-transform duration-300 group-hover:scale-105">
            <img 
              src={item.image} 
              alt={item.title} 
              className="w-full h-full object-contain mix-blend-multiply" 
            />
          </div>
        </div>
        
        {/* Content Section */}
        <div 
          className="flex flex-col items-center text-center px-4 w-full"
          style={{ maxWidth: '290px', margin: '0 auto' }}
        >
          <h3 className="font-bold text-gray-900 text-[18px] lg:text-[22px] mb-2 lg:mb-3 leading-tight group-hover:text-[#003C22] transition-colors">
            {item.title}
          </h3>

          <p 
            className="text-[#4D4D4D] text-[13px] lg:text-[14px] leading-relaxed font-medium mb-3 overflow-hidden text-ellipsis"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 3, 
              WebkitBoxOrient: 'vertical',
            }}
          >
            {item.desc}
          </p>

          {item.subDesc && (
            <p className="text-[#4D4D4D] text-[13px] lg:text-[14px] leading-relaxed">
              {item.subDesc}
            </p>
          )}
        </div>

        {/* Footer Section */}
        <div className="mt-auto w-full pb-6 lg:pb-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 px-4">
              <div className="flex items-baseline gap-1 whitespace-nowrap">
                <span className="font-bold text-[#003C22] text-[24px] lg:text-[28px]">
                  ₹{Number(item.price).toFixed(0)} 
                </span>
                <span className="text-[#4D4D4D] text-[14px] lg:text-[16px] font-medium">
                  for {item.unit}
                </span>
              </div>
              
              <button 
                onClick={handleBuy}
                className={`${BUY_BTN_CLASS} px-6 py-0 h-[40px] lg:h-[44px] text-[14px] lg:text-[16px] shrink-0 hover:scale-105 active:scale-95 transform transition-all`}
                style={{ borderRadius: '12px' }}
              >
                Buy
              </button>
        </div>
      </div>
    </AnimatedPress>
  );
};

export default LargeCard;