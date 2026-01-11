

// 'use client';

// import React, { useState, useRef, useEffect } from 'react';
// import { ChevronDown, Loader2, Check } from 'lucide-react'; 
// import { SeasonalProduct, SeasonalVariant } from './types';
// import Link from 'next/link';
// import { useCart } from '@/context/CartContext'; 


// interface SeasonalProductCardProps {
//   product: SeasonalProduct;
// }

// const SeasonalProductCard = ({ product }: SeasonalProductCardProps) => {
//   const { addToCart } = useCart(); 

//   // Safe default in case variants are missing
//   const defaultVariant = product.variants?.[0] || {
//     product_variant_id: 0,
//     size: 0,
//     uom: '',
//     price: 0,
//     discounted_price: 0
//   };

//   const [selectedVariant, setSelectedVariant] = useState<SeasonalVariant>(defaultVariant);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
//   // Loading states for Buy button
//   const [isAdding, setIsAdding] = useState(false);
//   const [isAdded, setIsAdded] = useState(false);

//   const dropdownRef = useRef<HTMLDivElement>(null);

//   const handleVariantChange = (variant: SeasonalVariant) => {
//     setSelectedVariant(variant);
//     setIsDropdownOpen(false);
//     setIsAdded(false); 
//   };

//   const handleAddToCart = async (e: React.MouseEvent) => {
//     e.preventDefault(); 
//     e.stopPropagation();

//     if (isAdding || isAdded) return;

//     setIsAdding(true);
//     try {
//       await addToCart(
//         selectedVariant.product_variant_id, 
//         1,
//         {
//             name: product.name,
//             image: product.image
//         }
//       );
//       setIsAdded(true);
//     } catch (error) {
//       console.error("Failed to add to cart", error);
//     } finally {
//       setIsAdding(false);
//     }
//   };

//   useEffect(() => {
//     if (product.variants?.length > 0) {
//       setSelectedVariant(product.variants[0]);
//     }
//   }, [product]);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsDropdownOpen(false);
//       }
//     };
//     if (isDropdownOpen) document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [isDropdownOpen]);

//   const price = selectedVariant?.price || 0;
//   const discounted = selectedVariant?.discounted_price || 0;

//   return (
    

//     <div className="
//       group relative flex flex-col bg-white border border-[#E0E2E7] rounded-[12px] hover:shadow-lg transition-shadow font-jakarta shrink-0 overflow-visible
//       w-[177px] h-[245px]
//       md:w-[240px] md:h-[348px]
//     ">
      
//       {/* Image Section */}
//       <Link href={`/shop/${product.id}`} className="relative w-full flex justify-center items-center pt-3 md:pt-[42px] cursor-pointer grow">
//         <div className="w-[60px] h-[80px] md:w-[80px] md:h-[104px] relative transition-transform duration-300 group-hover:scale-105">
//           <img 
//             src={product.image} 
//             alt={product.name} 
//             className="w-full h-full object-contain mix-blend-multiply" 
//             onError={(e) => {
//                 (e.target as HTMLImageElement).src = 'https://placehold.co/80x104?text=No+Image';
//             }}
//           />
//         </div>
//       </Link>

//       {/* Content Section */}
//       <div className="flex flex-col px-3 md:px-[24px] w-full">
//         <Link href={`/shop/${product.id}`} className="w-full text-[14px] md:text-[16px] font-semibold leading-[120%] md:leading-[100%] tracking-[0.01em] text-gray-900 truncate mb-1 md:mb-[8px]" title={product.name}>
//           {product.name}
//         </Link>
//         <div className="text-[12px] md:text-[14px] font-medium leading-[100%] text-[#4D4D4D] mb-2 md:mb-[20px]">
//           {product.brand}
//         </div>
//         <div className="flex items-baseline gap-2 mb-3 md:mb-[20px]">
//           <span className="text-[16px] md:text-[20px] font-semibold leading-[100%] tracking-[0.01em] text-[#003C22]">
//             ₹{Math.round(discounted)}
//           </span>
//           {price > discounted && (
//              <span className="text-[12px] md:text-[14px] font-medium leading-[100%] tracking-[0.01em] text-black/70 line-through">
//                ₹{Math.round(price)}
//              </span>
//           )}
//         </div>
//       </div>

//       {/* Actions Section */}
//       <div className="px-3 md:px-[24px] pb-3 md:pb-[24px] mt-auto w-full flex items-center justify-between gap-2">
        
