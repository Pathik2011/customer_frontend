
// 'use client';

// import React from 'react'; // [!code changed] Removed useState
// import { CreditCard, Wallet, Truck, CheckCircle2 } from 'lucide-react';
// import { CartSummary } from '@/context/CartContext';
// import { PaymentMethod } from '@/services/checkoutService';
// import Spinner from '@/components/shared/Spinner'; // [!code ++]

// interface PaymentSectionProps {
//   cartSummary: CartSummary | null;
//   paymentMethods: PaymentMethod[];
//   // [!code ++] New Props to control this component from Parent
//   selectedMethod: string | null;
//   onSelectMethod: (method: string) => void;
//   onPayNow: () => void;
//   isLoading: boolean;
// }

// const PaymentSection = ({ 
//   cartSummary, 
//   paymentMethods, 
//   selectedMethod,   // [!code ++] Receive state
//   onSelectMethod,   // [!code ++] Receive setter
//   onPayNow,         // [!code ++] Receive action
//   isLoading         // [!code ++] Receive loading status
// }: PaymentSectionProps) => {

//   const inputClass = "w-full h-[46px] border border-[#E0E2E7] rounded-[12px] px-[16px] py-[13px] text-sm text-[#1D1F2C] outline-none focus:border-[#003C22] placeholder:text-gray-400 transition-colors bg-white";
//   const labelClass = "block text-sm font-semibold text-[#1D1F2C] mb-2";
//   const separatorClass = "w-full h-[1px] bg-[#E0E2E7] my-8";

//   const finalAmount = cartSummary?.final_cart_price || 0;

//   // Helper to get icon
//   const getIcon = (method: string) => {
//     if (method === 'CASH_ON_DELIVERY') return <Truck size={18} />;
//     if (method === 'UPI_COLLECT') return <Wallet size={18} />;
//     return <CreditCard size={18} />;
//   };

//   // Helper to get discount badge
//   const getDiscountBadge = (methodObj: PaymentMethod) => {
//     const discount = parseInt(methodObj.discount_percent);
//     if (discount > 0) {
//       return (
//         <span 
//           className="absolute -top-3 right-2 text-white text-[10px] px-2 py-0.5 rounded-full border border-white font-normal leading-tight"
//           style={{ backgroundColor: '#FD820B' }}
//         >
//           {discount}% OFF
//         </span>
//       );
//     }
//     return null;
//   };

//   return (
//     <section>
//       <h3 className="font-bold text-[#1D1F2C] mb-6 mt-4 text-[20px] leading-[25px]">
//         Payment Details
//       </h3>

//       <label className={labelClass}>Select Payment Method</label>
      
//       {/* --- Scrollable Wrapper --- */}
//       <div className="w-full overflow-x-auto no-scrollbar pt-4 pb-2 mb-6 -mx-1 px-1">
//         <div 
//           className="flex items-center bg-white border border-[#E0E2E7] rounded-[12px] overflow-visible"
//           style={{ width: '612px', height: '46px', padding: '4px', gap: '2px', minWidth: '612px' }}
//         >
//           {paymentMethods.map((method) => (
//              <button 
//               key={method.method}
//               onClick={() => {
//                 console.log("🔘 Payment Selected:", method.method); // [!code ++] Log
//                 onSelectMethod(method.method);
//               }}
//               className={`
//                 flex items-center justify-center gap-2 transition-all relative
//                 ${selectedMethod === method.method 
//                   ? 'bg-[#003C22] text-white border border-[#003C22]' 
//                   : 'bg-[#F3F3F5] text-[#003C22] border border-transparent hover:bg-gray-200'}
//               `}
//               style={{
//                 width: '200px', height: '38px', borderRadius: '12px',
//                 padding: '8px 12px 10px 12px', fontFamily: '"Plus Jakarta Sans", sans-serif',
//                 fontWeight: 600, fontSize: '14px', lineHeight: '100%', letterSpacing: '0.01em',
//                 whiteSpace: 'nowrap'
//               }}
//             >
//               {getIcon(method.method)}
//               {method.label === 'UPI Online' ? 'UPI' : method.label === 'Debit Card' ? 'Debit Card' : 'Cash On Delivery'}
//               {getDiscountBadge(method)}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* --- Dynamic Payment Fields --- */}
//       <div>
//           {selectedMethod === 'CASH_ON_DELIVERY' && (
//              <p className="text-sm text-gray-600 mb-4 animate-in fade-in slide-in-from-top-2">
//                Pay directly to the delivery agent upon receiving your order.
//              </p>
//           )}

//           {selectedMethod === 'UPI_COLLECT' && (
//             <div className="space-y-[14px] animate-in fade-in slide-in-from-top-2">
//                 <div className="flex items-center gap-2 text-sm text-[#003C22] bg-[#E6F4EA] p-3 rounded-md border border-[#003C22]/20">
//                   <CheckCircle2 size={16} />
//                   <span>2% Discount Applied. New item total is <strong>₹{finalAmount.toFixed(2)}</strong></span>
//                 </div>
//                 <div>
//                   <label className={labelClass}>UPI Id</label>
//                   <input type="text" placeholder="Enter UPI Id" className={inputClass} />
//                 </div>
//             </div>
//           )}

//           {selectedMethod === 'DEBIT_CARD' && (
//             <div className="space-y-[14px] animate-in fade-in slide-in-from-top-2">
//                  <div>
//                   <label className={labelClass}>Card Number</label>
//                   <input type="text" placeholder="XXXX XXXX XXXX XXXX" className={inputClass} />
//                 </div>
//             </div>
//           )}
//       </div>

//       <div className={separatorClass}></div>

