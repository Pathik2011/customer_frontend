
// // 'use client';

// // import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// // import { cartService } from '@/services/cartService';
// // import AddToCartPopup from '@/components/bag/AddToCartPopup';
// // // [!code ++] Import usePathname to check current page
// // import { usePathname } from 'next/navigation'; 

// // // Types based on your API Response
// // export interface CartItem {
// //   product_id: number;
// //   product_name: string;
// //   brand_name: string;
// //   product_variant_id: number;
// //   size: number;
// //   uom: string;
// //   price: number;
// //   discount: number;
// //   discounted_price: number;
// //   product_front_image_url: string;
// //   quantity: number;
// // }

// // export interface CartSummary {
// //   total_cart_items: number;
// //   total_cart_price: number;
// //   total_cart_discount: number;
// //   final_cart_price: number;
// // }

// // interface PopupProduct {
// //   name: string;
// //   image: string;
// // }

// // interface CartContextType {
// //   cartCount: number;
// //   cartItems: CartItem[];
// //   cartSummary: CartSummary | null;
// //   isAddingToCart: boolean;
// //   isLoadingCart: boolean;
// //   isCartUpdating: boolean;
// //   addToCart: (variantId: number, quantity?: number, productInfo?: PopupProduct) => Promise<void>;
// //   removeFromCart: (variantId: number) => Promise<void>;
// //   refreshCart: () => Promise<void>;
// //   updateCartCountOnly: (count: number) => void; 
// // }

// // const CartContext = createContext<CartContextType | undefined>(undefined);

// // export const CartProvider = ({ children }: { children: ReactNode }) => {
// //   const [cartCount, setCartCount] = useState(0);
// //   const [cartItems, setCartItems] = useState<CartItem[]>([]);
// //   const [cartSummary, setCartSummary] = useState<CartSummary | null>(null);
// //   const [isAddingToCart, setIsAddingToCart] = useState(false);
// //   const [isLoadingCart, setIsLoadingCart] = useState(true);
// //   const [isCartUpdating, setIsCartUpdating] = useState(false);

// //   const [popupOpen, setPopupOpen] = useState(false);
// //   const [lastAddedProduct, setLastAddedProduct] = useState<PopupProduct | null>(null);

// //   // [!code ++] Get current route
// //   const pathname = usePathname();

// //   const updateCartCountOnly = (count: number) => {
// //     console.log("⚡ [CartContext] Optimistic Update: Count set to", count);
// //     setCartCount(count);
// //   };

// //   const refreshCart = async () => {
// //     try {
// //       const data = await cartService.fetchCart();
// //       if (data) {
// //         setCartItems(data.items || []);
// //         setCartSummary({
// //           total_cart_items: data.total_cart_items,
// //           total_cart_price: data.total_cart_price,
// //           total_cart_discount: data.total_cart_discount,
// //           final_cart_price: data.final_cart_price,
// //         });
// //         setCartCount(data.total_cart_items || 0);
// //       }
// //     } catch (error) {
// //       console.error("Failed to refresh cart", error);
// //     } finally {
// //       setIsLoadingCart(false);
// //     }
// //   };

// //   useEffect(() => {
// //     refreshCart();
// //   }, []);

// //   // [!code changed] OPTIMIZED addToCart function
// //   const addToCart = async (variantId: number, quantity: number = 1, productInfo?: PopupProduct) => {
// //     setIsAddingToCart(true);
// //     setIsCartUpdating(true); // Spinners start
    
// //     try {
// //       // 1. Call API
// //       const response = await cartService.addToCart(variantId, quantity);
      
// //       // 2. ✅ OPTIMIZATION: Update Totals directly from Response
// //       if (response?.cart_summary) {
// //         setCartCount(response.cart_summary.total_cart_items);
// //         setCartSummary(response.cart_summary);
// //       }

// //       // 3. ✅ OPTIMIZATION: Update the specific item in the list locally
// //       // This ensures if you are on the Bag page, the price/qty updates instantly without a fetch.
// //       if (response?.updated_item) {
// //         setCartItems((prevItems) => {
// //           // Check if item exists
// //           const exists = prevItems.find(item => item.product_variant_id === response.updated_item.product_variant_id);
          
// //           if (exists) {
// //             // Update existing item with new values from server
// //             return prevItems.map(item => 
// //               item.product_variant_id === response.updated_item.product_variant_id
// //                 ? { ...item, ...response.updated_item } // Merge new Qty/Price
// //                 : item
// //             );
// //           } else if (productInfo) {
// //             // Optional: If it's a new item and we have info, we could append it.
// //             // But usually, if we are NOT on the bag page, we don't care about the list.
// //             return prevItems; 
// //           }
// //           return prevItems;
// //         });
// //       }
      
// //       // 4. ✅ DECISION: Do we really need to Refresh?
// //       // If we are on the /bag page, we might want to refresh just to be safe (e.g. getting the full image URL),
// //       // BUT for 99% of cases, the local update above is enough.
// //       // Let's ONLY refresh if we are on the Bag page to be safe, otherwise SKIP IT.
// //       if (pathname === '/bag') {
// //          // You can even remove this if the local update logic above is robust!
// //          // await refreshCart(); 
// //       }

// //       // 5. Show Popup
// //       if (productInfo && pathname !== '/bag') {
// //         setLastAddedProduct(productInfo);
// //         setPopupOpen(true);
// //       }

// //     } catch (error) {
// //       console.error("Add to cart failed", error);
// //       // Only refresh on error to ensure we are in sync
// //       await refreshCart();
// //     } finally {
// //       setIsAddingToCart(false);
// //       setIsCartUpdating(false);
// //     }
// //   };

// //   const removeFromCart = async (variantId: number) => {
// //     setIsCartUpdating(true);
// //     try {
// //       setCartItems((prev) => prev.filter((item) => item.product_variant_id !== variantId));
// //       await cartService.removeFromCart(variantId);
// //       await refreshCart();
// //     } catch (error) {
// //       console.error("Remove from cart failed", error);
// //       await refreshCart();
// //     } finally {
// //       setIsCartUpdating(false);
// //     }
// //   };

// //   return (
// //     <CartContext.Provider value={{ 
// //       cartCount, 
// //       cartItems, 
// //       cartSummary, 
// //       isAddingToCart, 
// //       isLoadingCart,
// //       isCartUpdating,
// //       addToCart,
// //       removeFromCart,
// //       refreshCart,
// //       updateCartCountOnly
// //     }}>
// //       {children}
// //       <AddToCartPopup 
// //         isOpen={popupOpen}
// //         onClose={() => setPopupOpen(false)}
// //         productName={lastAddedProduct?.name || 'Product'}
// //         productImage={lastAddedProduct?.image || ''}
// //       />
// //     </CartContext.Provider>
// //   );
// // };

// // export const useCart = () => {
// //   const context = useContext(CartContext);
// //   if (!context) {
// //     throw new Error('useCart must be used within a CartProvider');
// //   }
// //   return context;
// // };
// 'use client';

// import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import { usePathname } from 'next/navigation'; // [!code ++] Check current route
// import { cartService } from '@/services/cartService';
// import AddToCartPopup from '@/components/bag/AddToCartPopup';

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

// // Helper Type for Popup Data
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

//   // Popup State
//   const [popupOpen, setPopupOpen] = useState(false);
//   const [lastAddedProduct, setLastAddedProduct] = useState<PopupProduct | null>(null);

//   const pathname = usePathname(); // [!code ++] Get current URL

//   // Optimization: Update count without API call (if needed elsewhere)
//   const updateCartCountOnly = (count: number) => {
//     setCartCount(count);
//   };

//   // Fetch Cart Data
//   const refreshCart = async () => {
//     try {
//       // Note: We don't set isLoadingCart(true) here to avoid flashing the whole page 
//       // on background refreshes. We rely on isCartUpdating for small interactions.
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
//       setIsLoadingCart(false); // Initial load complete
//     }
//   };

//   // Initial Load on Mount
//   useEffect(() => {
//     refreshCart();
//   }, []);

//   // [!code changed] HYBRID STRATEGY addToCart
//   const addToCart = async (variantId: number, quantity: number = 1, productInfo?: PopupProduct) => {
//     setIsAddingToCart(true);
//     setIsCartUpdating(true); // Show spinners
    
//     try {
//       // 1. Call API
//       const response = await cartService.addToCart(variantId, quantity);
      
//       // 2. ALWAYS Update Totals from Response (Instant Header Update)
//       if (response?.cart_summary) {
//         setCartCount(response.cart_summary.total_cart_items);
//         setCartSummary(response.cart_summary);
//       }

//       // 3. Smart List Update Logic
//       let needRefresh = false;

//       if (response?.updated_item) {
//         setCartItems((prevItems) => {
//           // Check if this item is ALREADY in the cart
//           const itemIndex = prevItems.findIndex(item => item.product_variant_id === response.updated_item.product_variant_id);
          
//           if (itemIndex > -1) {
//             // ✅ CASE A: Item exists (e.g., incrementing qty). Update locally!
//             const newItems = [...prevItems];
//             newItems[itemIndex] = { ...newItems[itemIndex], ...response.updated_item };
//             return newItems;
//           } 
          
//           // ❌ CASE B: Item is NEW. 
//           // We can't add it locally because backend response is missing image/name.
//           // Mark for refresh ONLY if we are on the bag page.
//           if (pathname === '/bag') {
//             needRefresh = true;
//           }
//           return prevItems;
//         });
//       } else {
//         // Fallback for older API responses
//         needRefresh = true;
//       }

//       // 4. Execute Refresh if marked (Only happens for new items on Bag Page)
//       if (needRefresh) {
//          await refreshCart();
//       }

//       // 5. Show Popup (If info provided and NOT on bag page)
//       if (productInfo && pathname !== '/bag') {
//         setLastAddedProduct(productInfo);
//         setPopupOpen(true);
//       }

//     } catch (error) {
//       console.error("Add to cart failed", error);
//       await refreshCart(); // Safety fallback on error
//     } finally {
//       setIsAddingToCart(false);
//       setIsCartUpdating(false);
//     }
//   };

//   const removeFromCart = async (variantId: number) => {
//     setIsCartUpdating(true);
//     try {
//       // Optimistic Removal
//       setCartItems((prev) => prev.filter((item) => item.product_variant_id !== variantId));
      
//       await cartService.removeFromCart(variantId);
      
//       // We still refresh here to be safe about totals, but the UI snaps instantly
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
//       updateCartCountOnly
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