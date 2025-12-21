// 'use client';

// import React, { useState, useRef, useEffect } from 'react';
// import { ChevronDown } from 'lucide-react';
// import { SeasonalProduct, SeasonalVariant } from './types';

// interface SeasonalProductCardProps {
//   product: SeasonalProduct;
// }

// const SeasonalProductCard = ({ product }: SeasonalProductCardProps) => {
//   const [selectedVariant, setSelectedVariant] = useState<SeasonalVariant>(product.variants[0]);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   const handleVariantChange = (variant: SeasonalVariant) => {
//     setSelectedVariant(variant);
//     setIsDropdownOpen(false);
//   };

//   // Re-sync if product changes (e.g. user scrolled to next question)
//   useEffect(() => {
//     if (product.variants.length > 0) {
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

//   // [!code fix] Safe access to properties
//   const price = selectedVariant?.price || 0;
//   const discounted = selectedVariant?.discounted_price || 0;

//   return (
//     <div className="group relative flex flex-col bg-white border border-[#E0E2E7] rounded-[12px] hover:shadow-lg transition-shadow font-jakarta shrink-0 overflow-visible w-[160px] md:w-[240px] h-[254px] md:h-[348px]">
      
//       {/* Image */}
//       <div className="relative w-full flex justify-center items-center pt-4 md:pt-[42px] pb-0 cursor-pointer grow">
//         <div className="w-[60px] h-[80px] md:w-[80px] md:h-[104px] relative transition-transform duration-300 group-hover:scale-105">
//           <img 
//             src={product.image} 
//             alt={product.name} 
//             className="w-full h-full object-contain mix-blend-multiply" 
//           />
//         </div>
//       </div>

//       {/* Content */}
//       <div className="flex flex-col px-3 md:px-[24px] w-full">
//         <div className="w-full text-[14px] md:text-[16px] font-semibold leading-[100%] tracking-[0.01em] text-gray-900 truncate mb-1 md:mb-[8px]" title={product.name}>
//           {product.name}
//         </div>
//         <div className="text-[12px] md:text-[14px] font-medium leading-[100%] text-[#4D4D4D] mb-2 md:mb-[20px]">
//           {product.brand}
//         </div>
//         <div className="flex items-baseline gap-2 mb-3 md:mb-[20px]">
//           {/* [!code fix] Correctly displaying discounted price */}
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

//       {/* Actions */}
//       <div className="px-3 md:px-[24px] pb-3 md:pb-[24px] mt-auto w-full flex items-center justify-between gap-2">
        
//         {/* Dropdown */}
//         <div className="relative w-full" ref={dropdownRef}>
//             <button 
//                 onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                 className="w-full h-[32px] md:h-[36px] border border-[#003C22] rounded-[20px] flex items-center justify-between px-2 md:px-[12px] bg-white opacity-90 hover:opacity-100 transition-opacity"
//             >
//                 <span className="text-[10px] md:text-[12px] font-medium text-emerald-900 truncate">
//                   {selectedVariant?.size}{selectedVariant?.uom}
//                 </span>
//                 <ChevronDown size={14} className="text-emerald-900 shrink-0" />
//             </button>

//             {isDropdownOpen && (
//               <div className="absolute bottom-full left-0 mb-1 w-[140px] md:w-[180px] bg-white border border-gray-200 rounded-lg shadow-xl max-h-[150px] overflow-y-auto z-50">
//                 {product.variants.map((variant) => (
//                   <div 
//                     key={variant.product_variant_id}
//                     onClick={() => handleVariantChange(variant)}
//                     className="px-3 py-2 text-[10px] md:text-[12px] hover:bg-gray-50 cursor-pointer text-gray-700 font-jakarta border-b border-gray-50 last:border-0"
//                   >
//                     {variant.size}{variant.uom} - ₹{Math.round(variant.discounted_price)}
//                   </div>
//                 ))}
//               </div>
//             )}
//         </div>

