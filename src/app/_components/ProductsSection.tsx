"use client";

import { useEffect } from "react";
import { useHomepageStore } from "@/store/useHomepageStore";
import { FarmersBundleItem } from "@/types/homepage";
import ShoppingBagIcon from "@/icons/ShoppingBagIcon";
import { Button } from "@/components/layout/common";

export default function ProductsSection() {
  const { farmersBundle, loadingStates, errorStates, fetchFarmersBundle } =
    useHomepageStore();

  useEffect(() => {
    fetchFarmersBundle();
  }, [fetchFarmersBundle]);

  // Utility function to truncate text
  const truncateText = (text: string, maxLength: number) => {
    if (!text) return "Quality agricultural product";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };

  // Utility function to format price with 2 decimal places
  const formatPrice = (price: number | undefined) => {
    return (price || 148).toFixed(2);
  };

  const isLoading = loadingStates.farmersBundle;
  const error = errorStates.farmersBundle;
  const items: FarmersBundleItem[] = farmersBundle?.items || [];

  const displayItems = items ?? [];

  return (
    <section
      className="py-8 sm:py-12 lg:py-16 bg-orange-50 border-b border-b-dimGray_01 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url(/images/product_section_bg.png)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-0 mb-8 sm:mb-12">
          <div>
            <h2 className="font-[Google Sans] font-medium text-[28px] text-2xl text-gray-800 mb-2 sm:mb-4">
              {farmersBundle?.display_title || "Farmer's Choice Bundles"}
            </h2>
            <p className="font-semibold text-[15px] text-sm sm:text-base text-dimGray max-w-md">
              Winter-wise Farming. Curated for Crops.
              <br />
              Carefully Chosen for You.
            </p>
          </div>
          <Button
            className="hidden w-[251px] h-12 font-semibold text-[16px] bg-green-800 hover:bg-green-900 text-white px-4 rounded-lg lg:flex items-center justify-center gap-2 text-sm"
            disabled
          >
            Add All Items to Bag <ShoppingBagIcon />
          </Button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-800"></div>
            <span className="ml-3 text-gray-600">Loading products...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-8">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => fetchFarmersBundle()}
              className="bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-900"
            >
              Retry
            </button>
          </div>
        )}

        {/* Mobile Layout */}
        {!isLoading && !error && (
          <div className="block md:hidden space-y-4">
            {/* First Product - Large Card */}
            {displayItems[0] && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="w-full h-40 rounded-lg flex items-center justify-center mb-6">
                  {displayItems[0].image ? (
                    <img
                      src={displayItems[0].image}
                      alt={displayItems[0].product_name}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  ) : (
                    <div className="w-16 h-20 bg-green-200 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">🧪</span>
                    </div>
                  )}
                </div>
                <div className="items-center">
                  <h3
                    className="font-semibold text-gray-800 mb-3 text-center text-lg"
                    style={{ marginTop: "70px" }}
                  >
                    {displayItems[0].product_name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 text-center leading-relaxed">
                    {truncateText(displayItems[0].product_description, 80)}
                  </p>
                  <p className="text-xs text-gray-500 mb-6 text-center">
                    {displayItems[0].brand.brand_name}
                  </p>

                  <div className="flex items-center justify-center gap-4">
                    <div className="text-center">
                      <span className="text-lg font-bold text-gray-800">
                        ₹
                        {formatPrice(
                          displayItems[0].product_variants[0]?.discounted_price
                        )}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">
                        for {displayItems[0].product_variants[0]?.size || 100}
                        {displayItems[0].product_variants[0]?.uom || "gm"}
                      </span>
                    </div>
                    <button className="bg-green-800 hover:bg-green-900 text-white px-6 py-2 rounded-lg text-sm font-medium">
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 2x2 Grid for other products */}
            <div className="grid grid-cols-2 gap-4">
              {displayItems.slice(1, 5).map((item) => (
                <div
                  key={item.product_id}
                  className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                >
                  <div className="w-full h-20  rounded-lg flex items-center justify-center mb-3">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.product_name}
                        className="w-full h-full object-contain rounded-lg"
                      />
                    ) : (
                      <div className="w-10 h-12 bg-red-200 rounded-lg flex items-center justify-center">
                        <span className="text-lg">🧪</span>
                      </div>
                    )}
                  </div>

                  <h3 className="font-semibold text-gray-800 mb-2 text-sm">
                    {item.product_name}
                  </h3>
                  <p className="text-xs text-gray-600 mb-3 leading-relaxed line-clamp-2">
                    {truncateText(item.product_description, 50)}
                  </p>

                  <div className="space-y-2">
                    <div>
                      <span className="text-base font-bold text-gray-800">
                        ₹
                        {formatPrice(
                          item.product_variants[0]?.discounted_price
                        )}
                      </span>
                      <span className="text-xs text-gray-500 block">
                        for {item.product_variants[0]?.size || 100}
                        {item.product_variants[0]?.uom || "gm"}
                      </span>
                    </div>
                    <button className="w-full bg-green-800 hover:bg-green-900 text-white px-3 py-1 rounded-lg text-xs font-medium">
                      Buy
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <Button
          className="flex w-[251px] mt-5 mx-auto h-12 font-semibold text-[16px] bg-green-800 hover:bg-green-900 text-white px-4 rounded-lg lg:hidden items-center justify-center gap-2 text-sm"
          disabled
        >
          Add All Items to Bag <ShoppingBagIcon />
        </Button>
        {/* Desktop Layout */}
        {!isLoading && !error && (
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
            {/* First Product - Large Card */}
            {displayItems[0] && (
              <div className="lg:col-span-1 lg:row-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex justify-center items-center">
                <div className="h-max">
                  <div className="w-full h-48 rounded-lg flex items-center justify-center mb-6">
                    {displayItems[0].image ? (
                      <img
                        src={displayItems[0].image}
                        alt={displayItems[0].product_name}
                        className="w-full h-full object-contain rounded-lg"
                      />
                    ) : (
                      <div className="w-16 h-20 bg-green-200 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">🧪</span>
                      </div>
                    )}
                  </div>

                  <h3 className="font-semibold text-gray-800 mb-3 text-center">
                    {displayItems[0].product_name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 text-center leading-relaxed">
                    {truncateText(displayItems[0].product_description, 100)}
                  </p>
                  <p className="text-xs text-gray-500 mb-6 text-center">
                    {displayItems[0].brand.brand_name}
                  </p>

                  <div className="flex items-center justify-center gap-4">
                    <div className="text-center">
                      <span className="text-lg font-bold text-gray-800">
                        ₹
                        {formatPrice(
                          displayItems[0].product_variants[0]?.discounted_price
                        )}
                      </span>
                      <span className="text-sm text-gray-500 ml-1">
                        for {displayItems[0].product_variants[0]?.size || 100}
                        {displayItems[0].product_variants[0]?.uom || "gm"}
                      </span>
                    </div>
                    <button className="bg-green-800 hover:bg-green-900 text-white px-4 py-2 rounded-lg text-sm font-medium">
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Other Products */}
            {displayItems.slice(1, 5).map((item) => (
              <div
                key={item.product_id}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <div className="w-full h-24  rounded-lg flex items-center justify-center mb-4">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.product_name}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  ) : (
                    <div className="w-12 h-16 bg-red-200 rounded-lg flex items-center justify-center">
                      <span className="text-xl">🧪</span>
                    </div>
                  )}
                </div>

                <h3 className="font-semibold text-gray-800 mb-2">
                  {item.product_name}
                </h3>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                  {truncateText(item.product_description, 80)}
                </p>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-gray-800">
                      ₹{formatPrice(item.product_variants[0]?.discounted_price)}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">
                      for {item.product_variants[0]?.size || 100}
                      {item.product_variants[0]?.uom || "gm"}
                    </span>
                  </div>
                  <button className="bg-green-800 hover:bg-green-900 text-white px-4 py-2 rounded-lg text-sm font-medium">
                    Buy
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
