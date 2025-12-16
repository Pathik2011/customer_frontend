// // // 'use client';

// // // import React, { useState, useRef } from 'react';
// // // import { Quote } from 'lucide-react';
// // // import { SeasonalProblemItem, ApiProduct } from '@/types/homeApi';
// // // import { SeasonalProduct, SeasonalQuestion } from './types';
// // // import SeasonalProductCard from './SeasonalProductCard';
// // // import NavigationControls from './NavigationControls';
// // // import { useDraggableScroll } from '@/hooks/useDraggableScroll';

// // // const scrollStyles = `
// // //   .no-scrollbar::-webkit-scrollbar {
// // //     display: none;
// // //   }
// // //   .no-scrollbar {
// // //     -ms-overflow-style: none;
// // //     scrollbar-width: none;
// // //   }
// // // `;

// // // interface SeasonalSolutionsProps {
// // //   data: SeasonalProblemItem[];
// // //   title?: string;
// // // }

// // // const SeasonalSolutions = ({ data, title }: SeasonalSolutionsProps) => {
// // //   const [activeQuestion, setActiveQuestion] = useState(0);
  
// // //   // Refs
// // //   const scrollRef = useRef<HTMLDivElement>(null);
// // //   const productScrollRef = useRef<HTMLDivElement>(null);

// // //   useDraggableScroll(scrollRef);
// // //   useDraggableScroll(productScrollRef);

// // //   if (!data || data.length === 0) return null;

// // //   // 1. Map API Questions
// // //   const questions: SeasonalQuestion[] = data.map(item => ({
// // //     id: item.problem_id,
// // //     text: item.question,
// // //     desc: item.answer,
// // //   }));

// // //   // 2. Get active products
// // //   const activeSolution = data[activeQuestion];
// // //   const activeProductsRaw = activeSolution ? activeSolution.solutions : [];

// // //   // 3. Map API Products
// // //   const displayProducts: SeasonalProduct[] = activeProductsRaw.map((p: ApiProduct) => ({
// // //     id: p.product_id,
// // //     name: p.product_name,
// // //     brand: p.brand?.brand_name || '',
// // //     image: p.image,
// // //     variants: p.product_variants.map(v => ({
// // //        product_variant_id: v.product_variant_id,
// // //        size: v.size,
// // //        uom: v.uom,
// // //        price: v.price,
// // //        // [!code fix] Ensure this matches the type definition
// // //        discounted_price: v.discounted_price 
// // //     }))
// // //   }));

// // //   const handleScroll = () => {
// // //     if (scrollRef.current) {
// // //       const { scrollLeft, clientWidth } = scrollRef.current;
// // //       const index = Math.round(scrollLeft / clientWidth);
// // //       if (index >= 0 && index < data.length) setActiveQuestion(index);
// // //     }
// // //   };

// // //   const scrollToQuestion = (index: number) => {
// // //     if (scrollRef.current) {
// // //       scrollRef.current.scrollTo({ left: index * scrollRef.current.clientWidth, behavior: 'smooth' });
// // //       setActiveQuestion(index);
// // //     }
// // //   };

// // //   const handlePrev = () => {
// // //     const prevIndex = (activeQuestion - 1 + data.length) % data.length;
// // //     scrollToQuestion(prevIndex);
// // //   };

// // //   const handleNext = () => {
// // //     const nextIndex = (activeQuestion + 1) % data.length;
// // //     scrollToQuestion(nextIndex);
// // //   };

// // //   return (
// // //     <section className="w-full flex justify-center pt-12 pb-0 font-jakarta bg-white">
// // //       <style>{scrollStyles}</style>
// // //       <div className="w-full max-w-[1344px] h-auto lg:h-[702px] flex flex-col items-center relative">
        
// // //         <h2 
// // //           className="text-center text-[#000000] mb-10 text-2xl font-medium mt-10"
// // //         >
// // //           {title || "Seasonal Problem & Solutions"}
// // //         </h2>
        
