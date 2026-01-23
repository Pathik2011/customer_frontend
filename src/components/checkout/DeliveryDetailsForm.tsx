// 'use client';

// import React from 'react';
// import { MapPin } from 'lucide-react';
// import { ShippingAddress } from '@/services/checkoutService'; // [!code ++] Import type

// interface DeliveryDetailsFormProps {
//   address?: ShippingAddress; // [!code ++] Add prop
// }

// const DeliveryDetailsForm = ({ address }: DeliveryDetailsFormProps) => {
//   const inputClass = "w-full h-[46px] border border-[#E0E2E7] rounded-[12px] px-[16px] py-[13px] text-sm text-[#1D1F2C] outline-none focus:border-[#003C22] placeholder:text-gray-400 transition-colors bg-white";
//   const labelClass = "block text-sm font-semibold text-[#1D1F2C] mb-2";

//   return (
//     <section>
//       <div className="flex justify-between items-center mb-6">
//         <h3 className="text-lg font-bold text-[#1D1F2C]">Delivery Details</h3>
//         <button className="flex items-center gap-2 px-4 py-2 bg-[#003C22] text-white text-xs font-bold rounded-[8px] hover:bg-emerald-900 transition">
//           <MapPin size={14} /> Use Current Location
//         </button>
//       </div>

//       <div className="flex flex-col gap-[14px]">
//         <div>
//           <label className={labelClass}>Address Line 1 (Village/Area)</label>
//           <input 
//             type="text" 
//             placeholder="Enter Address" 
//             className={inputClass} 
//             defaultValue={address?.village} // [!code ++] Pre-fill
//           />
//         </div>
//         <div>
//           <label className={labelClass}>Address Line 2 (Street)</label>
//           <input 
//             type="text" 
//             placeholder="Enter Address" 
//             className={inputClass}
//             defaultValue={address?.street} // [!code ++] Pre-fill
//           />
//         </div>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-[14px]">
//           <div>
//             <label className={labelClass}>Pincode</label>
//             <input 
//               type="text" 
//               placeholder="Enter Pincode" 
//               className={inputClass}
//               defaultValue={address?.pin_code || ''} // [!code ++] Pre-fill
//             />
//           </div>
//           <div>
//             <label className={labelClass}>City (Taluka)</label>
//             <div className="relative">
//                {/* Ideally this would be a text input if the API gives a specific city, 
//                    or a select if you have a list. Using defaultValue on input for now. */}
//                <input 
//                   type="text"
//                   placeholder="Enter City"
//                   className={inputClass}
//                   defaultValue={address?.taluka || ''} 
//                />
//                {/* If sticking with Select: */}
//                {/* <select className={`${inputClass} appearance-none bg-white cursor-pointer`}>
//                 <option>{address?.taluka || 'Select City'}</option>
//                </select> 
//                */}
//             </div>
//           </div>
//           <div>
//             <label className={labelClass}>State</label>
//             <div className="relative">
//                <input 
//                   type="text"
//                   placeholder="Enter State"
//                   className={inputClass}
//                   defaultValue={address?.state || ''} 
//                />
//             </div>
//           </div>
//           <div>
//             <label className={labelClass}>Country</label>
//             <div className="relative">
//                 <input 
//                   type="text"
//                   placeholder="Enter Country"
//                   className={inputClass}
//                   defaultValue="India" // Hardcoded or from API
//                />
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-col gap-3 mt-2">
//           <label className="flex items-center gap-2 cursor-pointer">
//             <input type="checkbox" className="w-4 h-4 rounded text-[#003C22] focus:ring-[#003C22]" />
//             <span className="text-sm text-gray-600">Save details for future orders</span>
//           </label>
//           <label className="flex items-center gap-2 cursor-pointer">
//               <input type="checkbox" className="w-4 h-4 rounded text-[#003C22] focus:ring-[#003C22]" />
//               <span className="text-sm text-gray-600">Send me News/Offers updates on my whatsapp</span>
//           </label>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default DeliveryDetailsForm;
'use client';

import React, { useEffect } from 'react';
import { MapPin, Pencil } from 'lucide-react'; 
import { ShippingAddress } from '@/services/checkoutService';

