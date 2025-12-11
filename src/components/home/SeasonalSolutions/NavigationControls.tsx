'use client';

import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface NavigationControlsProps {
  activeQuestion: number;
  totalQuestions: number; // [!code ++] New Prop
  onPrev: () => void;
  onNext: () => void;
  onDotClick: (index: number) => void;
}

const NavigationControls = ({ 
  activeQuestion, 
  totalQuestions, // [!code ++] Destructure
  onPrev, 
  onNext, 
  onDotClick 
}: NavigationControlsProps) => {
  
  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      {/* Prev Button */}
      <button 
          onClick={onPrev}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
      >
          <ArrowLeft className="w-5 h-5 text-[#003C22]" />
      </button>

      {/* Dots (Generated dynamically based on totalQuestions) */}
      <div className="flex gap-2">
          {Array.from({ length: totalQuestions }).map((_, idx) => (
            <button 
              key={idx}
              onClick={() => onDotClick(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${activeQuestion === idx ? 'w-2.5 bg-[#013220]' : 'w-2.5 bg-[#013220]/30 hover:bg-[#013220]/50'}`}
            />
          ))}
      </div>

      {/* Next Button */}
      <button 
          onClick={onNext}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
      >
          <ArrowRight className="w-5 h-5 text-[#003C22]" />
      </button>
    </div>
  );
};

export default NavigationControls;