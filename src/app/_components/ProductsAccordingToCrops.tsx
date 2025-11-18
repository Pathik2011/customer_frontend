"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useHomepageStore } from "@/store/useHomepageStore";
import { CropItem } from "@/types/homepage";

export default function ProductsAccordingToCrops() {
  const router = useRouter();
  const {
    crops: cropsData,
    loadingStates,
    errorStates,
    fetchCrops,
  } = useHomepageStore();

  const handleCropClick = (cropName: string) => {
    router.push(`/shop?crop=${encodeURIComponent(cropName)}`);
  };

  const handleViewAll = () => {
    router.push("/shop");
  };

  useEffect(() => {
    fetchCrops();
  }, [fetchCrops]);

  const isLoading = loadingStates.crops;
  const error = errorStates.crops;
  const apiItems: CropItem[] = cropsData?.items || [];

  // Convert API data to display format - use only dynamic data
  const crops = apiItems.map((item, index) => {
    const bgImages = [
      "/images/products_crops_1.png",
      "/images/products_crops_2.png",
      "/images/products_crops_3.png",
      "/images/products_crops_4.png",
      "/images/products_crops_5.png",
    ];
    const emojis = {
      Potato: "🥔",
      Groundnut: "🥜",
      Tomato: "🍅",
      Grape: "🍇",
      Cowpea: "🌱",
    };

    // Construct full URL for icon if it exists and is a relative path
    const iconUrl = item.icon_url ?? null;

    return {
      id: item.crop_id,
      name: item.crop_name,
      image: iconUrl,
      bgImage: bgImages[index % bgImages.length],
      emoji: emojis[item.crop_name as keyof typeof emojis] || "🌾",
    };
  });
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white border-b border-b-dimGray_01">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-800"></div>
            <span className="ml-3 text-gray-600">Loading crops...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-8">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => fetchCrops()}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-green-900"
            >
              Retry
            </button>
          </div>
        )}

        {!isLoading && !error && crops.length > 0 && (
          <>
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12 lg:mb-16">
              {/* Left Side - Title and Description */}
              <div className="mb-8 lg:mb-0 lg:max-w-md">
                <h2 className="font-[Google Sans] font-medium text-[28px] text-3xl sm:text-4xl lg:text-5xl text-gray-900 mb-4 lg:mb-6">
                  {cropsData?.display_title || "Products According to Crops"}
                </h2>
                <p className="font-[Plus Jakarta Sans] font-semibold text-[15px] text-base sm:text-lg text-gray-600 leading-relaxed">
                  Winter Jeans Farming - Curated for Crops. Carefully Chosen for
                  You.
                </p>
              </div>

              {/* Right Side - View All Button */}
              <div className="hidden lg:flex justify-center lg:justify-end">
                <button
                  onClick={handleViewAll}
                  className="bg-primary hover:bg-green-900 text-white px-6 py-3 rounded-lg font-medium text-sm sm:text-base transition-colors flex items-center gap-2"
                >
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

            {/* Crops Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
              {crops.map((crop) => (
                <div
                  key={crop.id}
                  onClick={() => handleCropClick(crop.name)}
                  className="group cursor-pointer"
                >
                  {/* Crop Card */}
                  <div className="rounded-2xl p-4 sm:p-6 lg:p-8 text-center transition-transform group-hover:scale-105">
                    {/* Crop Image with Background */}
                    <div className="mb-4 sm:mb-6 relative">
                      {/* Background Image */}
                      <div className="w-32 h-32 sm:w-36 sm:h-36 lg:w-40 lg:h-40 mx-auto relative">
                        <img
                          src={crop.bgImage}
                          alt=""
                          className="w-full h-full object-contain"
                        />
                        {/* Crop Image on top */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden">
                          {crop.image ? (
                            <img
                              src={crop.image}
                              alt={crop.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-transparent from-yellow-400 to-orange-500 flex items-center justify-center">
                              <div className="text-2xl sm:text-3xl lg:text-4xl">
                                {crop.emoji || "🌾"}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Crop Name */}
                    <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800">
                      {crop.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
            {/* Right Side - View All Button */}
            <div className="flex lg:hidden justify-center lg:justify-end">
              <button
                onClick={handleViewAll}
                className="bg-primary hover:bg-green-900 text-white px-6 py-3 rounded-lg font-medium text-sm sm:text-base transition-colors flex items-center gap-2"
              >
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
          </>
        )}
      </div>
    </section>
  );
}
