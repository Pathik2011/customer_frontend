'use client';

import React from 'react';
import { CheckCircle, ShoppingBag, FileText, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface OrderSuccessPopupProps {
  isOpen: boolean;
  onClose: () => void; // Optional: if you want to allow closing
}

const OrderSuccessPopup = ({ isOpen, onClose }: OrderSuccessPopupProps) => {
  const router = useRouter();

  if (!isOpen) return null;

  const handleShopMore = () => {
    router.push('/shop'); // Redirect to Shop
  };

  const handleViewStatus = () => {
    // Dev Stage Placeholder
    alert("🚧 Order Status Page is under construction! \n\nCheck back soon to track your order.");
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center px-4 animate-in fade-in duration-200">
      {/* 1. Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* 2. Card */}
      <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-[420px] p-8 relative z-10 flex flex-col items-center text-center animate-in zoom-in-95 duration-300">
        
        {/* Success Icon Animation */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="w-10 h-10 text-[#003C22] animate-bounce" />
        </div>

        {/* Text Content */}
        <h2 className="text-2xl font-bold text-[#1D1F2C] mb-2">Order Placed!</h2>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Thank you for your purchase. Your order has been received and is being processed.
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-3 w-full">
          {/* Primary Button: Shop More */}
          <button 
            onClick={handleShopMore}
            className="w-full h-[50px] bg-[#003C22] text-white rounded-[12px] font-bold text-sm hover:bg-emerald-900 transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingBag size={18} />
            Shop More
          </button>

          {/* Secondary Button: View Status */}
          <button 
            onClick={handleViewStatus}
            className="w-full h-[50px] bg-transparent border border-gray-200 text-gray-700 rounded-[12px] font-bold text-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <FileText size={18} />
            View Order Status
          </button>
        </div>

      </div>
    </div>
  );
};

export default OrderSuccessPopup;