// // //         <div className="relative bg-[#FFF8D8] rounded-[12px] flex flex-col lg:flex-row items-center w-full max-w-[1344px] h-auto lg:h-[396px] p-6 lg:p-0 gap-6 lg:gap-0">
          
// // //           {/* Question Panel */}
// // //           <div className="relative shrink-0 bg-[#FFE989] rounded-[12px] w-full lg:w-[504px] h-[300px] lg:h-[348px] flex flex-col justify-center items-center text-center p-0 lg:ml-6 overflow-hidden">
// // //               {/* <Quote className="absolute top-6 left-6 text-white w-10 h-10 rotate-180 fill-white pointer-events-none" /> */}
// // //               <Quote className="absolute top-0 left-0 text-white w-10 h-10 rotate-180 fill-white pointer-events-none" />
// // //               <div 
// // //                 ref={scrollRef}
// // //                 onScroll={handleScroll}
// // //                 className="flex w-full h-full overflow-x-auto snap-x snap-mandatory no-scrollbar items-center select-none"
// // //               >
// // //                 {questions.map((q) => (
// // //                   <div key={q.id} className="min-w-full w-full flex-shrink-0 snap-center px-8 lg:px-12 flex flex-col justify-center items-center h-full">
// // //                     <h3 className="text-[#000000] mb-4 font-semibold text-lg">{q.text}</h3>
// // //                     <p className="text-[#000000]/80 text-sm font-medium">{q.desc}</p>
// // //                   </div>
// // //                 ))}
// // //               </div>
// // //                 <Quote className="absolute bottom-0 right-0 text-white w-10 h-10 fill-white pointer-events-none" />
// // //               {/* <Quote className="absolute bottom-12 right-6 text-white w-10 h-10 fill-white pointer-events-none" /> */}
// // //           </div>

// // //           {/* Product Slider */}
// // //           <div className="flex-1 w-full overflow-hidden flex items-center pl-0 lg:pl-10 pr-0 lg:pr-6 h-full">
// // //              <div 
// // //                ref={productScrollRef}
// // //                className="flex gap-6 overflow-x-auto no-scrollbar py-4 px-2 w-full snap-x snap-mandatory select-none"
// // //              >
// // //                {displayProducts.length > 0 ? displayProducts.map((p, i) => (
// // //                  <div key={`${p.id}-${i}`} className="snap-start shrink-0">
// // //                    <SeasonalProductCard product={p} />
// // //                  </div>
// // //                )) : (
// // //                  <div className="w-full text-center text-gray-500 italic">No products found for this issue.</div>
// // //                )}
// // //              </div>
// // //           </div>

// // //         </div>

// // //         {/* Navigation */}
// // //         <NavigationControls 
// // //           activeQuestion={activeQuestion}
// // //           totalQuestions={data.length}
// // //           onPrev={handlePrev}
// // //           onNext={handleNext}
// // //           onDotClick={scrollToQuestion}
// // //         />

// // //       </div>
// // //     </section>
// // //   );
// // // };

// // // export default SeasonalSolutions;
// // 'use client';

// // import React, { useState, useRef } from 'react';
// // import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
// // import { SeasonalProblemItem, ApiProduct } from '@/types/homeApi';
// // import { SeasonalProduct, SeasonalQuestion } from './types';
// // // [!code highlight] Revert to local SeasonalProductCard
// // import SeasonalProductCard from './SeasonalProductCard';
// // import NavigationControls from './NavigationControls';
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
// // }

// // const SeasonalSolutions = ({ data, title }: SeasonalSolutionsProps) => {
// //   const [activeQuestion, setActiveQuestion] = useState(0);
  
// //   // Refs
// //   const scrollRef = useRef<HTMLDivElement>(null);
// //   const productScrollRef = useRef<HTMLDivElement>(null);

// //   useDraggableScroll(scrollRef);
// //   useDraggableScroll(productScrollRef);

// //   if (!data || data.length === 0) return null;