//         {/* Dropdown */}
//         <div className="relative flex-1 min-w-0" ref={dropdownRef}>
//             <button 
//                 onClick={(e) => { e.stopPropagation(); setIsDropdownOpen(!isDropdownOpen); }}
//                 className="w-full h-[32px] md:h-[36px] border border-[#003C22] rounded-[20px] flex items-center justify-between px-2 md:px-[12px] bg-white opacity-90 hover:opacity-100 transition-opacity"
//             >
//                 {/* [!code highlight] FIXED: Removed max-w-[60px], used flex-1 and min-w-0 for smart sizing */}
//                 <span className="text-[10px] md:text-[12px] font-medium text-emerald-900 truncate flex-1 text-left">
//                   {selectedVariant?.size}{selectedVariant?.uom}
//                 </span>
//                 <ChevronDown size={14} className="text-emerald-900 shrink-0 ml-1" />
//             </button>

//             {isDropdownOpen && (
//               <div className="absolute bottom-full left-0 mb-1 w-[140px] md:w-[180px] bg-white border border-gray-200 rounded-lg shadow-xl max-h-[150px] overflow-y-auto z-50">
//                 {product.variants.map((variant) => (
//                   <div 
//                     key={variant.product_variant_id}
//                     onClick={(e) => { e.stopPropagation(); handleVariantChange(variant); }}
//                     className="px-3 py-2 text-[10px] md:text-[12px] hover:bg-gray-50 cursor-pointer text-gray-700 font-jakarta border-b border-gray-50 last:border-0"
//                   >
//                     {variant.size}{variant.uom} - ₹{Math.round(variant.discounted_price)}
//                   </div>
//                 ))}
//               </div>
//             )}
//         </div>

//         {/* Buy Button */}
//         <button 
//             onClick={handleAddToCart}
//             disabled={isAdding || isAdded}
//             className={`
//                 w-[40px] h-[32px] md:w-[51px] md:h-[36px] 
//                 rounded-[12px] flex items-center justify-center 
//                 transition-all shrink-0
//                 ${isAdded 
//                    ? 'bg-[#E8F5E9] border border-[#E8F5E9]' 
//                    : 'bg-[#003C22] border border-[#003C22] hover:bg-emerald-800' 
//                 }
//             `}
//         >
//             {isAdding ? (
//                 <Loader2 size={16} className="text-white animate-spin" />
//             ) : isAdded ? (
//                 <Check size={18} className="text-[#003C22]" />
//             ) : (
//                 <span className="text-white text-[12px] md:text-[14px] font-medium">Buy</span>
//             )}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SeasonalProductCard;

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Loader2, Check } from 'lucide-react'; 
import { SeasonalProduct, SeasonalVariant } from './types';
import { useRouter } from 'next/navigation'; // ✅ Changed Link to useRouter
import { useCart } from '@/context/CartContext'; 
// ✅ Import Animation Wrapper
import AnimatedPress from '@/components/shared/AnimatedPress';

interface SeasonalProductCardProps {
  product: SeasonalProduct;
}

