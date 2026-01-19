// 'use client';

// import React from 'react';
// import { CheckoutUser } from '@/services/checkoutService'; // Import type

// interface PersonalDetailsProps {
//   orderType: 'pickup' | 'delivery';
//   setOrderType: (type: 'pickup' | 'delivery') => void;
//   initialData?: CheckoutUser; // [!code ++]
// }

// const PersonalDetailsForm = ({ orderType, setOrderType, initialData }: PersonalDetailsProps) => {
//   const inputClass = "w-full h-[46px] border border-[#E0E2E7] rounded-[12px] px-[16px] py-[13px] text-sm text-[#1D1F2C] outline-none focus:border-[#003C22] placeholder:text-gray-400 transition-colors bg-white";
//   const labelClass = "block text-sm font-semibold text-[#1D1F2C] mb-2";

//   return (
//     <section>
//       <h3 className="text-lg font-bold text-[#1D1F2C] mb-6">Personal Details</h3>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-[14px]">
//         <div>
//           <label className={labelClass}>Full Name</label>
//           <input 
//             type="text" 
//             placeholder="Enter Name" 
//             className={inputClass} 
//             defaultValue={initialData?.full_name} // [!code ++]
//           />
//         </div>
//         <div>
//           <label className={labelClass}>Contact Mobile Number</label>
//           <div className="flex h-[46px]">
//             <div className="w-[60px] bg-[#F3F4F6] border border-[#E0E2E7] border-r-0 rounded-l-[12px] flex items-center justify-center text-sm font-medium text-[#1D1F2C]">+91</div>
//             <input 
//               type="tel" 
//               placeholder="Enter Mobile Number" 
//               className={`${inputClass} rounded-l-none`} 
//               defaultValue={initialData?.phone?.replace('+91', '').replace('+1', '')} // Simple strip for now
//             />
//           </div>
//         </div>
//         <div>
//           <label className={labelClass}>Email</label>
//           <input 
//             type="email" 
//             placeholder="Enter Email" 
//             className={inputClass} 
//             defaultValue={initialData?.email} // [!code ++]
//           />
//         </div>
//         <div>
//           <label className={labelClass}>Village/City Name</label>
//           <input 
//             type="text" 
//             placeholder="Enter" 
//             className={inputClass} 
//             defaultValue={initialData?.village_name} // [!code ++]
//           />
//         </div>
//       </div>

//       {/* Order Type Toggle (Unchanged) */}
//       <div className="mt-6">
//         <label className={labelClass}>Order Type</label>
//         <div 
//           className="flex items-center bg-white border border-[#E0E2E7] rounded-[12px]"
//           style={{
//             width: '410px',
//             height: '46px',
//             padding: '4px',
//             gap: '2px',
//             maxWidth: '100%',
//           }}
//         >
//           <button 
//             onClick={() => setOrderType('pickup')}
//             className={`
//               flex items-center justify-center text-sm font-semibold transition-all
//               ${orderType === 'pickup' 
//                 ? 'bg-[#003C22] text-white border border-[#003C22]' 
//                 : 'bg-transparent text-[#4D4D4D] border border-transparent hover:bg-gray-50'}
//             `}
//             style={{
//               width: '200px',
//               height: '38px',
//               borderRadius: '8px', 
//               padding: '8px 12px 10px 12px',
//               lineHeight: '100%'
//             }}
//           >
//             Self Pickup
//           </button>

//           <button 
//             onClick={() => setOrderType('delivery')}
//             className={`
//               flex items-center justify-center text-sm font-semibold transition-all
//               ${orderType === 'delivery' 
//                 ? 'bg-[#003C22] text-white border border-[#003C22]' 
//                 : 'bg-transparent text-[#4D4D4D] border border-transparent hover:bg-gray-50'}
//             `}
//             style={{
//               width: '200px',
//               height: '38px',
//               borderRadius: '8px',
//               padding: '8px 12px 10px 12px',
//               lineHeight: '100%'
//             }}
//           >
//             Delivery
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default PersonalDetailsForm;
'use client';

import React from 'react';
import { User, Phone, MapPin } from 'lucide-react';

interface PersonalDetailsFormProps {
  orderType: 'pickup' | 'delivery';
  setOrderType: (type: 'pickup' | 'delivery') => void;
  
  // [!code highlight] Interface now matches parent
  formData: {
    full_name: string;
    phone: string;
    village_name: string;
  };
  onChange: (field: string, value: string) => void;
}

const PersonalDetailsForm = ({ 
  orderType, 
  setOrderType, 
  formData,   // [!code highlight] Received from parent
  onChange    // [!code highlight] Received from parent
}: PersonalDetailsFormProps) => {

  const inputClass = "w-full h-[46px] border border-[#E0E2E7] rounded-[12px] px-[16px] py-[13px] text-sm text-[#1D1F2C] outline-none focus:border-[#003C22] placeholder:text-gray-400 transition-colors bg-white";
  const labelClass = "block text-sm font-semibold text-[#1D1F2C] mb-2";

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[20px] font-bold text-[#1D1F2C]">Personal Details</h2>
        
        {/* Toggle Switch */}
        <div className="flex bg-[#F3F3F5] p-1 rounded-[12px]">
          <button
            onClick={() => setOrderType('pickup')}
            className={`px-4 py-2 rounded-[8px] text-sm font-semibold transition-all ${
              orderType === 'pickup' ? 'bg-white shadow-sm text-[#003C22]' : 'text-gray-500'
            }`}
          >
            Pickup
          </button>
          <button
            onClick={() => setOrderType('delivery')}
            className={`px-4 py-2 rounded-[8px] text-sm font-semibold transition-all ${
              orderType === 'delivery' ? 'bg-white shadow-sm text-[#003C22]' : 'text-gray-500'
            }`}
          >
            Delivery
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div>
          <label className={labelClass}>Full Name <span className="text-red-500">*</span></label>
          <div className="relative">
            <User size={18} className="absolute left-4 top-[14px] text-gray-400" />
            <input 
              type="text" 
              placeholder="Enter your name" 
              className={`${inputClass} pl-11`}
              value={formData.full_name} // [!code highlight] Bind to state
              onChange={(e) => onChange('full_name', e.target.value)}
            />
          </div>
        </div>

        {/* Phone Number */}
        <div>
          <label className={labelClass}>Phone Number <span className="text-red-500">*</span></label>
          <div className="relative">
            <Phone size={18} className="absolute left-4 top-[14px] text-gray-400" />
            <input 
              type="tel" 
              placeholder="Enter phone number" 
              className={`${inputClass} pl-11`}
              value={formData.phone} // [!code highlight] Bind to state
              onChange={(e) => onChange('phone', e.target.value)}
            />
          </div>
        </div>

        {/* Village Name */}
        <div className="md:col-span-2">
          <label className={labelClass}>Village Name <span className="text-red-500">*</span></label>
          <div className="relative">
            <MapPin size={18} className="absolute left-4 top-[14px] text-gray-400" />
            <input 
              type="text" 
              placeholder="Enter village name" 
              className={`${inputClass} pl-11`}
              value={formData.village_name} // [!code highlight] Bind to state
              onChange={(e) => onChange('village_name', e.target.value)}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalDetailsForm;