// // // import React from 'react';
// // // import { ChevronDown, ShoppingBag } from 'lucide-react';

// // // interface Product {
// // //   id: number;
// // //   title: string;
// // //   brand: string;
// // //   price: number;
// // //   originalPrice: number;
// // //   image: string;
// // //   seedsOption: string;
// // // }

// // // const ProductCard = ({ product }: { product: Product }) => {
// // //   return (
// // //     // Card Outer Layout: W: 240px, H: 348px
// // //     <div className="relative w-[240px] h-[348px] bg-white border border-gray-100 rounded-xl hover:shadow-lg transition-shadow font-jakarta group shrink-0">
      
// // //       {/* Image: W: 77, H: 104, Top: 42px from card top */}
// // //       <div className="absolute top-[42px] left-0 w-full flex justify-center">
// // //         <div className="w-[77px] h-[104px]">
// // //           <img src={product.image} alt={product.title} className="w-full h-full object-contain" />
// // //         </div>
// // //       </div>

// // //       {/* Product Name: W: 177, H: 20, Top: 176px from card top, Left: 24px */}
// // //       <div 
// // //         className="absolute top-[176px] left-[24px] w-[177px] h-[20px] text-[16px] font-semibold leading-[100%] tracking-[0.01em] text-gray-900 truncate"
// // //         style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
// // //       >
// // //         {product.title}
// // //       </div>

// // //       {/* Brand Name: W: 64, H: 18, Top: 204px from card top, Left: 24px */}
// // //       <div 
// // //         className="absolute top-[204px] left-[24px] w-[64px] h-[18px] text-[14px] font-medium leading-[100%] text-[#4D4D4D]"
// // //         style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
// // //       >
// // //         {product.brand}
// // //       </div>

// // //       {/* Price: W: 48, H: 25, Top: 242px from card top, Left: 24px */}
// // //       <div 
// // //         className="absolute top-[242px] left-[24px] h-[25px] text-[20px] font-semibold leading-[100%] tracking-[0.01em] text-[#003C22]"
// // //         style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
// // //       >
// // //         ₹{product.price}
// // //       </div>

// // //       {/* Crossed Price: W: 36, H: 18, Top: 246px from card top, Left: 78px */}
// // //       <div 
// // //         className="absolute top-[246px] left-[78px] h-[18px] text-[14px] font-medium leading-[100%] tracking-[0.01em] text-black/70 line-through"
// // //         style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
// // //       >
// // //         ₹{product.originalPrice}
// // //       </div>

// // //       {/* Variant Dropdown: W: 137, H: 36, Top: 287px from card top, Left: 24px */}
// // //       <button 
// // //         className="absolute top-[287px] left-[24px] w-[137px] h-[36px] border border-[#003C22] rounded-[20px] flex items-center justify-between px-[12px] py-[8px] opacity-80 hover:opacity-100 transition-opacity"
// // //       >
// // //         <span className="text-[12px] font-medium text-emerald-900">{product.seedsOption}</span>
// // //         <ChevronDown size={14} className="text-emerald-900" />
// // //       </button>

// // //       {/* Buy Button: W: 51, H: 36, Top: 287px from card top, Left: 165px */}
// // //       <button 
// // //         className="absolute top-[287px] left-[165px] w-[51px] h-[36px] bg-[#003C22] border border-[#003C22] rounded-[12px] flex items-center justify-center hover:bg-emerald-800 transition-colors"
// // //       >
// // //         <span className="text-white text-[14px] font-medium">Buy</span>
// // //       </button>
// // //     </div>
// // //   );
// // // };

// // // export default ProductCard;

// // // 'use client';

// // // import React, { useState } from 'react';
// // // import { ChevronDown, ShoppingBag } from 'lucide-react';
// // // import { Product, ProductVariant } from '@/types';

// // // interface ProductCardProps {
// // //   product: Product;
// // // }

// // // const ProductCard = ({ product }: ProductCardProps) => {
// // //   // Default to the first variant
// // //   const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
// // //   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

// // //   const handleVariantChange = (variant: ProductVariant) => {
// // //     setSelectedVariant(variant);
// // //     setIsDropdownOpen(false);
// // //   };

// // //   return (
// // //     <div className="relative w-[240px] h-[348px] bg-white border border-gray-100 rounded-xl hover:shadow-lg transition-shadow font-jakarta group shrink-0">
      
// // //       {/* Image */}
// // //       <div className="absolute top-[42px] left-0 w-full flex justify-center">
// // //         <div className="w-[77px] h-[104px]">
// // //           <img 
// // //             src={product.image_url} 
// // //             alt={product.product_name} 
// // //             className="w-full h-full object-contain"
// // //             onError={(e) => {
// // //               // Fallback if image fails
// // //               (e.target as HTMLImageElement).src = 'https://placehold.co/77x104?text=No+Image'; 
// // //             }}
// // //           />
// // //         </div>
// // //       </div>

// // //       {/* Product Name */}
// // //       <div 
// // //         className="absolute top-[176px] left-[24px] w-[177px] h-[20px] text-[16px] font-semibold leading-[100%] tracking-[0.01em] text-gray-900 truncate"
// // //         title={product.product_name}
// // //       >
// // //         {product.product_name}
// // //       </div>

// // //       {/* Brand Name */}
// // //       <div 
// // //         className="absolute top-[204px] left-[24px] w-[64px] h-[18px] text-[14px] font-medium leading-[100%] text-[#4D4D4D]"
// // //       >
// // //         {product.brand_name}
// // //       </div>

// // //       {/* Price (Discounted) */}
// // //       <div 
// // //         className="absolute top-[242px] left-[24px] h-[25px] text-[20px] font-semibold leading-[100%] tracking-[0.01em] text-[#003C22]"
// // //       >
// // //         ₹{Math.round(selectedVariant.discounted_price)}
// // //       </div>

// // //       {/* Original Price (Only show if different) */}
// // //       {selectedVariant.price > selectedVariant.discounted_price && (
// // //         <div 
// // //           className="absolute top-[246px] left-[90px] h-[18px] text-[14px] font-medium leading-[100%] tracking-[0.01em] text-black/70 line-through"
// // //         >
// // //           ₹{Math.round(selectedVariant.price)}
// // //         </div>
// // //       )}

// // //       {/* Variant Dropdown */}
// // //       <div className="absolute top-[287px] left-[24px] z-10">
// // //         <button 
// // //           onClick={() => setIsDropdownOpen(!isDropdownOpen)}
// // //           className="w-[137px] h-[36px] border border-[#003C22] rounded-[20px] flex items-center justify-between px-[12px] py-[8px] bg-white opacity-90 hover:opacity-100 transition-opacity"
// // //         >
// // //           <span className="text-[12px] font-medium text-emerald-900 truncate">
// // //             {selectedVariant.size} {selectedVariant.uom}
// // //           </span>
// // //           <ChevronDown size={14} className="text-emerald-900 shrink-0" />
// // //         </button>

// // //         {/* Dropdown Menu */}
// // //         {isDropdownOpen && (
// // //           <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-[150px] overflow-y-auto">
// // //             {product.variants.map((variant) => (
// // //               <div 
// // //                 key={variant.product_variant_id}
// // //                 onClick={() => handleVariantChange(variant)}
// // //                 className="px-3 py-2 text-[12px] hover:bg-gray-50 cursor-pointer text-gray-700"
// // //               >
// // //                 {variant.size} {variant.uom} - ₹{Math.round(variant.discounted_price)}
// // //               </div>
// // //             ))}
// // //           </div>
// // //         )}
// // //       </div>

// // //       {/* Buy Button */}
// // //       <button 
// // //         className="absolute top-[287px] left-[165px] w-[51px] h-[36px] bg-[#003C22] border border-[#003C22] rounded-[12px] flex items-center justify-center hover:bg-emerald-800 transition-colors z-0"
// // //       >
// // //         <span className="text-white text-[14px] font-medium">Buy</span>
// // //       </button>
// // //     </div>
// // //   );
// // // };

// // // export default ProductCard;
// // // 'use client';

// // // import React, { useState, useEffect, useRef } from 'react';
// // // import { ChevronDown, ShoppingBag } from 'lucide-react';
// // // import { Product, ProductVariant } from '@/types';

// // // interface ProductCardProps {
// // //   product: Product;
// // // }

// // // const ProductCard = ({ product }: ProductCardProps) => {
// // //   // Default to the first variant
// // //   const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
// // //   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
// // //   // Ref to detect clicks outside the dropdown
// // //   const dropdownRef = useRef<HTMLDivElement>(null);

// // //   const handleVariantChange = (variant: ProductVariant) => {
// // //     setSelectedVariant(variant);
// // //     setIsDropdownOpen(false);
// // //   };

// // //   // --- Auto-close Dropdown Handlers ---
// // //   useEffect(() => {
// // //     // 1. Close on Scroll
// // //     const handleScroll = () => {
// // //       if (isDropdownOpen) setIsDropdownOpen(false);
// // //     };

// // //     // 2. Close on Click Outside
// // //     const handleClickOutside = (event: MouseEvent) => {
// // //       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
// // //         setIsDropdownOpen(false);
// // //       }
// // //     };

// // //     if (isDropdownOpen) {
// // //       window.addEventListener('scroll', handleScroll, true); // Capture phase for scroll
// // //       document.addEventListener('mousedown', handleClickOutside);
// // //     }

// // //     return () => {
// // //       window.removeEventListener('scroll', handleScroll, true);
// // //       document.removeEventListener('mousedown', handleClickOutside);
// // //     };
// // //   }, [isDropdownOpen]);

// // //   return (
// // //     <div className="relative w-[240px] h-[348px] bg-white border border-gray-100 rounded-xl hover:shadow-lg transition-shadow font-jakarta group shrink-0">
      
// // //       {/* Image */}
// // //       <div className="absolute top-[42px] left-0 w-full flex justify-center">
// // //         <div className="w-[77px] h-[104px]">
// // //           <img 
// // //             src={product.image_url} 
// // //             alt={product.product_name} 
// // //             className="w-full h-full object-contain"
// // //             onError={(e) => {
// // //               (e.target as HTMLImageElement).src = 'https://placehold.co/77x104?text=No+Image'; 
// // //             }}
// // //           />
// // //         </div>
// // //       </div>

// // //       {/* Product Name */}
// // //       <div 
// // //         className="absolute top-[176px] left-[24px] w-[177px] h-[20px] text-[16px] font-semibold leading-[100%] tracking-[0.01em] text-gray-900 truncate"
// // //         title={product.product_name}
// // //       >
// // //         {product.product_name}
// // //       </div>

// // //       {/* Brand Name */}
// // //       <div 
// // //         className="absolute top-[204px] left-[24px] w-[64px] h-[18px] text-[14px] font-medium leading-[100%] text-[#4D4D4D]"
// // //       >
// // //         {product.brand_name}
// // //       </div>

// // //       {/* Price (Discounted) */}
// // //       <div 
// // //         className="absolute top-[242px] left-[24px] h-[25px] text-[20px] font-semibold leading-[100%] tracking-[0.01em] text-[#003C22]"
// // //       >
// // //         ₹{Math.round(selectedVariant.discounted_price)}
// // //       </div>

// // //       {/* Original Price (Only show if different) */}
// // //       {selectedVariant.price > selectedVariant.discounted_price && (
// // //         <div 
// // //           className="absolute top-[246px] left-[90px] h-[18px] text-[14px] font-medium leading-[100%] tracking-[0.01em] text-black/70 line-through"
// // //         >
// // //           ₹{Math.round(selectedVariant.price)}
// // //         </div>
// // //       )}

// // //       {/* Variant Dropdown */}
// // //       <div 
// // //         className="absolute top-[287px] left-[24px] z-10"
// // //         ref={dropdownRef} // Attached ref here to detect outside clicks
// // //       >
// // //         <button 
// // //           onClick={() => setIsDropdownOpen(!isDropdownOpen)}
// // //           className="w-[137px] h-[36px] border border-[#003C22] rounded-[20px] flex items-center justify-between px-[12px] py-[8px] bg-white opacity-90 hover:opacity-100 transition-opacity"
// // //         >
// // //           {/* Display Text (Styled: 15px, SemiBold, 1% spacing) */}
// // //           <span 
// // //             className="text-emerald-900 truncate font-jakarta"
// // //             style={{
// // //               fontSize: '15px',
// // //               fontWeight: 600, // SemiBold
// // //               lineHeight: '100%',
// // //               letterSpacing: '0.01em' // 1%
// // //             }}
// // //           >
// // //             {selectedVariant.size} {selectedVariant.uom}
// // //           </span>
// // //           <ChevronDown size={14} className="text-emerald-900 shrink-0" />
// // //         </button>

// // //         {/* Dropdown Menu Items */}
// // //         {isDropdownOpen && (
// // //           <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-[150px] overflow-y-auto">
// // //             {product.variants.map((variant) => (
// // //               <div 
// // //                 key={variant.product_variant_id}
// // //                 onClick={() => handleVariantChange(variant)}
// // //                 className="px-3 py-2 text-[12px] hover:bg-gray-50 cursor-pointer text-gray-700 font-jakarta"
// // //               >
// // //                 {variant.size} {variant.uom} - ₹{Math.round(variant.discounted_price)}
// // //               </div>
// // //             ))}
// // //           </div>
// // //         )}
// // //       </div>

// // //       {/* Buy Button */}
// // //       <button 
// // //         className="absolute top-[287px] left-[165px] w-[51px] h-[36px] bg-[#003C22] border border-[#003C22] rounded-[12px] flex items-center justify-center hover:bg-emerald-800 transition-colors z-0"
// // //       >
// // //         <span className="text-white text-[14px] font-medium">Buy</span>
// // //       </button>
// // //     </div>
// // //   );
// // // };

// // // export default ProductCard;

// // // 'use client';

// // // import React, { useState, useEffect, useRef } from 'react';
// // // import { ChevronDown, ShoppingBag } from 'lucide-react';
// // // import { Product, ProductVariant } from '@/types';

// // // interface ProductCardProps {
// // //   product: Product;
// // // }

// // // const ProductCard = ({ product }: ProductCardProps) => {
// // //   // Default to the first variant
// // //   const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
// // //   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
// // //   // Ref to detect clicks outside the dropdown
// // //   const dropdownRef = useRef<HTMLDivElement>(null);

// // //   const handleVariantChange = (variant: ProductVariant) => {
// // //     setSelectedVariant(variant);
// // //     setIsDropdownOpen(false);
// // //   };

// // //   // --- Auto-close Dropdown Handlers ---
// // //   useEffect(() => {
// // //     // 1. Close on Scroll
// // //     const handleScroll = () => {
// // //       if (isDropdownOpen) setIsDropdownOpen(false);
// // //     };

// // //     // 2. Close on Click Outside
// // //     const handleClickOutside = (event: MouseEvent) => {
// // //       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
// // //         setIsDropdownOpen(false);
// // //       }
// // //     };

// // //     if (isDropdownOpen) {
// // //       window.addEventListener('scroll', handleScroll, true); // Capture phase for scroll
// // //       document.addEventListener('mousedown', handleClickOutside);
// // //     }

// // //     return () => {
// // //       window.removeEventListener('scroll', handleScroll, true);
// // //       document.removeEventListener('mousedown', handleClickOutside);
// // //     };
// // //   }, [isDropdownOpen]);

// // //   return (
// // //     // Updated border color to #E0E2E7
// // //     <div className="relative w-[240px] h-[348px] bg-white border border-[#E0E2E7] rounded-xl hover:shadow-lg transition-shadow font-jakarta group shrink-0">
      
// // //       {/* Image */}
// // //       <div className="absolute top-[42px] left-0 w-full flex justify-center">
// // //         <div className="w-[77px] h-[104px]">
// // //           <img 
// // //             src={product.image_url} 
// // //             alt={product.product_name} 
// // //             className="w-full h-full object-contain"
// // //             onError={(e) => {
// // //               (e.target as HTMLImageElement).src = 'https://placehold.co/77x104?text=No+Image'; 
// // //             }}
// // //           />
// // //         </div>
// // //       </div>

// // //       {/* Product Name */}
// // //       <div 
// // //         className="absolute top-[176px] left-[24px] w-[177px] h-[20px] text-[16px] font-semibold leading-[100%] tracking-[0.01em] text-gray-900 truncate"
// // //         title={product.product_name}
// // //       >
// // //         {product.product_name}
// // //       </div>

// // //       {/* Brand Name */}
// // //       <div 
// // //         className="absolute top-[204px] left-[24px] w-[64px] h-[18px] text-[14px] font-medium leading-[100%] text-[#4D4D4D]"
// // //       >
// // //         {product.brand_name}
// // //       </div>

// // //       {/* Price (Discounted) */}
// // //       <div 
// // //         className="absolute top-[242px] left-[24px] h-[25px] text-[20px] font-semibold leading-[100%] tracking-[0.01em] text-[#003C22]"
// // //       >
// // //         ₹{Math.round(selectedVariant.discounted_price)}
// // //       </div>

// // //       {/* Original Price (Only show if different) */}
// // //       {selectedVariant.price > selectedVariant.discounted_price && (
// // //         <div 
// // //           className="absolute top-[246px] left-[90px] h-[18px] text-[14px] font-medium leading-[100%] tracking-[0.01em] text-black/70 line-through"
// // //         >
// // //           ₹{Math.round(selectedVariant.price)}
// // //         </div>
// // //       )}

// // //       {/* Variant Dropdown */}
// // //       <div 
// // //         className="absolute top-[287px] left-[24px] z-10"
// // //         ref={dropdownRef} // Attached ref here to detect outside clicks
// // //       >
// // //         <button 
// // //           onClick={() => setIsDropdownOpen(!isDropdownOpen)}
// // //           className="w-[137px] h-[36px] border border-[#003C22] rounded-[20px] flex items-center justify-between px-[12px] py-[8px] bg-white opacity-90 hover:opacity-100 transition-opacity"
// // //         >
// // //           {/* Display Text (Styled: 15px, SemiBold, 1% spacing) */}
// // //           <span 
// // //             className="text-emerald-900 truncate font-jakarta"
// // //             style={{
// // //               fontSize: '15px',
// // //               fontWeight: 600, // SemiBold
// // //               lineHeight: '100%',
// // //               letterSpacing: '0.01em' // 1%
// // //             }}
// // //           >
// // //             {selectedVariant.size} {selectedVariant.uom}
// // //           </span>
// // //           <ChevronDown size={14} className="text-emerald-900 shrink-0" />
// // //         </button>

// // //         {/* Dropdown Menu Items */}
// // //         {isDropdownOpen && (
// // //           <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-[150px] overflow-y-auto">
// // //             {product.variants.map((variant) => (
// // //               <div 
// // //                 key={variant.product_variant_id}
// // //                 onClick={() => handleVariantChange(variant)}
// // //                 className="px-3 py-2 text-[12px] hover:bg-gray-50 cursor-pointer text-gray-700 font-jakarta"
// // //               >
// // //                 {variant.size} {variant.uom} - ₹{Math.round(variant.discounted_price)}
// // //               </div>
// // //             ))}
// // //           </div>
// // //         )}
// // //       </div>

// // //       {/* Buy Button */}
// // //       <button 
// // //         className="absolute top-[287px] left-[165px] w-[51px] h-[36px] bg-[#003C22] border border-[#003C22] rounded-[12px] flex items-center justify-center hover:bg-emerald-800 transition-colors z-0"
// // //       >
// // //         <span className="text-white text-[14px] font-medium">Buy</span>
// // //       </button>
// // //     </div>
// // //   );
// // // };

// // // export default ProductCard;

// // // 'use client';

// // // import React, { useState, useEffect, useRef } from 'react';
// // // import { ChevronDown, ShoppingBag } from 'lucide-react';
// // // // import Link from 'next/link'; // NOTE: Uncomment this in your local project
// // // import { Product, ProductVariant } from '@/types';

// // // interface ProductCardProps {
// // //   product: Product;
// // // }

// // // const ProductCard = ({ product }: ProductCardProps) => {
// // //   // Default to the first variant
// // //   const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
// // //   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
// // //   // Ref to detect clicks outside the dropdown
// // //   const dropdownRef = useRef<HTMLDivElement>(null);

// // //   const handleVariantChange = (variant: ProductVariant) => {
// // //     setSelectedVariant(variant);
// // //     setIsDropdownOpen(false);
// // //   };

// // //   // --- Auto-close Dropdown Handlers ---
// // //   useEffect(() => {
// // //     const handleScroll = () => {
// // //       if (isDropdownOpen) setIsDropdownOpen(false);
// // //     };

// // //     const handleClickOutside = (event: MouseEvent) => {
// // //       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
// // //         setIsDropdownOpen(false);
// // //       }
// // //     };

// // //     if (isDropdownOpen) {
// // //       window.addEventListener('scroll', handleScroll, true); 
// // //       document.addEventListener('mousedown', handleClickOutside);
// // //     }

// // //     return () => {
// // //       window.removeEventListener('scroll', handleScroll, true);
// // //       document.removeEventListener('mousedown', handleClickOutside);
// // //     };
// // //   }, [isDropdownOpen]);

