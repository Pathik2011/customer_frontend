// // // 'use client';
// // // import React from 'react';
// // // import { ArrowRight } from 'lucide-react';
// // // import { ApiCrop } from '@/types/homeApi';
// // // import { useRouter } from 'next/navigation'; // [!code ++] 1. Import useRouter

// // // interface ProductsAccordingToCropProps {
// // //   data: ApiCrop[];
// // //   title?: string;
// // // }

// // // const BLOB_IMAGES = [
// // //   { bg: '/Home/Crop/1.png', opacity: 'opacity-100' },
// // //   { bg: '/Home/Crop/2.png', opacity: 'opacity-40' },
// // //   { bg: '/Home/Crop/3.png', opacity: 'opacity-40' },
// // //   { bg: '/Home/Crop/4.png', opacity: 'opacity-40' },
// // //   { bg: '/Home/Crop/5.png', opacity: 'opacity-40' },
// // // ];

// // // const ProductsAccordingToCrop = ({ data, title }: ProductsAccordingToCropProps) => {
// // //   const router = useRouter(); // [!code ++] 2. Initialize Router

// // //   if (!data || data.length === 0) return null;

// // //   const displayItems = data.slice(0, 5);

// // //   // [!code ++] 3. Helper function for navigation
// // //   const handleCropClick = (cropName: string) => {
// // //     // Navigate to shop page with the crop query param
// // //     router.push(`/shop?crop=${encodeURIComponent(cropName)}`);
// // //   };

// // //   return (
// // //     <section className="w-full bg-white flex justify-center items-center relative overflow-hidden font-jakarta">
// // //       <div className="w-full h-auto lg:h-[600px] relative pb-12 lg:pb-0"> 
// // //         <div className="w-full max-w-[1289px] h-full mx-auto px-4 xl:px-0 relative flex flex-col items-center lg:block">
            
// // //             {/* Header */}
// // //             <div className="mt-[48px] flex flex-col items-center text-center lg:absolute lg:top-[80px] lg:w-full lg:flex-row lg:justify-between lg:items-start lg:mt-0 lg:text-left">
// // //                 <div className="flex flex-col items-center lg:items-start lg:w-[378px]">
// // //                     <h2 className="text-[#000000] mb-2 lg:mb-4" style={{ fontFamily: '"Google Sans", sans-serif', fontWeight: 500 }}>
// // //                         <span className="block lg:hidden text-[20px] leading-[100%]">{title || "Products According to Crops"}</span>
// // //                         <span className="hidden lg:block text-[28px] leading-[100%]">{title || "Products According to Crops"}</span>
// // //                     </h2>
// // //                     <p className="text-[#4D4D4D]" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: '14px', fontWeight: 600, lineHeight: '26px', letterSpacing: '0.01em', textAlign: 'center' }}>
// // //                         <span className="block lg:hidden w-[283px]">Winter-wise Farming: Curated for Crops, Carefully Chosen for You.</span>
// // //                         <span className="hidden lg:block text-sm font-normal text-gray-600 text-left leading-relaxed w-full">Winter-wise Farming: Curated for Crops,<br />Carefully Chosen for You.</span>
// // //                     </p>
// // //                 </div>
// // //                 {/* [!code highlight] Updated View All to go to Shop */}
// // //                 <button 
// // //                   onClick={() => router.push('/shop')}
// // //                   className="hidden lg:flex items-center gap-2 bg-[#003C22] text-white px-6 py-3 rounded-lg hover:bg-emerald-900 transition-colors"
// // //                 >
// // //                     <span className="font-medium text-sm">View All</span>
// // //                     <ArrowRight size={16} />
// // //                 </button>
// // //             </div>

// // //             {/* Grid */}
// // //             <div className="lg:absolute lg:top-[220px] lg:w-full lg:flex lg:justify-between mt-8 lg:mt-0 grid grid-cols-2 gap-x-3 gap-y-8 w-full max-w-[370px] lg:max-w-none">
// // //                 {displayItems.map((crop, index) => {
// // //                     const visual = BLOB_IMAGES[index % BLOB_IMAGES.length];
// // //                     return (
// // //                         <div 
// // //                           key={crop.crop_id} 
// // //                           // [!code ++] 4. Add Click Handler
// // //                           onClick={() => handleCropClick(crop.crop_name)}
// // //                           className={`flex flex-col items-center gap-2 lg:gap-4 group cursor-pointer ${index === 4 ? 'col-span-2 flex items-center justify-center' : ''}`}
// // //                         >
// // //                             <div className="relative flex justify-center items-center transition-transform duration-300 group-hover:scale-105 w-[177px] h-[177px] lg:w-[224px] lg:h-[224px]">
// // //                                 <div className="absolute inset-0 z-0">
// // //                                     <img src={visual.bg} alt="" className={`w-full h-full object-contain ${visual.opacity}`} />
// // //                                 </div>
// // //                                 <div className="relative z-10 w-[120px] h-[120px] lg:w-[180px] lg:h-[180px]">
// // //                                     <img src={crop.icon_url} alt={crop.crop_name} className="w-full h-full object-contain drop-shadow-md" />
// // //                                 </div>
// // //                             </div>
// // //                             <span className="lg:text-[#000000] lg:text-lg group-hover:text-[#003C22] transition-colors" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 500, fontSize: '14px', lineHeight: '100%', textAlign: 'center', color: '#003C22' }}>
// // //                                 {crop.crop_name}
// // //                             </span>
// // //                         </div>
// // //                     );
// // //                 })}
// // //             </div>

