// 'use client';
// import React, { useState } from 'react';
// import { X, ShoppingBag, Check, Loader2 } from 'lucide-react';
// import { ApiProduct, ApiProductVariant } from '@/types/homeApi';
// import { useCart } from '@/context/CartContext';

// interface FarmersPopupProps {
//   product: ApiProduct;
//   onClose: () => void;
// }

// const FarmersPopup = ({ product, onClose }: FarmersPopupProps) => {
//   const { addToCart } = useCart();
  
//   // State to track which specific item is currently being added (for loading spinner)
//   const [loadingId, setLoadingId] = useState<number | null>(null);
  
//   // State to track ALL items that have been successfully added in this session
//   const [addedIds, setAddedIds] = useState<number[]>([]);

//   const handleAddToCart = async (variant: ApiProductVariant) => {
//     // Prevent double clicking if already added or currently loading
//     if (loadingId || addedIds.includes(variant.product_variant_id)) return;

//     setLoadingId(variant.product_variant_id);
//     try {
//       await addToCart(variant.product_variant_id, 1);
      
//       // On success, add this ID to the "addedIds" array to persist the "Added" state
//       setAddedIds((prev) => [...prev, variant.product_variant_id]);
//     } catch (error) {
//       console.error("Failed to add to cart", error);
//     } finally {
//       setLoadingId(null);
//     }
//   };

//   const getPrices = (v: ApiProductVariant) => {
//     const sellingPrice = v.discounted_price && v.discounted_price > 0 ? v.discounted_price : v.price;
//     const mrp = v.price;
//     const hasDiscount = v.discounted_price && v.discounted_price < v.price;
//     return { sellingPrice, mrp, hasDiscount };
//   };

//   return (
//     <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 font-jakarta">
//       {/* Main Container */}
//       <div 
//         className="
//           relative bg-white shadow-2xl overflow-hidden rounded-2xl
//           w-[95%] max-w-[448px] h-[85vh] max-h-[600px] flex flex-col
//           md:block md:w-[448px] md:h-[575px] md:rounded-[16px]
//         "
//       >
//         {/* Close Button */}
//         <button 
//           onClick={onClose} 
//           className="absolute top-3 right-3 z-30 p-2 bg-white/80 rounded-full hover:bg-gray-100 transition-colors shadow-sm"
//         >
//           <X size={20} className="text-gray-600" />
//         </button>

//         {/* --- TOP SECTION: PRODUCT INFO --- */}
//         <div 
//           className="
//             bg-[#F3F3F5] shrink-0
//             w-full p-4 flex items-center gap-4
//             md:absolute md:p-0 md:block md:w-[432px] md:h-[160px] md:top-[9px] md:left-[8px] md:rounded-[8px]
//           "
//         >
//             <div 
//               className="
//                  bg-white flex items-center justify-center shadow-sm rounded-lg shrink-0
//                  w-[80px] h-[80px]
//                  md:absolute md:w-[144px] md:h-[144px] md:top-[8px] md:left-[8px] md:rounded-[8px]
//               "
//             >
//                <img 
//                  src={product.image} 
//                  alt={product.product_name} 
//                  className="w-[60%] h-[60%] md:w-[100px] md:h-[100px] object-contain mix-blend-multiply" 
//                />
//             </div>

//             <div 
//               className="
//                 flex flex-col justify-center
//                 md:h-full md:pr-4 md:ml-[168px] md:w-[calc(100%-168px)]
//               "
//             >
//                 <h3 className="text-[16px] md:text-[18px] leading-snug font-bold text-gray-900 line-clamp-2 mb-1 md:mb-2">
//                     {product.product_name}
//                 </h3>
//                 <div className="flex items-center gap-2">
//                     {product.brand.logo_url && (
//                         <img 
//                           src={product.brand.logo_url} 
//                           alt={product.brand.brand_name} 
//                           className="w-5 h-5 md:w-6 md:h-6 object-contain rounded-full border border-gray-200" 
//                         />
//                     )}
//                     <span className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-wide">
//                         {product.brand.brand_name}
//                     </span>
//                 </div>
//             </div>
//         </div>