// // //   return (
// // //     <div className="relative w-[240px] h-[348px] bg-white border border-[#E0E2E7] rounded-xl hover:shadow-lg transition-shadow font-jakarta group shrink-0">
      
// // //       {/* Image - Wrapped in Link (Using <a> for preview compatibility) */}
// // //       {/* In Production: Use <Link href={`/shop/${product.product_id}`}> ... </Link> */}
// // //       <a href={`/shop/${product.product_id}`} className="absolute top-[42px] left-0 w-full flex justify-center cursor-pointer">
// // //         <div className="w-[77px] h-[104px]">
// // //           <img 
// // //             src={product.image_url} 
// // //             alt={product.product_name} 
// // //             className="w-full h-full object-contain"
// // //             onError={(e) => {
// // //               (e.target as HTMLImageElement).src = 'https://placehold.co/77x104?text=No+Image'; 
// // //             }}
// // //           />
// // //         </div>
// // //       </a>

// // //       {/* Product Name - Wrapped in Link */}
// // //       <a href={`/shop/${product.product_id}`} className="absolute top-[176px] left-[24px] w-[177px] h-[20px] text-[16px] font-semibold leading-[100%] tracking-[0.01em] text-gray-900 truncate hover:text-emerald-700 transition-colors cursor-pointer" title={product.product_name}>
// // //         {product.product_name}
// // //       </a>

// // //       {/* Brand Name */}
// // //       <div 
// // //         className="absolute top-[204px] left-[24px] w-[64px] h-[18px] text-[14px] font-medium leading-[100%] text-[#4D4D4D]"
// // //       >
// // //         {product.brand_name}
// // //       </div>

// // //       {/* Price (Discounted) */}
// // //       <div 
// // //         className="absolute top-[242px] left-[24px] h-[25px] text-[20px] font-semibold leading-[100%] tracking-[0.01em] text-[#003C22]"
// // //       >
// // //         ₹{Math.round(selectedVariant.discounted_price)}
// // //       </div>

// // //       {/* Original Price (Only show if different) */}
// // //       {selectedVariant.price > selectedVariant.discounted_price && (
// // //         <div 
// // //           className="absolute top-[246px] left-[90px] h-[18px] text-[14px] font-medium leading-[100%] tracking-[0.01em] text-black/70 line-through"
// // //         >
// // //           ₹{Math.round(selectedVariant.price)}
// // //         </div>
// // //       )}

// // //       {/* Variant Dropdown */}
// // //       <div 
// // //         className="absolute top-[287px] left-[24px] z-10"
// // //         ref={dropdownRef}
// // //       >
// // //         <button 
// // //           onClick={(e) => {
// // //             e.preventDefault(); // Prevent navigating if clicking dropdown
// // //             setIsDropdownOpen(!isDropdownOpen);
// // //           }}
// // //           className="w-[137px] h-[36px] border border-[#003C22] rounded-[20px] flex items-center justify-between px-[12px] py-[8px] bg-white opacity-90 hover:opacity-100 transition-opacity"
// // //         >
// // //           <span 
// // //             className="text-emerald-900 truncate font-jakarta"
// // //             style={{
// // //               fontSize: '15px',
// // //               fontWeight: 600, 
// // //               lineHeight: '100%',
// // //               letterSpacing: '0.01em' 
// // //             }}
// // //           >
// // //             {selectedVariant.size} {selectedVariant.uom}
// // //           </span>
// // //           <ChevronDown size={14} className="text-emerald-900 shrink-0" />
// // //         </button>

// // //         {isDropdownOpen && (
// // //           <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-[150px] overflow-y-auto">
// // //             {product.variants.map((variant) => (
// // //               <div 
// // //                 key={variant.product_variant_id}
// // //                 onClick={(e) => {
// // //                   e.preventDefault(); // Prevent navigation
// // //                   handleVariantChange(variant);
// // //                 }}
// // //                 className="px-3 py-2 text-[12px] hover:bg-gray-50 cursor-pointer text-gray-700 font-jakarta"
// // //               >
// // //                 {variant.size} {variant.uom} - ₹{Math.round(variant.discounted_price)}
// // //               </div>
// // //             ))}
// // //           </div>
// // //         )}
// // //       </div>

// // //       {/* Buy Button */}
// // //       <button 
// // //         onClick={(e) => {
// // //           e.preventDefault(); // Prevent navigation when clicking Buy
// // //           // Add to cart logic here
// // //         }}
// // //         className="absolute top-[287px] left-[165px] w-[51px] h-[36px] bg-[#003C22] border border-[#003C22] rounded-[12px] flex items-center justify-center hover:bg-emerald-800 transition-colors z-0"
// // //       >
// // //         <span className="text-white text-[14px] font-medium">Buy</span>
// // //       </button>
// // //     </div>
// // //   );
// // // };

// // // export default ProductCard;

// // // 'use client';

// // // import React, { useState, useEffect, useRef } from 'react';
// // // import { ChevronDown, ShoppingBag } from 'lucide-react';
// // // // import Link from 'next/link'; 
// // // import { Product, ProductVariant } from '@/types';
// // // import { useCart } from '@/context/CartContext';

// // // interface ProductCardProps {
// // //   product: Product;
// // // }

// // // const ProductCard = ({ product }: ProductCardProps) => {
// // //   const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
// // //   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
// // //   const dropdownRef = useRef<HTMLDivElement>(null);
// // //   const { addToCart, isAddingToCart } = useCart();

// // //   const handleVariantChange = (variant: ProductVariant) => {
// // //     setSelectedVariant(variant);
// // //     setIsDropdownOpen(false);
// // //   };

// // //   // --- Auto-close Dropdown Handlers ---
// // //   useEffect(() => {
// // //     const handleScroll = () => { if (isDropdownOpen) setIsDropdownOpen(false); };
// // //     const handleClickOutside = (event: MouseEvent) => {
// // //       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
// // //         setIsDropdownOpen(false);
// // //       }
// // //     };

// // //     if (isDropdownOpen) {
// // //       window.addEventListener('scroll', handleScroll, true); 
// // //       document.addEventListener('mousedown', handleClickOutside);
// // //     }
// // //     return () => {
// // //       window.removeEventListener('scroll', handleScroll, true);
// // //       document.removeEventListener('mousedown', handleClickOutside);
// // //     };
// // //   }, [isDropdownOpen]);

// // //   return (
// // //     // UPDATED CONTAINER:
// // //     // Mobile: h-[254px], w-full (controlled by grid), padding scaled down
// // //     // Desktop: md:h-[348px], md:w-[240px], specific pixel layout preserved via flex structure
// // //     <div className="
// // //       group relative flex flex-col bg-white border border-[#E0E2E7] rounded-[12px] hover:shadow-lg transition-shadow font-jakarta shrink-0 overflow-visible
// // //       w-full h-[254px]
// // //       md:w-[240px] md:h-[348px]
// // //     ">
      
