// 'use client';

// import React, { useState } from 'react';

// interface ProductGalleryProps {
//   images: string[];
// }

// const ProductGallery = ({ images }: ProductGalleryProps) => {
//   const [selectedImage, setSelectedImage] = useState(images[0]);

//   return (
//     <div className="flex flex-col-reverse md:flex-row gap-6 h-full font-jakarta">
      
//       {/* Thumbnails Container (Left Side) */}
//       <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto no-scrollbar py-2 md:py-0 md:w-[86px] md:min-w-[86px] flex-shrink-0">
//         {images.map((img, index) => (
//           <div 
//             key={index}
//             onClick={() => setSelectedImage(img)}
//             className={`
//               flex-shrink-0 cursor-pointer 
//               flex items-center justify-center bg-white
//               transition-all duration-200
//               ${selectedImage === img 
//                 ? 'border-[#003C22]' // Selected: Green Border
//                 : 'border-[#E0E2E7] hover:border-[#003C22]/50' // Unselected: Light Gray
//               }
//             `}
//             style={{
//               width: '86px',
//               height: '86px',
//               borderRadius: '12px',
//               borderWidth: '1px',
//               borderStyle: 'solid'
//             }}
//           >
//             {/* Thumbnail Image */}
//             <img 
//               src={img} 
//               alt={`Thumbnail ${index}`} 
//               className="object-contain"
//               style={{
//                 width: '18px',
//                 height: '48px',
//               }} 
//             />
//           </div>
//         ))}
//       </div>

//       {/* Main Image Container (Right Side) */}
//       <div 
//         className="relative bg-[#F9F9F9] flex items-center justify-center overflow-hidden"
//         style={{
//           width: '526px',       // Exact Width
//           height: '526px',      // Exact Height
//           borderRadius: '12px', // Requested Radius
//           border: '1px solid #E0E2E7', // Requested Border
//           opacity: 1,
//           // Top/Left are handled by the parent flex container layout
//         }}
//       >
//         {/* Main Image (Bottle) - Kept previously requested size */}
//         <div 
//           className="relative"
//           style={{
//             width: '80px',
//             height: '208px'
//           }}
//         >
//           <img 
//             src={selectedImage} 
//             alt="Product Main" 
//             className="w-full h-full object-contain mix-blend-multiply"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductGallery;
// 'use client';

// import React, { useState } from 'react';

// interface ProductGalleryProps {
//   images: string[];
// }

// const ProductGallery = ({ images }: ProductGalleryProps) => {
//   const [selectedImage, setSelectedImage] = useState(images[0]);

//   return (
//     <div className="flex flex-col-reverse md:flex-row gap-6 h-full font-jakarta">
      
//       {/* Thumbnails Container (Left Side) */}
//       <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto no-scrollbar py-2 md:py-0 md:w-[86px] md:min-w-[86px] flex-shrink-0">
//         {images.map((img, index) => (
//           <div 
//             key={index}
//             onClick={() => setSelectedImage(img)}
//             className={`
//               flex-shrink-0 cursor-pointer 
//               flex items-center justify-center bg-white
//               transition-all duration-200
//               ${selectedImage === img 
//                 ? 'border-[#003C22]' // Selected: Green Border
//                 : 'border-[#E0E2E7] hover:border-[#003C22]/50' // Unselected: Light Gray
//               }
//             `}
//             style={{
//               width: '86px',
//               height: '86px',
//               borderRadius: '12px',
//               borderWidth: '1px',
//               borderStyle: 'solid'
//             }}
//           >
//             {/* Thumbnail Image */}
//             <img 
//               src={img} 
//               alt={`Thumbnail ${index}`} 
//               className="object-contain"
//               style={{
//                 width: '18px',
//                 height: '48px',
//               }} 
//             />
//           </div>
//         ))}
//       </div>

//       {/* Main Image Container (Right Side) */}
//       <div 
//         className="relative flex items-center justify-center overflow-hidden"
//         style={{
//           width: '526px',       // Exact Width
//           height: '526px',      // Exact Height
//           borderRadius: '12px', // Requested Radius
//           border: '1px solid #E0E2E7', // Requested Border
//           backgroundColor: '#F3F3F5', // UPDATED BACKGROUND
//           opacity: 1,
//         }}
//       >
//         {/* Main Image (Bottle) */}
//         <div 
//           className="relative"
//           style={{
//             width: '80px',
//             height: '208px'
//           }}
//         >
//           <img 
//             src={selectedImage} 
//             alt="Product Main" 
//             className="w-full h-full object-contain mix-blend-multiply"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductGallery;
// 'use client';

// import React, { useState } from 'react';

// interface ProductGalleryProps {
//   images: string[];
// }

