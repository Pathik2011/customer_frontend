

// // 'use client';

// // import React, { useState, useRef } from 'react';
// // import { Quote, ArrowLeft, ArrowRight } from 'lucide-react';
// // import { motion } from 'framer-motion';
// // import { SeasonalProblemItem, ApiProduct } from '@/types/homeApi';
// // import { SeasonalProduct, SeasonalQuestion } from './types';
// // import SeasonalProductCard from './SeasonalProductCard';
// // import { useDraggableScroll } from '@/hooks/useDraggableScroll';

// // const scrollStyles = `
// //   .no-scrollbar::-webkit-scrollbar {
// //     display: none;
// //   }
// //   .no-scrollbar {
// //     -ms-overflow-style: none;
// //     scrollbar-width: none;
// //   }
// // `;

// // interface SeasonalSolutionsProps {
// //   data: SeasonalProblemItem[];
// //   title?: string;
// //   subtitle?: string; // [!code ++]
// // }

// // const SeasonalSolutions = ({ data, title, subtitle }: SeasonalSolutionsProps) => {
// //   const [activeQuestion, setActiveQuestion] = useState(0);
  
// //   const [hoverPrev, setHoverPrev] = useState(false);
// //   const [hoverNext, setHoverNext] = useState(false);

// //   const scrollRef = useRef<HTMLDivElement>(null);
// //   const productScrollRef = useRef<HTMLDivElement>(null);

// //   useDraggableScroll(scrollRef);
// //   useDraggableScroll(productScrollRef);

// //   if (!data || data.length === 0) return null;

// //   const questions: SeasonalQuestion[] = data.map(item => ({
// //     id: item.problem_id,
// //     text: item.question,
// //     desc: item.answer,
// //   }));

// //   const activeSolution = data[activeQuestion];
// //   const activeProductsRaw = activeSolution ? activeSolution.solutions : [];

// //   const displayProducts: SeasonalProduct[] = activeProductsRaw.map((p: ApiProduct) => ({
// //     id: p.product_id,
// //     name: p.product_name,
// //     brand: p.brand?.brand_name || '',
// //     image: p.image,
// //     variants: p.product_variants.map(v => ({
// //        product_variant_id: v.product_variant_id,
// //        size: v.size,
// //        uom: v.uom,
// //        price: v.price,
// //        discounted_price: v.discounted_price 
// //     }))
// //   }));

// //   const handleScroll = () => {
// //     if (scrollRef.current) {
// //       const { scrollLeft, clientWidth } = scrollRef.current;
// //       const index = Math.round(scrollLeft / clientWidth);
// //       if (index >= 0 && index < data.length) setActiveQuestion(index);
// //     }
// //   };

// //   const scrollToQuestion = (index: number) => {
// //     if (scrollRef.current) {
// //       scrollRef.current.scrollTo({ left: index * scrollRef.current.clientWidth, behavior: 'smooth' });
// //       setActiveQuestion(index);
// //     }
// //   };

// //   const handlePrev = () => {
// //     const prevIndex = (activeQuestion - 1 + data.length) % data.length;
// //     scrollToQuestion(prevIndex);
// //   };

// //   const handleNext = () => {
// //     const nextIndex = (activeQuestion + 1) % data.length;
// //     scrollToQuestion(nextIndex);
// //   };

// //   const arrowAnimation = (isHovered: boolean) => ({
// //     animate: isHovered
// //       ? { scale: 1, y: 0 }
// //       : {
// //           scale: [1, 1.2, 1],
// //           y: [0, -2, 0],
// //         },
// //     transition: {
// //       repeat: isHovered ? 0 : Infinity,
// //       repeatType: "loop" as const,
// //       duration: 1.2,
// //       ease: "easeInOut",
// //     }
// //   });

// //   return (
// //     <section className="w-full flex justify-center pt-12 pb-0 font-jakarta bg-white">
// //       <style>{scrollStyles}</style>
// //       <div className="w-full max-w-[1344px] h-auto lg:h-[702px] flex flex-col items-center relative px-4 lg:px-0">
        
// //         <h2 className="text-center text-[#000000] mb-6 lg:mb-10 text-2xl font-medium mt-4 lg:mt-10">
// //           {title || "Seasonal Problem & Solutions"}
// //         </h2>
// //         {/* Add Subtitle */}
// //         <p className="text-center text-gray-600 mb-6 max-w-2xl mx-auto -mt-4 lg:-mt-8 px-4 text-sm font-medium">
// //            {subtitle || "Winter-wise Farming: Curated for Crops, Carefully Chosen for You."}
// //         </p>
        
// //         {/* Outer Container */}
// //         <div className="
// //             relative flex flex-col lg:flex-row items-center 
// //             gap-1.5 lg:gap-0
// //             bg-[#FFF8D8] 
// //             w-full max-w-[369px] 
// //             h-auto min-h-[513px] rounded-[8px] py-2 lg:py-0
            
// //             /* [!code changed] Added lg:min-h-0 to reset the mobile 513px height */
// //             lg:w-full lg:max-w-[1344px] lg:h-[396px] lg:min-h-0 lg:rounded-[12px] lg:p-0
// //         ">
          
// //           {/* Question Panel */}
// //           <div className="
// //               relative shrink-0 flex flex-col justify-center items-center text-center overflow-hidden group
// //               bg-[#FFE989]
// //               w-[96%] max-w-[357px] 
// //               h-[240px] rounded-[8px] mt-0 lg:mt-0
// //               lg:w-[504px] lg:min-w-[504px] lg:h-[348px] lg:rounded-[12px] lg:ml-6
// //           ">
// //               <Quote className="absolute top-3 left-4 lg:top-0 lg:left-0 text-white fill-white pointer-events-none rotate-180 w-[35px] h-[27px] lg:w-10 lg:h-10" />
              
// //               <button 
// //                 onMouseEnter={() => setHoverPrev(true)}
// //                 onMouseLeave={() => setHoverPrev(false)}
// //                 onClick={(e) => { e.stopPropagation(); handlePrev(); }}
// //                 className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-10 p-2 hover:bg-white/20 rounded-full transition-colors"
// //                 aria-label="Previous"
// //               >
// //                 <motion.div {...arrowAnimation(hoverPrev)}>
// //                    <ArrowLeft className="text-[#003C22] w-6 h-6 lg:w-8 lg:h-8" />
// //                 </motion.div>
// //               </button>