// // //       {/* 1. Image Section (Flexible Height) */}
// // //       <a href={`/shop/${product.product_id}`} className="relative w-full flex justify-center items-center pt-4 md:pt-[42px] pb-2 md:pb-0 cursor-pointer grow">
// // //         <div className="w-[60px] h-[80px] md:w-[77px] md:h-[104px] relative transition-transform duration-300 group-hover:scale-105">
// // //           <img 
// // //             src={product.image_url} 
// // //             alt={product.product_name} 
// // //             className="w-full h-full object-contain"
// // //             onError={(e) => {
// // //               (e.target as HTMLImageElement).src = 'https://placehold.co/77x104?text=No+Image'; 
// // //             }}
// // //           />
// // //         </div>
// // //       </a>

// // //       {/* 2. Content Section (Padding adjusted for mobile) */}
// // //       <div className="flex flex-col px-3 md:px-[24px] w-full">
        
// // //         {/* Product Name */}
// // //         <a 
// // //           href={`/shop/${product.product_id}`} 
// // //           className="w-full text-[14px] md:text-[16px] font-semibold leading-[120%] md:leading-[100%] tracking-[0.01em] text-gray-900 truncate hover:text-emerald-700 transition-colors cursor-pointer mb-1 md:mb-[8px]" 
// // //           title={product.product_name}
// // //         >
// // //           {product.product_name}
// // //         </a>

// // //         {/* Brand Name */}
// // //         <div className="text-[12px] md:text-[14px] font-medium leading-[100%] text-[#4D4D4D] mb-2 md:mb-[20px]">
// // //           {product.brand_name}
// // //         </div>

// // //         {/* Price Area */}
// // //         <div className="flex items-baseline gap-2 mb-3 md:mb-[20px]">
// // //           <span className="text-[16px] md:text-[20px] font-semibold leading-[100%] tracking-[0.01em] text-[#003C22]">
// // //             ₹{Math.round(selectedVariant.discounted_price)}
// // //           </span>
// // //           {selectedVariant.price > selectedVariant.discounted_price && (
// // //             <span className="text-[12px] md:text-[14px] font-medium leading-[100%] tracking-[0.01em] text-black/70 line-through">
// // //               ₹{Math.round(selectedVariant.price)}
// // //             </span>
// // //           )}
// // //         </div>

// // //       </div>

// // //       {/* 3. Actions Section (Sticks to bottom) */}
// // //       <div className="px-3 md:px-[24px] pb-3 md:pb-[24px] mt-auto w-full flex items-center justify-between gap-2">
        
// // //         {/* Variant Dropdown */}
// // //         <div className="relative z-20 w-full" ref={dropdownRef}>
// // //           <button 
// // //             onClick={(e) => {
// // //               e.preventDefault();
// // //               setIsDropdownOpen(!isDropdownOpen);
// // //             }}
// // //             className="
// // //               w-full h-[32px] md:h-[36px] 
// // //               border border-[#003C22] rounded-[20px] flex items-center justify-between 
// // //               px-2 md:px-[12px] py-[8px] bg-white opacity-90 hover:opacity-100 transition-opacity
// // //             "
// // //           >
// // //             <span className="text-[10px] md:text-[12px] font-medium text-emerald-900 truncate max-w-[80px] md:max-w-[90px]">
// // //               {selectedVariant.size} {selectedVariant.uom}
// // //             </span>
// // //             <ChevronDown size={14} className="text-emerald-900 shrink-0" />
// // //           </button>

// // //           {isDropdownOpen && (
// // //             <div className="absolute bottom-full left-0 mb-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-[150px] overflow-y-auto z-30">
// // //               {product.variants.map((variant) => (
// // //                 <div 
// // //                   key={variant.product_variant_id}
// // //                   onClick={(e) => {
// // //                     e.preventDefault(); 
// // //                     handleVariantChange(variant);
// // //                   }}
// // //                   className="px-3 py-2 text-[10px] md:text-[12px] hover:bg-gray-50 cursor-pointer text-gray-700 font-jakarta border-b border-gray-50 last:border-0"
// // //                 >
// // //                   {variant.size} {variant.uom} - ₹{Math.round(variant.discounted_price)}
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           )}
// // //         </div>

// // //         {/* Buy Button */}
// // //         <button 
// // //           onClick={() => addToCart(product.variants[0].product_variant_id, 1)}
   
// // //           className="{isAddingToCart ? 'Adding...' : 'Add to Bag'}
// // //             h-[32px] md:h-[36px] px-3 md:px-0 md:w-[51px] 
// // //             bg-[#003C22] border border-[#003C22] rounded-[12px] 
// // //             flex items-center justify-center hover:bg-emerald-800 transition-colors z-10 shrink-0
// // //           "
        
// // //         >
          
// // //           <span className="text-white text-[12px] md:text-[14px] font-medium">Buy</span>
// // //         </button>

// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default ProductCard;
// // 'use client';

// // import React, { useState, useEffect, useRef } from 'react';
// // import { ChevronDown } from 'lucide-react';
// // import { Product, ProductVariant } from '@/types';
// // import { useCart } from '@/context/CartContext'; 

// // interface ProductCardProps {
// //   product: Product;
// // }

// // const ProductCard = ({ product }: ProductCardProps) => {
// //   const { addToCart } = useCart();
  
// //   // --- Initialization Logic ---
// //   // We trust the backend to tell us which variant to show first via 'product.product_variant_id'
// //   const getInitialVariant = (): ProductVariant => {
// //     if (product.variants && product.variants.length > 0) {
// //       // Try to find the specific variant dictated by the backend (e.g. based on filter)
// //       const displayVariant = product.variants.find(v => v.product_variant_id === product.product_variant_id);
      
// //       // Fallback to the first one if not found
// //       return displayVariant || product.variants[0];
// //     }
    
// //     // Fallback structure if variants array is empty (should not happen based on your data)
// //     return {
// //       product_variant_id: product.product_variant_id,
// //       size: product.size,
// //       uom: product.uom,
// //       price: product.price,
// //       discount: product.discount,
// //       discounted_price: product.discounted_price
// //     };
// //   };

// //   const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(() => getInitialVariant());
// //   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
// //   const [isLoading, setIsLoading] = useState(false);
  
// //   const dropdownRef = useRef<HTMLDivElement>(null);

// //   // Update selected variant if the product prop changes (e.g., re-fetch)
// //   useEffect(() => {
// //     setSelectedVariant(getInitialVariant());
// //   }, [product]); 

// //   const handleVariantChange = (variant: ProductVariant) => {
// //     setSelectedVariant(variant);
// //     setIsDropdownOpen(false);
// //   };

// //   const handleAddToCart = async (e: React.MouseEvent) => {
// //     e.preventDefault(); 
// //     e.stopPropagation();

// //     try {
// //       setIsLoading(true);
// //       await addToCart(selectedVariant.product_variant_id, 1); 
// //     } catch (error) {
// //       console.error("Failed to add to cart", error);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     const handleScroll = () => { if (isDropdownOpen) setIsDropdownOpen(false); };
// //     const handleClickOutside = (event: MouseEvent) => {
// //       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
// //         setIsDropdownOpen(false);
// //       }
// //     };

// //     if (isDropdownOpen) {
// //       window.addEventListener('scroll', handleScroll, true); 
// //       document.addEventListener('mousedown', handleClickOutside);
// //     }
// //     return () => {
// //       window.removeEventListener('scroll', handleScroll, true);
// //       document.removeEventListener('mousedown', handleClickOutside);
// //     };
// //   }, [isDropdownOpen]);

