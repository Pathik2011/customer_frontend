// // 'use client';
// // import React from 'react';
// // import { ShoppingBag } from 'lucide-react';
// // import { ApiProduct } from '@/types/homeApi';
// // import LargeCard from './LargeCard'; 
// // import SmallCard from './SmallCard';
// // import WideCard from './WideCard';

// // interface FarmersChoiceProps {
// //   data: ApiProduct[];
// // }

// // const FarmersChoice = ({ data }: FarmersChoiceProps) => {
// //   if (!data || data.length === 0) return null;

// //   // Transform API data for UI
// //   const bundles = data.map(item => ({
// //     id: item.product_id,
// //     title: item.product_name,
// //     image: item.image,
// //     desc: item.product_description,
// //     price: item.product_variants[0]?.price || 0,
// //     unit: item.product_variants[0] ? `${item.product_variants[0].size}${item.product_variants[0].uom}` : '',
// //   })).slice(0, 5);

// //   return (
// //     <section className="w-full flex justify-center pt-12 pb-0 font-jakarta">
      
// //       {/* [!code highlight] Background Logic Restored */}
// //       <div className="relative w-full h-auto lg:h-[817px] bg-[#FD820B]/10 overflow-hidden">
// //         {/* Background Image */}
// //         <div className="absolute inset-0 z-0 pointer-events-none">
// //           <img 
// //             src="/Home/Farmerchoice/Doodle.png" 
// //             alt="Farmer Choice Pattern" 
// //             className="w-full h-full object-cover opacity-100" // Ensure opacity is visible
// //           />
// //         </div>

// //         <div className="relative z-10 w-full h-full px-4 xl:px-0 py-12 max-w-[1296px] mx-auto flex flex-col items-center lg:items-stretch">
          
// //           {/* Header */}
// //           <div className="flex flex-col md:flex-row justify-between items-center md:items-center mb-10 gap-6 w-full text-center md:text-left">
// //             <div className="mx-auto md:mx-0">
// //               <h2 className="text-2xl md:text-3xl font-bold text-[#013220] mb-2">Farmer&apos;s Choice Bundles</h2>
// //               <p className="text-sm text-gray-600 max-w-md mx-auto md:mx-0">
// //                 Winter-wise Farming: Curated for Crops, Carefully Chosen for You.
// //               </p>
// //             </div>
            
// //             {/* [!code highlight] Desktop Button Restored */}
// //             <button className="hidden md:flex bg-[#013220] text-white px-6 py-3 rounded-xl font-semibold text-sm items-center gap-2 hover:bg-emerald-900 transition-colors shadow-sm">
// //               Add All Items to Bag <ShoppingBag size={16} />
// //             </button>
// //           </div>
          
// //           {/* Desktop Grid */}
// //           <div className="hidden lg:flex gap-6 h-full">
// //              {bundles[0] && (
// //                 <div className="w-[504px] h-[517px] shrink-0">
// //                     <LargeCard item={bundles[0]} />
// //                 </div>
// //              )}
// //              <div className="flex flex-col gap-6 w-[768px]">
// //                 <div className="flex gap-6 h-[317px]">
// //                    {bundles.slice(1,4).map(b => (
// //                        <div key={b.id} className="w-[240px] shrink-0">
// //                            <SmallCard item={b} />
// //                        </div>
// //                    ))}
// //                 </div>
// //                 {bundles[4] && (
// //                     <div className="w-full h-[173px]">
// //                         <WideCard item={bundles[4]} />
// //                     </div>
// //                 )}
// //              </div>
// //           </div>

// //           {/* Mobile Grid */}
// //           <div className="flex lg:hidden flex-col items-center gap-4 w-full">
// //               {bundles[0] && (
// //                   <div className="w-full max-w-[369px] h-auto aspect-[369/369] shrink-0">
// //                       <LargeCard item={bundles[0]} />
// //                   </div>
// //               )}
// //               <div className="grid grid-cols-2 gap-3 w-full max-w-[369px]">
// //                   {bundles.slice(1, 5).map(b => (
// //                       <div key={b.id} className="flex justify-center">
// //                           <SmallCard item={b} />
// //                       </div>
// //                   ))}
// //               </div>

