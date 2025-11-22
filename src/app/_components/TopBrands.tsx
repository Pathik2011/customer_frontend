"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useHomepageStore } from "@/store/useHomepageStore";
import { BrandItem } from "@/types/homepage";

export default function TopBarnds() {
  const router = useRouter();
  const {
    brands: brandsData,
    loadingStates,
    errorStates,
    fetchBrands,
  } = useHomepageStore();

  const handleBrandClick = (brandName: string) => {
    router.push(`/shop?brand=${encodeURIComponent(brandName)}`);
  };

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  const isLoading = loadingStates.brands;
  const error = errorStates.brands;
  const apiItems: BrandItem[] = brandsData?.items || [];

  // Convert API data to display format
  const apiBrands = apiItems.map((item) => ({
    id: item.brand_id,
    name: item.brand_name,
    logo: item.logo_url,
  }));

  // Use API data if available, otherwise use fallback
  const brands = apiBrands.length > 0 ? apiBrands : [];

  return (
    <section className="py-10 sm:py-12 lg:py-16 bg-white border-b border-b-dimGray_01">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-800"></div>
            <span className="ml-3 text-gray-600">Loading brands...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-8">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => fetchBrands()}
              className="bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-900"
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
                <h2 className="font-[Google Sans] font-medium text-[28px] text-3xl text-gray-900 mb-4">
                  {brandsData?.display_title || "Top Brands"}
                </h2>
                <p className="font-[Plus Jakarta Sans] font-semibold text-[15px] text-base sm:text-lg text-gray-600 leading-relaxed">
                  Winter-wise Farming: Curated for Crops, Carefully Chosen for
                  You.
                </p>
              </div>

              {/* Brands Grid - Mobile (3 columns, 4 rows) */}
              <div className="grid grid-cols-3 gap-4 sm:gap-6">
                {brands.map((brand) => (
                  <div
                    key={brand.id}
                    onClick={() => handleBrandClick(brand.name)}
                    className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-[#E0E2E7] hover:shadow-md transition-shadow cursor-pointer"
                  >
                    {/* Brand Logo */}
                    <div className="flex items-center justify-center h-16 sm:h-20">
                      {brand.logo ? (
                        <img
                          src={brand.logo}
                          alt={brand.name}
                          className="max-w-full max-h-full object-contain"
                        />
                      ) : (
                        <div className="flex items-center">
                          <div className="text-green-600 font-bold text-sm sm:text-base tracking-wide">
                            {brand.name}
                          </div>
                          {/* Green leaf accent */}
                          <div className="ml-1">
                            <svg
                              className="w-3 h-3 sm:w-4 sm:h-4 text-green-600"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66C7.71 17.33 9.73 12.2 17 10c7.27 2.2 9.29 7.33 11.29 12l1.89-.66C28.1 16.17 26 10 17 8z" />
                              <path d="M17 2L7 8l10 6 10-6-10-6z" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:block">
              {/* Main Flex Container */}
              <div className="flex flex-row items-center justify-between gap-4">
                {/* Left Side - Text Content */}
                <div className="flex-shrink-0 text-left">
                  <h2 className="text-6xl font-[Google Sans] font-medium text-[28px]  text-gray-900 mb-6">
                    {brandsData?.display_title || "Top Brands"}
                  </h2>
                  <p className="text-xl text-gray-600 max-w-md leading-relaxed">
                    Winter Jeans Farming - Curated for Crops. Carefully Chosen
                    for You.
                  </p>
                </div>

                {/* Right Side - Brands */}
                <div className="flex-1 max-w-3xl">
                  <div className="overflow-x-auto mobile-scroll p-0 scrollbar-hide">
                    <div className="flex items-center gap-16 pb-2 min-w-max">
                      {brands.slice(0, 5).map((brand) => (
                        <div
                          key={brand.id}
                          onClick={() => handleBrandClick(brand.name)}
                          className="flex items-center rounded-xl py-2 justify-center flex-shrink-0 min-w-[160px] cursor-pointer hover:opacity-80 transition-opacity border border-dimGray_01"
                        >
                          {/* Brand Logo */}
                          <div className="flex items-center justify-center">
                            <div className="relative">
                              {brand.logo ? (
                                <img
                                  src={brand.logo}
                                  alt={brand.name}
                                  className="max-w-full max-h-16 object-contain"
                                />
                              ) : (
                                <div className="flex items-center">
                                  <div className="text-green-600 font-bold text-3xl tracking-wide whitespace-nowrap">
                                    {brand.name}
                                  </div>
                                  {/* Green leaf accent */}
                                  <div className="ml-2">
                                    <svg
                                      className="w-8 h-8 text-green-600"
                                      fill="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66C7.71 17.33 9.73 12.2 17 10c7.27 2.2 9.29 7.33 11.29 12l1.89-.66C28.1 16.17 26 10 17 8z" />
                                      <path d="M17 2L7 8l10 6 10-6-10-6z" />
                                    </svg>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