// // //             {/* Mobile View All */}
// // //             <div className="lg:hidden mt-12 flex justify-center w-full">
// // //                 <button 
// // //                   onClick={() => router.push('/shop')}
// // //                   className="flex items-center justify-center gap-1 bg-[#003C22] text-white hover:bg-emerald-900 transition-colors shadow-sm" style={{ width: '113px', height: '40px', borderRadius: '8px' }}>
// // //                     <span style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 600, fontSize: '14px', lineHeight: '100%' }}>View All</span>
// // //                     <ArrowRight size={16} />
// // //                 </button>
// // //             </div>
// // //         </div>
// // //       </div>
// // //     </section>
// // //   );
// // // };

// // // export default ProductsAccordingToCrop;
// // 'use client';

// // import React, { useState } from 'react';
// // import { ArrowRight } from 'lucide-react';
// // import { ApiCrop } from '@/types/homeApi';
// // import { useRouter } from 'next/navigation';
// // import { motion } from 'framer-motion'; // [!code ++] Import Motion

// // interface ProductsAccordingToCropProps {
// //   data: ApiCrop[];
// //   title?: string;
// // }

// // const BLOB_IMAGES = [
// //   { bg: '/Home/Crop/1.png', opacity: 'opacity-100' },
// //   { bg: '/Home/Crop/2.png', opacity: 'opacity-40' },
// //   { bg: '/Home/Crop/3.png', opacity: 'opacity-40' },
// //   { bg: '/Home/Crop/4.png', opacity: 'opacity-40' },
// //   { bg: '/Home/Crop/5.png', opacity: 'opacity-40' },
// // ];

// // const ProductsAccordingToCrop = ({ data, title }: ProductsAccordingToCropProps) => {
// //   const router = useRouter();
// //   // [!code ++] State to track which item is currently being clicked
// //   const [clickingId, setClickingId] = useState<number | null>(null);

// //   if (!data || data.length === 0) return null;

// //   const displayItems = data.slice(0, 5);

// //   const handleCropClick = (cropName: string, id: number) => {
// //     // 1. Trigger Haptic Feedback (Android/Supported Devices)
// //     // if (typeof navigator !== 'undefined' && navigator.vibrate) {
// //     //     navigator.vibrate(50); // 50ms tactile buzz
// //     // }
// //     if (typeof navigator !== 'undefined' && navigator.vibrate) {
// //         // [!code ++] Add this log for testing
// //         console.log("📳 Haptic Vibrate Triggered!"); 
        
// //         const success = navigator.vibrate([60, 30, 60]); // Returns true if hardware supports it
// //         console.log("Vibration success:", success); 
// //     } else {
// //         console.log("🔕 Haptics not supported on this device.");
// //     }

// //     // 2. Set Visual Pop State
// //     setClickingId(id);

// //     // 3. Navigate
// //     router.push(`/shop?crop=${encodeURIComponent(cropName)}`);
// //   };

// //   return (
// //     <section className="w-full bg-white flex justify-center items-center relative overflow-hidden font-jakarta">
// //       <div className="w-full h-auto lg:h-[600px] relative pb-12 lg:pb-0"> 
// //         <div className="w-full max-w-[1289px] h-full mx-auto px-4 xl:px-0 relative flex flex-col items-center lg:block">
            
// //             {/* Header */}
// //             {/* [!code note] Kept the top margin as is per desktop requirement, but it can be adjusted if needed */}
// //             <div className="mt-[48px] flex flex-col items-center text-center lg:absolute lg:top-[80px] lg:w-full lg:flex-row lg:justify-between lg:items-start lg:mt-0 lg:text-left">
// //                 <div className="flex flex-col items-center lg:items-start lg:w-[378px]">
// //                     <h2 className="text-[#000000] mb-2 lg:mb-4" style={{ fontFamily: '"Google Sans", sans-serif', fontWeight: 500 }}>
// //                         <span className="block lg:hidden text-[20px] leading-[100%]">{title || "Products According to Crops"}</span>
// //                         <span className="hidden lg:block text-[28px] leading-[100%]">{title || "Products According to Crops"}</span>
// //                     </h2>
// //                     <p className="text-[#4D4D4D]" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: '14px', fontWeight: 600, lineHeight: '26px', letterSpacing: '0.01em', textAlign: 'center' }}>
// //                         <span className="block lg:hidden w-[283px]">Winter-wise Farming: Curated for Crops, Carefully Chosen for You.</span>
// //                         <span className="hidden lg:block text-sm font-normal text-gray-600 text-left leading-relaxed w-full">Winter-wise Farming: Curated for Crops,<br />Carefully Chosen for You.</span>
// //                     </p>
// //                 </div>
// //                 <button 
// //                   onClick={() => router.push('/shop')}
// //                   className="hidden lg:flex items-center gap-2 bg-[#003C22] text-white px-6 py-3 rounded-lg hover:bg-emerald-900 transition-colors"
// //                 >
// //                     <span className="font-medium text-sm">View All</span>
// //                     <ArrowRight size={16} />
// //                 </button>
// //             </div>

