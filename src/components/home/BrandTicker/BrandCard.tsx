'use client';
import React from 'react';
import { BrandItem } from './types';

interface BrandCardProps {
  brand: BrandItem;
}

const BrandCard = ({ brand }: BrandCardProps) => {
  return (
    <div 
        className="
          flex justify-center items-center shrink-0 bg-white 
          hover:shadow-sm transition-shadow rounded-[12px] border border-[#E0E2E7]
        "
        style={{
            width: '206px',
            height: '100px',
        }}
    >
        {/* Logo Container */}
        <div className="w-[120px] h-[60px] opacity-60 hover:opacity-100 transition-opacity">
            <img 
                src={brand.image} 
                alt={brand.name} 
                className="w-full h-full object-contain mix-blend-multiply grayscale hover:grayscale-0 transition-all duration-300" 
            />
        </div>
    </div>
  );
};

export default BrandCard;