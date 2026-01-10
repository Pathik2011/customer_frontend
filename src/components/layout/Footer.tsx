
// 'use client';

// import React, { useEffect, useState } from 'react';
// import { ArrowRight, Phone } from 'lucide-react';
// import Link from 'next/link';
// import { fetchFilterOptions } from '@/services/filterService';
// import { FilterApiResponse, Category } from '@/types';

// const Footer = () => {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch Categories similar to NavBar
//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         setLoading(true);
//         const data: FilterApiResponse = await fetchFilterOptions();
//         setCategories(data.categories || []);
//       } catch (error) {
//         console.error("Failed to load footer categories", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadData();
//   }, []);

//   return (
//     <footer className="bg-[#013220] text-white pt-[60px] pb-8 mt-0 relative overflow-hidden font-sans w-full">
//       <div className="max-w-[1600px] mx-auto px-4 xl:px-[84px] relative z-10">
        
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          
//           {/* 1. Brand Info */}
//           <div className="col-span-2 lg:col-span-1 space-y-6">
            
//             {/* Logo Section - Updated with Images */}
//             <div className="flex items-center gap-3">
//                {/* Icon Image */}
//                <img 
//                  src="/Footer/Footer_logo_2.png" 
//                  alt="Sapana Logo Icon" 
//                  className="object-contain"
//                  style={{ 
//                    width: '44px', 
//                    height: '44px',
//                    opacity: 1 
//                  }}
//                />
//                {/* Text Logo Image */}
//                <img 
//                  src="/Footer/Footer_logo_1.png" 
//                  alt="Sapana Fertilizer" 
//                  className="object-contain"
//                  style={{ 
//                    width: '118.53px', 
//                    height: '43.89px',
//                    opacity: 1
//                  }}
//                />
//             </div>
            
//             <p className="text-sm text-gray-200 leading-relaxed max-w-xs">
//               Winter-wise Farming: Curated for Crops, Carefully Chosen for You. 
//             </p>
            
//             <div className="relative max-w-[340px]">
//               <input 
//                 type="text" 
//                 placeholder="Enter phone number for daily updates"
//                 className="w-full h-[48px] pl-5 pr-12 rounded-full text-sm text-gray-800 bg-white focus:outline-none"
//               />
//               <button className="absolute right-1 top-1 h-[40px] w-[40px] bg-[#F4E06D] rounded-full flex items-center justify-center hover:bg-yellow-300 transition-colors">
//                 <ArrowRight size={18} className="text-[#013220]" />
//               </button>
//             </div>
//           </div>

//           {/* 2. Quick Links */}
//           <div className="lg:pl-12">
//             <h3 className="font-bold mb-6 text-lg">Quick Links</h3>
//             <ul className="space-y-4 text-sm text-gray-200">
//               {['Shop', 'About Us', 'Contact Us'].map(link => {
//                 const href = link === 'Shop' ? '/shop' : '#';
//                 return (
//                   <li key={link}>
//                     <Link href={href} className="hover:text-white cursor-pointer transition-colors">
//                       {link}
//                     </Link>
//                   </li>
//                 );
//               })}
//             </ul>
//           </div>

//           {/* 3. Categories (Dynamic) */}
//           <div>
//             <h3 className="font-bold mb-6 text-lg">Categories</h3>
//             <ul className="space-y-4 text-sm text-gray-200">
//               {loading ? (
//                 Array.from({ length: 5 }).map((_, i) => (
//                   <li key={i} className="h-4 w-24 bg-white/10 rounded animate-pulse" />
//                 ))
//               ) : categories.length > 0 ? (
//                 categories.slice(0, 6).map((cat) => (
//                   <li key={cat.category_id}>
//                     <Link 
//                       href={{
//                         pathname: '/shop',
//                         query: { category: cat.category_name }
//                       }}
//                       className="hover:text-white cursor-pointer transition-colors"
//                     >
//                       {cat.category_name}
//                     </Link>
//                   </li>
//                 ))
//               ) : (
//                 <li className="text-gray-400 italic">No categories found</li>
//               )}
//             </ul>
//           </div>

//           {/* 4. Contact Details */}
//           <div className="col-span-2 lg:col-span-1">
//             <h3 className="font-bold mb-6 text-lg">Contact Details</h3>
            
//             {/* [!code changed] Wrapped with <a> tag for "tel:" link */}
//             <a 
//               href="tel:+919898929874" 
//               className="flex items-center gap-4 hover:opacity-90 transition-opacity cursor-pointer w-fit"
//             >
//                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0">
//                  <Phone size={20} className="text-[#013220] fill-current" />
//                </div>
//                <div>
//                  <p className="font-bold text-lg">+91 9898929874</p>
//                  <p className="text-xs text-gray-300">Phone Number</p>
//                </div>
//             </a>
//           </div>

//           {/* Copyright */}
//           <div className="col-span-2 lg:col-span-3 border-t border-white/20 pt-8 mt-8 text-sm text-gray-300 z-20 relative">
//             @2024 Sapana Fertilizers Pvt Ltd
//           </div>

