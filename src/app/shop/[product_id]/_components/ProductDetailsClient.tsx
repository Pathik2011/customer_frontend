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

const products: any = [
  {
    display_order: 1,
    product_id: 8,
    product_name: "Gaucho",
    brand: {
      brand_id: 4,
      brand_name: "Bayer",
    },
    product_variants: [
      {
        product_variant_id: 370,
        size: 50,
        uom: "ML",
        price: 864.76,
        discounted_price: 726.3984,
      },
      {
        product_variant_id: 371,
        size: 100,
        uom: "GM",
        price: 4843.19,
        discounted_price: 4213.5753,
      },
      {
        product_variant_id: 372,
        size: 250,
        uom: "ML",
        price: 2883.35,
        discounted_price: 2104.8455,
      },
      {
        product_variant_id: 373,
        size: 500,
        uom: "ML",
        price: 2996.85,
        discounted_price: 2577.291,
      },
      {
        product_variant_id: 374,
        size: 1,
        uom: "LIT",
        price: 4365.56,
        discounted_price: 3929.004,
      },
      {
        product_variant_id: 375,
        size: 5,
        uom: "LIT",
        price: 2800.09,
        discounted_price: 2548.0819,
      },
    ],
    image:
      "https://my-product-store-bucket-dev.s3.ap-south-1.amazonaws.com/products/8/images/8_1_front.webp",
  },
  {
    display_order: 2,
    product_id: 7,
    product_name: "EMESTO PRIME",
    brand: {
      brand_id: 4,
      brand_name: "Bayer",
    },
    product_variants: [
      {
        product_variant_id: 367,
        size: 100,
        uom: "ML",
        price: 239.79,
        discounted_price: 184.6383,
      },
      {
        product_variant_id: 368,
        size: 250,
        uom: "ML",
        price: 943.49,
        discounted_price: 754.792,
      },
      {
        product_variant_id: 369,
        size: 500,
        uom: "GM",
        price: 3664.18,
        discounted_price: 2748.135,
      },
    ],
    image:
      "https://my-product-store-bucket-dev.s3.ap-south-1.amazonaws.com/products/7/images/7_1_front.webp",
  },
  {
    display_order: 3,
    product_id: 14,
    product_name: "sencor",
    brand: {
      brand_id: 4,
      brand_name: "Bayer",
    },
    product_variants: [
      {
        product_variant_id: 392,
        size: 100,
        uom: "GM",
        price: 3156.07,
        discounted_price: 2240.8097,
      },
      {
        product_variant_id: 393,
        size: 500,
        uom: "GM",
        price: 2765.45,
        discounted_price: 2018.7785,
      },
    ],
    image:
      "https://my-product-store-bucket-dev.s3.ap-south-1.amazonaws.com/products/14/images/14_1_front.webp",
  },
  {
    display_order: 4,
    product_id: 1,
    product_name: "VELUM PRIME",
    brand: {
      brand_id: 4,
      brand_name: "Bayer",
    },
    product_variants: [
      {
        product_variant_id: 342,
        size: 100,
        uom: "ML",
        price: 3575.44,
        discounted_price: 2967.6152,
      },
      {
        product_variant_id: 343,
        size: 250,
        uom: "ML",
        price: 214.7,
        discounted_price: 150.29,
      },
      {
        product_variant_id: 344,
        size: 500,
        uom: "ML",
        price: 1989.45,
        discounted_price: 1691.0325,
      },
      {
        product_variant_id: 345,
        size: 1,
        uom: "LIT",
        price: 3120.43,
        discounted_price: 2184.301,
      },
    ],
    image:
      "https://my-product-store-bucket-dev.s3.ap-south-1.amazonaws.com/products/1/images/1_1_front.webp",
  },
  {
    display_order: 5,
    product_id: 12,
    product_name: "MOVENTO",
    brand: {
      brand_id: 4,
      brand_name: "Bayer",
    },
    product_variants: [
      {
        product_variant_id: 384,
        size: 100,
        uom: "ML",
        price: 2233.8,
        discounted_price: 1898.73,
      },
      {
        product_variant_id: 385,
        size: 250,
        uom: "GM",
        price: 4403.77,
        discounted_price: 3787.2422,
      },
    ],
    image:
      "https://my-product-store-bucket-dev.s3.ap-south-1.amazonaws.com/products/12/images/12_1_front.webp",
  },
];

export default function ProductDetailsClient({
  product,
}: ProductDetailsClientProps) {
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants.find((v) => v.is_active) || product.variants[0]
  );
  const [quantity, setQuantity] = useState(1);

  const media = useMemo(() => { return product.media?.filter((item) => item.media_type === "IMAGE") }, [product])

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= selectedVariant.stock_quantity) {
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
    return selectedVariant.price;
  };

  return (
    <section className="min-h-screen bg-gray-50">
      <RoutingSection productName={product.product_name} />
      {/* Product Details Section */}
      <div className="max-w-7xl mx-auto lg:px-4 lg:py-8">
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
                {selectedVariant.discount > 0 && (
                  <span className="text-lg lg:text-xl text-dimGray line-through">
                    ₹{selectedVariant.price}
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
        <SimilarProducts products={products} />
      </div>
    </section>
  );
}
