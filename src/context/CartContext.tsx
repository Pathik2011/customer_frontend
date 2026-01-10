
// 'use client';

// import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import { cartService } from '@/services/cartService';

// // Types based on your API Response
// export interface CartItem {
//   product_id: number;
//   product_name: string;
//   brand_name: string;
//   product_variant_id: number;
//   size: number;
//   uom: string;
//   price: number;
//   discount: number;
//   discounted_price: number;
//   product_front_image_url: string;
//   quantity: number;
// }

// export interface CartSummary {
//   total_cart_items: number;
//   total_cart_price: number;
//   total_cart_discount: number;
//   final_cart_price: number;
// }

// interface CartContextType {
//   cartCount: number;
//   cartItems: CartItem[];
//   cartSummary: CartSummary | null;
//   isAddingToCart: boolean;
//   isLoadingCart: boolean;
//   isCartUpdating: boolean; // [!code ++] New State
//   addToCart: (variantId: number, quantity?: number) => Promise<void>;
//   removeFromCart: (variantId: number) => Promise<void>;
//   refreshCart: () => Promise<void>;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const CartProvider = ({ children }: { children: ReactNode }) => {
//   const [cartCount, setCartCount] = useState(0);
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const [cartSummary, setCartSummary] = useState<CartSummary | null>(null);
//   const [isAddingToCart, setIsAddingToCart] = useState(false);
//   const [isLoadingCart, setIsLoadingCart] = useState(true);
//   const [isCartUpdating, setIsCartUpdating] = useState(false); // [!code ++]

//   // Fetch Cart Data
//   const refreshCart = async () => {
//     try {
//       // setIsLoadingCart(true); // Optional: Don't show full loader on every small update
//       const data = await cartService.fetchCart();
//       if (data) {
//         setCartItems(data.items || []);
//         setCartSummary({
//           total_cart_items: data.total_cart_items,
//           total_cart_price: data.total_cart_price,
//           total_cart_discount: data.total_cart_discount,
//           final_cart_price: data.final_cart_price,
//         });
//         setCartCount(data.total_cart_items || 0);
//       }
//     } catch (error) {
//       console.error("Failed to refresh cart", error);
//     } finally {
//       setIsLoadingCart(false);
//     }
//   };

//   // Load on Mount
//   useEffect(() => {
//     refreshCart();
//   }, []);

//   const addToCart = async (variantId: number, quantity: number = 1) => {
//     setIsAddingToCart(true);
//     setIsCartUpdating(true); // [!code ++] Start loading
//     try {
//       // 1. Call API
//       const response = await cartService.addToCart(variantId, quantity);
      
//       // 2. If response contains updated summary, update local state immediately
//       if (response?.cart_summary) {
//         setCartCount(response.cart_summary.total_cart_items);
//         setCartSummary(response.cart_summary);
//       }
      
//       // 3. Refresh full list to ensure items are in sync
//       await refreshCart();
      
//     } catch (error) {
//       console.error("Add to cart failed", error);
//     } finally {
//       setIsAddingToCart(false);
//       setIsCartUpdating(false); // [!code ++] Stop loading
//     }
//   };

//   const removeFromCart = async (variantId: number) => {
//     setIsCartUpdating(true); // [!code ++] Start loading
//     try {
//       // Optimistic update
//       setCartItems((prev) => prev.filter((item) => item.product_variant_id !== variantId));
      
//       await cartService.removeFromCart(variantId);
      
//       // Refresh to get correct totals/summary from server
//       await refreshCart();
//     } catch (error) {
//       console.error("Remove from cart failed", error);
//       await refreshCart();
//     } finally {
//       setIsCartUpdating(false); // [!code ++] Stop loading
//     }
//   };

//   return (
//     <CartContext.Provider value={{ 
//       cartCount, 
//       cartItems, 
//       cartSummary, 
//       isAddingToCart, 
//       isLoadingCart,
//       isCartUpdating, // [!code ++]
//       addToCart,
//       removeFromCart,
//       refreshCart 
//     }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error('useCart must be used within a CartProvider');
//   }
//   return context;
// };
// 'use client';

// import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import { cartService } from '@/services/cartService';
// import AddToCartPopup from '@/components/bag/AddToCartPopup'; // [!code ++] Import

// // Types based on your API Response
// export interface CartItem {
//   product_id: number;
//   product_name: string;
//   brand_name: string;
//   product_variant_id: number;
//   size: number;
//   uom: string;
//   price: number;
//   discount: number;
//   discounted_price: number;
//   product_front_image_url: string;
//   quantity: number;
// }

// export interface CartSummary {
//   total_cart_items: number;
//   total_cart_price: number;
//   total_cart_discount: number;
//   final_cart_price: number;
// }

// // [!code ++] Helper Type for Popup Data
// interface PopupProduct {
//   name: string;
//   image: string;
// }

// interface CartContextType {
//   cartCount: number;
//   cartItems: CartItem[];
//   cartSummary: CartSummary | null;
//   isAddingToCart: boolean;
//   isLoadingCart: boolean;
//   isCartUpdating: boolean;
//   // [!code changed] Updated signature to accept optional product details
//   addToCart: (variantId: number, quantity?: number, productInfo?: PopupProduct) => Promise<void>;
//   removeFromCart: (variantId: number) => Promise<void>;
//   refreshCart: () => Promise<void>;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const CartProvider = ({ children }: { children: ReactNode }) => {
//   const [cartCount, setCartCount] = useState(0);
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const [cartSummary, setCartSummary] = useState<CartSummary | null>(null);
//   const [isAddingToCart, setIsAddingToCart] = useState(false);
//   const [isLoadingCart, setIsLoadingCart] = useState(true);
//   const [isCartUpdating, setIsCartUpdating] = useState(false);

//   // [!code ++] Popup State
//   const [popupOpen, setPopupOpen] = useState(false);
//   const [lastAddedProduct, setLastAddedProduct] = useState<PopupProduct | null>(null);

//   // Fetch Cart Data
//   const refreshCart = async () => {
//     try {
//       const data = await cartService.fetchCart();
//       if (data) {
//         setCartItems(data.items || []);
//         setCartSummary({
//           total_cart_items: data.total_cart_items,
//           total_cart_price: data.total_cart_price,
//           total_cart_discount: data.total_cart_discount,
//           final_cart_price: data.final_cart_price,
//         });
//         setCartCount(data.total_cart_items || 0);
//       }
//     } catch (error) {
//       console.error("Failed to refresh cart", error);
//     } finally {
//       setIsLoadingCart(false);
//     }
//   };

//   useEffect(() => {
//     refreshCart();
//   }, []);

//   // [!code changed] Updated addToCart to handle popup
//   const addToCart = async (variantId: number, quantity: number = 1, productInfo?: PopupProduct) => {
//     setIsAddingToCart(true);
//     setIsCartUpdating(true);
//     try {
//       // 1. Call API
//       const response = await cartService.addToCart(variantId, quantity);
      
//       // 2. Update local summary
//       if (response?.cart_summary) {
//         setCartCount(response.cart_summary.total_cart_items);
//         setCartSummary(response.cart_summary);
//       }
      
//       // 3. Refresh list
//       await refreshCart();

//       // [!code ++] 4. Trigger Popup (Only if product details provided)
//       if (productInfo) {
//         setLastAddedProduct(productInfo);
//         setPopupOpen(true);
//       } else {
//         // Fallback: Try to find item in updated cartItems if info not provided
//         // (Optional logic, usually it's better if caller passes info)
//       }

//     } catch (error) {
//       console.error("Add to cart failed", error);
//     } finally {
//       setIsAddingToCart(false);
//       setIsCartUpdating(false);
//     }
//   };

//   const removeFromCart = async (variantId: number) => {
//     setIsCartUpdating(true);
//     try {
//       setCartItems((prev) => prev.filter((item) => item.product_variant_id !== variantId));
//       await cartService.removeFromCart(variantId);
//       await refreshCart();
//     } catch (error) {
//       console.error("Remove from cart failed", error);
//       await refreshCart();
//     } finally {
//       setIsCartUpdating(false);
//     }
//   };

//   return (
//     <CartContext.Provider value={{ 
//       cartCount, 
//       cartItems, 
//       cartSummary, 
//       isAddingToCart, 
//       isLoadingCart,
//       isCartUpdating,
//       addToCart,
//       removeFromCart,
//       refreshCart 
//     }}>
//       {children}

//       {/* [!code ++] Global Popup Rendered Here */}
//       <AddToCartPopup 
//         isOpen={popupOpen}
//         onClose={() => setPopupOpen(false)}
//         productName={lastAddedProduct?.name || 'Product'}
//         productImage={lastAddedProduct?.image || ''}
//       />

//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error('useCart must be used within a CartProvider');
//   }
//   return context;
// };
// 'use client';

// import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import { cartService } from '@/services/cartService';
// import AddToCartPopup from '@/components/bag/AddToCartPopup'; 

// // Types... (Keep existing interfaces)
// export interface CartItem {
//   product_id: number;
//   product_name: string;
//   brand_name: string;
//   product_variant_id: number;
//   size: number;
//   uom: string;
//   price: number;
//   discount: number;
//   discounted_price: number;
//   product_front_image_url: string;
//   quantity: number;
// }

// export interface CartSummary {
//   total_cart_items: number;
//   total_cart_price: number;
//   total_cart_discount: number;
//   final_cart_price: number;
// }

// interface PopupProduct {
//   name: string;
//   image: string;
// }

// interface CartContextType {
//   cartCount: number;
//   cartItems: CartItem[];
//   cartSummary: CartSummary | null;
//   isAddingToCart: boolean;
//   isLoadingCart: boolean;
//   isCartUpdating: boolean;
//   addToCart: (variantId: number, quantity?: number, productInfo?: PopupProduct) => Promise<void>;
//   removeFromCart: (variantId: number) => Promise<void>;
//   refreshCart: () => Promise<void>;
//   // [!code ++] New Optimization Function
//   updateCartCountOnly: (count: number) => void; 
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const CartProvider = ({ children }: { children: ReactNode }) => {
//   const [cartCount, setCartCount] = useState(0);
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const [cartSummary, setCartSummary] = useState<CartSummary | null>(null);
//   const [isAddingToCart, setIsAddingToCart] = useState(false);
//   const [isLoadingCart, setIsLoadingCart] = useState(true);
//   const [isCartUpdating, setIsCartUpdating] = useState(false);

//   const [popupOpen, setPopupOpen] = useState(false);
//   const [lastAddedProduct, setLastAddedProduct] = useState<PopupProduct | null>(null);

//   // [!code ++] OPTIMIZATION: Update count without API call
//   const updateCartCountOnly = (count: number) => {
//     console.log("⚡ [CartContext] Optimistic Update: Count set to", count);
//     setCartCount(count);
//   };

//   // Fetch Cart Data
//   const refreshCart = async () => {
//     try {
//       const data = await cartService.fetchCart();
//       if (data) {
//         setCartItems(data.items || []);
//         setCartSummary({
//           total_cart_items: data.total_cart_items,
//           total_cart_price: data.total_cart_price,
//           total_cart_discount: data.total_cart_discount,
//           final_cart_price: data.final_cart_price,
//         });
//         setCartCount(data.total_cart_items || 0);
//       }
//     } catch (error) {
//       console.error("Failed to refresh cart", error);
//     } finally {
//       setIsLoadingCart(false);
//     }
//   };

//   useEffect(() => {
//     refreshCart();
//   }, []);

//   const addToCart = async (variantId: number, quantity: number = 1, productInfo?: PopupProduct) => {
//     setIsAddingToCart(true);
//     setIsCartUpdating(true);
//     try {
//       const response = await cartService.addToCart(variantId, quantity);
      
//       if (response?.cart_summary) {
//         setCartCount(response.cart_summary.total_cart_items);
//         setCartSummary(response.cart_summary);
//       }
      
//       await refreshCart();

//       if (productInfo) {
//         setLastAddedProduct(productInfo);
//         setPopupOpen(true);
//       }

//     } catch (error) {
//       console.error("Add to cart failed", error);
//     } finally {
//       setIsAddingToCart(false);
//       setIsCartUpdating(false);
//     }
//   };

//   const removeFromCart = async (variantId: number) => {
//     setIsCartUpdating(true);
//     try {
//       setCartItems((prev) => prev.filter((item) => item.product_variant_id !== variantId));
//       await cartService.removeFromCart(variantId);
//       await refreshCart();
//     } catch (error) {
//       console.error("Remove from cart failed", error);
//       await refreshCart();
//     } finally {
//       setIsCartUpdating(false);
//     }
//   };

//   return (
//     <CartContext.Provider value={{ 
//       cartCount, 
//       cartItems, 
//       cartSummary, 
//       isAddingToCart, 
//       isLoadingCart,
//       isCartUpdating,
//       addToCart,
//       removeFromCart,
//       refreshCart,
//       updateCartCountOnly // [!code ++] Export this
//     }}>
//       {children}
//       <AddToCartPopup 
//         isOpen={popupOpen}
//         onClose={() => setPopupOpen(false)}
//         productName={lastAddedProduct?.name || 'Product'}
//         productImage={lastAddedProduct?.image || ''}
//       />
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error('useCart must be used within a CartProvider');
//   }
//   return context;
// };
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { cartService } from '@/services/cartService';
import AddToCartPopup from '@/components/bag/AddToCartPopup';
// [!code ++] Import usePathname to check current page
import { usePathname } from 'next/navigation'; 

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

  // [!code ++] Get current route
  const pathname = usePathname();

  const updateCartCountOnly = (count: number) => {
    console.log("⚡ [CartContext] Optimistic Update: Count set to", count);
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
      
      if (response?.cart_summary) {
        setCartCount(response.cart_summary.total_cart_items);
        setCartSummary(response.cart_summary);
      }
      
      await refreshCart();

      // [!code changed] Only show popup if NOT on the bag page
      if (productInfo && pathname !== '/bag') {
        setLastAddedProduct(productInfo);
        setPopupOpen(true);
      }

    } catch (error) {
      console.error("Add to cart failed", error);
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