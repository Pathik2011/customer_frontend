"use client";

import { useEffect } from "react";
import { useHomepageStore } from "@/store/useHomepageStore";
import { SeedItem } from "@/types/homepage";
import ProductCart from "@/components/layout/common/ProductCart";

export default function ProductsForUpcomingSeasons() {
  const {
    upcomingProducts,
    loadingStates,
    errorStates,
    fetchUpcomingProducts,
  } = useHomepageStore();

  useEffect(() => {
    fetchUpcomingProducts();
  }, [fetchUpcomingProducts]);

  const isLoading = loadingStates.upcomingProducts;
  const error = errorStates.upcomingProducts;
  const apiItems: SeedItem[] = upcomingProducts?.items || [];

  // If no API data, show empty state instead of fallback
  if (apiItems.length === 0 && !isLoading && !error) {
    return (
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50 border-b border-b-dimGray_01">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Products For Upcoming Seasons
          </h2>
          <p className="text-dimGray">
            No upcoming products available at the moment.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="py-16 sm:py-20 lg:py-24 bg-gray-50 border-b border-b-dimGray_01"
      style={{ backgroundImage: 'url(/images/Products_for_upcoming_seasons.png)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-800"></div>
            <span className="ml-3 text-dimGray">
              Loading upcoming products...
            </span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-8">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => fetchUpcomingProducts()}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-green-900"
            >
              Retry
            </button>
          </div>
        )}
        {!isLoading && !error && apiItems.length > 0 && (
          <>
            {/* Mobile Layout */}
            <div className="block lg:hidden">
              {/* Header - Mobile */}
              <div className="text-center mb-8">
                <h2 className="font-[Google Sans] font-medium text-[28px] text-gray-900 mb-4">
                  {upcomingProducts?.display_title ||
                    "Products For Upcoming Seasons"}
                </h2>
                <p className="text-base sm:text-lg text-dimGray leading-relaxed">
                  Winter-wise Farming: Curated for Crops, Carefully Chosen for
                  You.
                </p>
              </div>

              {/* Products Grid - Mobile (2 columns) */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-8">
                {apiItems.slice(0, 2).map((product: any, index) => (
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
                  <h2 className="font-[Google Sans] font-medium text-[28px] text-gray-900 mb-6">
                    Products For Upcoming Seasons
                  </h2>
                  <p className="font-[Plus Jakarta Sans] font-semibold text-[15px] text-lg text-dimGray max-w-md leading-relaxed">
                    Winter-wise Farming: Curated for Crops, Carefully Chosen for
                    You.
                  </p>
                </div>

                {/* Right Side - View All Button */}
                <div>
                  <button className="bg-primary hover:bg-green-900 text-white px-6 py-3 rounded-lg font-medium text-base transition-colors flex items-center gap-2">
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

              {/* Products Grid - Desktop */}
              <div className="grid grid-cols-4 xl:grid-cols-5  gap-6">
                {apiItems.map((product: any, index: number) => (
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
