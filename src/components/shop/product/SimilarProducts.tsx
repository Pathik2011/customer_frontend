
// 'use client';

// import React, { useEffect, useState } from 'react';
// import ProductCard from '@/components/shop/ProductCard';
// import { fetchSimilarProducts } from '@/services/productService';
// import { Product } from '@/types';

// interface SimilarProductsProps {
//   currentProductId: number;
// }

// const SimilarProducts = ({ currentProductId }: SimilarProductsProps) => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadData = async () => {
//       if (!currentProductId) return;
//       try {
//         setLoading(true);
//         const data = await fetchSimilarProducts(currentProductId);
//         setProducts(data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadData();
//   }, [currentProductId]);

//   if (loading) return <div className="w-full h-[348px] animate-pulse bg-gray-50 rounded-xl mt-20" />;
//   if (products.length === 0) return null;

//   return (
//     <div className="w-full mt-20 mb-12 font-jakarta">
//       <h2 className="text-[28px] font-bold text-center text-[#013220] mb-8">
//         Similar Products
//       </h2>
      
//       {/* Horizontal Scroll Container 
//          - snap-x: For smooth snapping behavior
//          - overflow-x-auto: Enables horizontal scroll
//          - no-scrollbar: Optional, add css to hide scrollbar if desired
//       */}
//       <div 
//         className="flex gap-6 overflow-x-auto pb-4 px-4 xl:px-0 snap-x snap-mandatory scroll-smooth no-scrollbar"
//         style={{ 
//           // Ensure it behaves nicely on all screens
//           scrollbarWidth: 'none', 
//           msOverflowStyle: 'none' 
//         }}
//       >
//         {products.map((product) => (
//           <div key={product.product_id} className="snap-center shrink-0">
//             <ProductCard product={product} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SimilarProducts;

// 'use client';

// import React, { useEffect, useState } from 'react';
// import ProductCard from '@/components/shop/ProductCard';
// import { fetchSimilarProducts } from '@/services/productService';
// import { Product } from '@/types';

// interface SimilarProductsProps {
//   currentProductId: number;
// }

// const SimilarProducts = ({ currentProductId }: SimilarProductsProps) => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadData = async () => {
//       if (!currentProductId) return;
//       try {
//         setLoading(true);
//         // Ensure ID is valid
//         const data = await fetchSimilarProducts(currentProductId);
//         setProducts(data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadData();
//   }, [currentProductId]);

//   if (loading) return <div className="w-full h-[348px] animate-pulse bg-gray-50 rounded-xl mt-20" />;
  
//   // If no similar products found, hide the section
//   if (products.length === 0) return null;

//   return (
//     <div className="w-full mt-20 mb-12 font-jakarta relative">
      
//       {/* Title Section */}
//       {/* Font: Google Sans, 28px, Medium (500), 100% line-height 
//           Position: Centered relative to this container
//       */}
//       <h2 
//         className="text-center mb-8"
//         style={{
//           fontFamily: '"Google Sans", sans-serif',
//           fontWeight: 500,
//           fontSize: '28px',
//           lineHeight: '100%',
//           letterSpacing: '0%',
//           color: '#000000', // Assuming black from design context, or could be #013220
//           // marginTop: '80px' // If you want exact spacing from the section above, adjust parent padding/margin
//         }}
//       >
//         Similar Products
//       </h2>
      
//       {/* Horizontal Scroll Container */}
//       <div 
//         className="flex gap-6 overflow-x-auto pb-4 px-4 xl:px-0 snap-x snap-mandatory scroll-smooth no-scrollbar"
//         style={{ 
//           scrollbarWidth: 'none', 
//           msOverflowStyle: 'none' 
//         }}
//       >
//         {products.map((product) => (
//           <div key={product.product_id} className="snap-center shrink-0">
//             <ProductCard product={product} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SimilarProducts;

// 'use client';

// import React, { useEffect, useState } from 'react';
// import ProductCard from '@/components/shop/ProductCard';
// import { fetchSimilarProducts } from '@/services/productService';
// import { Product } from '@/types';

// interface SimilarProductsProps {
//   currentProductId: number;
// }

// const SimilarProducts = ({ currentProductId }: SimilarProductsProps) => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadData = async () => {
//       if (!currentProductId) return;
//       try {
//         setLoading(true);
//         // Ensure ID is valid
//         const data = await fetchSimilarProducts(currentProductId);
//         setProducts(data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadData();
//   }, [currentProductId]);

//   if (loading) return <div className="w-full h-[348px] animate-pulse bg-gray-50 rounded-xl mt-20" />;
  
//   // If no similar products found, hide the section
//   if (products.length === 0) return null;

