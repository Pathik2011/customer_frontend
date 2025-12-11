
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { cartService } from '@/services/cartService';

// Types based on your API Response
export interface CartItem {
  product_id: number;
  product_name: string;
  brand_name: string;
  product_variant_id: number;
  size: number;
  uom: string;
  price: number;
  discount: number;
  discounted_price: number;
  product_front_image_url: string;
  quantity: number;
}

export interface CartSummary {
  total_cart_items: number;
  total_cart_price: number;
  total_cart_discount: number;
  final_cart_price: number;
}

interface CartContextType {
  cartCount: number;
  cartItems: CartItem[];
  cartSummary: CartSummary | null;
  isAddingToCart: boolean;
  isLoadingCart: boolean;
  isCartUpdating: boolean; // [!code ++] New State
  addToCart: (variantId: number, quantity?: number) => Promise<void>;
  removeFromCart: (variantId: number) => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartSummary, setCartSummary] = useState<CartSummary | null>(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isLoadingCart, setIsLoadingCart] = useState(true);
  const [isCartUpdating, setIsCartUpdating] = useState(false); // [!code ++]

  // Fetch Cart Data
  const refreshCart = async () => {
    try {
      // setIsLoadingCart(true); // Optional: Don't show full loader on every small update
      const data = await cartService.fetchCart();
      if (data) {
        setCartItems(data.items || []);
        setCartSummary({
          total_cart_items: data.total_cart_items,
          total_cart_price: data.total_cart_price,
          total_cart_discount: data.total_cart_discount,
          final_cart_price: data.final_cart_price,
        });
        setCartCount(data.total_cart_items || 0);
      }
    } catch (error) {
      console.error("Failed to refresh cart", error);
    } finally {
      setIsLoadingCart(false);
    }
  };

  // Load on Mount
  useEffect(() => {
    refreshCart();
  }, []);

  const addToCart = async (variantId: number, quantity: number = 1) => {
    setIsAddingToCart(true);
    setIsCartUpdating(true); // [!code ++] Start loading
    try {
      // 1. Call API
      const response = await cartService.addToCart(variantId, quantity);
      
      // 2. If response contains updated summary, update local state immediately
      if (response?.cart_summary) {
        setCartCount(response.cart_summary.total_cart_items);
        setCartSummary(response.cart_summary);
      }
      
      // 3. Refresh full list to ensure items are in sync
      await refreshCart();
      
    } catch (error) {
      console.error("Add to cart failed", error);
    } finally {
      setIsAddingToCart(false);
      setIsCartUpdating(false); // [!code ++] Stop loading
    }
  };

  const removeFromCart = async (variantId: number) => {
    setIsCartUpdating(true); // [!code ++] Start loading
    try {
      // Optimistic update
      setCartItems((prev) => prev.filter((item) => item.product_variant_id !== variantId));
      
      await cartService.removeFromCart(variantId);
      
      // Refresh to get correct totals/summary from server
      await refreshCart();
    } catch (error) {
      console.error("Remove from cart failed", error);
      await refreshCart();
    } finally {
      setIsCartUpdating(false); // [!code ++] Stop loading
    }
  };

  return (
    <CartContext.Provider value={{ 
      cartCount, 
      cartItems, 
      cartSummary, 
      isAddingToCart, 
      isLoadingCart,
      isCartUpdating, // [!code ++]
      addToCart,
      removeFromCart,
      refreshCart 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};