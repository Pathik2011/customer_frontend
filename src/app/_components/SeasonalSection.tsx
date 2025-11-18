"use client";

import { useState, useEffect } from "react";
import { useHomepageStore } from "@/store/useHomepageStore";
import { ProblemSolutionItem } from "@/types/homepage";
import UpperQuotesIcon from "@/icons/UpperQuotesIcon";
import BottomQuotesIcon from "@/icons/BottomQuotesIcon";
import LeftArrowIcon from "@/icons/LeftArrowIcon";
import RightArrowIcon from "@/icons/RightArrowIcon";
import ProductCart from "@/components/layout/common/ProductCart";

export default function SeasonalSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const { problemSolution, loadingStates, errorStates, fetchProblemSolution } =
    useHomepageStore();

  useEffect(() => {
    fetchProblemSolution();
  }, [fetchProblemSolution]);

  const isLoading = loadingStates.problemSolution;
  const error = errorStates.problemSolution;
  const apiItems: ProblemSolutionItem[] = problemSolution?.items || [];

  // Convert API data to slides format
  const apiSlides = apiItems.map((item) => ({
    question: item.question,
    description: item.answer,
    products: item.solutions,
  }));

  // Use API data if available, otherwise use fallback
  const slides = apiSlides.length > 0 ? apiSlides : [];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <>
      <style jsx>{`
        .mobile-scroll {
          scrollbar-width: thin;
          scrollbar-color: transparent transparent;
        }

        .mobile-scroll::-webkit-scrollbar {
          height: 4px;
        }

        .mobile-scroll::-webkit-scrollbar-track {
          background: transparent;
        }

        .mobile-scroll::-webkit-scrollbar-thumb {
          background: transparent;
          border-radius: 2px;
        }

        .mobile-scroll:hover::-webkit-scrollbar-thumb {
          background: #d1d5db;
        }

        .mobile-scroll::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>

      <section className="py-8 sm:py-12 lg:py-16 bg-gray-50 border-b border-b-dimGray_01">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-8 sm:mb-12">
            {problemSolution?.display_title || "Seasonal Problem & Solutions"}
          </h2>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primabg-primary"></div>
              <span className="ml-3 text-gray-600">Loading solutions...</span>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-8">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={() => fetchProblemSolution()}
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-green-900"
              >
                Retry
              </button>
            </div>
          )}

          {!isLoading && !error && (
            <div className="relative">
              {/* Mobile Layout */}
              <div className="block lg:hidden">
                {/* Question Section - Mobile */}
                <div className="bg-yellow-200 rounded-xl p-6 mb-6 relative">
                  {/* Quote marks */}
                  <div className="absolute -top-6 left-6 text-6xl text-yellow-600 mb-4 leading-none font-serif">
                    <UpperQuotesIcon className="w-8" />
                  </div>

                  <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                    {slides[currentSlide]?.question}
                  </h3>

                  <p className="text-sm text-gray-700 leading-relaxed text-center mb-4">
                    {slides[currentSlide]?.description}
                  </p>
                  <div className="absolute -bottom-6 right-6  text-6xl text-yellow-600 text-right leading-none font-serif">
                    <BottomQuotesIcon className="w-8" />
                  </div>
                </div>

                {/* Products Section - Mobile (Horizontal Scroll) */}
                <div className="bg-yellow-100 rounded-xl p-4">
                  <div className="overflow-x-auto mobile-scroll">
                    <div className="flex gap-4 pb-2 min-w-max">
                      {slides[currentSlide]?.products.map(
                        (product: any, index: number) => (
                          <ProductCart product={product} key={index} />
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden lg:block">
                <div className="bg-dimYellow_01 rounded-2xl p-8 relative overflow-hidden">
                  {/* Content Grid */}
                  <div className="grid grid-cols-4 gap-8 items-stretch">
                    {/* Question Section */}
                    <div className="relative col-span-1 bg-dimYellow rounded-xl p-6 py-16">
                      {/* Quote marks */}
                      <div className="absolute -top-6 left-6 text-6xl text-yellow-600 mb-4 leading-none font-serif">
                        <UpperQuotesIcon className="sm:w-8 w-16" />
                      </div>

                      <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                        {slides[currentSlide]?.question}
                      </h3>

                      <p className="text-sm text-gray-700 leading-relaxed text-center mb-4">
                        {slides[currentSlide]?.description}
                      </p>

                      <div className="absolute -bottom-6 right-6  text-6xl text-yellow-600 text-right leading-none font-serif">
                        <BottomQuotesIcon className="sm:w-8 w-16" />
                      </div>
                    </div>

                    {/* Products Section */}
                    <div className="col-span-3 overflow-x-auto mobile-scroll">
                      <div className="flex gap-4 pb-2 min-w-max">
                        {slides[currentSlide]?.products.map(
                          (product: any, index: number) => (
                            <ProductCart product={product} key={index} />
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-center mt-6 sm:mt-8 gap-1">
                {/* Previous Button */}
                <button
                  onClick={prevSlide}
                  className="w-10 h-10 sm:w-12 sm:h-12 text-white rounded-none flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={slides.length <= 1}
                >
                  <LeftArrowIcon />
                </button>

                {/* Dots Indicator */}
                <div className="flex gap-3">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentSlide
                          ? "bg-primary"
                          : "bg-green-300 hover:bg-green-400"
                      }`}
                    />
                  ))}
                </div>

                {/* Next Button */}
                <button
                  onClick={nextSlide}
                  className="w-10 h-10 sm:w-12 sm:h-12 text-white rounded-none flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={slides.length <= 1}
                >
                  <RightArrowIcon />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