// //   return (
// //     <div className="
// //       group relative flex flex-col bg-white border border-[#E0E2E7] rounded-[12px] hover:shadow-lg transition-shadow font-jakarta shrink-0 overflow-visible
// //       w-full h-[254px]
// //       md:w-[240px] md:h-[348px]
// //     ">
      
// //       {/* Image Section */}
// //       <a href={`/shop/${product.product_id}`} className="relative w-full flex justify-center items-center pt-4 md:pt-[42px] pb-2 md:pb-0 cursor-pointer grow">
// //         <div className="w-[60px] h-[80px] md:w-[77px] md:h-[104px] relative transition-transform duration-300 group-hover:scale-105">
// //           <img 
// //             src={product.image_url} 
// //             alt={product.product_name} 
// //             className="w-full h-full object-contain"
// //             onError={(e) => {
// //               (e.target as HTMLImageElement).src = 'https://placehold.co/77x104?text=No+Image'; 
// //             }}
// //           />
// //         </div>
// //       </a>

// //       {/* Content Section */}
// //       <div className="flex flex-col px-3 md:px-[24px] w-full">
// //         <a 
// //           href={`/shop/${product.product_id}`} 
// //           className="w-full text-[14px] md:text-[16px] font-semibold leading-[120%] md:leading-[100%] tracking-[0.01em] text-gray-900 truncate hover:text-emerald-700 transition-colors cursor-pointer mb-1 md:mb-[8px]" 
// //           title={product.product_name}
// //         >
// //           {product.product_name}
// //         </a>

// //         <div className="text-[12px] md:text-[14px] font-medium leading-[100%] text-[#4D4D4D] mb-2 md:mb-[20px]">
// //           {product.brand_name}
// //         </div>

// //         <div className="flex items-baseline gap-2 mb-3 md:mb-[20px]">
// //           <span className="text-[16px] md:text-[20px] font-semibold leading-[100%] tracking-[0.01em] text-[#003C22]">
// //             ₹{Math.round(selectedVariant.discounted_price)}
// //           </span>
// //           {selectedVariant.price > selectedVariant.discounted_price && (
// //             <span className="text-[12px] md:text-[14px] font-medium leading-[100%] tracking-[0.01em] text-black/70 line-through">
// //               ₹{Math.round(selectedVariant.price)}
// //             </span>
// //           )}
// //         </div>
// //       </div>

// //       {/* Actions Section */}
// //       <div className="px-3 md:px-[24px] pb-3 md:pb-[24px] mt-auto w-full flex items-center justify-between gap-2">
        
// //         {/* Variant Dropdown */}
// //         <div className="relative z-20 w-full" ref={dropdownRef}>
// //           <button 
// //             onClick={(e) => {
// //               e.preventDefault();
// //               setIsDropdownOpen(!isDropdownOpen);
// //             }}
// //             className="
// //               w-full h-[32px] md:h-[36px] 
// //               border border-[#003C22] rounded-[20px] flex items-center justify-between 
// //               px-2 md:px-[12px] py-[8px] bg-white opacity-90 hover:opacity-100 transition-opacity
// //             "
// //           >
// //             <span className="text-[10px] md:text-[12px] font-medium text-emerald-900 truncate max-w-[80px] md:max-w-[90px]">
// //               {selectedVariant.size} {selectedVariant.uom}
// //             </span>
// //             <ChevronDown size={14} className="text-emerald-900 shrink-0" />
// //           </button>

// //           {isDropdownOpen && (
// //             <div className="absolute bottom-full left-0 mb-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-[150px] overflow-y-auto z-30">
// //               {product.variants.map((variant) => (
// //                 <div 
// //                   key={variant.product_variant_id}
// //                   onClick={(e) => {
// //                     e.preventDefault(); 
// //                     handleVariantChange(variant);
// //                   }}
// //                   className="px-3 py-2 text-[10px] md:text-[12px] hover:bg-gray-50 cursor-pointer text-gray-700 font-jakarta border-b border-gray-50 last:border-0"
// //                 >
// //                   {variant.size} {variant.uom} - ₹{Math.round(variant.discounted_price)}
// //                 </div>
// //               ))}
// //             </div>
// //           )}
// //         </div>

// //         {/* Buy Button */}
// //         <button 
// //           onClick={handleAddToCart}
// //           disabled={isLoading}
// //           className="
// //             h-[32px] md:h-[36px] px-3 md:px-0 md:w-[51px] 
// //             bg-[#003C22] border border-[#003C22] rounded-[12px] 
// //             flex items-center justify-center hover:bg-emerald-800 transition-colors z-10 shrink-0
// //             disabled:bg-emerald-900 disabled:cursor-not-allowed
// //           "
// //         >
// //           <span className="text-white text-[12px] md:text-[14px] font-medium">
// //             {isLoading ? '...' : 'Buy'}
// //           </span>
// //         </button>

// //       </div>
// //     </div>
// //   );
// // };

// // export default ProductCard;

// // 'use client';

// // import React, { useState, useEffect, useRef } from 'react';
// // import { ChevronDown } from 'lucide-react';
// // import { Product, ProductVariant } from '@/types';
// // import { useCart } from '@/context/CartContext'; 

// // interface ProductCardProps {
// //   product: Product;
// // }

// // const ProductCard = ({ product }: ProductCardProps) => {
// //   const { addToCart } = useCart();
  
// //   // --- Initialization Logic ---
// //   const getInitialVariant = (): ProductVariant => {
// //     if (product.variants && product.variants.length > 0) {
// //       const displayVariant = product.variants.find(v => v.product_variant_id === product.product_variant_id);
// //       return displayVariant || product.variants[0];
// //     }
// //     return {
// //       product_variant_id: product.product_variant_id,
// //       size: product.size,
// //       uom: product.uom,
// //       price: product.price,
// //       discount: product.discount,
// //       discounted_price: product.discounted_price
// //     };
// //   };

// //   const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(() => getInitialVariant());
// //   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
// //   const [isLoading, setIsLoading] = useState(false);
  
// //   const dropdownRef = useRef<HTMLDivElement>(null);

// //   useEffect(() => {
// //     setSelectedVariant(getInitialVariant());
// //   }, [product]); 

// //   const handleVariantChange = (variant: ProductVariant) => {
// //     setSelectedVariant(variant);
// //     setIsDropdownOpen(false);
// //   };

// //   const handleAddToCart = async (e: React.MouseEvent) => {
// //     e.preventDefault(); 
// //     e.stopPropagation();

// //     try {
// //       setIsLoading(true);
// //       await addToCart(selectedVariant.product_variant_id, 1); 
// //     } catch (error) {
// //       console.error("Failed to add to cart", error);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     const handleScroll = () => { if (isDropdownOpen) setIsDropdownOpen(false); };
// //     const handleClickOutside = (event: MouseEvent) => {
// //       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
// //         setIsDropdownOpen(false);
// //       }
// //     };

// //     if (isDropdownOpen) {
// //       window.addEventListener('scroll', handleScroll, true); 
// //       document.addEventListener('mousedown', handleClickOutside);
// //     }
// //     return () => {
// //       window.removeEventListener('scroll', handleScroll, true);
// //       document.removeEventListener('mousedown', handleClickOutside);
// //     };
// //   }, [isDropdownOpen]);

