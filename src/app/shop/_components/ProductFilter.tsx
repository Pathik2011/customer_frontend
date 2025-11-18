"use client";

import ResetIcon from "@/icons/ResetIcon";
import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCategoryStore } from "@/store/useCategoryStore";
import { useProductStore } from "@/store/useProductStore";
import { ProductsQueryParams } from "@/types/product";

export default function ProductFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasInitializedProducts = useRef(false);

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCrops, setSelectedCrops] = useState<string[]>([]);
  const [selectedTargetPests, setSelectedTargetPests] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  const {
    categories,
    brands,
    crops,
    fetchCategoriesBrandsAndCrops,
    isLoading: categoriesLoading,
  } = useCategoryStore();
  const {
    filters,
    applyFilters,
    clearFilters,
    fetchProductFilters,
    currentFilters,
  } = useProductStore();

  // Helper function to update URL params
  const updateURLParams = (filters: ProductsQueryParams) => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        if (Array.isArray(value)) {
          value.forEach((item) => params.append(key, item));
        } else {
          params.set(key, value.toString());
        }
      }
    });

    const queryString = params.toString();
    const newUrl = queryString ? `/shop?${queryString}` : "/shop";
    router.push(newUrl, { scroll: false });
  };

  useEffect(() => {
    fetchCategoriesBrandsAndCrops();
    fetchProductFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Initialize filters from URL params on mount
  useEffect(() => {
    // Only run once on initial mount
    if (hasInitializedProducts.current) {
      return;
    }

    hasInitializedProducts.current = true;

    // Get all values for multi-select params
    const categories = searchParams.getAll("category");
    const brands = searchParams.getAll("brand");
    const crops = searchParams.getAll("crop");
    const target_pests = searchParams.getAll("target_pest");
    const search_term = searchParams.get("search_term") || undefined;
    const min_price = searchParams.get("min_price");
    const max_price = searchParams.get("max_price");

    // Update local state
    setSelectedCategories(categories);
    setSelectedBrands(brands);
    setSelectedCrops(crops);
    setSelectedTargetPests(target_pests);

    const filtersFromURL: ProductsQueryParams = {
      category: categories.length > 0 ? categories : undefined,
      brand: brands.length > 0 ? brands : undefined,
      crop: crops.length > 0 ? crops : undefined,
      target_pest: target_pests.length > 0 ? target_pests : undefined,
      search_term,
      min_price: min_price ? parseFloat(min_price) : undefined,
      max_price: max_price ? parseFloat(max_price) : undefined,
    };

    // Apply filters (will fetch products)
    applyFilters(filtersFromURL);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync price range with store filters
  useEffect(() => {
    setPriceRange({
      min: currentFilters.min_price?.toString() || "",
      max: currentFilters.max_price?.toString() || "",
    });
  }, [currentFilters]);
  const handleCategorySelect = (categoryName: string) => {
    const newSelected = selectedCategories.includes(categoryName)
      ? selectedCategories.filter((c) => c !== categoryName)
      : [...selectedCategories, categoryName];

    setSelectedCategories(newSelected);

    // For store compatibility, use first selected or undefined
    const newFilters: ProductsQueryParams = {
      ...currentFilters,
      category: newSelected.length > 0 ? newSelected : undefined,
      brand: selectedBrands.length > 0 ? selectedBrands : undefined,
      crop: selectedCrops.length > 0 ? selectedCrops : undefined,
      target_pest:
        selectedTargetPests.length > 0 ? selectedTargetPests : undefined,
    };

    applyFilters(newFilters);
    updateURLParams(newFilters);
  };

  const handleBrandSelect = (brandName: string) => {
    const newSelected = selectedBrands.includes(brandName)
      ? selectedBrands.filter((b) => b !== brandName)
      : [...selectedBrands, brandName];

    setSelectedBrands(newSelected);

    const newFilters: ProductsQueryParams = {
      ...currentFilters,
      category: selectedCategories.length > 0 ? selectedCategories : undefined,
      brand: newSelected.length > 0 ? newSelected : undefined,
      crop: selectedCrops.length > 0 ? selectedCrops : undefined,
      target_pest:
        selectedTargetPests.length > 0 ? selectedTargetPests : undefined,
    };

    applyFilters(newFilters);
    updateURLParams(newFilters);
  };

  const handleCropSelect = (cropName: string) => {
    const newSelected = selectedCrops.includes(cropName)
      ? selectedCrops.filter((c) => c !== cropName)
      : [...selectedCrops, cropName];

    setSelectedCrops(newSelected);

    const newFilters: ProductsQueryParams = {
      ...currentFilters,
      category: selectedCategories.length > 0 ? selectedCategories : undefined,
      brand: selectedBrands.length > 0 ? selectedBrands : undefined,
      crop: newSelected.length > 0 ? newSelected : undefined,
      target_pest:
        selectedTargetPests.length > 0 ? selectedTargetPests : undefined,
    };

    applyFilters(newFilters);
    updateURLParams(newFilters);
  };

  const handleTargetPestSelect = (targetPest: string) => {
    const newSelected = selectedTargetPests.includes(targetPest)
      ? selectedTargetPests.filter((p) => p !== targetPest)
      : [...selectedTargetPests, targetPest];

    setSelectedTargetPests(newSelected);

    const newFilters: ProductsQueryParams = {
      ...currentFilters,
      category: selectedCategories.length > 0 ? selectedCategories : undefined,
      brand: selectedBrands.length > 0 ? selectedBrands : undefined,
      crop: selectedCrops.length > 0 ? selectedCrops : undefined,
      target_pest: newSelected.length > 0 ? newSelected : undefined,
    };

    applyFilters(newFilters);
    updateURLParams(newFilters);
  };

  const handlePriceFilter = () => {
    const minPrice = priceRange.min ? parseFloat(priceRange.min) : undefined;
    const maxPrice = priceRange.max ? parseFloat(priceRange.max) : undefined;
    const newFilters: ProductsQueryParams = {
      ...currentFilters,
      category: selectedCategories.length > 0 ? selectedCategories : undefined,
      brand: selectedBrands.length > 0 ? selectedBrands : undefined,
      crop: selectedCrops.length > 0 ? selectedCrops : undefined,
      target_pest:
        selectedTargetPests.length > 0 ? selectedTargetPests : undefined,
      min_price: minPrice,
      max_price: maxPrice,
    };

    applyFilters(newFilters);
    updateURLParams(newFilters);
    setOpenDropdown(null);
  };

  const handleSortChange = () => {
    // Note: The API doesn't seem to have sorting, so this would need to be implemented
    setOpenDropdown(null);
  };

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedCrops([]);
    setSelectedTargetPests([]);
    setPriceRange({ min: "", max: "" });
    clearFilters();
    router.push("/shop", { scroll: false });
  };

  return (
    <div className="space-y-4">
      {/* Filters - All wrap naturally */}
      <div className="pb-2">
        <div className="overflow-x-auto lg:overflow-visible scrollbar-hide flex justify-between flex-nowrap gap-1 lg:gap-3 ">
          <div className="flex gap-1 lg:gap-3 flex-nowrap">
            {/* Categories Dropdown */}
            <div className="static lg:relative">
              <button
                className="flex items-center justify-center gap-1 lg:gap-2 px-3 py-2 lg:px-4 lg:py-2 bg-[#ffffff] hover:bg-gray-50 rounded-xl text-xs lg:text-sm text-black border border-gray-200 whitespace-nowrap"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenDropdown(
                    openDropdown === "categories" ? null : "categories"
                  );
                }}
              >
                {selectedCategories.length > 0
                  ? `Categories (${selectedCategories.length})`
                  : "All Categories"}
                <span className="material-symbols-outlined text-sm">
                  keyboard_arrow_down
                </span>
              </button>

              {openDropdown === "categories" && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
                  <div className="py-2 max-h-96 overflow-y-auto">
                    {categoriesLoading ? (
                      <div className="px-4 py-2 text-sm text-gray-500">
                        Loading...
                      </div>
                    ) : (
                      categories.map((category) => (
                        <button
                          key={category.category_id}
                          className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() =>
                            handleCategorySelect(category.category_name)
                          }
                        >
                          <div className="w-4 h-4 border border-gray-300 rounded flex items-center justify-center flex-shrink-0">
                            {selectedCategories.includes(
                              category.category_name
                            ) && (
                              <span className="material-symbols-outlined text-xs text-primary">
                                check
                              </span>
                            )}
                          </div>
                          {category.category_name}
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Brands Dropdown */}
            <div className="static lg:relative">
              <button
                className="w-max flex items-center justify-center gap-1 px-4 py-2 bg-[#ffffff] hover:bg-gray-50 rounded-xl text-sm text-black border border-gray-200"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenDropdown(openDropdown === "brands" ? null : "brands");
                }}
              >
                {selectedBrands.length > 0
                  ? `Brands (${selectedBrands.length})`
                  : "Brands"}
                <span className="material-symbols-outlined text-sm">
                  keyboard_arrow_down
                </span>
              </button>

              {openDropdown === "brands" && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
                  <div className="py-2 max-h-64 overflow-y-auto">
                    {brands.map((brand) => (
                      <button
                        key={brand.brand_id}
                        className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => handleBrandSelect(brand.brand_name)}
                      >
                        <div className="w-4 h-4 border border-gray-300 rounded flex items-center justify-center flex-shrink-0">
                          {selectedBrands.includes(brand.brand_name) && (
                            <span className="material-symbols-outlined text-xs text-primary">
                              check
                            </span>
                          )}
                        </div>
                        {brand.brand_name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Crops Dropdown */}
            <div className="static lg:relative">
              <button
                className="w-max flex items-center justify-center gap-1 px-4 py-2 bg-[#ffffff] hover:bg-gray-50 rounded-xl text-sm text-black border border-gray-200"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenDropdown(openDropdown === "crops" ? null : "crops");
                }}
              >
                {selectedCrops.length > 0
                  ? `Crops (${selectedCrops.length})`
                  : "Crop"}
                <span className="material-symbols-outlined text-sm">
                  keyboard_arrow_down
                </span>
              </button>

              {openDropdown === "crops" && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
                  <div className="py-2 max-h-64 overflow-y-auto">
                    {crops.map((crop) => (
                      <button
                        key={crop.crop_id}
                        className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => handleCropSelect(crop.crop_name)}
                      >
                        <div className="w-4 h-4 border border-gray-300 rounded flex items-center justify-center flex-shrink-0">
                          {selectedCrops.includes(crop.crop_name) && (
                            <span className="material-symbols-outlined text-xs text-primary">
                              check
                            </span>
                          )}
                        </div>
                        {crop.crop_name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Target Pest Dropdown */}
            <div className="static lg:relative">
              <button
                className="w-max flex items-center justify-center gap-1 px-4 py-2 bg-[#ffffff] hover:bg-gray-50 rounded-xl text-sm text-black border border-gray-200"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenDropdown(
                    openDropdown === "target_pest" ? null : "target_pest"
                  );
                }}
              >
                {selectedTargetPests.length > 0
                  ? `Target Pest (${selectedTargetPests.length})`
                  : "Target Pest"}
                <span className="material-symbols-outlined text-sm">
                  keyboard_arrow_down
                </span>
              </button>

              {openDropdown === "target_pest" && filters && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
                  <div className="py-2 max-h-64 overflow-y-auto">
                    {filters.targetPests.map((pest) => (
                      <button
                        key={pest}
                        className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => handleTargetPestSelect(pest)}
                      >
                        <div className="w-4 h-4 border border-gray-300 rounded flex items-center justify-center flex-shrink-0">
                          {selectedTargetPests.includes(pest) && (
                            <span className="material-symbols-outlined text-xs text-primary">
                              check
                            </span>
                          )}
                        </div>
                        {pest}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Price Range Dropdown */}
            <div className="static lg:relative">
              <button
                className="w-max flex items-center justify-center gap-1 px-4 py-2 bg-[#ffffff] hover:bg-gray-50 rounded-xl text-sm text-black border border-gray-200"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenDropdown(openDropdown === "price" ? null : "price");
                }}
              >
                Price
                <span className="material-symbols-outlined text-sm">
                  keyboard_arrow_down
                </span>
              </button>

              {openDropdown === "price" && (
                <div
                  className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-xl"
                  style={{ zIndex: 99999 }}
                >
                  <div className="p-4">
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Min Price
                        </label>
                        <input
                          type="number"
                          placeholder="₹0"
                          value={priceRange.min}
                          onChange={(e) =>
                            setPriceRange((prev) => ({
                              ...prev,
                              min: e.target.value,
                            }))
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Max Price
                        </label>
                        <input
                          type="number"
                          placeholder="₹10000"
                          value={priceRange.max}
                          onChange={(e) =>
                            setPriceRange((prev) => ({
                              ...prev,
                              max: e.target.value,
                            }))
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        />
                      </div>
                      <button
                        onClick={handlePriceFilter}
                        className="w-full bg-primary text-white px-3 py-2 rounded-md text-sm hover:bg-green-700"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>{" "}
          <div className="static lg:relative flex gap-1 lg:gap-3 flex-nowrap">
            {/* Sort By Dropdown */}
            <div>
              <button
                className="flex items-center justify-center gap-1 lg:gap-2 px-3 py-2 lg:px-4 lg:py-2 bg-[#ffffff] hover:bg-gray-50 rounded-xl text-xs lg:text-sm text-black border border-gray-200 whitespace-nowrap"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenDropdown(openDropdown === "sort" ? null : "sort");
                }}
              >
                Sort By
                <span className="material-symbols-outlined text-sm">
                  keyboard_arrow_down
                </span>
              </button>

              {openDropdown === "sort" && (
                <div
                  className="absolute top-full right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-xl"
                  style={{ zIndex: 99999 }}
                >
                  <div className="py-2">
                    {[
                      { value: "name", label: "Name A-Z" },
                      { value: "name_desc", label: "Name Z-A" },
                      { value: "price_low", label: "Price Low to High" },
                      { value: "price_high", label: "Price High to Low" },
                    ].map((option) => (
                      <button
                        key={option.value}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={handleSortChange}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Reset Filter Button */}
            <button
              className="h-max flex items-center justify-center gap-1 px-3 py-2 lg:px-4 lg:py-2 bg-[#ffffff] hover:bg-gray-50 rounded-xl text-xs lg:text-sm text-black border border-gray-200 whitespace-nowrap"
              onClick={handleResetFilters}
            >
              Reset Filter
              <span className="material-symbols-outlined text-sm">
                <ResetIcon />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
