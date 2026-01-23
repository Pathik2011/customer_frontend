
// 'use client';

// import React, { useState, useEffect, useRef } from 'react'; // [!code highlight] Added useRef
// import { AlertCircle, RefreshCw } from 'lucide-react'; 
// import Script from 'next/script'; 
// import { useRouter } from 'next/navigation';
// import { fetchAuthSession } from 'aws-amplify/auth';

// // Services
// import { useCart } from '@/context/CartContext'; 
// import { checkoutService, CheckoutResponse } from '@/services/checkoutService';
// import { webSocketService } from '@/services/webSocketService';
// import { generateIdempotencyKey } from '@/utils/idempotency'; 

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
// import OrderSuccessPopup from '@/components/shared/OrderSuccessPopup';
// import OrderProcessingModal from '@/components/checkout/OrderProcessingModal'; 

// export default function CheckoutPage() {
//   const router = useRouter();
//   const { refreshCart } = useCart(); 
  
//   // Data State
//   const [checkoutData, setCheckoutData] = useState<CheckoutResponse | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
  
//   // UI State
//   const [isProcessing, setIsProcessing] = useState(false); 
//   const [isSuccessOpen, setIsSuccessOpen] = useState(false);

//   // Animation Modal State
//   const [processingStatus, setProcessingStatus] = useState<string>('');
//   const [processingStep, setProcessingStep] = useState<number>(0);

//   // [!code highlight] CACHE STATE (Scenario 2: No Refresh Optimization)
//   // This survives until the page is refreshed or closed.
//   const lastOrderRef = useRef<{
//     hash: string;
//     data: any;
//   } | null>(null);

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

//     // [!code highlight] B. CALCULATE HASH FIRST (The "Fingerprint")
//     const finalAmount = checkoutData?.summary?.grand_total || 0;
//     // Using 'as any' safely here because we know the ID exists in backend
//     const addressId = orderType === 'delivery' && checkoutData?.shipping_address 
//       ? (checkoutData.shipping_address as any).id 
//       : null;

//     const currentHash = await generateIdempotencyKey(
//       finalAmount,
//       selectedPaymentMethod,
//       orderType,
//       {
//         name: formData.full_name,
//         phone: formData.phone,
//         village: formData.village_name
//       },
//       addressId
//     );

//     // [!code highlight] C. SCENARIO 2 CHECK (The Optimization)
//     // If we have a cached order AND the hash matches exactly -> Reuse it!
//     if (lastOrderRef.current && lastOrderRef.current.hash === currentHash) {
//         console.log("⚡ Optimization: Reusing existing Order ID (Skipping API)");
        
//         // Directly trigger logic based on cached data
//         if (lastOrderRef.current.data.razorpay_order_id) {
//             triggerRazorpay(lastOrderRef.current.data);
//         } else if (lastOrderRef.current.data.type === 'OFFLINE_PAYMENT_ORDER') {
//             setIsSuccessOpen(true);
//         }
//         return; // STOP HERE. Don't call backend.
//     }

//     // --- D. NEW ORDER FLOW (Scenario 1 & Normal Flow) ---
    
//     setIsProcessing(true);
//     setProcessingStep(1); 
//     setProcessingStatus("Securing connection...");

//     try {
//       const session = await fetchAuthSession();
//       const token = session.tokens?.idToken?.toString();
//       if (!token) throw new Error("Session expired.");

//       // Step 1: WebSocket
//       const connectionId = await webSocketService.connect(token);
      
//       setProcessingStep(2);
//       setProcessingStatus("Creating your order securely...");

//       const orderPayload = {
//         full_name: formData.full_name,
//         phone_no: formData.phone,
//         village: formData.village_name,
//         payment_method: selectedPaymentMethod,
//         notes: "Web Checkout Order",
//         is_primary_address: "true",
//         shipping_address: orderType === 'delivery' ? checkoutData.shipping_address : null
//       };

//       // Step 2: Call API with Hash
//       console.log("🔐 Sending Hash:", currentHash);
//       const apiResponse = await checkoutService.createOrder(token, orderPayload, connectionId, currentHash);

//       // [!code highlight] E. CHECK HTTP RESPONSE (Scenario 1 Safety Net)
//       // If backend finds duplicate, it might return data IMMEDIATELY via HTTP.
//       // If so, we use it and skip waiting for WebSocket.
//       let finalData = null;

//       if (apiResponse && (apiResponse.razorpay_order_id || apiResponse.type === 'OFFLINE_PAYMENT_ORDER')) {
//           console.log("🚀 Backend returned data immediately (HTTP). Skipping WebSocket wait.");
//           finalData = apiResponse;
//       } else {
//           // Normal case: Wait for Step Function via WebSocket
//           setProcessingStep(3);
//           setProcessingStatus("Preparing payment gateway...");
//           finalData = await webSocketService.waitForPaymentDetails();
//       }

//       // Cleanup
//       console.log("🔌 Process Complete. Closing WebSocket.");
//       webSocketService.disconnect();

