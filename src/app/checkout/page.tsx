// 'use client';

// import React, { useState, useEffect } from 'react';
// import { AlertCircle, RefreshCw } from 'lucide-react'; 
// import Script from 'next/script'; 
// import { useRouter } from 'next/navigation';
// import { fetchAuthSession } from 'aws-amplify/auth';
// import { v4 as uuidv4 } from 'uuid'; 

// // Services
// import { useCart } from '@/context/CartContext';
// import { checkoutService, CheckoutResponse } from '@/services/checkoutService';
// import { webSocketService } from '@/services/webSocketService';


// // Components
// import TopBar from '@/components/layout/TopBar';
// import Header from '@/components/layout/Header';
// import NavBar from '@/components/layout/NavBar';
// import Footer from '@/components/layout/Footer';
// import ShopHero from '@/components/shop/ShopHero';
// import CartItem from '@/components/bag/CartItem';
// import PersonalDetailsForm from '@/components/checkout/PersonalDetailsForm';
// import DeliveryDetailsForm from '@/components/checkout/DeliveryDetailsForm';
// import PaymentSection from '@/components/checkout/PaymentSection';
// import CheckoutSummary from '@/components/checkout/CheckoutSummary';
// import OrderSuccessPopup from '@/components/shared/OrderSuccessPopup'; // [!code ++] Import Popup

// export default function CheckoutPage() {
//   const router = useRouter();

//   // [!code highlight] 1. Get the refresh function from Context
//   const { refreshCart } = useCart();
  
//   // Data State
//   const [checkoutData, setCheckoutData] = useState<CheckoutResponse | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isProcessing, setIsProcessing] = useState(false); 
  
//   // [!code ++] Success Popup State
//   const [isSuccessOpen, setIsSuccessOpen] = useState(false);

//   // Form State
//   const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('pickup');
//   const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
//   const [formData, setFormData] = useState({
//     full_name: '',
//     phone: '',
//     village_name: ''
//   });

//   // --- 1. Load Data ---
//   const loadCheckoutData = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const session = await fetchAuthSession();
//       const token = session.tokens?.idToken?.toString();

//       if (!token) {
//         router.push('/bag');
//         return;
//       }

//       const data = await checkoutService.getCheckoutDetails(token);
//       setCheckoutData(data);

//       if (data.user) {
//         setFormData({
//           full_name: data.user.full_name || '',
//           phone: data.user.phone || '',
//           village_name: data.user.village_name || ''
//         });
//       }
//     } catch (err: any) {
//       console.error(err);
//       setError(err.message || "Failed to load checkout details.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { loadCheckoutData(); }, []);

//   // --- 2. MAIN HANDLER ---
//   const handlePlaceOrder = async () => {
//     // A. Validation
//     if (!checkoutData || !selectedPaymentMethod) {
//       alert("Please select a payment method.");
//       return;
//     }
//     if (!formData.full_name.trim() || !formData.phone.trim() || !formData.village_name.trim()) {
//       alert("Please fill in all personal details.");
//       return;
//     }
//     if (orderType === 'delivery' && !checkoutData.shipping_address) {
//       alert("Please provide a shipping address.");
//       return;
//     }

//     setIsProcessing(true);

//     try {
//       // B. Auth & Connect
//       const session = await fetchAuthSession();
//       const token = session.tokens?.idToken?.toString();
//       if (!token) throw new Error("Session expired.");

//       console.log("1️⃣ Connecting to WebSocket...");
//       const connectionId = await webSocketService.connect(token);
      
//       // C. Create Order
//       const idempotencyKey = uuidv4();
//       const orderPayload = {
//         full_name: formData.full_name,
//         phone_no: formData.phone,
//         village: formData.village_name,
//         payment_method: selectedPaymentMethod,
//         notes: "Web Checkout Order",
//         is_primary_address: "true",
//         shipping_address: orderType === 'delivery' ? checkoutData.shipping_address : null
//       };

//       console.log("2️⃣ Sending Order to API...");
//       await checkoutService.createOrder(token, orderPayload, connectionId, idempotencyKey);

//       // D. Wait for Response
//       console.log("3️⃣ Waiting for Server Response...");
//       const responseData = await webSocketService.waitForPaymentDetails();
      
