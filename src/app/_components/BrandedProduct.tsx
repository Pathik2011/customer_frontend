"use client";

import { Button } from "@/components/layout/common";
import RightArrowIcon from "@/icons/RightArrowIcon";

export default function BrandedProduct() {
  return (
    <section className="min-h-[528px] flex justify-start items-center relative py-16 sm:py-20 lg:py-24 overflow-hidden border-b border-b-dimGray_01">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/melons-plantation-with-workers.png')",
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          {/* Main Heading */}
          <h2 className="font-[Google Sans] font-medium text-[28px] text-white mb-4 leading-tight">
            100% Branded Product Dripping Service
          </h2>

          {/* Call to Action Button */}
          <Button
            className="w-full max-w-96 h-[40px] inline-flex items-center gap-3 bg-white hover:bg-gray-100 text-primary font-semibold px-6 py-4 rounded-lg transition-colors duration-300 text-base sm:text-lg"
            disabled
          >
            Contact Us for Dripping Service
            <RightArrowIcon />
          </Button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
    </section>
  );
}