//         {/* --- MIDDLE SECTION: "CHOOSE SIZE" --- */}
//         <div 
//             className="
//                w-full flex justify-center py-2 shrink-0 z-10
//                md:absolute md:pointer-events-none md:py-0 md:top-[187px]
//             "
//         >
//             <h4 
//                 className="text-black font-semibold tracking-[0.01em] bg-white px-2"
//                 style={{
//                     fontFamily: 'Plus Jakarta Sans',
//                     fontSize: '15px',
//                     lineHeight: '100%',
//                 }}
//             >
//                 Choose Size
//             </h4>
//         </div>

//         {/* --- BOTTOM SECTION: VARIANTS LIST --- */}
//         <div 
//             className="
//                 bg-white overflow-y-auto custom-scrollbar flex flex-col items-center
//                 w-full px-2 pb-4 grow
//                 md:absolute md:px-0 md:pb-0 md:grow-0
//                 md:w-[432px] md:h-[343px] md:top-[224px] md:left-[8px]
//                 md:rounded-[8px] md:border md:border-[#E0E2E7] md:pt-[12px]
//             "
//         >
//              <div className="flex flex-col gap-3 w-full items-center">
//                 {product.product_variants.map((variant) => {
//                     const { sellingPrice, mrp, hasDiscount } = getPrices(variant);
//                     const isAdded = addedIds.includes(variant.product_variant_id);
//                     const isLoading = loadingId === variant.product_variant_id;
                    
//                     return (
//                         <div 
//                             key={variant.product_variant_id} 
//                             className="
//                                 flex items-center justify-between shrink-0 bg-[#F3F3F5] rounded-lg
//                                 w-full p-4
//                                 md:w-[416px] md:h-[89px] md:p-[20px]
//                             "
//                         >
//                             <div className="flex flex-col gap-1 md:gap-1.5">
//                                 <span 
//                                     className="text-black font-semibold tracking-[0.01em] text-[15px] md:text-[17px]"
//                                     style={{ fontFamily: 'Plus Jakarta Sans', lineHeight: '100%' }}
//                                 >
//                                     {variant.size} {variant.uom}
//                                 </span>
                                
//                                 <div className="flex items-center gap-2">
//                                     <span 
//                                         className="font-semibold tracking-[0.01em] text-[#003C22] text-[14px] md:text-[16px]"
//                                         style={{ fontFamily: 'Plus Jakarta Sans', lineHeight: '100%' }}
//                                     >
//                                         ₹{sellingPrice}
//                                     </span>
                                    
//                                     {hasDiscount && (
//                                          <span 
//                                             className="font-medium tracking-[0.01em] line-through opacity-70 text-black text-[12px] md:text-[13px]"
//                                             style={{ fontFamily: 'Plus Jakarta Sans', lineHeight: '100%' }}
//                                          >
//                                              ₹{mrp}
//                                          </span>
//                                     )}
//                                 </div>
//                             </div>

//                             <button 
//                                 onClick={() => handleAddToCart(variant)}
//                                 disabled={isLoading || isAdded}
//                                 className={`
//                                     flex items-center justify-center transition-all rounded-[12px]
//                                     h-[36px] px-3 md:px-0 md:w-[100px]
//                                     ${isAdded 
//                                         ? 'bg-[#E8F5E9] border border-[#E8F5E9] text-[#003C22]' 
//                                         : 'bg-[#003C22] border border-[#003C22] text-white hover:bg-[#002a18]'
//                                     }
//                                 `}
//                             >
//                                 <span
//                                     className="font-semibold tracking-[0.01em] flex items-center justify-center gap-2 w-full text-[13px] md:text-[14px]"
//                                     style={{ fontFamily: 'Plus Jakarta Sans', lineHeight: '100%' }}
//                                 >
//                                     {isLoading ? (
//                                         <Loader2 size={16} className="animate-spin" />
//                                     ) : isAdded ? (
//                                         <>Added <Check size={16} /></>
//                                     ) : (
//                                         <>Add To Bag </>
//                                     )}
//                                 </span>
//                             </button>
//                         </div>
//                     );
//                 })}
//              </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FarmersPopup;
'use client';
import React, { useState } from 'react';
import { X, ShoppingBag, Check, Loader2 } from 'lucide-react';
import { ApiProduct, ApiProductVariant } from '@/types/homeApi';
import { useCart } from '@/context/CartContext';

interface FarmersPopupProps {
  product: ApiProduct;
  onClose: () => void;
}

const FarmersPopup = ({ product, onClose }: FarmersPopupProps) => {
  const { addToCart } = useCart();
  
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [addedIds, setAddedIds] = useState<number[]>([]);

  const handleAddToCart = async (variant: ApiProductVariant) => {
    if (loadingId || addedIds.includes(variant.product_variant_id)) return;

    setLoadingId(variant.product_variant_id);
    try {
      // [!code changed] Updated to pass product details for the Popup
      await addToCart(
        variant.product_variant_id, 
        1,
        {
            name: `${product.product_name} (${variant.size} ${variant.uom})`, // Shows "Product Name (1kg)" in popup
            image: product.image 
        }
      );
      
      setAddedIds((prev) => [...prev, variant.product_variant_id]);
    } catch (error) {
      console.error("Failed to add to cart", error);
    } finally {
      setLoadingId(null);
    }
  };

  const getPrices = (v: ApiProductVariant) => {
    const sellingPrice = v.discounted_price && v.discounted_price > 0 ? v.discounted_price : v.price;
    const mrp = v.price;
    const hasDiscount = v.discounted_price && v.discounted_price < v.price;
    return { sellingPrice, mrp, hasDiscount };
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 font-jakarta">
      {/* Main Container */}
      <div 
        className="
          relative bg-white shadow-2xl overflow-hidden rounded-2xl
          w-[95%] max-w-[448px] h-[85vh] max-h-[600px] flex flex-col
          md:block md:w-[448px] md:h-[575px] md:rounded-[16px]
        "
      >
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 z-30 p-2 bg-white/80 rounded-full hover:bg-gray-100 transition-colors shadow-sm"
        >
          <X size={20} className="text-gray-600" />
        </button>

        {/* --- TOP SECTION: PRODUCT INFO --- */}
        <div 
          className="
            bg-[#F3F3F5] shrink-0
            w-full p-4 flex items-center gap-4
            md:absolute md:p-0 md:block md:w-[432px] md:h-[160px] md:top-[9px] md:left-[8px] md:rounded-[8px]
          "
        >
            <div 
              className="
                 bg-white flex items-center justify-center shadow-sm rounded-lg shrink-0
                 w-[80px] h-[80px]
                 md:absolute md:w-[144px] md:h-[144px] md:top-[8px] md:left-[8px] md:rounded-[8px]
              "
            >
               <img 
                 src={product.image} 
                 alt={product.product_name} 
                 className="w-[60%] h-[60%] md:w-[100px] md:h-[100px] object-contain mix-blend-multiply" 
               />
            </div>

            <div 
              className="
                flex flex-col justify-center
                md:h-full md:pr-4 md:ml-[168px] md:w-[calc(100%-168px)]
              "
            >
                <h3 className="text-[16px] md:text-[18px] leading-snug font-bold text-gray-900 line-clamp-2 mb-1 md:mb-2">
                    {product.product_name}
                </h3>
                <div className="flex items-center gap-2">
                    {product.brand.logo_url && (
                        <img 
                          src={product.brand.logo_url} 
                          alt={product.brand.brand_name} 
                          className="w-5 h-5 md:w-6 md:h-6 object-contain rounded-full border border-gray-200" 
                        />
                    )}
                    <span className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-wide">
                        {product.brand.brand_name}
                    </span>
                </div>
            </div>
        </div>

        {/* --- MIDDLE SECTION: "CHOOSE SIZE" --- */}
        <div 
            className="
               w-full flex justify-center py-2 shrink-0 z-10
               md:absolute md:pointer-events-none md:py-0 md:top-[187px]
            "
        >
            <h4 
                className="text-black font-semibold tracking-[0.01em] bg-white px-2"
                style={{
                    fontFamily: 'Plus Jakarta Sans',
                    fontSize: '15px',
                    lineHeight: '100%',
                }}
            >
                Choose Size
            </h4>
        </div>

        {/* --- BOTTOM SECTION: VARIANTS LIST --- */}
        <div 
            className="
                bg-white overflow-y-auto custom-scrollbar flex flex-col items-center
                w-full px-2 pb-4 grow
                md:absolute md:px-0 md:pb-0 md:grow-0
                md:w-[432px] md:h-[343px] md:top-[224px] md:left-[8px]
                md:rounded-[8px] md:border md:border-[#E0E2E7] md:pt-[12px]
            "
        >
             <div className="flex flex-col gap-3 w-full items-center">
                {product.product_variants.map((variant) => {
                    const { sellingPrice, mrp, hasDiscount } = getPrices(variant);
                    const isAdded = addedIds.includes(variant.product_variant_id);
                    const isLoading = loadingId === variant.product_variant_id;
                    
                    return (
                        <div 
                            key={variant.product_variant_id} 
                            className="
                                flex items-center justify-between shrink-0 bg-[#F3F3F5] rounded-lg
                                w-full p-4
                                md:w-[416px] md:h-[89px] md:p-[20px]
                            "
                        >
                            <div className="flex flex-col gap-1 md:gap-1.5">
                                <span 
                                    className="text-black font-semibold tracking-[0.01em] text-[15px] md:text-[17px]"
                                    style={{ fontFamily: 'Plus Jakarta Sans', lineHeight: '100%' }}
                                >
                                    {variant.size} {variant.uom}
                                </span>
                                
                                <div className="flex items-center gap-2">
                                    <span 
                                        className="font-semibold tracking-[0.01em] text-[#003C22] text-[14px] md:text-[16px]"
                                        style={{ fontFamily: 'Plus Jakarta Sans', lineHeight: '100%' }}
                                    >
                                        ₹{sellingPrice}
                                    </span>
                                    
                                    {hasDiscount && (
                                         <span 
                                            className="font-medium tracking-[0.01em] line-through opacity-70 text-black text-[12px] md:text-[13px]"
                                            style={{ fontFamily: 'Plus Jakarta Sans', lineHeight: '100%' }}
                                         >
                                             ₹{mrp}
                                         </span>
                                    )}
                                </div>
                            </div>

                            <button 
                                onClick={() => handleAddToCart(variant)}
                                disabled={isLoading || isAdded}
                                className={`
                                    flex items-center justify-center transition-all rounded-[12px]
                                    h-[36px] px-3 md:px-0 md:w-[100px]
                                    ${isAdded 
                                        ? 'bg-[#E8F5E9] border border-[#E8F5E9] text-[#003C22]' 
                                        : 'bg-[#003C22] border border-[#003C22] text-white hover:bg-[#002a18]'
                                    }
                                `}
                            >
                                <span
                                    className="font-semibold tracking-[0.01em] flex items-center justify-center gap-2 w-full text-[13px] md:text-[14px]"
                                    style={{ fontFamily: 'Plus Jakarta Sans', lineHeight: '100%' }}
                                >
                                    {isLoading ? (
                                        <Loader2 size={16} className="animate-spin" />
                                    ) : isAdded ? (
                                        <>Added <Check size={16} /></>
                                    ) : (
                                        <>Add To Bag </>
                                    )}
                                </span>
                            </button>
                        </div>
                    );
                })}
             </div>
        </div>
      </div>
    </div>
  );
};

export default FarmersPopup;