// //   // 1. Map API Questions
// //   const questions: SeasonalQuestion[] = data.map(item => ({
// //     id: item.problem_id,
// //     text: item.question,
// //     desc: item.answer,
// //   }));

// //   // 2. Get active products
// //   const activeSolution = data[activeQuestion];
// //   const activeProductsRaw = activeSolution ? activeSolution.solutions : [];

// //   // 3. Map to SeasonalProduct Type
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

// //   return (
// //     <section className="w-full flex justify-center pt-12 pb-0 font-jakarta bg-white">
// //       <style>{scrollStyles}</style>
// //       <div className="w-full max-w-[1344px] h-auto lg:h-[702px] flex flex-col items-center relative">
        
// //         <h2 className="text-center text-[#000000] mb-6 lg:mb-10 text-2xl font-medium mt-4 lg:mt-10">
// //           {title || "Seasonal Problem & Solutions"}
// //         </h2>
        
// //         {/* Outer Container */}
// //         <div className="
// //             relative flex flex-col lg:flex-row items-center gap-2 lg:gap-0
// //             bg-[#FFF8D8] 
// //             w-[369px] h-[513px] rounded-[8px] p-0
// //             lg:w-full lg:max-w-[1344px] lg:h-[396px] lg:rounded-[12px] lg:p-0
// //         ">
          
// //           {/* Question Panel */}
// //           <div className="
// //               relative shrink-0 flex flex-col justify-center items-center text-center overflow-hidden group
// //               bg-[#FFE989]
// //               w-[357px] h-[240px] rounded-[8px] mt-[6px] lg:mt-0
// //               lg:w-[504px] lg:h-[348px] lg:rounded-[12px] lg:ml-6
// //           ">
// //               <Quote className="absolute top-0 left-4 lg:top-0 lg:left-0 text-white fill-white pointer-events-none rotate-180 w-[35px] h-[27px] lg:w-10 lg:h-10" />
              
// //               <button 
// //                 onClick={(e) => { e.stopPropagation(); handlePrev(); }}
// //                 className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-white/30 hover:bg-white/60 flex items-center justify-center transition-all"
// //               >
// //                 <ChevronLeft className="text-[#003C22] w-5 h-5 lg:w-6 lg:h-6" />
// //               </button>

// //               <button 
// //                 onClick={(e) => { e.stopPropagation(); handleNext(); }}
// //                 className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-white/30 hover:bg-white/60 flex items-center justify-center transition-all"
// //               >
// //                 <ChevronRight className="text-[#003C22] w-5 h-5 lg:w-6 lg:h-6 animate-pulse" />
// //               </button>

// //               <div 
// //                 ref={scrollRef}
// //                 onScroll={handleScroll}
// //                 className="flex w-full h-full overflow-x-auto snap-x snap-mandatory no-scrollbar items-center select-none"
// //               >
// //                 {questions.map((q) => (
// //                   <div key={q.id} className="min-w-full w-full flex-shrink-0 snap-center px-12 lg:px-16 flex flex-col justify-center items-center h-full">
// //                     <h3 className="text-[#000000] mb-3 lg:mb-4 font-semibold text-lg">{q.text}</h3>
// //                     <p className="text-[#000000]/80 text-sm font-medium px-2">{q.desc}</p>
// //                   </div>
// //                 ))}
// //               </div>
              
// //               <Quote className="absolute bottom-0 right-4 lg:bottom-0 lg:right-0 text-white fill-white pointer-events-none w-[35px] h-[27px] lg:w-10 lg:h-10" />
// //           </div>

// //           {/* Product Slider */}
// //           <div className="flex-1 w-full overflow-hidden flex items-center pl-1.5 lg:pl-6 pr-0 lg:pr-6 h-full">
// //              <div 
// //                ref={productScrollRef}
// //                // [!code highlight] Updated spacing: px-[18px] (left start) and gap-[3px]
// //                className="flex gap-[4px] lg:gap-4 overflow-x-auto no-scrollbar px-[18px] lg:px-2 w-full snap-x snap-mandatory select-none items-center h-full py-4"
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

// //         {/* Navigation Dots */}
// //         <NavigationControls 
// //           activeQuestion={activeQuestion}
// //           totalQuestions={data.length}
// //           onPrev={handlePrev}
// //           onNext={handleNext}
// //           onDotClick={scrollToQuestion}
// //         />

// //       </div>
// //     </section>
// //   );
// // };

// // export default SeasonalSolutions;
// // 'use client';

// // import React, { useState, useRef } from 'react';
// // // [!code highlight] Import simple Arrow icons
// // import { Quote, ArrowLeft, ArrowRight } from 'lucide-react';
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
// // }

// // const SeasonalSolutions = ({ data, title }: SeasonalSolutionsProps) => {
// //   const [activeQuestion, setActiveQuestion] = useState(0);
  
// //   // Refs
// //   const scrollRef = useRef<HTMLDivElement>(null);
// //   const productScrollRef = useRef<HTMLDivElement>(null);

// //   useDraggableScroll(scrollRef);
// //   useDraggableScroll(productScrollRef);

// //   if (!data || data.length === 0) return null;

// //   // 1. Map API Questions
// //   const questions: SeasonalQuestion[] = data.map(item => ({
// //     id: item.problem_id,
// //     text: item.question,
// //     desc: item.answer,
// //   }));

// //   // 2. Get active products
// //   const activeSolution = data[activeQuestion];
// //   const activeProductsRaw = activeSolution ? activeSolution.solutions : [];

// //   // 3. Map to SeasonalProduct Type
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

// //   return (
// //     <section className="w-full flex justify-center pt-12 pb-0 font-jakarta bg-white">
// //       <style>{scrollStyles}</style>
// //       <div className="w-full max-w-[1344px] h-auto lg:h-[702px] flex flex-col items-center relative">
        
// //         <h2 className="text-center text-[#000000] mb-6 lg:mb-10 text-2xl font-medium mt-4 lg:mt-10">
// //           {title || "Seasonal Problem & Solutions"}
// //         </h2>
        
// //         {/* Outer Container */}
// //         <div className="
// //             relative flex flex-col lg:flex-row items-center gap-4 lg:gap-0
// //             bg-[#FFF8D8] 
// //             w-[369px] h-[513px] rounded-[8px] p-0
// //             lg:w-full lg:max-w-[1344px] lg:h-[396px] lg:rounded-[12px] lg:p-0
// //         ">
          
// //           {/* Question Panel */}
// //           <div className="
// //               relative shrink-0 flex flex-col justify-center items-center text-center overflow-hidden group
// //               bg-[#FFE989]
// //               w-[357px] h-[240px] rounded-[8px] mt-[6px] lg:mt-0
// //               lg:w-[504px] lg:h-[348px] lg:rounded-[12px] lg:ml-6
// //           ">
// //               <Quote className="absolute top-3 left-4 lg:top-0 lg:left-0 text-white fill-white pointer-events-none rotate-180 w-[35px] h-[27px] lg:w-10 lg:h-10" />
              
// //               {/* [!code highlight] Simple Left Arrow (Same Position) */}
// //               <button 
// //                 onClick={(e) => { e.stopPropagation(); handlePrev(); }}
// //                 className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-10 p-2 hover:bg-white/20 rounded-full transition-colors"
// //                 aria-label="Previous"
// //               >
// //                 <ArrowLeft className="text-[#003C22] w-6 h-6 lg:w-8 lg:h-8" />
// //               </button>

// //               {/* [!code highlight] Simple Right Arrow (Same Position) */}
// //               <button 
// //                 onClick={(e) => { e.stopPropagation(); handleNext(); }}
// //                 className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-10 p-2 hover:bg-white/20 rounded-full transition-colors"
// //                 aria-label="Next"
// //               >
// //                 <ArrowRight className="text-[#003C22] w-6 h-6 lg:w-8 lg:h-8" />
// //               </button>

// //               <div 
// //                 ref={scrollRef}
// //                 onScroll={handleScroll}
// //                 className="flex w-full h-full overflow-x-auto snap-x snap-mandatory no-scrollbar items-center select-none"
// //               >
// //                 {questions.map((q) => (
// //                   <div key={q.id} className="min-w-full w-full flex-shrink-0 snap-center px-12 lg:px-20 flex flex-col justify-center items-center h-full pb-6">
// //                     <h3 className="text-[#000000] mb-3 lg:mb-4 font-semibold text-lg">{q.text}</h3>
// //                     <p className="text-[#000000]/80 text-sm font-medium px-2">{q.desc}</p>
// //                   </div>
// //                 ))}
// //               </div>
              
// //               {/* [!code highlight] Dots at Bottom Center */}
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

// //           {/* Product Slider */}
// //           <div className="flex-1 w-full overflow-hidden flex items-center pl-0 lg:pl-6 pr-0 lg:pr-6 h-full pb-4 lg:pb-0">
// //              <div 
// //                ref={productScrollRef}
// //                className="flex gap-[3px] lg:gap-6 overflow-x-auto no-scrollbar px-[6px] lg:px-2 w-full snap-x snap-mandatory select-none items-center h-full py-4"
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
// // import { motion } from 'framer-motion'; // [!code ++] Import Framer Motion
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
// // }

// // const SeasonalSolutions = ({ data, title }: SeasonalSolutionsProps) => {
// //   const [activeQuestion, setActiveQuestion] = useState(0);
  
// //   // [!code ++] Hover states for arrow animations
// //   const [hoverPrev, setHoverPrev] = useState(false);
// //   const [hoverNext, setHoverNext] = useState(false);

// //   // Refs
// //   const scrollRef = useRef<HTMLDivElement>(null);
// //   const productScrollRef = useRef<HTMLDivElement>(null);

// //   useDraggableScroll(scrollRef);
// //   useDraggableScroll(productScrollRef);

// //   if (!data || data.length === 0) return null;

// //   // 1. Map API Questions
// //   const questions: SeasonalQuestion[] = data.map(item => ({
// //     id: item.problem_id,
// //     text: item.question,
// //     desc: item.answer,
// //   }));

// //   // 2. Get active products
// //   const activeSolution = data[activeQuestion];
// //   const activeProductsRaw = activeSolution ? activeSolution.solutions : [];

// //   // 3. Map to SeasonalProduct Type
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

// //   // [!code ++] Animation configuration
// //   const arrowAnimation = (isHovered: boolean) => ({
// //     animate: isHovered
// //       ? { scale: 1, y: 0 }      // stop animation on hover
// //       : {
// //           scale: [1, 1.2, 1],   // pulse (zoom in & out)
// //           y: [0, -2, 0],        // small vertical float
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
// //       <div className="w-full max-w-[1344px] h-auto lg:h-[702px] flex flex-col items-center relative">
        
// //         <h2 className="text-center text-[#000000] mb-6 lg:mb-10 text-2xl font-medium mt-4 lg:mt-10">
// //           {title || "Seasonal Problem & Solutions"}
// //         </h2>
        
// //         {/* Outer Container */}
// //         <div className="
// //             relative flex flex-col lg:flex-row items-center gap-4 lg:gap-0
// //             bg-[#FFF8D8] 
// //             w-[369px] h-[513px] rounded-[8px] p-0
// //             lg:w-full lg:max-w-[1344px] lg:h-[396px] lg:rounded-[12px] lg:p-0
// //         ">
          
// //           {/* Question Panel */}
// //           <div className="
// //               relative shrink-0 flex flex-col justify-center items-center text-center overflow-hidden group
// //               bg-[#FFE989]
// //               w-[357px] h-[240px] rounded-[8px] mt-[6px] lg:mt-0
// //               lg:w-[504px] lg:h-[348px] lg:rounded-[12px] lg:ml-6
// //           ">
// //               <Quote className="absolute top-3 left-4 lg:top-0 lg:left-0 text-white fill-white pointer-events-none rotate-180 w-[35px] h-[27px] lg:w-10 lg:h-10" />
              
