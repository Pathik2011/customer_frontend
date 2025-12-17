// 'use client';
// import React from 'react';
// import { BundleItem, BUY_BTN_CLASS } from './types';

// interface SmallCardProps {
//   item: BundleItem;
// }

// const SmallCard = ({ item }: SmallCardProps) => {
//   return (
//     <div 
//       className="
//         group relative flex flex-col bg-white border border-[#E0E2E7] rounded-[12px] 
//         hover:shadow-lg transition-shadow font-jakarta shrink-0 overflow-visible
        
//         /* Mobile Dimensions (User Specified) */
//         w-[177px] h-[245px]
        
//         /* Desktop Dimensions (User Specified) */
//         lg:w-[240px] lg:h-[317px]
//       "
//     >
//       {/* --- Image Section --- */}
//       {/* Centered vertically in top half */}
//       <div className="w-full flex justify-center items-center pt-4 lg:pt-8 pb-2 grow">
//         <div className="w-[60px] h-[100px] lg:w-[80px] lg:h-[120px] relative transition-transform duration-300 group-hover:scale-105">
//           <img 
//             src={item.image} 
//             alt={item.title} 
//             className="w-full h-full object-contain mix-blend-multiply" 
//           />
//         </div>
//       </div>

//       {/* --- Content Section --- */}
//       <div className="flex flex-col px-3 lg:px-6 w-full mb-4 lg:mb-6">
        
//         {/* Title */}
//         <h3 
//           className="
//             text-gray-900 font-semibold truncate mb-1 lg:mb-2
//             text-[15px] lg:text-[18px]
//           "
//           title={item.title}
//         >
//           {item.title}
//         </h3>
        
//         {/* Description */}
//         <p 
//           className="
//             text-[#4D4D4D] font-medium overflow-hidden
//             text-[11px] leading-[16px] lg:text-[13px] lg:leading-[20px]
//             h-[32px] lg:h-[40px] /* Fixed height for 2 lines */
//           "
//           style={{
//             display: '-webkit-box', 
//             WebkitLineClamp: 2, 
//             WebkitBoxOrient: 'vertical',
//           }}
//         >
//           {item.desc}
//         </p>

//         {/* Footer: Price + Buy Button */}
//         <div className="flex items-end justify-between mt-3 lg:mt-4">
//            <div className="flex flex-col">
//              <span className="font-bold text-[#003C22] text-[18px] lg:text-[22px] leading-none">
//                ₹{Number(item.price).toFixed(0)}
//              </span>
//              <span className="text-[#4D4D4D] text-[11px] lg:text-[13px] font-medium mt-1">
//                for {item.unit}
//              </span>
//            </div>
           
//            <button 
//              className={`${BUY_BTN_CLASS} 
//                w-[55px] h-[34px] text-[13px]
//                lg:w-[65px] lg:h-[38px] lg:text-[14px]
//              `}
//            >
//              Buy
//            </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SmallCard;
'use client';
import React from 'react';
import { BundleItem, BUY_BTN_CLASS } from './types';

interface SmallCardProps {
  item: BundleItem;
  onBuy: () => void; // Added Prop
}

const SmallCard = ({ item, onBuy }: SmallCardProps) => {
  return (
    <div 
      className="
        group relative flex flex-col bg-white border border-[#E0E2E7] rounded-[12px] 
        hover:shadow-lg transition-shadow font-jakarta shrink-0 overflow-visible
        w-[177px] h-[245px] lg:w-[240px] lg:h-[317px]
      "
    >
      <div className="w-full flex justify-center items-center pt-4 lg:pt-8 pb-2 grow">
        <div className="w-[60px] h-[100px] lg:w-[80px] lg:h-[120px] relative transition-transform duration-300 group-hover:scale-105">
          <img 
            src={item.image} 
            alt={item.title} 
            className="w-full h-full object-contain mix-blend-multiply" 
          />
        </div>
      </div>

      <div className="flex flex-col px-3 lg:px-6 w-full mb-4 lg:mb-6">
        <h3 className="text-gray-900 font-semibold truncate mb-1 lg:mb-2 text-[15px] lg:text-[18px]" title={item.title}>
          {item.title}
        </h3>
        <p 
          className="text-[#4D4D4D] font-medium overflow-hidden text-[11px] leading-[16px] lg:text-[13px] lg:leading-[20px] h-[32px] lg:h-[40px]"
          style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
        >
          {item.desc}
        </p>

        <div className="flex items-end justify-between mt-3 lg:mt-4">
           <div className="flex flex-col">
             <span className="font-bold text-[#003C22] text-[18px] lg:text-[22px] leading-none">
               ₹{Number(item.price).toFixed(0)}
             </span>
             <span className="text-[#4D4D4D] text-[11px] lg:text-[13px] font-medium mt-1">
               for {item.unit}
             </span>
           </div>
           
           <button 
             onClick={onBuy} // Added Handler
             className={`${BUY_BTN_CLASS} w-[55px] h-[34px] text-[13px] lg:w-[65px] lg:h-[38px] lg:text-[14px]`}
           >
             Buy
           </button>
        </div>
      </div>
    </div>
  );
};

export default SmallCard;