// //             {/* Grid */}
// //             <div className="lg:absolute lg:top-[220px] lg:w-full lg:flex lg:justify-between mt-8 lg:mt-0 grid grid-cols-2 gap-x-3 gap-y-8 w-full max-w-[370px] lg:max-w-none">
// //                 {displayItems.map((crop, index) => {
// //                     const visual = BLOB_IMAGES[index % BLOB_IMAGES.length];
// //                     const isClicked = clickingId === crop.crop_id;

// //                     return (
// //                         <div 
// //                           key={crop.crop_id} 
// //                           onClick={() => handleCropClick(crop.crop_name, crop.crop_id)}
// //                           className={`flex flex-col items-center gap-2 lg:gap-4 group cursor-pointer ${index === 4 ? 'col-span-2 flex items-center justify-center' : ''}`}
// //                           // [!code ++] Removed default touch highlight to let our animation shine
// //                           style={{ WebkitTapHighlightColor: 'transparent' }}
// //                         >
// //                             {/* [!code highlight] Converted div to motion.div for animation */}
// //                             <motion.div 
// //                                 animate={isClicked ? { scale: 1.05, filter: 'brightness(1.05)' } : { scale: 1, filter: 'brightness(1)' }}
// //                                 transition={{ type: "spring", stiffness: 300, damping: 20 }}
// //                                 className="
// //                                   relative flex justify-center items-center transition-transform duration-300 group-hover:scale-105
// //                                   /* [!code highlight] RESPONSIVE SIZING LOGIC */
// //                                   /* Mobile: Use fluid width (w-full) with aspect ratio to maintain shape */
// //                                   w-full aspect-square 
// //                                   /* Mobile: Cap the width at 177px so it doesn't look huge on mid-size phones */
// //                                   max-w-[177px] 
                                  
// //                                   /* Desktop: Enforce fixed dimensions exactly as before */
// //                                   lg:w-[224px] lg:h-[224px] lg:max-w-none lg:aspect-auto
// //                                 "
// //                             >
// //                                 <div className="absolute inset-0 z-0">
// //                                     <img src={visual.bg} alt="" className={`w-full h-full object-contain ${visual.opacity}`} />
// //                                 </div>
                                
// //                                 {/* Inner Icon Sizing */}
// //                                 <div className="
// //                                   relative z-10 
// //                                   /* Mobile: 68% of parent container (approx 120px/177px ratio) to scale perfectly */
// //                                   w-[68%] h-[68%] 
                                  
// //                                   /* Desktop: Fixed dimensions */
// //                                   lg:w-[180px] lg:h-[180px]
// //                                 ">
// //                                     <img src={crop.icon_url} alt={crop.crop_name} className="w-full h-full object-contain drop-shadow-md" />
// //                                 </div>
// //                             </motion.div>
                            
// //                             <span className="lg:text-[#000000] lg:text-lg group-hover:text-[#003C22] transition-colors" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 500, fontSize: '14px', lineHeight: '100%', textAlign: 'center', color: '#003C22' }}>
// //                                 {crop.crop_name}
// //                             </span>
// //                         </div>
// //                     );
// //                 })}
// //             </div>

// //             {/* Mobile View All */}
// //             <div className="lg:hidden mt-12 flex justify-center w-full">
// //                 <button 
// //                   onClick={() => router.push('/shop')}
// //                   className="flex items-center justify-center gap-1 bg-[#003C22] text-white hover:bg-emerald-900 transition-colors shadow-sm" style={{ width: '113px', height: '40px', borderRadius: '8px' }}>
// //                     <span style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 600, fontSize: '14px', lineHeight: '100%' }}>View All</span>
// //                     <ArrowRight size={16} />
// //                 </button>
// //             </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default ProductsAccordingToCrop;

// // 'use client';

// // import React, { useState } from 'react';
// // import { ArrowRight } from 'lucide-react';
// // import { ApiCrop } from '@/types/homeApi';
// // import { useRouter } from 'next/navigation';
// // import { motion } from 'framer-motion';

// // interface ProductsAccordingToCropProps {
// //   data: ApiCrop[];
// //   title?: string;
// //   subtitle?: string; // [!code ++]
// // }

// // const BLOB_IMAGES = [
// //   { bg: '/Home/Crop/1.png', opacity: 'opacity-100' },
// //   { bg: '/Home/Crop/2.png', opacity: 'opacity-40' },
// //   { bg: '/Home/Crop/3.png', opacity: 'opacity-40' },
// //   { bg: '/Home/Crop/4.png', opacity: 'opacity-40' },
// //   { bg: '/Home/Crop/5.png', opacity: 'opacity-40' },
// // ];

