

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useDraggableScroll } from '@/hooks/useDraggableScroll';

const SHOW_DESIGN_OVERLAY = false; 

const SLIDES = [
  {
    id: 3,
    image: '/Home/Banner/1.jpg',
    title: 'Empowering Farmers',
    subtitle: 'With Modern Solutions',
    description: 'Discover the latest in agricultural technology and high-quality seeds to maximize your yield and ensure a sustainable future for your farm.',
    useCustomGradient: true,
  },
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1920&auto=format&fit=crop',
    title: 'Find the Best Solution',
    subtitle: 'for Your Crops Instantly!',
    description: 'Get top-quality agriculture products delivered to your farm fast! Save time, skip the hassle, and ensure a healthy, thriving harvest with quick, reliable delivery.',
    useCustomGradient: false,
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1920&auto=format&fit=crop',
    title: 'Protect Your Harvest',
    subtitle: 'with Premium Pesticides',
    description: 'Effective solutions for a healthy and disease-free farm. Protect your crops from pests and diseases with our premium range of pesticides.',
    useCustomGradient: false,
  }
];

const HomeBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  useDraggableScroll(scrollRef);

  useEffect(() => {
    const timer = setInterval(() => {
        if (scrollRef.current) {
            const nextIndex = (currentSlide + 1) % SLIDES.length;
            scrollToSlide(nextIndex);
        }
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const scrollToSlide = (index: number) => {
    if (scrollRef.current) {
        scrollRef.current.scrollTo({
            left: index * scrollRef.current.clientWidth,
            behavior: 'smooth'
        });
        setCurrentSlide(index);
    }
  };

  const nextSlide = () => scrollToSlide((currentSlide + 1) % SLIDES.length);
  const prevSlide = () => scrollToSlide(currentSlide === 0 ? SLIDES.length - 1 : currentSlide - 1);

  const handleScroll = () => {
    if (scrollRef.current) {
        const index = Math.round(scrollRef.current.scrollLeft / scrollRef.current.clientWidth);
        if (index !== currentSlide && index >= 0 && index < SLIDES.length) {
            setCurrentSlide(index);
        }
    }
  };

  return (
    <div className="w-full relative overflow-hidden font-jakarta group h-[523px] lg:h-[528px]">
      
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex w-full h-full overflow-x-auto snap-x snap-mandatory no-scrollbar select-none"
      >
        {SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className="min-w-full w-full h-full shrink-0 snap-center relative"
          >
            {/* Background */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
                draggable={false}
              />
              
              {/* [!code changed] Split Gradient: Mobile vs Desktop */}
              <div className="absolute inset-0">
                  {/* Mobile View: Apply Custom Green Gradient if enabled */}
                  <div 
                    className="absolute inset-0 lg:hidden"
                    style={{
                      background: slide.useCustomGradient 
                        ? 'linear-gradient(90deg, rgba(0, 60, 34, 0.7) 0%, rgba(0, 60, 34, 0) 50.32%, rgba(0, 60, 34, 0) 100%)'
                        : 'rgba(0, 0, 0, 0.4)'
                    }}
                  />

                  {/* Desktop View: Always use standard dark overlay */}
                  <div 
                    className="absolute inset-0 hidden lg:block"
                    style={{ background: 'rgba(0, 0, 0, 0.4)' }}
                  />
              </div>
              
              {/* DESIGN OVERLAY IMAGE (Top Right) */}
              {SHOW_DESIGN_OVERLAY && (
                <img 
                    src="/Home/Banner/design.png" 
                    alt="Decorative Design"
                    className="absolute top-0 right-0 z-10 pointer-events-none object-contain"
                    style={{
                        maxWidth: '70%', 
                        maxHeight: '70%'
                    }}
                />
              )}
            </div>

            {/* Desktop Text */}
            <div className="relative h-full w-full max-w-[1600px] mx-auto pointer-events-none">
              <h2 
                className="hidden lg:block absolute text-white drop-shadow-md pointer-events-auto"
                style={{
                   width: '583px',
                   height: '132px',
                   top: '100px',
                   left: '88px',
                   fontFamily: '"Google Sans", sans-serif',
                   fontWeight: 500, 
                   fontSize: '52px',
                   lineHeight: '100%',
                   letterSpacing: '0%'
                }}
              >
                <span className="text-[#F4E06D]">{slide.title}</span> <br />
                {slide.subtitle}
              </h2>

              <p 
                className="hidden lg:block absolute text-white drop-shadow-md pointer-events-auto"
                style={{
                   width: '585px',
                   height: '52px',
                   top: '254px',
                   left: '88px',
                   fontFamily: '"Plus Jakarta Sans", sans-serif',
                   fontWeight: 600, 
                   fontSize: '15px',
                   lineHeight: '26px',
                   letterSpacing: '0.01em' 
                }}
              >
                {slide.description}
              </p>

              <Link 
                 href="/shop"
                 prefetch={false}
                 className="hidden lg:flex absolute z-20 cursor-pointer items-center justify-center transition-transform hover:scale-105 active:scale-95 pointer-events-auto"
                 style={{ 
                   width: '175px', 
                   height: '50px',
                   top: '360px', 
                   left: '88px',
                   opacity: 1,
                   borderRadius: '12px',
                   padding: 0,
                   backgroundColor: 'transparent',
                   border: 'none',
                 }}
              >
                 <img 
                   src="/Home/Button_desktop.png" 
                   alt="Shop Now" 
                   className="w-full h-full object-contain"
                   draggable={false}
                   onError={(e) => {
                     const target = e.currentTarget;
                     target.style.display = 'none';
                     const parent = target.parentElement;
                     if(parent) {
                       parent.style.backgroundColor = '#F4E06D';
                       parent.innerText = 'Shop Now';
                       parent.style.color = '#013220';
                       parent.style.fontWeight = 'bold';
                       parent.style.fontSize = '14px';
                       parent.style.padding = '13px 34px';
                     }
                   }}
                 />
              </Link>
            </div>

            {/* Mobile Text */}
            <div className="lg:hidden absolute inset-0 pointer-events-none">
                <h2 className="absolute text-white drop-shadow-md pointer-events-auto"
                   style={{
                     width: '337px',
                     height: '76px',
                     top: '32px',
                     left: '24px',
                     fontFamily: '"Google Sans", sans-serif',
                     fontWeight: 500,
                     fontSize: '30px',
                     lineHeight: '100%',
                     letterSpacing: '0%',
                     textAlign: 'left'
                   }}
                >
                    <span className="text-[#F4E06D]">{slide.title}</span> <br />
                    {slide.subtitle}
                </h2>

                <p className="absolute text-gray-100 drop-shadow-md pointer-events-auto"
                   style={{
                      width: '337px',
                      top: '120px', 
                      left: '24px',
                      fontSize: '14px',
                      lineHeight: '1.4',
                      textAlign: 'left'
                   }}
                >
                  {slide.description}
                </p>

                <Link
                  href="/shop"
                  prefetch={false}
                  className="absolute z-20 cursor-pointer flex items-center justify-center transition-transform hover:scale-105 active:scale-95 pointer-events-auto"
                  style={{ 
                    width: '130px', 
                    height: '40px',
                    top: '441px',
                    left: '24px',
                    opacity: 1,
                    borderRadius: '8px',
                    padding: 0, 
                    backgroundColor: 'transparent',
                    border: 'none',
                  }}
                >
                  <img 
                    src="/Home/Button_mobile.png" 
                    alt="Shop Now" 
                    className="w-full h-full object-contain"
                    draggable={false}
                    onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if(parent) {
                          parent.style.backgroundColor = '#F4E06D';
                          parent.innerText = 'Shop Now';
                          parent.style.display = 'flex';
                          parent.style.alignItems = 'center';
                          parent.style.justifyContent = 'center';
                          parent.style.fontWeight = 'bold';
                          parent.style.color = '#013220';
                          parent.style.borderRadius = '8px';
                          parent.style.fontSize = '12px';
                          parent.style.padding = '9px 18px';
                        }
                    }}
                  />
                </Link>
            </div>
          </div>
        ))}
      </div>

      {/* --- DESKTOP NAVIGATOR --- */}
      <div className="
        hidden lg:flex absolute z-30 items-center gap-4
        top-[360px] right-[88px]
      ">
         <button onClick={prevSlide} className="p-2 hover:bg-white/20 rounded-full text-white transition-all bg-black/10 backdrop-blur-sm">
            <ChevronLeft size={24} />
         </button>

         <div className="flex gap-2">
            {SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToSlide(idx)}
                  className={`
                    w-2 h-2 rounded-full transition-all duration-300
                    ${currentSlide === idx ? 'bg-[#F4E06D] w-6' : 'bg-white/50 hover:bg-white'}
                  `}
                />
            ))}
         </div>

         <button onClick={nextSlide} className="p-2 hover:bg-white/20 rounded-full text-white transition-all bg-black/10 backdrop-blur-sm">
            <ChevronRight size={24} />
         </button>
      </div>

      {/* --- MOBILE NAVIGATOR --- */}
      <div className="lg:hidden absolute z-30 flex items-center gap-4 bottom-10 right-6">
         
         <button onClick={prevSlide} className="p-1.5 hover:bg-white/20 rounded-full text-white transition-all bg-black/10 backdrop-blur-sm">
            <ChevronLeft size={20} />
         </button>

         <div className="flex gap-2">
            {SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToSlide(idx)}
                  className={`
                    w-1.5 h-1.5 rounded-full transition-all duration-300
                    ${currentSlide === idx ? 'bg-[#F4E06D] w-4' : 'bg-white/50 hover:bg-white'}
                  `}
                />
            ))}
         </div>

         <button onClick={nextSlide} className="p-1.5 hover:bg-white/20 rounded-full text-white transition-all bg-black/10 backdrop-blur-sm">
            <ChevronRight size={20} />
         </button>
      </div>
    </div>
  );
};

export default HomeBanner;