// //               <button 
// //                 onMouseEnter={() => setHoverNext(true)}
// //                 onMouseLeave={() => setHoverNext(false)}
// //                 onClick={(e) => { e.stopPropagation(); handleNext(); }}
// //                 className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-10 p-2 hover:bg-white/20 rounded-full transition-colors"
// //                 aria-label="Next"
// //               >
// //                 <motion.div {...arrowAnimation(hoverNext)}>
// //                    <ArrowRight className="text-[#003C22] w-6 h-6 lg:w-8 lg:h-8" />
// //                 </motion.div>
// //               </button>

// //               <div 
// //                 ref={scrollRef}
// //                 onScroll={handleScroll}
// //                 className="flex w-full h-full overflow-x-auto snap-x snap-mandatory no-scrollbar items-center select-none"
// //               >
// //                 {questions.map((q) => (
// //                   <div key={q.id} className="min-w-full w-full flex-shrink-0 snap-center px-12 lg:px-20 flex flex-col justify-center items-center h-full pb-6">
                    
// //                     {/* MOBILE QUESTION TYPOGRAPHY */}
// //                     <h3 
// //                       className="text-[#000000] mb-3 lg:mb-4 lg:text-lg"
// //                       style={{
// //                         fontFamily: '"Plus Jakarta Sans", sans-serif',
// //                         fontWeight: 600,
// //                         fontSize: '14px',
// //                         lineHeight: '100%',
// //                         letterSpacing: '0%',
// //                         textAlign: 'center',
// //                       }}
// //                     >
// //                       {q.text}
// //                     </h3>
                    
// //                     {/* MOBILE ANSWER TYPOGRAPHY */}
// //                     <p 
// //                       className="text-[#000000]/80 px-2 lg:text-sm"
// //                       style={{
// //                         fontFamily: '"Plus Jakarta Sans", sans-serif',
// //                         fontWeight: 500,
// //                         fontSize: '13px',
// //                         lineHeight: '140%', 
// //                         letterSpacing: '0.01em',
// //                         textAlign: 'center',
// //                       }}
// //                     >
// //                       {q.desc}
// //                     </p>
// //                   </div>
// //                 ))}
// //               </div>
              
// //               <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
// //                 {questions.map((_, idx) => (
// //                   <button
// //                     key={idx}
// //                     onClick={(e) => { e.stopPropagation(); scrollToQuestion(idx); }}
// //                     className={`
// //                       h-2 rounded-full transition-all duration-300
// //                       ${activeQuestion === idx ? 'w-4 bg-[#003C22]' : 'w-2 bg-[#003C22]/30 hover:bg-[#003C22]/50'}
// //                     `}
// //                     aria-label={`Go to question ${idx + 1}`}
// //                   />
// //                 ))}
// //               </div>

// //               <Quote className="absolute bottom-3 right-4 lg:bottom-0 lg:right-0 text-white fill-white pointer-events-none w-[35px] h-[27px] lg:w-10 lg:h-10 opacity-50" />
// //           </div>

// //           {/* Product Slider Container */}
// //           <div className="flex-1 w-full overflow-visible lg:overflow-hidden flex items-center pl-0 lg:pl-6 pr-0 lg:pr-6 h-full pb-0 lg:pb-0">
// //              <div 
// //                ref={productScrollRef}
// //                className="flex gap-[3px] lg:gap-6 overflow-x-auto no-scrollbar px-[6px] lg:px-2 w-full snap-x snap-mandatory select-none items-center h-full py-2"
// //              >
// //                {displayProducts.length > 0 ? displayProducts.map((p, i) => (
// //                  <div key={`${p.id}-${i}`} className="snap-start shrink-0">
// //                    <SeasonalProductCard product={p} />
// //                  </div>
// //                )) : (
// //                  <div className="w-full text-center text-gray-500 italic">No products found for this issue.</div>
// //                )}
// //              </div>
// //           </div>

// //         </div>

// //       </div>
// //     </section>
// //   );
// // };

// // export default SeasonalSolutions;
// // 'use client';

// // import React, { useState, useRef } from 'react';
// // import { Quote, ArrowLeft, ArrowRight } from 'lucide-react';
// // import { motion } from 'framer-motion';
// // import { SeasonalProblemItem, ApiProduct } from '@/types/homeApi';
// // import { SeasonalProduct, SeasonalQuestion } from './types';
// // import SeasonalProductCard from './SeasonalProductCard';
// // import { useDraggableScroll } from '@/hooks/useDraggableScroll';

// // const scrollStyles = `
// //   .no-scrollbar::-webkit-scrollbar {
// //     display: none;
// //   }
// //   .no-scrollbar {
// //     -ms-overflow-style: none;
// //     scrollbar-width: none;
// //   }
// // `;

// // interface SeasonalSolutionsProps {
// //   data: SeasonalProblemItem[];
// //   title?: string;
// //   subtitle?: string;
// // }

// // const SeasonalSolutions = ({ data, title, subtitle }: SeasonalSolutionsProps) => {
// //   const [activeQuestion, setActiveQuestion] = useState(0);
  
// //   const [hoverPrev, setHoverPrev] = useState(false);
// //   const [hoverNext, setHoverNext] = useState(false);

// //   const scrollRef = useRef<HTMLDivElement>(null);
// //   const productScrollRef = useRef<HTMLDivElement>(null);

// //   useDraggableScroll(scrollRef);
// //   useDraggableScroll(productScrollRef);

// //   if (!data || data.length === 0) return null;

// //   const questions: SeasonalQuestion[] = data.map(item => ({
// //     id: item.problem_id,
// //     text: item.question,
// //     desc: item.answer,
// //   }));

// //   const activeSolution = data[activeQuestion];
// //   const activeProductsRaw = activeSolution ? activeSolution.solutions : [];

// //   const displayProducts: SeasonalProduct[] = activeProductsRaw.map((p: ApiProduct) => ({
// //     id: p.product_id,
// //     name: p.product_name,
// //     brand: p.brand?.brand_name || '',
// //     image: p.image,
// //     variants: p.product_variants.map(v => ({
// //        product_variant_id: v.product_variant_id,
// //        size: v.size,
// //        uom: v.uom,
// //        price: v.price,
// //        discounted_price: v.discounted_price 
// //     }))
// //   }));

// //   const handleScroll = () => {
// //     if (scrollRef.current) {
// //       const { scrollLeft, clientWidth } = scrollRef.current;
// //       const index = Math.round(scrollLeft / clientWidth);
// //       if (index >= 0 && index < data.length) setActiveQuestion(index);
// //     }
// //   };

// //   const scrollToQuestion = (index: number) => {
// //     if (scrollRef.current) {
// //       scrollRef.current.scrollTo({ left: index * scrollRef.current.clientWidth, behavior: 'smooth' });
// //       setActiveQuestion(index);
// //     }
// //   };

// //   const handlePrev = () => {
// //     const prevIndex = (activeQuestion - 1 + data.length) % data.length;
// //     scrollToQuestion(prevIndex);
// //   };

// //   const handleNext = () => {
// //     const nextIndex = (activeQuestion + 1) % data.length;
// //     scrollToQuestion(nextIndex);
// //   };

// //   const arrowAnimation = (isHovered: boolean) => ({
// //     animate: isHovered
// //       ? { scale: 1, y: 0 }
// //       : {
// //           scale: [1, 1.2, 1],
// //           y: [0, -2, 0],
// //         },
// //     transition: {
// //       repeat: isHovered ? 0 : Infinity,
// //       repeatType: "loop" as const,
// //       duration: 1.2,
// //       ease: "easeInOut",
// //     }
// //   });

// //   return (
// //     <section className="w-full flex justify-center pt-12 pb-0 font-jakarta bg-white">
// //       <style>{scrollStyles}</style>
// //       <div className="w-full max-w-[1344px] h-auto lg:h-[702px] flex flex-col items-center relative px-4 lg:px-0">
        
// //         {/* Header with Dynamic Typography */}
// //         <h2 
// //           className="text-center text-[#000000] mb-6 lg:mb-10 text-[20px] lg:text-[28px] font-bold leading-[100%] tracking-[0] mt-4 lg:mt-10"
// //           style={{ fontFamily: '"Google Sans", sans-serif' }}
// //         >
// //           {title || "Seasonal Problem & Solutions"}
// //         </h2>
        
// //         {/* Subtitle with Dynamic Typography */}
// //         <p 
// //           className="text-center text-[14px] lg:text-[15px] font-semibold leading-[26px] tracking-[0.01em] font-jakarta text-[#4D4D4D] mb-6 max-w-2xl mx-auto -mt-4 lg:-mt-8 px-4"
// //         >
// //            {subtitle || "Winter-wise Farming: Curated for Crops, Carefully Chosen for You."}
// //         </p>
        
// //         {/* Outer Container */}
// //         <div className="
// //             relative flex flex-col lg:flex-row items-center 
// //             gap-1.5 lg:gap-0
// //             bg-[#FFF8D8] 
// //             w-full max-w-[369px] 
// //             h-auto min-h-[513px] rounded-[8px] py-2 lg:py-0
// //             lg:w-full lg:max-w-[1344px] lg:h-[396px] lg:min-h-0 lg:rounded-[12px] lg:p-0
// //         ">
          
// //           {/* Question Panel */}
// //           <div className="
// //               relative shrink-0 flex flex-col justify-center items-center text-center overflow-hidden group
// //               bg-[#FFE989]
// //               w-[96%] max-w-[357px] 
// //               h-[240px] rounded-[8px] mt-0 lg:mt-0
// //               lg:w-[504px] lg:min-w-[504px] lg:h-[348px] lg:rounded-[12px] lg:ml-6
// //           ">
// //               <Quote className="absolute top-3 left-4 lg:top-0 lg:left-0 text-white fill-white pointer-events-none rotate-180 w-[35px] h-[27px] lg:w-10 lg:h-10" />
              
// //               <button 
// //                 onMouseEnter={() => setHoverPrev(true)}
// //                 onMouseLeave={() => setHoverPrev(false)}
// //                 onClick={(e) => { e.stopPropagation(); handlePrev(); }}
// //                 className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-10 p-2 hover:bg-white/20 rounded-full transition-colors"
// //                 aria-label="Previous"
// //               >
// //                 <motion.div {...arrowAnimation(hoverPrev)}>
// //                    <ArrowLeft className="text-[#003C22] w-6 h-6 lg:w-8 lg:h-8" />
// //                 </motion.div>
// //               </button>

// //               <button 
// //                 onMouseEnter={() => setHoverNext(true)}
// //                 onMouseLeave={() => setHoverNext(false)}
// //                 onClick={(e) => { e.stopPropagation(); handleNext(); }}
// //                 className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-10 p-2 hover:bg-white/20 rounded-full transition-colors"
// //                 aria-label="Next"
// //               >
// //                 <motion.div {...arrowAnimation(hoverNext)}>
// //                    <ArrowRight className="text-[#003C22] w-6 h-6 lg:w-8 lg:h-8" />
// //                 </motion.div>
// //               </button>

// //               <div 
// //                 ref={scrollRef}
// //                 onScroll={handleScroll}
// //                 className="flex w-full h-full overflow-x-auto snap-x snap-mandatory no-scrollbar items-center select-none"
// //               >
// //                 {questions.map((q) => (
// //                   <div key={q.id} className="min-w-full w-full flex-shrink-0 snap-center px-12 lg:px-20 flex flex-col justify-center items-center h-full pb-6">
                    
// //                     {/* MOBILE QUESTION TYPOGRAPHY */}
// //                     <h3 
// //                       className="text-[#000000] mb-3 lg:mb-4 lg:text-lg"
// //                       style={{
// //                         fontFamily: '"Plus Jakarta Sans", sans-serif',
// //                         fontWeight: 600,
// //                         fontSize: '14px',
// //                         lineHeight: '100%',
// //                         letterSpacing: '0%',
// //                         textAlign: 'center',
// //                       }}
// //                     >
// //                       {q.text}
// //                     </h3>
                    
// //                     {/* MOBILE ANSWER TYPOGRAPHY */}
// //                     <p 
// //                       className="text-[#000000]/80 px-2 lg:text-sm"
// //                       style={{
// //                         fontFamily: '"Plus Jakarta Sans", sans-serif',
// //                         fontWeight: 500,
// //                         fontSize: '13px',
// //                         lineHeight: '140%', 
// //                         letterSpacing: '0.01em',
// //                         textAlign: 'center',
// //                       }}
// //                     >
// //                       {q.desc}
// //                     </p>
// //                   </div>
// //                 ))}
// //               </div>
              
// //               <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
// //                 {questions.map((_, idx) => (
// //                   <button
// //                     key={idx}
// //                     onClick={(e) => { e.stopPropagation(); scrollToQuestion(idx); }}
// //                     className={`
// //                       h-2 rounded-full transition-all duration-300
// //                       ${activeQuestion === idx ? 'w-4 bg-[#003C22]' : 'w-2 bg-[#003C22]/30 hover:bg-[#003C22]/50'}
// //                     `}
// //                     aria-label={`Go to question ${idx + 1}`}
// //                   />
// //                 ))}
// //               </div>

// //               <Quote className="absolute bottom-3 right-4 lg:bottom-0 lg:right-0 text-white fill-white pointer-events-none w-[35px] h-[27px] lg:w-10 lg:h-10 opacity-50" />
// //           </div>

// //           {/* Product Slider Container */}
// //           <div className="flex-1 w-full overflow-visible lg:overflow-hidden flex items-center pl-0 lg:pl-6 pr-0 lg:pr-6 h-full pb-0 lg:pb-0">
// //              <div 
// //                ref={productScrollRef}
// //                className="flex gap-[3px] lg:gap-6 overflow-x-auto no-scrollbar px-[6px] lg:px-2 w-full snap-x snap-mandatory select-none items-center h-full py-2"
// //              >
// //                {displayProducts.length > 0 ? displayProducts.map((p, i) => (
// //                  <div key={`${p.id}-${i}`} className="snap-start shrink-0">
// //                    <SeasonalProductCard product={p} />
// //                  </div>
// //                )) : (
// //                  <div className="w-full text-center text-gray-500 italic">No products found for this issue.</div>
// //                )}
// //              </div>
// //           </div>

// //         </div>

// //       </div>
// //     </section>
// //   );
// // };

// // export default SeasonalSolutions;
// 'use client';

// import React, { useState, useRef } from 'react';
// import { Quote, ArrowLeft, ArrowRight } from 'lucide-react';
// import { motion } from 'framer-motion';
// import { SeasonalProblemItem, ApiProduct } from '@/types/homeApi';
// import { SeasonalProduct, SeasonalQuestion } from './types';
// import SeasonalProductCard from './SeasonalProductCard';
// import { useDraggableScroll } from '@/hooks/useDraggableScroll';

// const scrollStyles = `
//   .no-scrollbar::-webkit-scrollbar {
//     display: none;
//   }
//   .no-scrollbar {
//     -ms-overflow-style: none;
//     scrollbar-width: none;
//   }
// `;

// // [!code ++] META DATA: Easy configuration for Mobile Question Text
// const MOBILE_QUESTION_STYLE = {
//   fontFamily: '"Plus Jakarta Sans", sans-serif',
//   fontWeight: 600,
//   fontSize: '14px',
//   lineHeight: '150%', // [!code highlight] Increased from 100% to 150% for better multi-line spacing
//   letterSpacing: '0%',
//   textAlign: 'center' as const,
// };

// interface SeasonalSolutionsProps {
//   data: SeasonalProblemItem[];
//   title?: string;
//   subtitle?: string;
// }

// const SeasonalSolutions = ({ data, title, subtitle }: SeasonalSolutionsProps) => {
//   const [activeQuestion, setActiveQuestion] = useState(0);
  
//   const [hoverPrev, setHoverPrev] = useState(false);
//   const [hoverNext, setHoverNext] = useState(false);

//   const scrollRef = useRef<HTMLDivElement>(null);
//   const productScrollRef = useRef<HTMLDivElement>(null);

//   useDraggableScroll(scrollRef);
//   useDraggableScroll(productScrollRef);

//   if (!data || data.length === 0) return null;

//   const questions: SeasonalQuestion[] = data.map(item => ({
//     id: item.problem_id,
//     text: item.question,
//     desc: item.answer,
//   }));

//   const activeSolution = data[activeQuestion];
//   const activeProductsRaw = activeSolution ? activeSolution.solutions : [];

//   const displayProducts: SeasonalProduct[] = activeProductsRaw.map((p: ApiProduct) => ({
//     id: p.product_id,
//     name: p.product_name,
//     brand: p.brand?.brand_name || '',
//     image: p.image,
//     variants: p.product_variants.map(v => ({
//        product_variant_id: v.product_variant_id,
//        size: v.size,
//        uom: v.uom,
//        price: v.price,
//        discounted_price: v.discounted_price 
//     }))
//   }));

//   const handleScroll = () => {
//     if (scrollRef.current) {
//       const { scrollLeft, clientWidth } = scrollRef.current;
//       const index = Math.round(scrollLeft / clientWidth);
//       if (index >= 0 && index < data.length) setActiveQuestion(index);
//     }
//   };

//   const scrollToQuestion = (index: number) => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollTo({ left: index * scrollRef.current.clientWidth, behavior: 'smooth' });
//       setActiveQuestion(index);
//     }
//   };

//   const handlePrev = () => {
//     const prevIndex = (activeQuestion - 1 + data.length) % data.length;
//     scrollToQuestion(prevIndex);
//   };

//   const handleNext = () => {
//     const nextIndex = (activeQuestion + 1) % data.length;
//     scrollToQuestion(nextIndex);
//   };