// // const ProductsAccordingToCrop = ({ data, title, subtitle }: ProductsAccordingToCropProps) => {
// //   const router = useRouter();
// //   const [clickingId, setClickingId] = useState<number | null>(null);

// //   if (!data || data.length === 0) return null;

// //   const displayItems = data.slice(0, 5);

// //   const handleCropClick = (cropName: string, id: number) => {
// //     if (typeof navigator !== 'undefined' && navigator.vibrate) {
// //         navigator.vibrate([60, 30, 60]); 
// //     }
// //     setClickingId(id);
// //     router.push(`/shop?crop=${encodeURIComponent(cropName)}`);
// //   };

// //   // [!code ++] New Handler: Selects all 5 displayed crops and applies them as filters
// //   const handleViewAll = () => {
// //     const params = new URLSearchParams();
// //     displayItems.forEach((crop) => {
// //       params.append('crop', crop.crop_name);
// //     });
// //     router.push(`/shop?${params.toString()}`);
// //   };

// //   return (
// //     <section className="w-full bg-white flex justify-center items-center relative overflow-hidden font-jakarta">
// //       <div className="w-full h-auto lg:h-[600px] relative pb-12 lg:pb-0"> 
// //         <div className="w-full max-w-[1289px] h-full mx-auto px-4 xl:px-0 relative flex flex-col items-center lg:block">
            
// //             {/* Header */}
// //             <div className="mt-[48px] flex flex-col items-center text-center lg:absolute lg:top-[80px] lg:w-full lg:flex-row lg:justify-between lg:items-start lg:mt-0 lg:text-left">
// //                 <div className="flex flex-col items-center lg:items-start lg:w-[378px]">
// //                     <h2 className="text-[#000000] mb-2 lg:mb-4" style={{ fontFamily: '"Google Sans", sans-serif', fontWeight: 500 }}>
// //                         <span className="block lg:hidden text-[20px] leading-[100%]">{title || "Products According to Crops"}</span>
// //                         <span className="hidden lg:block text-[28px] leading-[100%]">{title || "Products According to Crops"}</span>
// //                     </h2>
// //                     <p className="text-[#4D4D4D]" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: '14px', fontWeight: 600, lineHeight: '26px', letterSpacing: '0.01em', textAlign: 'center' }}>
// //                         <span className="block lg:hidden w-[283px]">{subtitle || "Winter-wise Farming: Curated for Crops, Carefully Chosen for You."}</span>
// //                         <span className="hidden lg:block text-sm font-normal text-gray-600 text-left leading-relaxed w-full">{subtitle || "Winter-wise Farming: Curated for Crops, Carefully Chosen for You."}</span>
// //                     </p>
// //                 </div>
                
// //                 {/* Desktop View All Button */}
// //                 <button 
// //                   onClick={handleViewAll} // [!code highlight] Updated Handler
// //                   className="hidden lg:flex items-center gap-2 bg-[#003C22] text-white px-6 py-3 rounded-lg hover:bg-emerald-900 transition-colors"
// //                 >
// //                     <span className="font-medium text-sm">View All</span>
// //                     <ArrowRight size={16} />
// //                 </button>
// //             </div>

// //             {/* Grid */}
// //             <div className="lg:absolute lg:top-[220px] lg:w-full lg:flex lg:justify-between mt-8 lg:mt-0 grid grid-cols-2 gap-x-3 gap-y-8 w-full max-w-[370px] lg:max-w-none">
// //                 {displayItems.map((crop, index) => {
// //                     const visual = BLOB_IMAGES[index % BLOB_IMAGES.length];
// //                     const isClicked = clickingId === crop.crop_id;

// //                     return (
// //                         <div 
// //                           key={crop.crop_id} 
// //                           onClick={() => handleCropClick(crop.crop_name, crop.crop_id)}
// //                           className={`flex flex-col items-center gap-2 lg:gap-4 group cursor-pointer ${index === 4 ? 'col-span-2 flex items-center justify-center' : ''}`}
// //                           style={{ WebkitTapHighlightColor: 'transparent' }}
// //                         >
// //                             <motion.div 
// //                                 animate={isClicked ? { scale: 1.05, filter: 'brightness(1.05)' } : { scale: 1, filter: 'brightness(1)' }}
// //                                 transition={{ type: "spring", stiffness: 300, damping: 20 }}
// //                                 className="
// //                                   relative flex justify-center items-center transition-transform duration-300 group-hover:scale-105
// //                                   w-full aspect-square 
// //                                   max-w-[177px] 
// //                                   lg:w-[224px] lg:h-[224px] lg:max-w-none lg:aspect-auto
// //                                 "
// //                             >
// //                                 <div className="absolute inset-0 z-0">
// //                                     <img src={visual.bg} alt="" className={`w-full h-full object-contain ${visual.opacity}`} />
// //                                 </div>
                                
// //                                 <div className="
// //                                   relative z-10 
// //                                   w-[68%] h-[68%] 
// //                                   lg:w-[180px] lg:h-[180px]
// //                                 ">
// //                                     <img src={crop.icon_url} alt={crop.crop_name} className="w-full h-full object-contain drop-shadow-md" />
// //                                 </div>
// //                             </motion.div>
                            