// const ProductGallery = ({ images }: ProductGalleryProps) => {
//   const [selectedImage, setSelectedImage] = useState(images[0]);

//   return (
//     <div className="flex flex-col-reverse md:flex-row gap-6 h-full font-jakarta">
      
//       {/* Thumbnails Container (Left Side) */}
//       <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto no-scrollbar py-2 md:py-0 md:w-[86px] md:min-w-[86px] flex-shrink-0">
//         {images.map((img, index) => (
//           <div 
//             key={index}
//             onClick={() => setSelectedImage(img)}
//             className={`
//               flex-shrink-0 cursor-pointer 
//               flex items-center justify-center rounded-xl
//               transition-all duration-200
//               ${selectedImage === img 
//                 ? 'border-[#003C22] bg-[#F3F3F5]' // Selected: Green Border + Grey Background
//                 : 'border-[#E0E2E7] bg-white hover:border-[#003C22]/50' // Unselected: White Background
//               }
//             `}
//             style={{
//               width: '86px',
//               height: '86px',
//               borderRadius: '12px',
//               borderWidth: '1px',
//               borderStyle: 'solid'
//             }}
//           >
//             {/* Thumbnail Image */}
//             <img 
//               src={img} 
//               alt={`Thumbnail ${index}`} 
//               className="object-contain mix-blend-multiply"
//               style={{
//                 width: '18px',
//                 height: '48px',
//               }} 
//             />
//           </div>
//         ))}
//       </div>

//       {/* Main Image Container (Right Side) */}
//       <div 
//         className="relative flex items-center justify-center overflow-hidden"
//         style={{
//           width: '526px',       // Exact Width
//           height: '526px',      // Exact Height
//           borderRadius: '12px', // Requested Radius
//           border: '1px solid #E0E2E7', // Requested Border
//           backgroundColor: '#F3F3F5', // UPDATED BACKGROUND
//           opacity: 1,
//         }}
//       >
//         {/* Main Image (Bottle) */}
//         <div 
//           className="relative"
//           style={{
//             width: '150px',
//             height: '350px'
//           }}
//         >
//           <img 
//             src={selectedImage} 
//             alt="Product Main" 
//             className="w-full h-full object-contain mix-blend-multiply"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductGallery;
'use client';

import React, { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
}

const ProductGallery = ({ images }: ProductGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    // Container: 
    // Mobile: Flex Column Reverse (Main Image Top, Thumbnails Bottom)
    // Desktop: Flex Row (Thumbnails Left, Main Image Right)
    <div className="flex flex-col-reverse md:flex-row gap-2 md:gap-6 h-full font-jakarta items-center md:items-start w-full">
      
      {/* Thumbnails Container */}
      <div className="
        flex gap-3 overflow-x-auto no-scrollbar py-2 
        w-full justify-start md:justify-start
        md:flex-col md:overflow-y-auto md:py-0 md:w-[86px] md:min-w-[86px] 
        flex-shrink-0
      ">
        {images.map((img, index) => (
          <div 
            key={index}
            onClick={() => setSelectedImage(img)}
            className={`
              flex-shrink-0 cursor-pointer 
              flex items-center justify-center rounded-[12px] border border-solid
              transition-all duration-200
              
              /* Mobile Dimensions */
              w-[65px] h-[65px]
              
              /* Desktop Dimensions */
              md:w-[86px] md:h-[86px]

              ${selectedImage === img 
                ? 'border-[#003C22] bg-[#F3F3F5]' 
                : 'border-[#E0E2E7] bg-white hover:border-[#003C22]/50' 
              }
            `}
          >
            {/* Thumbnail Image Content */}
            <img 
              src={img} 
              alt={`Thumbnail ${index}`} 
              className="object-contain mix-blend-multiply"
              style={{
                width: 'auto',
                height: '60%', // Responsive height relative to container
                maxWidth: '80%'
              }} 
            />
          </div>
        ))}
      </div>

      {/* Main Image Container */}
      <div 
        className="
          relative flex items-center justify-center overflow-hidden
          border border-[#E0E2E7] rounded-[12px] bg-[#F3F3F5]
          
          /* Mobile: 393x393 aspect ratio, Top margin 36px */
          w-full max-w-[393px] aspect-square mt-[36px]
          
          /* Desktop: 526x526 fixed size, No top margin */
          md:w-[526px] md:h-[526px] md:max-w-none md:aspect-auto md:mt-0
        "
      >
        {/* Main Image (Bottle) */}
        <div 
          className="relative"
          style={{
            // Using percentages/aspect-ratio for internal image to scale nicely
            width: 'auto',
            height: '70%' 
          }}
        >
          <img 
            src={selectedImage} 
            alt="Product Main" 
            className="w-full h-full object-contain mix-blend-multiply"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;