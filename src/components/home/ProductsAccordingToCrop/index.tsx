
'use client';

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { ApiCrop } from '@/types/homeApi';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface ProductsAccordingToCropProps {
  data: ApiCrop[];
  title?: string;
  subtitle?: string;
}

const BLOB_IMAGES = [
  { bg: '/Home/Crop/1.png', opacity: 'opacity-100' },
  { bg: '/Home/Crop/2.png', opacity: 'opacity-40' },
  { bg: '/Home/Crop/3.png', opacity: 'opacity-40' },
  { bg: '/Home/Crop/4.png', opacity: 'opacity-40' },
  { bg: '/Home/Crop/5.png', opacity: 'opacity-40' },
];

const ProductsAccordingToCrop = ({ data, title, subtitle }: ProductsAccordingToCropProps) => {
  const router = useRouter();
  const [clickingId, setClickingId] = useState<number | null>(null);

  if (!data || data.length === 0) return null;

  const displayItems = data.slice(0, 5);

  const handleCropClick = (cropName: string, id: number) => {
    // Android Only: Trigger Vibration
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate([50]); // Short, sharp vibration
    }
    
    setClickingId(id);
    
    // Small delay to let the animation play before navigating
    setTimeout(() => {
        router.push(`/shop?crop=${encodeURIComponent(cropName)}`);
    }, 150);
  };

  const handleViewAll = () => {
    const params = new URLSearchParams();
    displayItems.forEach((crop) => {
      params.append('crop', crop.crop_name);
    });
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <section className="w-full bg-white flex justify-center items-center relative overflow-hidden font-jakarta">
      <div className="w-full h-auto lg:h-[600px] relative pb-12 lg:pb-0"> 
        <div className="w-full max-w-[1289px] h-full mx-auto px-4 xl:px-0 relative flex flex-col items-center lg:block">
            
            {/* Header */}
            <div className="mt-[48px] flex flex-col items-center text-center lg:absolute lg:top-[80px] lg:w-full lg:flex-row lg:justify-between lg:items-start lg:mt-0 lg:text-left">
                <div className="flex flex-col items-center lg:items-start lg:w-[378px]">
                    <h2 
                      className="text-[#000000] mb-2 lg:mb-4 text-[20px] lg:text-[28px] font-bold leading-[100%] tracking-[0]" 
                      style={{ fontFamily: '"Google Sans", sans-serif' }}
                    >
                        {title || "Products According to Crops"}
                    </h2>
                    
                    <p 
                      className="text-[#4D4D4D] text-[14px] lg:text-[15px] font-semibold leading-[26px] tracking-[0.01em] font-jakarta max-w-[283px] lg:max-w-full"
                    >
                        {subtitle || "Winter-wise Farming: Curated for Crops, Carefully Chosen for You."}
                    </p>
                </div>
                
                <button 
                  onClick={handleViewAll}
                  className="hidden lg:flex items-center gap-2 bg-[#003C22] text-white px-6 py-3 rounded-lg hover:bg-emerald-900 transition-colors"
                >
                    <span className="font-medium text-sm">View All</span>
                    <ArrowRight size={16} />
                </button>
            </div>

            {/* Grid Container */}
            <div className="
                lg:absolute lg:top-[220px] lg:w-full mt-8 lg:mt-0 
                grid grid-cols-2 
                md:grid-cols-3
                lg:grid-cols-5
                gap-x-3 gap-y-8 lg:gap-x-6
                w-full 
                max-w-[370px] 
                md:max-w-[700px] 
                lg:max-w-none
            ">
                {displayItems.map((crop, index) => {
                    const visual = BLOB_IMAGES[index % BLOB_IMAGES.length];
                    const isClicked = clickingId === crop.crop_id;

                    return (
                        <div 
                          key={crop.crop_id} 
                          onClick={() => handleCropClick(crop.crop_name, crop.crop_id)}
                          className={`
                            flex flex-col items-center gap-2 lg:gap-4 group cursor-pointer 
                            ${index === 4 ? 'col-span-2 flex items-center justify-center' : ''}
                            ${index === 4 ? 'md:col-span-1' : ''}
                            ${index === 4 ? 'lg:col-span-1' : ''}
                          `}
                          style={{ WebkitTapHighlightColor: 'transparent' }}
                        >
                            <motion.div 
                                // [!code highlight] 1. BUTTON PRESS EFFECT (Works on iPhone visually)
                                whileTap={{ scale: 0.90 }} 
                                whileHover={{ scale: 1.05 }}
                                
                                // 2. Click State (If selected, stay slightly pressed/bright)
                                animate={isClicked ? { scale: 0.95, filter: 'brightness(1.1)' } : { scale: 1, filter: 'brightness(1)' }}
                                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                
                                className={`
                                  relative flex justify-center items-center transition-transform duration-300
                                  aspect-square 
                                  ${index === 4 ? 'w-[calc(50%-6px)] md:w-full' : 'w-full'}
                                  max-w-[177px] 
                                  lg:max-w-[224px]
                                `}
                            >
                                <div className="absolute inset-0 z-0">
                                    <img src={visual.bg} alt="" className={`w-full h-full object-contain ${visual.opacity}`} />
                                </div>
                                
                                <div className="
                                  relative z-10 
                                  w-[80%] h-[80%] 
                                ">
                                    <img src={crop.icon_url} alt={crop.crop_name} className="w-full h-full object-contain drop-shadow-md" />
                                </div>
                            </motion.div>
                            
                            <span 
                                className="lg:text-[#000000] lg:text-lg group-hover:text-[#003C22] transition-colors" 
                                style={{ 
                                    fontFamily: '"Plus Jakarta Sans", sans-serif', 
                                    fontWeight: 700, 
                                    fontSize: '16px', 
                                    lineHeight: '100%', 
                                    textAlign: 'center', 
                                    color: '#003C22' 
                                }}
                            >
                                {crop.crop_name}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Mobile View All Button */}
            <div className="lg:hidden mt-12 flex justify-center w-full">
                <button 
                  onClick={handleViewAll}
                  className="flex items-center justify-center gap-1 bg-[#003C22] text-white hover:bg-emerald-900 transition-colors shadow-sm" style={{ width: '113px', height: '40px', borderRadius: '8px' }}>
                    <span style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 600, fontSize: '14px', lineHeight: '100%' }}>View All</span>
                    <ArrowRight size={16} />
                </button>
            </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsAccordingToCrop;