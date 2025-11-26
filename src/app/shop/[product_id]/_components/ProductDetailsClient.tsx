"use client";

import { useMemo, useState } from "react";
import { Product } from "@/types/product";
import ProductImageGallery from "./ProductImageGallery";
import ProductVariants from "./ProductVariants";
import ProductTabs from "./ProductTabs";
import SimilarProducts from "./SimilarProducts";
import RoutingSection from "../../_components/RoutingSection";

interface ProductDetailsClientProps {
  product: Product;
}

export default function ProductDetailsClient({
  product,
}: ProductDetailsClientProps) {
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants.find((v) => v.is_active) || product.variants[0]
  );
  const [quantity, setQuantity] = useState(1);

  const media = useMemo(() => {
    return product.media?.filter((item) => item.media_type === "IMAGE");
  }, [product]);

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const calculateDiscountedPrice = () => {
    if (selectedVariant.discount > 0) {
      return (
        selectedVariant.price -
        (selectedVariant.price * selectedVariant.discount) / 100
      );
    }
    return selectedVariant.price * quantity;
  };

  return (
    <section className="min-h-screen bg-gray-50">
      <RoutingSection productName={product.product_name} />
      {/* Product Details Section */}
      <div className="max-w-[1300px] mx-auto lg:px-4 lg:py-8">
        <div className="bg-white lg:rounded-lg lg:shadow-sm lg:p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
            {/* Left: Image Gallery */}
            <ProductImageGallery
              media={media}
              productName={product.product_name}
            />

            {/* Right: Product Info */}
            <div className="space-y-4 lg:space-y-6 px-4 py-6 lg:px-0 lg:py-0">
              {/* Product Name */}
              <div>
                <h1 className="font-medium text-xl lg:text-[28px] text-gray-900">
                  {product.product_name}
                </h1>
                <p className="font-normal text-sm lg:text-[14px] text-gray-600 mt-1 lg:mt-2">
                  {product.product_tech_name}
                </p>
              </div>

              {/* Description */}
              <div className="text-sm lg:text-base text-gray-700 whitespace-pre-line">
                {product.description}
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2 lg:gap-3">
                <span className="text-2xl lg:text-3xl font-bold text-primary">
                  ₹{calculateDiscountedPrice().toFixed(0)}
                </span>
                {selectedVariant.discounted_price > 0 && (
                  <span className="text-lg lg:text-xl text-dimGray line-through">
                    ₹{(selectedVariant.price * quantity).toFixed(0)}
                  </span>
                )}
              </div>

              {/* Size Info */}
              <div className="text-sm text-gray-600">
                <span className="text-black font-medium">Size:</span>{" "}
                {selectedVariant.size}
                {selectedVariant.uom}
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 -mx-4 lg:mx-0"></div>

              {/* Variants */}
              <ProductVariants
                variants={product.variants}
                selectedVariant={selectedVariant}
                onSelectVariant={setSelectedVariant}
                quantity={quantity}
                onQuantityChange={handleQuantityChange}
              />
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <ProductTabs product={product} />

        {/* Similar Products */}
        <SimilarProducts product_id={product.product_id} />
      </div>
    </section>
  );
}