//       {/* --- Main Action Button --- */}
//       <button 
//         onClick={() => {
//             console.log("🔘 'Pay Now' (Details Section) Clicked"); // [!code ++] Log
//             onPayNow();
//         }}
//         disabled={isLoading || !selectedMethod} // [!code ++] Disable logic
//         className="bg-[#003C22] text-white hover:bg-emerald-900 transition-colors flex items-center justify-center gap-[4px] disabled:opacity-50 disabled:cursor-not-allowed"
//         style={{
//           width: '100%', maxWidth: '860px', height: '48px', borderRadius: '12px',
//           padding: '13px 34px 15px 34px', fontFamily: '"Plus Jakarta Sans", sans-serif',
//           fontWeight: 600, fontSize: '16px', lineHeight: '100%', letterSpacing: '0.01em',
//         }}
//       >
//         {isLoading ? (
//             <>Processing <Spinner className="w-4 h-4 text-white" /></>
//         ) : (
//             <>
//                 {selectedMethod === 'CASH_ON_DELIVERY' ? 'Place Order' : 'Pay Now'} (₹{finalAmount.toFixed(2)})
//             </>
//         )}
//       </button>

//     </section>
//   );
// };

// export default PaymentSection;
'use client';

import React from 'react';
import { CreditCard, Wallet, Truck, CheckCircle2 } from 'lucide-react';
import { CartSummary } from '@/context/CartContext';
import { PaymentMethod } from '@/services/checkoutService';
import Spinner from '@/components/shared/Spinner';

interface PaymentSectionProps {
  cartSummary: CartSummary | null;
  paymentMethods: PaymentMethod[];
  selectedMethod: string | null;
  onSelectMethod: (method: string) => void;
  onPayNow: () => void;
  isLoading: boolean;
}

const PaymentSection = ({ 
  cartSummary, 
  paymentMethods, 
  selectedMethod,
  onSelectMethod,
  onPayNow,
  isLoading
}: PaymentSectionProps) => {

  const finalAmount = cartSummary?.final_cart_price || 0;

  // Helper to get icon
  const getIcon = (method: string) => {
    if (method === 'CASH_ON_DELIVERY') return <Truck size={18} />;
    if (method === 'UPI_COLLECT') return <Wallet size={18} />;
    return <CreditCard size={18} />;
  };

  return (
    <section>
      <h3 className="font-bold text-[#1D1F2C] mb-6 mt-4 text-[20px]">
        Payment Details
      </h3>

      <label className="block text-sm font-semibold text-[#1D1F2C] mb-2">Select Payment Method</label>
      
      {/* 1. SELECTION BUTTONS */}
      <div className="w-full overflow-x-auto no-scrollbar pt-4 pb-2 mb-6 -mx-1 px-1">
        <div className="flex items-center bg-white border border-[#E0E2E7] rounded-[12px] p-1 gap-[2px] min-w-[612px]">
          {paymentMethods.map((method) => (
             <button 
              key={method.method}
              onClick={() => onSelectMethod(method.method)}
              className={`
                flex items-center justify-center gap-2 transition-all relative h-[38px] w-[200px] rounded-[12px] font-semibold text-sm
                ${selectedMethod === method.method 
                  ? 'bg-[#003C22] text-white border border-[#003C22]' 
                  : 'bg-[#F3F3F5] text-[#003C22] border border-transparent hover:bg-gray-200'}
              `}
            >
              {getIcon(method.method)}
              {method.label === 'UPI Online' ? 'UPI' : method.label === 'Debit Card' ? 'Card' : 'COD'}
            </button>
          ))}
        </div>
      </div>

      {/* 2. INFORMATIVE TEXT ONLY (No Inputs!) */}
      <div className="min-h-[80px]">
          
          {selectedMethod === 'CASH_ON_DELIVERY' && (
             <p className="text-sm text-gray-600">
               Pay directly to the delivery agent upon receiving your order.
             </p>
          )}

          {selectedMethod === 'UPI_COLLECT' && (
            <div className="space-y-4 animate-in fade-in">
                <div className="flex items-center gap-2 text-sm text-[#003C22] bg-[#E6F4EA] p-3 rounded-md border border-[#003C22]/20">
                  <CheckCircle2 size={16} />
                  <span>2% Discount Applied! Pay <strong>₹{finalAmount.toFixed(2)}</strong></span>
                </div>
                {/* [!code highlight] User instruction instead of input */}
                <p className="text-sm text-gray-500 italic">
                  👉 You will enter your UPI ID in the secure popup after clicking "Pay Now".
                </p>
            </div>
          )}

          {selectedMethod === 'DEBIT_CARD' && (
            <div className="space-y-4 animate-in fade-in">
                {/* [!code highlight] User instruction instead of input */}
                <p className="text-sm text-gray-500 italic">
                  👉 You will enter your Card Details in the secure popup after clicking "Pay Now".
                </p>
            </div>
          )}

      </div>

      <div className="w-full h-[1px] bg-[#E0E2E7] my-8"></div>

      {/* 3. PAY BUTTON (Triggers the flow) */}
      <button 
        onClick={onPayNow}
        disabled={isLoading || !selectedMethod}
        className="w-full max-w-[860px] h-[48px] bg-[#003C22] text-white rounded-[12px] font-bold text-base hover:bg-emerald-900 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {isLoading ? (
            <>Processing <Spinner className="w-4 h-4 text-white" /></>
        ) : (
            <>{selectedMethod === 'CASH_ON_DELIVERY' ? 'Place Order' : 'Pay Now'} (₹{finalAmount.toFixed(2)})</>
        )}
      </button>

    </section>
  );
};

export default PaymentSection;