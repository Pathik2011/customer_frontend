
// 'use client';

// import React, { useState, useRef, useEffect } from 'react';
// import { Minus, Plus } from 'lucide-react';
// import { ProductDetail } from '@/types';
// import { useCart } from '@/context/CartContext';

// const scrollStyles = `
//   .no-scrollbar::-webkit-scrollbar {
//     display: none;
//   }
//   .no-scrollbar {
//     -ms-overflow-style: none;
//     scrollbar-width: none;
//   }
// `;

// interface ProductInfoProps {
//   product: ProductDetail;
// }

// const ProductInfo = ({ product }: ProductInfoProps) => {
//   const { addToCart } = useCart();
//   const [selectedVariantId, setSelectedVariantId] = useState<number>(product.variants[0]?.product_variant_id || 0);
//   const [quantity, setQuantity] = useState(0); 
  
//   const lastSyncedQty = useRef(0);
//   const skipResetRef = useRef(false);
  
//   const [loadingVariantId, setLoadingVariantId] = useState<number | null>(null);
//   const debounceTimer = useRef<NodeJS.Timeout | null>(null);

//   useEffect(() => {
//     return () => {
//       if (debounceTimer.current) clearTimeout(debounceTimer.current);
//     };
//   }, []);

//   useEffect(() => {
//     if (skipResetRef.current) {
//       skipResetRef.current = false;
//       return;
//     }
//     setQuantity(0);
//     lastSyncedQty.current = 0;
//   }, [selectedVariantId]);

//   const handleQuantity = (type: 'inc' | 'dec') => {
//     let newQty = quantity;
//     if (type === 'dec' && quantity > 0) newQty = quantity - 1;
//     if (type === 'inc') newQty = quantity + 1;

//     if (newQty !== quantity) {
//       setQuantity(newQty); 

//       if (debounceTimer.current) {
//         clearTimeout(debounceTimer.current);
//       }

//       debounceTimer.current = setTimeout(async () => {
//         const delta = newQty - lastSyncedQty.current;

//         if (delta !== 0) {
//           try {
//             setLoadingVariantId(selectedVariantId);
//             await addToCart(selectedVariantId, delta);
//             lastSyncedQty.current = newQty;
//             console.log(`Auto-updated variant ${selectedVariantId}. Delta: ${delta}. Sync Level: ${newQty}`);
//           } catch (error) {
//             console.error("Auto-update failed", error);
//             setQuantity(lastSyncedQty.current); 
//           } finally {
//             setLoadingVariantId(null);
//           }
//         }
//       }, 1000);
//     }
//   };

//   const handleDirectAddToCart = async (e: React.MouseEvent, variantId: number, qty: number) => {
//     e.stopPropagation();
    
//     if (variantId !== selectedVariantId) {
//       skipResetRef.current = true;
//       setSelectedVariantId(variantId);
//     }

//     setQuantity(1);
    
//     try {
//       setLoadingVariantId(variantId);
//       await addToCart(variantId, qty);
//       lastSyncedQty.current = 1; 
//     } catch (error) {
//       console.error("Failed to add to bag", error);
//       setQuantity(0); 
//       lastSyncedQty.current = 0;
//     } finally {
//       setLoadingVariantId(null);
//     }
//   };

//   const activeVariant = product.variants.find(v => v.product_variant_id === selectedVariantId) || product.variants[0];

//   return (
//     <>
//       <style>{scrollStyles}</style>
//       <div className="font-jakarta space-y-6 relative">
        
//         <div>
//           <h1 
//             className="mt-0 md:mt-[50px]" 
//             style={{
//               fontFamily: '"Google Sans", sans-serif',
//               fontWeight: 500,
//               fontSize: '28px',
//               lineHeight: '100%',
//               color: '#000000',
//               marginBottom: '14px',
//             }}
//           >
//             {product.product_name}
//           </h1>
          
