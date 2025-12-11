
// 'use client';

// import React from 'react';
// import { ArrowRight } from 'lucide-react';
// import Spinner from '@/components/shared/Spinner';

// interface CartSummaryProps {
//   totalItems: number;
//   totalPrice: number;
//   totalDiscount: number;
//   finalPrice: number;
//   isLoading?: boolean;
// }

// const CartSummary = ({ totalItems, totalPrice, totalDiscount, finalPrice, isLoading = false }: CartSummaryProps) => {
  
//   return (
//     <div className="
//       bg-white border border-[#E0E2E7] font-jakarta flex flex-col justify-between
//       w-full max-w-[369px] mx-auto h-[155px] rounded-[12px] p-4
//       md:h-auto md:min-h-[342px] md:p-6 md:max-w-none md:mx-0
//     ">
      
//       {/* --- Desktop Layout --- */}
//       <div className="hidden md:block">
//         <h3 className="text-lg font-bold text-gray-900 mb-6">
//           Summary ({totalItems} Items)
//         </h3>
        
//         <div className="space-y-4 text-sm border-b border-gray-100 pb-6">
//           {/* Items Total */}
//           <div className="flex justify-between text-gray-600 h-[20px] items-center">
//             <span>Items Total</span>
//             {isLoading ? (
//               <Spinner className="w-4 h-4 text-gray-900" />
//             ) : (
//               <span className="font-bold text-gray-900">₹{totalPrice.toFixed(2)}</span>
//             )}
//           </div>

//           {/* Cart Discount */}
//           <div className="flex justify-between text-gray-600 h-[20px] items-center">
//             <span>Cart Discount</span>
//             {isLoading ? (
//               <Spinner className="w-4 h-4 text-emerald-600" />
//             ) : (
//               <span className="font-bold text-emerald-600">- ₹{totalDiscount.toFixed(2)}</span>
//             )}
//           </div>
//         </div>
        
//         {/* Total Order Amount */}
//         <div className="flex justify-between items-center text-lg font-bold text-gray-900 mt-6 mb-2 h-[28px]">
//           <span>Total Order Amount</span>
//           {isLoading ? (
//             <Spinner className="w-5 h-5 text-gray-900" />
//           ) : (
//             <span>₹{finalPrice.toFixed(2)}</span>
//           )}
//         </div>
//       </div>

//       {/* --- Mobile Layout --- */}
//       <div className="md:hidden flex flex-col justify-center h-full pb-2">
//          <div className="flex justify-between items-end">
//             <div className="flex flex-col gap-1">
//                <div className="flex items-baseline gap-1">
//                  <span className="text-sm font-bold text-gray-500">Total Amount</span>
//                  <span className="text-xs font-medium text-gray-400">({totalItems} Items)</span>
//                </div>
               
//                {/* Mobile Final Price */}
//                <div className="h-[32px] flex items-center">
//                  {isLoading ? (
//                    <Spinner className="w-6 h-6 text-[#003C22]" />
//                  ) : (
//                    <span className="text-2xl font-bold text-[#003C22]">₹{finalPrice.toFixed(2)}</span>
//                  )}
//                </div>
//             </div>
            
//             <div className="flex flex-col items-end mb-1 h-[34px] justify-end">
//                {/* Mobile Discount Section */}
//                {isLoading ? (
//                  <Spinner className="w-4 h-4 text-gray-400 mb-1" />
//                ) : (
//                  totalDiscount > 0 && (
//                    <>
//                      <span className="text-[10px] text-gray-400 line-through">₹{totalPrice.toFixed(2)}</span>
//                      <span className="text-[10px] text-emerald-600 font-bold">Save ₹{totalDiscount.toFixed(2)}</span>
//                    </>
//                  )
//                )}
//             </div>
//          </div>
//       </div>
      
//       {/* Action Button */}
//       <button className="
//         w-full bg-[#003C22] rounded-[12px] flex items-center justify-center gap-2 text-white font-bold text-sm hover:bg-emerald-900 transition-colors shrink-0
//         h-[44px] md:h-[50px]
//       ">
//         Proceed to Buy <ArrowRight size={18} />
//       </button>
//     </div>
//   );
// };

// export default CartSummary;
'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import Spinner from '@/components/shared/Spinner';