//       // [!code highlight] F. UPDATE CACHE (For next time)
//       lastOrderRef.current = {
//           hash: currentHash,
//           data: finalData
//       };

//       // G. Handle Outcome
//       if (finalData.type === 'OFFLINE_PAYMENT_ORDER') {
//           console.log("✅ COD Order Success!");
//           await refreshCart();
          
//           setProcessingStatus(''); 
//           setProcessingStep(0);
//           setIsProcessing(false);
//           setIsSuccessOpen(true);
//       } 
//       else if (finalData.razorpay_order_id) {
//           console.log("4️⃣ Launching Razorpay...");
//           setProcessingStatus(''); 
//           setProcessingStep(0);
//           triggerRazorpay(finalData);
//       }
//       else {
//           throw new Error("Unknown response from server.");
//       }

//     } catch (err: any) {
//       console.error("Order Failed:", err);
//       alert(`Order Failed: ${err.message}`);
      
//       setProcessingStatus('');
//       setProcessingStep(0);
//       webSocketService.disconnect();
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
//       handler: async function (response: any) { 
//         console.log("Payment Success:", response);
//         await refreshCart(); 
//         setIsProcessing(false);
//         setIsSuccessOpen(true); 
//       },
//       modal: {
//         ondismiss: function() {
//             setIsProcessing(false);
//             // Note: We DO NOT clear lastOrderRef here. 
//             // This allows the user to click "Pay Now" again immediately (Scenario 2).
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

//       {/* 1. Processing Video Animation */}
//       <OrderProcessingModal 
//         isOpen={!!processingStatus} 
//         status={processingStatus}
//         step={processingStep}
//       />

//       {/* 2. Success Popup */}
//       <OrderSuccessPopup 
//         isOpen={isSuccessOpen} 
//         onClose={() => setIsSuccessOpen(false)} 
//       />

//       <Footer />
//     </div>
//   );
// }
'use client';

import React, { useState, useEffect, useRef } from 'react'; 
import { AlertCircle, RefreshCw } from 'lucide-react'; 
import Script from 'next/script'; 
import { useRouter } from 'next/navigation';
import { fetchAuthSession } from 'aws-amplify/auth';

// Services
import { useCart } from '@/context/CartContext'; 
import { checkoutService, CheckoutResponse, ShippingAddress } from '@/services/checkoutService'; 
import { webSocketService } from '@/services/webSocketService';
import { generateIdempotencyKey } from '@/utils/idempotency'; 

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
import OrderProcessingModal from '@/components/checkout/OrderProcessingModal'; 

