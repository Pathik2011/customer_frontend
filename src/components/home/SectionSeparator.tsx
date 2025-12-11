'use client';

import React from 'react';
import { ShieldCheck, Truck, Headphones, Tag } from 'lucide-react'; // Using Lucide icons as placeholders for WCU icons

const FEATURES = [
  { 
    id: 1, 
    title: "100%", 
    subtitle: "Secure Payments",
    icon: <ShieldCheck size={32} className="text-[#003C22]" />,
    bgColor: "bg-[#D1EDE1]" 
  },
  { 
    id: 2, 
    title: "100%", 
    subtitle: "Best Prices Assured",
    icon: <Tag size={32} className="text-[#003C22]" />,
    bgColor: "bg-[#D1EDE1]"
  },
  { 
    id: 3, 
    title: "100%", 
    subtitle: "Query Solutions",
    icon: <Headphones size={32} className="text-[#003C22]" />,
    bgColor: "bg-[#D1EDE1]"
  },
  { 
    id: 4, 
    title: "100%", 
    subtitle: "Product Delivery",
    icon: <Truck size={32} className="text-[#003C22]" />,
    bgColor: "bg-[#D1EDE1]"
  },
];

const SectionSeparator = () => {
  return (
    <section className="w-full bg-white font-jakarta border-y border-[#E0E2E7]">
      <div className="w-full max-w-[1600px] mx-auto px-4 xl:px-0">
        
        {/* --- Container ---
            Mobile: h-[262px] -> Stacked Grid
            Desktop: h-[224px] -> Linear Flex
        */}
        <div className="
          h-auto py-12 md:h-[224px] md:py-0
          flex flex-col md:flex-row items-center justify-center 
          gap-y-10 md:gap-x-12 lg:gap-x-24
        ">
          
          {/* Mobile Grid Layout (2x2) */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 w-full md:hidden">
             {FEATURES.map((feature) => (
                <div key={feature.id} className="flex flex-col items-center text-center gap-3">
                   <div className={`w-[60px] h-[60px] rounded-full flex items-center justify-center ${feature.bgColor}`}>
                      {feature.icon}
                   </div>
                   <div className="flex flex-col">
                      <span className="text-xl font-bold text-[#003C22]">{feature.title}</span>
                      <span className="text-sm text-gray-600">{feature.subtitle}</span>
                   </div>
                </div>
             ))}
          </div>

          {/* Desktop Flex Layout */}
          <div className="hidden md:flex justify-between w-full max-w-[1296px]">
             {FEATURES.map((feature) => (
                <div key={feature.id} className="flex items-center gap-4">
                   <div className={`w-[80px] h-[80px] rounded-full flex items-center justify-center ${feature.bgColor}`}>
                      {feature.icon}
                   </div>
                   <div className="flex flex-col">
                      <span className="text-3xl font-bold text-[#003C22]">{feature.title}</span>
                      <span className="text-base text-gray-600 font-medium">{feature.subtitle}</span>
                   </div>
                </div>
             ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default SectionSeparator;