// //               {/* [!code highlight] Mobile Button Restored */}
// //               <button 
// //                 className="flex md:hidden bg-[#013220] text-white items-center justify-center hover:bg-emerald-900 transition-colors shadow-sm mt-6"
// //                 style={{
// //                     width: '100%',
// //                     maxWidth: '369px',
// //                     height: '48px',
// //                     borderRadius: '12px',
// //                     gap: '8px',
// //                     fontSize: '14px',
// //                     fontWeight: 600,
// //                 }}
// //              >
// //                 Add All Items to Bag <ShoppingBag size={18} />
// //              </button>
// //           </div>

// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default FarmersChoice;
// // 'use client';
// // import React, { useState } from 'react';
// // import { ShoppingBag } from 'lucide-react';
// // import { ApiProduct } from '@/types/homeApi';
// // import LargeCard from './LargeCard'; 
// // import SmallCard from './SmallCard';
// // import WideCard from './WideCard';
// // import FarmersPopup from './FarmersPopup'; // Import the new popup

// // interface FarmersChoiceProps {
// //   data: ApiProduct[];
// // }

// // const FarmersChoice = ({ data }: FarmersChoiceProps) => {
// //   const [selectedProduct, setSelectedProduct] = useState<ApiProduct | null>(null);

// //   if (!data || data.length === 0) return null;

// //   // Transform API data for UI but keep reference to ID for lookup
// //   const bundles = data.map(item => ({
// //     id: item.product_id,
// //     title: item.product_name,
// //     image: item.image,
// //     desc: item.product_description,
// //     price: item.product_variants[0]?.price || 0,
// //     unit: item.product_variants[0] ? `${item.product_variants[0].size}${item.product_variants[0].uom}` : '',
// //   })).slice(0, 5);

// //   const handleBuyClick = (productId: number) => {
// //     const product = data.find(p => p.product_id === productId);
// //     if (product) {
// //       setSelectedProduct(product);
// //     }
// //   };

// //   return (
// //     <>
// //       <section className="w-full flex justify-center pt-12 pb-0 font-jakarta">
// //         <div className="relative w-full h-auto lg:h-[817px] bg-[#FD820B]/10 overflow-hidden">
// //           {/* Background Image */}
// //           <div className="absolute inset-0 z-0 pointer-events-none">
// //             <img 
// //               src="/Home/Farmerchoice/Doodle.png" 
// //               alt="Farmer Choice Pattern" 
// //               className="w-full h-full object-cover opacity-100" 
// //             />
// //           </div>

// //           <div className="relative z-10 w-full h-full px-4 xl:px-0 py-12 max-w-[1296px] mx-auto flex flex-col items-center lg:items-stretch">
            
// //             {/* Header */}
// //             <div className="flex flex-col md:flex-row justify-between items-center md:items-center mb-10 gap-6 w-full text-center md:text-left">
// //               <div className="mx-auto md:mx-0">
// //                 <h2 className="text-2xl md:text-3xl font-bold text-[#013220] mb-2">Farmer&apos;s Choice Bundles</h2>
// //                 <p className="text-sm text-gray-600 max-w-md mx-auto md:mx-0">
// //                   Winter-wise Farming: Curated for Crops, Carefully Chosen for You.
// //                 </p>
// //               </div>
              
// //               <button className="hidden md:flex bg-[#013220] text-white px-6 py-3 rounded-xl font-semibold text-sm items-center gap-2 hover:bg-emerald-900 transition-colors shadow-sm">
// //                 Add All Items to Bag <ShoppingBag size={16} />
// //               </button>
// //             </div>
            
// //             {/* Desktop Grid */}
// //             <div className="hidden lg:flex gap-6 h-full">
// //                {bundles[0] && (
// //                   <div className="w-[504px] h-[517px] shrink-0">
// //                       <LargeCard item={bundles[0]} onBuy={() => handleBuyClick(bundles[0].id)} />
// //                   </div>
// //                )}
// //                <div className="flex flex-col gap-6 w-[768px]">
// //                   <div className="flex gap-6 h-[317px]">
// //                      {bundles.slice(1,4).map(b => (
// //                          <div key={b.id} className="w-[240px] shrink-0">
// //                              <SmallCard item={b} onBuy={() => handleBuyClick(b.id)} />
// //                          </div>
// //                      ))}
// //                   </div>
// //                   {bundles[4] && (
// //                       <div className="w-full h-[173px]">
// //                           <WideCard item={bundles[4]} onBuy={() => handleBuyClick(bundles[4].id)} />
// //                       </div>
// //                   )}
// //                </div>
// //             </div>