//         {/* Buy Button */}
//         <button className="w-[40px] h-[32px] md:w-[51px] md:h-[36px] bg-[#003C22] border border-[#003C22] rounded-[12px] flex items-center justify-center hover:bg-emerald-800 transition-colors shrink-0">
//             <span className="text-white text-[12px] md:text-[14px] font-medium">Buy</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SeasonalProductCard;
// 'use client';

// import React, { useState, useRef, useEffect } from 'react';
// import { ChevronDown } from 'lucide-react';
// import { SeasonalProduct, SeasonalVariant } from './types';
// // [!code ++] Import Link for navigation
// import Link from 'next/link';

// interface SeasonalProductCardProps {
//   product: SeasonalProduct;
// }

// const SeasonalProductCard = ({ product }: SeasonalProductCardProps) => {
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
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   const handleVariantChange = (variant: SeasonalVariant) => {
//     setSelectedVariant(variant);
//     setIsDropdownOpen(false);
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
//       /* [!code highlight] Mobile Dimensions: 177px x 245px */
//       w-[177px] h-[245px]
//       /* Desktop Dimensions: 240px x 348px */
//       md:w-[240px] md:h-[348px]
//     ">
      
//       {/* Image Section */}
//       <Link href={`/shop/${product.id}`} className="relative w-full flex justify-center items-center pt-3 md:pt-[42px] cursor-pointer grow">
//         <div className="w-[60px] h-[80px] md:w-[80px] md:h-[104px] relative transition-transform duration-300 group-hover:scale-105">
//           <img 
//             src={product.image} 
//             alt={product.name} 
//             className="w-full h-full object-contain mix-blend-multiply" 
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
//         <div className="relative w-full" ref={dropdownRef}>
//             <button 
//                 onClick={(e) => { e.stopPropagation(); setIsDropdownOpen(!isDropdownOpen); }}
//                 className="w-full h-[32px] md:h-[36px] border border-[#003C22] rounded-[20px] flex items-center justify-between px-2 md:px-[12px] bg-white opacity-90 hover:opacity-100 transition-opacity"
//             >
//                 <span className="text-[10px] md:text-[12px] font-medium text-emerald-900 truncate max-w-[60px] md:max-w-none">
//                   {selectedVariant?.size}{selectedVariant?.uom}
//                 </span>
//                 <ChevronDown size={14} className="text-emerald-900 shrink-0" />
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
//         <button className="w-[40px] h-[32px] md:w-[51px] md:h-[36px] bg-[#003C22] border border-[#003C22] rounded-[12px] flex items-center justify-center hover:bg-emerald-800 transition-colors shrink-0">
//             <span className="text-white text-[12px] md:text-[14px] font-medium">Buy</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SeasonalProductCard;
// 'use client';

// import React, { useState, useRef, useEffect } from 'react';
// import { ChevronDown, Loader2, Check } from 'lucide-react'; // Added Icons
// import { SeasonalProduct, SeasonalVariant } from './types';
// import Link from 'next/link';
// import { useCart } from '@/context/CartContext'; // Added Context

// interface SeasonalProductCardProps {
//   product: SeasonalProduct;
// }

// const SeasonalProductCard = ({ product }: SeasonalProductCardProps) => {
//   const { addToCart } = useCart(); // Use Cart Hook

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
//     setIsAdded(false); // Reset "Added" state when variant changes
//   };

//   const handleAddToCart = async (e: React.MouseEvent) => {
//     e.preventDefault(); // Prevent navigation to product page
//     e.stopPropagation();

//     if (isAdding || isAdded) return;

//     setIsAdding(true);
//     try {
//       await addToCart(selectedVariant.product_variant_id, 1);
//       setIsAdded(true);
      
//       // Optional: Reset back to "Buy" after 2 seconds if you want
//       // setTimeout(() => setIsAdded(false), 2000); 
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
//         <div className="relative w-full" ref={dropdownRef}>
//             <button 
//                 onClick={(e) => { e.stopPropagation(); setIsDropdownOpen(!isDropdownOpen); }}
//                 className="w-full h-[32px] md:h-[36px] border border-[#003C22] rounded-[20px] flex items-center justify-between px-2 md:px-[12px] bg-white opacity-90 hover:opacity-100 transition-opacity"
//             >
//                 <span className="text-[10px] md:text-[12px] font-medium text-emerald-900 truncate max-w-[60px] md:max-w-none">
//                   {selectedVariant?.size}{selectedVariant?.uom}
//                 </span>
//                 <ChevronDown size={14} className="text-emerald-900 shrink-0" />
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

//         {/* Buy Button with Active Logic */}
//         <button 
//             onClick={handleAddToCart}
//             disabled={isAdding || isAdded}
//             className={`
//                 w-[40px] h-[32px] md:w-[51px] md:h-[36px] 
//                 rounded-[12px] flex items-center justify-center 
//                 transition-all shrink-0
//                 ${isAdded 
//                    ? 'bg-[#E8F5E9] border border-[#E8F5E9]' // Added State
//                    : 'bg-[#003C22] border border-[#003C22] hover:bg-emerald-800' // Default State
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
import Link from 'next/link';
import { useCart } from '@/context/CartContext'; 

interface SeasonalProductCardProps {
  product: SeasonalProduct;
}

const SeasonalProductCard = ({ product }: SeasonalProductCardProps) => {
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
    e.stopPropagation();

    if (isAdding || isAdded) return;

    setIsAdding(true);
    try {
      // [!code changed] Pass product details for popup
      await addToCart(
        selectedVariant.product_variant_id, 
        1,
        {
            name: product.name,
            image: product.image
        }
      );
      setIsAdded(true);
      
      // Optional: Reset back to "Buy" after 2 seconds
      // setTimeout(() => setIsAdded(false), 2000); 
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

  return (
    <div className="
      group relative flex flex-col bg-white border border-[#E0E2E7] rounded-[12px] hover:shadow-lg transition-shadow font-jakarta shrink-0 overflow-visible
      w-[177px] h-[245px]
      md:w-[240px] md:h-[348px]
    ">
      
      {/* Image Section */}
      <Link href={`/shop/${product.id}`} className="relative w-full flex justify-center items-center pt-3 md:pt-[42px] cursor-pointer grow">
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
      </Link>

      {/* Content Section */}
      <div className="flex flex-col px-3 md:px-[24px] w-full">
        <Link href={`/shop/${product.id}`} className="w-full text-[14px] md:text-[16px] font-semibold leading-[120%] md:leading-[100%] tracking-[0.01em] text-gray-900 truncate mb-1 md:mb-[8px]" title={product.name}>
          {product.name}
        </Link>
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
        <div className="relative w-full" ref={dropdownRef}>
            <button 
                onClick={(e) => { e.stopPropagation(); setIsDropdownOpen(!isDropdownOpen); }}
                className="w-full h-[32px] md:h-[36px] border border-[#003C22] rounded-[20px] flex items-center justify-between px-2 md:px-[12px] bg-white opacity-90 hover:opacity-100 transition-opacity"
            >
                <span className="text-[10px] md:text-[12px] font-medium text-emerald-900 truncate max-w-[60px] md:max-w-none">
                  {selectedVariant?.size}{selectedVariant?.uom}
                </span>
                <ChevronDown size={14} className="text-emerald-900 shrink-0" />
            </button>

            {isDropdownOpen && (
              <div className="absolute bottom-full left-0 mb-1 w-[140px] md:w-[180px] bg-white border border-gray-200 rounded-lg shadow-xl max-h-[150px] overflow-y-auto z-50">
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

        {/* Buy Button with Active Logic */}
        <button 
            onClick={handleAddToCart}
            disabled={isAdding || isAdded}
            className={`
                w-[40px] h-[32px] md:w-[51px] md:h-[36px] 
                rounded-[12px] flex items-center justify-center 
                transition-all shrink-0
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
  );
};

export default SeasonalProductCard;