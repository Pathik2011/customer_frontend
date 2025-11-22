"use client";

import { ProductVariant } from "@/types/product";

interface ProductVariantsProps {
  variants: ProductVariant[];
  selectedVariant: ProductVariant;
  onSelectVariant: (variant: ProductVariant) => void;
  quantity: number;
  onQuantityChange: (delta: number) => void;
}

export default function ProductVariants({
  variants,
  selectedVariant,
  onSelectVariant,
  quantity,
  onQuantityChange,
}: ProductVariantsProps) {
  return (
    <div className="space-y-4 lg:space-y-6 -mx-4 lg:mx-0">
      {/* Variants Label */}
      <h3 className="text-lg lg:text-xl font-semibold text-gray-900 px-4 lg:px-0">
        Variants
      </h3>

      {/* Variant Options */}
      <div className="flex gap-3 lg:gap-4 overflow-x-auto lg:overflow-x-visible px-4 lg:px-0 pb-2 lg:pb-0 scrollbar-hide">
        {variants.map((variant, index: number) => {
          const isSelected = variant.variant_id === selectedVariant.variant_id;
          const isActive = variant.is_active && variant.stock_quantity > 0;
          const discountedPrice = variant.discount
            ? variant.price - (variant.price * variant.discount) / 100
            : variant.price;

          return (
            <div
              key={index}
              className={`relative rounded-xl border transition-all flex-shrink-0 ${
                isSelected
                  ? "border-primary bg-[#E8F7F0]"
                  : isActive
                  ? "border-[#E0E0E0] bg-[#F5F5F5] hover:border-[#00C853] cursor-pointer"
                  : "border-[#E0E0E0] bg-gray-50 opacity-50 cursor-not-allowed"
              } w-[160px] lg:w-[135px]`}
              style={{ minHeight: isSelected ? "142px" : "auto" }}
            >
              {/* Variant Info - Clickable Area */}
              <div
                onClick={() => isActive && onSelectVariant(variant)}
                className="p-3 lg:p-4 text-center"
              >
                <div className="text-base lg:text-lg font-semibold text-gray-900 mb-1">
                  {variant.size}
                  {variant.uom.toLowerCase()}
                </div>
                <div className="flex items-center justify-center gap-1.5 lg:gap-2">
                  <span className="text-sm lg:text-base font-bold text-gray-900">
                    ₹{Math.round(discountedPrice)}
                  </span>
                  {variant.discount > 0 && (
                    <span className="text-xs lg:text-sm text-gray-400 line-through">
                      ₹{Math.round(variant.price)}
                    </span>
                  )}
                </div>
                {!isActive && (
                  <div className="text-xs text-red-500 mt-2">Out of Stock</div>
                )}
              </div>

              {/* Quantity Controls for Selected Variant */}
              {isSelected && isActive && (
                <div className="flex items-center justify-center gap-2 lg:gap-3 px-3 lg:px-4 pb-3 lg:pb-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuantityChange(-1);
                    }}
                    disabled={quantity <= 1}
                    className="w-5 h-5 lg:w-6 lg:h-6 flex items-center justify-center text-red-500 text-lg lg:text-xl font-light disabled:opacity-30 disabled:cursor-not-allowed hover:text-red-600"
                  >
                    −
                  </button>
                  <span className="min-w-[20px] lg:min-w-[24px] text-center font-semibold text-gray-900 text-sm lg:text-base">
                    {quantity}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuantityChange(1);
                    }}
                    disabled={quantity >= variant.stock_quantity}
                    className="w-5 h-5 lg:w-6 lg:h-6 flex items-center justify-center text-green-600 text-lg lg:text-xl font-light disabled:opacity-30 disabled:cursor-not-allowed hover:text-green-700"
                  >
                    +
                  </button>
                </div>
              )}

              {/* Add to Bag Button for Non-Selected Variants */}
              {!isSelected && isActive && (
                <div className="px-2.5 lg:px-3 pb-2.5 lg:pb-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectVariant(variant);
                    }}
                    className="w-full bg-[#003C22] hover:bg-[#002818] text-white text-xs lg:text-sm font-medium py-1.5 lg:py-2 px-3 lg:px-4 rounded-lg transition-colors"
                  >
                    Add to Bag
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