//   const arrowAnimation = (isHovered: boolean) => ({
//     animate: isHovered
//       ? { scale: 1, y: 0 }
//       : {
//           scale: [1, 1.2, 1],
//           y: [0, -2, 0],
//         },
//     transition: {
//       repeat: isHovered ? 0 : Infinity,
//       repeatType: "loop" as const,
//       duration: 1.2,
//       ease: "easeInOut",
//     }
//   });

//   return (
//     <section className="w-full flex justify-center pt-12 pb-0 font-jakarta bg-white">
//       <style>{scrollStyles}</style>
//       <div className="w-full max-w-[1344px] h-auto lg:h-[702px] flex flex-col items-center relative px-4 lg:px-0">
        
//         {/* Header with Dynamic Typography */}
//         <h2 
//           className="text-center text-[#000000] mb-6 lg:mb-10 text-[20px] lg:text-[28px] font-bold leading-[100%] tracking-[0] mt-4 lg:mt-10"
//           style={{ fontFamily: '"Google Sans", sans-serif' }}
//         >
//           {title || "Seasonal Problem & Solutions"}
//         </h2>
        
//         {/* Subtitle with Dynamic Typography */}
//         <p 
//           className="text-center text-[14px] lg:text-[15px] font-semibold leading-[26px] tracking-[0.01em] font-jakarta text-[#4D4D4D] mb-6 max-w-2xl mx-auto -mt-4 lg:-mt-8 px-4"
//         >
//            {subtitle || "Winter-wise Farming: Curated for Crops, Carefully Chosen for You."}
//         </p>
        
//         {/* Outer Container */}
//         <div className="
//             relative flex flex-col lg:flex-row items-center 
//             gap-1.5 lg:gap-0
//             bg-[#FFF8D8] 
//             w-full max-w-[369px] 
//             h-auto min-h-[513px] rounded-[8px] py-2 lg:py-0
//             lg:w-full lg:max-w-[1344px] lg:h-[396px] lg:min-h-0 lg:rounded-[12px] lg:p-0
//         ">
          
//           {/* Question Panel */}
//           <div className="
//               relative shrink-0 flex flex-col justify-center items-center text-center overflow-hidden group
//               bg-[#FFE989]
//               w-[96%] max-w-[357px] 
//               h-[240px] rounded-[8px] mt-0 lg:mt-0
//               lg:w-[504px] lg:min-w-[504px] lg:h-[348px] lg:rounded-[12px] lg:ml-6
//           ">
//               <Quote className="absolute top-3 left-4 lg:top-0 lg:left-0 text-white fill-white pointer-events-none rotate-180 w-[35px] h-[27px] lg:w-10 lg:h-10" />
              
//               <button 
//                 onMouseEnter={() => setHoverPrev(true)}
//                 onMouseLeave={() => setHoverPrev(false)}
//                 onClick={(e) => { e.stopPropagation(); handlePrev(); }}
//                 className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-10 p-2 hover:bg-white/20 rounded-full transition-colors"
//                 aria-label="Previous"
//               >
//                 <motion.div {...arrowAnimation(hoverPrev)}>
//                    <ArrowLeft className="text-[#003C22] w-6 h-6 lg:w-8 lg:h-8" />
//                 </motion.div>
//               </button>

//               <button 
//                 onMouseEnter={() => setHoverNext(true)}
//                 onMouseLeave={() => setHoverNext(false)}
//                 onClick={(e) => { e.stopPropagation(); handleNext(); }}
//                 className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-10 p-2 hover:bg-white/20 rounded-full transition-colors"
//                 aria-label="Next"
//               >
//                 <motion.div {...arrowAnimation(hoverNext)}>
//                    <ArrowRight className="text-[#003C22] w-6 h-6 lg:w-8 lg:h-8" />
//                 </motion.div>
//               </button>

//               <div 
//                 ref={scrollRef}
//                 onScroll={handleScroll}
//                 className="flex w-full h-full overflow-x-auto snap-x snap-mandatory no-scrollbar items-center select-none"
//               >
//                 {questions.map((q) => (
//                   <div key={q.id} className="min-w-full w-full flex-shrink-0 snap-center px-12 lg:px-20 flex flex-col justify-center items-center h-full pb-6">
                    
//                     {/* MOBILE QUESTION TYPOGRAPHY - Updated with META DATA variable */}
//                     <h3 
//                       className="text-[#000000] mb-3 lg:mb-4 lg:text-lg"
//                       style={MOBILE_QUESTION_STYLE}
//                     >
//                       {q.text}
//                     </h3>
                    
//                     {/* MOBILE ANSWER TYPOGRAPHY */}
//                     <p 
//                       className="text-[#000000]/80 px-2 lg:text-sm"
//                       style={{
//                         fontFamily: '"Plus Jakarta Sans", sans-serif',
//                         fontWeight: 500,
//                         fontSize: '13px',
//                         lineHeight: '140%', 
//                         letterSpacing: '0.01em',
//                         textAlign: 'center',
//                       }}
//                     >
//                       {q.desc}
//                     </p>
//                   </div>
//                 ))}
//               </div>
              
//               <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
//                 {questions.map((_, idx) => (
//                   <button
//                     key={idx}
//                     onClick={(e) => { e.stopPropagation(); scrollToQuestion(idx); }}
//                     className={`
//                       h-2 rounded-full transition-all duration-300
//                       ${activeQuestion === idx ? 'w-4 bg-[#003C22]' : 'w-2 bg-[#003C22]/30 hover:bg-[#003C22]/50'}
//                     `}
//                     aria-label={`Go to question ${idx + 1}`}
//                   />
//                 ))}
//               </div>

//               <Quote className="absolute bottom-3 right-4 lg:bottom-0 lg:right-0 text-white fill-white pointer-events-none w-[35px] h-[27px] lg:w-10 lg:h-10 opacity-50" />
//           </div>