// //                             <span className="lg:text-[#000000] lg:text-lg group-hover:text-[#003C22] transition-colors" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 500, fontSize: '14px', lineHeight: '100%', textAlign: 'center', color: '#003C22' }}>
// //                                 {crop.crop_name}
// //                             </span>
// //                         </div>
// //                     );
// //                 })}
// //             </div>

// //             {/* Mobile View All Button */}
// //             <div className="lg:hidden mt-12 flex justify-center w-full">
// //                 <button 
// //                   onClick={handleViewAll} // [!code highlight] Updated Handler
// //                   className="flex items-center justify-center gap-1 bg-[#003C22] text-white hover:bg-emerald-900 transition-colors shadow-sm" style={{ width: '113px', height: '40px', borderRadius: '8px' }}>
// //                     <span style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 600, fontSize: '14px', lineHeight: '100%' }}>View All</span>
// //                     <ArrowRight size={16} />
// //                 </button>
// //             </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // export default ProductsAccordingToCrop;
// 'use client';

// import React, { useState } from 'react';
// import { ArrowRight } from 'lucide-react';
// import { ApiCrop } from '@/types/homeApi';
// import { useRouter } from 'next/navigation';
// import { motion } from 'framer-motion';

// interface ProductsAccordingToCropProps {
//   data: ApiCrop[];
//   title?: string;
//   subtitle?: string;
// }

// const BLOB_IMAGES = [
//   { bg: '/Home/Crop/1.png', opacity: 'opacity-100' },
//   { bg: '/Home/Crop/2.png', opacity: 'opacity-40' },
//   { bg: '/Home/Crop/3.png', opacity: 'opacity-40' },
//   { bg: '/Home/Crop/4.png', opacity: 'opacity-40' },
//   { bg: '/Home/Crop/5.png', opacity: 'opacity-40' },
// ];

// const ProductsAccordingToCrop = ({ data, title, subtitle }: ProductsAccordingToCropProps) => {
//   const router = useRouter();
//   const [clickingId, setClickingId] = useState<number | null>(null);

//   if (!data || data.length === 0) return null;

//   const displayItems = data.slice(0, 5);

//   const handleCropClick = (cropName: string, id: number) => {
//     if (typeof navigator !== 'undefined' && navigator.vibrate) {
//         navigator.vibrate([60, 30, 60]); 
//     }
//     setClickingId(id);
//     router.push(`/shop?crop=${encodeURIComponent(cropName)}`);
//   };

//   const handleViewAll = () => {
//     const params = new URLSearchParams();
//     displayItems.forEach((crop) => {
//       params.append('crop', crop.crop_name);
//     });
//     router.push(`/shop?${params.toString()}`);
//   };

//   return (
//     <section className="w-full bg-white flex justify-center items-center relative overflow-hidden font-jakarta">
//       <div className="w-full h-auto lg:h-[600px] relative pb-12 lg:pb-0"> 
//         <div className="w-full max-w-[1289px] h-full mx-auto px-4 xl:px-0 relative flex flex-col items-center lg:block">
            
//             {/* Header */}
//             <div className="mt-[48px] flex flex-col items-center text-center lg:absolute lg:top-[80px] lg:w-full lg:flex-row lg:justify-between lg:items-start lg:mt-0 lg:text-left">
//                 <div className="flex flex-col items-center lg:items-start lg:w-[378px]">
//                     {/* Dynamic Title with Responsive Typography */}
//                     <h2 
//                       className="text-[#000000] mb-2 lg:mb-4 text-[20px] lg:text-[28px] font-medium leading-[100%] tracking-[0]" 
//                       style={{ fontFamily: '"Google Sans", sans-serif' }}
//                     >
//                         {title || "Products According to Crops"}
//                     </h2>
                    
//                     {/* Dynamic Subtitle with Responsive Typography */}
//                     <p 
//                       className="text-[#4D4D4D] text-[14px] lg:text-[15px] font-semibold leading-[26px] tracking-[0.01em] font-jakarta max-w-[283px] lg:max-w-full"
//                     >
//                         {subtitle || "Winter-wise Farming: Curated for Crops, Carefully Chosen for You."}
//                     </p>
//                 </div>
                
//                 {/* Desktop View All Button */}
//                 <button 
//                   onClick={handleViewAll}
//                   className="hidden lg:flex items-center gap-2 bg-[#003C22] text-white px-6 py-3 rounded-lg hover:bg-emerald-900 transition-colors"
//                 >
//                     <span className="font-medium text-sm">View All</span>
//                     <ArrowRight size={16} />
//                 </button>
//             </div>

//             {/* Grid */}
//             <div className="lg:absolute lg:top-[220px] lg:w-full lg:flex lg:justify-between mt-8 lg:mt-0 grid grid-cols-2 gap-x-3 gap-y-8 w-full max-w-[370px] lg:max-w-none">
//                 {displayItems.map((crop, index) => {
//                     const visual = BLOB_IMAGES[index % BLOB_IMAGES.length];
//                     const isClicked = clickingId === crop.crop_id;