// //               {/* Left Arrow with Animation */}
// //               <button 
// //                 onMouseEnter={() => setHoverPrev(true)}
// //                 onMouseLeave={() => setHoverPrev(false)}
// //                 onClick={(e) => { e.stopPropagation(); handlePrev(); }}
// //                 className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-10 p-2 hover:bg-white/20 rounded-full transition-colors"
// //                 aria-label="Previous"
// //               >
// //                 <motion.div {...arrowAnimation(hoverPrev)}>
// //                    <ArrowLeft className="text-[#003C22] w-6 h-6 lg:w-6 lg:h-6" />
// //                 </motion.div>
// //               </button>

// //               {/* Right Arrow with Animation */}
// //               <button 
// //                 onMouseEnter={() => setHoverNext(true)}
// //                 onMouseLeave={() => setHoverNext(false)}
// //                 onClick={(e) => { e.stopPropagation(); handleNext(); }}
// //                 className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-10 p-2 hover:bg-white/20 rounded-full transition-colors"
// //                 aria-label="Next"
// //               >
// //                 <motion.div {...arrowAnimation(hoverNext)}>
// //                    <ArrowRight className="text-[#003C22] w-6 h-6 lg:w-6 lg:h-6" />
// //                 </motion.div>
// //               </button>

// //               <div 
// //                 ref={scrollRef}
// //                 onScroll={handleScroll}
// //                 className="flex w-full h-full overflow-x-auto snap-x snap-mandatory no-scrollbar items-center select-none"
// //               >
// //                 {questions.map((q) => (
// //                   <div key={q.id} className="min-w-full w-full flex-shrink-0 snap-center px-12 lg:px-20 flex flex-col justify-center items-center h-full pb-6">
// //                     {/* [!code highlight] Updated Typography for Mobile Question */}
// //                     <h3 
// //                       className="text-[#000000] mb-3 lg:mb-4 lg:text-lg"
// //                       style={{
// //                         fontFamily: '"Plus Jakarta Sans", sans-serif',
// //                         fontWeight: 600,         // SemiBold
// //                         fontSize: '14px',        // 14px
// //                         lineHeight: '100%',      // 100%
// //                         letterSpacing: '0%',     // 0%
// //                         textAlign: 'center',
// //                       }}
// //                     >
// //                       {q.text}
// //                     </h3>
                    
// //                     {/* [!code highlight] Updated Typography for Mobile Answer */}
// //                     <p 
// //                       className="text-[#000000]/80 px-2 lg:text-sm"
// //                       style={{
// //                         fontFamily: '"Plus Jakarta Sans", sans-serif',
// //                         fontWeight: 500,         // Medium
// //                         fontSize: '13px',        // 13px
// //                         lineHeight: '100%',      // 100%
// //                         letterSpacing: '0.01em', // 1% (approx 0.01em)
// //                         textAlign: 'center',
// //                       }}
// //                     >
// //                       {q.desc}
// //                     </p>
// //                   </div>
// //                 ))}
// //               </div>
              
// //               {/* Dots at Bottom Center */}
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

// //           {/* Product Slider */}
// //           <div className="flex-1 w-full overflow-hidden flex items-center pl-0 lg:pl-6 pr-0 lg:pr-6 h-full pb-4 lg:pb-0">
// //              <div 
// //                ref={productScrollRef}
// //                className="flex gap-[3px] lg:gap-6 overflow-x-auto no-scrollbar px-[6px] lg:px-2 w-full snap-x snap-mandatory select-none items-center h-full py-4"
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

// interface SeasonalSolutionsProps {
//   data: SeasonalProblemItem[];
//   title?: string;
// }

