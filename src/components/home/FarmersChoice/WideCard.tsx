
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { BundleItem, BUY_BTN_CLASS } from './types';
import AnimatedPress from '@/components/shared/AnimatedPress';

interface WideCardProps {
  item: BundleItem;
  onBuy: () => void;
}

const WideCard = ({ item, onBuy }: WideCardProps) => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push(`/shop/${item.id}`);
  };

  const handleBuy = (e: React.MouseEvent) => {
    e.stopPropagation();
    onBuy();
  };

  return (
     <AnimatedPress 
      onClick={handleNavigate} 
      className="w-full h-full group"
  >

    <div 
      onClick={handleNavigate}
      className="
        bg-white border border-[#E0E2E7] rounded-[12px] flex flex-row items-center 
        p-4 lg:p-6 gap-4 lg:gap-6 w-full h-full hover:shadow-lg transition-shadow 
        font-jakarta cursor-pointer group
      "
    >
      <div className="w-[60px] h-[80px] lg:w-[80px] lg:h-[100px] shrink-0 group-hover:scale-105 transition-transform duration-300">
          <img src={item.image} alt={item.title} className="w-full h-full object-contain mix-blend-multiply" />
      </div>
      
      {/* Content: Added min-w-0 to fix flexbox truncation issues on laptop resizing */}
      <div className="flex-1 text-left min-w-0">
          <div className="mb-1">
             <span className="bg-[#FFF0F0] text-[#D92D20] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
               Hot Deal
             </span>
          </div>
          <h3 className="font-bold text-[16px] lg:text-[18px] text-gray-900 mb-1 lg:mb-2 group-hover:text-[#003C22] transition-colors truncate">
            {item.title}
          </h3>
          <p className="text-[12px] lg:text-[14px] text-gray-500 leading-snug line-clamp-2">
            {item.desc}
          </p>
      </div>

      <div className="flex flex-col items-end gap-2 shrink-0">
          <div className="flex flex-col items-end">
            <span className="text-[18px] lg:text-[20px] font-bold text-[#003C22]">₹{item.price}</span>
            <span className="text-[11px] lg:text-[12px] text-gray-500 whitespace-nowrap">for {item.unit}</span>
          </div>
          <button 
            onClick={handleBuy}
            className={`${BUY_BTN_CLASS} w-[60px] h-[34px] lg:w-[70px] lg:h-[36px] text-xs hover:scale-105 active:scale-95 transform transition-all`}
          >
            Buy
          </button>
      </div>
    </div>
    </AnimatedPress>
  );
};

export default WideCard;