//           <p 
//             style={{
//               fontFamily: '"Plus Jakarta Sans", sans-serif',
//               fontWeight: 500,
//               fontSize: '14px',
//               lineHeight: '22px',
//               letterSpacing: '0.01em',
//               color: '#4D4D4D',
//               maxWidth: '507px'
//             }}
//           >
//             {product.properties?.introduction || product.description.substring(0, 150) + '...'}
//           </p>
//         </div>

//         <div className="flex flex-col gap-2 mt-8">
//           <div className="flex items-center gap-2">
//             <span style={{ fontFamily: '"Google Sans", sans-serif', fontWeight: 500, fontSize: '28px', lineHeight: '100%', color: '#003C22' }}>
//               ₹{Math.round(activeVariant.discounted_price)}
//             </span>
//             {activeVariant.price > activeVariant.discounted_price && (
//               <span style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 500, fontSize: '14px', lineHeight: '100%', letterSpacing: '0.01em', textDecoration: 'line-through', color: '#000000', opacity: 0.7 }}>
//                 ₹{Math.round(activeVariant.price)}
//               </span>
//             )}
//           </div>

//           <div className="flex items-center gap-1">
//             <span style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 500, fontSize: '14px', lineHeight: '100%', color: '#000000' }}>Size: </span>
//             <span style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 500, fontSize: '14px', lineHeight: '100%', color: '#4D4D4D' }}>
//                1 unit ({activeVariant.size} {activeVariant.uom})
//             </span>
//           </div>
//         </div>

//         <div className="w-full h-[1px] bg-[#E0E2E7] my-6"></div>

//         <div className="mt-6 w-full">
//           <h3 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 600, fontSize: '16px', color: '#000000', marginBottom: '16px' }}>
//             Variants
//           </h3>
          
//           <div className="flex gap-4 items-start overflow-x-auto no-scrollbar pb-2 w-full">
//             {product.variants.map((variant) => {
//               const isSelected = selectedVariantId === variant.product_variant_id;
//               const isProcessing = loadingVariantId === variant.product_variant_id;
              
//               return (
//                 <div 
//                   key={variant.product_variant_id}
//                   onClick={() => setSelectedVariantId(variant.product_variant_id)}
//                   className={`
//                     relative cursor-pointer transition-all duration-200 shrink-0
//                     flex flex-col items-center justify-center
//                     ${isSelected ? 'border-[#013220] bg-[#F2F9F7]' : 'border-[#E0E2E7] bg-white hover:border-gray-300'}
//                   `}
//                   style={{
//                     width: '135px',
//                     minHeight: '142px', 
//                     height: 'auto',
//                     borderRadius: '12px',
//                     borderWidth: '1px',
//                     borderStyle: 'solid',
//                     padding: '12px 0',
//                     gap: '8px'
//                   }}
//                 >
//                   <div 
//                     style={{
//                       fontFamily: '"Plus Jakarta Sans", sans-serif',
//                       fontWeight: 600,
//                       fontSize: '17px',
//                       lineHeight: '100%',
//                       letterSpacing: '0.01em',
//                       color: '#000000',
//                       marginBottom: '8px'
//                     }}
//                   >
//                     {variant.size} {variant.uom}
//                   </div>

//                   <div className="flex items-center gap-[6px] mb-2">
//                     <span 
//                       style={{
//                         fontFamily: '"Plus Jakarta Sans", sans-serif',
//                         fontWeight: 600,
//                         fontSize: '16px',
//                         color: '#003C22'
//                       }}
//                     >
//                       ₹{Math.round(variant.discounted_price)}
//                     </span>

//                     {variant.price > variant.discounted_price && (
//                       <span 
//                         style={{
//                           fontFamily: '"Plus Jakarta Sans", sans-serif',
//                           fontWeight: 500,
//                           fontSize: '13px',
//                           textDecoration: 'line-through',
//                           color: '#000000',
//                           opacity: 0.7
//                         }}
//                       >
//                         ₹{Math.round(variant.price)}
//                       </span>
//                     )}
//                   </div>

