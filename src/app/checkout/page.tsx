// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useCart } from '@/context/CartContext';
// import { checkoutService, CheckoutResponse } from '@/services/checkoutService';

// // Layout Components
// import TopBar from '@/components/layout/TopBar';
// import Header from '@/components/layout/Header';
// import NavBar from '@/components/layout/NavBar';
// import Footer from '@/components/layout/Footer';
// import ShopHero from '@/components/shop/ShopHero';
// import CartItem from '@/components/bag/CartItem';

// // Checkout Specific Components
// import PersonalDetailsForm from '@/components/checkout/PersonalDetailsForm';
// import DeliveryDetailsForm from '@/components/checkout/DeliveryDetailsForm';
// import PaymentSection from '@/components/checkout/PaymentSection';
// import CheckoutSummary from '@/components/checkout/CheckoutSummary';

// export default function CheckoutPage() {
//   // We might still use useCart for mutations, but for display we use the Checkout API response
//   const { cartItems: contextCartItems } = useCart();
  
//   const [checkoutData, setCheckoutData] = useState<CheckoutResponse | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('pickup');

//   useEffect(() => {
//     const loadCheckoutData = async () => {
//       try {
//         setLoading(true);
//         const data = await checkoutService.getCheckoutDetails();
//         setCheckoutData(data);
//       } catch (error) {
//         console.error("Failed to load checkout data", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadCheckoutData();
//   }, []);

//   // Separator Component
//   const Separator = () => (
//     <div className="w-full h-[1px] bg-[#E0E2E7] my-8"></div>
//   );

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center text-[#003C22]">
//         Loading Checkout...
//       </div>
//     );
//   }

//   // Fallback if API fails
//   if (!checkoutData) {
//     return (
//       <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center text-red-500">
//         Failed to load checkout details. Please try again.
//       </div>
//     );
//   }

//   // Mapping API data to components
//   const cartSummary = {
//     total_cart_items: checkoutData.cart.total_cart_items,
//     total_cart_price: checkoutData.cart.total_cart_price,
//     total_cart_discount: checkoutData.cart.total_cart_discount,
//     final_cart_price: checkoutData.cart.final_cart_price,
//   };

//   return (
//     <div className="min-h-screen bg-[#FAFAFA] font-sans">
//       <TopBar />
//       <Header />
//       <NavBar />
      
//       <ShopHero title="Delivery Details" isSubPage={true} />

//       <main className="w-full pb-20 pt-8 flex justify-center font-jakarta">
//         <div className="container mx-auto px-3 md:px-4 max-w-[1600px]">
          
//           <div className="flex flex-col xl:flex-row gap-8 items-start relative">
            
//             {/* --- LEFT COLUMN --- */}
//             <div className="flex-1 w-full max-w-[924px] flex flex-col gap-8">
              
//               <h2 className="text-2xl font-bold text-[#013220] h-[32px] flex items-center">All Details</h2>

//               <div className="bg-white p-6 rounded-[12px] border border-[#E0E2E7]">
                
//                 {/* 1. Personal Details (Pre-filled from API) */}
//                 <PersonalDetailsForm 
//                   orderType={orderType} 
//                   setOrderType={setOrderType} 
//                   initialData={checkoutData.user} // [!code ++] Pass user data
//                 />

//                 {/* 2. Delivery Details */}
//                 {orderType === 'delivery' && (
//                   <>
//                     <Separator />
//                     <DeliveryDetailsForm />
//                   </>
//                 )}

//                 <Separator />

//                 {/* 3. Payment Details (Dynamic from API) */}
//                 <PaymentSection 
//                   cartSummary={cartSummary} 
//                   paymentMethods={checkoutData.payment_methods} // [!code ++] Pass dynamic methods
//                 />
                
//               </div>

//               {/* 4. Cart Items List (From Checkout API) */}
//               <div className="mt-4">
//                  <h3 className="text-xl font-bold text-[#1D1F2C] mb-6">All Items in Cart ({cartSummary.total_cart_items})</h3>
//                  <div className="flex flex-col gap-4">
//                     {checkoutData.cart.items.map((item, index) => (
//                         <CartItem key={`${item.product_id}-${index}`} item={item} />
//                     ))}
//                  </div>
//               </div>

//             </div>

//             {/* --- RIGHT COLUMN --- */}
//            <div className="w-full xl:w-[348px] shrink-0 flex flex-col gap-6 xl:sticky xl:top-[20px] xl:mt-[64px]">
//                <CheckoutSummary 
//                  summary={checkoutData.summary} // Pass the full API summary object
//                  itemCount={checkoutData.cart.total_cart_items}
//                />
//             </div>

//           </div>
//         </div>
//       </main>
      
//       <Footer />
//     </div>
//   );
// }
'use client';

import React, { useState, useEffect } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react'; // [!code ++] Icons for error
import { useCart } from '@/context/CartContext';
import { checkoutService, CheckoutResponse } from '@/services/checkoutService';

// Layout Components
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';
import ShopHero from '@/components/shop/ShopHero';
import CartItem from '@/components/bag/CartItem';

// Checkout Specific Components
import PersonalDetailsForm from '@/components/checkout/PersonalDetailsForm';
import DeliveryDetailsForm from '@/components/checkout/DeliveryDetailsForm';
import PaymentSection from '@/components/checkout/PaymentSection';
import CheckoutSummary from '@/components/checkout/CheckoutSummary';

export default function CheckoutPage() {
  const { cartItems: contextCartItems } = useCart();
  
  const [checkoutData, setCheckoutData] = useState<CheckoutResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // [!code ++] Error State
  const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('pickup');

  // Fetch Data on Mount
  const loadCheckoutData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await checkoutService.getCheckoutDetails();
      setCheckoutData(data);
    } catch (err: any) {
      console.error("Failed to load checkout data", err);
      // Capture error message for the popup
      setError(err.message || "Something went wrong while fetching details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCheckoutData();
  }, []);

  // Separator Component
  const Separator = () => (
    <div className="w-full h-[1px] bg-[#E0E2E7] my-8"></div>
  );

  // --- RENDER ---
  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans flex flex-col">
      <TopBar />
      <Header />
      <NavBar />
      
      <ShopHero title="Order Checkout" isSubPage={true} />

      <main className="w-full pb-20 pt-8 flex justify-center font-jakarta flex-1 relative">
        
        {/* --- 1. ERROR POPUP (Visible if error exists) --- */}
        {error && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
             {/* Backdrop with Blur */}
             <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
             
             {/* Modal Content */}
             <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full relative z-10 flex flex-col items-center text-center animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
                  <AlertCircle size={32} className="text-red-500" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">Connection Error</h3>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                  {error}
                  <br/>
                  <span className="text-xs opacity-75">(Check console for CORS details if developing)</span>
                </p>
                
                <button 
                  onClick={loadCheckoutData} // Retry function
                  className="bg-[#003C22] text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-emerald-900 transition-colors"
                >
                  <RefreshCw size={18} /> Retry
                </button>
             </div>
          </div>
        )}

        {/* --- 2. MAIN CONTENT --- */}
        {loading ? (
           <div className="flex items-center justify-center h-[400px]">
             <div className="flex flex-col items-center gap-3">
               <div className="w-8 h-8 border-4 border-[#003C22] border-t-transparent rounded-full animate-spin"></div>
               <span className="text-[#003C22] font-medium text-sm">Loading Checkout...</span>
             </div>
           </div>
        ) : !checkoutData ? (
           /* Fallback / Skeleton Layout (Blurred behind popup) 
              This gives the visual impression that the page structure is there.
           */
           <div className="container mx-auto px-3 md:px-4 max-w-[1600px] opacity-30 blur-[2px] pointer-events-none select-none" aria-hidden="true">
              <div className="flex flex-col xl:flex-row gap-8 items-start">
                 <div className="flex-1 w-full max-w-[924px] flex flex-col gap-8">
                    <div className="h-8 w-40 bg-gray-200 rounded mb-4"></div>
                    <div className="bg-white p-6 rounded-[12px] h-[600px] border border-[#E0E2E7]"></div>
                 </div>
                 <div className="w-full xl:w-[348px] h-[400px] bg-white rounded-[12px] border border-[#E0E2E7]"></div>
              </div>
           </div>
        ) : (
           /* Success Layout */
           <div className="container mx-auto px-3 md:px-4 max-w-[1600px]">
              
              <div className="flex flex-col xl:flex-row gap-8 items-start relative">
                
                {/* LEFT COLUMN */}
                <div className="flex-1 w-full max-w-[924px] flex flex-col gap-8">
                  
                  <h2 className="text-2xl font-bold text-[#013220] h-[32px] flex items-center">All Details</h2>

                  <div className="bg-white p-6 rounded-[12px] border border-[#E0E2E7]">
                    
                    <PersonalDetailsForm 
                      orderType={orderType} 
                      setOrderType={setOrderType} 
                      initialData={checkoutData.user}
                    />

                    {/* 2. Delivery Details */}
                {orderType === 'delivery' && (
                  <>
                    <Separator />
                    <DeliveryDetailsForm 
                      address={checkoutData.shipping_address} // [!code ++] Pass the address
                    />
                  </>
                )}

                    <Separator />

                    <PaymentSection 
                      cartSummary={checkoutData.summary ? {
                          total_cart_items: checkoutData.cart.total_cart_items,
                          total_cart_price: checkoutData.summary.sub_total,
                          total_cart_discount: checkoutData.summary.product_discounts_total,
                          final_cart_price: checkoutData.summary.grand_total
                      } : null}
                      paymentMethods={checkoutData.payment_methods} 
                    />
                    
                  </div>

                  <div className="mt-4">
                     <h3 className="text-xl font-bold text-[#1D1F2C] mb-6">All Items in Cart ({checkoutData.cart.total_cart_items})</h3>
                     <div className="flex flex-col gap-4">
                        {checkoutData.cart.items.map((item, index) => (
                            <CartItem 
                                key={`${item.product_id}-${index}`} 
                                item={item} 
                                onUpdate={loadCheckoutData}
                                readonly={true} // [!code ++] Disable editing
                            />
                        ))}
                     </div>
                  </div>

                </div>

                {/* RIGHT COLUMN */}
                <div className="w-full xl:w-[348px] shrink-0 flex flex-col gap-6 xl:sticky xl:top-[20px] xl:mt-[64px]">
                   <CheckoutSummary 
                     summary={checkoutData.summary} 
                     itemCount={checkoutData.cart.total_cart_items}
                   />
                </div>

              </div>
           </div>
        )}

      </main>
      
      <Footer />
    </div>
  );
}