// Interface must match what CheckoutPage sends
interface DeliveryDetailsFormProps {
  formData: Partial<ShippingAddress>; 
  isEditing: boolean;
  onEditClick: () => void;
  onChange: (field: string, value: string) => void;
}

const DeliveryDetailsForm = ({ formData, isEditing, onEditClick, onChange }: DeliveryDetailsFormProps) => {
  
  // [!code highlight] DEBUG LOGS
  useEffect(() => {
    console.log("🎨 DEBUG: DeliveryDetailsForm Rendered");
    console.log("📦 DEBUG: Received formData:", formData);
    console.log("✏️ DEBUG: Received isEditing:", isEditing);
  }, [formData, isEditing]);

  const inputClass = "w-full h-[46px] border border-[#E0E2E7] rounded-[12px] px-[16px] py-[13px] text-sm text-[#1D1F2C] outline-none focus:border-[#003C22] placeholder:text-gray-400 transition-colors bg-white";
  const labelClass = "block text-sm font-semibold text-[#1D1F2C] mb-2";

  // 1. SAVED VIEW (Read Only)
  if (!isEditing) {
      return (
        <section>
           <div className="flex justify-between items-center mb-4">
               <h3 className="text-lg font-bold text-[#1D1F2C]">Delivery Details</h3>
               <button 
                  onClick={onEditClick}
                  className="flex items-center gap-2 text-[#003C22] text-sm font-bold hover:underline"
                >
                  <Pencil size={14} /> Edit Address
               </button>
           </div>
           
           <div className="bg-[#F3F4F6] p-4 rounded-xl border border-[#E0E2E7]">
               <div className="flex items-start gap-3">
                   <div className="mt-1 text-[#003C22]"><MapPin size={20} /></div>
                   <div>
                       <p className="font-bold text-[#1D1F2C] text-sm mb-1">Saved Address</p>
                       <p className="text-sm text-gray-600 leading-relaxed">
                          {formData.street} <br/>
                          {formData.taluka}, {formData.district} <br/>
                          {formData.state} - {formData.pin_code}
                       </p>
                   </div>
               </div>
           </div>
        </section>
      );
  }

  // 2. FORM VIEW (Editing)
  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-[#1D1F2C]">Delivery Details</h3>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#003C22] text-white text-xs font-bold rounded-[8px] hover:bg-emerald-900 transition">
          <MapPin size={14} /> Use Current Location
        </button>
      </div>

      <div className="flex flex-col gap-[14px]">
        {/* Street Name */}
        <div>
          <label className={labelClass}>Street Name / House Number</label>
          <input 
            type="text" 
            placeholder="Enter Street Name or House No." 
            className={inputClass}
            value={formData.street || ''} 
            onChange={(e) => onChange('street', e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[14px]">
          {/* Taluka */}
          <div>
            <label className={labelClass}>Taluka</label>
            <div className="relative">
               <input 
                  type="text"
                  placeholder="Enter Taluka"
                  className={inputClass}
                  value={formData.taluka || ''} 
                  onChange={(e) => onChange('taluka', e.target.value)}
               />
            </div>
          </div>

          {/* District */}
          <div>
            <label className={labelClass}>District</label>
            <div className="relative">
               <input 
                  type="text"
                  placeholder="Enter District"
                  className={inputClass}
                  value={formData.district || ''} 
                  onChange={(e) => onChange('district', e.target.value)}
               />
            </div>
          </div>

          {/* State */}
          <div>
            <label className={labelClass}>State</label>
            <div className="relative">
               <input 
                  type="text"
                  placeholder="Enter State"
                  className={inputClass}
                  value={formData.state || ''} 
                  onChange={(e) => onChange('state', e.target.value)}
               />
            </div>
          </div>

          {/* Pincode */}
          <div>
            <label className={labelClass}>Pincode</label>
            <input 
              type="text" 
              placeholder="Enter Pincode" 
              className={inputClass}
              value={formData.pin_code || ''}
              onChange={(e) => onChange('pin_code', e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded text-[#003C22] focus:ring-[#003C22]" />
            <span className="text-sm text-gray-600">Save details for future orders</span>
          </label>
        </div>
      </div>
    </section>
  );
};

export default DeliveryDetailsForm;