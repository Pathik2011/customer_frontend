import React, { useState } from "react";
import { Product } from "@/types/product";
import { SeedItem } from "@/types/homepage";
import Link from "next/link";

type Props = {
  product: Product | SeedItem;
};

const ProductCart = ({ product }: Props) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  // Check if it's a new Product type or old SeedItem type
  const isNewProduct = "variants" in product;

  // Get variants based on product type
  const variants = isNewProduct ? product.variants : product.product_variants;

  // Get current selected variant
  const currentVariant = variants[selectedVariantIndex] || variants[0];

  // Format price to always show 2 decimal places
  const formatPrice = (price: number) => {
    if (!price) return "₹0.00";

    // Round to 2 decimal places
    const roundedPrice = parseFloat(price.toFixed(2));

    // Format with comma separators
    const parts = roundedPrice.toFixed(2).split(".");
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return `₹${integerPart}.${parts[1]}`;
  };

  // Calculate discount percentage
  const calculateDiscount = () => {
    if (isNewProduct) {
      // For new Product type, calculate discount from discount field
      const variant = currentVariant as any;
      const discount = variant.discount;
      return discount > 0 ? Math.round(discount) : null;
    } else {
      // For old SeedItem type, calculate from price difference
      const variant = currentVariant as any;
      const currentPrice = variant.discounted_price;
      const originalPrice = variant.price;

      if (!currentPrice || !originalPrice || originalPrice <= currentPrice) {
        return null;
      }

      const discount = ((originalPrice - currentPrice) / originalPrice) * 100;
      return Math.round(discount);
    }
  };

  // Handle variant selection
  const handleVariantChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = parseInt(event.target.value);
    setSelectedVariantIndex(selectedIndex);
  };

  // Get product image
  const getProductImage = () => {
    if (isNewProduct) {
      const primaryMedia = product.media?.find((m) => m.is_primary);

      return (
        primaryMedia?.media_url ||
        product.media?.[0]?.media_url ||
        product.media?.[0]?.url ||
        ""
      );
    } else {
      return product.image || "";
    }
  };

  // Get brand name
  const getBrandName = () => {
    if (isNewProduct) {
      return product.brand;
    } else {
      return product.brand?.brand_name || "";
    }
  };

  // Get discounted price
  const getDiscountedPrice = () => {
    if (isNewProduct) {
      const variant = currentVariant as any;
      const discount = variant.discount || 0;
      return variant.price * (1 - discount / 100);
    } else {
      const variant = currentVariant as any;
      return variant.discounted_price;
    }
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const discountPercentage = calculateDiscount();
  const productImage = getProductImage();

  const brandName = getBrandName();
  const discountedPrice = getDiscountedPrice();

  return (
    <div
      key={product.product_id}
      className="bg-white rounded-xl p-4 shadow-sm border border-dimGray_01 hover:shadow-md transition-shadow flex flex-col  min-w-[177px] w-[177px] md:min-w-[210px] md:w-[210px] lg:min-w-[230px] lg:w-[230px] xl:min-w-[240px] xl:w-[240px] min-h-[348px]"
    >
      {/* Product Image Container */}
      <div className="mb-4 flex-shrink-0 relative">
        <Link
          href={`/shop/${product.product_id}`}
          className="w-full h-32 rounded-lg flex items-center justify-center mx-auto relative overflow-hidden"
        >
          {/* Discount Badge */}
          {discountPercentage && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
              {discountPercentage}% OFF
            </div>
          )}

          {/* Loading Spinner */}
          {imageLoading && productImage && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          )}

          {/* Main Image or Fallback */}
          {productImage && productImage.trim() !== "" && !imageError ? (
            <img
              src={productImage}
              alt={product.product_name}
              className="w-full h-full object-contain rounded-lg"
              onLoad={handleImageLoad}
              onError={handleImageError}
              style={{ display: imageLoading ? "none" : "block" }}
            />
          ) : (
            <div className="w-16 h-20 bg-gradient-to-b from-green-600 to-green-800 rounded-lg flex items-center justify-center shadow-md relative">
              <div className="w-12 h-14 bg-gradient-to-b from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-lg">🌱</span>
              </div>
              <div className="absolute bottom-1 left-1 right-1 bg-white rounded-sm py-0.5">
                <div className="text-xs font-bold text-primary text-center">
                  {imageError ? "IMG ERROR" : "NO IMG"}
                </div>
              </div>
            </div>
          )}
        </Link>
      </div>

      {/* Product Info */}
      <div className="text-left flex-grow flex flex-col relative z-10">
        <h3 className="font-semibold text-gray-800 text-base mb-2 leading-tight break-words">
          {product.product_name}
        </h3>
        <p className="text-sm text-gray-500 mb-4">{brandName}</p>

        {/* Price */}
        <div className="mb-6">
          <div className="flex items-center justify-start gap-2 flex-wrap">
            <span className="text-xl font-bold text-primary">
              {formatPrice(discountedPrice)}
            </span>
            {discountPercentage && (
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(currentVariant.price)}
              </span>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="mt-auto space-y-3 flex justify-center items-end gap-1">
          {/* Variant Selection */}
          <div className="w-full relative">
            <div className="relative">
              <select
                value={selectedVariantIndex}
                onChange={handleVariantChange}
                className="min-w-[105px] w-full text-sm border-2 border-gray-200 hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-[20px] px-3 py-2.5 bg-white appearance-none cursor-pointer transition-all duration-200 pr-8"
              >
                {variants.map((variant, index) => {
                  const variantAny = variant as any;
                  return (
                    <option key={index} value={index}>
                      {variant.size} {variant.uom.toUpperCase()}
                    </option>
                  );
                })}
              </select>
              {/* Custom dropdown arrow */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Buy Button */}
          <button className="w-max h-full !m-0 bg-primary hover:bg-green-900 text-white px-4 py-2 rounded-xl text-sm font-medium">
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