// const SeasonalSolutions = ({ data, title }: SeasonalSolutionsProps) => {
//   const [activeQuestion, setActiveQuestion] = useState(0);

//   // Hover states for arrow animations
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
//       product_variant_id: v.product_variant_id,
//       size: v.size,
//       uom: v.uom,
//       price: v.price,
//       discounted_price: v.discounted_price,
//     })),
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
//       scrollRef.current.scrollTo({
//         left: index * scrollRef.current.clientWidth,
//         behavior: 'smooth',
//       });
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
//       repeatType: 'loop' as const,
//       duration: 1.2,
//       ease: 'easeInOut',
//     },
//   });

//   return (
//     <section className="w-full flex justify-center pt-12 pb-0 font-jakarta bg-white">
//       <style>{scrollStyles}</style>

//       <div className="w-full max-w-[1344px] h-auto lg:h-[702px] flex flex-col items-center relative">
//         <h2 className="text-center text-black mb-6 lg:mb-10 text-2xl font-medium mt-4 lg:mt-10">
//           {title || 'Seasonal Problem & Solutions'}
//         </h2>

//         {/* Outer Container */}
//         <div
//           className="
//             relative flex flex-col lg:flex-row items-center gap-3 lg:gap-0
//             bg-[#FFF8D8]
//             w-[369px] h-[513px] rounded-[8px]
//             lg:w-full lg:max-w-[1344px] lg:h-[396px] lg:rounded-[12px]
//           "
//         >
//           {/* Question Panel */}
//           <div
//             className="
//               relative shrink-0 flex flex-col justify-center items-center text-center overflow-hidden group
//               bg-[#FFE989]
//               w-[357px] h-[240px] rounded-[8px] mt-[6px] lg:mt-0
//               lg:w-[504px] lg:h-[348px] lg:rounded-[12px] lg:ml-6
//             "
//           >
//             <Quote className="absolute top-3 left-4 lg:top-0 lg:left-0 text-white fill-white rotate-180 w-[35px] h-[27px] lg:w-10 lg:h-10" />

//             {/* Left Arrow */}
//             <button
//               onMouseEnter={() => setHoverPrev(true)}
//               onMouseLeave={() => setHoverPrev(false)}
//               onClick={handlePrev}
//               className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-10 p-2 hover:bg-white/20 rounded-full"
//             >
//               <motion.div {...arrowAnimation(hoverPrev)}>
//                 <ArrowLeft className="text-[#003C22] w-6 h-6" />
//               </motion.div>
//             </button>

//             {/* Right Arrow */}
//             <button
//               onMouseEnter={() => setHoverNext(true)}
//               onMouseLeave={() => setHoverNext(false)}
//               onClick={handleNext}
//               className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-10 p-2 hover:bg-white/20 rounded-full"
//             >
//               <motion.div {...arrowAnimation(hoverNext)}>
//                 <ArrowRight className="text-[#003C22] w-6 h-6" />
//               </motion.div>
//             </button>

//             <div
//               ref={scrollRef}
//               onScroll={handleScroll}
//               className="flex w-full h-full overflow-x-auto snap-x snap-mandatory no-scrollbar items-center select-none"
//             >
//               {questions.map(q => (
//                 <div
//                   key={q.id}
//                   className="min-w-full snap-center px-12 lg:px-20 flex flex-col justify-center items-center h-full pb-6"
//                 >
//                   <h3
//   className="text-[#000000] mb-3 lg:mb-4 lg:text-lg"
//   style={{
//     fontFamily: '"Plus Jakarta Sans", sans-serif',
//     fontWeight: 600,          // SemiBold
//     fontSize: '14px',         // Mobile
//     lineHeight: '100%',       // Exact match
//     letterSpacing: '0%',
//     textAlign: 'center',
//   }}
// >
//   {q.text}
// </h3>