//   return (
//     <div className="w-full mt-20 mb-12 font-jakarta relative">
      
//       {/* Title Section */}
//       <h2 
//         className="text-center mb-8"
//         style={{
//           fontFamily: '"Google Sans", sans-serif',
//           fontWeight: 500,
//           fontSize: '28px',
//           lineHeight: '100%',
//           letterSpacing: '0%',
//           color: '#000000', 
//         }}
//       >
//         Similar Products
//       </h2>
      
//       {/* Horizontal Scroll Container */}
//       <div 
//         className="
//           flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar
//           /* Mobile: 12px gap (gap-3) and 12px padding-x (px-3) to match requirements */
//           gap-3 px-3
//           /* Desktop: 24px gap and aligned to center container */
//           md:gap-6 xl:px-0
//         "
//         style={{ 
//           scrollbarWidth: 'none', 
//           msOverflowStyle: 'none' 
//         }}
//       >
//         {products.map((product) => (
//           <div 
//             key={product.product_id} 
//             className="
//               snap-center shrink-0 
//               /* Mobile: Fix width to 177px. ProductCard fills this width. */
//               w-[177px]
//               /* Desktop: Let ProductCard dictate width (240px) */
//               md:w-auto
//             "
//           >
//             <ProductCard product={product} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SimilarProducts;
// 'use client';

// import React, { useEffect, useState } from 'react';
// import ProductCard from '@/components/shop/ProductCard';
// import { fetchSimilarProducts } from '@/services/productService';
// import { Product } from '@/types';

// interface SimilarProductsProps {
//   currentProductId: number;
// }

// const SimilarProducts = ({ currentProductId }: SimilarProductsProps) => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadData = async () => {
//       if (!currentProductId) return;
//       try {
//         setLoading(true);
//         const data = await fetchSimilarProducts(currentProductId);
//         setProducts(data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadData();
//   }, [currentProductId]);

//   if (loading) return <div className="w-full h-[348px] animate-pulse bg-gray-50 rounded-xl mt-20" />;
  
//   if (products.length === 0) return null;

//   return (
//     <div className="w-full mt-20 mb-12 font-jakarta relative">
      
//       <h2 
//         className="text-center mb-8"
//         style={{
//           fontFamily: '"Google Sans", sans-serif',
//           fontWeight: 500,
//           fontSize: '28px',
//           lineHeight: '100%',
//           letterSpacing: '0%',
//           color: '#000000', 
//         }}
//       >
//         Similar Products
//       </h2>
      
//       {/* Horizontal Scroll Container 
//          - The fixed width of 177px per card + 12px gap creates a layout where 
//            content naturally cuts off or 'peeks' at the edge of mobile screens,
//            indicating horizontal scrolling is available.
//       */}
//       <div 
//         className="
//           flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar
//           gap-3 px-3
//           md:gap-6 xl:px-0
//         "
//         style={{ 
//           scrollbarWidth: 'none', 
//           msOverflowStyle: 'none' 
//         }}
//       >
//         {products.map((product) => (
//           <div 
//             key={product.product_id} 
//             className="
//               snap-center shrink-0 
//               w-[177px]
//               md:w-auto
//             "
//           >
//             <ProductCard product={product} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SimilarProducts;
'use client';

import React, { useEffect, useState } from 'react';
import ProductCard from '@/components/shop/ProductCard';
import { fetchSimilarProducts } from '@/services/productService';
import { Product } from '@/types';

interface SimilarProductsProps {
  currentProductId: number;
}

const SimilarProducts = ({ currentProductId }: SimilarProductsProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!currentProductId) return;
      try {
        setLoading(true);
        const data = await fetchSimilarProducts(currentProductId);
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [currentProductId]);

  if (loading) return <div className="w-full h-[348px] animate-pulse bg-gray-50 rounded-xl mt-20" />;
  
  if (products.length === 0) return null;

  return (
    <div className="w-full mt-20 mb-12 font-jakarta relative">
      
      <h2 
        className="text-center mb-8"
        style={{
          fontFamily: '"Google Sans", sans-serif',
          fontWeight: 500,
          fontSize: '28px',
          lineHeight: '100%',
          letterSpacing: '0%',
          color: '#000000', 
        }}
      >
        Similar Products
      </h2>
      
      {/* Horizontal Scroll Container */}
      <div 
        className="
          flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar
          gap-3 px-3
          md:gap-6 xl:px-0
        "
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none' 
        }}
      >
        {products.map((product) => (
          <div 
            key={product.product_id} 
            className="
              snap-center shrink-0 
              /* [!code changed] Reduced width from 177px to 160px to show peek of 3rd item */
              w-[160px]
              md:w-auto
            "
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarProducts;