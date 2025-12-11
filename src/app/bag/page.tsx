
// 'use client';

// import React from 'react';
// import TopBar from '@/components/layout/TopBar';
// import Header from '@/components/layout/Header';
// import NavBar from '@/components/layout/NavBar';
// import Footer from '@/components/layout/Footer';
// import ShopHero from '@/components/shop/ShopHero'; 
// import CartItem from '@/components/bag/CartItem';
// import CartSummary from '@/components/bag/CartSummary';
// import CartRecommendations from '@/components/bag/CartRecommendations';
// import { useCart } from '@/context/CartContext';

// export default function BagPage() {
//   const { cartItems, cartSummary, isLoadingCart, isCartUpdating } = useCart(); // [!code ++] Destructure isCartUpdating

//   // Loading State (Initial Load)
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

//   // Loaded State
//   return (
//     <div className="min-h-screen bg-[#FAFAFA] font-sans">
//       <TopBar />
//       <Header />
//       <NavBar />
      
//       <ShopHero title="Bag" isSubPage={true} />

//       <main className="w-full pb-20 pt-8 flex justify-center font-jakarta">
//         {/* FIXED: Using px-3 (12px) on mobile. */}
//         <div className="container mx-auto px-3 md:px-4 max-w-[1600px]">
            
//             <h2 className="text-2xl font-bold text-[#013220] mb-6 pl-0 xl:pl-[84px]">
//               All Items ({cartSummary?.total_cart_items || 0} Items)
//             </h2>

//             <div className="flex flex-col xl:flex-row gap-8 items-start justify-center">
            
//                 {/* Left Column: Product Items */}
//                 <div className="flex-1 flex flex-col gap-6 w-full max-w-[924px]">
//                     {cartItems.length > 0 ? (
//                       cartItems.map((item, index) => (
//                           <CartItem key={`${item.product_id}-${item.product_variant_id}-${index}`} item={item} />
//                       ))
//                     ) : (
//                       <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
//                         <p className="text-gray-500 text-lg mb-4">Your bag is empty.</p>
//                         <a href="/shop" className="text-[#003C22] font-bold underline">Continue Shopping</a>
//                       </div>
//                     )}
//                 </div>

//                 {/* Right Sidebar: Summary & Recommendations */}
//                 <div className="w-full xl:w-[348px] shrink-0 flex flex-col gap-6">
//                     {cartSummary && cartItems.length > 0 && (
//                       <CartSummary 
//                           totalItems={cartSummary.total_cart_items}
//                           totalPrice={cartSummary.total_cart_price}
//                           totalDiscount={cartSummary.total_cart_discount}
//                           finalPrice={cartSummary.final_cart_price}
//                           isLoading={isCartUpdating} // [!code ++] Pass loading state
//                       />
//                     )}
                    
//                     <CartRecommendations />
//                 </div>

//             </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }
// 'use client';

// import React, { useState } from 'react'; // [!code ++] Added useState
// import TopBar from '@/components/layout/TopBar';
// import Header from '@/components/layout/Header';
// import NavBar from '@/components/layout/NavBar';
// import Footer from '@/components/layout/Footer';
// import ShopHero from '@/components/shop/ShopHero'; 
// import CartItem from '@/components/bag/CartItem';
// import CartSummary from '@/components/bag/CartSummary';
// import CartRecommendations from '@/components/bag/CartRecommendations';
// import { useCart } from '@/context/CartContext';
// import { useAuth } from '@/context/AuthContext'; // [!code ++]
// import { useRouter } from 'next/navigation'; // [!code ++]
// import LoginPopup from '@/components/auth/LoginPopup'; // [!code ++]

// export default function BagPage() {
//   const { cartItems, cartSummary, isLoadingCart, isCartUpdating } = useCart();
//   const { isAuthenticated } = useAuth(); // [!code ++]
//   const router = useRouter(); // [!code ++]
//   const [isLoginOpen, setIsLoginOpen] = useState(false); // [!code ++]

//   // [!code ++] Handler for "Proceed to Buy"
//   const handleCheckout = () => {
//     if (isAuthenticated) {
//       // If logged in, go straight to checkout
//       router.push('/checkout');
//     } else {
//       // If NOT logged in:
//       // 1. Save intent so AuthContext redirects after Google Login comes back
//       localStorage.setItem('redirectAfterLogin', '/checkout');
//       // 2. Open the login popup
//       setIsLoginOpen(true);
//     }
//   };

//   // Loading State (Initial Load)
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

//   // Loaded State
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
            
//                 {/* Left Column: Product Items */}
//                 <div className="flex-1 flex flex-col gap-6 w-full max-w-[924px]">
//                     {cartItems.length > 0 ? (
//                       cartItems.map((item, index) => (
//                           <CartItem key={`${item.product_id}-${item.product_variant_id}-${index}`} item={item} />
//                       ))
//                     ) : (
//                       <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
//                         <p className="text-gray-500 text-lg mb-4">Your bag is empty.</p>
//                         <a href="/shop" className="text-[#003C22] font-bold underline">Continue Shopping</a>
//                       </div>
//                     )}
//                 </div>

//                 {/* Right Sidebar: Summary & Recommendations */}
//                 <div className="w-full xl:w-[348px] shrink-0 flex flex-col gap-6">
//                     {cartSummary && cartItems.length > 0 && (
//                       <CartSummary 
//                           totalItems={cartSummary.total_cart_items}
//                           totalPrice={cartSummary.total_cart_price}
//                           totalDiscount={cartSummary.total_cart_discount}
//                           finalPrice={cartSummary.final_cart_price}
//                           isLoading={isCartUpdating}
//                           onCheckout={handleCheckout} // [!code ++] Pass the handler
//                       />
//                     )}
                    
//                     <CartRecommendations />
//                 </div>

//             </div>
//         </div>
//       </main>

//       <Footer />
      
//       {/* [!code ++] Render the Login Popup */}
//       <LoginPopup 
//         isOpen={isLoginOpen} 
//         onClose={() => setIsLoginOpen(false)} 
//       />
//     </div>
//   );
// }
// src/app/bag/page.tsx
'use client';

import React, { useState } from 'react';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';
import ShopHero from '@/components/shop/ShopHero'; 
import CartItem from '@/components/bag/CartItem';
import CartSummary from '@/components/bag/CartSummary';
import CartRecommendations from '@/components/bag/CartRecommendations';
import LoginPopup from '@/components/auth/LoginPopup'; // [!code ++] Import
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext'; // [!code ++] Import
import { useRouter } from 'next/navigation'; // [!code ++] Import

export default function BagPage() {
  const { cartItems, cartSummary, isLoadingCart, isCartUpdating } = useCart();
  
  // [!code ++] Auth Hooks
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // [!code ++] Checkout Handler
  const handleCheckout = () => {
    if (isAuthenticated) {
      // 1. If logged in, go directly to checkout
      router.push('/checkout');
    } else {
      // 2. If NOT logged in:
      //    Save the intent to go to checkout after login
      console.log("💾 Saving intent: /checkout");// Add this log
      localStorage.setItem('redirectAfterLogin', '/checkout');
      //    Open the login popup
      setIsLoginOpen(true);
    }
  };

  // Loading State
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
            
                {/* Left Column: Product Items */}
                <div className="flex-1 flex flex-col gap-6 w-full max-w-[924px]">
                    {cartItems.length > 0 ? (
                      cartItems.map((item, index) => (
                          <CartItem key={`${item.product_id}-${item.product_variant_id}-${index}`} item={item} />
                      ))
                    ) : (
                      <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                        <p className="text-gray-500 text-lg mb-4">Your bag is empty.</p>
                        <a href="/shop" className="text-[#003C22] font-bold underline">Continue Shopping</a>
                      </div>
                    )}
                </div>

                {/* Right Sidebar: Summary & Recommendations */}
                <div className="w-full xl:w-[348px] shrink-0 flex flex-col gap-6">
                    {cartSummary && cartItems.length > 0 && (
                      <CartSummary 
                          totalItems={cartSummary.total_cart_items}
                          totalPrice={cartSummary.total_cart_price}
                          totalDiscount={cartSummary.total_cart_discount}
                          finalPrice={cartSummary.final_cart_price}
                          isLoading={isCartUpdating}
                          onCheckout={handleCheckout} // [!code ++] Pass the handler
                      />
                    )}
                    
                    <CartRecommendations />
                </div>

            </div>
        </div>
      </main>

      <Footer />

      {/* [!code ++] Login Popup */}
      <LoginPopup 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
      />
    </div>
  );
}