//                     return (
//                         <div 
//                           key={crop.crop_id} 
//                           onClick={() => handleCropClick(crop.crop_name, crop.crop_id)}
//                           className={`flex flex-col items-center gap-2 lg:gap-4 group cursor-pointer ${index === 4 ? 'col-span-2 flex items-center justify-center' : ''}`}
//                           style={{ WebkitTapHighlightColor: 'transparent' }}
//                         >
//                             <motion.div 
//                                 animate={isClicked ? { scale: 1.05, filter: 'brightness(1.05)' } : { scale: 1, filter: 'brightness(1)' }}
//                                 transition={{ type: "spring", stiffness: 300, damping: 20 }}
//                                 className="
//                                   relative flex justify-center items-center transition-transform duration-300 group-hover:scale-105
//                                   w-full aspect-square 
//                                   max-w-[177px] 
//                                   lg:w-[224px] lg:h-[224px] lg:max-w-none lg:aspect-auto
//                                 "
//                             >
//                                 <div className="absolute inset-0 z-0">
//                                     <img src={visual.bg} alt="" className={`w-full h-full object-contain ${visual.opacity}`} />
//                                 </div>
                                
//                                 <div className="
//                                   relative z-10 
//                                   w-[68%] h-[68%] 
//                                   lg:w-[180px] lg:h-[180px]
//                                 ">
//                                     <img src={crop.icon_url} alt={crop.crop_name} className="w-full h-full object-contain drop-shadow-md" />
//                                 </div>
//                             </motion.div>
                            
//                             <span className="lg:text-[#000000] lg:text-lg group-hover:text-[#003C22] transition-colors" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 500, fontSize: '14px', lineHeight: '100%', textAlign: 'center', color: '#003C22' }}>
//                                 {crop.crop_name}
//                             </span>
//                         </div>
//                     );
//                 })}
//             </div>

//             {/* Mobile View All Button */}
//             <div className="lg:hidden mt-12 flex justify-center w-full">
//                 <button 
//                   onClick={handleViewAll}
//                   className="flex items-center justify-center gap-1 bg-[#003C22] text-white hover:bg-emerald-900 transition-colors shadow-sm" style={{ width: '113px', height: '40px', borderRadius: '8px' }}>
//                     <span style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 600, fontSize: '14px', lineHeight: '100%' }}>View All</span>
//                     <ArrowRight size={16} />
//                 </button>
//             </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ProductsAccordingToCrop;
// 'use client';

// import React, { useState } from 'react';
// import { ArrowRight } from 'lucide-react';
// import { ApiCrop } from '@/types/homeApi';
// import { useRouter } from 'next/navigation';
// import { motion } from 'framer-motion';

// interface ProductsAccordingToCropProps {
//   data: ApiCrop[];
//   title?: string;
//   subtitle?: string;
// }

// const BLOB_IMAGES = [
//   { bg: '/Home/Crop/1.png', opacity: 'opacity-100' },
//   { bg: '/Home/Crop/2.png', opacity: 'opacity-40' },
//   { bg: '/Home/Crop/3.png', opacity: 'opacity-40' },
//   { bg: '/Home/Crop/4.png', opacity: 'opacity-40' },
//   { bg: '/Home/Crop/5.png', opacity: 'opacity-40' },
// ];

// const ProductsAccordingToCrop = ({ data, title, subtitle }: ProductsAccordingToCropProps) => {
//   const router = useRouter();
//   const [clickingId, setClickingId] = useState<number | null>(null);

//   if (!data || data.length === 0) return null;

//   const displayItems = data.slice(0, 5);

//   const handleCropClick = (cropName: string, id: number) => {
//     if (typeof navigator !== 'undefined' && navigator.vibrate) {
//         navigator.vibrate([60, 30, 60]); 
//     }
//     setClickingId(id);
//     router.push(`/shop?crop=${encodeURIComponent(cropName)}`);
//   };

//   const handleViewAll = () => {
//     const params = new URLSearchParams();
//     displayItems.forEach((crop) => {
//       params.append('crop', crop.crop_name);
//     });
//     router.push(`/shop?${params.toString()}`);
//   };

//   return (
//     <section className="w-full bg-white flex justify-center items-center relative overflow-hidden font-jakarta">
//       <div className="w-full h-auto lg:h-[600px] relative pb-12 lg:pb-0"> 
//         <div className="w-full max-w-[1289px] h-full mx-auto px-4 xl:px-0 relative flex flex-col items-center lg:block">
            
//             {/* Header */}
//             <div className="mt-[48px] flex flex-col items-center text-center lg:absolute lg:top-[80px] lg:w-full lg:flex-row lg:justify-between lg:items-start lg:mt-0 lg:text-left">
//                 <div className="flex flex-col items-center lg:items-start lg:w-[378px]">
//                     {/* Dynamic Title with Responsive Typography */}
//                     <h2 
//                       className="text-[#000000] mb-2 lg:mb-4 text-[20px] lg:text-[28px] font-medium leading-[100%] tracking-[0]" 
//                       style={{ fontFamily: '"Google Sans", sans-serif' }}
//                     >
//                         {title || "Products According to Crops"}
//                     </h2>
                    