// <p
//   className="text-[#000000]/80 px-2 lg:text-sm"
//   style={{
//     fontFamily: '"Plus Jakarta Sans", sans-serif',
//     fontWeight: 500,          // Medium
//     fontSize: '13px',         // Mobile
//     lineHeight: '100%',
//     letterSpacing: '0.01em',
//     textAlign: 'center',
//   }}
// >
//   {q.desc}
// </p>

//                 </div>
//               ))}
//             </div>

//             <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
//               {questions.map((_, idx) => (
//                 <button
//                   key={idx}
//                   onClick={() => scrollToQuestion(idx)}
//                   className={`h-2 rounded-full transition-all duration-300 ${
//                     activeQuestion === idx
//                       ? 'w-4 bg-[#003C22]'
//                       : 'w-2 bg-[#003C22]/30'
//                   }`}
//                 />
//               ))}
//             </div>

//             <Quote className="absolute bottom-3 right-4 lg:bottom-0 lg:right-0 text-white fill-white w-[35px] h-[27px] lg:w-10 lg:h-10 opacity-50" />
//           </div>

//           {/* Product Slider */}
//           <div
//             className="
//               flex-1 w-full overflow-hidden flex items-center
//               pl-0 lg:pl-6 pr-0 lg:pr-6
//               h-auto lg:h-full               // ✅ FIX (mobile cut)
//             "
//           >
//             <div
//               ref={productScrollRef}
//               className="
//                 flex gap-[3px] lg:gap-6 overflow-x-auto no-scrollbar
//                 px-[6px] lg:px-2 w-full snap-x snap-mandatory
//                 items-center
//                 h-auto lg:h-full              // ✅ FIX (mobile cut)
//                 py-2 lg:py-0                  // ✅ FIX (mobile cut)
//               "
//             >
//               {displayProducts.length > 0 ? (
//                 displayProducts.map((p, i) => (
//                   <div key={`${p.id}-${i}`} className="snap-start shrink-0">
//                     <SeasonalProductCard product={p} />
//                   </div>
//                 ))
//               ) : (
//                 <div className="w-full text-center text-gray-500 italic">
//                   No products found for this issue.
//                 </div>
//               )}
//             </div>
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
}

const SeasonalSolutions = ({ data, title }: SeasonalSolutionsProps) => {
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
    <section className="w-full flex justify-center pt-12 pb-0 font-jakarta bg-white">
      <style>{scrollStyles}</style>
      <div className="w-full max-w-[1344px] h-auto lg:h-[702px] flex flex-col items-center relative px-4 lg:px-0">
        
        <h2 className="text-center text-[#000000] mb-6 lg:mb-10 text-2xl font-medium mt-4 lg:mt-10">
          {title || "Seasonal Problem & Solutions"}
        </h2>
        
        {/* Outer Container */}
        <div className="
            relative flex flex-col lg:flex-row items-center 
            gap-1.5 lg:gap-0
            bg-[#FFF8D8] 
            w-full max-w-[369px] 
            h-auto min-h-[513px] rounded-[8px] py-2 lg:py-0
            
            /* [!code changed] Added lg:min-h-0 to reset the mobile 513px height */
            lg:w-full lg:max-w-[1344px] lg:h-[396px] lg:min-h-0 lg:rounded-[12px] lg:p-0
        ">
          
          {/* Question Panel */}
          <div className="
              relative shrink-0 flex flex-col justify-center items-center text-center overflow-hidden group
              bg-[#FFE989]
              w-[96%] max-w-[357px] 
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
                    
                    {/* MOBILE QUESTION TYPOGRAPHY */}
                    <h3 
                      className="text-[#000000] mb-3 lg:mb-4 lg:text-lg"
                      style={{
                        fontFamily: '"Plus Jakarta Sans", sans-serif',
                        fontWeight: 600,
                        fontSize: '14px',
                        lineHeight: '100%',
                        letterSpacing: '0%',
                        textAlign: 'center',
                      }}
                    >
                      {q.text}
                    </h3>
                    
                    {/* MOBILE ANSWER TYPOGRAPHY */}
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