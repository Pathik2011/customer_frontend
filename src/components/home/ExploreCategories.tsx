'use client';

import React from 'react';
import Link from 'next/link';

const CATEGORIES = [
  { id: 1, name: 'Fungicide', image: '/Home/Category/Fungicide.png' },
  { id: 2, name: 'Herbicide', image: '/Home/Category/Herbicide.png' },
  { id: 3, name: 'Insecticide', image: '/Home/Category/Insecticide.png' },
  { id: 4, name: 'Fertilizer', image: '/Home/Category/Fertilizer.png' },
  { id: 5, name: 'Rodenticide', image: '/Home/Category/Rodenticide.png' },
  { id: 6, name: 'Seeds', image: '/Home/Category/Seeds.png' },
];

const ExploreCategories = () => {
  return (
    <section className="w-full bg-white font-jakarta flex items-center justify-center py-12 xl:py-0 xl:h-[428px]">
      <div className="w-full max-w-[1600px] px-4 xl:px-0 flex flex-col items-center">
        
        {/* Title Section */}
        <h2 
          className="text-center text-[#000000] mb-8 xl:mb-10 flex items-center justify-center"
          style={{
            fontFamily: '"Google Sans", sans-serif',
            fontWeight: 500,
            lineHeight: '100%',
          }}
        >
          <span className="text-[20px] md:text-[24px] xl:text-[28px]">Explore Categories</span>
        </h2>
        
        {/* Categories Grid 
            - Mobile to Large (lg): Grid 3x3 (Solves iPad "5 and 6" wrapping issue)
            - Extra Large (xl): Flex Row (Single Line for Laptops/Desktops)
        */}
        <div className="
          grid grid-cols-3 gap-x-5 gap-y-8
          md:gap-x-12 md:gap-y-10
          xl:flex xl:flex-wrap xl:justify-center xl:gap-6
        ">
          {CATEGORIES.map((cat) => (
            <Link 
              key={cat.id} 
              href={`/shop?category=${encodeURIComponent(cat.name)}`} // [!code highlight] Updated to use query params
              className="
                group flex flex-col items-center transition-colors cursor-pointer bg-[#F3F3F5] hover:bg-gray-200
                rounded-[8px] md:rounded-[10px] xl:rounded-[12px]
              "
            >
              {/* --- CARD CONTAINER (Sizing & Padding) --- */}
              <div 
                className="
                  flex flex-col items-center justify-center
                  
                  /* Mobile Specs (Small) */
                  w-[86px] h-[102px] 
                  gap-[8px]
                  
                  /* Tablet/iPad Specs (Medium - 1:1 proportion look) */
                  md:w-[130px] md:h-[160px] md:gap-[10px]

                  /* Desktop Specs (Large - Full Size) */
                  xl:w-[162px] xl:h-[192px] xl:gap-[12px]
                "
              >
                {/* --- IMAGE CONTAINER --- */}
                <div 
                  className="
                    overflow-hidden relative shadow-sm group-hover:scale-105 transition-transform duration-300 rounded-full
                    
                    /* Mobile Image */
                    w-[50px] h-[50px]
                    
                    /* Tablet Image */
                    md:w-[80px] md:h-[80px]

                    /* Desktop Image */
                    xl:w-[100px] xl:h-[100px]
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
                    text-[14px] leading-tight w-full px-1 

                    /* Tablet Text */
                    md:text-[16px]

                    /* Desktop Text */
                    xl:text-[18px] xl:w-[100px] xl:h-[23px]
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