//                     {/* Dynamic Subtitle with Responsive Typography */}
//                     <p 
//                       className="text-[#4D4D4D] text-[14px] lg:text-[15px] font-semibold leading-[26px] tracking-[0.01em] font-jakarta max-w-[283px] lg:max-w-full"
//                     >
//                         {subtitle || "Winter-wise Farming: Curated for Crops, Carefully Chosen for You."}
//                     </p>
//                 </div>
                
//                 {/* Desktop View All Button */}
//                 <button 
//                   onClick={handleViewAll}
//                   className="hidden lg:flex items-center gap-2 bg-[#003C22] text-white px-6 py-3 rounded-lg hover:bg-emerald-900 transition-colors"
//                 >
//                     <span className="font-medium text-sm">View All</span>
//                     <ArrowRight size={16} />
//                 </button>
//             </div>

//             {/* Grid */}
//             <div className="lg:absolute lg:top-[220px] lg:w-full lg:flex lg:justify-between mt-8 lg:mt-0 grid grid-cols-2 gap-x-3 gap-y-8 w-full max-w-[370px] lg:max-w-none">
//                 {displayItems.map((crop, index) => {
//                     const visual = BLOB_IMAGES[index % BLOB_IMAGES.length];
//                     const isClicked = clickingId === crop.crop_id;

//                     return (
//                         <div 
//                           key={crop.crop_id} 
//                           onClick={() => handleCropClick(crop.crop_name, crop.crop_id)}
//                           className={`flex flex-col items-center gap-2 lg:gap-4 group cursor-pointer ${index === 4 ? 'col-span-2 flex items-center justify-center' : ''}`}
//                           style={{ WebkitTapHighlightColor: 'transparent' }}
//                         >
//                             <motion.div 
//                                 animate={isClicked ? { scale: 1.05, filter: 'brightness(1.05)' } : { scale: 1, filter: 'brightness(1)' }}
//                                 transition={{ type: "spring", stiffness: 300, damping: 20 }}
//                                 className="
//                                   relative flex justify-center items-center transition-transform duration-300 group-hover:scale-105
//                                   w-full aspect-square 
//                                   max-w-[177px] 
//                                   lg:w-[224px] lg:h-[224px] lg:max-w-none lg:aspect-auto
//                                 "
//                             >
//                                 <div className="absolute inset-0 z-0">
//                                     <img src={visual.bg} alt="" className={`w-full h-full object-contain ${visual.opacity}`} />
//                                 </div>
                                
//                                 <div className="
//                                   relative z-10 
//                                   w-[68%] h-[68%] 
//                                   lg:w-[180px] lg:h-[180px]
//                                 ">
//                                     <img src={crop.icon_url} alt={crop.crop_name} className="w-full h-full object-contain drop-shadow-md" />
//                                 </div>
//                             </motion.div>
                            
//                             <span 
//                                 className="lg:text-[#000000] lg:text-lg group-hover:text-[#003C22] transition-colors" 
//                                 style={{ 
//                                     fontFamily: '"Plus Jakarta Sans", sans-serif', 
//                                     // [!code changed] Updated fontWeight to 700 (Bold). Change this number to adjust weight (e.g., 600, 800)
//                                     fontWeight: 700, 
//                                     fontSize: '16px', 
//                                     lineHeight: '100%', 
//                                     textAlign: 'center', 
//                                     color: '#003C22' 
//                                 }}
//                             >
//                                 {crop.crop_name}
//                             </span>
//                         </div>
//                     );
//                 })}
//             </div>

//             {/* Mobile View All Button */}
//             <div className="lg:hidden mt-12 flex justify-center w-full">
//                 <button 
//                   onClick={handleViewAll}
//                   className="flex items-center justify-center gap-1 bg-[#003C22] text-white hover:bg-emerald-900 transition-colors shadow-sm" style={{ width: '113px', height: '40px', borderRadius: '8px' }}>
//                     <span style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 600, fontSize: '14px', lineHeight: '100%' }}>View All</span>
//                     <ArrowRight size={16} />
//                 </button>
//             </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ProductsAccordingToCrop;

'use client';

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { ApiCrop } from '@/types/homeApi';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface ProductsAccordingToCropProps {
  data: ApiCrop[];
  title?: string;
  subtitle?: string;
}

const BLOB_IMAGES = [
  { bg: '/Home/Crop/1.png', opacity: 'opacity-100' },
  { bg: '/Home/Crop/2.png', opacity: 'opacity-40' },
  { bg: '/Home/Crop/3.png', opacity: 'opacity-40' },
  { bg: '/Home/Crop/4.png', opacity: 'opacity-40' },
  { bg: '/Home/Crop/5.png', opacity: 'opacity-40' },
];

