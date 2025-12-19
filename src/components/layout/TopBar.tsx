// // import React from 'react';
// // import { Phone } from 'lucide-react';

// // const TopBar = () => {
// //   return (
// //     <div className="w-full bg-emerald-900 h-[38px] flex justify-center relative overflow-hidden">
// //       <div className="w-full max-w-[1600px] h-full relative hidden xl:block">
// //           <div className="absolute left-[84px] top-[10px] w-[472px] h-[18px] flex items-center gap-[10px] text-white text-xs">
// //             <span className="text-yellow-400">✦</span> 
// //             <span>Get 50% Off on your first order | Order now and get it within 30 minutes</span>
// //           </div>
// //           <div className="absolute left-[1266px] top-0 w-[250px] h-[38px] bg-[#FD820B] flex items-center justify-center text-white text-xs font-bold gap-2">
// //              <Phone size={14} className="fill-current" />
// //              <span>Call to Order: +91 70451 12345</span>
// //           </div>
// //       </div>
// //       <div className="w-full h-full flex xl:hidden justify-between px-4 items-center text-xs text-white max-w-[1600px]">
// //           <span className="truncate">Get 50% Off on your first order</span>
// //           <span className="font-bold flex items-center gap-1"><Phone size={12}/> +91 70451 12345</span>
// //       </div>
// //     </div>
// //   );
// // };

// // export default TopBar;
// // import React from 'react';
// // import { Phone } from 'lucide-react';

// // const TopBar = () => {
// //   return (
// //     <div className="w-full bg-emerald-900 text-white relative overflow-hidden font-jakarta transition-all duration-300">
// //       <div className="max-w-[1600px] mx-auto px-4 h-[38px] flex justify-between items-center text-[10px] sm:text-xs">
          
// //           {/* Left: Offer Text */}
// //           <div className="flex items-center gap-2 truncate pr-4">
// //             <span className="text-yellow-400 text-sm">✦</span> 
// //             <span className="truncate">Get 50% Off on your first order <span className="hidden sm:inline">| Order now and get it within 30 minutes</span></span>
// //           </div>

// //           {/* Right: Call to Order */}
// //           <div className="flex items-center gap-2 bg-[#FD820B] h-full px-3 sm:px-4 cursor-pointer hover:bg-orange-600 transition-colors absolute right-0 top-0 bottom-0 font-bold">
// //              <Phone size={14} className="fill-current" />
// //              <span className="hidden sm:inline">Call to Order: +91 9898929874</span>
// //           </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default TopBar;
// 'use client';

// import React from 'react';
// import { Phone } from 'lucide-react';

// const TopBar = () => {
//   return (
//     <div className="w-full bg-emerald-900 text-white relative overflow-hidden font-jakarta transition-all duration-300">
      
//       {/* Custom CSS for the Scrolling Marquee */}
//       <style jsx>{`
//         @keyframes marquee {
//           0% { transform: translateX(100%); }
//           100% { transform: translateX(-100%); }
//         }
//         .animate-marquee {
//           display: inline-block;
//           white-space: nowrap;
//           animation: marquee 15s linear infinite; /* Adjust '15s' to change speed */
//         }
//         /* Disable animation on larger screens (Tablet/Desktop) where text fits */
//         @media (min-width: 640px) { 
//            .animate-marquee {
//               animation: none;
//               transform: none;
//            }
//         }
//       `}</style>

//       <div className="max-w-[1600px] mx-auto h-[38px] flex items-center text-[12px] sm:text-xs">
          
//           {/* Left: Auto-Scrolling Text Section */}
//           <div className="flex-1 overflow-hidden h-full flex items-center pl-4 relative">
//              <div className="animate-marquee sm:flex sm:items-center sm:gap-2">
//                 <span className="text-yellow-400 text-sm inline-block align-middle mr-1">✨</span> 
//                 <span className="font-medium inline-block align-middle">
//                   સપના ફર્ટિલાઇઝર્સમાં સ્વાગત છે! | 🛍️ ઓનલાઇન ઓર્ડર સુવિધા ટૂંક સમયમાં શરૂ થશે
//                 </span>
//              </div>
//           </div>