export default function CheckoutPage() {
  const router = useRouter();
  const { refreshCart } = useCart(); 
  
  // Data State
  const [checkoutData, setCheckoutData] = useState<CheckoutResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // UI State
  const [isProcessing, setIsProcessing] = useState(false); 
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  // Animation Modal State
  const [processingStatus, setProcessingStatus] = useState<string>('');
  const [processingStep, setProcessingStep] = useState<number>(0);

  // Cache State
  const lastOrderRef = useRef<{
    hash: string;
    data: any;
  } | null>(null);

  // Form State
  const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('pickup');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    village_name: ''
  });

  // Address State
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [addressFormData, setAddressFormData] = useState<Partial<ShippingAddress>>({
    street: '',
    village: '',
    pin_code: '',
    taluka: '',
    state: '',
    district: '' 
  });

  // --- 1. Load Data ---
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

      console.log("🔍 DEBUG: Fetching Checkout Data..."); // [!code highlight] Log 1
      const data = await checkoutService.getCheckoutDetails(token);
      console.log("✅ DEBUG: Full API Response:", data); // [!code highlight] Log 2

      setCheckoutData(data);

      if (data.user) {
        setFormData({
          full_name: data.user.full_name || '',
          phone: data.user.phone || '',
          village_name: data.user.village_name || ''
        });
      }

      // [!code highlight] DEBUGGING ADDRESS LOGIC
      if (data.shipping_address && data.shipping_address.address_id) {
          console.log("📍 DEBUG: Found Saved Address:", data.shipping_address); // [!code highlight] Log 3
          
          const mappedAddress = {
            street: data.shipping_address.street || '',
            village: data.shipping_address.village || '',
            taluka: data.shipping_address.taluka || '',
            district: data.shipping_address.district || '',
            state: data.shipping_address.state || '',
            pin_code: data.shipping_address.pin_code || '',
          };
          console.log("📝 DEBUG: Setting Form Data to:", mappedAddress); // [!code highlight] Log 4
          
          setAddressFormData(mappedAddress);
          setIsEditingAddress(false);
      } else {
          console.log("⚠️ DEBUG: No Saved Address Found (ID is null/undefined)"); // [!code highlight] Log 5
          setIsEditingAddress(true);
      }

    } catch (err: any) {
      console.error("❌ DEBUG: Error loading data:", err);
      setError(err.message || "Failed to load checkout details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadCheckoutData(); }, []);

  // --- 2. MAIN HANDLER ---
  const handlePlaceOrder = async () => {
    // Validation
    if (!checkoutData || !selectedPaymentMethod) {
      alert("Please select a payment method.");
      return;
    }
    if (!formData.full_name.trim() || !formData.phone.trim() || !formData.village_name.trim()) {
      alert("Please fill in all personal details.");
      return;
    }
    
    // Address Validation
    if (orderType === 'delivery') {
        if (!addressFormData.street || !addressFormData.taluka || !addressFormData.district || !addressFormData.state || !addressFormData.pin_code) {
             alert("Please fill in all address details.");
             return;
        }
    }

    // Calculate Hash
    const finalAmount = checkoutData?.summary?.grand_total || 0;
    const addressIdForHash = (orderType === 'delivery' && !isEditingAddress && checkoutData?.shipping_address) 
      ? (checkoutData.shipping_address as any).address_id 
      : null;

    const currentHash = await generateIdempotencyKey(
      finalAmount,
      selectedPaymentMethod,
      orderType,
      {
        name: formData.full_name,
        phone: formData.phone,
        village: formData.village_name
      },
      addressIdForHash
    );

    // Optimization Check
    if (lastOrderRef.current && lastOrderRef.current.hash === currentHash) {
        console.log("⚡ Optimization: Reusing existing Order ID");
        if (lastOrderRef.current.data.razorpay_order_id) {
            triggerRazorpay(lastOrderRef.current.data);
        } else if (lastOrderRef.current.data.type === 'OFFLINE_PAYMENT_ORDER') {
            setIsSuccessOpen(true);
        }
        return; 
    }

    // New Order Flow
    setIsProcessing(true);
    setProcessingStep(1); 
    setProcessingStatus("Securing connection...");

    try {
      const session = await fetchAuthSession();
      const token = session.tokens?.idToken?.toString();
      if (!token) throw new Error("Session expired.");

      const connectionId = await webSocketService.connect(token);
      
      setProcessingStep(2);
      setProcessingStatus("Creating your order securely...");

      let finalShippingAddress = null;
      
      if (orderType === 'delivery') {
          if (isEditingAddress) {
              finalShippingAddress = {
                  ...addressFormData,
                  village: formData.village_name, // Merge Village from Personal Details
                  id: null 
              };
          } else {
              finalShippingAddress = checkoutData?.shipping_address;
          }
      }

      const orderPayload = {
        full_name: formData.full_name,
        phone_no: formData.phone,
        village: formData.village_name,
        payment_method: selectedPaymentMethod,
        notes: "Web Checkout Order",
        is_primary_address: "true",
        shipping_address: finalShippingAddress
      };

      const apiResponse = await checkoutService.createOrder(token, orderPayload, connectionId, currentHash);

      let finalData = null;
      if (apiResponse && (apiResponse.razorpay_order_id || apiResponse.type === 'OFFLINE_PAYMENT_ORDER')) {
          finalData = apiResponse;
      } else {
          setProcessingStep(3);
          setProcessingStatus("Preparing payment gateway...");
          finalData = await webSocketService.waitForPaymentDetails();
      }

      webSocketService.disconnect();

      lastOrderRef.current = {
          hash: currentHash,
          data: finalData
      };

      if (finalData.type === 'OFFLINE_PAYMENT_ORDER') {
          await refreshCart();
          setProcessingStatus(''); 
          setProcessingStep(0);
          setIsProcessing(false);
          setIsSuccessOpen(true);
      } 
      else if (finalData.razorpay_order_id) {
          setProcessingStatus(''); 
          setProcessingStep(0);
          triggerRazorpay(finalData);
      }
      else {
          throw new Error("Unknown response from server.");
      }

    } catch (err: any) {
      console.error("Order Failed:", err);
      alert(`Order Failed: ${err.message}`);
      setProcessingStatus('');
      setProcessingStep(0);
      webSocketService.disconnect();
      setIsProcessing(false);
    }
  };

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
      handler: async function (response: any) { 
        console.log("Payment Success:", response);
        await refreshCart(); 
        setIsProcessing(false);
        setIsSuccessOpen(true); 
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

        {!loading && checkoutData && (
           <div className="container mx-auto px-3 md:px-4 max-w-[1600px]">
              <div className="flex flex-col xl:flex-row gap-8 items-start relative">
                
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
    
    {/* REPLACE THE ERROR LINE WITH THIS BLOCK: */}
   <DeliveryDetailsForm 
    key={checkoutData.shipping_address?.address_id || 'loading'} // [!code ++]
    formData={addressFormData} 
    isEditing={isEditingAddress}
    onEditClick={() => setIsEditingAddress(true)}
    onChange={(field, value) => setAddressFormData(prev => ({ ...prev, [field]: value }))}
/>
    
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

      <OrderProcessingModal 
        isOpen={!!processingStatus} 
        status={processingStatus}
        step={processingStep}
      />

      <OrderSuccessPopup 
        isOpen={isSuccessOpen} 
        onClose={() => setIsSuccessOpen(false)} 
      />

      <Footer />
    </div>
  );
}