"use client";

import { useState } from "react";
import { ProductMedia } from "@/types/product";
import Image from "next/image";

interface ProductImageGalleryProps {
  media: ProductMedia[];
  productName: string;
}

export default function ProductImageGallery({
  media,
  productName,
}: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  // Use placeholder if no media
  const images =
    media.length > 0
      ? media
      : [{ url: "/images/placeholder-product.png", is_primary: true }];

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      {/* Thumbnail Gallery - Left side on desktop only (vertical) */}
      {images.length > 0 && (
        <div className="hidden lg:flex flex-col gap-3 w-24 flex-shrink-0">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative aspect-square bg-gray-50 rounded-xl overflow-hidden border-2 transition-all ${
                selectedImage === index
                  ? "border-green-600"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <Image
                src={img.url || "/images/placeholder-product.png"}
                alt={`${productName} ${index + 1}`}
                fill
                className="object-contain p-2"
                unoptimized
              />
            </button>
          ))}
        </div>
      )}

      {/* Main Image */}
      <div className="max-h-[526px] flex-1 relative aspect-square bg-dimGray_01 lg:rounded-2xl overflow-hidden">
        <Image
          src={images[selectedImage]?.url || "/images/placeholder-product.png"}
          alt={productName}
          fill
          className="object-contain p-8"
          priority
          unoptimized
        />
      </div>

      {/* Thumbnail Gallery - Bottom on mobile only (horizontal scroll) */}
      {images.length > 0 && (
        <div className="flex lg:hidden gap-3 overflow-x-auto flex-shrink-0 px-4 pb-2 scrollbar-hide">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative aspect-square bg-white rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 w-20 h-20 ${
                selectedImage === index
                  ? "border-green-600"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <Image
                src={img.url || "/images/placeholder-product.png"}
                alt={`${productName} ${index + 1}`}
                fill
                className="object-contain p-2"
                unoptimized
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