// //   return (
// //     <div className="
// //       group relative flex flex-col bg-white border border-[#E0E2E7] rounded-[12px] hover:shadow-lg transition-shadow font-jakarta shrink-0 overflow-visible
// //       w-full h-[254px]
// //       md:w-[240px] md:h-[348px]
// //     ">
      
// //       {/* Image Section */}
// //       {/* [!code changed] Updated top position to 36px (centered) */}
// //       <a href={`/shop/${product.product_id}`} className="absolute md:top-[36px] top-4 left-0 w-full flex justify-center items-center cursor-pointer z-0">
// //         <div className="w-[60px] h-[80px] md:w-[77px] md:h-[104px] relative transition-transform duration-300 group-hover:scale-105">
// //           <img 
// //             src={product.image_url} 
// //             alt={product.product_name} 
// //             className="w-full h-full object-contain"
// //             onError={(e) => {
// //               (e.target as HTMLImageElement).src = 'https://placehold.co/77x104?text=No+Image'; 
// //             }}
// //           />
// //         </div>
// //       </a>

// //       {/* Content Section (Pushed down by top padding or absolute positioning) */}
// //       {/* Note: On desktop, we use absolute positioning for text elements to match your Figma specs exactly. */}
      
// //       {/* Product Name */}
// //       <a 
// //         href={`/shop/${product.product_id}`} 
// //         className="
// //           absolute left-[12px] top-[110px] w-[calc(100%-24px)]
// //           md:left-[24px] md:top-[176px] md:w-[177px]
// //           text-[14px] md:text-[16px] font-semibold leading-[120%] md:leading-[100%] tracking-[0.01em] text-gray-900 truncate hover:text-emerald-700 transition-colors cursor-pointer
// //         " 
// //         title={product.product_name}
// //       >
// //         {product.product_name}
// //       </a>

// //       {/* Brand Name */}
// //       <div className="
// //         absolute left-[12px] top-[132px]
// //         md:left-[24px] md:top-[204px]
// //         text-[12px] md:text-[14px] font-medium leading-[100%] text-[#4D4D4D]
// //       ">
// //         {product.brand_name}
// //       </div>

// //       {/* Price Area */}
// //       <div className="absolute left-[12px] top-[154px] md:left-[24px] md:top-[242px] flex items-baseline gap-2">
// //         <span className="text-[16px] md:text-[20px] font-semibold leading-[100%] tracking-[0.01em] text-[#003C22]">
// //           ₹{Math.round(selectedVariant.discounted_price)}
// //         </span>
// //         {selectedVariant.price > selectedVariant.discounted_price && (
// //           <span className="text-[12px] md:text-[14px] font-medium leading-[100%] tracking-[0.01em] text-black/70 line-through">
// //             ₹{Math.round(selectedVariant.price)}
// //           </span>
// //         )}
// //       </div>

// //       {/* Actions Section */}
// //       {/* Variant Dropdown */}
// //       <div 
// //         className="absolute left-[12px] top-[190px] md:left-[24px] md:top-[287px] z-20"
// //         ref={dropdownRef}
// //       >
// //         <button 
// //           onClick={(e) => {
// //             e.preventDefault();
// //             setIsDropdownOpen(!isDropdownOpen);
// //           }}
// //           className="
// //             w-[100px] h-[32px] md:w-[137px] md:h-[36px] 
// //             border border-[#003C22] rounded-[20px] flex items-center justify-between 
// //             px-2 md:px-[12px] py-[8px] bg-white opacity-90 hover:opacity-100 transition-opacity
// //           "
// //         >
// //           <span className="text-[10px] md:text-[12px] font-medium text-emerald-900 truncate max-w-[70px] md:max-w-[90px]">
// //             {selectedVariant.size} {selectedVariant.uom}
// //           </span>
// //           <ChevronDown size={14} className="text-emerald-900 shrink-0" />
// //         </button>

// //         {isDropdownOpen && (
// //           <div className="absolute bottom-full left-0 mb-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-[150px] overflow-y-auto z-30">
// //             {product.variants.map((variant) => (
// //               <div 
// //                 key={variant.product_variant_id}
// //                 onClick={(e) => {
// //                   e.preventDefault(); 
// //                   handleVariantChange(variant);
// //                 }}
// //                 className="px-3 py-2 text-[10px] md:text-[12px] hover:bg-gray-50 cursor-pointer text-gray-700 font-jakarta border-b border-gray-50 last:border-0"
// //               >
// //                 {variant.size} {variant.uom} - ₹{Math.round(variant.discounted_price)}
// //               </div>
// //             ))}
// //           </div>
// //         )}
// //       </div>

// //       {/* Buy Button */}
// //       <button 
// //         onClick={handleAddToCart}
// //         disabled={isLoading}
// //         className="
// //           absolute right-[12px] top-[190px] md:left-[165px] md:top-[287px]
// //           w-[60px] h-[32px] md:w-[51px] md:h-[36px] 
// //           bg-[#003C22] border border-[#003C22] rounded-[12px] 
// //           flex items-center justify-center hover:bg-emerald-800 transition-colors z-10 shrink-0
// //           disabled:bg-emerald-900 disabled:cursor-not-allowed
// //         "
// //       >
// //         <span className="text-white text-[12px] md:text-[14px] font-medium">
// //           {isLoading ? '...' : 'Buy'}
// //         </span>
// //       </button>

// //     </div>
// //   );
// // };

// // export default ProductCard;
// 'use client';

// import React, { useState, useEffect, useRef } from 'react';
// import { ChevronDown } from 'lucide-react';
// import { Product, ProductVariant } from '@/types';
// import { useCart } from '@/context/CartContext';

// interface ProductCardProps {
//   product: Product;
// }

// const ProductCard = ({ product }: ProductCardProps) => {
//   const { addToCart } = useCart();

//   // --- Initialization Logic (From New Code) ---
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
//       await addToCart(selectedVariant.product_variant_id, 1);
//     } catch (error) {
//       console.error("Failed to add to cart", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // --- Close Dropdown Handlers ---
//   useEffect(() => {
//     const handleScroll = () => { if (isDropdownOpen) setIsDropdownOpen(false); };
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsDropdownOpen(false);
//       }
//     };
//     if (isDropdownOpen) {
//       window.addEventListener('scroll', handleScroll, true);
//       document.addEventListener('mousedown', handleClickOutside);
//     }
//     return () => {
//       window.removeEventListener('scroll', handleScroll, true);
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isDropdownOpen]);

//   return (
//     // CONTAINER: Reverted to Flexbox (flex-col)
//     <div className="
//       group relative flex flex-col bg-white border border-[#E0E2E7] rounded-[12px] hover:shadow-lg transition-shadow font-jakarta shrink-0 overflow-visible
//       w-full h-[254px]
//       md:w-[240px] md:h-[348px]
//     ">

//       {/* 1. Image Section (Grow fills space, flex centers content) */}
//       <a href={`/shop/${product.product_id}`} className="relative w-full flex justify-center items-center pt-4 md:pt-[42px] pb-2 md:pb-0 cursor-pointer grow">
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
//       </a>