//                   {/* --- Toggle Logic --- */}
//                   {/* [!code changed] Show counter if selected (Removed quantity > 0 check) */}
//                   {isSelected ? (
//                     <div 
//                       className="flex items-center bg-white border border-[#E0E2E7] rounded-[12px] animate-in fade-in duration-200"
//                       style={{ width: '108px', height: '36px' }}
//                     >
//                       <button 
//                         onClick={(e) => { e.stopPropagation(); handleQuantity('dec'); }}
//                         disabled={quantity === 0} // [!code ++] Disable if already 0
//                         className="flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                         style={{ width: '36px', height: '36px', borderRight: '1px solid #E0E2E7' }}
//                       >
//                         <Minus size={16} className="text-[#000000]" />
//                       </button>
//                       <div className="flex items-center justify-center text-[#000000]" style={{ width: '36px', height: '36px', fontWeight: 600, fontSize: '14px' }}>
//                         {quantity.toString().padStart(2, '0')}
//                       </div>
//                       <button 
//                         onClick={(e) => { e.stopPropagation(); handleQuantity('inc'); }}
//                         className="flex items-center justify-center hover:bg-gray-50"
//                         style={{ width: '36px', height: '36px', borderLeft: '1px solid #E0E2E7' }}
//                       >
//                         <Plus size={16} className="text-[#000000]" />
//                       </button>
//                     </div>
//                   ) : (
//                     <button 
//                       onClick={(e) => handleDirectAddToCart(e, variant.product_variant_id, 1)}
//                       disabled={isProcessing}
//                       className="flex items-center justify-center hover:bg-emerald-800 transition-colors animate-in fade-in duration-200 disabled:opacity-50"
//                       style={{
//                         width: '100px',
//                         height: '36px',
//                         borderRadius: '12px',
//                         borderWidth: '1px',
//                         borderStyle: 'solid',
//                         borderColor: '#003C22',
//                         backgroundColor: '#003C22',
//                         fontFamily: '"Plus Jakarta Sans", sans-serif',
//                         fontWeight: 600,
//                         fontSize: '14px',
//                         color: '#FFFFFF',
//                         whiteSpace: 'nowrap'
//                       }}
//                     >
//                       {isProcessing ? 'Adding...' : 'Add to Bag'}
//                     </button>
//                   )}

//                 </div>
//               );
//             })}
//           </div>
          
//         </div>

//       </div>
//     </>
//   );
// };

// export default ProductInfo;
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Minus, Plus } from 'lucide-react';
import { ProductDetail } from '@/types';
import { useCart } from '@/context/CartContext';

