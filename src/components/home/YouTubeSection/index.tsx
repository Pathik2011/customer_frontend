'use client';

import React, { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useDraggableScroll } from '@/hooks/useDraggableScroll';
import { ApiYoutubeVideo } from '@/types/homeApi';
import VideoCard from './VideoCard';

const hideScrollStyle = `
  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
`;

interface YouTubeSectionProps {
  data: ApiYoutubeVideo[];
  title?: string;
}

const YouTubeSection = ({ data, title }: YouTubeSectionProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Use shared hook for Drag & Wheel behavior
  useDraggableScroll(scrollRef);

  if (!data || data.length === 0) return null;

  // Manual Arrows
  const handleScrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -330, behavior: 'smooth' });
  };

  const handleScrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: 330, behavior: 'smooth' });
  };

  // Update dots on scroll
  const handleScroll = () => {
    if (scrollRef.current) {
        // [!code changed] Updated math for new gap:
        // Mobile: 306px card + 80px gap = 386px
        // Desktop: 306px card + 24px gap = 330px
        const itemWidth = window.innerWidth < 834 ? 386 : 330; 
        const index = Math.round(scrollRef.current.scrollLeft / itemWidth);
        setActiveIndex(index);
    }
  };

  return (
    <section 
      className="w-full flex justify-center items-center relative overflow-hidden font-jakarta h-[523px] min-[834px]:h-[624px]"
    >
      <style>{hideScrollStyle}</style>

      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-white">
        <img 
          src="/Home/Youtube/1.png" 
          alt="Youtube Background" 
          className="w-full h-full object-cover opacity-50"
        />
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(116.33deg, rgba(255, 255, 255, 0.5) 0.34%, rgba(255, 255, 255, 0.7) 98.84%)'
          }}
        ></div>
      </div>

      <div className="w-full max-w-[1298px] h-full relative z-10 flex flex-col items-center">
        
        {/* --- Header Section --- */}
        <div 
            className="flex flex-col items-center text-center absolute top-[40px] min-[834px]:top-[80px]"
        >
            <h2 
                className="text-[#000000] mb-4 font-medium leading-[100%] text-[20px] min-[834px]:text-[28px]"
                style={{ fontFamily: '"Google Sans", sans-serif' }}
            >
                {title || "Watch Us On Youtube"}
            </h2>
            <p 
                className="text-[#4D4D4D] font-semibold min-[834px]:font-normal text-[14px] min-[834px]:text-[15px] leading-[26px] tracking-[0.01em]"
                style={{
                    maxWidth: '283px', // Mobile width constraint
                    // Desktop width override
                }}
            >
                <span className="min-[834px]:hidden">Stay updated with the latest farming<br/> techniques and product launches.</span>
                <span className="hidden min-[834px]:inline">Stay updated with the latest farming techniques and product launches.</span>
            </p>
        </div>
        
        {/* --- Video Scroll Container --- */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="
            /* [!code changed] Increased mobile gap to 80px (gap-20) to hide neighbors */
            flex gap-20 min-[834px]:gap-6 overflow-x-auto no-scrollbar py-4 w-full absolute
            select-none snap-x snap-mandatory lg:snap-none
            cursor-grab active:cursor-grabbing
            top-[180px] min-[834px]:top-[224px]
          "
        >
          {/* Spacers for Centering */}
          <div className="hidden lg:block shrink-0" style={{ width: '152px' }}></div>
          
          {/* Mobile Spacer: (Screen Width - Card Width) / 2 -> (393 - 306) / 2 = 43.5px */}
          <div className="block lg:hidden shrink-0" style={{ width: 'calc(50vw - 153px)' }}></div>

          {data.map((video) => (
             <div key={video.video_id} className="snap-center shrink-0">
                 {/* Wrapper to force dimensions on mobile 
                    Mobile: 306x190
                    Desktop: Default VideoCard size (likely handled inside or via auto)
                 */}
                 <div className="w-[306px] h-[190px] min-[834px]:w-auto min-[834px]:h-auto">
                    <VideoCard video={video} />
                 </div>
                 
                 {/* Mobile Title (External to card based on spec "Video title... top 5269") */}
                 <div className="min-[834px]:hidden mt-4 text-center">
                    <h3 className="text-[15px] font-semibold text-black font-jakarta leading-[100%] tracking-[0.01em] truncate w-[306px]">
                        {video.title}
                    </h3>
                 </div>
             </div>
          ))}

          <div className="block lg:hidden shrink-0" style={{ width: 'calc(50vw - 153px)' }}></div>
          <div className="hidden lg:block shrink-0" style={{ width: '24px' }}></div>
        </div>

        {/* --- Slider Controls --- */}
        <div 
            className="flex items-center justify-center gap-4 absolute"
            style={{ 
                bottom: '40px', // Responsive positioning relative to bottom might be safer
                width: '100%' 
            }}
        >
            <button onClick={handleScrollLeft} className="p-2 transition-colors hover:text-[#003C22]">
                <ArrowLeft size={24} className="text-[#003C22]" />
            </button>

            {/* Pagination Dots */}
            <div className="flex gap-2">
                {[0, 1, 2].map((dotIndex) => (
                    <div 
                        key={dotIndex}
                        className={`w-2.5 h-2.5 rounded-full transition-colors ${
                             (activeIndex % 3 === dotIndex) ? 'bg-[#003C22]' : 'bg-[#003C22]/30'
                        }`}
                    ></div>
                ))}
            </div>

            <button onClick={handleScrollRight} className="p-2 transition-colors hover:text-[#003C22]">
                <ArrowRight size={24} className="text-[#003C22]" />
            </button>
        </div>

      </div>
    </section>
  );
};

export default YouTubeSection;