//       {/* 2. Content Section (Stacked vertically) */}
//       <div className="flex flex-col px-3 md:px-[24px] w-full">
        
//         {/* Product Name */}
//         <a
//           href={`/shop/${product.product_id}`}
//           className="w-full text-[14px] md:text-[16px] font-semibold leading-[120%] md:leading-[100%] tracking-[0.01em] text-gray-900 truncate hover:text-emerald-700 transition-colors cursor-pointer mb-1 md:mb-[8px]"
//           title={product.product_name}
//         >
//           {product.product_name}
//         </a>

//         {/* Brand Name */}
//         <div className="text-[12px] md:text-[14px] font-medium leading-[100%] text-[#4D4D4D] mb-2 md:mb-[20px]">
//           {product.brand_name}
//         </div>

//         {/* Price Area */}
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

//       {/* 3. Actions Section (Pushed to bottom using mt-auto) */}
//       <div className="px-3 md:px-[24px] pb-3 md:pb-[24px] mt-auto w-full flex items-center justify-between gap-2">
        
//         {/* Variant Dropdown */}
//         <div className="relative z-20 w-full" ref={dropdownRef}>
//           <button
//             onClick={(e) => {
//               e.preventDefault();
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
//             <div className="absolute bottom-full left-0 mb-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-[150px] overflow-y-auto z-30">
//               {product.variants.map((variant) => (
//                 <div
//                   key={variant.product_variant_id}
//                   onClick={(e) => {
//                     e.preventDefault();
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
//   );
// };

// export default ProductCard;
// 'use client';

// import React, { useState, useEffect, useRef } from 'react';
// import { ChevronDown } from 'lucide-react';
// import { Product, ProductVariant } from '@/types';
// import { useCart } from '@/context/CartContext';

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
//       await addToCart(selectedVariant.product_variant_id, 1);
//     } catch (error) {
//       console.error("Failed to add to cart", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // --- [!code changed] Smart Close Handlers (Matches FilterBar Logic) ---
//   useEffect(() => {
//     // 1. Handle Scroll
//     const handleScroll = (event: Event) => {
//       // If the scroll event happened INSIDE the dropdown container, ignore it.
//       if (dropdownRef.current && dropdownRef.current.contains(event.target as Node)) {
//         return; 
//       }
//       // Otherwise (scrolling the main page/body), close the dropdown.
//       if (isDropdownOpen) setIsDropdownOpen(false);
//     };

//     // 2. Handle Click Outside
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsDropdownOpen(false);
//       }
//     };

//     if (isDropdownOpen) {
//       // 'true' (useCapture) is required to catch scroll events which don't bubble
//       window.addEventListener('scroll', handleScroll, true);
//       document.addEventListener('mousedown', handleClickOutside);
//     }
    
//     return () => {
//       window.removeEventListener('scroll', handleScroll, true);
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isDropdownOpen]);

//   return (
//     <div className="
//       group relative flex flex-col bg-white border border-[#E0E2E7] rounded-[12px] hover:shadow-lg transition-shadow font-jakarta shrink-0 overflow-visible
//       w-full h-[254px]
//       md:w-[240px] md:h-[348px]
//     ">

//       {/* 1. Image Section */}
//       <a href={`/shop/${product.product_id}`} className="relative w-full flex justify-center items-center pt-4 md:pt-[42px] pb-2 md:pb-0 cursor-pointer grow">
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
//       </a>

//       {/* 2. Content Section */}
//       <div className="flex flex-col px-3 md:px-[24px] w-full">
        
//         {/* Product Name */}
//         <a
//           href={`/shop/${product.product_id}`}
//           className="w-full text-[14px] md:text-[16px] font-semibold leading-[120%] md:leading-[100%] tracking-[0.01em] text-gray-900 truncate hover:text-emerald-700 transition-colors cursor-pointer mb-1 md:mb-[8px]"
//           title={product.product_name}
//         >
//           {product.product_name}
//         </a>

//         {/* Brand Name */}
//         <div className="text-[12px] md:text-[14px] font-medium leading-[100%] text-[#4D4D4D] mb-2 md:mb-[20px]">
//           {product.brand_name}
//         </div>

//         {/* Price Area */}
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
//             <div className="absolute bottom-full left-0 mb-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-[150px] overflow-y-auto z-30">
//               {product.variants.map((variant) => (
//                 <div
//                   key={variant.product_variant_id}
//                   onClick={(e) => {
//                     e.preventDefault();
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
//   );
// };

// export default ProductCard;

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link'; // [!code ++] Import Link
import { Product, ProductVariant } from '@/types';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

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

  useEffect(() => {
    setSelectedVariant(getInitialVariant());
  }, [product]);

  const handleVariantChange = (variant: ProductVariant) => {
    setSelectedVariant(variant);
    setIsDropdownOpen(false);
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      setIsLoading(true);
      await addToCart(selectedVariant.product_variant_id, 1);
    } catch (error) {
      console.error("Failed to add to cart", error);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Smart Close Handlers (Matches FilterBar Logic) ---
  useEffect(() => {
    // 1. Handle Scroll
    const handleScroll = (event: Event) => {
      if (dropdownRef.current && dropdownRef.current.contains(event.target as Node)) {
        return; 
      }
      if (isDropdownOpen) setIsDropdownOpen(false);
    };

    // 2. Handle Click Outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      window.addEventListener('scroll', handleScroll, true);
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className="
      group relative flex flex-col bg-white border border-[#E0E2E7] rounded-[12px] hover:shadow-lg transition-shadow font-jakarta shrink-0 overflow-visible
      w-full h-[254px]
      md:w-[240px] md:h-[348px]
    ">

      {/* 1. Image Section - CHANGED to Link */}
      <Link 
        href={`/shop/${product.product_id}`} 
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
      </Link>

      {/* 2. Content Section */}
      <div className="flex flex-col px-3 md:px-[24px] w-full">
        
        {/* Product Name - CHANGED to Link */}
        <Link
          href={`/shop/${product.product_id}`}
          className="w-full text-[14px] md:text-[16px] font-semibold leading-[120%] md:leading-[100%] tracking-[0.01em] text-gray-900 truncate hover:text-emerald-700 transition-colors cursor-pointer mb-1 md:mb-[8px]"
          title={product.product_name}
        >
          {product.product_name}
        </Link>

        {/* Brand Name */}
        <div className="text-[12px] md:text-[14px] font-medium leading-[100%] text-[#4D4D4D] mb-2 md:mb-[20px]">
          {product.brand_name}
        </div>

        {/* Price Area */}
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
        
        {/* Variant Dropdown */}
        <div className="relative z-20 w-full" ref={dropdownRef}>
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsDropdownOpen(!isDropdownOpen);
            }}
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
            <div className="absolute bottom-full left-0 mb-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-[150px] overflow-y-auto z-30">
              {product.variants.map((variant) => (
                <div
                  key={variant.product_variant_id}
                  onClick={(e) => {
                    e.preventDefault();
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

        {/* Buy Button */}
        <button
          onClick={handleAddToCart}
          disabled={isLoading}
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
        </button>

      </div>
    </div>
  );
};

export default ProductCard;