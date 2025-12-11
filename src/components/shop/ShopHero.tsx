// import React from 'react';

// const ShopHero = () => {
//   return (
//     <div className="w-full h-[200px] bg-[#FFF8F0] relative overflow-hidden flex flex-col items-center justify-center font-jakarta">
//        {/* Doodle Background */}
//        <div className="absolute inset-0 z-0">
//           <img 
//             src="/NavBar/Doodle.png" 
//             alt="Shop Hero Doodle" 
//             className="w-full h-full object-cover opacity-100"
//           />
//        </div>
       
//        {/* Content */}
//        <div className="relative z-10 text-center">
//          <h1 className="text-3xl font-bold text-[#013220] mb-2">Shop</h1>
//          <div className="text-sm text-gray-500 flex items-center justify-center gap-2">
//            <span>Home</span>
//            <span className="text-gray-400">{'>'}</span>
//            <span className="text-[#013220] font-medium">Shop</span>
//          </div>
//        </div>
//     </div>
//   );
// };

// export default ShopHero;
// import React from 'react';
// import { ChevronRight } from 'lucide-react';

// interface ShopHeroProps {
//   title?: string;
//   // If true, renders "Home > Shop > [title]"
//   // If false (default), renders "Home > [title]"
//   isSubPage?: boolean; 
// }

// const ShopHero = ({ title = "Shop", isSubPage = false }: ShopHeroProps) => {
//   return (
//     <div className="w-full h-[200px] bg-[#FFF8F0] relative overflow-hidden flex flex-col items-center justify-center font-jakarta">
//        {/* Doodle Background */}
//        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
//           <img 
//             src="/NavBar/Doodle.png" 
//             alt="Hero Doodle" 
//             className="h-[80%] w-auto object-contain opacity-100"
//           />
//        </div>
       
//        {/* Content */}
//        <div className="relative z-10 text-center">
//          <h1 className="text-3xl font-bold text-[#013220] mb-2">{title}</h1>
         
//          <div className="text-sm text-gray-500 flex items-center justify-center gap-2">
//            <span className="hover:text-[#013220] cursor-pointer transition-colors">Home</span>
           
//            <ChevronRight size={14} className="text-gray-400" />
           
//            {/* If it's a sub-page (like Bag), show 'Shop' as a link/crumb */}
//            {isSubPage ? (
//              <>
//                <span className="hover:text-[#013220] cursor-pointer transition-colors">Shop</span>
//                <ChevronRight size={14} className="text-gray-400" />
//                <span className="text-[#013220] font-medium">{title}</span>
//              </>
//            ) : (
//              <span className="text-[#013220] font-medium">{title}</span>
//            )}
           
//          </div>
//        </div>
//     </div>
//   );
// };

// export default ShopHero;
// import React from 'react';
// import { ChevronRight } from 'lucide-react';
// import Link from 'next/link'; // Import Link

// interface ShopHeroProps {
//   title?: string;
//   // If true, renders "Home > Shop > [title]"
//   // If false (default), renders "Home > [title]"
//   isSubPage?: boolean; 
// }

// const ShopHero = ({ title = "Shop", isSubPage = false }: ShopHeroProps) => {
//   return (
//     <div className="w-full h-[200px] bg-[#FFF8F0] relative overflow-hidden flex flex-col items-center justify-center font-jakarta">
//        {/* Doodle Background */}
//        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
//           <img 
//             src="/Hero/Doodle.png" 
//             alt="Hero Doodle" 
//             className="h- full w-full object-contain opacity-100"
//           />
//        </div>
       
//        {/* Content */}
//        <div className="relative z-10 text-center">
//          <h1 className="text-3xl font-bold text-[#013220] mb-2">{title}</h1>
         
//          <div className="text-sm text-gray-500 flex items-center justify-center gap-2">
//            {/* Home Link */}
//            <Link href="/" className="hover:text-[#013220] cursor-pointer transition-colors">
//              Home
//            </Link>
           
//            <ChevronRight size={14} className="text-gray-400" />
           
//            {/* Logic for SubPages (like Bag) */}
//            {isSubPage ? (
//              <>
//                {/* Shop Link - This navigates to the Shop Page */}
//                <Link href="/shop" className="hover:text-[#013220] cursor-pointer transition-colors">
//                  Shop
//                </Link>
               
//                <ChevronRight size={14} className="text-gray-400" />
               
//                {/* Current Page Title (Not clickable) */}
//                <span className="text-[#013220] font-medium">{title}</span>
//              </>
//            ) : (
//              // If on main Shop page, just show title
//              <span className="text-[#013220] font-medium">{title}</span>
//            )}
           
//          </div>
//        </div>
//     </div>
//   );
// };

// export default ShopHero;
// import React from 'react';
// import { ChevronRight } from 'lucide-react';
// import Link from 'next/link'; 

// interface ShopHeroProps {
//   title?: string;
//   isSubPage?: boolean; 
// }

// const ShopHero = ({ title = "Shop", isSubPage = false }: ShopHeroProps) => {
//   return (
//     // Updated: h-[36px] on mobile, md:h-[200px] on desktop
//     <div className="w-full h-full md:h-[200px] bg-[#FFF8F0] relative overflow-hidden flex flex-col items-center justify-center font-jakarta transition-all duration-300">
       
//        {/* Doodle Background */}
//        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
//           <img 
//             src="/Hero/Doodle.png" 
//             alt="Hero Doodle" 
//             className="h-full w-full object-cover opacity-100" // Changed to h-full to fit the new height constraints
//           />
//        </div>
       
//        {/* Content */}
//        <div className="relative z-10 text-center flex flex-row md:flex-col items-center gap-2 md:gap-0">
//          {/* Title: Hidden on mobile if you want just breadcrumbs, or small side-by-side */}
//          {/* Based on 36px height, a stacked layout won't fit. 
//              I will make it a flex-row for mobile to fit "Shop > Home" cleanly or just show breadcrumbs.
//              Standard pattern for 36px height is usually just breadcrumbs or a very small title.
//              I will scale the text down significantly for mobile.
//          */}
         
//          <h1 className="text-sm md:text-3xl font-bold text-[#013220] md:mb-2">{title}</h1>
         
//          {/* Separator for mobile if showing both */}
//          <span className="md:hidden text-gray-400 mx-1">-</span>

//          <div className="text-[10px] md:text-sm text-gray-500 flex items-center justify-center gap-1 md:gap-2">
//            <Link href="/" className="hover:text-[#013220] cursor-pointer transition-colors">
//              Home
//            </Link>
           
//            <ChevronRight size={12} className="text-gray-400 md:w-4 md:h-4" />
           
//            {isSubPage ? (
//              <>
//                <Link href="/shop" className="hover:text-[#013220] cursor-pointer transition-colors">
//                  Shop
//                </Link>
//                <ChevronRight size={12} className="text-gray-400 md:w-4 md:h-4" />
//                <span className="text-[#013220] font-medium">{title}</span>
//              </>
//            ) : (
//              <span className="text-[#013220] font-medium">{title}</span>
//            )}
           
//          </div>
//        </div>
//     </div>
//   );
// };

// export default ShopHero;
// import React from 'react';
// import { ChevronRight } from 'lucide-react';
// import Link from 'next/link'; 

// interface ShopHeroProps {
//   title?: string;
//   isSubPage?: boolean; 
// }

// const ShopHero = ({ title = "Shop", isSubPage = false }: ShopHeroProps) => {
//   return (
//     // UPDATED: Changed h-full to h-[36px] for mobile to ensure stability on direct load
//     <div className="w-full h-[36px] md:h-[200px] bg-[#FFF8F0] relative overflow-hidden flex flex-col items-center justify-center font-jakarta transition-all duration-300">
       
//        {/* Doodle Background */}
//        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
//           <img 
//             src="/Hero/Doodle.png" 
//             alt="Hero Doodle" 
//             className="h-full w-full object-cover opacity-100" 
//           />
//        </div>
       
//        {/* Content */}
//        <div className="relative z-10 text-center flex flex-row md:flex-col items-center gap-2 md:gap-0">
         
//          <h1 className="text-sm md:text-3xl font-bold text-[#013220] md:mb-2">{title}</h1>
         
//          <span className="md:hidden text-gray-400 mx-1">-</span>

//          <div className="text-[10px] md:text-sm text-gray-500 flex items-center justify-center gap-1 md:gap-2">
//            <Link href="/" className="hover:text-[#013220] cursor-pointer transition-colors">
//              Home
//            </Link>
           
//            <ChevronRight size={12} className="text-gray-400 md:w-4 md:h-4" />
           
//            {isSubPage ? (
//              <>
//                <Link href="/shop" className="hover:text-[#013220] cursor-pointer transition-colors">
//                  Shop
//                </Link>
//                <ChevronRight size={12} className="text-gray-400 md:w-4 md:h-4" />
//                <span className="text-[#013220] font-medium">{title}</span>
//              </>
//            ) : (
//              <span className="text-[#013220] font-medium">{title}</span>
//            )}
           
//          </div>
//        </div>
//     </div>
//   );
// };

// export default ShopHero;
import React from 'react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link'; 

interface ShopHeroProps {
  title?: string;
  isSubPage?: boolean; 
}

const ShopHero = ({ title = "Shop", isSubPage = false }: ShopHeroProps) => {
  return (
    // FIXED: Changed 'h-full' to 'h-[36px]' for mobile. 
    // This prevents the hero from stretching vertically when inside a Flex container (like the Bag Page loading screen).
    <div className="w-full h-[36px] md:h-[200px] bg-[#FFF8F0] relative overflow-hidden flex flex-col items-center justify-center font-jakarta transition-all duration-300">
       
       {/* Doodle Background */}
       <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
          <img 
            src="/Hero/Doodle.png" 
            alt="Hero Doodle" 
            className="h-full w-full object-cover opacity-100" 
          />
       </div>
       
       {/* Content */}
       <div className="relative z-10 text-center flex flex-row md:flex-col items-center gap-2 md:gap-0">
         
         <h1 className="text-sm md:text-3xl font-bold text-[#013220] md:mb-2">{title}</h1>
         
         <span className="md:hidden text-gray-400 mx-1">-</span>

         <div className="text-[10px] md:text-sm text-gray-500 flex items-center justify-center gap-1 md:gap-2">
           <Link href="/" className="hover:text-[#013220] cursor-pointer transition-colors">
             Home
           </Link>
           
           <ChevronRight size={12} className="text-gray-400 md:w-4 md:h-4" />
           
           {isSubPage ? (
             <>
               <Link href="/shop" className="hover:text-[#013220] cursor-pointer transition-colors">
                 Shop
               </Link>
               <ChevronRight size={12} className="text-gray-400 md:w-4 md:h-4" />
               <span className="text-[#013220] font-medium">{title}</span>
             </>
           ) : (
             <span className="text-[#013220] font-medium">{title}</span>
           )}
           
         </div>
       </div>
    </div>
  );
};

export default ShopHero;