//         </div>
//       </div>

//       {/* Decorative Image */}
//       <div className="absolute right-0 bottom-0 z-0 pointer-events-none">
//         <img 
//           src="/Footer/Decore.png" 
//           alt="Footer Decoration"
//           className="w-[160px] h-auto md:w-[240px] xl:w-[320px] object-contain" 
//         />
//       </div>
//     </footer>
//   );
// };

// export default Footer;

'use client';

import React, { useEffect, useState } from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import Link from 'next/link';
import { fetchFilterOptions } from '@/services/filterService';
import { FilterApiResponse, Category } from '@/types';

const Footer = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  
  // [!code ++] Dynamic Year
  const currentYear = new Date().getFullYear();

  // Fetch Categories similar to NavBar
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data: FilterApiResponse = await fetchFilterOptions();
        setCategories(data.categories || []);
      } catch (error) {
        console.error("Failed to load footer categories", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <footer className="bg-[#013220] text-white pt-[60px] pb-8 mt-0 relative overflow-hidden font-sans w-full">
      <div className="max-w-[1600px] mx-auto px-4 xl:px-[84px] relative z-10">
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* 1. Brand Info */}
          <div className="col-span-2 lg:col-span-1 space-y-6">
            
            {/* Logo Section */}
            <div className="flex items-center gap-3">
               <img 
                 src="/Footer/Footer_logo_2.png" 
                 alt="Sapana Logo Icon" 
                 className="object-contain"
                 style={{ 
                   width: '44px', 
                   height: '44px',
                   opacity: 1 
                 }}
               />
               <img 
                 src="/Footer/Footer_logo_1.png" 
                 alt="Sapana Fertilizer" 
                 className="object-contain"
                 style={{ 
                   width: '118.53px', 
                   height: '43.89px',
                   opacity: 1
                 }}
               />
            </div>
            
            <p className="text-sm text-gray-200 leading-relaxed max-w-xs">
              Winter-wise Farming: Curated for Crops, Carefully Chosen for You. 
            </p>
            
            <div className="relative max-w-[340px]">
              <input 
                type="text" 
                placeholder="Enter phone number for daily updates"
                className="w-full h-[48px] pl-5 pr-12 rounded-full text-sm text-gray-800 bg-white focus:outline-none"
              />
              <button className="absolute right-1 top-1 h-[40px] w-[40px] bg-[#F4E06D] rounded-full flex items-center justify-center hover:bg-yellow-300 transition-colors">
                <ArrowRight size={18} className="text-[#013220]" />
              </button>
            </div>
          </div>

          {/* 2. Quick Links */}
          <div className="lg:pl-12">
            <h3 className="font-bold mb-6 text-lg">Quick Links</h3>
            <ul className="space-y-4 text-sm text-gray-200">
              {['Shop', 'About Us', 'Contact Us'].map(link => {
                const href = link === 'Shop' ? '/shop' : '#';
                return (
                  <li key={link}>
                    <Link href={href} className="hover:text-white cursor-pointer transition-colors">
                      {link}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* 3. Categories (Dynamic) */}
          <div>
            <h3 className="font-bold mb-6 text-lg">Categories</h3>
            <ul className="space-y-4 text-sm text-gray-200">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <li key={i} className="h-4 w-24 bg-white/10 rounded animate-pulse" />
                ))
              ) : categories.length > 0 ? (
                categories.slice(0, 6).map((cat) => (
                  <li key={cat.category_id}>
                    <Link 
                      href={{
                        pathname: '/shop',
                        query: { category: cat.category_name }
                      }}
                      className="hover:text-white cursor-pointer transition-colors"
                    >
                      {cat.category_name}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-gray-400 italic">No categories found</li>
              )}
            </ul>
          </div>

          {/* 4. Contact Details */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="font-bold mb-6 text-lg">Contact Details</h3>
            
            <a 
              href="tel:+919898929874" 
              className="flex items-center gap-4 hover:opacity-90 transition-opacity cursor-pointer w-fit"
            >
               <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0">
                 <Phone size={20} className="text-[#013220] fill-current" />
               </div>
               <div>
                 <p className="font-bold text-lg">+91 9898929874</p>
                 <p className="text-xs text-gray-300">Phone Number</p>
               </div>
            </a>
          </div>

          {/* Copyright */}
          <div className="col-span-2 lg:col-span-3 border-t border-white/20 pt-8 mt-8 text-sm text-gray-300 z-20 relative">
            {/* [!code highlight] Updated Copyright Text */}
            @{currentYear} Sapana Fertilizers. All rights reserved.
          </div>

        </div>
      </div>

      {/* Decorative Image */}
      <div className="absolute right-0 bottom-0 z-0 pointer-events-none">
        <img 
          src="/Footer/Decore.png" 
          alt="Footer Decoration"
          className="w-[160px] h-auto md:w-[240px] xl:w-[320px] object-contain" 
        />
      </div>
    </footer>
  );
};

export default Footer;