'use client';
import React from 'react';
import { BundleItem, BUY_BTN_CLASS } from './types';

interface LargeCardProps {
  item: BundleItem;
}

const LargeCard = ({ item }: LargeCardProps) => {
  return (
    <div 
      className="bg-white border border-[#E0E2E7] rounded-[12px] flex flex-col items-center relative hover:shadow-lg transition-shadow overflow-hidden"
      style={{ width: '100%', height: '100%' }}
    >
      {/* --- Image Section --- */}
      {/* Centered at top with specific padding/margin */}
      <div className="w-full flex justify-center mt-8 lg:mt-10 mb-6">
        <div className="w-[100px] h-[140px] lg:w-[120px] lg:h-[180px] relative transition-transform duration-300 hover:scale-105">
          <img 
            src={item.image} 
            alt={item.title} 
            className="w-full h-full object-contain mix-blend-multiply" 
          />
        </div>
      </div>
      
      {/* --- Content Section --- */}
      {/* Width 290px centered as requested */}
      <div 
        className="flex flex-col items-center text-center px-4"
        style={{
           maxWidth: '290px', 
           margin: '0 auto' 
        }}
      >
        {/* Title */}
        <h3 className="font-bold text-gray-900 text-[18px] lg:text-[22px] mb-3 font-jakarta leading-tight">
          {item.title}
        </h3>

        {/* Description - [!code fix] Limited to 3 lines */}
        <p 
          className="text-[#4D4D4D] text-[13px] lg:text-[14px] leading-relaxed font-medium mb-3 overflow-hidden text-ellipsis"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 3, // Limit to 3 lines
            WebkitBoxOrient: 'vertical',
          }}
        >
          {item.desc}
        </p>

        {/* Sub Description */}
        {item.subDesc && (
          <p className="text-[#4D4D4D] text-[13px] lg:text-[14px] leading-relaxed">
            {item.subDesc}
          </p>
        )}
      </div>

      {/* --- Footer Section --- */}
      {/* Price + Buy Button row */}
      <div className="mt-auto w-full pb-8 flex items-center justify-center gap-4">
           
           <div className="flex items-baseline gap-1">
             <span className="font-bold text-[#003C22] text-[24px] lg:text-[28px]">
                ₹{Number(item.price).toFixed(0)} 
             </span>
             <span className="text-[#4D4D4D] text-[14px] lg:text-[16px] font-medium">
                for {item.unit}
             </span>
           </div>
           
           <button 
             className={`${BUY_BTN_CLASS} px-6 py-2 text-[14px] lg:text-[16px] h-[40px] lg:h-[44px]`}
           >
             Buy
           </button>
      </div>
    </div>
  );
};

export default LargeCard;