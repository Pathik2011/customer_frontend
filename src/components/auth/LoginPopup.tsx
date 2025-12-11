'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { signInWithRedirect, signOut } from 'aws-amplify/auth';

interface LoginPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginPopup = ({ isOpen, onClose }: LoginPopupProps) => {
  // Prevent background scrolling when popup is open
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

  const handleGoogleLogin = async () => {
    try {
      // 1. Clear any stale session first
      try { await signOut(); } catch (err) { /* ignore */ }
      
      // 2. Redirect to Google
      await signInWithRedirect({ provider: 'Google' });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 transition-opacity" onClick={onClose} />

      {/* Modal Content */}
      <div className="relative w-full sm:w-[400px] bg-white rounded-t-2xl sm:rounded-2xl p-6 shadow-xl animate-in slide-in-from-bottom-10 fade-in duration-300 font-jakarta">
        
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-[20px] font-bold text-[#000000]">Login</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <X size={24} className="text-[#000000]" />
          </button>
        </div>

        {/* --- Mobile Number Input (Placeholder UI) --- */}
        <div className="mb-6">
          <label className="block text-[16px] font-medium text-[#000000] mb-3">Mobile Number</label>
          <div className="flex h-[50px] w-full">
            <div className="w-[70px] bg-[#F3F4F6] border border-[#E5E7EB] border-r-0 rounded-l-[8px] flex items-center justify-center text-[16px] font-medium text-[#000000]">+91</div>
            <input type="tel" placeholder="Enter Mobile Number" className="flex-1 border border-[#E5E7EB] rounded-r-[8px] px-4 text-[16px] outline-none focus:border-[#003C22] transition-colors placeholder:text-[#9CA3AF]" />
          </div>
        </div>

        <button className="w-full h-[50px] bg-[#003C22] text-white rounded-[8px] font-bold text-[16px] hover:bg-[#012918] transition-colors mb-4">Continue</button>

        {/* Divider */}
        <div className="relative flex py-2 items-center mb-4">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {/* --- Google Login Button --- */}
        <button 
          type="button"
          onClick={handleGoogleLogin}
          className="w-full h-[50px] border border-[#E5E7EB] bg-white text-[#1F2937] rounded-[8px] font-semibold text-[16px] hover:bg-gray-50 transition-colors flex items-center justify-center gap-3"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6" />
          Login with Google
        </button>

        <p className="mt-6 text-center text-[12px] leading-[18px] text-[#6B7280]">
          By continuing you agree that you have read and accept our <a href="#" className="underline decoration-1 underline-offset-2 text-[#003C22]">Terms & Conditions</a> and <a href="#" className="underline decoration-1 underline-offset-2 text-[#003C22]">Privacy Policy</a>.
        </p>

      </div>
    </div>
  );
};

export default LoginPopup;