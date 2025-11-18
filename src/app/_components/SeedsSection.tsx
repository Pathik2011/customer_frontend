"use client";

import { useEffect } from "react";
import { useHomepageStore } from "@/store/useHomepageStore";
import { SeedItem } from "@/types/homepage";
import RightArrowIcon from "@/icons/RightArrowIcon";
import ProductCart from "@/components/layout/common/ProductCart";

export default function SeedsSection() {
  const {
    seeds: seedsData,
    loadingStates,
    errorStates,
    fetchSeeds,
  } = useHomepageStore();

  useEffect(() => {
    fetchSeeds();
  }, [fetchSeeds]);

  const isLoading = loadingStates.seeds;
  const error = errorStates.seeds;
  const apiItems: SeedItem[] = seedsData?.items || [];

  // Use API data if available, otherwise use fallback
  const seeds = apiItems.length > 0 ? apiItems : [];

  return (
    <section
      className="py-16 sm:py-20 lg:py-24 relative overflow-hidden border-b border-b-dimGray_01 bg-[#E8F7F0]"
      style={{ backgroundImage: 'url(/images/seeds_section_bg.png)' }}

    >
      {/* Background overlay for better content readability */}
      <div className="absolute inset-0 bg-transparent bg-opacity-80"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-800"></div>
            <span className="ml-3 text-gray-600">Loading seeds...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-8">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => fetchSeeds()}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-green-900"
            >
              Retry
            </button>
          </div>
        )}

        {!isLoading && !error && (
          <>
            {/* Mobile Layout */}
            <div className="block lg:hidden">
              {/* Header - Mobile */}
              <div className="text-center mb-8">
                <h2 className="font-[Google Sans] font-medium text-[28px] text-gray-900 mb-4">
                  {seedsData?.display_title || "Seeds"}
                </h2>
                <p className="font-[Plus Jakarta Sans] font-semibold text-[15px] text-base sm:text-lg text-gray-600 leading-relaxed">
                  Winter-wise Farming: Curated for Crops, Carefully Chosen for
                  You.
                </p>
              </div>

              {/* Seeds Grid - Mobile (2 columns) */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-8">
                {seeds.slice(0, 2).map((product: any, index: number) => (
                  <ProductCart product={product} key={index} />
                ))}
              </div>

              {/* View All Button - Mobile */}
              <div className="flex justify-center">
                <button className="bg-primary hover:bg-green-900 text-white px-8 py-3 rounded-full font-medium text-base transition-colors flex items-center gap-2">
                  View All
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:block">
              {/* Header Section */}
              <div className="flex flex-row items-center justify-between mb-16">
                {/* Left Side - Title and Description */}
                <div>
                  <h2 className="font-[Google Sans] font-medium text-[28px]  text-gray-900 mb-6">
                    {seedsData?.display_title || "Seeds"}
                  </h2>
                  <p className="font-[Plus Jakarta Sans] font-semibold text-[15px] text-lg text-gray-600 max-w-md leading-relaxed">
                    Winter-wise Farming: Curated for Crops, Carefully Chosen for
                    You.
                  </p>
                </div>

                {/* Right Side - View All Button */}
                <div>
                  <button className="bg-primary hover:bg-green-900 text-white px-6 py-3 rounded-xl font-medium text-base transition-colors flex items-center gap-2">
                    View All
                    <RightArrowIcon />
                  </button>
                </div>
              </div>

              {/* Seeds Grid - Desktop */}
              <div className="grid grid-cols-4 gap-6">
                {seeds.map((product: any, index: number) => (
                  <ProductCart product={product} key={index} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
