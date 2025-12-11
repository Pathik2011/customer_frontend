// // import React from 'react';
// // import { ChevronRight } from 'lucide-react';

// // interface ProductHeroProps {
// //   productName: string;
// // }

// // const ProductHero = ({ productName }: ProductHeroProps) => {
// //   return (
// //     // Updated height to 68px and centered content
// //     <div className="w-full h-[68px] bg-[#FFF8F0] font-jakarta flex items-center justify-center relative overflow-hidden">
      
// //       {/* Doodle Background */}
// //       <div className="absolute inset-0 z-0 pointer-events-none">
// //         <img 
// //           src="/Hero/Doodle.png" 
// //           alt="Product Hero Doodle" 
// //           className="w-full h-full object-cover opacity-100"
// //         />
// //       </div>

// //       {/* Content */}
// //       <div className="max-w-[1296px] mx-auto px-4 flex items-center gap-2 text-sm text-gray-500 relative z-10">
// //         <span className="hover:text-[#013220] cursor-pointer transition-colors">Home</span>
// //         <ChevronRight size={14} />
// //         <span className="hover:text-[#013220] cursor-pointer transition-colors">Shop</span>
// //         <ChevronRight size={14} />
// //         <span className="text-[#013220] font-semibold truncate">{productName}</span>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProductHero;
// import React from 'react';
// import { ChevronRight } from 'lucide-react';
// import Link from 'next/link'; // Import Link

// interface ProductHeroProps {
//   productName: string;
// }

// const ProductHero = ({ productName }: ProductHeroProps) => {
//   return (
//     // Updated height to 68px and centered content
//     <div className="w-full h-[68px] bg-[#FFF8F0] font-jakarta flex items-center justify-center relative overflow-hidden">
      
//       {/* Doodle Background */}
//       <div className="absolute inset-0 z-0 pointer-events-none">
//         <img 
//           src="/Hero/Doodle.png" 
//           alt="Product Hero Doodle" 
//           className="w-full h-full object-cover opacity-100"
//         />
//       </div>

//       {/* Content */}
//       <div className="max-w-[1296px] mx-auto px-4 flex items-center gap-2 text-sm text-gray-500 relative z-10">
        
//         {/* Home Link */}
//         <Link href="/" className="hover:text-[#013220] cursor-pointer transition-colors">
//           Home
//         </Link>
        
//         <ChevronRight size={14} />
        
//         {/* Shop Link - Navigates to Shop Page */}
//         <Link href="/shop" className="hover:text-[#013220] cursor-pointer transition-colors">
//           Shop
//         </Link>
        
//         <ChevronRight size={14} />
        
//         {/* Current Product Name (Not a link) */}
//         <span className="text-[#013220] font-semibold truncate">{productName}</span>
//       </div>
//     </div>
//   );
// };

// export default ProductHero;

import React from 'react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface ProductHeroProps {
  productName: string;
}

const ProductHero = ({ productName }: ProductHeroProps) => {
  return (
    // Updated: Height is 36px on mobile, 68px on desktop (md+)
    <div className="w-full h-[36px] md:h-[68px] bg-[#FFF8F0] font-jakarta flex items-center justify-center relative overflow-hidden transition-all duration-300">
      
      {/* Doodle Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="/Hero/Doodle.png" 
          alt="Product Hero Doodle" 
          className="w-full h-full object-cover opacity-100"
        />
      </div>

      {/* Content */}
      <div className="max-w-[1296px] mx-auto px-4 flex items-center gap-1 md:gap-2 text-[10px] md:text-sm text-gray-500 relative z-10">
        
        {/* Home Link */}
        <Link href="/" className="hover:text-[#013220] cursor-pointer transition-colors">
          Home
        </Link>
        
        <ChevronRight size={12} className="md:w-[14px] md:h-[14px]" />
        
        {/* Shop Link */}
        <Link href="/shop" className="hover:text-[#013220] cursor-pointer transition-colors">
          Shop
        </Link>
        
        <ChevronRight size={12} className="md:w-[14px] md:h-[14px]" />
        
        {/* Current Product Name */}
        <span className="text-[#013220] font-semibold truncate max-w-[150px] md:max-w-none">
          {productName}
        </span>
      </div>
    </div>
  );
};

export default ProductHero;