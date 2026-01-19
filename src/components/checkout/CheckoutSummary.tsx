// 'use client';

// import React from 'react';

// // Define the specific props this component expects
// // This matches the structure from your Checkout API "summary" object
// interface CheckoutSummaryProps {
//   summary: {
//     sub_total: number;
//     product_discounts_total: number;
//     payment_method_discount: number;
//     shipping_cost: number;
//     grand_total: number;
//   } | null;
//   itemCount: number;
// }

// const CheckoutSummary = ({ summary, itemCount }: CheckoutSummaryProps) => {
//   if (!summary) return null;

//   return (
//     <div className="bg-white rounded-[12px] border border-[#E0E2E7] p-6 shadow-sm">
//       <h3 className="text-lg font-bold text-gray-900 mb-6">
//         Summary ({itemCount} Items)
//       </h3>
      
//       <div className="space-y-4 text-sm border-b border-gray-100 pb-6">
//         {/* Items Total */}
//         <div className="flex justify-between text-gray-600">
//           <span>Items Total</span>
//           <span className="font-bold text-gray-900">₹{summary.sub_total.toFixed(2)}</span>
//         </div>
        
//         {/* Product Discount */}
//         {summary.product_discounts_total > 0 && (
//           <div className="flex justify-between text-gray-600">
//             <span>Product Discount</span>
//             <span className="font-bold text-emerald-600">- ₹{summary.product_discounts_total.toFixed(2)}</span>
//           </div>
//         )}

//         {/* Payment Method Discount (e.g. UPI/Card) */}
//         {summary.payment_method_discount > 0 && (
//           <div className="flex justify-between text-gray-600">
//             <span>Payment Discount</span>
//             <span className="font-bold text-emerald-600">- ₹{summary.payment_method_discount.toFixed(2)}</span>
//           </div>
//         )}

//         {/* Shipping Cost */}
//         <div className="flex justify-between text-gray-600">
//           <span>Shipping</span>
//           <span className="font-bold text-gray-900">
//             {summary.shipping_cost === 0 ? 'Free' : `₹${summary.shipping_cost.toFixed(2)}`}
//           </span>
//         </div>
//       </div>
      
//       {/* Grand Total */}
//       <div className="flex justify-between items-center text-lg font-bold text-gray-900 mt-6 mb-2">
//         <span>Total Order Amount</span>
//         <span>₹{summary.grand_total.toFixed(2)}</span>
//       </div>

//       {/* Place Order Button */}
//       <button className="w-full h-[50px] bg-[#003C22] text-white rounded-[8px] font-bold text-sm hover:bg-emerald-900 transition-colors mt-4">
//         Place Order
//       </button>
//     </div>
//   );
// };

// export default CheckoutSummary;
'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react'; // [!code ++] Icon
import Spinner from '@/components/shared/Spinner'; // [!code ++] Loading state

interface CheckoutSummaryProps {
  summary: {
    sub_total: number;
    product_discounts_total: number;
    payment_method_discount: number;
    shipping_cost: number;
    grand_total: number;
  } | null;
  itemCount: number;
  // [!code ++] New props for interactivity
  onPlaceOrder: () => void;
  isLoading: boolean;
  isPaymentSelected: boolean;
}

const CheckoutSummary = ({ 
  summary, 
  itemCount,
  onPlaceOrder,     // [!code highlight]
  isLoading,        // [!code highlight]
  isPaymentSelected // [!code highlight]
}: CheckoutSummaryProps) => {
  
  if (!summary) return null;

  return (
    <div className="bg-white rounded-[12px] border border-[#E0E2E7] p-6 shadow-sm font-jakarta">
      <h3 className="text-lg font-bold text-gray-900 mb-6">
        Summary ({itemCount} Items)
      </h3>
      
      <div className="space-y-4 text-sm border-b border-gray-100 pb-6">
        {/* Items Total */}
        <div className="flex justify-between text-gray-600">
          <span>Items Total</span>
          <span className="font-bold text-gray-900">₹{summary.sub_total.toFixed(2)}</span>
        </div>
        
        {/* Product Discount */}
        {summary.product_discounts_total > 0 && (
          <div className="flex justify-between text-gray-600">
            <span>Product Discount</span>
            <span className="font-bold text-emerald-600">- ₹{summary.product_discounts_total.toFixed(2)}</span>
          </div>
        )}

        {/* Payment Method Discount */}
        {summary.payment_method_discount > 0 && (
          <div className="flex justify-between text-gray-600">
            <span>Payment Discount</span>
            <span className="font-bold text-emerald-600">- ₹{summary.payment_method_discount.toFixed(2)}</span>
          </div>
        )}

        {/* Shipping Cost */}
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span className="font-bold text-gray-900">
            {summary.shipping_cost === 0 ? 'Free' : `₹${summary.shipping_cost.toFixed(2)}`}
          </span>
        </div>
      </div>
      
      {/* Grand Total */}
      <div className="flex justify-between items-center text-lg font-bold text-gray-900 mt-6 mb-2">
        <span>Total Order Amount</span>
        <span>₹{summary.grand_total.toFixed(2)}</span>
      </div>

      {/* Pay Now Button */}
      {/* [!code changed] Updated Logic: Connected to handler & loading state */}
      <button 
        onClick={onPlaceOrder}
        disabled={isLoading || !isPaymentSelected}
        className="
          w-full h-[50px] bg-[#003C22] text-white rounded-[8px] font-bold text-sm 
          flex items-center justify-center gap-2 mt-4
          hover:bg-emerald-900 transition-colors 
          disabled:opacity-50 disabled:cursor-not-allowed
        "
      >
        {isLoading ? (
          <>
            Processing <Spinner className="w-4 h-4 text-white" />
          </>
        ) : (
          <>
            Pay Now <ArrowRight size={18} />
          </>
        )}
      </button>
      
      {/* Optional: Helper text if disabled */}
      {!isPaymentSelected && !isLoading && (
        <p className="text-xs text-center text-red-500 mt-2">
          Please select a payment method to proceed
        </p>
      )}
    </div>
  );
};

export default CheckoutSummary;