interface CartSummaryProps {
  totalItems: number;
  totalPrice: number;
  totalDiscount: number;
  finalPrice: number;
  isLoading?: boolean;
  onCheckout: () => void; // [!code ++] Added prop
}

const CartSummary = ({ 
  totalItems, 
  totalPrice, 
  totalDiscount, 
  finalPrice, 
  isLoading = false,
  onCheckout // [!code ++] Destructure prop
}: CartSummaryProps) => {
  
  return (
    <div className="
      bg-white border border-[#E0E2E7] font-jakarta flex flex-col justify-between
      w-full max-w-[369px] mx-auto h-[155px] rounded-[12px] p-4
      md:h-auto md:min-h-[342px] md:p-6 md:max-w-none md:mx-0
    ">
      
      {/* --- Desktop Layout --- */}
      <div className="hidden md:block">
        <h3 className="text-lg font-bold text-gray-900 mb-6">
          Summary ({totalItems} Items)
        </h3>
        
        <div className="space-y-4 text-sm border-b border-gray-100 pb-6">
          {/* Items Total */}
          <div className="flex justify-between text-gray-600 h-[20px] items-center">
            <span>Items Total</span>
            {isLoading ? (
              <Spinner className="w-4 h-4 text-gray-900" />
            ) : (
              <span className="font-bold text-gray-900">₹{totalPrice.toFixed(2)}</span>
            )}
          </div>

          {/* Cart Discount */}
          <div className="flex justify-between text-gray-600 h-[20px] items-center">
            <span>Cart Discount</span>
            {isLoading ? (
              <Spinner className="w-4 h-4 text-emerald-600" />
            ) : (
              <span className="font-bold text-emerald-600">- ₹{totalDiscount.toFixed(2)}</span>
            )}
          </div>
        </div>
        
        {/* Total Order Amount */}
        <div className="flex justify-between items-center text-lg font-bold text-gray-900 mt-6 mb-2 h-[28px]">
          <span>Total Order Amount</span>
          {isLoading ? (
            <Spinner className="w-5 h-5 text-gray-900" />
          ) : (
            <span>₹{finalPrice.toFixed(2)}</span>
          )}
        </div>
      </div>

      {/* --- Mobile Layout --- */}
      <div className="md:hidden flex flex-col justify-center h-full pb-2">
         <div className="flex justify-between items-end">
            <div className="flex flex-col gap-1">
               <div className="flex items-baseline gap-1">
                 <span className="text-sm font-bold text-gray-500">Total Amount</span>
                 <span className="text-xs font-medium text-gray-400">({totalItems} Items)</span>
               </div>
               
               {/* Mobile Final Price */}
               <div className="h-[32px] flex items-center">
                 {isLoading ? (
                   <Spinner className="w-6 h-6 text-[#003C22]" />
                 ) : (
                   <span className="text-2xl font-bold text-[#003C22]">₹{finalPrice.toFixed(2)}</span>
                 )}
               </div>
            </div>
            
            <div className="flex flex-col items-end mb-1 h-[34px] justify-end">
               {/* Mobile Discount Section */}
               {isLoading ? (
                 <Spinner className="w-4 h-4 text-gray-400 mb-1" />
               ) : (
                 totalDiscount > 0 && (
                   <>
                     <span className="text-[10px] text-gray-400 line-through">₹{totalPrice.toFixed(2)}</span>
                     <span className="text-[10px] text-emerald-600 font-bold">Save ₹{totalDiscount.toFixed(2)}</span>
                   </>
                 )
               )}
            </div>
         </div>
      </div>
      
      {/* Action Button */}
      <button 
        onClick={onCheckout} // [!code ++] Attached handler
        disabled={isLoading} // [!code ++] Disable while loading
        className="
          w-full bg-[#003C22] rounded-[12px] flex items-center justify-center gap-2 text-white font-bold text-sm hover:bg-emerald-900 transition-colors shrink-0
          h-[44px] md:h-[50px] disabled:opacity-70 disabled:cursor-not-allowed
        "
      >
        {isLoading ? (
           'Processing...'
        ) : (
           <>Proceed to Buy <ArrowRight size={18} /></>
        )}
      </button>
    </div>
  );
};

export default CartSummary;