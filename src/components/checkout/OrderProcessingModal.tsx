'use client';

import React from 'react';

interface OrderProcessingModalProps {
  isOpen: boolean;
  status: string; // "Securing connection...", etc.
  step: number;   // Used for the progress bar
}

const OrderProcessingModal = ({ isOpen, status, step }: OrderProcessingModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center px-4 animate-in fade-in duration-300">
      {/* 1. Blurred Dark Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md"></div>

      {/* 2. White Card */}
      <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-[360px] p-6 relative z-10 flex flex-col items-center text-center">
        
        {/* 3. The Video Container (Animation) */}
        <div className="w-full aspect-[4/3] bg-gray-50 rounded-[20px] mb-6 overflow-hidden relative shadow-inner border border-gray-100">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline // Important for mobile
            className="w-full h-full object-cover"
          >
            {/* Make sure the path matches where you put the video */}
            <source src="/checkout/processing-animation.mp4" type="video/mp4" />
                
          </video>

          {/* Optional: A slight overlay to make text pop if needed, or just specific branding */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
        </div>

        {/* 4. Dynamic Status Text */}
        <h3 className="text-lg font-bold text-[#1D1F2C] mb-1 min-h-[28px] animate-in slide-in-from-bottom-1 fade-in">
          {status}
        </h3>
        
        {/* 5. Subtext */}
        <p className="text-xs text-gray-400 mb-5 uppercase tracking-wider font-semibold">
          Please wait...
        </p>

        {/* 6. Progress Bar */}
        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
           <div 
             className="h-full bg-[#003C22] transition-all duration-700 ease-out"
             style={{ width: step === 1 ? '30%' : step === 2 ? '65%' : '95%' }}
           ></div>
        </div>

      </div>
    </div>
  );
};

export default OrderProcessingModal;