//           {/* Product Slider Container */}
//           <div className="flex-1 w-full overflow-visible lg:overflow-hidden flex items-center pl-0 lg:pl-6 pr-0 lg:pr-6 h-full pb-0 lg:pb-0">
//              <div 
//                ref={productScrollRef}
//                className="flex gap-[3px] lg:gap-6 overflow-x-auto no-scrollbar px-[6px] lg:px-2 w-full snap-x snap-mandatory select-none items-center h-full py-2"
//              >
//                {displayProducts.length > 0 ? displayProducts.map((p, i) => (
//                  <div key={`${p.id}-${i}`} className="snap-start shrink-0">
//                    <SeasonalProductCard product={p} />
//                  </div>
//                )) : (
//                  <div className="w-full text-center text-gray-500 italic">No products found for this issue.</div>
//                )}
//              </div>
//           </div>

//         </div>

//       </div>
//     </section>
//   );
// };

// export default SeasonalSolutions;

// 'use client';

// import React, { useState, useRef } from 'react';
// import { Quote, ArrowLeft, ArrowRight } from 'lucide-react';
// import { motion } from 'framer-motion';
// import { SeasonalProblemItem, ApiProduct } from '@/types/homeApi';
// import { SeasonalProduct, SeasonalQuestion } from './types';
// import SeasonalProductCard from './SeasonalProductCard';
// import { useDraggableScroll } from '@/hooks/useDraggableScroll';

// const scrollStyles = `
//   .no-scrollbar::-webkit-scrollbar {
//     display: none;
//   }
//   .no-scrollbar {
//     -ms-overflow-style: none;
//     scrollbar-width: none;
//   }
// `;

// interface SeasonalSolutionsProps {
//   data: SeasonalProblemItem[];
//   title?: string;
//   subtitle?: string;
// }

// const SeasonalSolutions = ({ data, title, subtitle }: SeasonalSolutionsProps) => {
//   const [activeQuestion, setActiveQuestion] = useState(0);
  
//   const [hoverPrev, setHoverPrev] = useState(false);
//   const [hoverNext, setHoverNext] = useState(false);

//   const scrollRef = useRef<HTMLDivElement>(null);
//   const productScrollRef = useRef<HTMLDivElement>(null);

//   useDraggableScroll(scrollRef);
//   useDraggableScroll(productScrollRef);

//   if (!data || data.length === 0) return null;

//   const questions: SeasonalQuestion[] = data.map(item => ({
//     id: item.problem_id,
//     text: item.question,
//     desc: item.answer,
//   }));

//   const activeSolution = data[activeQuestion];
//   const activeProductsRaw = activeSolution ? activeSolution.solutions : [];

//   const displayProducts: SeasonalProduct[] = activeProductsRaw.map((p: ApiProduct) => ({
//     id: p.product_id,
//     name: p.product_name,
//     brand: p.brand?.brand_name || '',
//     image: p.image,
//     variants: p.product_variants.map(v => ({
//        product_variant_id: v.product_variant_id,
//        size: v.size,
//        uom: v.uom,
//        price: v.price,
//        discounted_price: v.discounted_price 
//     }))
//   }));

//   const handleScroll = () => {
//     if (scrollRef.current) {
//       const { scrollLeft, clientWidth } = scrollRef.current;
//       const index = Math.round(scrollLeft / clientWidth);
//       if (index >= 0 && index < data.length) setActiveQuestion(index);
//     }
//   };

//   const scrollToQuestion = (index: number) => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollTo({ left: index * scrollRef.current.clientWidth, behavior: 'smooth' });
//       setActiveQuestion(index);
//     }
//   };

//   const handlePrev = () => {
//     const prevIndex = (activeQuestion - 1 + data.length) % data.length;
//     scrollToQuestion(prevIndex);
//   };

//   const handleNext = () => {
//     const nextIndex = (activeQuestion + 1) % data.length;
//     scrollToQuestion(nextIndex);
//   };

//   const arrowAnimation = (isHovered: boolean) => ({
//     animate: isHovered
//       ? { scale: 1, y: 0 }
//       : {
//           scale: [1, 1.2, 1],
//           y: [0, -2, 0],
//         },
//     transition: {
//       repeat: isHovered ? 0 : Infinity,
//       repeatType: "loop" as const,
//       duration: 1.2,
//       ease: "easeInOut",
//     }
//   });

//   return (
//     <section className="w-full flex justify-center pt-12 pb-12 lg:pb-16 font-jakarta bg-white">
//       <style>{scrollStyles}</style>
      
//       {/* Kept 'h-auto' to allow expansion */}
//       <div className="w-full max-w-[1344px] h-auto flex flex-col items-center relative px-4 lg:px-0">
        
//         {/* [!code changed] Reverted to Old Typography (Simple) */}
//         <h2 className="text-center text-[#000000] mb-6 lg:mb-10 text-2xl font-medium mt-4 lg:mt-10">
//           {title || "Seasonal Problem & Solutions"}
//         </h2>
        
//         {/* [!code changed] Reverted to Old Typography (Simple) */}
//         <p className="text-center text-gray-600 mb-6 max-w-2xl mx-auto -mt-4 lg:-mt-8 px-4 text-sm font-semibold">
//            {subtitle || "Winter-wise Farming: Curated for Crops, Carefully Chosen for You."}
//         </p>
        
//         {/* Outer Container */}
//         <div className="
//             relative flex flex-col lg:flex-row items-center 
//             gap-1.5 lg:gap-0
//             bg-[#FFF8D8] 
//             w-full max-w-[369px] 
//             h-auto min-h-[513px] rounded-[8px] py-2 lg:py-0
//             lg:w-full lg:max-w-[1344px] lg:h-[396px] lg:min-h-0 lg:rounded-[12px] lg:p-0
//         ">
          
//           {/* Question Panel */}
//           <div className="
//               relative shrink-0 flex flex-col justify-center items-center text-center overflow-hidden group
//               bg-[#FFE989]
//               w-[96%] max-w-[357px] 
//               h-[240px] rounded-[8px] mt-0 lg:mt-0
//               lg:w-[504px] lg:min-w-[504px] lg:h-[348px] lg:rounded-[12px] lg:ml-6
//           ">
//               <Quote className="absolute top-3 left-4 lg:top-0 lg:left-0 text-white fill-white pointer-events-none rotate-180 w-[35px] h-[27px] lg:w-10 lg:h-10" />
              
