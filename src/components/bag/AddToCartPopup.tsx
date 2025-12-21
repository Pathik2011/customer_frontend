'use client';

import React, { useEffect } from 'react';
import { X, CheckCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface AddToCartPopupProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productImage: string;
}

const AddToCartPopup = ({ isOpen, onClose, productName, productImage }: AddToCartPopupProps) => {
  
  // Auto-close after 5 seconds if user does nothing
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex justify-center items-end md:items-start md:justify-end pointer-events-none">
      
      {/* Mobile Backdrop (Optional - makes it focus) */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-[1px] md:hidden pointer-events-auto" 
        onClick={onClose}
      />

      {/* Popup Card */}
      <div className="
        relative w-full md:w-[380px] bg-white 
        rounded-t-2xl md:rounded-xl 
        shadow-[0_-8px_30px_rgba(0,0,0,0.12)] md:shadow-[0_8px_30px_rgba(0,0,0,0.12)]
        border border-gray-100
        overflow-hidden 
        animate-in slide-in-from-bottom-full md:slide-in-from-right-10 duration-300
        font-jakarta pointer-events-auto
        md:m-6 md:mt-[88px] /* Offset from top header */
      ">
        
        {/* Header */}
        <div className="bg-[#013220] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white">
            <CheckCircle size={18} className="text-[#4ADE80]" />
            <span className="font-bold text-sm tracking-wide">Added to Bag</span>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 flex gap-4">
           {/* Product Image */}
           <div className="w-[60px] h-[70px] bg-gray-50 rounded-lg border border-gray-100 shrink-0 flex items-center justify-center p-1">
              <img 
                src={productImage || '/placeholder.png'} 
                alt={productName} 
                className="w-full h-full object-contain mix-blend-multiply"
              />
           </div>

           {/* Details */}
           <div className="flex-1 flex flex-col justify-center">
              <h4 className="font-bold text-gray-900 text-sm leading-snug line-clamp-2" title={productName}>
                {productName}
              </h4>
              <p className="text-xs text-gray-500 mt-1">Item added successfully</p>
           </div>
        </div>

        {/* Actions */}
        <div className="p-4 pt-0 grid grid-cols-2 gap-3">
           <button 
             onClick={onClose}
             className="h-[40px] rounded-lg border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-colors"
           >
             Continue Shopping
           </button>
           
           <Link 
             href="/bag"
             onClick={onClose}
             className="h-[40px] rounded-lg bg-[#013220] text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#002a18] transition-colors shadow-sm"
           >
             View Bag <ArrowRight size={14} />
           </Link>
        </div>

        {/* Progress Bar (Timer Visual) */}
        <div className="h-1 w-full bg-gray-100">
           <div className="h-full bg-[#4ADE80] w-full animate-[shrink_5s_linear_forwards]" />
        </div>

      </div>
    </div>
  );
};

export default AddToCartPopup;