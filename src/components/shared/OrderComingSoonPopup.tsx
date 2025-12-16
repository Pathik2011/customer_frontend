'use client';

import React, { useEffect } from 'react';
import { X, ShoppingBag } from 'lucide-react';

interface OrderComingSoonPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const OrderComingSoonPopup = ({ isOpen, onClose }: OrderComingSoonPopupProps) => {
  // Prevent background scrolling
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 font-jakarta">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 transition-opacity backdrop-blur-sm" 
        onClick={onClose} 
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-sm bg-white rounded-2xl p-6 shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute right-4 top-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
        >
          <X size={20} className="text-gray-600" />
        </button>

        {/* Content */}
        <div className="flex flex-col items-center text-center pt-4">
          <div className="w-16 h-16 bg-[#FFF8F0] rounded-full flex items-center justify-center mb-6">
            <ShoppingBag size={32} className="text-[#003C22]" />
          </div>
          
          <h2 className="text-xl font-bold text-[#000000] mb-2">
            ક્ષમા કરશો!
          </h2>
          
          <p className="text-lg font-medium text-[#4D4D4D] mb-6">
            ઓનલાઇન ઓર્ડર સુવિધા ટૂંક સમયમાં શરૂ થશે.
          </p>

          <button 
            onClick={onClose}
            className="w-full h-[48px] bg-[#003C22] text-white rounded-xl font-semibold hover:bg-emerald-900 transition-colors"
          >
            Okay
          </button>
        </div>

      </div>
    </div>
  );
};

export default OrderComingSoonPopup;