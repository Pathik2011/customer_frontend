
// 'use client';

// import React, { useState, useEffect, useRef } from 'react';
// import { ChevronDown } from 'lucide-react';
// import Link from 'next/link';
// import { Product, ProductVariant } from '@/types';
// import { useCart } from '@/context/CartContext';
// import AnimatedPress from '@/components/shared/AnimatedPress';

// interface ProductCardProps {
//   product: Product;
// }

// const ProductCard = ({ product }: ProductCardProps) => {
//   const { addToCart } = useCart();

//   // --- Initialization Logic ---
//   const getInitialVariant = (): ProductVariant => {
//     if (product.variants && product.variants.length > 0) {
//       const displayVariant = product.variants.find(v => v.product_variant_id === product.product_variant_id);
//       return displayVariant || product.variants[0];
//     }
//     return {
//       product_variant_id: product.product_variant_id,
//       size: product.size,
//       uom: product.uom,
//       price: product.price,
//       discount: product.discount,
//       discounted_price: product.discounted_price
//     };
//   };

//   const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(() => getInitialVariant());
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);
  
//   // Ref to track the vertical scroll position (from previous fix)
//   const lastScrollY = useRef(0);

//   useEffect(() => {
//     setSelectedVariant(getInitialVariant());
//   }, [product]);

//   const handleVariantChange = (variant: ProductVariant) => {
//     setSelectedVariant(variant);
//     setIsDropdownOpen(false);
//   };

//   const handleAddToCart = async (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     try {
//       setIsLoading(true);
//       await addToCart(
//         selectedVariant.product_variant_id, 
//         1,
//         {
//             name: product.product_name,
//             image: product.image_url
//         }
//       );
//     } catch (error) {
//       console.error("Failed to add to cart", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // --- Scroll & Close Logic ---
//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;
//       // Only close if the PAGE scrolls vertically by more than 10px
//       if (Math.abs(currentScrollY - lastScrollY.current) > 10) {
//         setIsDropdownOpen(false);
//       }
//       lastScrollY.current = currentScrollY;
//     };

//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsDropdownOpen(false);
//       }
//     };

//     if (isDropdownOpen) {
//       lastScrollY.current = window.scrollY;
//       window.addEventListener('scroll', handleScroll, { passive: true });
//       document.addEventListener('mousedown', handleClickOutside);
//     }
    
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isDropdownOpen]);
//   // ✅ New Handler for Card Click
//   const handleCardClick = () => {
//     router.push(`/shop/${product.product_id}`);
//   };
//   return (
//   <AnimatedPress 
//       onClick={handleCardClick} 
//       className="w-full h-[254px] md:w-[240px] md:h-[348px]"
//     >
//     <div className="
//       group relative flex flex-col bg-white border border-[#E0E2E7] rounded-[12px] hover:shadow-lg transition-shadow font-jakarta shrink-0 overflow-visible
//       w-full h-[254px]
//       md:w-[240px] md:h-[348px]
//     ">

//       {/* 1. Image Section */}
//       <Link 
//         href={`/shop/${product.product_id}`} 
//         className="relative w-full flex justify-center items-center pt-4 md:pt-[42px] pb-2 md:pb-0 cursor-pointer grow"
//       >
//         <div className="w-[60px] h-[80px] md:w-[77px] md:h-[104px] relative transition-transform duration-300 group-hover:scale-105">
//           <img
//             src={product.image_url}
//             alt={product.product_name}
//             className="w-full h-full object-contain"
//             onError={(e) => {
//               (e.target as HTMLImageElement).src = 'https://placehold.co/77x104?text=No+Image';
//             }}
//           />
//         </div>
//       </Link>

//       {/* 2. Content Section */}
//       <div className="flex flex-col px-3 md:px-[24px] w-full">
//         <Link
//           href={`/shop/${product.product_id}`}
//           className="w-full text-[14px] md:text-[16px] font-semibold leading-[120%] md:leading-[100%] tracking-[0.01em] text-gray-900 truncate hover:text-emerald-700 transition-colors cursor-pointer mb-1 md:mb-[8px]"
//           title={product.product_name}
//         >
//           {product.product_name}
//         </Link>
//         <div className="text-[12px] md:text-[14px] font-medium leading-[100%] text-[#4D4D4D] mb-2 md:mb-[20px]">
//           {product.brand_name}
//         </div>
//         <div className="flex items-baseline gap-2 mb-3 md:mb-[20px]">
//           <span className="text-[16px] md:text-[20px] font-semibold leading-[100%] tracking-[0.01em] text-[#003C22]">
//             ₹{Math.round(selectedVariant.discounted_price)}
//           </span>
//           {selectedVariant.price > selectedVariant.discounted_price && (
//             <span className="text-[12px] md:text-[14px] font-medium leading-[100%] tracking-[0.01em] text-black/70 line-through">
//               ₹{Math.round(selectedVariant.price)}
//             </span>
//           )}
//         </div>
//       </div>

