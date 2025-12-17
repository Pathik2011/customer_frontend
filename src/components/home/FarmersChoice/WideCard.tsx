// 'use client';
// import React from 'react';
// import { BundleItem, BUY_BTN_CLASS } from './types';

// interface WideCardProps {
//   item: BundleItem;
// }

// const WideCard = ({ item }: WideCardProps) => (
//   <div 
//     className="bg-white border border-[#E0E2E7] rounded-[12px] flex flex-row items-center p-4 lg:p-6 gap-4 lg:gap-6 w-full h-full hover:shadow-lg transition-shadow font-jakarta"
//   >
//     <div className="w-[60px] h-[80px] lg:w-[80px] lg:h-[100px] shrink-0">
//         <img src={item.image} alt={item.title} className="w-full h-full object-contain mix-blend-multiply" />
//     </div>
    
//     <div className="flex-1 text-left">
//         <h3 className="font-bold text-[16px] lg:text-[18px] text-gray-900 mb-1 lg:mb-2">{item.title}</h3>
//         <p className="text-[12px] lg:text-[14px] text-gray-500 leading-snug line-clamp-2">{item.desc}</p>
//     </div>

//     <div className="flex flex-col items-end gap-2 shrink-0">
//         <div className="flex flex-col items-end">
//           <span className="text-[18px] lg:text-[20px] font-bold text-[#003C22]">₹{item.price}</span>
//           <span className="text-[11px] lg:text-[12px] text-gray-500">for {item.unit}</span>
//         </div>
//         <button 
//           className={`${BUY_BTN_CLASS} w-[60px] h-[34px] lg:w-[70px] lg:h-[36px] text-xs`}
//         >
//           Buy
//         </button>
//     </div>
//   </div>
// );

// export default WideCard;
'use client';
import React from 'react';
import { BundleItem, BUY_BTN_CLASS } from './types';

interface WideCardProps {
  item: BundleItem;
  onBuy: () => void; // Added Prop
}

const WideCard = ({ item, onBuy }: WideCardProps) => (
  <div className="bg-white border border-[#E0E2E7] rounded-[12px] flex flex-row items-center p-4 lg:p-6 gap-4 lg:gap-6 w-full h-full hover:shadow-lg transition-shadow font-jakarta">
    <div className="w-[60px] h-[80px] lg:w-[80px] lg:h-[100px] shrink-0">
        <img src={item.image} alt={item.title} className="w-full h-full object-contain mix-blend-multiply" />
    </div>
    
    <div className="flex-1 text-left">
        <h3 className="font-bold text-[16px] lg:text-[18px] text-gray-900 mb-1 lg:mb-2">{item.title}</h3>
        <p className="text-[12px] lg:text-[14px] text-gray-500 leading-snug line-clamp-2">{item.desc}</p>
    </div>

    <div className="flex flex-col items-end gap-2 shrink-0">
        <div className="flex flex-col items-end">
          <span className="text-[18px] lg:text-[20px] font-bold text-[#003C22]">₹{item.price}</span>
          <span className="text-[11px] lg:text-[12px] text-gray-500">for {item.unit}</span>
        </div>
        <button 
          onClick={onBuy} // Added Handler
          className={`${BUY_BTN_CLASS} w-[60px] h-[34px] lg:w-[70px] lg:h-[36px] text-xs`}
        >
          Buy
        </button>
    </div>
  </div>
);

export default WideCard;