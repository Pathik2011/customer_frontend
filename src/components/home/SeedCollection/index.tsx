
'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ApiProduct } from '@/types/homeApi';
import ProductCard from '@/components/shop/ProductCard'; 
import { Product, ProductVariant } from '@/types'; 

const scrollStyles = `
  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
`;

interface SeedCollectionProps {
  data: ApiProduct[];
  title?: string;
  subtitle?: string;
}

const SeedCollection = ({ data, title, subtitle }: SeedCollectionProps) => {
  if (!data || data.length === 0) return null;

  const displayProducts: Product[] = data.slice(0, 5).map((apiItem) => {
    const firstVar = apiItem.product_variants[0] || {};
    
    const variants: ProductVariant[] = apiItem.product_variants.map(v => ({
      product_variant_id: v.product_variant_id,
      size: v.size,
      uom: v.uom,
      price: v.price,
      discounted_price: v.discounted_price,
      discount: 0,
      is_active: true
    }));

    return {
      product_id: apiItem.product_id,
      product_name: apiItem.product_name,
      brand_name: apiItem.brand?.brand_name || '',
      image_url: apiItem.image,
      product_variant_id: firstVar.product_variant_id,
      size: firstVar.size,
      uom: firstVar.uom,
      price: firstVar.price,
      discounted_price: firstVar.discounted_price,
      discount: 0,
      variants: variants
    };
  });

  return (
    <section className="w-full flex justify-center font-jakarta bg-white">
      <style>{scrollStyles}</style>
      
      <div className="relative w-full h-auto min-h-[820px] pb-10 min-[834px]:h-[648px] min-[834px]:pb-0 overflow-hidden">
        
        {/* Background */}
        <div className="absolute inset-0 z-0 bg-[#C5EAD9]/20"> 
          <img 
            src="/Home/Seed/Doodle.png" 
            alt="Seed Pattern" 
            className="w-full h-full object-cover" 
          />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full h-full flex flex-col items-center min-[834px]:block">
            
            <div className="w-full max-w-[1297px] mx-auto flex flex-col gap-6 min-[834px]:gap-8 mt-[48px] min-[834px]:mt-[80px]">
                
                {/* Header */}
                <div className="flex flex-col min-[834px]:flex-row justify-between items-center min-[834px]:items-end w-full px-4 xl:px-0 text-center min-[834px]:text-left">
                    <div className="flex flex-col items-center min-[834px]:items-start">
                        <h2 
                            className="text-[#000000] mb-2 min-[834px]:mb-3 font-bold text-[20px] min-[834px]:text-[28px] leading-[100%]" 
                            style={{ fontFamily: '"Google Sans", sans-serif' }}
                        >
                           {title || "Seeds"}
                        </h2>
                        
                        <p 
                            className="text-[#4D4D4D]  text-[14px] min-[834px]:text-[15px] font-semibold leading-[26px] tracking-[0.01em] font-jakarta max-w-[283px] min-[834px]:max-w-md mx-auto min-[834px]:mx-0"
                        >
                            {subtitle || "Winter-wise Farming: Curated for Crops, Carefully Chosen for You."}
                        </p>
                    </div>
                    
                    <Link 
                      href="/shop?category=Seeds"
                      prefetch={false}
                      className="hidden min-[834px]:flex items-center gap-2 bg-[#003C22] text-white px-6 py-3 rounded-lg hover:bg-emerald-900 transition-colors mt-4 min-[834px]:mt-0"
                    >
                        <span className="font-medium text-sm">View All</span>
                        <ArrowRight size={16} />
                    </Link>
                </div>

                {/* [!code changed] FIX START: Changed from Scrollable Flex to Static Grid */}
                <div className="w-full px-4 xl:px-0">
                    <div className="
                        grid grid-cols-2 gap-3
                        min-[834px]:grid min-[834px]:grid-cols-5 min-[834px]:gap-6
                    ">
                        {/* ^ REMOVED: overflow-x-auto, flex, no-scrollbar */}
                        
                        {displayProducts.map((product, i) => (
                           <div 
                                key={`${product.product_id}-${i}`} 
                                className={`
                                    w-full
                                    ${i >= 4 ? 'hidden min-[834px]:block' : 'block'} 
                                `}
                                /* ^ REMOVED: w-[180px], shrink-0 */
                           >
                               <ProductCard product={product} />
                           </div>
                        ))}
                    </div>
                </div>
                {/* [!code changed] FIX END */}

                {/* Mobile Button */}
                <div className="min-[834px]:hidden flex justify-center w-full px-4 mt-8">
                    <Link 
                        href="/shop?category=Seeds"
                        
                        prefetch={false}
                        className="flex items-center justify-center gap-[4px] bg-[#003C22] text-white rounded-[8px] transition-colors shadow-sm"
                        style={{
                            width: '113px',
                            height: '40px',
                            padding: '9px 18px 11px 18px'
                        }}
                    >
                        <span className="font-semibold text-[14px] leading-[100%] font-jakarta">View All</span>
                        <ArrowRight size={16} />
                    </Link>
                </div>

            </div>
        </div>
      </div>
    </section>
  );
};

export default SeedCollection;