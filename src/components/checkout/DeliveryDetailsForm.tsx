'use client';

import React from 'react';
import { MapPin } from 'lucide-react';
import { ShippingAddress } from '@/services/checkoutService'; // [!code ++] Import type

interface DeliveryDetailsFormProps {
  address?: ShippingAddress; // [!code ++] Add prop
}

const DeliveryDetailsForm = ({ address }: DeliveryDetailsFormProps) => {
  const inputClass = "w-full h-[46px] border border-[#E0E2E7] rounded-[12px] px-[16px] py-[13px] text-sm text-[#1D1F2C] outline-none focus:border-[#003C22] placeholder:text-gray-400 transition-colors bg-white";
  const labelClass = "block text-sm font-semibold text-[#1D1F2C] mb-2";

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-[#1D1F2C]">Delivery Details</h3>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#003C22] text-white text-xs font-bold rounded-[8px] hover:bg-emerald-900 transition">
          <MapPin size={14} /> Use Current Location
        </button>
      </div>

      <div className="flex flex-col gap-[14px]">
        <div>
          <label className={labelClass}>Address Line 1 (Village/Area)</label>
          <input 
            type="text" 
            placeholder="Enter Address" 
            className={inputClass} 
            defaultValue={address?.village} // [!code ++] Pre-fill
          />
        </div>
        <div>
          <label className={labelClass}>Address Line 2 (Street)</label>
          <input 
            type="text" 
            placeholder="Enter Address" 
            className={inputClass}
            defaultValue={address?.street} // [!code ++] Pre-fill
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[14px]">
          <div>
            <label className={labelClass}>Pincode</label>
            <input 
              type="text" 
              placeholder="Enter Pincode" 
              className={inputClass}
              defaultValue={address?.pin_code || ''} // [!code ++] Pre-fill
            />
          </div>
          <div>
            <label className={labelClass}>City (Taluka)</label>
            <div className="relative">
               {/* Ideally this would be a text input if the API gives a specific city, 
                   or a select if you have a list. Using defaultValue on input for now. */}
               <input 
                  type="text"
                  placeholder="Enter City"
                  className={inputClass}
                  defaultValue={address?.taluka || ''} 
               />
               {/* If sticking with Select: */}
               {/* <select className={`${inputClass} appearance-none bg-white cursor-pointer`}>
                <option>{address?.taluka || 'Select City'}</option>
               </select> 
               */}
            </div>
          </div>
          <div>
            <label className={labelClass}>State</label>
            <div className="relative">
               <input 
                  type="text"
                  placeholder="Enter State"
                  className={inputClass}
                  defaultValue={address?.state || ''} 
               />
            </div>
          </div>
          <div>
            <label className={labelClass}>Country</label>
            <div className="relative">
                <input 
                  type="text"
                  placeholder="Enter Country"
                  className={inputClass}
                  defaultValue="India" // Hardcoded or from API
               />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded text-[#003C22] focus:ring-[#003C22]" />
            <span className="text-sm text-gray-600">Save details for future orders</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded text-[#003C22] focus:ring-[#003C22]" />
              <span className="text-sm text-gray-600">Send me News/Offers updates on my whatsapp</span>
          </label>
        </div>
      </div>
    </section>
  );
};

export default DeliveryDetailsForm;