const SeasonalProductCard = ({ product }: SeasonalProductCardProps) => {
  const router = useRouter(); // ✅ Initialize Router
  const { addToCart } = useCart(); 

  // Safe default in case variants are missing
  const defaultVariant = product.variants?.[0] || {
    product_variant_id: 0,
    size: 0,
    uom: '',
    price: 0,
    discounted_price: 0
  };

  const [selectedVariant, setSelectedVariant] = useState<SeasonalVariant>(defaultVariant);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Loading states for Buy button
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleVariantChange = (variant: SeasonalVariant) => {
    setSelectedVariant(variant);
    setIsDropdownOpen(false);
    setIsAdded(false); 
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation(); // ✅ Prevents card animation/navigation

    if (isAdding || isAdded) return;

    setIsAdding(true);
    try {
      await addToCart(
        selectedVariant.product_variant_id, 
        1,
        {
            name: product.name,
            image: product.image
        }
      );
      setIsAdded(true);
    } catch (error) {
      console.error("Failed to add to cart", error);
    } finally {
      setIsAdding(false);
    }
  };

  useEffect(() => {
    if (product.variants?.length > 0) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  const price = selectedVariant?.price || 0;
  const discounted = selectedVariant?.discounted_price || 0;

  // ✅ Handle Card Navigation
  const handleNavigate = () => {
    router.push(`/shop/${product.id}`);
  };

  return (
    // ✅ WRAP IN ANIMATED PRESS
    <AnimatedPress 
      onClick={handleNavigate}
      className="w-[177px] h-[245px] md:w-[240px] md:h-[348px] shrink-0"
    >
      <div className="
        group relative flex flex-col bg-white border border-[#E0E2E7] rounded-[12px] hover:shadow-lg transition-shadow font-jakarta overflow-visible
        h-full w-full
      ">
        
        {/* Image Section */}
        {/* Changed Link to div, navigation handled by AnimatedPress */}
        <div className="relative w-full flex justify-center items-center pt-3 md:pt-[42px] cursor-pointer grow">
          <div className="w-[60px] h-[80px] md:w-[80px] md:h-[104px] relative transition-transform duration-300 group-hover:scale-105">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-contain mix-blend-multiply" 
              onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://placehold.co/80x104?text=No+Image';
              }}
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col px-3 md:px-[24px] w-full">
          {/* Changed Link to div */}
          <div className="w-full text-[14px] md:text-[16px] font-semibold leading-[120%] md:leading-[100%] tracking-[0.01em] text-gray-900 truncate mb-1 md:mb-[8px]" title={product.name}>
            {product.name}
          </div>
          <div className="text-[12px] md:text-[14px] font-medium leading-[100%] text-[#4D4D4D] mb-2 md:mb-[20px]">
            {product.brand}
          </div>
          <div className="flex items-baseline gap-2 mb-3 md:mb-[20px]">
            <span className="text-[16px] md:text-[20px] font-semibold leading-[100%] tracking-[0.01em] text-[#003C22]">
              ₹{Math.round(discounted)}
            </span>
            {price > discounted && (
               <span className="text-[12px] md:text-[14px] font-medium leading-[100%] tracking-[0.01em] text-black/70 line-through">
                 ₹{Math.round(price)}
               </span>
            )}
          </div>
        </div>

        {/* Actions Section */}
        <div className="px-3 md:px-[24px] pb-3 md:pb-[24px] mt-auto w-full flex items-center justify-between gap-2">
          
          {/* Dropdown */}
          <div className="relative flex-1 min-w-0" ref={dropdownRef}>
              <button 
                  onClick={(e) => { e.stopPropagation(); setIsDropdownOpen(!isDropdownOpen); }}
                  className="w-full h-[32px] md:h-[36px] border border-[#003C22] rounded-[20px] flex items-center justify-between px-2 md:px-[12px] bg-white opacity-90 hover:opacity-100 transition-opacity"
              >
                  <span className="text-[10px] md:text-[12px] font-medium text-emerald-900 truncate flex-1 text-left">
                    {selectedVariant?.size}{selectedVariant?.uom}
                  </span>
                  <ChevronDown size={14} className="text-emerald-900 shrink-0 ml-1" />
              </button>

              {isDropdownOpen && (
                <div 
                  className="absolute bottom-full left-0 mb-1 w-[140px] md:w-[180px] bg-white border border-gray-200 rounded-lg shadow-xl max-h-[150px] overflow-y-auto z-50"
                  onClick={(e) => e.stopPropagation()} // Stop bubbling inside dropdown
                >
                  {product.variants.map((variant) => (
                    <div 
                      key={variant.product_variant_id}
                      onClick={(e) => { e.stopPropagation(); handleVariantChange(variant); }}
                      className="px-3 py-2 text-[10px] md:text-[12px] hover:bg-gray-50 cursor-pointer text-gray-700 font-jakarta border-b border-gray-50 last:border-0"
                    >
                      {variant.size}{variant.uom} - ₹{Math.round(variant.discounted_price)}
                    </div>
                  ))}
                </div>
              )}
          </div>

          {/* Buy Button */}
          <button 
              onClick={handleAddToCart}
              disabled={isAdding || isAdded}
              className={`
                  w-[40px] h-[32px] md:w-[51px] md:h-[36px] 
                  rounded-[12px] flex items-center justify-center 
                  transition-all shrink-0 z-10 relative
                  ${isAdded 
                    ? 'bg-[#E8F5E9] border border-[#E8F5E9]' 
                    : 'bg-[#003C22] border border-[#003C22] hover:bg-emerald-800' 
                  }
              `}
          >
              {isAdding ? (
                  <Loader2 size={16} className="text-white animate-spin" />
              ) : isAdded ? (
                  <Check size={18} className="text-[#003C22]" />
              ) : (
                  <span className="text-white text-[12px] md:text-[14px] font-medium">Buy</span>
              )}
          </button>
        </div>
      </div>
    </AnimatedPress>
  );
};

export default SeasonalProductCard;