//       {/* 3. Actions Section */}
//       <div className="px-3 md:px-[24px] pb-3 md:pb-[24px] mt-auto w-full flex items-center justify-between gap-2">
        
//         {/* Variant Dropdown */}
//         <div className="relative z-20 w-full" ref={dropdownRef}>
//           <button
//             onClick={(e) => {
//               e.preventDefault();
//               e.stopPropagation(); 
//               setIsDropdownOpen(!isDropdownOpen);
//             }}
//             className="
//               w-full h-[32px] md:h-[36px] 
//               border border-[#003C22] rounded-[20px] flex items-center justify-between 
//               px-2 md:px-[12px] py-[8px] bg-white opacity-90 hover:opacity-100 transition-opacity
//             "
//           >
//             <span className="text-[10px] md:text-[12px] font-medium text-emerald-900 truncate max-w-[80px] md:max-w-[90px]">
//               {selectedVariant.size} {selectedVariant.uom}
//             </span>
//             <ChevronDown size={14} className="text-emerald-900 shrink-0" />
//           </button>

//           {isDropdownOpen && (
//             <div 
//               // [!code highlight] FIX: Stop Propagation to fix Mobile Scroll
//               onTouchStart={(e) => e.stopPropagation()} 
//               onTouchMove={(e) => e.stopPropagation()} 
//               onWheel={(e) => e.stopPropagation()}
//               className="absolute bottom-full left-0 mb-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-[150px] overflow-y-auto z-30 overscroll-contain"
//             >
//               {product.variants.map((variant) => (
//                 <div
//                   key={variant.product_variant_id}
//                   onClick={(e) => {
//                     e.preventDefault();
//                     e.stopPropagation();
//                     handleVariantChange(variant);
//                   }}
//                   className="px-3 py-2 text-[10px] md:text-[12px] hover:bg-gray-50 cursor-pointer text-gray-700 font-jakarta border-b border-gray-50 last:border-0"
//                 >
//                   {variant.size} {variant.uom} - ₹{Math.round(variant.discounted_price)}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Buy Button */}
//         <button
//           onClick={handleAddToCart}
//           disabled={isLoading}
//           className="
//             h-[32px] md:h-[36px] px-3 md:px-0 md:w-[51px] 
//             bg-[#003C22] border border-[#003C22] rounded-[12px] 
//             flex items-center justify-center hover:bg-emerald-800 transition-colors z-10 shrink-0
//             disabled:bg-emerald-900 disabled:cursor-not-allowed
//           "
//         >
//           <span className="text-white text-[12px] md:text-[14px] font-medium">
//             {isLoading ? '...' : 'Buy'}
//           </span>
//         </button>

//       </div>
//     </div>
//     </AnimatedPress>
//   );
// };

