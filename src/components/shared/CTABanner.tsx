
'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const CTABanner = () => {
  return (
    <div className="w-full flex justify-center px-0 md:px-4 xl:px-0 font-jakarta">
      <div 
        className="relative overflow-hidden md:rounded-[22px] transition-all duration-300"
        style={{
          width: '100%',
          maxWidth: '1432px', 
        }}
      >
        <div className="h-[523px] md:h-[448px] w-full relative">
          
          {/* Mobile Background */}
          <div className="absolute inset-0 md:hidden">
            <img src="/CTABanner/Mobile_CTABanner.png" alt="Contact Us" className="w-full h-full object-cover" />
          </div>

          {/* Desktop Background */}
          <div className="absolute inset-0 hidden md:block">
            <img src="/CTABanner/CTABanner.png" alt="Contact Us" className="w-full h-full object-cover" />
          </div>

          {/* --- Mobile Content Overlay --- */}
          <div 
            className="absolute flex flex-col items-start justify-between z-20 md:hidden"
            style={{
              top: '375px',
              left: '24px',
              // [!code changed] Changed width to 'auto' to allow text to expand
              width: 'auto', 
              height: '90px',
              borderRadius: '8px',
            }}
          >
             <h2 
              // [!code highlight] Added 'whitespace-nowrap'
              className="text-white font-medium drop-shadow-md text-left whitespace-nowrap"
              style={{
                fontFamily: '"Google Sans", "Plus Jakarta Sans", sans-serif',
                fontSize: '20px',
                lineHeight: '100%',
              }}
            >
              If you have any questions?
            </h2>

            <Link href="/about-us"> 
              <button 
                className="flex items-center justify-center gap-2 hover:bg-yellow-300 transition-colors cursor-pointer bg-[#FFEB6D] text-[#003C22] rounded-[12px]"
                style={{
                  width: '182px', 
                  height: '50px',
                  padding: '13px 20px',
                  fontFamily: '"Google Sans", "Plus Jakarta Sans", sans-serif',
                  fontWeight: 600
                }}
              >
                <span className="text-sm font-bold whitespace-nowrap">Contact Us</span>
                <ArrowRight size={16} className="stroke-2" />
              </button>
            </Link>
          </div>

          {/* --- Desktop Content Overlay --- */}
          <div className="absolute inset-0 hidden md:block z-10 pointer-events-none">
            
            {/* Text */}
            <div 
              // [!code highlight] Added 'whitespace-nowrap'
              className="absolute text-white flex items-center justify-center text-center drop-shadow-md whitespace-nowrap"
              style={{
                // [!code changed] Changed fixed width to '100%' or removed it so it doesn't force wrap
                width: '100%',
                maxWidth: '100%',
                height: '66px',
                top: '158px',
                // [!code changed] Removed 'left: 397px' to center it properly via Flexbox/CSS 
                // Since parent is relative, we can center it like this:
                left: '0', 
                right: '0',
                margin: '0 auto',

                fontFamily: '"Google Sans", "Plus Jakarta Sans", sans-serif',
                fontWeight: 500,
                fontSize: '52px',
                lineHeight: '100%',
                textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
              }}
            >
              If you have any questions?
            </div>

            {/* Button */}
            {/* Note: Updated left position logic to ensure it stays centered under the text if needed, 
                or kept your original fixed position if that matches the background image art. 
                I kept your original position for the button. */}
            <Link href="/about-us" className="pointer-events-auto absolute" style={{ top: '248px', left: '625px' }}>
                <button 
                  className="flex items-center justify-center gap-2 hover:bg-yellow-300 transition-colors cursor-pointer bg-[#FFEB6D] text-[#003C22] rounded-[12px]"
                  style={{
                    width: '182px',
                    height: '50px',
                    padding: '13px 34px 15px 34px',
                    fontFamily: '"Google Sans", "Plus Jakarta Sans", sans-serif',
                    fontWeight: 600
                  }}
                >
                  <span className="text-sm font-bold whitespace-nowrap">Contact Us</span>
                  <ArrowRight size={16} className="stroke-2" />
                </button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CTABanner;