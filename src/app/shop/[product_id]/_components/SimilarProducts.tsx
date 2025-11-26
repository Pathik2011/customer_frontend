"use client";

import { useEffect } from "react";
import { Product, SimilarProduct } from "@/types/product";
import ProductCart from "@/components/layout/common/ProductCart";
import { useSimilarProductsStore } from "@/store/useSimilarProductsStore";

interface SimilarProductsProps {
  product_id: number;
}

// Transform SimilarProduct to Product format for ProductCart
const transformSimilarProduct = (similar: SimilarProduct): Product => {
  return {
    product_id: similar.product_id,
    product_name: similar.product_name,
    brand: similar.brand_name,
    image: similar.image_url,
    variants: similar.variants.map((v) => ({
      variant_id: v.product_variant_id,
      size: v.size,
      uom: v.uom,
      price: v.price,
      discounted_price: v.discounted_price,
      discount:
        v.price > 0 ? ((v.price - v.discounted_price) / v.price) * 100 : 0,
      stock_quantity: 0,
      is_active: true,
    })),
    media: [
      {
        media_url: similar.image_url,
        is_primary: true,
      },
    ],
    // Default values for required fields
    category_id: 0,
    brand_id: 0,
    product_tech_name: "",
    description: "",
    category_name: "",
    sku: "",
    firm: "",
    created_at: "",
    updated_at: "",
    tags: [],
    product_variants: [],
    upload_instructions: null,
    properties: {},
    crops: [],
    doses: [],
  } as Product;
};

export default function SimilarProducts({ product_id }: SimilarProductsProps) {
  const { fetchSimilarProducts, getSimilarProducts, isLoading, error } =
    useSimilarProductsStore();

  useEffect(() => {
    fetchSimilarProducts(product_id);
  }, [product_id, fetchSimilarProducts]);
  const similarProducts = getSimilarProducts(product_id);

  const products = similarProducts.map(transformSimilarProduct);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm py-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Similar Products
        </h2>
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm py-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Similar Products
        </h2>
        <div className="text-center py-12 text-red-500">
          Failed to load similar products
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm py-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Similar Products
      </h2>

      {products.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No similar products found
        </div>
      ) : (
        <div className="w-max mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-2 xl:grid-cols-5 gap-4">
          {products.map((product) => (
            <ProductCart product={product} key={product.product_id} />
          ))}
        </div>
      )}
    </div>
  );
}
