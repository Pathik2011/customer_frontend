'use client';

import React from 'react';
import { CheckoutUser } from '@/services/checkoutService'; // Import type

interface PersonalDetailsProps {
  orderType: 'pickup' | 'delivery';
  setOrderType: (type: 'pickup' | 'delivery') => void;
  initialData?: CheckoutUser; // [!code ++]
}

const PersonalDetailsForm = ({ orderType, setOrderType, initialData }: PersonalDetailsProps) => {
  const inputClass = "w-full h-[46px] border border-[#E0E2E7] rounded-[12px] px-[16px] py-[13px] text-sm text-[#1D1F2C] outline-none focus:border-[#003C22] placeholder:text-gray-400 transition-colors bg-white";
  const labelClass = "block text-sm font-semibold text-[#1D1F2C] mb-2";

  return (
    <section>
      <h3 className="text-lg font-bold text-[#1D1F2C] mb-6">Personal Details</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[14px]">
        <div>
          <label className={labelClass}>Full Name</label>
          <input 
            type="text" 
            placeholder="Enter Name" 
            className={inputClass} 
            defaultValue={initialData?.full_name} // [!code ++]
          />
        </div>
        <div>
          <label className={labelClass}>Contact Mobile Number</label>
          <div className="flex h-[46px]">
            <div className="w-[60px] bg-[#F3F4F6] border border-[#E0E2E7] border-r-0 rounded-l-[12px] flex items-center justify-center text-sm font-medium text-[#1D1F2C]">+91</div>
            <input 
              type="tel" 
              placeholder="Enter Mobile Number" 
              className={`${inputClass} rounded-l-none`} 
              defaultValue={initialData?.phone?.replace('+91', '').replace('+1', '')} // Simple strip for now
            />
          </div>
        </div>
        <div>
          <label className={labelClass}>Email</label>
          <input 
            type="email" 
            placeholder="Enter Email" 
            className={inputClass} 
            defaultValue={initialData?.email} // [!code ++]
          />
        </div>
        <div>
          <label className={labelClass}>Village/City Name</label>
          <input 
            type="text" 
            placeholder="Enter" 
            className={inputClass} 
            defaultValue={initialData?.village_name} // [!code ++]
          />
        </div>
      </div>

      {/* Order Type Toggle (Unchanged) */}
      <div className="mt-6">
        <label className={labelClass}>Order Type</label>
        <div 
          className="flex items-center bg-white border border-[#E0E2E7] rounded-[12px]"
          style={{
            width: '410px',
            height: '46px',
            padding: '4px',
            gap: '2px',
            maxWidth: '100%',
          }}
        >
          <button 
            onClick={() => setOrderType('pickup')}
            className={`
              flex items-center justify-center text-sm font-semibold transition-all
              ${orderType === 'pickup' 
                ? 'bg-[#003C22] text-white border border-[#003C22]' 
                : 'bg-transparent text-[#4D4D4D] border border-transparent hover:bg-gray-50'}
            `}
            style={{
              width: '200px',
              height: '38px',
              borderRadius: '8px', 
              padding: '8px 12px 10px 12px',
              lineHeight: '100%'
            }}
          >
            Self Pickup
          </button>

          <button 
            onClick={() => setOrderType('delivery')}
            className={`
              flex items-center justify-center text-sm font-semibold transition-all
              ${orderType === 'delivery' 
                ? 'bg-[#003C22] text-white border border-[#003C22]' 
                : 'bg-transparent text-[#4D4D4D] border border-transparent hover:bg-gray-50'}
            `}
            style={{
              width: '200px',
              height: '38px',
              borderRadius: '8px',
              padding: '8px 12px 10px 12px',
              lineHeight: '100%'
            }}
          >
            Delivery
          </button>
        </div>
      </div>
    </section>
  );
};

export default PersonalDetailsForm;