//           {/* Right: Call to Order Button (Fixed position, stays on top) */}
//           <div className="flex items-center gap-2 bg-[#FD820B] h-full px-3 sm:px-4 cursor-pointer hover:bg-orange-600 transition-colors font-bold shrink-0 z-10">
//              <Phone size={14} className="fill-current" />
//              <span className="hidden sm:inline">ઓર્ડર માટે કૉલ કરો: +91 9898929874</span>
//              <span className="sm:hidden">+91 9898929874</span>
//           </div>

//       </div>
//     </div>
//   );
// };

// export default TopBar;

'use client';

import React, { useState } from 'react';
import { Phone, X } from 'lucide-react';

const TopBar = () => {
  // 1. State to control the visibility of the dialog box
  const [showCallConfirm, setShowCallConfirm] = useState(false);

  const phoneNumber = "+91 9898929874";
  const telLink = "tel:+919898929874"; // The format required for calling

  return (
    <>
      <div className="w-full bg-emerald-900 text-white relative overflow-hidden font-jakarta transition-all duration-300">
        
        {/* CSS for Marquee */}
        <style jsx>{`
          @keyframes marquee {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
          .animate-marquee {
            display: inline-block;
            white-space: nowrap;
            animation: marquee 15s linear infinite;
          }
          @media (min-width: 640px) { 
             .animate-marquee {
               animation: none;
               transform: none;
             }
          }
        `}</style>

        <div className="max-w-[1600px] mx-auto h-[38px] flex items-center text-[12px] sm:text-xs">
            
            {/* Left: Auto-Scrolling Text Section */}
            <div className="flex-1 overflow-hidden h-full flex items-center pl-4 relative">
               <div className="animate-marquee sm:flex sm:items-center sm:gap-2">
                  <span className="text-yellow-400 text-sm inline-block align-middle mr-1">✨</span> 
                  <span className="font-medium inline-block align-middle">
                    સપના ફર્ટિલાઇઝર્સમાં સ્વાગત છે! | 🛍️ ઓનલાઇન ઓર્ડર સુવિધા ટૂંક સમયમાં શરૂ થશે
                  </span>
               </div>
            </div>

            {/* Right: Call Button */}
            {/* 2. Added onClick event to open the dialog */}
            <div 
              onClick={() => setShowCallConfirm(true)}
              className="flex items-center gap-2 bg-[#FD820B] h-full px-3 sm:px-4 cursor-pointer hover:bg-orange-600 transition-colors font-bold shrink-0 z-10"
            >
               <Phone size={14} className="fill-current" />
               <span className="hidden sm:inline">ઓર્ડર માટે કૉલ કરો: {phoneNumber}</span>
               <span className="sm:hidden">{phoneNumber}</span>
            </div>

        </div>
      </div>

      {/* 3. Confirmation Dialog Popup */}
      {showCallConfirm && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden font-jakarta">
            
            {/* Modal Header */}
            <div className="bg-[#003C22] p-4 flex justify-between items-center">
              <h3 className="text-white font-semibold text-lg">Make a Call?</h3>
              <button onClick={() => setShowCallConfirm(false)} className="text-white/80 hover:text-white">
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                 <Phone className="text-[#FD820B]" size={24} />
              </div>
              <p className="text-gray-600 mb-1">Do you want to call:</p>
              <p className="text-xl font-bold text-gray-900 mb-6">{phoneNumber}</p>
              
              <div className="flex gap-3">
                {/* Cancel Button */}
                <button 
                  onClick={() => setShowCallConfirm(false)}
                  className="flex-1 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                
                {/* Call Button (Triggers Native Dialer) */}
                <a 
                  href={telLink}
                  onClick={() => setShowCallConfirm(false)} // Close modal after clicking call
                  className="flex-1 py-2.5 rounded-lg bg-[#FD820B] text-white font-medium hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Phone size={16} className="fill-white" />
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TopBar;