//               <button 
//                 onMouseEnter={() => setHoverPrev(true)}
//                 onMouseLeave={() => setHoverPrev(false)}
//                 onClick={(e) => { e.stopPropagation(); handlePrev(); }}
//                 className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-10 p-2 hover:bg-white/20 rounded-full transition-colors"
//                 aria-label="Previous"
//               >
//                 <motion.div {...arrowAnimation(hoverPrev)}>
//                    <ArrowLeft className="text-[#003C22] w-6 h-6 lg:w-8 lg:h-8" />
//                 </motion.div>
//               </button>

//               <button 
//                 onMouseEnter={() => setHoverNext(true)}
//                 onMouseLeave={() => setHoverNext(false)}
//                 onClick={(e) => { e.stopPropagation(); handleNext(); }}
//                 className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-10 p-2 hover:bg-white/20 rounded-full transition-colors"
//                 aria-label="Next"
//               >
//                 <motion.div {...arrowAnimation(hoverNext)}>
//                    <ArrowRight className="text-[#003C22] w-6 h-6 lg:w-8 lg:h-8" />
//                 </motion.div>
//               </button>

//               <div 
//                 ref={scrollRef}
//                 onScroll={handleScroll}
//                 className="flex w-full h-full overflow-x-auto snap-x snap-mandatory no-scrollbar items-center select-none"
//               >
//                 {questions.map((q) => (
//                   <div key={q.id} className="min-w-full w-full flex-shrink-0 snap-center px-12 lg:px-20 flex flex-col justify-center items-center h-full pb-6">
                    
//                     {/* Question Typography (Improved line-height slightly for readability) */}
//                     <h3 
//                       className="text-[#000000] mb-3 lg:mb-4 lg:text-lg"
//                       style={{
//                         fontFamily: '"Plus Jakarta Sans", sans-serif',
//                         fontWeight: 600,
//                         fontSize: '14px',
//                         lineHeight: '140%', // Kept slightly higher for better 2-line display
//                         letterSpacing: '0%',
//                         textAlign: 'center',
//                       }}
//                     >
//                       {q.text}
//                     </h3>
                    
//                     {/* Answer Typography */}
//                     <p 
//                       className="text-[#000000]/80 px-2 lg:text-sm"
//                       style={{
//                         fontFamily: '"Plus Jakarta Sans", sans-serif',
//                         fontWeight: 500,
//                         fontSize: '13px',
//                         lineHeight: '140%', 
//                         letterSpacing: '0.01em',
//                         textAlign: 'center',
//                       }}
//                     >
//                       {q.desc}
//                     </p>
//                   </div>
//                 ))}
//               </div>
              
//               <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
//                 {questions.map((_, idx) => (
//                   <button
//                     key={idx}
//                     onClick={(e) => { e.stopPropagation(); scrollToQuestion(idx); }}
//                     className={`
//                       h-2 rounded-full transition-all duration-300
//                       ${activeQuestion === idx ? 'w-4 bg-[#003C22]' : 'w-2 bg-[#003C22]/30 hover:bg-[#003C22]/50'}
//                     `}
//                     aria-label={`Go to question ${idx + 1}`}
//                   />
//                 ))}
//               </div>

//               <Quote className="absolute bottom-3 right-4 lg:bottom-0 lg:right-0 text-white fill-white pointer-events-none w-[35px] h-[27px] lg:w-10 lg:h-10 opacity-50" />
//           </div>

//           {/* Product Slider Container */}
//           <div className="flex-1 w-full overflow-visible lg:overflow-hidden flex items-center pl-0 lg:pl-6 pr-0 lg:pr-6 h-full pb-0 lg:pb-0">
//              <div 
//                ref={productScrollRef}
//                className="flex gap-[3px] lg:gap-6 overflow-x-auto no-scrollbar px-[6px] lg:px-2 w-full snap-x snap-mandatory select-none items-center h-full py-2"
//              >
//                {displayProducts.length > 0 ? displayProducts.map((p, i) => (
//                  <div key={`${p.id}-${i}`} className="snap-start shrink-0">
//                    <SeasonalProductCard product={p} />
//                  </div>
//                )) : (
//                  <div className="w-full text-center text-gray-500 italic">No products found for this issue.</div>
//                )}
//              </div>
//           </div>

//         </div>

//       </div>
//     </section>
//   );
// };

// export default SeasonalSolutions;
'use client';