// //             {/* Mobile Grid */}
// //             <div className="flex lg:hidden flex-col items-center gap-4 w-full">
// //                 {bundles[0] && (
// //                     <div className="w-full max-w-[369px] h-auto aspect-[369/369] shrink-0">
// //                         <LargeCard item={bundles[0]} onBuy={() => handleBuyClick(bundles[0].id)} />
// //                     </div>
// //                 )}
// //                 <div className="grid grid-cols-2 gap-3 w-full max-w-[369px]">
// //                     {bundles.slice(1, 5).map(b => (
// //                         <div key={b.id} className="flex justify-center">
// //                             <SmallCard item={b} onBuy={() => handleBuyClick(b.id)} />
// //                         </div>
// //                     ))}
// //                 </div>

// //                 <button 
// //                   className="flex md:hidden bg-[#013220] text-white items-center justify-center hover:bg-emerald-900 transition-colors shadow-sm mt-6"
// //                   style={{
// //                       width: '100%',
// //                       maxWidth: '369px',
// //                       height: '48px',
// //                       borderRadius: '12px',
// //                       gap: '8px',
// //                       fontSize: '14px',
// //                       fontWeight: 600,
// //                   }}
// //                >
// //                   Add All Items to Bag <ShoppingBag size={18} />
// //                </button>
// //             </div>

// //           </div>
// //         </div>
// //       </section>

// //       {/* Render Popup */}
// //       {selectedProduct && (
// //         <FarmersPopup 
// //           product={selectedProduct} 
// //           onClose={() => setSelectedProduct(null)} 
// //         />
// //       )}
// //     </>
// //   );
// // };

// // export default FarmersChoice;
// 'use client';
// import React, { useState } from 'react';
// import { ShoppingBag } from 'lucide-react';
// import { ApiProduct } from '@/types/homeApi';
// import LargeCard from './LargeCard'; 
// import SmallCard from './SmallCard';
// import WideCard from './WideCard';
// import FarmersPopup from './FarmersPopup'; 
// import ComingSoonPopup from './ComingSoonPopup'; // 1. Import new popup

// interface FarmersChoiceProps {
//   data: ApiProduct[];
//   title?: string;
//   subtitle?: string; // [!code ++]
// }

// const FarmersChoice = ({ data, title, subtitle }: FarmersChoiceProps) => {
//   const [selectedProduct, setSelectedProduct] = useState<ApiProduct | null>(null);
  
//   // 2. Add state for Coming Soon popup
//   const [showComingSoon, setShowComingSoon] = useState(false);

//   if (!data || data.length === 0) return null;

//   const bundles = data.map(item => ({
//     id: item.product_id,
//     title: item.product_name,
//     image: item.image,
//     desc: item.product_description,
//     price: item.product_variants[0]?.price || 0,
//     unit: item.product_variants[0] ? `${item.product_variants[0].size}${item.product_variants[0].uom}` : '',
//   })).slice(0, 5);

//   const handleBuyClick = (productId: number) => {
//     const product = data.find(p => p.product_id === productId);
//     if (product) {
//       setSelectedProduct(product);
//     }
//   };

//   return (
//     <>
//       <section className="w-full flex justify-center pt-12 pb-0 font-jakarta">
//         <div className="relative w-full h-auto lg:h-[817px] bg-[#FD820B]/10 overflow-hidden">
//           <div className="absolute inset-0 z-0 pointer-events-none">
//             <img 
//               src="/Home/Farmerchoice/Doodle.png" 
//               alt="Farmer Choice Pattern" 
//               className="w-full h-full object-cover opacity-100" 
//             />
//           </div>

//           <div className="relative z-10 w-full h-full px-4 xl:px-0 py-12 max-w-[1296px] mx-auto flex flex-col items-center lg:items-stretch">
            
//             <div className="flex flex-col md:flex-row justify-between items-center md:items-center mb-10 gap-6 w-full text-center md:text-left">
//               <div className="mx-auto md:mx-0">
//                 <h2 className="text-2xl md:text-3xl font-bold text-[#013220] mb-2">{title || "Farmer's Choice Bundles"}</h2>
//                 <p className="text-sm text-gray-600 max-w-md mx-auto md:mx-0">
//                  {subtitle || "Winter-wise Farming: Curated for Crops, Carefully Chosen for You."}
//                 </p>
//               </div>
              
