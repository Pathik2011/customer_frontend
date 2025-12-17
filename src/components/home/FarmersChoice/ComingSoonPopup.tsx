'use client';
import React from 'react';
import { X, Clock } from 'lucide-react';

interface ComingSoonPopupProps {
  onClose: () => void;
}

const ComingSoonPopup = ({ onClose }: ComingSoonPopupProps) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 font-jakarta">
      <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-[320px] md:w-[400px] flex flex-col items-center text-center animate-in fade-in zoom-in duration-200">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
        >
          <X size={18} className="text-gray-600" />
        </button>

        {/* Icon */}
        <div className="w-12 h-12 bg-[#E8F5E9] rounded-full flex items-center justify-center mb-4 text-[#003C22]">
            <Clock size={24} strokeWidth={2.5} />
        </div>

        {/* Gujarati Text */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">
            થોડી રાહ જુઓ
        </h3>
        <p className="text-gray-600 font-medium">
            અમે તમારા માટે આ ખાસ ફીચર લાવી રહ્યા છીએ!
        </p>

        {/* OK Button */}
        <button 
            onClick={onClose}
            className="mt-6 w-full bg-[#003C22] text-white py-2.5 rounded-xl font-semibold hover:bg-[#002a18] transition-colors"
        >
            OK
        </button>
      </div>
    </div>
  );
};

export default ComingSoonPopup;