
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePathname } from 'next/navigation'; 
import { cartService } from '@/services/cartService';
import AddToCartPopup from '@/components/bag/AddToCartPopup';

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

// Helper Type for Popup Data
interface PopupProduct {
  name: string;
  image: string;
}

interface CartContextType {
  cartCount: number;
  cartItems: CartItem[];
  cartSummary: CartSummary | null;
  isAddingToCart: boolean;
  isLoadingCart: boolean;
  isCartUpdating: boolean;
  addToCart: (variantId: number, quantity?: number, productInfo?: PopupProduct) => Promise<void>;
  removeFromCart: (variantId: number) => Promise<void>;
  refreshCart: () => Promise<void>;
  updateCartCountOnly: (count: number) => void;
}

// 👇 THIS WAS MISSING IN THE PREVIOUS SNIPPET
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartSummary, setCartSummary] = useState<CartSummary | null>(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isLoadingCart, setIsLoadingCart] = useState(true);
  const [isCartUpdating, setIsCartUpdating] = useState(false);

  const [popupOpen, setPopupOpen] = useState(false);
  const [lastAddedProduct, setLastAddedProduct] = useState<PopupProduct | null>(null);

  const pathname = usePathname();

  const updateCartCountOnly = (count: number) => {
    setCartCount(count);
  };

  const refreshCart = async () => {
    try {
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

  useEffect(() => {
    refreshCart();
  }, []);

  const addToCart = async (variantId: number, quantity: number = 1, productInfo?: PopupProduct) => {
    setIsAddingToCart(true);
    setIsCartUpdating(true);
    
    try {
      const response = await cartService.addToCart(variantId, quantity);
      
      // Always Update Totals (Instant Header Update)
      if (response?.cart_summary) {
        setCartCount(response.cart_summary.total_cart_items);
        setCartSummary(response.cart_summary);
      }

      // DECISION: Local Update vs Full Refresh
      const existingItem = cartItems.find(item => item.product_variant_id === variantId);

      if (existingItem && response?.updated_item) {
         // CASE A: Item exists (e.g. increasing quantity). Update locally.
         setCartItems(prev => prev.map(item => 
            item.product_variant_id === variantId 
              ? { ...item, ...response.updated_item } 
              : item
         ));
      } else {
         // CASE B: Item is NEW. If on BAG PAGE, refresh to get details.
         if (pathname === '/bag') {
            await refreshCart();
         }
      }

      // Show Popup
      if (productInfo && pathname !== '/bag') {
        setLastAddedProduct(productInfo);
        setPopupOpen(true);
      }

    } catch (error) {
      console.error("Add to cart failed", error);
      await refreshCart();
    } finally {
      setIsAddingToCart(false);
      setIsCartUpdating(false);
    }
  };

  const removeFromCart = async (variantId: number) => {
    setIsCartUpdating(true);
    try {
      setCartItems((prev) => prev.filter((item) => item.product_variant_id !== variantId));
      await cartService.removeFromCart(variantId);
      await refreshCart();
    } catch (error) {
      console.error("Remove from cart failed", error);
      await refreshCart();
    } finally {
      setIsCartUpdating(false);
    }
  };

  return (
    <CartContext.Provider value={{ 
      cartCount, 
      cartItems, 
      cartSummary, 
      isAddingToCart, 
      isLoadingCart,
      isCartUpdating,
      addToCart,
      removeFromCart,
      refreshCart,
      updateCartCountOnly
    }}>
      {children}
      <AddToCartPopup 
        isOpen={popupOpen}
        onClose={() => setPopupOpen(false)}
        productName={lastAddedProduct?.name || 'Product'}
        productImage={lastAddedProduct?.image || ''}
      />
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