const scrollStyles = `
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

interface ProductInfoProps {
  product: ProductDetail;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const { addToCart } = useCart();
  const [selectedVariantId, setSelectedVariantId] = useState<number>(product.variants[0]?.product_variant_id || 0);
  const [quantity, setQuantity] = useState(0); 
  
  const lastSyncedQty = useRef(0);
  const skipResetRef = useRef(false);
  const [loadingVariantId, setLoadingVariantId] = useState<number | null>(null);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  // --- NEW: Ref for the variants container ---
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, []);

  // --- NEW: Horizontal Mouse Wheel Handler ---
  // This makes the desktop mouse wheel scroll horizontally instead of vertically
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      const onWheel = (e: WheelEvent) => {
        if (e.deltaY === 0) return;
        // Check if the element actually needs scrolling
        if (el.scrollWidth > el.clientWidth) {
          e.preventDefault();
          el.scrollLeft += e.deltaY;
        }
      };
      el.addEventListener('wheel', onWheel);
      return () => el.removeEventListener('wheel', onWheel);
    }
  }, []);

  useEffect(() => {
    if (skipResetRef.current) {
      skipResetRef.current = false;
      return;
    }
    setQuantity(0);
    lastSyncedQty.current = 0;
  }, [selectedVariantId]);

  const handleQuantity = (type: 'inc' | 'dec') => {
    let newQty = quantity;
    if (type === 'dec' && quantity > 0) newQty = quantity - 1;
    if (type === 'inc') newQty = quantity + 1;

    if (newQty !== quantity) {
      setQuantity(newQty); 

      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }

      debounceTimer.current = setTimeout(async () => {
        const delta = newQty - lastSyncedQty.current;

        if (delta !== 0) {
          try {
            setLoadingVariantId(selectedVariantId);
            await addToCart(selectedVariantId, delta);
            lastSyncedQty.current = newQty;
          } catch (error) {
            console.error("Auto-update failed", error);
            setQuantity(lastSyncedQty.current); 
          } finally {
            setLoadingVariantId(null);
          }
        }
      }, 1000);
    }
  };

  const handleDirectAddToCart = async (e: React.MouseEvent, variantId: number, qty: number) => {
    e.stopPropagation();
    if (variantId !== selectedVariantId) {
      skipResetRef.current = true;
      setSelectedVariantId(variantId);
    }
    setQuantity(1);
    try {
      setLoadingVariantId(variantId);
      await addToCart(variantId, qty);
      lastSyncedQty.current = 1; 
    } catch (error) {
      console.error("Failed to add to bag", error);
      setQuantity(0); 
      lastSyncedQty.current = 0;
    } finally {
      setLoadingVariantId(null);
    }
  };

  const activeVariant = product.variants.find(v => v.product_variant_id === selectedVariantId) || product.variants[0];

  return (
    <>
      <style>{scrollStyles}</style>
      <div className="font-jakarta space-y-6 relative max-w-full"> {/* Added max-w-full */}
        
        {/* Product Name */}
        <div>
          <h1 
            className="mt-0 md:mt-[50px]" 
            style={{
              fontFamily: '"Google Sans", sans-serif',
              fontWeight: 500,
              fontSize: '28px',
              lineHeight: '100%',
              color: '#000000',
              marginBottom: '14px',
            }}
          >
            {product.product_name}
          </h1>
          
          <p 
            style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '22px',
              letterSpacing: '0.01em',
              color: '#4D4D4D',
              maxWidth: '507px'
            }}
          >
            {product.properties?.introduction || product.description.substring(0, 150) + '...'}
          </p>
        </div>

        {/* Main Price Display */}
        <div className="flex flex-col gap-2 mt-8">
          <div className="flex items-center gap-2">
            <span style={{ fontFamily: '"Google Sans", sans-serif', fontWeight: 500, fontSize: '28px', lineHeight: '100%', color: '#003C22' }}>
              ₹{Math.round(activeVariant.discounted_price)}
            </span>
            {activeVariant.price > activeVariant.discounted_price && (
              <span style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 500, fontSize: '14px', lineHeight: '100%', letterSpacing: '0.01em', textDecoration: 'line-through', color: '#000000', opacity: 0.7 }}>
                ₹{Math.round(activeVariant.price)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1">
            <span style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 500, fontSize: '14px', lineHeight: '100%', color: '#000000' }}>Size: </span>
            <span style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 500, fontSize: '14px', lineHeight: '100%', color: '#4D4D4D' }}>
               1 unit ({activeVariant.size} {activeVariant.uom})
            </span>
          </div>
        </div>

        <div className="w-full h-[1px] bg-[#E0E2E7] my-6"></div>

        {/* Variants Section */}
        <div className="mt-6 w-full max-w-full overflow-hidden"> {/* Ensure parent prevents overflow */}
          <h3 style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 600, fontSize: '16px', color: '#000000', marginBottom: '16px' }}>
            Variants
          </h3>
          
          {/* UPDATED CONTAINER:
            1. Attached ref={scrollContainerRef}
            2. Added max-w-full to ensure it respects parent width
          */}
          <div 
            ref={scrollContainerRef}
            className="
              flex gap-4 items-start w-full pb-2
              overflow-x-auto no-scrollbar flex-nowrap
              max-w-full
            "
          >
            {product.variants.map((variant) => {
              const isSelected = selectedVariantId === variant.product_variant_id;
              const isProcessing = loadingVariantId === variant.product_variant_id;
              
              return (
                <div 
                  key={variant.product_variant_id}
                  onClick={() => setSelectedVariantId(variant.product_variant_id)}
                  className={`
                    relative cursor-pointer transition-all duration-200 shrink-0
                    flex flex-col items-center justify-center
                    ${isSelected ? 'border-[#013220] bg-[#F2F9F7]' : 'border-[#E0E2E7] bg-white hover:border-gray-300'}
                  `}
                  style={{
                    width: '135px',
                    minHeight: '142px', 
                    height: 'auto',
                    borderRadius: '12px',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    padding: '12px 0',
                    gap: '8px'
                  }}
                >
                  {/* Variant Size */}
                  <div 
                    style={{
                      fontFamily: '"Plus Jakarta Sans", sans-serif',
                      fontWeight: 600,
                      fontSize: '17px',
                      lineHeight: '100%',
                      letterSpacing: '0.01em',
                      color: '#000000',
                      marginBottom: '8px'
                    }}
                  >
                    {variant.size} {variant.uom}
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-[6px] mb-2">
                    <span 
                      style={{
                        fontFamily: '"Plus Jakarta Sans", sans-serif',
                        fontWeight: 600,
                        fontSize: '16px',
                        color: '#003C22'
                      }}
                    >
                      ₹{Math.round(variant.discounted_price)}
                    </span>

                    {variant.price > variant.discounted_price && (
                      <span 
                        style={{
                          fontFamily: '"Plus Jakarta Sans", sans-serif',
                          fontWeight: 500,
                          fontSize: '13px',
                          textDecoration: 'line-through',
                          color: '#000000',
                          opacity: 0.7
                        }}
                      >
                        ₹{Math.round(variant.price)}
                      </span>
                    )}
                  </div>

                  {/* --- Toggle Logic --- */}
                  {isSelected ? (
                    <div 
                      className="flex items-center bg-white border border-[#E0E2E7] rounded-[12px] animate-in fade-in duration-200"
                      style={{ width: '108px', height: '36px' }}
                    >
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleQuantity('dec'); }}
                        disabled={quantity === 0}
                        className="flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ width: '36px', height: '36px', borderRight: '1px solid #E0E2E7' }}
                      >
                        <Minus size={16} className="text-[#000000]" />
                      </button>
                      <div className="flex items-center justify-center text-[#000000]" style={{ width: '36px', height: '36px', fontWeight: 600, fontSize: '14px' }}>
                        {quantity.toString().padStart(2, '0')}
                      </div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleQuantity('inc'); }}
                        className="flex items-center justify-center hover:bg-gray-50"
                        style={{ width: '36px', height: '36px', borderLeft: '1px solid #E0E2E7' }}
                      >
                        <Plus size={16} className="text-[#000000]" />
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={(e) => handleDirectAddToCart(e, variant.product_variant_id, 1)}
                      disabled={isProcessing}
                      className="flex items-center justify-center hover:bg-emerald-800 transition-colors animate-in fade-in duration-200 disabled:opacity-50"
                      style={{
                        width: '100px',
                        height: '36px',
                        borderRadius: '12px',
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        borderColor: '#003C22',
                        backgroundColor: '#003C22',
                        fontFamily: '"Plus Jakarta Sans", sans-serif',
                        fontWeight: 600,
                        fontSize: '14px',
                        color: '#FFFFFF',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {isProcessing ? 'Adding...' : 'Add to Bag'}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductInfo;