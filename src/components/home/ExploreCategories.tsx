'use client';

import React from 'react';
import Link from 'next/link';

const CATEGORIES = [
  { id: 1, name: 'Fungicide', image: '/Home/Category/Fungicide.png' },
  { id: 2, name: 'Herbicide', image: '/Home/Category/Herbicide.png' },
  { id: 3, name: 'Insecticide', image: '/Home/Category/Insecticide.png' },
  { id: 4, name: 'Fertilizers', image: '/Home/Category/Fertilizer.png' },
  { id: 5, name: 'Rodenticide', image: '/Home/Category/Rodenticide.png' },
  { id: 6, name: 'Seeds', image: '/Home/Category/Seeds.png' },
];

const ExploreCategories = () => {
  return (
    <section className="w-full bg-white font-jakarta flex items-center justify-center py-12 lg:py-0 lg:h-[428px]">
      <div className="w-full max-w-[1600px] px-4 xl:px-0 flex flex-col items-center">
        
        {/* Title Section */}
        <h2 
          className="text-center text-[#000000] mb-8 lg:mb-10 flex items-center justify-center"
          style={{
            fontFamily: '"Google Sans", sans-serif',
            fontWeight: 500,
            lineHeight: '100%',
          }}
        >
          <span className="text-[20px] md:text-[24px] lg:text-[28px]">Explore Categories</span>
        </h2>
        
        {/* Categories Grid 
            - Mobile: 'grid grid-cols-3' enforces 3 items per row. 'gap-2' is 8px.
            - Tablet/Desktop (md+): 'flex' restores the flexible behavior you liked for larger screens.
        */}
        <div className="
          grid grid-cols-3 gap-5 
          md:flex md:flex-wrap md:justify-center md:gap-6 
          lg:gap-6
        ">
          {CATEGORIES.map((cat) => (
            <Link 
              key={cat.id} 
              href={`/shop?category=${cat.name}`}
              className="
                group flex flex-col items-center transition-colors cursor-pointer bg-[#F3F3F5] hover:bg-gray-200
                rounded-[8px] md:rounded-[10px] lg:rounded-[12px]
              "
            >
              {/* --- CARD CONTAINER (Sizing & Padding) --- */}
              <div 
                className="
                  flex flex-col items-center
                  
                  /* Mobile Specs */
                  w-[86px] h-[102px] 
                  pt-[12px] pb-[12px] 
                  gap-[8px]
                  
                  /* Tablet Specs (iPad) */
                  md:w-[130px] md:h-[160px] md:pt-[20px] md:pb-[20px] md:gap-[10px]

                  /* Desktop Specs */
                  lg:w-[162px] lg:h-[192px] 
                  lg:pt-[32px] lg:pb-[22px] lg:px-[39px]
                  lg:gap-[12px]
                "
              >
                {/* --- IMAGE CONTAINER --- */}
                <div 
                  className="
                    overflow-hidden relative shadow-sm group-hover:scale-105 transition-transform duration-300 rounded-full
                    
                    /* Mobile Image Size */
                    w-[50px] h-[50px]
                    
                    /* Tablet Image Size */
                    md:w-[80px] md:h-[80px]

                    /* Desktop Image Size */
                    lg:w-[100px] lg:h-[100px]
                  "
                >
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* --- TEXT LABEL --- */}
                <span 
                  className="
                    text-center font-medium group-hover:text-emerald-700 transition-colors text-[#003C22]
                    
                    /* Mobile Text */
                    text-[10px] leading-tight w-full px-1

                    /* Tablet Text */
                    md:text-[14px]

                    /* Desktop Text */
                    lg:text-[18px] lg:w-[83px] lg:h-[23px]
                  "
                  style={{
                    fontFamily: '"Google Sans", sans-serif',
                  }}
                >
                  {cat.name}
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ExploreCategories;