//               {/* Desktop "Add All" Button */}
//               <button 
//                 onClick={() => setShowComingSoon(true)} // 3. Add Handler
//                 className="hidden md:flex bg-[#013220] text-white px-6 py-3 rounded-xl font-semibold text-sm items-center gap-2 hover:bg-emerald-900 transition-colors shadow-sm"
//               >
//                 Add All Items to Bag <ShoppingBag size={16} />
//               </button>
//             </div>
            
//             <div className="hidden lg:flex gap-6 h-full">
//                {bundles[0] && (
//                   <div className="w-[504px] h-[517px] shrink-0">
//                       <LargeCard item={bundles[0]} onBuy={() => handleBuyClick(bundles[0].id)} />
//                   </div>
//                )}
//                <div className="flex flex-col gap-6 w-[768px]">
//                   <div className="flex gap-6 h-[317px]">
//                      {bundles.slice(1,4).map(b => (
//                          <div key={b.id} className="w-[240px] shrink-0">
//                              <SmallCard item={b} onBuy={() => handleBuyClick(b.id)} />
//                          </div>
//                      ))}
//                   </div>
//                   {bundles[4] && (
//                       <div className="w-full h-[173px]">
//                           <WideCard item={bundles[4]} onBuy={() => handleBuyClick(bundles[4].id)} />
//                       </div>
//                   )}
//                </div>
//             </div>

//             <div className="flex lg:hidden flex-col items-center gap-4 w-full">
//                 {bundles[0] && (
//                     <div className="w-full max-w-[369px] h-auto aspect-[369/369] shrink-0">
//                         <LargeCard item={bundles[0]} onBuy={() => handleBuyClick(bundles[0].id)} />
//                     </div>
//                 )}
//                 <div className="grid grid-cols-2 gap-3 w-full max-w-[369px]">
//                     {bundles.slice(1, 5).map(b => (
//                         <div key={b.id} className="flex justify-center">
//                             <SmallCard item={b} onBuy={() => handleBuyClick(b.id)} />
//                         </div>
//                     ))}
//                 </div>

//                 {/* Mobile "Add All" Button */}
//                 <button 
//                   onClick={() => setShowComingSoon(true)} // 4. Add Handler
//                   className="flex md:hidden bg-[#013220] text-white items-center justify-center hover:bg-emerald-900 transition-colors shadow-sm mt-6"
//                   style={{
//                       width: '100%',
//                       maxWidth: '369px',
//                       height: '48px',
//                       borderRadius: '12px',
//                       gap: '8px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                   }}
//                >
//                   Add All Items to Bag <ShoppingBag size={18} />
//                </button>
//             </div>

//           </div>
//         </div>
//       </section>

//       {/* Render Product Popup */}
//       {selectedProduct && (
//         <FarmersPopup 
//           product={selectedProduct} 
//           onClose={() => setSelectedProduct(null)} 
//         />
//       )}

//       {/* Render Coming Soon Popup */}
//       {showComingSoon && (
//         <ComingSoonPopup 
//           onClose={() => setShowComingSoon(false)} 
//         />
//       )}
//     </>
//   );
// };

