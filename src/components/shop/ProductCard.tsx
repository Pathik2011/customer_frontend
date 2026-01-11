

// // // 'use client';

// // // import React, { useState, useEffect, useRef } from 'react';
// // // import { ChevronDown } from 'lucide-react';
// // // import Link from 'next/link'; // [!code ++] Import Link
// // // import { Product, ProductVariant } from '@/types';
// // // import { useCart } from '@/context/CartContext';

// // // interface ProductCardProps {
// // //   product: Product;
// // // }

// // // const ProductCard = ({ product }: ProductCardProps) => {
// // //   const { addToCart } = useCart();

// // //   // --- Initialization Logic ---
// // //   const getInitialVariant = (): ProductVariant => {
// // //     if (product.variants && product.variants.length > 0) {
// // //       const displayVariant = product.variants.find(v => v.product_variant_id === product.product_variant_id);
// // //       return displayVariant || product.variants[0];
// // //     }
// // //     return {
// // //       product_variant_id: product.product_variant_id,
// // //       size: product.size,
// // //       uom: product.uom,
// // //       price: product.price,
// // //       discount: product.discount,
// // //       discounted_price: product.discounted_price
// // //     };
// // //   };

// // //   const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(() => getInitialVariant());
// // //   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
// // //   const [isLoading, setIsLoading] = useState(false);
// // //   const dropdownRef = useRef<HTMLDivElement>(null);

// // //   useEffect(() => {
// // //     setSelectedVariant(getInitialVariant());
// // //   }, [product]);

// // //   const handleVariantChange = (variant: ProductVariant) => {
// // //     setSelectedVariant(variant);
// // //     setIsDropdownOpen(false);
// // //   };

// // //   const handleAddToCart = async (e: React.MouseEvent) => {
// // //     e.preventDefault();
// // //     e.stopPropagation();
// // //     try {
// // //       setIsLoading(true);
// // //       await addToCart(selectedVariant.product_variant_id, 1);
// // //     } catch (error) {
// // //       console.error("Failed to add to cart", error);
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   // --- Smart Close Handlers (Matches FilterBar Logic) ---
// // //   useEffect(() => {
// // //     // 1. Handle Scroll
// // //     const handleScroll = (event: Event) => {
// // //       if (dropdownRef.current && dropdownRef.current.contains(event.target as Node)) {
// // //         return; 
// // //       }
// // //       if (isDropdownOpen) setIsDropdownOpen(false);
// // //     };

// // //     // 2. Handle Click Outside
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
// // //     <div className="
// // //       group relative flex flex-col bg-white border border-[#E0E2E7] rounded-[12px] hover:shadow-lg transition-shadow font-jakarta shrink-0 overflow-visible
// // //       w-full h-[254px]
// // //       md:w-[240px] md:h-[348px]
// // //     ">

// // //       {/* 1. Image Section - CHANGED to Link */}
// // //       <Link 
// // //         href={`/shop/${product.product_id}`} 
// // //         className="relative w-full flex justify-center items-center pt-4 md:pt-[42px] pb-2 md:pb-0 cursor-pointer grow"
// // //       >
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
// // //       </Link>

// // //       {/* 2. Content Section */}
// // //       <div className="flex flex-col px-3 md:px-[24px] w-full">
        
// // //         {/* Product Name - CHANGED to Link */}
// // //         <Link
// // //           href={`/shop/${product.product_id}`}
// // //           className="w-full text-[14px] md:text-[16px] font-semibold leading-[120%] md:leading-[100%] tracking-[0.01em] text-gray-900 truncate hover:text-emerald-700 transition-colors cursor-pointer mb-1 md:mb-[8px]"
// // //           title={product.product_name}
// // //         >
// // //           {product.product_name}
// // //         </Link>

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

// // //       {/* 3. Actions Section */}
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
// // //           onClick={handleAddToCart}
// // //           disabled={isLoading}
// // //           className="
// // //             h-[32px] md:h-[36px] px-3 md:px-0 md:w-[51px] 
// // //             bg-[#003C22] border border-[#003C22] rounded-[12px] 
// // //             flex items-center justify-center hover:bg-emerald-800 transition-colors z-10 shrink-0
// // //             disabled:bg-emerald-900 disabled:cursor-not-allowed
// // //           "
// // //         >
// // //           <span className="text-white text-[12px] md:text-[14px] font-medium">
// // //             {isLoading ? '...' : 'Buy'}
// // //           </span>
// // //         </button>

// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default ProductCard;
// // 'use client';

// // import React, { useState, useEffect, useRef } from 'react';
// // import { ChevronDown } from 'lucide-react';
// // import Link from 'next/link'; 
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
// //       await addToCart(
// //         selectedVariant.product_variant_id, 
// //         1,
// //         // [!code ++] Pass product details for the popup
// //         {
// //             name: product.product_name,
// //             image: product.image_url
// //         }
// //       );
// //     } catch (error) {
// //       console.error("Failed to add to cart", error);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   // --- Smart Close Handlers (Matches FilterBar Logic) ---
// //   // useEffect(() => {
// //   //   // 1. Handle Scroll
// //   //   const handleScroll = (event: Event) => {
// //   //     if (dropdownRef.current && dropdownRef.current.contains(event.target as Node)) {
// //   //       return; 
// //   //     }
// //   //     if (isDropdownOpen) setIsDropdownOpen(false);
// //   //   };

// //   //   // 2. Handle Click Outside
// //   //   const handleClickOutside = (event: MouseEvent) => {
// //   //     if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
// //   //       setIsDropdownOpen(false);
// //   //     }
// //   //   };

// //   //   if (isDropdownOpen) {
// //   //     window.addEventListener('scroll', handleScroll, true);
// //   //     document.addEventListener('mousedown', handleClickOutside);
// //   //   }
    
// //   //   return () => {
// //   //     window.removeEventListener('scroll', handleScroll, true);
// //   //     document.removeEventListener('mousedown', handleClickOutside);
// //   //   };
// //   // }, [isDropdownOpen]);
// //   // --- Smart Close Handlers ---
// //   // [DEBUG] Log whenever the dropdown state changes
// //   useEffect(() => {
// //     console.log(`[ProductCard] Dropdown state changed: ${isDropdownOpen ? 'OPEN' : 'CLOSED'} (Product: ${product.product_name})`);
// //   }, [isDropdownOpen, product.product_name]);


// //   // --- Smart Close Handlers ---
// //   useEffect(() => {
    
// //     const handleScroll = (event: Event) => {
// //       // [DEBUG] Log when scroll is detected
// //       console.log('[ProductCard] Scroll Detected!', {
// //         target: event.target,
// //         isInsideDropdown: dropdownRef.current && dropdownRef.current.contains(event.target as Node)
// //       });

// //       if (dropdownRef.current && dropdownRef.current.contains(event.target as Node)) {
// //         return; 
// //       }
      
// //       console.log('[ProductCard] Closing due to SCROLL event');
// //       if (isDropdownOpen) setIsDropdownOpen(false);
// //     };

// //     const handleClickOutside = (event: MouseEvent) => {
// //       // [DEBUG] Log when click outside is detected
// //       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
// //         console.log('[ProductCard] Closing due to CLICK OUTSIDE event');
// //         setIsDropdownOpen(false);
// //       }
// //     };

// //     if (isDropdownOpen) {
// //       console.log('[ProductCard] Adding listeners...');
// //       window.addEventListener('scroll', handleScroll, true); // true = capture
// //       document.addEventListener('mousedown', handleClickOutside);
// //     }
    
// //     return () => {
// //       console.log('[ProductCard] Removing listeners...');
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

// //       {/* 1. Image Section */}
// //       <Link 
// //         href={`/shop/${product.product_id}`} 
// //         className="relative w-full flex justify-center items-center pt-4 md:pt-[42px] pb-2 md:pb-0 cursor-pointer grow"
// //       >
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
// //       </Link>

// //       {/* 2. Content Section */}
// //       <div className="flex flex-col px-3 md:px-[24px] w-full">
        
// //         {/* Product Name */}
// //         <Link
// //           href={`/shop/${product.product_id}`}
// //           className="w-full text-[14px] md:text-[16px] font-semibold leading-[120%] md:leading-[100%] tracking-[0.01em] text-gray-900 truncate hover:text-emerald-700 transition-colors cursor-pointer mb-1 md:mb-[8px]"
// //           title={product.product_name}
// //         >
// //           {product.product_name}
// //         </Link>

