'use client';

import React, { useState, useRef } from 'react';
import { Quote } from 'lucide-react';
import { SeasonalProblemItem, ApiProduct } from '@/types/homeApi';
import { SeasonalProduct, SeasonalQuestion } from './types';
import SeasonalProductCard from './SeasonalProductCard';
import NavigationControls from './NavigationControls';
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
  
  // Refs
  const scrollRef = useRef<HTMLDivElement>(null);
  const productScrollRef = useRef<HTMLDivElement>(null);

  useDraggableScroll(scrollRef);
  useDraggableScroll(productScrollRef);

  if (!data || data.length === 0) return null;

  // 1. Map API Questions
  const questions: SeasonalQuestion[] = data.map(item => ({
    id: item.problem_id,
    text: item.question,
    desc: item.answer,
  }));

  // 2. Get active products
  const activeSolution = data[activeQuestion];
  const activeProductsRaw = activeSolution ? activeSolution.solutions : [];

  // 3. Map API Products
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
       // [!code fix] Ensure this matches the type definition
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

  return (
    <section className="w-full flex justify-center pt-12 pb-0 font-jakarta bg-white">
      <style>{scrollStyles}</style>
      <div className="w-full max-w-[1344px] h-auto lg:h-[702px] flex flex-col items-center relative">
        
        <h2 
          className="text-center text-[#000000] mb-10 text-2xl font-medium mt-10"
        >
          {title || "Seasonal Problem & Solutions"}
        </h2>
        
        <div className="relative bg-[#FFF8D8] rounded-[12px] flex flex-col lg:flex-row items-center w-full max-w-[1344px] h-auto lg:h-[396px] p-6 lg:p-0 gap-6 lg:gap-0">
          
          {/* Question Panel */}
          <div className="relative shrink-0 bg-[#FFE989] rounded-[12px] w-full lg:w-[504px] h-[300px] lg:h-[348px] flex flex-col justify-center items-center text-center p-0 lg:ml-6 overflow-hidden">
              {/* <Quote className="absolute top-6 left-6 text-white w-10 h-10 rotate-180 fill-white pointer-events-none" /> */}
              <Quote className="absolute top-0 left-0 text-white w-10 h-10 rotate-180 fill-white pointer-events-none" />
              <div 
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex w-full h-full overflow-x-auto snap-x snap-mandatory no-scrollbar items-center select-none"
              >
                {questions.map((q) => (
                  <div key={q.id} className="min-w-full w-full flex-shrink-0 snap-center px-8 lg:px-12 flex flex-col justify-center items-center h-full">
                    <h3 className="text-[#000000] mb-4 font-semibold text-lg">{q.text}</h3>
                    <p className="text-[#000000]/80 text-sm font-medium">{q.desc}</p>
                  </div>
                ))}
              </div>
                <Quote className="absolute bottom-0 right-0 text-white w-10 h-10 fill-white pointer-events-none" />
              {/* <Quote className="absolute bottom-12 right-6 text-white w-10 h-10 fill-white pointer-events-none" /> */}
          </div>

          {/* Product Slider */}
          <div className="flex-1 w-full overflow-hidden flex items-center pl-0 lg:pl-10 pr-0 lg:pr-6 h-full">
             <div 
               ref={productScrollRef}
               className="flex gap-6 overflow-x-auto no-scrollbar py-4 px-2 w-full snap-x snap-mandatory select-none"
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

        {/* Navigation */}
        <NavigationControls 
          activeQuestion={activeQuestion}
          totalQuestions={data.length}
          onPrev={handlePrev}
          onNext={handleNext}
          onDotClick={scrollToQuestion}
        />

      </div>
    </section>
  );
};

export default SeasonalSolutions;