// export default FarmersChoice;
'use client';
import React, { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { ApiProduct } from '@/types/homeApi';
import LargeCard from './LargeCard'; 
import SmallCard from './SmallCard';
import WideCard from './WideCard';
import FarmersPopup from './FarmersPopup'; 
import ComingSoonPopup from './ComingSoonPopup';

interface FarmersChoiceProps {
  data: ApiProduct[];
  title?: string;
  subtitle?: string;
}

const FarmersChoice = ({ data, title, subtitle }: FarmersChoiceProps) => {
  const [selectedProduct, setSelectedProduct] = useState<ApiProduct | null>(null);
  const [showComingSoon, setShowComingSoon] = useState(false);

  if (!data || data.length === 0) return null;

  const bundles = data.map(item => ({
    id: item.product_id,
    title: item.product_name,
    image: item.image,
    desc: item.product_description,
    price: item.product_variants[0]?.price || 0,
    unit: item.product_variants[0] ? `${item.product_variants[0].size}${item.product_variants[0].uom}` : '',
  })).slice(0, 5);

  const handleBuyClick = (productId: number) => {
    const product = data.find(p => p.product_id === productId);
    if (product) {
      setSelectedProduct(product);
    }
  };

  return (
    <>
      <section className="w-full flex justify-center pt-12 pb-0 font-jakarta">
        <div className="relative w-full h-auto lg:h-[817px] bg-[#FD820B]/10 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img 
              src="/Home/Farmerchoice/Doodle.png" 
              alt="Farmer Choice Pattern" 
              className="w-full h-full object-cover opacity-100" 
            />
          </div>

          <div className="relative z-10 w-full h-full px-4 xl:px-0 py-12 max-w-[1296px] mx-auto flex flex-col items-center lg:items-stretch">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center md:items-center mb-10 gap-6 w-full text-center md:text-left">
              <div className="mx-auto md:mx-0">
                {/* Dynamic Title with Mobile/Desktop Typography */}
                <h2 
                  className="text-[20px] md:text-[28px] font-bold leading-[100%] tracking-[0] text-[#013220] mb-2"
                  style={{ fontFamily: '"Google Sans", sans-serif' }}
                >
                  {title || "Farmer's Choice Bundles"}
                </h2>
                
                {/* Dynamic Subtitle with Mobile/Desktop Typography */}
                <p 
                  className="text-[14px] md:text-[15px] font-semibold leading-[26px] tracking-[0.01em] font-jakarta text-[#4D4D4D] max-w-md mx-auto md:mx-0 text-center md:text-left"
                >
                  {subtitle || "Winter-wise Farming: Curated for Crops, Carefully Chosen for You."}
                </p>
              </div>
              
              {/* Desktop Button */}
              <button 
                onClick={() => setShowComingSoon(true)}
                className="hidden md:flex bg-[#013220] text-white px-6 py-3 rounded-xl font-semibold text-sm items-center gap-2 hover:bg-emerald-900 transition-colors shadow-sm"
              >
                Add All Items to Bag <ShoppingBag size={16} />
              </button>
            </div>
            
            {/* Desktop Grid */}
            <div className="hidden lg:flex gap-6 h-full">
               {bundles[0] && (
                  <div className="w-[504px] h-[517px] shrink-0">
                      <LargeCard item={bundles[0]} onBuy={() => handleBuyClick(bundles[0].id)} />
                  </div>
               )}
               <div className="flex flex-col gap-6 w-[768px]">
                  <div className="flex gap-6 h-[317px]">
                     {bundles.slice(1,4).map(b => (
                         <div key={b.id} className="w-[240px] shrink-0">
                             <SmallCard item={b} onBuy={() => handleBuyClick(b.id)} />
                         </div>
                     ))}
                  </div>
                  {bundles[4] && (
                      <div className="w-full h-[173px]">
                          <WideCard item={bundles[4]} onBuy={() => handleBuyClick(bundles[4].id)} />
                      </div>
                  )}
               </div>
            </div>

            {/* Mobile Grid */}
            <div className="flex lg:hidden flex-col items-center gap-4 w-full">
                {bundles[0] && (
                    <div className="w-full max-w-[369px] h-auto aspect-[369/369] shrink-0">
                        <LargeCard item={bundles[0]} onBuy={() => handleBuyClick(bundles[0].id)} />
                    </div>
                )}
                <div className="grid grid-cols-2 gap-3 w-full max-w-[369px]">
                    {bundles.slice(1, 5).map(b => (
                        <div key={b.id} className="flex justify-center">
                            <SmallCard item={b} onBuy={() => handleBuyClick(b.id)} />
                        </div>
                    ))}
                </div>

                {/* Mobile Button */}
                <button 
                  onClick={() => setShowComingSoon(true)}
                  className="flex md:hidden bg-[#013220] text-white items-center justify-center hover:bg-emerald-900 transition-colors shadow-sm mt-6"
                  style={{
                      width: '100%',
                      maxWidth: '369px',
                      height: '48px',
                      borderRadius: '12px',
                      gap: '8px',
                      fontSize: '14px',
                      fontWeight: 600,
                  }}
               >
                  Add All Items to Bag <ShoppingBag size={18} />
               </button>
            </div>

          </div>
        </div>
      </section>

      {/* Render Product Popup */}
      {selectedProduct && (
        <FarmersPopup 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}

      {/* Render Coming Soon Popup */}
      {showComingSoon && (
        <ComingSoonPopup 
          onClose={() => setShowComingSoon(false)} 
        />
      )}
    </>
  );
};

export default FarmersChoice;