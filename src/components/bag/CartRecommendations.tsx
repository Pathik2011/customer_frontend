
'use client';

import React, { useEffect, useState } from 'react';
import ProductCard from '@/components/shop/ProductCard'; 
import { Product } from '@/types';
import { useCart } from '@/context/CartContext'; 
import { fetchRecommendations } from '@/services/productService'; 

const CartRecommendations = () => {
  const { cartItems } = useCart(); 
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadRecommendations = async () => {
      if (cartItems.length === 0) {
        setProducts([]);
        return;
      }

      const productIds = cartItems.map(item => item.product_id);

      try {
        setLoading(true);
        const data = await fetchRecommendations(productIds);
        setProducts(data);
      } catch (err) {
        console.error("Failed to load recommendations", err);
      } finally {
        setLoading(false);
      }
    };

    loadRecommendations();
  }, [cartItems]); 

  if (loading) {
    return (
      <div className="w-full bg-white rounded-[12px] border border-[#E0E2E7] py-6 px-4 shadow-sm h-[348px] animate-pulse flex items-center justify-center">
         <div className="text-gray-400 text-sm font-medium">Finding best matches...</div>
      </div>
    );
  }
  
  if (products.length === 0) return null;

  return (
    <div className="
      bg-white rounded-[12px] border border-[#E0E2E7] py-6 px-4 flex flex-col items-center shadow-sm font-jakarta w-full
      xl:w-full
    ">
      {/* [!code changed] Updated typography to match Figma specs */}
      <h3 
        className="mb-6 w-full text-center text-gray-900"
        style={{
          fontFamily: '"Plus Jakarta Sans", sans-serif',
          fontWeight: 600,         // SemiBold
          fontSize: '20px',        // 20px
          lineHeight: '100%',      // 100%
          letterSpacing: '0.01em', // 1%
        }}
      >
        Items you might like
      </h3>
      
      <div className="grid grid-cols-2 xl:grid-cols-1 gap-3 w-full place-items-center">
        {products.map((product) => (
          <ProductCard key={product.product_id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CartRecommendations;