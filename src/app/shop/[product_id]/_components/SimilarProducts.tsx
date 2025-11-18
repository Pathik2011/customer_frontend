"use client";

import { Product } from "@/types/product";
import ProductCart from "@/components/layout/common/ProductCart";

interface SimilarProductsProps {
  products: Product[];
}

import { productService } from "@/services/productService";

export default function SimilarProducts({ products }: SimilarProductsProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Similar Products
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductCart product={product} key={product.product_id} />
        ))}
      </div>
    </div>
  );
}