//       // [!code highlight] E. CLOSE SOCKET IMMEDIATELY
//       console.log("🔌 Response received. Closing WebSocket.");
//       webSocketService.disconnect();

//       // F. Handle Response Type
//       if (responseData.type === 'OFFLINE_PAYMENT_ORDER') {
//           // COD Success
//           console.log("✅ COD Order Success!");

//           // [!code highlight] 2. REFRESH CART (Clear the badge)
//           await refreshCart();
//           setIsProcessing(false);
//           setIsSuccessOpen(true); // Open Popup
//       } 
//       else if (responseData.razorpay_order_id) {
//           // Online Payment
//           console.log("4️⃣ Launching Razorpay...");
//           triggerRazorpay(responseData);
//       }
//       else {
//           throw new Error("Unknown response from server.");
//       }

//     } catch (err: any) {
//       console.error("Order Failed:", err);
//       alert(`Order Failed: ${err.message}`);
//       webSocketService.disconnect(); // Ensure close on error
//       setIsProcessing(false);
//     }
//   };

//   // --- 3. Razorpay Trigger ---
//   const triggerRazorpay = (data: any) => {
//     const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
//     if (!keyId) {
//         alert("Configuration Error: Missing Razorpay Key");
//         setIsProcessing(false);
//         return;
//     }

//     const options = {
//       key: keyId,
//       amount: data.payable_amount, 
//       currency: "INR",
//       order_id: data.razorpay_order_id,
//       name: "Farmers Choice",
//       description: "Order Payment",
//       config: {
//         display: {
//           blocks: {
//             restricted: {
//               name: selectedPaymentMethod === 'UPI_COLLECT' ? "Pay via UPI (Discount Applied)" : "Pay Now",
//               instruments: [
//                 { method: selectedPaymentMethod === 'UPI_COLLECT' ? 'upi' : 'card' } 
//               ]
//             }
//           },
//           sequence: ["block.restricted"],
//           preferences: { show_default_blocks: false }
//         }
//       },
//       handler: function (response: any) {
//         console.log("Payment Success:", response);
//         // [!code highlight] 3. REFRESH CART (Clear the badge)
//         refreshCart();
//         setIsProcessing(false);
//         setIsSuccessOpen(true); // [!code highlight] Open Popup on Success
//       },
//       modal: {
//         ondismiss: function() {
//             setIsProcessing(false);
//             alert("Payment Cancelled");
//         }
//       }
//     };

//     const rzp = new (window as any).Razorpay(options);
//     rzp.open();
//   };

//   return (
//     <div className="min-h-screen bg-[#FAFAFA] font-sans flex flex-col">
//       <Script 
//         id="razorpay-checkout-js"
//         src="https://checkout.razorpay.com/v1/checkout.js"
//         strategy="lazyOnload"
//       />

//       <TopBar />
//       <Header />
//       <NavBar />
//       <ShopHero title="Order Checkout" isSubPage={true} />

//       <main className="w-full pb-20 pt-8 flex justify-center font-jakarta flex-1 relative">
//         {/* Error Popup */}
//         {error && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/20 backdrop-blur-sm">
//              <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
//                 <AlertCircle size={32} className="text-red-500 mx-auto mb-4" />
//                 <p className="text-gray-700 mb-6">{error}</p>
//                 <button onClick={loadCheckoutData} className="bg-[#003C22] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 mx-auto">
//                   <RefreshCw size={18} /> Retry
//                 </button>
//              </div>
//           </div>
//         )}

//         {/* Content */}
//         {!loading && checkoutData && (
//            <div className="container mx-auto px-3 md:px-4 max-w-[1600px]">
//               <div className="flex flex-col xl:flex-row gap-8 items-start relative">
                
//                 {/* Forms */}
//                 <div className="flex-1 w-full max-w-[924px] flex flex-col gap-8">
//                   <h2 className="text-2xl font-bold text-[#013220] flex items-center">All Details</h2>
//                   <div className="bg-white p-6 rounded-[12px] border border-[#E0E2E7]">
                    
//                     <PersonalDetailsForm 
//                       orderType={orderType} 
//                       setOrderType={setOrderType} 
//                       formData={formData}
//                       onChange={(field, value) => setFormData(prev => ({ ...prev, [field]: value }))}
//                     />

//                     {orderType === 'delivery' && (
//                       <>
//                         <div className="w-full h-[1px] bg-[#E0E2E7] my-8"></div>
//                         <DeliveryDetailsForm address={checkoutData.shipping_address} />
//                       </>
//                     )}

//                     <div className="w-full h-[1px] bg-[#E0E2E7] my-8"></div>

//                     <PaymentSection 
//                       cartSummary={checkoutData.summary ? {
//                           total_cart_items: checkoutData.cart.total_cart_items,
//                           total_cart_price: checkoutData.summary.sub_total,
//                           total_cart_discount: checkoutData.summary.product_discounts_total,
//                           final_cart_price: checkoutData.summary.grand_total
//                       } : null}
//                       paymentMethods={checkoutData.payment_methods} 
//                       selectedMethod={selectedPaymentMethod} 
//                       onSelectMethod={setSelectedPaymentMethod} 
//                       onPayNow={handlePlaceOrder}
//                       isLoading={isProcessing}
//                     />
//                   </div>
//                   {/* Cart Items... */}
//                   <div className="mt-4">
//                      <h3 className="text-xl font-bold text-[#1D1F2C] mb-6">All Items in Cart ({checkoutData.cart.total_cart_items})</h3>
//                      <div className="flex flex-col gap-4">
//                         {checkoutData.cart.items.map((item, index) => (
//                             <CartItem 
//                                 key={`${item.product_id}-${index}`} 
//                                 item={item} 
//                                 onUpdate={loadCheckoutData}
//                                 readonly={true}
//                             />
//                         ))}
//                      </div>
//                   </div>
//                 </div>

//                 {/* Summary */}
//                 <div className="w-full xl:w-[348px] shrink-0 flex flex-col gap-6 xl:sticky xl:top-[20px] xl:mt-[64px]">
//                    <CheckoutSummary 
//                      summary={checkoutData.summary} 
//                      itemCount={checkoutData.cart.total_cart_items}
//                      onPlaceOrder={handlePlaceOrder}
//                      isLoading={isProcessing}
//                      isPaymentSelected={!!selectedPaymentMethod}
//                    />
//                 </div>
//               </div>
//            </div>
//         )}
//       </main>

//       {/* [!code ++] Success Popup Component */}
//       <OrderSuccessPopup 
//         isOpen={isSuccessOpen} 
//         onClose={() => setIsSuccessOpen(false)} // Optional
//       />

//       <Footer />
//     </div>
//   );
// }

'use client';

import React, { useState, useEffect } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react'; 
import Script from 'next/script'; 
import { useRouter } from 'next/navigation';
import { fetchAuthSession } from 'aws-amplify/auth';
import { v4 as uuidv4 } from 'uuid'; 

// Services
import { useCart } from '@/context/CartContext'; // [!code highlight] Used for refreshing badge
import { checkoutService, CheckoutResponse } from '@/services/checkoutService';
import { webSocketService } from '@/services/webSocketService';

// Components
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';
import ShopHero from '@/components/shop/ShopHero';
import CartItem from '@/components/bag/CartItem';
import PersonalDetailsForm from '@/components/checkout/PersonalDetailsForm';
import DeliveryDetailsForm from '@/components/checkout/DeliveryDetailsForm';
import PaymentSection from '@/components/checkout/PaymentSection';
import CheckoutSummary from '@/components/checkout/CheckoutSummary';
import OrderSuccessPopup from '@/components/shared/OrderSuccessPopup';
import OrderProcessingModal from '@/components/checkout/OrderProcessingModal'; // [!code highlight] Import Video Modal

