'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { SeasonalProduct, SeasonalVariant } from './types';

interface SeasonalProductCardProps {
  product: SeasonalProduct;
}

const SeasonalProductCard = ({ product }: SeasonalProductCardProps) => {
  const [selectedVariant, setSelectedVariant] = useState<SeasonalVariant>(product.variants[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleVariantChange = (variant: SeasonalVariant) => {
    setSelectedVariant(variant);
    setIsDropdownOpen(false);
  };

  // Re-sync if product changes (e.g. user scrolled to next question)
  useEffect(() => {
    if (product.variants.length > 0) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  // [!code fix] Safe access to properties
  const price = selectedVariant?.price || 0;
  const discounted = selectedVariant?.discounted_price || 0;

  return (
    <div className="group relative flex flex-col bg-white border border-[#E0E2E7] rounded-[12px] hover:shadow-lg transition-shadow font-jakarta shrink-0 overflow-visible w-[160px] md:w-[240px] h-[254px] md:h-[348px]">
      
      {/* Image */}
      <div className="relative w-full flex justify-center items-center pt-4 md:pt-[42px] pb-0 cursor-pointer grow">
        <div className="w-[60px] h-[80px] md:w-[80px] md:h-[104px] relative transition-transform duration-300 group-hover:scale-105">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-contain mix-blend-multiply" 
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col px-3 md:px-[24px] w-full">
        <div className="w-full text-[14px] md:text-[16px] font-semibold leading-[100%] tracking-[0.01em] text-gray-900 truncate mb-1 md:mb-[8px]" title={product.name}>
          {product.name}
        </div>
        <div className="text-[12px] md:text-[14px] font-medium leading-[100%] text-[#4D4D4D] mb-2 md:mb-[20px]">
          {product.brand}
        </div>
        <div className="flex items-baseline gap-2 mb-3 md:mb-[20px]">
          {/* [!code fix] Correctly displaying discounted price */}
          <span className="text-[16px] md:text-[20px] font-semibold leading-[100%] tracking-[0.01em] text-[#003C22]">
            ₹{Math.round(discounted)}
          </span>
          {price > discounted && (
             <span className="text-[12px] md:text-[14px] font-medium leading-[100%] tracking-[0.01em] text-black/70 line-through">
               ₹{Math.round(price)}
             </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="px-3 md:px-[24px] pb-3 md:pb-[24px] mt-auto w-full flex items-center justify-between gap-2">
        
        {/* Dropdown */}
        <div className="relative w-full" ref={dropdownRef}>
            <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full h-[32px] md:h-[36px] border border-[#003C22] rounded-[20px] flex items-center justify-between px-2 md:px-[12px] bg-white opacity-90 hover:opacity-100 transition-opacity"
            >
                <span className="text-[10px] md:text-[12px] font-medium text-emerald-900 truncate">
                  {selectedVariant?.size}{selectedVariant?.uom}
                </span>
                <ChevronDown size={14} className="text-emerald-900 shrink-0" />
            </button>

            {isDropdownOpen && (
              <div className="absolute bottom-full left-0 mb-1 w-[140px] md:w-[180px] bg-white border border-gray-200 rounded-lg shadow-xl max-h-[150px] overflow-y-auto z-50">
                {product.variants.map((variant) => (
                  <div 
                    key={variant.product_variant_id}
                    onClick={() => handleVariantChange(variant)}
                    className="px-3 py-2 text-[10px] md:text-[12px] hover:bg-gray-50 cursor-pointer text-gray-700 font-jakarta border-b border-gray-50 last:border-0"
                  >
                    {variant.size}{variant.uom} - ₹{Math.round(variant.discounted_price)}
                  </div>
                ))}
              </div>
            )}
        </div>

        {/* Buy Button */}
        <button className="w-[40px] h-[32px] md:w-[51px] md:h-[36px] bg-[#003C22] border border-[#003C22] rounded-[12px] flex items-center justify-center hover:bg-emerald-800 transition-colors shrink-0">
            <span className="text-white text-[12px] md:text-[14px] font-medium">Buy</span>
        </button>
      </div>
    </div>
  );
};

export default SeasonalProductCard;