import React, { useState, useRef } from 'react';
import { Quote, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { SeasonalProblemItem, ApiProduct } from '@/types/homeApi';
import { SeasonalProduct, SeasonalQuestion } from './types';
import SeasonalProductCard from './SeasonalProductCard';
import { useDraggableScroll } from '@/hooks/useDraggableScroll';

const scrollStyles = `
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

interface SeasonalSolutionsProps {
  data: SeasonalProblemItem[];
  title?: string;
  subtitle?: string;
}

const SeasonalSolutions = ({ data, title, subtitle }: SeasonalSolutionsProps) => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const productScrollRef = useRef<HTMLDivElement>(null);

  useDraggableScroll(scrollRef);
  useDraggableScroll(productScrollRef);

  if (!data || data.length === 0) return null;

  const questions: SeasonalQuestion[] = data.map(item => ({
    id: item.problem_id,
    text: item.question,
    desc: item.answer,
  }));

  const activeSolution = data[activeQuestion];
  const activeProductsRaw = activeSolution ? activeSolution.solutions : [];

  const displayProducts: SeasonalProduct[] = activeProductsRaw.map((p: ApiProduct) => ({
    id: p.product_id,
    name: p.product_name,
    brand: p.brand?.brand_name || '',
    image: p.image,
    variants: p.product_variants.map(v => ({
       product_variant_id: v.product_variant_id,
       size: v.size,
       uom: v.uom,
       price: v.price,
       discounted_price: v.discounted_price 
    }))
  }));

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const index = Math.round(scrollLeft / clientWidth);
      if (index >= 0 && index < data.length) setActiveQuestion(index);
    }
  };

  const scrollToQuestion = (index: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: index * scrollRef.current.clientWidth, behavior: 'smooth' });
      setActiveQuestion(index);
    }
  };

  const handlePrev = () => {
    const prevIndex = (activeQuestion - 1 + data.length) % data.length;
    scrollToQuestion(prevIndex);
  };

  const handleNext = () => {
    const nextIndex = (activeQuestion + 1) % data.length;
    scrollToQuestion(nextIndex);
  };

  const arrowAnimation = (isHovered: boolean) => ({
    animate: isHovered
      ? { scale: 1, y: 0 }
      : {
          scale: [1, 1.2, 1],
          y: [0, -2, 0],
        },
    transition: {
      repeat: isHovered ? 0 : Infinity,
      repeatType: "loop" as const,
      duration: 1.2,
      ease: "easeInOut",
    }
  });

  return (
    <section className="w-full flex justify-center pt-12 pb-12 lg:pb-16 font-jakarta bg-white">
      <style>{scrollStyles}</style>
      
      <div className="w-full max-w-[1344px] h-auto flex flex-col items-center relative px-4 lg:px-0">
        
        <h2 className="text-center text-[#000000] mb-6 lg:mb-10 text-2xl font-medium mt-4 lg:mt-10">
          {title || "Seasonal Problem & Solutions"}
        </h2>
        
        <p className="text-center text-gray-600 mb-6 max-w-2xl mx-auto -mt-4 lg:-mt-8 px-4 text-sm font-semibold">
           {subtitle || "Winter-wise Farming: Curated for Crops, Carefully Chosen for You."}
        </p>
        
        {/* Outer Container */}
        <div className="
            relative flex flex-col lg:flex-row items-center 
            gap-1.5 lg:gap-0
            bg-[#FFF8D8] 
            w-full 
            /* [!code highlight] RESPONISVE FIX: Mobile -> Tablet -> Desktop width scaling */
            max-w-[369px] md:max-w-[720px] lg:max-w-[1344px]
            
            h-auto min-h-[513px] rounded-[8px] py-2 lg:py-0
            lg:h-[396px] lg:min-h-0 lg:rounded-[12px] lg:p-0
        ">
          
          {/* Question Panel */}
          <div className="
              relative shrink-0 flex flex-col justify-center items-center text-center overflow-hidden group
              bg-[#FFE989]
              /* [!code highlight] RESPONSIVE FIX: Fluid width on tablet/desktop, max-width only on mobile */
              w-[96%] max-w-[357px] md:max-w-none md:w-[96%]
              
              h-[240px] rounded-[8px] mt-0 lg:mt-0
              lg:w-[504px] lg:min-w-[504px] lg:h-[348px] lg:rounded-[12px] lg:ml-6
          ">
              <Quote className="absolute top-3 left-4 lg:top-0 lg:left-0 text-white fill-white pointer-events-none rotate-180 w-[35px] h-[27px] lg:w-10 lg:h-10" />
              
              <button 
                onMouseEnter={() => setHoverPrev(true)}
                onMouseLeave={() => setHoverPrev(false)}
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-10 p-2 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Previous"
              >
                <motion.div {...arrowAnimation(hoverPrev)}>
                   <ArrowLeft className="text-[#003C22] w-6 h-6 lg:w-8 lg:h-8" />
                </motion.div>
              </button>

              <button 
                onMouseEnter={() => setHoverNext(true)}
                onMouseLeave={() => setHoverNext(false)}
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-10 p-2 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Next"
              >
                <motion.div {...arrowAnimation(hoverNext)}>
                   <ArrowRight className="text-[#003C22] w-6 h-6 lg:w-8 lg:h-8" />
                </motion.div>
              </button>

              <div 
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex w-full h-full overflow-x-auto snap-x snap-mandatory no-scrollbar items-center select-none"
              >
                {questions.map((q) => (
                  <div key={q.id} className="min-w-full w-full flex-shrink-0 snap-center px-12 lg:px-20 flex flex-col justify-center items-center h-full pb-6">
                    
                    <h3 
                      className="text-[#000000] mb-3 lg:mb-4 lg:text-lg"
                      style={{
                        fontFamily: '"Plus Jakarta Sans", sans-serif',
                        fontWeight: 600,
                        fontSize: '14px',
                        lineHeight: '140%', 
                        letterSpacing: '0%',
                        textAlign: 'center',
                      }}
                    >
                      {q.text}
                    </h3>
                    
                    <p 
                      className="text-[#000000]/80 px-2 lg:text-sm"
                      style={{
                        fontFamily: '"Plus Jakarta Sans", sans-serif',
                        fontWeight: 500,
                        fontSize: '13px',
                        lineHeight: '140%', 
                        letterSpacing: '0.01em',
                        textAlign: 'center',
                      }}
                    >
                      {q.desc}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {questions.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => { e.stopPropagation(); scrollToQuestion(idx); }}
                    className={`
                      h-2 rounded-full transition-all duration-300
                      ${activeQuestion === idx ? 'w-4 bg-[#003C22]' : 'w-2 bg-[#003C22]/30 hover:bg-[#003C22]/50'}
                    `}
                    aria-label={`Go to question ${idx + 1}`}
                  />
                ))}
              </div>

              <Quote className="absolute bottom-3 right-4 lg:bottom-0 lg:right-0 text-white fill-white pointer-events-none w-[35px] h-[27px] lg:w-10 lg:h-10 opacity-50" />
          </div>

          {/* Product Slider Container */}
          <div className="flex-1 w-full overflow-visible lg:overflow-hidden flex items-center pl-0 lg:pl-6 pr-0 lg:pr-6 h-full pb-0 lg:pb-0">
             <div 
               ref={productScrollRef}
               className="flex gap-[3px] lg:gap-6 overflow-x-auto no-scrollbar px-[6px] lg:px-2 w-full snap-x snap-mandatory select-none items-center h-full py-2"
             >
               {displayProducts.length > 0 ? displayProducts.map((p, i) => (
                 <div key={`${p.id}-${i}`} className="snap-start shrink-0">
                   <SeasonalProductCard product={p} />
                 </div>
               )) : (
                 <div className="w-full text-center text-gray-500 italic">No products found for this issue.</div>
               )}
             </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default SeasonalSolutions;