// //         {/* Brand Name */}
// //         <div className="text-[12px] md:text-[14px] font-medium leading-[100%] text-[#4D4D4D] mb-2 md:mb-[20px]">
// //           {product.brand_name}
// //         </div>

// //         {/* Price Area */}
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

// //       {/* 3. Actions Section */}
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
// 'use client';

// import React, { useState, useEffect, useRef } from 'react';
// import { ChevronDown } from 'lucide-react';
// import Link from 'next/link';
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
  
//   // [!code highlight] Ref to track the vertical scroll position
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

//   // --- [!code highlight] FINAL FIX: Vertical Scroll Tracking ---
//   useEffect(() => {
//     // 1. Handle Scroll (User's Logic)
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;
      
//       // Only close if the PAGE scrolls vertically by more than 10px
//       // This ignores horizontal slider movement entirely!
//       if (Math.abs(currentScrollY - lastScrollY.current) > 10) {
//         setIsDropdownOpen(false);
//       }
      
//       lastScrollY.current = currentScrollY;
//     };

//     // 2. Handle Click Outside
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsDropdownOpen(false);
//       }
//     };

//     if (isDropdownOpen) {
//       // Capture current position immediately when opening
//       lastScrollY.current = window.scrollY;
      
//       // Note: We removed 'true' (capture phase). This means we ONLY listen to window scroll,
//       // not internal div scrolls. This alone fixes most issues!
//       window.addEventListener('scroll', handleScroll, { passive: true });
//       document.addEventListener('mousedown', handleClickOutside);
//     }
    
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
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
//             <div className="absolute bottom-full left-0 mb-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-[150px] overflow-y-auto z-30">
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
//   );
// };

// export default ProductCard;
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation'; // Use router for programmatic navigation
import { Product, ProductVariant } from '@/types';
import { useCart } from '@/context/CartContext';
// ✅ IMPORT ANIMATION
import AnimatedPress from '@/components/shared/AnimatedPress'; 

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter(); // Initialize router
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
  
  // Ref to track the vertical scroll position
  const lastScrollY = useRef(0);

  useEffect(() => {
    setSelectedVariant(getInitialVariant());
  }, [product]);

  const handleVariantChange = (variant: ProductVariant) => {
    setSelectedVariant(variant);
    setIsDropdownOpen(false);
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevents card click
    try {
      setIsLoading(true);
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

  // --- Vertical Scroll Tracking ---
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

  // ✅ New Handler for Card Click
  const handleCardClick = () => {
    router.push(`/shop/${product.product_id}`);
  };

  return (
    // ✅ WRAP ENTIRE CARD IN ANIMATED PRESS
    <AnimatedPress 
      onClick={handleCardClick} 
      className="w-full h-[254px] md:w-[240px] md:h-[348px]"
    >
      <div className="
        group relative flex flex-col bg-white border border-[#E0E2E7] rounded-[12px] hover:shadow-lg transition-shadow font-jakarta shrink-0 overflow-visible
        h-full w-full
      ">

        {/* 1. Image Section */}
        {/* Replaced Link with div since the whole card is now clickable via AnimatedPress */}
        <div className="relative w-full flex justify-center items-center pt-4 md:pt-[42px] pb-2 md:pb-0 grow">
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
        </div>

        {/* 2. Content Section */}
        <div className="flex flex-col px-3 md:px-[24px] w-full">
          
          <div
            className="w-full text-[14px] md:text-[16px] font-semibold leading-[120%] md:leading-[100%] tracking-[0.01em] text-gray-900 truncate hover:text-emerald-700 transition-colors mb-1 md:mb-[8px]"
            title={product.product_name}
          >
            {product.product_name}
          </div>

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
          
          {/* Variant Dropdown */}
          <div className="relative z-20 w-full" ref={dropdownRef}>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation(); // ✅ Crucial: Stops animation from firing on dropdown click
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
              <div 
                className="absolute bottom-full left-0 mb-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-[150px] overflow-y-auto z-30"
                onClick={(e) => e.stopPropagation()} // ✅ Stop propagation inside dropdown too
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
    </AnimatedPress>
  );
};

export default ProductCard;