"use client";

import { useEffect, useState } from "react";
import { useHomepageStore } from "@/store/useHomepageStore";
import { SeedItem } from "@/types/homepage";
import ProductCart from "@/components/layout/common/ProductCart";

export default function PopularProducts() {
  const {
    popularProductsBottom,
    loadingStates,
    errorStates,
    fetchPopularProductsBottom,
  } = useHomepageStore();

  const [visibleCountMobile, setVisibleCountMobile] = useState(8);
  const [visibleCountDesktop, setVisibleCountDesktop] = useState(15);

  useEffect(() => {
    fetchPopularProductsBottom();
  }, [fetchPopularProductsBottom]);

  const isLoading = loadingStates.popularProductsBottom;
  const error = errorStates.popularProductsBottom;
  const products: SeedItem[] = popularProductsBottom?.items || [];

  const handleLoadMoreMobile = () => {
    setVisibleCountMobile((prev) => prev + 8);
  };

  const handleLoadMoreDesktop = () => {
    setVisibleCountDesktop((prev) => prev + 15);
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-b-dimGray_01">
      <div className="max-w-7xl mx-auto px-3 lg:px-8">
        {/* Mobile Layout */}
        <div className="block lg:hidden">
          {/* Header - Mobile */}
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {popularProductsBottom?.display_title || "Popular Products"}
            </h2>
          </div>

          {/* Loading State - Mobile */}
          {isLoading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-800"></div>
            </div>
          )}

          {/* Error State - Mobile */}
          {error && (
            <div className="text-center py-8">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={() => fetchPopularProductsBottom()}
                className="bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-900"
              >
                Retry
              </button>
            </div>
          )}

          {/* Products Grid - Mobile (2 columns) */}
          {!isLoading && !error && (
            <>
              <div className="w-max mx-auto grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-8">
                {products.slice(0, visibleCountMobile).map((product) => (
                  <ProductCart product={product} key={product.product_id} />
                ))}
              </div>

              {/* Load More Button - Mobile */}
              {visibleCountMobile < products.length && (
                <div className="flex justify-center">
                  <button
                    onClick={handleLoadMoreMobile}
                    className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-full font-medium text-base transition-colors"
                  >
                    Load More
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              {popularProductsBottom?.display_title || "Popular Products"}
            </h2>
          </div>

          {/* Loading State - Desktop */}
          {isLoading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-800"></div>
            </div>
          )}

          {/* Error State - Desktop */}
          {error && (
            <div className="text-center py-16">
              <p className="text-red-600 mb-6 text-lg">{error}</p>
              <button
                onClick={() => fetchPopularProductsBottom()}
                className="bg-green-800 text-white px-6 py-3 rounded-lg hover:bg-green-900"
              >
                Retry
              </button>
            </div>
          )}

          {/* Products Grid - Desktop (5 columns x 3 rows) */}
          {!isLoading && !error && (
            <>
              <div className="grid grid-cols-4 xl:grid-cols-5 gap-6 mb-12">
                {products
                  .slice(0, visibleCountDesktop)
                  .map((product, index) => (
                    <ProductCart
                      product={product}
                      key={product.product_id + index.toString()}
                    />
                  ))}
              </div>

              {/* Load More Button - Desktop */}
              {visibleCountDesktop < products.length * 3 && (
                <div className="flex justify-center">
                  <button
                    onClick={handleLoadMoreDesktop}
                    className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-lg font-medium text-base transition-colors"
                  >
                    Load More
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
