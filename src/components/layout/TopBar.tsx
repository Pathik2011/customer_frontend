// import React from 'react';
// import { Phone } from 'lucide-react';

// const TopBar = () => {
//   return (
//     <div className="w-full bg-emerald-900 h-[38px] flex justify-center relative overflow-hidden">
//       <div className="w-full max-w-[1600px] h-full relative hidden xl:block">
//           <div className="absolute left-[84px] top-[10px] w-[472px] h-[18px] flex items-center gap-[10px] text-white text-xs">
//             <span className="text-yellow-400">✦</span> 
//             <span>Get 50% Off on your first order | Order now and get it within 30 minutes</span>
//           </div>
//           <div className="absolute left-[1266px] top-0 w-[250px] h-[38px] bg-[#FD820B] flex items-center justify-center text-white text-xs font-bold gap-2">
//              <Phone size={14} className="fill-current" />
//              <span>Call to Order: +91 70451 12345</span>
//           </div>
//       </div>
//       <div className="w-full h-full flex xl:hidden justify-between px-4 items-center text-xs text-white max-w-[1600px]">
//           <span className="truncate">Get 50% Off on your first order</span>
//           <span className="font-bold flex items-center gap-1"><Phone size={12}/> +91 70451 12345</span>
//       </div>
//     </div>
//   );
// };

// export default TopBar;
// import React from 'react';
// import { Phone } from 'lucide-react';

// const TopBar = () => {
//   return (
//     <div className="w-full bg-emerald-900 text-white relative overflow-hidden font-jakarta transition-all duration-300">
//       <div className="max-w-[1600px] mx-auto px-4 h-[38px] flex justify-between items-center text-[10px] sm:text-xs">
          
//           {/* Left: Offer Text */}
//           <div className="flex items-center gap-2 truncate pr-4">
//             <span className="text-yellow-400 text-sm">✦</span> 
//             <span className="truncate">Get 50% Off on your first order <span className="hidden sm:inline">| Order now and get it within 30 minutes</span></span>
//           </div>

//           {/* Right: Call to Order */}
//           <div className="flex items-center gap-2 bg-[#FD820B] h-full px-3 sm:px-4 cursor-pointer hover:bg-orange-600 transition-colors absolute right-0 top-0 bottom-0 font-bold">
//              <Phone size={14} className="fill-current" />
//              <span className="hidden sm:inline">Call to Order: +91 9898929874</span>
//           </div>
//       </div>
//     </div>
//   );
// };

// export default TopBar;
'use client';

import React from 'react';
import { Phone } from 'lucide-react';

const TopBar = () => {
  return (
    <div className="w-full bg-emerald-900 text-white relative overflow-hidden font-jakarta transition-all duration-300">
      
      {/* Custom CSS for the Scrolling Marquee */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          display: inline-block;
          white-space: nowrap;
          animation: marquee 15s linear infinite; /* Adjust '15s' to change speed */
        }
        /* Disable animation on larger screens (Tablet/Desktop) where text fits */
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

          {/* Right: Call to Order Button (Fixed position, stays on top) */}
          <div className="flex items-center gap-2 bg-[#FD820B] h-full px-3 sm:px-4 cursor-pointer hover:bg-orange-600 transition-colors font-bold shrink-0 z-10">
             <Phone size={14} className="fill-current" />
             <span className="hidden sm:inline">ઓર્ડર માટે કૉલ કરો: +91 9898929874</span>
             <span className="sm:hidden">+91 9898929874</span>
          </div>

      </div>
    </div>
  );
};

export default TopBar;