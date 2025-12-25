// 'use client';

// import React from 'react';
// import ProductCard from '@/components/shop/ProductCard';
// import { ApiProduct } from '@/types/homeApi';
// import { Product, ProductVariant } from '@/types';

// interface PopularProductsProps {
//   data: ApiProduct[];
//   title?: string;
//   subtitle?: string; // [!code ++
// }

// const PopularProducts = ({ data, title, subtitle }: PopularProductsProps) => {
//   if (!data || data.length === 0) return null;

//   // [!code highlight] Updated: Show max 10 products (2 rows of 5)
//   const displayItems = data.slice(0, 10);

//   // MAPPER: Home API -> Shop Product Type
//   const mappedProducts: Product[] = displayItems.map((apiItem) => {
//     const firstVar = apiItem.product_variants[0] || {};
    
//     const variants: ProductVariant[] = apiItem.product_variants.map(v => ({
//       product_variant_id: v.product_variant_id,
//       size: v.size,
//       uom: v.uom,
//       price: v.price,
//       discounted_price: v.discounted_price,
//       discount: 0,
//       is_active: true
//     }));

//     return {
//       product_id: apiItem.product_id,
//       product_name: apiItem.product_name,
//       brand_name: apiItem.brand?.brand_name || '',
//       image_url: apiItem.image,
//       product_variant_id: firstVar.product_variant_id,
//       size: firstVar.size,
//       uom: firstVar.uom,
//       price: firstVar.price,
//       discounted_price: firstVar.discounted_price,
//       discount: 0,
//       variants: variants
//     };
//   });

//   return (
//     <section className="w-full py-12 font-jakarta bg-white">
//       <div className="max-w-[1296px] mx-auto px-4 xl:px-0">
        
//         {/* Dynamic Header */}
//         <h2 className="text-2xl font-bold text-center text-[#013220] mb-8">
//           {title || "Popular Products"}
//         </h2>
//         <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto -mt-6 px-4 text-sm">
//          {subtitle}
//         </p>
//         {/* [!code highlight] Updated Grid: 5 columns on XL screens */}
//         <div className="
//           grid grid-cols-2 
//           md:grid-cols-3 
//           lg:grid-cols-4 
//           xl:grid-cols-5 
//           gap-3 md:gap-6 justify-items-center
//         ">
//           {mappedProducts.map((product, i) => (
//             <ProductCard 
//               key={`${product.product_id}-${i}`} 
//               product={product} 
//             />
//           ))}
//         </div>

//       </div>
//     </section>
//   );
// };

// export default PopularProducts;
'use client';

import React from 'react';
import ProductCard from '@/components/shop/ProductCard';
import { ApiProduct } from '@/types/homeApi';
import { Product, ProductVariant } from '@/types';

interface PopularProductsProps {
  data: ApiProduct[];
  title?: string;
  subtitle?: string;
}

const PopularProducts = ({ data, title, subtitle }: PopularProductsProps) => {
  if (!data || data.length === 0) return null;

  // Show max 10 products (2 rows of 5)
  const displayItems = data.slice(0, 10);

  // MAPPER: Home API -> Shop Product Type
  const mappedProducts: Product[] = displayItems.map((apiItem) => {
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
    <section className="w-full py-12 font-jakarta bg-white">
      <div className="max-w-[1296px] mx-auto px-4 xl:px-0">
        
        {/* Dynamic Header */}
        <div className="flex flex-col items-center mb-8">
            <h2 
                className="text-center text-[#000000] mb-3 text-[20px] min-[834px]:text-[28px] font-bold leading-[100%] tracking-[0]"
                style={{ fontFamily: '"Google Sans", sans-serif' }}
            >
              {title || "Popular Products"}
            </h2>
            
            <p 
                className="text-center text-[#4D4D4D] text-[14px] min-[834px]:text-[15px] font-semibold leading-[26px] tracking-[0.01em] font-jakarta max-w-[283px] min-[834px]:max-w-2xl mx-auto"
            >
             {subtitle || "Winter-wise Farming: Curated for Crops, Carefully Chosen for You."}
            </p>
        </div>

        {/* Updated Grid: 5 columns on XL screens */}
        <div className="
          grid grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4 
          xl:grid-cols-5 
          gap-3 md:gap-6 justify-items-center
        ">
          {mappedProducts.map((product, i) => (
            <ProductCard 
              key={`${product.product_id}-${i}`} 
              product={product} 
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default PopularProducts;