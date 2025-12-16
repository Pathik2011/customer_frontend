// 'use client';

// import React, { useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import Link from 'next/link'; // [!code ++] Import Link

// const SLIDES = [
//   {
//     id: 1,
//     image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1920&auto=format&fit=crop',
//     title: 'Find the Best Solution',
//     subtitle: 'for Your Crops Instantly!',
//     description: 'Get top-quality agriculture products delivered to your farm fast! Save time, skip the hassle, and ensure a healthy, thriving harvest with quick, reliable delivery.',
//   },
//   {
//     id: 2,
//     image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1920&auto=format&fit=crop',
//     title: 'Protect Your Harvest',
//     subtitle: 'with Premium Pesticides',
//     description: 'Effective solutions for a healthy and disease-free farm. Protect your crops from pests and diseases with our premium range of pesticides.',
//   }
// ];

// const HomeBanner = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);

//   // Auto-rotate
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
//     }, 5000);
//     return () => clearInterval(timer);
//   }, []);

//   const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
//   const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));

//   return (
//     // Main Container - Edge to Edge width
//     <div className="w-full relative overflow-hidden font-jakarta group h-[523px] lg:h-[528px]">
      
//       {/* Slides */}
//       {SLIDES.map((slide, index) => (
//         <div
//           key={slide.id}
//           className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
//             index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
//           }`}
//         >
//           {/* --- BACKGROUND LAYER (Edge to Edge) --- */}
//           <div className="absolute inset-0 w-full h-full">
//             <img
//               src={slide.image}
//               alt={slide.title}
//               className="w-full h-full object-cover"
//             />
//             {/* Overlay Gradient */}
//             <div className="absolute inset-0 bg-black/20 lg:bg-black/40"></div>
//           </div>

//           {/* --- CONTENT LAYER (Centered Container) --- */}
//           {/* This wrapper ensures text stays aligned with the page layout on large screens */}
//           <div className="relative h-full w-full max-w-[1600px] mx-auto">
            
//             {/* --- DESKTOP TEXT ELEMENTS (Absolute within the centered container) --- */}
            
//             {/* 1. Headline */}
//             <h2 
//               className="hidden lg:block absolute text-white drop-shadow-md"
//               style={{
//                  width: '583px',
//                  height: '132px',
//                  top: '100px',
//                  left: '88px', // Now relative to the 1600px container
//                  fontFamily: '"Google Sans", sans-serif',
//                  fontWeight: 500, 
//                  fontSize: '52px',
//                  lineHeight: '100%',
//                  letterSpacing: '0%'
//               }}
//             >
//               <span className="text-[#F4E06D]">{slide.title}</span> <br />
//               {slide.subtitle}
//             </h2>

//             {/* 2. Description */}
//             <p 
//               className="hidden lg:block absolute text-white drop-shadow-md"
//               style={{
//                  width: '585px',
//                  height: '52px',
//                  top: '254px',
//                  left: '88px', // Now relative to the 1600px container
//                  fontFamily: '"Plus Jakarta Sans", sans-serif',
//                  fontWeight: 600, 
//                  fontSize: '15px',
//                  lineHeight: '26px',
//                  letterSpacing: '0.01em' 
//               }}
//             >
//               {slide.description}
//             </p>

//             {/* 3. Desktop Button - Converted to Link */}
//             <Link 
//                href="/shop" // [!code highlight] Link to Shop
//                className="hidden lg:flex absolute z-20 cursor-pointer items-center justify-center transition-transform hover:scale-105 active:scale-95"
//                style={{ 
//                  width: '175px', 
//                  height: '50px',
//                  top: '360px', 
//                  left: '88px', // Now relative to the 1600px container
//                  opacity: 1,
//                  borderRadius: '12px',
//                  padding: 0,
//                  backgroundColor: 'transparent',
//                  border: 'none',
//                }}
//             >
//                <img 
//                  src="/Home/Button_desktop.png" 
//                  alt="Shop Now" 
//                  className="w-full h-full object-contain"
//                  onError={(e) => {
//                    const target = e.currentTarget;
//                    target.style.display = 'none';
//                    const parent = target.parentElement;
//                    if(parent) {
//                       parent.style.backgroundColor = '#F4E06D';
//                       parent.innerText = 'Shop Now';
//                       parent.style.color = '#013220';
//                       parent.style.fontWeight = 'bold';
//                       parent.style.fontSize = '14px';
//                       parent.style.padding = '13px 34px';
//                    }
//                  }}
//                />
//             </Link>

//             {/* --- DESKTOP NAVIGATOR --- */}
//             <div className="
//               hidden lg:flex absolute z-20 gap-2
//               top-1/2 -translate-y-1/2 right-[88px]
//             ">
//                <button onClick={prevSlide} className="p-2 hover:bg-white/20 rounded-full text-white transition-all">
//                  <ChevronLeft size={24} />
//                </button>
//                <button onClick={nextSlide} className="p-2 hover:bg-white/20 rounded-full text-white transition-all">
//                  <ChevronRight size={24} />
//                </button>
//             </div>

//           </div>

//           {/* --- MOBILE CONTENT LAYER (Independent Layout) --- */}
//           {/* Mobile Headline */}
//           <h2 className="lg:hidden absolute text-white drop-shadow-md"
//              style={{
//                width: '337px',
//                height: '76px',
//                top: '32px',
//                left: '24px',
//                fontFamily: '"Google Sans", sans-serif',
//                fontWeight: 500,
//                fontSize: '30px',
//                lineHeight: '100%',
//                letterSpacing: '0%',
//                textAlign: 'left'
//              }}
//           >
//               <span className="text-[#F4E06D]">{slide.title}</span> <br />
//               {slide.subtitle}
//           </h2>

//           {/* Mobile Description */}
//           <p className="lg:hidden absolute text-gray-100 drop-shadow-md"
//              style={{
//                 width: '337px',
//                 top: '120px', 
//                 left: '24px',
//                 fontSize: '14px',
//                 lineHeight: '1.4',
//                 textAlign: 'left'
//              }}
//           >
//             {slide.description}
//           </p>

//           {/* Mobile Button - Converted to Link */}
//           <Link
//             href="/shop" // [!code highlight] Link to Shop
//             className="lg:hidden absolute z-20 cursor-pointer flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
//             style={{ 
//               width: '130px', 
//               height: '40px',
//               top: '441px',
//               left: '24px',
//               opacity: 1,
//               borderRadius: '8px',
//               padding: 0, 
//               backgroundColor: 'transparent',
//               border: 'none',
//               gap: '4px'
//             }}
//           >
//             <img 
//               src="/Home/Button_mobile.png" 
//               alt="Shop Now" 
//               className="w-full h-full object-contain"
//               onError={(e) => {
//                   const target = e.currentTarget;
//                   target.style.display = 'none';
//                   const parent = target.parentElement;
//                   if(parent) {
//                     parent.style.backgroundColor = '#F4E06D';
//                     parent.innerText = 'Shop Now';
//                     parent.style.display = 'flex';
//                     parent.style.alignItems = 'center';
//                     parent.style.justifyContent = 'center';
//                     parent.style.fontWeight = 'bold';
//                     parent.style.color = '#013220';
//                     parent.style.borderRadius = '8px';
//                     parent.style.fontSize = '12px';
//                     parent.style.paddingTop = '9px';
//                     parent.style.paddingRight = '18px';
//                     parent.style.paddingBottom = '11px';
//                     parent.style.paddingLeft = '18px';
//                   }
//               }}
//             />
//           </Link>

//           {/* Mobile Nav Arrows */}
//           <div className="lg:hidden absolute z-20 flex gap-2 bottom-10 right-6">
//              <button onClick={prevSlide} className="p-2 hover:bg-white/20 rounded-full text-white transition-all">
//                <ChevronLeft size={24} />
//              </button>
//              <button onClick={nextSlide} className="p-2 hover:bg-white/20 rounded-full text-white transition-all">
//                <ChevronRight size={24} />
//              </button>
//           </div>

//         </div>
//       ))}
//     </div>
//   );
// };

// export default HomeBanner;
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useDraggableScroll } from '@/hooks/useDraggableScroll';

const SLIDES = [
  // 1. New Slide at 1st Position
  {
    id: 3,
    image: '/Home/Banner/1.jpg',
    title: 'Empowering Farmers',
    subtitle: 'With Modern Solutions',
    description: 'Discover the latest in agricultural technology and high-quality seeds to maximize your yield and ensure a sustainable future for your farm.',
  },
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1920&auto=format&fit=crop',
    title: 'Find the Best Solution',
    subtitle: 'for Your Crops Instantly!',
    description: 'Get top-quality agriculture products delivered to your farm fast! Save time, skip the hassle, and ensure a healthy, thriving harvest with quick, reliable delivery.',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1920&auto=format&fit=crop',
    title: 'Protect Your Harvest',
    subtitle: 'with Premium Pesticides',
    description: 'Effective solutions for a healthy and disease-free farm. Protect your crops from pests and diseases with our premium range of pesticides.',
  }
];

const HomeBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Enable Drag Scrolling
  useDraggableScroll(scrollRef);

  // Auto-rotate logic
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

  // Infinite Scroll Logic: If at last slide, next goes to 0. If at 0, prev goes to last.
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
      
      {/* Scrollable Container */}
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
              <div className="absolute inset-0 bg-black/20 lg:bg-black/40"></div>
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

      {/* --- DESKTOP NAVIGATOR: < ... > --- */}
      <div className="
        hidden lg:flex absolute z-30 items-center gap-4
        top-[360px] right-[88px]
      ">
         {/* Left Arrow */}
         <button onClick={prevSlide} className="p-2 hover:bg-white/20 rounded-full text-white transition-all bg-black/10 backdrop-blur-sm">
            <ChevronLeft size={24} />
         </button>

         {/* Dots */}
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

         {/* Right Arrow */}
         <button onClick={nextSlide} className="p-2 hover:bg-white/20 rounded-full text-white transition-all bg-black/10 backdrop-blur-sm">
            <ChevronRight size={24} />
         </button>
      </div>

      {/* --- MOBILE NAVIGATOR: < ... > --- */}
      {/* [!code changed] Rearranged mobile nav to match desktop: Left Arrow -> Dots -> Right Arrow */}
      <div className="lg:hidden absolute z-30 flex items-center gap-4 bottom-10 right-6">
         
         {/* Left Arrow */}
         <button onClick={prevSlide} className="p-1.5 hover:bg-white/20 rounded-full text-white transition-all bg-black/10 backdrop-blur-sm">
            <ChevronLeft size={20} />
         </button>

         {/* Dots */}
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

         {/* Right Arrow */}
         <button onClick={nextSlide} className="p-1.5 hover:bg-white/20 rounded-full text-white transition-all bg-black/10 backdrop-blur-sm">
            <ChevronRight size={20} />
         </button>
      </div>
    </div>
  );
};

export default HomeBanner;