const ProductsAccordingToCrop = ({ data, title, subtitle }: ProductsAccordingToCropProps) => {
  const router = useRouter();
  const [clickingId, setClickingId] = useState<number | null>(null);

  if (!data || data.length === 0) return null;

  const displayItems = data.slice(0, 5);

  const handleCropClick = (cropName: string, id: number) => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate([60, 30, 60]); 
    }
    setClickingId(id);
    router.push(`/shop?crop=${encodeURIComponent(cropName)}`);
  };

  const handleViewAll = () => {
    const params = new URLSearchParams();
    displayItems.forEach((crop) => {
      params.append('crop', crop.crop_name);
    });
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <section className="w-full bg-white flex justify-center items-center relative overflow-hidden font-jakarta">
      <div className="w-full h-auto lg:h-[600px] relative pb-12 lg:pb-0"> 
        <div className="w-full max-w-[1289px] h-full mx-auto px-4 xl:px-0 relative flex flex-col items-center lg:block">
            
            {/* Header */}
            <div className="mt-[48px] flex flex-col items-center text-center lg:absolute lg:top-[80px] lg:w-full lg:flex-row lg:justify-between lg:items-start lg:mt-0 lg:text-left">
                <div className="flex flex-col items-center lg:items-start lg:w-[378px]">
                    <h2 
                      className="text-[#000000] mb-2 lg:mb-4 text-[20px] lg:text-[28px] font-bold leading-[100%] tracking-[0]" 
                      style={{ fontFamily: '"Google Sans", sans-serif' }}
                    >
                        {title || "Products According to Crops"}
                    </h2>
                    
                    <p 
                      className="text-[#4D4D4D] text-[14px] lg:text-[15px] font-semibold leading-[26px] tracking-[0.01em] font-jakarta max-w-[283px] lg:max-w-full"
                    >
                        {subtitle || "Winter-wise Farming: Curated for Crops, Carefully Chosen for You."}
                    </p>
                </div>
                
                <button 
                  onClick={handleViewAll}
                  className="hidden lg:flex items-center gap-2 bg-[#003C22] text-white px-6 py-3 rounded-lg hover:bg-emerald-900 transition-colors"
                >
                    <span className="font-medium text-sm">View All</span>
                    <ArrowRight size={16} />
                </button>
            </div>

            {/* Grid Container */}
            <div className="
                lg:absolute lg:top-[220px] lg:w-full mt-8 lg:mt-0 
                grid grid-cols-2 
                md:grid-cols-3
                lg:grid-cols-5
                gap-x-3 gap-y-8 lg:gap-x-6
                w-full 
                max-w-[370px] 
                md:max-w-[700px] 
                lg:max-w-none
            ">
                {displayItems.map((crop, index) => {
                    const visual = BLOB_IMAGES[index % BLOB_IMAGES.length];
                    const isClicked = clickingId === crop.crop_id;

                    return (
                        <div 
                          key={crop.crop_id} 
                          onClick={() => handleCropClick(crop.crop_name, crop.crop_id)}
                          className={`
                            flex flex-col items-center gap-2 lg:gap-4 group cursor-pointer 
                            ${index === 4 ? 'col-span-2 flex items-center justify-center' : ''}
                            ${index === 4 ? 'md:col-span-1' : ''}
                            ${index === 4 ? 'lg:col-span-1' : ''}
                          `}
                          style={{ WebkitTapHighlightColor: 'transparent' }}
                        >
                            <motion.div 
                                animate={isClicked ? { scale: 1.05, filter: 'brightness(1.05)' } : { scale: 1, filter: 'brightness(1)' }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className={`
                                  relative flex justify-center items-center transition-transform duration-300 group-hover:scale-105
                                  aspect-square 
                                  
                                  /* [!code highlight] FIX: Force 5th item to be exactly 1-column wide (50% - half gap) on mobile */
                                  ${index === 4 ? 'w-[calc(50%-6px)] md:w-full' : 'w-full'}
                                  
                                  max-w-[177px] 
                                  lg:max-w-[224px]
                                `}
                            >
                                <div className="absolute inset-0 z-0">
                                    <img src={visual.bg} alt="" className={`w-full h-full object-contain ${visual.opacity}`} />
                                </div>
                                
                                <div className="
                                  relative z-10 
                                  w-[80%] h-[80%] 
                                ">
                                    <img src={crop.icon_url} alt={crop.crop_name} className="w-full h-full object-contain drop-shadow-md" />
                                </div>
                            </motion.div>
                            
                            <span 
                                className="lg:text-[#000000] lg:text-lg group-hover:text-[#003C22] transition-colors" 
                                style={{ 
                                    fontFamily: '"Plus Jakarta Sans", sans-serif', 
                                    fontWeight: 700, 
                                    fontSize: '16px', 
                                    lineHeight: '100%', 
                                    textAlign: 'center', 
                                    color: '#003C22' 
                                }}
                            >
                                {crop.crop_name}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Mobile View All Button */}
            <div className="lg:hidden mt-12 flex justify-center w-full">
                <button 
                  onClick={handleViewAll}
                  className="flex items-center justify-center gap-1 bg-[#003C22] text-white hover:bg-emerald-900 transition-colors shadow-sm" style={{ width: '113px', height: '40px', borderRadius: '8px' }}>
                    <span style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', fontWeight: 600, fontSize: '14px', lineHeight: '100%' }}>View All</span>
                    <ArrowRight size={16} />
                </button>
            </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsAccordingToCrop;