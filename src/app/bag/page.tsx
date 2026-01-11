
// 'use client';

// import React, { useState, useEffect } from 'react'; // [!code ++] Import useEffect
// import TopBar from '@/components/layout/TopBar';
// import Header from '@/components/layout/Header';
// import NavBar from '@/components/layout/NavBar';
// import Footer from '@/components/layout/Footer';
// import ShopHero from '@/components/shop/ShopHero'; 
// import CartItem from '@/components/bag/CartItem';
// import CartSummary from '@/components/bag/CartSummary';
// import CartRecommendations from '@/components/bag/CartRecommendations';
// import LoginPopup from '@/components/auth/LoginPopup';
// import OrderComingSoonPopup from '@/components/shared/OrderComingSoonPopup';
// import RemoveItemModal from '@/components/bag/RemoveItemModal'; 
// import { useCart } from '@/context/CartContext';
// import { useAuth } from '@/context/AuthContext';
// import { useRouter } from 'next/navigation';
// import { CartItem as CartItemType } from '@/types'; 

// export default function BagPage() {
//   // [!code ++] Get refreshCart from context
//   const { cartItems, cartSummary, isLoadingCart, isCartUpdating, removeFromCart, refreshCart } = useCart();
//   const { isAuthenticated } = useAuth();
//   const router = useRouter();

//   const [isLoginOpen, setIsLoginOpen] = useState(false);
//   const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);

//   const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
//   const [itemToRemove, setItemToRemove] = useState<CartItemType | null>(null);

//   // [!code ++] FORCE REFRESH ON MOUNT
//   // This ensures that when the user clicks the "Bag" icon after login,
//   // we actually fetch the new list of items from the server.
//   useEffect(() => {
//     refreshCart();
//   }, []);

//   const handleCheckout = () => {
//     setIsComingSoonOpen(true);
//   };

//   const handleRequestRemove = (item: CartItemType) => {
//     setItemToRemove(item); 
//     setIsRemoveModalOpen(true); 
//   };

//   const confirmRemove = () => {
//     if (itemToRemove) {
//       removeFromCart(itemToRemove.product_variant_id); 
//     }
//     setIsRemoveModalOpen(false);
//     setItemToRemove(null);
//   };

//   if (isLoadingCart) {
//     return (
//       <div className="min-h-screen bg-[#FAFAFA] font-sans flex flex-col">
//         <TopBar />
//         <Header />
//         <NavBar />
//         <ShopHero title="Bag" isSubPage={true} />
//         <div className="flex-1 flex items-center justify-center text-[#013220] font-bold animate-pulse">
//           Loading Bag...
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#FAFAFA] font-sans">
//       <TopBar />
//       <Header />
//       <NavBar />

//       <ShopHero title="Bag" isSubPage={true} />

//       <main className="w-full pb-20 pt-8 flex justify-center font-jakarta">
//         <div className="container mx-auto px-3 md:px-4 max-w-[1600px]">

//             <h2 className="text-2xl font-bold text-[#013220] mb-6 pl-0 xl:pl-[84px]">
//               All Items ({cartSummary?.total_cart_items || 0} Items)
//             </h2>

//             <div className="flex flex-col xl:flex-row gap-8 items-start justify-center">

//                 <div className="flex-1 flex flex-col gap-6 w-full max-w-[924px]">
//                     {cartItems.length > 0 ? (
//                       cartItems.map((item, index) => (
//                           <CartItem 
//                             key={`${item.product_id}-${item.product_variant_id}-${index}`} 
//                             item={item} 
//                             onRemove={() => handleRequestRemove(item)}
//                           />
//                       ))
//                     ) : (
//                       <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
//                         <p className="text-gray-500 text-lg mb-4">Your bag is empty.</p>
//                         <a href="/shop" className="text-[#003C22] font-bold underline">Continue Shopping</a>
//                       </div>
//                     )}
//                 </div>

//                 <div className="w-full xl:w-[348px] shrink-0 flex flex-col gap-6">
//                     {cartSummary && cartItems.length > 0 && (
//                       <CartSummary 
//                           totalItems={cartSummary.total_cart_items}
//                           totalPrice={cartSummary.total_cart_price}
//                           totalDiscount={cartSummary.total_cart_discount}
//                           finalPrice={cartSummary.final_cart_price}
//                           isLoading={isCartUpdating}
//                           onCheckout={handleCheckout} 
//                       />
//                     )}
//                     <CartRecommendations />
//                 </div>

//             </div>
//         </div>
//       </main>

//       <Footer />

//       <LoginPopup 
//         isOpen={isLoginOpen} 
//         onClose={() => setIsLoginOpen(false)} 
//       />

//       <OrderComingSoonPopup 
//         isOpen={isComingSoonOpen}
//         onClose={() => setIsComingSoonOpen(false)}
//       />

//       <RemoveItemModal 
//         isOpen={isRemoveModalOpen}
//         onClose={() => setIsRemoveModalOpen(false)}
//         onConfirm={confirmRemove}
//         itemName={itemToRemove?.product_name || 'Item'}
//         itemImage={itemToRemove?.product_front_image_url || '/placeholder.png'} 
//         itemSize={itemToRemove?.size} 
//       />

//     </div>
//   );
// }
'use client';

import React, { useState, useEffect } from 'react';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';
import ShopHero from '@/components/shop/ShopHero'; 
import CartItem from '@/components/bag/CartItem';
import CartSummary from '@/components/bag/CartSummary';
import CartRecommendations from '@/components/bag/CartRecommendations';
import LoginPopup from '@/components/auth/LoginPopup';
import OrderComingSoonPopup from '@/components/shared/OrderComingSoonPopup';
import RemoveItemModal from '@/components/bag/RemoveItemModal'; 
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { CartItem as CartItemType } from '@/types'; 

export default function BagPage() {
  const { cartItems, cartSummary, isLoadingCart, isCartUpdating, removeFromCart, refreshCart } = useCart();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);

  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<CartItemType | null>(null);

  // [!code changed] SMART REFRESH LOGIC
  useEffect(() => {
    // If isLoadingCart is TRUE, it means the Context is already fetching (e.g., Refresh/Initial Load).
    // In that case, we do NOT call refreshCart() to avoid a double API hit.
    // If isLoadingCart is FALSE, it means we navigated here from another page, so we fetch fresh data.
    if (!isLoadingCart) {
      refreshCart();
    }
  }, []); 

  const handleCheckout = () => {
    setIsComingSoonOpen(true);
  };

  const handleRequestRemove = (item: CartItemType) => {
    setItemToRemove(item); 
    setIsRemoveModalOpen(true); 
  };

  const confirmRemove = () => {
    if (itemToRemove) {
      removeFromCart(itemToRemove.product_variant_id); 
    }
    setIsRemoveModalOpen(false);
    setItemToRemove(null);
  };

  // Initial Loading State (Spinner)
  if (isLoadingCart) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] font-sans flex flex-col">
        <TopBar />
        <Header />
        <NavBar />
        <ShopHero title="Bag" isSubPage={true} />
        <div className="flex-1 flex items-center justify-center text-[#013220] font-bold animate-pulse">
          Loading Bag...
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans">
      <TopBar />
      <Header />
      <NavBar />

      <ShopHero title="Bag" isSubPage={true} />

      <main className="w-full pb-20 pt-8 flex justify-center font-jakarta">
        <div className="container mx-auto px-3 md:px-4 max-w-[1600px]">

            <h2 className="text-2xl font-bold text-[#013220] mb-6 pl-0 xl:pl-[84px]">
              All Items ({cartSummary?.total_cart_items || 0} Items)
            </h2>

            <div className="flex flex-col xl:flex-row gap-8 items-start justify-center">

                <div className="flex-1 flex flex-col gap-6 w-full max-w-[924px]">
                    {cartItems.length > 0 ? (
                      cartItems.map((item, index) => (
                          <CartItem 
                            key={`${item.product_id}-${item.product_variant_id}-${index}`} 
                            item={item} 
                            onRemove={() => handleRequestRemove(item)}
                          />
                      ))
                    ) : (
                      <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                        <p className="text-gray-500 text-lg mb-4">Your bag is empty.</p>
                        <a href="/shop" className="text-[#003C22] font-bold underline">Continue Shopping</a>
                      </div>
                    )}
                </div>

                <div className="w-full xl:w-[348px] shrink-0 flex flex-col gap-6">
                    {cartSummary && cartItems.length > 0 && (
                      <CartSummary 
                          totalItems={cartSummary.total_cart_items}
                          totalPrice={cartSummary.total_cart_price}
                          totalDiscount={cartSummary.total_cart_discount}
                          finalPrice={cartSummary.final_cart_price}
                          isLoading={isCartUpdating}
                          onCheckout={handleCheckout} 
                      />
                    )}
                    <CartRecommendations />
                </div>

            </div>
        </div>
      </main>

      <Footer />

      <LoginPopup 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
      />

      <OrderComingSoonPopup 
        isOpen={isComingSoonOpen}
        onClose={() => setIsComingSoonOpen(false)}
      />

      <RemoveItemModal 
        isOpen={isRemoveModalOpen}
        onClose={() => setIsRemoveModalOpen(false)}
        onConfirm={confirmRemove}
        itemName={itemToRemove?.product_name || 'Item'}
        itemImage={itemToRemove?.product_front_image_url || '/placeholder.png'} 
        itemSize={itemToRemove?.size} 
      />

    </div>
  );
}