export default function CheckoutPage() {
  const router = useRouter();
  const { refreshCart } = useCart(); // [!code highlight] Destructure refresh function
  
  // Data State
  const [checkoutData, setCheckoutData] = useState<CheckoutResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // UI State
  const [isProcessing, setIsProcessing] = useState(false); 
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  // [!code highlight] Animation Modal State
  const [processingStatus, setProcessingStatus] = useState<string>('');
  const [processingStep, setProcessingStep] = useState<number>(0);

  // Form State
  const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('pickup');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    village_name: ''
  });

  // --- 1. Load Data ---
  const loadCheckoutData = async () => {
    try {
      setLoading(true);
      setError(null);
      const session = await fetchAuthSession();
      const token = session.tokens?.idToken?.toString();

      if (!token) {
        router.push('/bag');
        return;
      }

      const data = await checkoutService.getCheckoutDetails(token);
      setCheckoutData(data);

      if (data.user) {
        setFormData({
          full_name: data.user.full_name || '',
          phone: data.user.phone || '',
          village_name: data.user.village_name || ''
        });
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to load checkout details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadCheckoutData(); }, []);

  // --- 2. MAIN HANDLER ---
  const handlePlaceOrder = async () => {
    // A. Validation
    if (!checkoutData || !selectedPaymentMethod) {
      alert("Please select a payment method.");
      return;
    }
    if (!formData.full_name.trim() || !formData.phone.trim() || !formData.village_name.trim()) {
      alert("Please fill in all personal details.");
      return;
    }
    if (orderType === 'delivery' && !checkoutData.shipping_address) {
      alert("Please provide a shipping address.");
      return;
    }

    // [!code highlight] Start The Animation Flow
    setIsProcessing(true);
    setProcessingStep(1); 
    setProcessingStatus("Securing connection...");

    try {
      const session = await fetchAuthSession();
      const token = session.tokens?.idToken?.toString();
      if (!token) throw new Error("Session expired.");

      // Step 1: WebSocket
      const connectionId = await webSocketService.connect(token);
      
      // [!code highlight] Update Animation -> Step 2
      setProcessingStep(2);
      setProcessingStatus("Creating your order securely...");

      const idempotencyKey = uuidv4();
      const orderPayload = {
        full_name: formData.full_name,
        phone_no: formData.phone,
        village: formData.village_name,
        payment_method: selectedPaymentMethod,
        notes: "Web Checkout Order",
        is_primary_address: "true",
        shipping_address: orderType === 'delivery' ? checkoutData.shipping_address : null
      };

      await checkoutService.createOrder(token, orderPayload, connectionId, idempotencyKey);

      // [!code highlight] Update Animation -> Step 3
      setProcessingStep(3);
      setProcessingStatus("Preparing payment gateway...");

      // Wait for server response...
      const responseData = await webSocketService.waitForPaymentDetails();
      
      console.log("🔌 Response received. Closing WebSocket.");
      webSocketService.disconnect();

      if (responseData.type === 'OFFLINE_PAYMENT_ORDER') {
          // --- CASE A: COD Success ---
          console.log("✅ COD Order Success!");
          
          await refreshCart(); // Clear Badge
          
          // [!code highlight] Hide Animation Modal
          setProcessingStatus(''); 
          setProcessingStep(0);
          
          setIsProcessing(false);
          setIsSuccessOpen(true); // Show Success Popup
      } 
      else if (responseData.razorpay_order_id) {
          // --- CASE B: Online Payment ---
          console.log("4️⃣ Launching Razorpay...");
          
          // [!code highlight] Hide Animation Modal so Razorpay can show
          setProcessingStatus(''); 
          setProcessingStep(0);
          
          triggerRazorpay(responseData);
      }
      else {
          throw new Error("Unknown response from server.");
      }

    } catch (err: any) {
      console.error("Order Failed:", err);
      alert(`Order Failed: ${err.message}`);
      
      // Reset Everything on Error
      setProcessingStatus('');
      setProcessingStep(0);
      webSocketService.disconnect();
      setIsProcessing(false);
    }
  };

  // --- 3. Razorpay Trigger ---
  const triggerRazorpay = (data: any) => {
    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    if (!keyId) {
        alert("Configuration Error: Missing Razorpay Key");
        setIsProcessing(false);
        return;
    }

    const options = {
      key: keyId,
      amount: data.payable_amount, 
      currency: "INR",
      order_id: data.razorpay_order_id,
      name: "Farmers Choice",
      description: "Order Payment",
      config: {
        display: {
          blocks: {
            restricted: {
              name: selectedPaymentMethod === 'UPI_COLLECT' ? "Pay via UPI (Discount Applied)" : "Pay Now",
              instruments: [
                { method: selectedPaymentMethod === 'UPI_COLLECT' ? 'upi' : 'card' } 
              ]
            }
          },
          sequence: ["block.restricted"],
          preferences: { show_default_blocks: false }
        }
      },
      handler: async function (response: any) { // [!code highlight] Async handler
        console.log("Payment Success:", response);
        
        await refreshCart(); // Clear Badge
        
        setIsProcessing(false);
        setIsSuccessOpen(true); // Show Success Popup
      },
      modal: {
        ondismiss: function() {
            setIsProcessing(false);
            alert("Payment Cancelled");
        }
      }
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans flex flex-col">
      <Script 
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />

      <TopBar />
      <Header />
      <NavBar />
      <ShopHero title="Order Checkout" isSubPage={true} />

      <main className="w-full pb-20 pt-8 flex justify-center font-jakarta flex-1 relative">
        {/* Error Popup */}
        {error && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/20 backdrop-blur-sm">
             <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
                <AlertCircle size={32} className="text-red-500 mx-auto mb-4" />
                <p className="text-gray-700 mb-6">{error}</p>
                <button onClick={loadCheckoutData} className="bg-[#003C22] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 mx-auto">
                  <RefreshCw size={18} /> Retry
                </button>
             </div>
          </div>
        )}

        {/* Content */}
        {!loading && checkoutData && (
           <div className="container mx-auto px-3 md:px-4 max-w-[1600px]">
              <div className="flex flex-col xl:flex-row gap-8 items-start relative">
                
                {/* Forms */}
                <div className="flex-1 w-full max-w-[924px] flex flex-col gap-8">
                  <h2 className="text-2xl font-bold text-[#013220] flex items-center">All Details</h2>
                  <div className="bg-white p-6 rounded-[12px] border border-[#E0E2E7]">
                    
                    <PersonalDetailsForm 
                      orderType={orderType} 
                      setOrderType={setOrderType} 
                      formData={formData}
                      onChange={(field, value) => setFormData(prev => ({ ...prev, [field]: value }))}
                    />

                    {orderType === 'delivery' && (
                      <>
                        <div className="w-full h-[1px] bg-[#E0E2E7] my-8"></div>
                        <DeliveryDetailsForm address={checkoutData.shipping_address} />
                      </>
                    )}

                    <div className="w-full h-[1px] bg-[#E0E2E7] my-8"></div>

                    <PaymentSection 
                      cartSummary={checkoutData.summary ? {
                          total_cart_items: checkoutData.cart.total_cart_items,
                          total_cart_price: checkoutData.summary.sub_total,
                          total_cart_discount: checkoutData.summary.product_discounts_total,
                          final_cart_price: checkoutData.summary.grand_total
                      } : null}
                      paymentMethods={checkoutData.payment_methods} 
                      selectedMethod={selectedPaymentMethod} 
                      onSelectMethod={setSelectedPaymentMethod} 
                      onPayNow={handlePlaceOrder}
                      isLoading={isProcessing}
                    />
                  </div>
                  {/* Cart Items... */}
                  <div className="mt-4">
                     <h3 className="text-xl font-bold text-[#1D1F2C] mb-6">All Items in Cart ({checkoutData.cart.total_cart_items})</h3>
                     <div className="flex flex-col gap-4">
                        {checkoutData.cart.items.map((item, index) => (
                            <CartItem 
                                key={`${item.product_id}-${index}`} 
                                item={item} 
                                onUpdate={loadCheckoutData}
                                readonly={true}
                            />
                        ))}
                     </div>
                  </div>
                </div>

                {/* Summary */}
                <div className="w-full xl:w-[348px] shrink-0 flex flex-col gap-6 xl:sticky xl:top-[20px] xl:mt-[64px]">
                   <CheckoutSummary 
                     summary={checkoutData.summary} 
                     itemCount={checkoutData.cart.total_cart_items}
                     onPlaceOrder={handlePlaceOrder}
                     isLoading={isProcessing}
                     isPaymentSelected={!!selectedPaymentMethod}
                   />
                </div>
              </div>
           </div>
        )}
      </main>

      {/* [!code highlight] 1. Processing Video Animation */}
      <OrderProcessingModal 
        isOpen={!!processingStatus} 
        status={processingStatus}
        step={processingStep}
      />

      {/* [!code highlight] 2. Success Popup */}
      <OrderSuccessPopup 
        isOpen={isSuccessOpen} 
        onClose={() => setIsSuccessOpen(false)} 
      />

      <Footer />
    </div>
  );
}