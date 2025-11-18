"use client";

import ProductCart from "@/components/layout/common/ProductCart";
import { useProductStore } from "@/store";
import { useEffect, useState, Suspense } from "react";
import ProductFilter from "./ProductFilter";

export default function AllProductSection() {
  const {
    products,
    isLoading,
    error,
    hasMore,
    fetchProducts,
    fetchMoreProducts,
    fetchProductFilters,
    clearFilters,
    currentFilters,
  } = useProductStore();

  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    // Only fetch product filters, not products
    // Products will be fetched by ProductFilter component based on URL params
    fetchProductFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle Load More functionality
  const handleLoadMore = async () => {
    if (!hasMore || isLoading) return;

    setLoadingMore(true);
    try {
      await fetchMoreProducts();
    } catch (error) {
      console.error("Failed to load more products:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  // Check if any filters are applied
  const hasActiveFilters = () => {
    return Object.keys(currentFilters).some(
      (key) =>
        key !== "skip" &&
        key !== "limit" &&
        currentFilters[key as keyof typeof currentFilters]
    );
  };

  // Get filter summary for display
  const getFilterSummary = () => {
    const filters = [];
    if (currentFilters.search_term)
      filters.push(`"${currentFilters.search_term}"`);
    if (currentFilters.category)
      filters.push(`Category: ${currentFilters.category}`);
    if (currentFilters.brand) filters.push(`Brand: ${currentFilters.brand}`);
    if (currentFilters.crop) filters.push(`Crop: ${currentFilters.crop}`);
    if (currentFilters.target_pest)
      filters.push(`Target Pest: ${currentFilters.target_pest}`);
    if (currentFilters.min_price || currentFilters.max_price) {
      const priceRange = `₹${currentFilters.min_price || 0} - ₹${
        currentFilters.max_price || "∞"
      }`;
      filters.push(`Price: ${priceRange}`);
    }
    return filters.join(", ");
  };

  return (
    <section className="py-10 sm:py-20 lg:py-24 bg-[#FAFAFA] border-b border-b-dimGray_01">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Layout */}
        <div className="block lg:hidden">
          {/* Header - Mobile */}
          <div className="text-center mb-8">
            {/* Mobile Filters */}
            <div className="mb-6 relative lg:static z-10">
              <Suspense
                fallback={
                  <div className="h-32 flex items-center justify-center">
                    Loading filters...
                  </div>
                }
              >
                <ProductFilter />
              </Suspense>
            </div>
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
                onClick={() => fetchProducts()}
                className="bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-900"
              >
                Retry
              </button>
            </div>
          )}

          {/* No Products Found - Mobile */}
          {!isLoading && !error && products.length === 0 && (
            <div className="text-center py-12">
              <div className="mb-4">
                <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-4xl text-gray-400">
                    search_off
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {hasActiveFilters()
                    ? "No Products Found"
                    : "No Products Available"}
                </h3>
                <p className="text-gray-600 mb-6">
                  {hasActiveFilters()
                    ? `No products match your current filters: ${getFilterSummary()}. Try adjusting your search criteria.`
                    : "There are currently no products available. Please check back later."}
                </p>
                {hasActiveFilters() ? (
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => clearFilters()}
                      className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-green-700 font-medium"
                    >
                      Clear Filters
                    </button>
                    <button
                      onClick={() => fetchProducts()}
                      className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 font-medium"
                    >
                      View All Products
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => fetchProducts()}
                    className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-green-700 font-medium"
                  >
                    Refresh Products
                  </button>
                )}
              </div>
            </div>
          )}
          {/* Products Grid - Mobile */}
          {!isLoading && !error && products.length > 0 && (
            <div className="relative">
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-8 relative z-0">
                {products.map((product, index) => (
                  <ProductCart
                    product={product}
                    key={`${product.product_id}-${index}`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Load More Button - Mobile */}
          {!isLoading && !error && products.length > 0 && hasMore && (
            <div className="flex justify-center">
              <button
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3 rounded-full font-medium text-base transition-colors flex items-center gap-2"
              >
                {loadingMore ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-700"></div>
                    Loading...
                  </>
                ) : (
                  "Load More"
                )}
              </button>
            </div>
          )}

          {/* No More Products Message - Mobile */}
          {!isLoading && !error && !hasMore && products.length > 0 && (
            <div className="text-center text-gray-500 text-sm">
              You've seen all {products.length} products
            </div>
          )}
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block overflow-visible">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-3">
            <div>
              <h2 className="text-[28px] font-medium text-black">
                All Products
              </h2>
            </div>
          </div>

          <div className="relative z-50 overflow-visible isolate">
            <Suspense
              fallback={
                <div className="h-32 flex items-center justify-center">
                  Loading filters...
                </div>
              }
            >
              <ProductFilter />
            </Suspense>
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
                onClick={() => fetchProducts()}
                className="bg-green-800 text-white px-6 py-3 rounded-lg hover:bg-green-900"
              >
                Retry
              </button>
            </div>
          )}

          {/* No Products Found - Desktop */}
          {!isLoading && !error && products.length === 0 && (
            <div className="text-center py-20">
              <div className="mb-6">
                <div className="w-32 h-32 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-6xl text-gray-400">
                    search_off
                  </span>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  {hasActiveFilters()
                    ? "No Products Found"
                    : "No Products Available"}
                </h3>
                <p className="text-gray-600 mb-8 max-w-lg mx-auto">
                  {hasActiveFilters()
                    ? `No products match your current search criteria: ${getFilterSummary()}. Try adjusting your filters or browse all products.`
                    : "There are currently no products available in our catalog. Please check back later or contact support."}
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => fetchProducts()}
                    className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-green-700 font-medium"
                  >
                    View All Products
                  </button>
                  <button
                    onClick={() => clearFilters()}
                    className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 font-medium"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Products Grid - Desktop */}
          {!isLoading && !error && products.length > 0 && (
            <div className="grid grid-cols-4 xl:grid-cols-5 gap-6 mb-12 relative z-0">
              {products.map((product, index) => (
                <ProductCart
                  product={product}
                  key={`${product.product_id}-${index}`}
                />
              ))}
            </div>
          )}

          {/* Load More Button - Desktop */}
          {!isLoading && !error && products.length > 0 && hasMore && (
            <div className="flex justify-center">
              <button
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3 rounded-lg font-medium text-base transition-colors flex items-center gap-2"
              >
                {loadingMore ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-700"></div>
                    Loading...
                  </>
                ) : (
                  "Load More"
                )}
              </button>
            </div>
          )}

          {/* No More Products Message - Desktop */}
          {!isLoading && !error && !hasMore && products.length > 0 && (
            <div className="text-center text-gray-500 text-sm">
              You've seen all {products.length} products
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