// export default ProductCard;
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // [!code highlight] 1. Import Router
import { motion } from 'framer-motion';      // [!code highlight] 2. Import Motion for Buy Button
import { Product, ProductVariant } from '@/types';
import { useCart } from '@/context/CartContext';
import AnimatedPress from '@/components/shared/AnimatedPress'; // [!code highlight] 3. Import AnimatedPress

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const router = useRouter(); // [!code highlight] 4. Router Hook

  // --- Initialization Logic ---
  const getInitialVariant = (): ProductVariant => {
    if (product.variants && product.variants.length > 0) {
      const displayVariant = product.variants.find(v => v.product_variant_id === product.product_variant_id);
      return displayVariant || product.variants[0];
    }
    return {
      product_variant_id: product.product_variant_id,
      size: product.size,
      uom: product.uom,
      price: product.price,
      discount: product.discount,
      discounted_price: product.discounted_price
    };
  };

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(() => getInitialVariant());
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    setSelectedVariant(getInitialVariant());
  }, [product]);

  const handleVariantChange = (variant: ProductVariant) => {
    setSelectedVariant(variant);
    setIsDropdownOpen(false);
  };

  // [!code highlight] 5. Animation + Navigation Logic (Reused Pattern)
  const handleProductClick = () => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate([50]);
    }
    // Delay navigation to show animation
    setTimeout(() => {
        router.push(`/shop/${product.product_id}`);
    }, 150);
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      setIsLoading(true);
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate([50]);
      }
      await addToCart(
        selectedVariant.product_variant_id, 
        1,
        {
            name: product.product_name,
            image: product.image_url
        }
      );
    } catch (error) {
      console.error("Failed to add to cart", error);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Scroll & Close Logic (Preserved) ---
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - lastScrollY.current) > 10) {
        setIsDropdownOpen(false);
      }
      lastScrollY.current = currentScrollY;
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      lastScrollY.current = window.scrollY;
      window.addEventListener('scroll', handleScroll, { passive: true });
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Helper to stop all propagation events (Critical for iOS)
  const stopPropagation = (e: React.UIEvent | React.TouchEvent | React.MouseEvent | React.PointerEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="
      group relative flex flex-col bg-white border border-[#E0E2E7] rounded-[12px] hover:shadow-lg transition-shadow font-jakarta shrink-0 overflow-visible
      w-full h-[254px]
      md:w-[240px] md:h-[348px]
    ">

      {/* 1. Image Section - WRAPPED IN ANIMATED PRESS */}
      {/* [!code highlight] 6. Replaced Link with AnimatedPress for the Image */}
      <AnimatedPress 
        onClick={handleProductClick}
        className="relative w-full flex justify-center items-center pt-4 md:pt-[42px] pb-2 md:pb-0 cursor-pointer grow"
      >
        <div className="w-[60px] h-[80px] md:w-[77px] md:h-[104px] relative transition-transform duration-300 group-hover:scale-105">
          <img
            src={product.image_url}
            alt={product.product_name}
            className="w-full h-full object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://placehold.co/77x104?text=No+Image';
            }}
          />
        </div>
      </AnimatedPress>

      {/* 2. Content Section */}
      <div className="flex flex-col px-3 md:px-[24px] w-full">
        {/* We keep Title as a standard Link for SEO, but you can change this to AnimatedPress if preferred */}
        <Link
          href={`/shop/${product.product_id}`}
          className="w-full text-[14px] md:text-[16px] font-semibold leading-[120%] md:leading-[100%] tracking-[0.01em] text-gray-900 truncate hover:text-emerald-700 transition-colors cursor-pointer mb-1 md:mb-[8px]"
          title={product.product_name}
        >
          {product.product_name}
        </Link>
        <div className="text-[12px] md:text-[14px] font-medium leading-[100%] text-[#4D4D4D] mb-2 md:mb-[20px]">
          {product.brand_name}
        </div>
        <div className="flex items-baseline gap-2 mb-3 md:mb-[20px]">
          <span className="text-[16px] md:text-[20px] font-semibold leading-[100%] tracking-[0.01em] text-[#003C22]">
            ₹{Math.round(selectedVariant.discounted_price)}
          </span>
          {selectedVariant.price > selectedVariant.discounted_price && (
            <span className="text-[12px] md:text-[14px] font-medium leading-[100%] tracking-[0.01em] text-black/70 line-through">
              ₹{Math.round(selectedVariant.price)}
            </span>
          )}
        </div>
      </div>

      {/* 3. Actions Section */}
      <div className="px-3 md:px-[24px] pb-3 md:pb-[24px] mt-auto w-full flex items-center justify-between gap-2">
        
        {/* Variant Dropdown (iOS FIXES KEPT HERE) */}
        <div className="relative z-20 w-full" ref={dropdownRef}>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation(); 
              setIsDropdownOpen(!isDropdownOpen);
            }}
            onPointerDown={stopPropagation} 
            className="
              w-full h-[32px] md:h-[36px] 
              border border-[#003C22] rounded-[20px] flex items-center justify-between 
              px-2 md:px-[12px] py-[8px] bg-white opacity-90 hover:opacity-100 transition-opacity
            "
          >
            <span className="text-[10px] md:text-[12px] font-medium text-emerald-900 truncate max-w-[80px] md:max-w-[90px]">
              {selectedVariant.size} {selectedVariant.uom}
            </span>
            <ChevronDown size={14} className="text-emerald-900 shrink-0" />
          </button>

          {isDropdownOpen && (
            <div 
              style={{ touchAction: 'pan-y' }}
              onTouchStart={stopPropagation} 
              onTouchMove={stopPropagation} 
              onPointerDown={stopPropagation} 
              onWheel={stopPropagation}
              className="absolute bottom-full left-0 mb-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-[150px] overflow-y-auto z-30 overscroll-contain"
            >
              {product.variants.map((variant) => (
                <div
                  key={variant.product_variant_id}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleVariantChange(variant);
                  }}
                  className="px-3 py-2 text-[10px] md:text-[12px] hover:bg-gray-50 cursor-pointer text-gray-700 font-jakarta border-b border-gray-50 last:border-0"
                >
                  {variant.size} {variant.uom} - ₹{Math.round(variant.discounted_price)}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Buy Button - [!code highlight] 7. Added motion.button for Tap Effect */}
        <motion.button
          onClick={handleAddToCart}
          onPointerDown={stopPropagation}
          disabled={isLoading}
          whileTap={{ scale: 0.90 }} // Press effect for Buy Button
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="
            h-[32px] md:h-[36px] px-3 md:px-0 md:w-[51px] 
            bg-[#003C22] border border-[#003C22] rounded-[12px] 
            flex items-center justify-center hover:bg-emerald-800 transition-colors z-10 shrink-0
            disabled:bg-emerald-900 disabled:cursor-not-allowed
          "
        >
          <span className="text-white text-[12px] md:text-[14px] font-medium">
            {isLoading ? '...' : 'Buy'}
          </span>
        </motion.button>

      </div>
    </div>
  );
};

export default ProductCard;