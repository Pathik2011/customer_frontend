// 'use client';

// import React, { useState } from 'react';
// import { ChevronDown, ChevronUp } from 'lucide-react';
// import { ProductDetail } from '@/types';

// interface ProductTabsProps {
//   product: ProductDetail;
// }

// const ProductTabs = ({ product }: ProductTabsProps) => {
//   const [activeTab, setActiveTab] = useState<'specification' | 'details' | 'usage'>('details');
  
//   // Separate expand states
//   const [isSpecExpanded, setIsSpecExpanded] = useState(false);
//   const [isUsageExpanded, setIsUsageExpanded] = useState(false);

//   // Extract Data
//   const videoMedia = product.media.find(m => m.purpose === 'HOW_TO_USE' && m.media_type === 'YOUTUBE_LINK');
//   const videoUrl = videoMedia?.url.replace('youtu.be/', 'www.youtube.com/embed/').replace('watch?v=', 'embed/');
  
//   const specs = product.tags.map(tag => ({ title: tag.tag_name, desc: tag.tag_value }));
  
//   const tabs = [
//     { id: 'specification', label: 'Specification' },
//     { id: 'details', label: 'Product Details' },
//     { id: 'usage', label: 'How to Use' },
//   ];

//   return (
//     <div className="w-full mt-12 font-jakarta flex flex-col items-center">
      
//       {/* Tab Headers */}
//       <div 
//         className="flex items-center bg-white border border-[#E0E2E7] rounded-[12px] p-[4px] gap-[2px] mb-8"
//         style={{ width: '612px', height: '44px' }}
//       >
//         {tabs.map((tab) => (
//           <button
//             key={tab.id}
//             onClick={() => setActiveTab(tab.id as any)}
//             className={`
//               flex-1 h-full rounded-[8px] text-sm font-semibold transition-all duration-200 flex items-center justify-center
//               ${activeTab === tab.id ? 'bg-[#013220] text-white' : 'bg-transparent text-[#4D4D4D] hover:bg-gray-50'}
//             `}
//             style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', lineHeight: '100%' }}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       {/* Tab Content Area */}
//       <div 
//         className="relative w-full max-w-[1296px] bg-white border border-[#E0E2E7] rounded-[12px] p-8 md:p-10 animate-in fade-in duration-300"
//         style={{ minHeight: '600px' }}
//       >
        
//         {/* --- PRODUCT DETAILS TAB --- */}
//         {activeTab === 'details' && (
//           <div className="relative w-full h-full">
//             <div className="hidden lg:block absolute bg-[#E0E2E7]" style={{ width: '1px', height: '100%', minHeight: '536px', left: '50%', transform: 'translateX(-50%)', top: '0px' }}></div>
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 text-sm text-gray-600 leading-relaxed">
//               {/* Left Column */}
//               <div className="space-y-8 pr-4">
//                 <div>
//                   <h3 className="font-bold text-[#000000] text-xl mb-3 font-jakarta">{product.product_name}</h3>
//                   <p className="text-[#4D4D4D]">{product.description}</p>
//                 </div>
//                 <div>
//                   <h4 className="font-bold text-[#000000] mb-3 font-jakarta text-base">About {product.brand} {product.product_name}</h4>
//                   <p className="text-[#4D4D4D]">{product.properties?.introduction}</p>
//                 </div>
//                 <div>
//                   <h4 className="font-bold text-[#000000] mb-3 font-jakarta text-base">Technical Details</h4>
//                   <ul className="list-disc list-outside pl-5 space-y-2 marker:text-[#000000] text-[#4D4D4D]">
//                     <li><strong>Technical Name:</strong> {product.product_tech_name}</li>
//                     {product.properties?.mode_of_action_details && <li><strong>Mode of Action:</strong> {product.properties.mode_of_action_details}</li>}
//                   </ul>
//                 </div>
//               </div>
//               {/* Right Column */}
//               <div className="space-y-8 lg:pl-8">
//                 <div>
//                   <h4 className="font-bold text-[#000000] mb-3 font-jakarta text-base">Key Features & Benefits</h4>
//                   <ul className="list-disc list-outside pl-5 space-y-2 marker:text-[#000000] text-[#4D4D4D]">
//                     {product.properties?.features_and_benefits?.map((fb, i) => <li key={i}>{fb}</li>)}
//                   </ul>
//                 </div>
//                 {product.properties?.caution && (
//                   <div>
//                     <h4 className="font-bold text-[#000000] mb-3 font-jakarta text-base">Caution / Additional Info</h4>
//                     <p className="text-[#4D4D4D]">{product.properties.caution}</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* --- SPECIFICATION TAB --- */}
//         {activeTab === 'specification' && (
//            <div className="flex flex-col items-center w-full h-full">
//              <div className="w-full max-w-[1232px] relative">
//                <div className={`overflow-hidden transition-all duration-500 ease-in-out border border-[#E0E2E7] rounded-[12px] ${isSpecExpanded ? 'max-h-[2000px]' : 'max-h-[460px]'}`}>
//                  <table className="w-full border-collapse text-left font-jakarta">
//                    <thead className="bg-[#F9FAFB] sticky top-0 z-10">
//                      <tr>
//                        <th className="py-4 pl-6 font-semibold text-[#101828] text-[15px] border-b border-[#E0E2E7] w-[30%] bg-[#F9FAFB]">Title</th>
//                        <th className="py-4 pl-6 font-semibold text-[#101828] text-[15px] border-b border-[#E0E2E7] bg-[#F9FAFB]">Description</th>
//                      </tr>
//                    </thead>
//                    <tbody>
//                      {specs.map((row, index) => (
//                        <tr key={index} className={`border-b border-[#E0E2E7] last:border-b-0 ${index % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'}`}>
//                          <td className="py-4 pl-6 text-sm text-[#475467] font-medium border-r border-[#E0E2E7]">{row.title}</td>
//                          <td className="py-4 pl-6 text-sm text-[#475467]">{row.desc}</td>
//                        </tr>
//                      ))}
//                    </tbody>
//                  </table>
//                  {!isSpecExpanded && specs.length > 8 && (
//                    <div className="absolute bottom-0 left-0 w-full h-[120px] bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none rounded-b-[12px]" />
//                  )}
//                </div>
//                {specs.length > 8 && (
//                  <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 z-20">
//                     <button 
//                       onClick={() => setIsSpecExpanded(!isSpecExpanded)}
//                       className="w-[40px] h-[40px] bg-[#013220] rounded-full flex items-center justify-center shadow-lg hover:bg-[#024430] transition-all hover:scale-110"
//                     >
//                       {isSpecExpanded ? <ChevronUp size={20} className="text-white" /> : <ChevronDown size={20} className="text-white" />}
//                     </button>
//                  </div>
//                )}
//              </div>
//              <div className="h-[40px]"></div>
//            </div>
//         )}

//         {/* --- HOW TO USE TAB (UPDATED) --- */}
//         {activeTab === 'usage' && (
//           <div className="w-full font-jakarta animate-in fade-in duration-300">
//             <div className="flex flex-col gap-10 items-center">
              
//               {/* 1. Video Section */}
//               {videoUrl && (
//                 <div className="flex flex-col gap-4 w-full max-w-[650px]">
//                   <h3 className="font-bold text-[#013220] text-lg self-start">Video Tutorial</h3>
//                   <div className="relative w-full pt-[56.25%] rounded-xl overflow-hidden border border-[#E0E2E7] bg-black shadow-sm">
//                     <iframe 
//                       className="absolute top-0 left-0 w-full h-full" 
//                       src={videoUrl} 
//                       title="Product Usage Video" 
//                       frameBorder="0" 
//                       allowFullScreen
//                     ></iframe>
//                   </div>
//                 </div>
//               )}

//               {/* 2. Doses Table Section (Collapsible - Updated to 3 Rows Max) */}
//               {product.doses.length > 0 && (
//                 <div className="flex flex-col gap-4 w-full max-w-[1232px] relative pb-10"> {/* Added pb-10 for button space */}
//                   <h3 className="font-bold text-[#013220] text-lg">Dosage & Application</h3>
                  
//                   {/* Table Container */}
//                   <div 
//                      className={`
//                        overflow-hidden transition-all duration-500 ease-in-out border border-[#E0E2E7] rounded-[12px] shadow-sm w-full
//                        ${isUsageExpanded ? 'max-h-[2000px]' : 'max-h-[190px]'} 
//                      `}
//                      // Note: 'max-h-[190px]' fits approximately Header (44px) + 3 Rows (~48px each)
//                   >
//                     <div className="overflow-x-auto">
//                       <table className="w-full text-left text-sm border-collapse min-w-[600px]">
//                         <thead className="bg-[#F9F9F9]">
//                           <tr className="border-b border-[#E0E2E7] h-[44px]">
//                             <th className="p-3 font-semibold text-black border-r border-[#E0E2E7]">Crop</th>
//                             <th className="p-3 font-semibold text-black border-r border-[#E0E2E7]">Target Pest</th>
//                             <th className="p-3 font-semibold text-black border-r border-[#E0E2E7]">Formulation (ml/ha)</th>
//                             <th className="p-3 font-semibold text-black border-r border-[#E0E2E7]">a.i (g/ha)</th>
//                             <th className="p-3 font-semibold text-black border-r border-[#E0E2E7]">Water (L/ha)</th>
//                             <th className="p-3 font-semibold text-black">Waiting (days)</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {product.doses.map((row, idx) => (
//                             <tr key={idx} className="border-b border-[#E0E2E7] last:border-0 hover:bg-gray-50 transition-colors bg-white h-[48px]">
//                               <td className="p-3 text-[#4D4D4D] border-r border-[#E0E2E7] font-medium">{row.crop_name}</td>
//                               <td className="p-3 text-[#4D4D4D] border-r border-[#E0E2E7]">{row.target_pest}</td>
//                               <td className="p-3 text-[#4D4D4D] border-r border-[#E0E2E7]">{row.dosage_formulation_hectare}</td>
//                               <td className="p-3 text-[#4D4D4D] border-r border-[#E0E2E7]">{row.dosage_ai_hectare}</td>
//                               <td className="p-3 text-[#4D4D4D] border-r border-[#E0E2E7]">{row.water_liters_hectare}</td>
//                               <td className="p-3 text-[#4D4D4D]">{row.waiting_period_days}</td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>

//                      {/* Gradient Overlay - Only show when collapsed and has more than 3 rows */}
//                      {!isUsageExpanded && product.doses.length > 3 && (
//                        <div className="absolute bottom-0 left-0 w-full h-[60px] bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none rounded-b-[12px]" />
//                      )}
//                   </div>

//                   {/* Expand/Collapse Button for Doses */}
//                   {product.doses.length > 3 && (
//                     <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 z-20">
//                        <button 
//                          onClick={() => setIsUsageExpanded(!isUsageExpanded)}
//                          className="w-[40px] h-[40px] bg-[#013220] rounded-full flex items-center justify-center shadow-lg hover:bg-[#024430] transition-all hover:scale-110"
//                        >
//                          {isUsageExpanded ? (
//                            <ChevronUp size={20} className="text-white" />
//                          ) : (
//                            <ChevronDown size={20} className="text-white" />
//                          )}
//                        </button>
//                     </div>
//                   )}

//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// };

// export default ProductTabs;



// 'use client';

// import React, { useState } from 'react';
// import { ChevronDown, ChevronUp } from 'lucide-react';
// import { ProductDetail } from '@/types';

// interface ProductTabsProps {
//   product: ProductDetail;
// }

// const ProductTabs = ({ product }: ProductTabsProps) => {
//   const [activeTab, setActiveTab] = useState<'specification' | 'details' | 'usage'>('details');
  
//   // Separate expand states
//   const [isSpecExpanded, setIsSpecExpanded] = useState(false);
//   const [isUsageExpanded, setIsUsageExpanded] = useState(false);

//   // Extract Data
//   const videoMedia = product.media.find(m => m.purpose === 'HOW_TO_USE' && m.media_type === 'YOUTUBE_LINK');
//   const videoUrl = videoMedia?.url.replace('youtu.be/', 'www.youtube.com/embed/').replace('watch?v=', 'embed/');
  
//   const specs = product.tags.map(tag => ({ title: tag.tag_name, desc: tag.tag_value }));
  
//   const tabs = [
//     { id: 'specification', label: 'Specification' },
//     { id: 'details', label: 'Product Details' },
//     { id: 'usage', label: 'How to Use' },
//   ];

//   return (
//     <div className="w-full mt-12 font-jakarta flex flex-col items-center">
      
//       {/* Tab Headers */}
//       <div 
//         className={`
//           bg-white border border-[#E0E2E7] 
//           rounded-[8px] md:rounded-[12px] 
//           p-[4px] gap-[4px] mb-3 md:mb-8
          
//           /* Mobile Layout: Flex Wrap to center the 3rd item on new row */
//           flex flex-wrap justify-center w-full max-w-[369px]
          
//           /* Desktop Flex Layout: Single row */
//           md:flex-nowrap md:w-[612px] md:h-[44px] md:max-w-none md:items-center
//         `}
//       >
//         {tabs.map((tab, index) => (
//           <button
//             key={tab.id}
//             onClick={() => setActiveTab(tab.id as any)}
//             className={`
//               rounded-[8px] text-sm font-semibold transition-all duration-200 flex items-center justify-center
              
//               /* Mobile Dimensions: Width is 50% minus half the gap (2px) to fit perfectly 2 per row */
//               h-[36px] w-[calc(50%-2px)]
              
//               /* Desktop Dimensions: Equal width */
//               md:h-full md:w-auto md:flex-1

//               ${activeTab === tab.id 
//                 ? 'bg-[#013220] text-white' 
//                 : 'bg-[#F3F3F5] text-[#4D4D4D] hover:bg-gray-200'} 
//             `}
//             style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', lineHeight: '100%' }}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       {/* Tab Content Area */}
//       <div 
//         className={`
//           relative w-full bg-white border border-[#E0E2E7] 
//           rounded-[12px] p-6 md:p-10 animate-in fade-in duration-300
          
//           /* Mobile Dimensions: w 369, h 783 (min) */
//           max-w-[369px] min-h-[783px]
          
//           /* Desktop Dimensions */
//           md:max-w-[1296px] md:min-h-[600px]
//         `}
//       >
        
//         {/* --- PRODUCT DETAILS TAB --- */}
//         {activeTab === 'details' && (
//           <div className="relative w-full h-full">
//             <div className="hidden lg:block absolute bg-[#E0E2E7]" style={{ width: '1px', height: '100%', minHeight: '536px', left: '50%', transform: 'translateX(-50%)', top: '0px' }}></div>
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 text-sm text-gray-600 leading-relaxed">
//               {/* Left Column */}
//               <div className="space-y-8 pr-0 lg:pr-4">
//                 <div>
//                   <h3 className="font-bold text-[#000000] text-xl mb-3 font-jakarta">{product.product_name}</h3>
//                   <p className="text-[#4D4D4D]">{product.description}</p>
//                 </div>
//                 <div>
//                   <h4 className="font-bold text-[#000000] mb-3 font-jakarta text-base">About {product.brand} {product.product_name}</h4>
//                   <p className="text-[#4D4D4D]">{product.properties?.introduction}</p>
//                 </div>
//                 <div>
//                   <h4 className="font-bold text-[#000000] mb-3 font-jakarta text-base">Technical Details</h4>
//                   <ul className="list-disc list-outside pl-5 space-y-2 marker:text-[#000000] text-[#4D4D4D]">
//                     <li><strong>Technical Name:</strong> {product.product_tech_name}</li>
//                     {product.properties?.mode_of_action_details && <li><strong>Mode of Action:</strong> {product.properties.mode_of_action_details}</li>}
//                   </ul>
//                 </div>
//               </div>
//               {/* Right Column */}
//               <div className="space-y-8 lg:pl-8">
//                 <div>
//                   <h4 className="font-bold text-[#000000] mb-3 font-jakarta text-base">Key Features & Benefits</h4>
//                   <ul className="list-disc list-outside pl-5 space-y-2 marker:text-[#000000] text-[#4D4D4D]">
//                     {product.properties?.features_and_benefits?.map((fb, i) => <li key={i}>{fb}</li>)}
//                   </ul>
//                 </div>
//                 {product.properties?.caution && (
//                   <div>
//                     <h4 className="font-bold text-[#000000] mb-3 font-jakarta text-base">Caution / Additional Info</h4>
//                     <p className="text-[#4D4D4D]">{product.properties.caution}</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* --- SPECIFICATION TAB --- */}
//         {activeTab === 'specification' && (
//            <div className="flex flex-col items-center w-full h-full">
//              <div className="w-full max-w-[1232px] relative">
//                <div className={`overflow-hidden transition-all duration-500 ease-in-out border border-[#E0E2E7] rounded-[12px] ${isSpecExpanded ? 'max-h-[2000px]' : 'max-h-[460px]'}`}>
//                  <table className="w-full border-collapse text-left font-jakarta">
//                    <thead className="bg-[#F9FAFB] sticky top-0 z-10">
//                      <tr>
//                        <th className="py-4 pl-6 font-semibold text-[#101828] text-[15px] border-b border-[#E0E2E7] w-[30%] bg-[#F9FAFB]">Title</th>
//                        <th className="py-4 pl-6 font-semibold text-[#101828] text-[15px] border-b border-[#E0E2E7] bg-[#F9FAFB]">Description</th>
//                      </tr>
//                    </thead>
//                    <tbody>
//                      {specs.map((row, index) => (
//                        <tr key={index} className={`border-b border-[#E0E2E7] last:border-b-0 ${index % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'}`}>
//                          <td className="py-4 pl-6 text-sm text-[#475467] font-medium border-r border-[#E0E2E7]">{row.title}</td>
//                          <td className="py-4 pl-6 text-sm text-[#475467]">{row.desc}</td>
//                        </tr>
//                      ))}
//                    </tbody>
//                  </table>
//                  {!isSpecExpanded && specs.length > 8 && (
//                    <div className="absolute bottom-0 left-0 w-full h-[120px] bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none rounded-b-[12px]" />
//                  )}
//                </div>
//                {specs.length > 8 && (
//                  <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 z-20">
//                     <button 
//                       onClick={() => setIsSpecExpanded(!isSpecExpanded)}
//                       className="w-[40px] h-[40px] bg-[#013220] rounded-full flex items-center justify-center shadow-lg hover:bg-[#024430] transition-all hover:scale-110"
//                     >
//                       {isSpecExpanded ? <ChevronUp size={20} className="text-white" /> : <ChevronDown size={20} className="text-white" />}
//                     </button>
//                  </div>
//                )}
//              </div>
//              <div className="h-[40px]"></div>
//            </div>
//         )}

//         {/* --- HOW TO USE TAB (UPDATED) --- */}
//         {activeTab === 'usage' && (
//           <div className="w-full font-jakarta animate-in fade-in duration-300">
//             <div className="flex flex-col gap-10 items-center">
              
//               {/* 1. Video Section */}
//               {videoUrl && (
//                 <div className="flex flex-col gap-4 w-full max-w-[650px]">
//                   <h3 className="font-bold text-[#013220] text-lg self-start">Video Tutorial</h3>
//                   <div className="relative w-full pt-[56.25%] rounded-xl overflow-hidden border border-[#E0E2E7] bg-black shadow-sm">
//                     <iframe 
//                       className="absolute top-0 left-0 w-full h-full" 
//                       src={videoUrl} 
//                       title="Product Usage Video" 
//                       frameBorder="0" 
//                       allowFullScreen
//                     ></iframe>
//                   </div>
//                 </div>
//               )}

//               {/* 2. Doses Table Section */}
//               {product.doses.length > 0 && (
//                 <div className="flex flex-col gap-4 w-full max-w-[1232px] relative pb-10"> 
//                   <h3 className="font-bold text-[#013220] text-lg">Dosage & Application</h3>
                  
//                   {/* Table Container */}
//                   <div 
//                      className={`
//                        overflow-hidden transition-all duration-500 ease-in-out border border-[#E0E2E7] rounded-[12px] shadow-sm w-full
//                        ${isUsageExpanded ? 'max-h-[2000px]' : 'max-h-[190px]'} 
//                      `}
//                   >
//                     <div className="overflow-x-auto">
//                       <table className="w-full text-left text-sm border-collapse min-w-[600px]">
//                         <thead className="bg-[#F9F9F9]">
//                           <tr className="border-b border-[#E0E2E7] h-[44px]">
//                             <th className="p-3 font-semibold text-black border-r border-[#E0E2E7]">Crop</th>
//                             <th className="p-3 font-semibold text-black border-r border-[#E0E2E7]">Target Pest</th>
//                             <th className="p-3 font-semibold text-black border-r border-[#E0E2E7]">Formulation (ml/ha)</th>
//                             <th className="p-3 font-semibold text-black border-r border-[#E0E2E7]">a.i (g/ha)</th>
//                             <th className="p-3 font-semibold text-black border-r border-[#E0E2E7]">Water (L/ha)</th>
//                             <th className="p-3 font-semibold text-black">Waiting (days)</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {product.doses.map((row, idx) => (
//                             <tr key={idx} className="border-b border-[#E0E2E7] last:border-0 hover:bg-gray-50 transition-colors bg-white h-[48px]">
//                               <td className="p-3 text-[#4D4D4D] border-r border-[#E0E2E7] font-medium">{row.crop_name}</td>
//                               <td className="p-3 text-[#4D4D4D] border-r border-[#E0E2E7]">{row.target_pest}</td>
//                               <td className="p-3 text-[#4D4D4D] border-r border-[#E0E2E7]">{row.dosage_formulation_hectare}</td>
//                               <td className="p-3 text-[#4D4D4D] border-r border-[#E0E2E7]">{row.dosage_ai_hectare}</td>
//                               <td className="p-3 text-[#4D4D4D] border-r border-[#E0E2E7]">{row.water_liters_hectare}</td>
//                               <td className="p-3 text-[#4D4D4D]">{row.waiting_period_days}</td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>

//                      {!isUsageExpanded && product.doses.length > 3 && (
//                        <div className="absolute bottom-0 left-0 w-full h-[60px] bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none rounded-b-[12px]" />
//                      )}
//                   </div>

//                   {/* Expand/Collapse Button */}
//                   {product.doses.length > 3 && (
//                     <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 z-20">
//                        <button 
//                          onClick={() => setIsUsageExpanded(!isUsageExpanded)}
//                          className="w-[40px] h-[40px] bg-[#013220] rounded-full flex items-center justify-center shadow-lg hover:bg-[#024430] transition-all hover:scale-110"
//                        >
//                          {isUsageExpanded ? (
//                            <ChevronUp size={20} className="text-white" />
//                          ) : (
//                            <ChevronDown size={20} className="text-white" />
//                          )}
//                        </button>
//                     </div>
//                   )}

//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// };

// export default ProductTabs;
// 'use client';

// import React, { useState } from 'react';
// import { ChevronDown, ChevronUp } from 'lucide-react';
// import { ProductDetail } from '@/types';

// interface ProductTabsProps {
//   product: ProductDetail;
// }

// const ProductTabs = ({ product }: ProductTabsProps) => {
//   const [activeTab, setActiveTab] = useState<'specification' | 'details' | 'usage'>('details');
  
//   const [isSpecExpanded, setIsSpecExpanded] = useState(false);
//   const [isUsageExpanded, setIsUsageExpanded] = useState(false);

//   // Extract Data
//   const videoMedia = product.media.find(m => m.purpose === 'HOW_TO_USE' && m.media_type === 'YOUTUBE_LINK');
//   const videoUrl = videoMedia?.url.replace('youtu.be/', 'www.youtube.com/embed/').replace('watch?v=', 'embed/');
//   const hasVideo = !!videoUrl; // [!code ++] Check if video exists

//   // [!code ++] Dynamic configuration based on video presence
//   // If video exists: Show 3 rows (~190px). If NO video: Show 8 rows (~460px) to fill space.
//   const dosesThreshold = hasVideo ? 3 : 8; 
//   const dosesCollapsedHeight = hasVideo ? 'max-h-[190px]' : 'max-h-[460px]';
  
//   const specs = product.tags.map(tag => ({ title: tag.tag_name, desc: tag.tag_value }));
  
//   const tabs = [
//     { id: 'specification', label: 'Specification' },
//     { id: 'details', label: 'Product Details' },
//     { id: 'usage', label: 'How to Use' },
//   ];

//   return (
//     <div className="w-full mt-12 font-jakarta flex flex-col items-center">
      
//       {/* Tab Headers */}
//       <div 
//         className={`
//           bg-white border border-[#E0E2E7] 
//           rounded-[8px] md:rounded-[12px] 
//           p-[4px] gap-[4px] mb-3 md:mb-8
//           flex flex-wrap justify-center w-full max-w-[369px]
//           md:flex-nowrap md:w-[612px] md:h-[44px] md:max-w-none md:items-center
//         `}
//       >
//         {tabs.map((tab, index) => (
//           <button
//             key={tab.id}
//             onClick={() => setActiveTab(tab.id as any)}
//             className={`
//               rounded-[8px] text-sm font-semibold transition-all duration-200 flex items-center justify-center
//               h-[36px] w-[calc(50%-2px)]
//               md:h-full md:w-auto md:flex-1
//               ${activeTab === tab.id 
//                 ? 'bg-[#013220] text-white' 
//                 : 'bg-[#F3F3F5] text-[#4D4D4D] hover:bg-gray-200'} 
//             `}
//             style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', lineHeight: '100%' }}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       {/* Tab Content Area */}
//       <div 
//         className={`
//           relative w-full bg-white border border-[#E0E2E7] 
//           rounded-[12px] p-6 md:p-10 animate-in fade-in duration-300
//           max-w-[369px] min-h-[783px]
//           md:max-w-[1296px] md:min-h-[600px]
//         `}
//       >
        
//         {/* --- PRODUCT DETAILS TAB --- */}
//         {activeTab === 'details' && (
//           <div className="relative w-full h-full">
//             <div className="hidden lg:block absolute bg-[#E0E2E7]" style={{ width: '1px', height: '100%', minHeight: '536px', left: '50%', transform: 'translateX(-50%)', top: '0px' }}></div>
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 text-sm text-gray-600 leading-relaxed">
//               <div className="space-y-8 pr-0 lg:pr-4">
//                 <div>
//                   <h3 className="font-bold text-[#000000] text-xl mb-3 font-jakarta">{product.product_name}</h3>
//                   <p className="text-[#4D4D4D]">{product.description}</p>
//                 </div>
//                 <div>
//                   <h4 className="font-bold text-[#000000] mb-3 font-jakarta text-base">About {product.brand} {product.product_name}</h4>
//                   <p className="text-[#4D4D4D]">{product.properties?.introduction}</p>
//                 </div>
//                 <div>
//                   <h4 className="font-bold text-[#000000] mb-3 font-jakarta text-base">Technical Details</h4>
//                   <ul className="list-disc list-outside pl-5 space-y-2 marker:text-[#000000] text-[#4D4D4D]">
//                     <li><strong>Technical Name:</strong> {product.product_tech_name}</li>
//                     {product.properties?.mode_of_action_details && <li><strong>Mode of Action:</strong> {product.properties.mode_of_action_details}</li>}
//                   </ul>
//                 </div>
//               </div>
//               <div className="space-y-8 lg:pl-8">
//                 <div>
//                   <h4 className="font-bold text-[#000000] mb-3 font-jakarta text-base">Key Features & Benefits</h4>
//                   <ul className="list-disc list-outside pl-5 space-y-2 marker:text-[#000000] text-[#4D4D4D]">
//                     {product.properties?.features_and_benefits?.map((fb, i) => <li key={i}>{fb}</li>)}
//                   </ul>
//                 </div>
//                 {product.properties?.caution && (
//                   <div>
//                     <h4 className="font-bold text-[#000000] mb-3 font-jakarta text-base">Caution / Additional Info</h4>
//                     <p className="text-[#4D4D4D]">{product.properties.caution}</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* --- SPECIFICATION TAB --- */}
//         {activeTab === 'specification' && (
//            <div className="flex flex-col items-center w-full h-full">
//              <div className="w-full max-w-[1232px] relative">
//                <div className={`
//                  overflow-x-auto overflow-y-hidden transition-all duration-500 ease-in-out border border-[#E0E2E7] rounded-[12px]
//                  ${specs.length > 8 
//                     ? (isSpecExpanded ? 'max-h-[2000px]' : 'max-h-[460px]') 
//                     : 'max-h-none'}
//                `}>
//                  <table className="w-full border-collapse text-left font-jakarta min-w-[500px]">
//                    <thead className="bg-[#F9FAFB] sticky top-0 z-10">
//                      <tr>
//                        <th className="py-4 pl-6 font-semibold text-[#101828] text-[15px] border-b border-[#E0E2E7] w-[30%] bg-[#F9FAFB]">Title</th>
//                        <th className="py-4 pl-6 font-semibold text-[#101828] text-[15px] border-b border-[#E0E2E7] bg-[#F9FAFB]">Description</th>
//                      </tr>
//                    </thead>
//                    <tbody>
//                      {specs.map((row, index) => (
//                        <tr key={index} className={`border-b border-[#E0E2E7] last:border-b-0 ${index % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'}`}>
//                          <td className="py-4 pl-6 text-sm text-[#475467] font-medium border-r border-[#E0E2E7]">{row.title}</td>
//                          <td className="py-4 pl-6 text-sm text-[#475467]">{row.desc}</td>
//                        </tr>
//                      ))}
//                    </tbody>
//                  </table>
//                </div>

//                {!isSpecExpanded && specs.length > 8 && (
//                  <div className="absolute bottom-0 left-0 w-full h-[120px] bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none rounded-b-[12px]" />
//                )}

//                {specs.length > 8 && (
//                  <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 z-20">
//                     <button 
//                       onClick={() => setIsSpecExpanded(!isSpecExpanded)}
//                       className="w-[40px] h-[40px] bg-[#013220] rounded-full flex items-center justify-center shadow-lg hover:bg-[#024430] transition-all hover:scale-110"
//                     >
//                       {isSpecExpanded ? <ChevronUp size={20} className="text-white" /> : <ChevronDown size={20} className="text-white" />}
//                     </button>
//                  </div>
//                )}
//              </div>
//              <div className="h-[40px]"></div>
//            </div>
//         )}

//         {/* --- HOW TO USE TAB (UPDATED) --- */}
//         {activeTab === 'usage' && (
//           <div className="w-full font-jakarta animate-in fade-in duration-300">
//             <div className="flex flex-col gap-10 items-center">
              
//               {videoUrl && (
//                 <div className="flex flex-col gap-4 w-full max-w-[650px]">
//                   <h3 className="font-bold text-[#013220] text-lg self-start">Video Tutorial</h3>
//                   <div className="relative w-full pt-[56.25%] rounded-xl overflow-hidden border border-[#E0E2E7] bg-black shadow-sm">
//                     <iframe 
//                       className="absolute top-0 left-0 w-full h-full" 
//                       src={videoUrl} 
//                       title="Product Usage Video" 
//                       frameBorder="0" 
//                       allowFullScreen
//                     ></iframe>
//                   </div>
//                 </div>
//               )}

//               {product.doses.length > 0 && (
//                 <div className="flex flex-col gap-4 w-full max-w-[1232px] relative pb-10"> 
//                   <h3 className="font-bold text-[#013220] text-lg">Dosage & Application</h3>
                  
//                   {/* [!code changed] Use dynamic class based on video presence */}
//                   <div 
//                      className={`
//                        overflow-x-auto overflow-y-hidden transition-all duration-500 ease-in-out border border-[#E0E2E7] rounded-[12px] shadow-sm w-full
//                        ${product.doses.length > dosesThreshold
//                           ? (isUsageExpanded ? 'max-h-[2000px]' : dosesCollapsedHeight) 
//                           : 'max-h-none'}
//                      `}
//                   >
//                     <table className="w-full text-left text-sm border-collapse min-w-[600px]">
//                       <thead className="bg-[#F9F9F9]">
//                         <tr className="border-b border-[#E0E2E7] h-[44px]">
//                           <th className="p-3 font-semibold text-black border-r border-[#E0E2E7]">Crop</th>
//                           <th className="p-3 font-semibold text-black border-r border-[#E0E2E7]">Target Pest</th>
//                           <th className="p-3 font-semibold text-black border-r border-[#E0E2E7]">Formulation (ml/ha)</th>
//                           <th className="p-3 font-semibold text-black border-r border-[#E0E2E7]">a.i (g/ha)</th>
//                           <th className="p-3 font-semibold text-black border-r border-[#E0E2E7]">Water (L/ha)</th>
//                           <th className="p-3 font-semibold text-black">Waiting (days)</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {product.doses.map((row, idx) => (
//                           <tr key={idx} className="border-b border-[#E0E2E7] last:border-0 hover:bg-gray-50 transition-colors bg-white h-[48px]">
//                             <td className="p-3 text-[#4D4D4D] border-r border-[#E0E2E7] font-medium">{row.crop_name}</td>
//                             <td className="p-3 text-[#4D4D4D] border-r border-[#E0E2E7]">{row.target_pest}</td>
//                             <td className="p-3 text-[#4D4D4D] border-r border-[#E0E2E7]">{row.dosage_formulation_hectare}</td>
//                             <td className="p-3 text-[#4D4D4D] border-r border-[#E0E2E7]">{row.dosage_ai_hectare}</td>
//                             <td className="p-3 text-[#4D4D4D] border-r border-[#E0E2E7]">{row.water_liters_hectare}</td>
//                             <td className="p-3 text-[#4D4D4D]">{row.waiting_period_days}</td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>

//                    {/* [!code changed] Dynamic Overlay condition */}
//                    {!isUsageExpanded && product.doses.length > dosesThreshold && (
//                      <div className="absolute bottom-0 left-0 w-full h-[60px] bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none rounded-b-[12px]" />
//                    )}
                   
//                   {/* [!code changed] Dynamic Button condition */}
//                   {product.doses.length > dosesThreshold && (
//                     <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 z-20">
//                        <button 
//                          onClick={() => setIsUsageExpanded(!isUsageExpanded)}
//                          className="w-[40px] h-[40px] bg-[#013220] rounded-full flex items-center justify-center shadow-lg hover:bg-[#024430] transition-all hover:scale-110"
//                        >
//                          {isUsageExpanded ? (
//                            <ChevronUp size={20} className="text-white" />
//                          ) : (
//                            <ChevronDown size={20} className="text-white" />
//                          )}
//                        </button>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// };

// export default ProductTabs;
// 'use client';

// import React, { useState } from 'react';
// import { ChevronDown, ChevronUp } from 'lucide-react';
// import { ProductDetail } from '@/types';

// interface ProductTabsProps {
//   product: ProductDetail;
// }

// const ProductTabs = ({ product }: ProductTabsProps) => {
//   const [activeTab, setActiveTab] = useState<'specification' | 'details' | 'usage'>('details');
  
//   const [isSpecExpanded, setIsSpecExpanded] = useState(false);
//   const [isUsageExpanded, setIsUsageExpanded] = useState(false);

//   // Extract Data
//   const videoMedia = product.media.find(m => m.purpose === 'HOW_TO_USE' && m.media_type === 'YOUTUBE_LINK');
//   const videoUrl = videoMedia?.url.replace('youtu.be/', 'www.youtube.com/embed/').replace('watch?v=', 'embed/');
//   const hasVideo = !!videoUrl;

//   // [!code changed] Use Viewport Height (vh) for dynamic sizing on all screens
//   const dosesThreshold = hasVideo ? 3 : 8; 
//   // If video exists: take ~30% of screen. If no video: take ~60% of screen.
//   const dosesCollapsedHeight = hasVideo ? 'max-h-[30vh]' : 'max-h-[60vh]';
//   // Specification always takes ~60% of screen when collapsed
//   const specCollapsedHeight = 'max-h-[60vh]';
  
//   const specs = product.tags.map(tag => ({ title: tag.tag_name, desc: tag.tag_value }));
  
//   const tabs = [
//     { id: 'specification', label: 'Specification' },
//     { id: 'details', label: 'Product Details' },
//     { id: 'usage', label: 'How to Use' },
//   ];

//   return (
//     <div className="w-full mt-12 font-jakarta flex flex-col items-center">
      
//       {/* Tab Headers */}
//       <div 
//         className={`
//           bg-white border border-[#E0E2E7] 
//           rounded-[8px] md:rounded-[12px] 
//           p-[4px] gap-[4px] mb-3 md:mb-8
//           flex flex-wrap justify-center w-full max-w-[369px]
//           md:flex-nowrap md:w-[612px] md:h-[44px] md:max-w-none md:items-center
//         `}
//       >
//         {tabs.map((tab, index) => (
//           <button
//             key={tab.id}
//             onClick={() => setActiveTab(tab.id as any)}
//             className={`
//               rounded-[8px] text-sm font-semibold transition-all duration-200 flex items-center justify-center
//               h-[36px] w-[calc(50%-2px)]
//               md:h-full md:w-auto md:flex-1
//               ${activeTab === tab.id 
//                 ? 'bg-[#013220] text-white' 
//                 : 'bg-[#F3F3F5] text-[#4D4D4D] hover:bg-gray-200'} 
//             `}
//             style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', lineHeight: '100%' }}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       {/* Tab Content Area */}
//       <div 
//         className={`
//           relative w-full bg-white border border-[#E0E2E7] 
//           rounded-[12px] p-6 md:p-10 animate-in fade-in duration-300
//           max-w-[369px] min-h-[783px]
//           md:max-w-[1296px] md:min-h-[600px]
//         `}
//       >
        
//         {/* --- PRODUCT DETAILS TAB --- */}
//         {activeTab === 'details' && (
//           <div className="relative w-full h-full">
//             <div className="hidden lg:block absolute bg-[#E0E2E7]" style={{ width: '1px', height: '100%', minHeight: '536px', left: '50%', transform: 'translateX(-50%)', top: '0px' }}></div>
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 text-sm text-gray-600 leading-relaxed">
//               <div className="space-y-8 pr-0 lg:pr-4">
//                 <div>
//                   <h3 className="font-bold text-[#000000] text-xl mb-3 font-jakarta">{product.product_name}</h3>
//                   <p className="text-[#4D4D4D]">{product.description}</p>
//                 </div>
//                 <div>
//                   <h4 className="font-bold text-[#000000] mb-3 font-jakarta text-base">About {product.brand} {product.product_name}</h4>
//                   <p className="text-[#4D4D4D]">{product.properties?.introduction}</p>
//                 </div>
//                 <div>
//                   <h4 className="font-bold text-[#000000] mb-3 font-jakarta text-base">Technical Details</h4>
//                   <ul className="list-disc list-outside pl-5 space-y-2 marker:text-[#000000] text-[#4D4D4D]">
//                     <li><strong>Technical Name:</strong> {product.product_tech_name}</li>
//                     {product.properties?.mode_of_action_details && <li><strong>Mode of Action:</strong> {product.properties.mode_of_action_details}</li>}
//                   </ul>
//                 </div>
//               </div>
//               <div className="space-y-8 lg:pl-8">
//                 <div>
//                   <h4 className="font-bold text-[#000000] mb-3 font-jakarta text-base">Key Features & Benefits</h4>
//                   <ul className="list-disc list-outside pl-5 space-y-2 marker:text-[#000000] text-[#4D4D4D]">
//                     {product.properties?.features_and_benefits?.map((fb, i) => <li key={i}>{fb}</li>)}
//                   </ul>
//                 </div>
//                 {product.properties?.caution && (
//                   <div>
//                     <h4 className="font-bold text-[#000000] mb-3 font-jakarta text-base">Caution / Additional Info</h4>
//                     <p className="text-[#4D4D4D]">{product.properties.caution}</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* --- SPECIFICATION TAB --- */}
//         {activeTab === 'specification' && (
//            <div className="flex flex-col items-center w-full h-full">
//              <div className="w-full max-w-[1232px] relative">
               
//                <div className={`
//                  overflow-x-auto overflow-y-hidden transition-all duration-500 ease-in-out border border-[#E0E2E7] rounded-[12px]
//                  ${specs.length > 8 
//                     ? (isSpecExpanded ? 'max-h-[2000px]' : specCollapsedHeight) // [!code changed] Used variable
//                     : 'max-h-none'}
//                `}>
//                  <table className="w-full border-collapse text-left font-jakarta min-w-[500px]">
//                    <thead className="bg-[#F9FAFB] sticky top-0 z-10">
//                      <tr>
//                        <th className="py-4 pl-6 font-semibold text-[#101828] text-[15px] border-b border-[#E0E2E7] w-[30%] bg-[#F9FAFB]">Title</th>
//                        <th className="py-4 pl-6 font-semibold text-[#101828] text-[15px] border-b border-[#E0E2E7] bg-[#F9FAFB]">Description</th>
//                      </tr>
//                    </thead>
//                    <tbody>
//                      {specs.map((row, index) => (
//                        <tr key={index} className={`border-b border-[#E0E2E7] last:border-b-0 ${index % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'}`}>
//                          <td className="py-4 pl-6 text-sm text-[#475467] font-medium border-r border-[#E0E2E7]">{row.title}</td>
//                          <td className="py-4 pl-6 text-sm text-[#475467]">{row.desc}</td>
//                        </tr>
//                      ))}
//                    </tbody>
//                  </table>
//                </div>

//                {!isSpecExpanded && specs.length > 8 && (
//                  <div className="absolute bottom-0 left-0 w-full h-[120px] bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none rounded-b-[12px]" />
//                )}

//                {specs.length > 8 && (
//                  <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 z-20">
//                     <button 
//                       onClick={() => setIsSpecExpanded(!isSpecExpanded)}
//                       className="w-[40px] h-[40px] bg-[#013220] rounded-full flex items-center justify-center shadow-lg hover:bg-[#024430] transition-all hover:scale-110"
//                     >
//                       {isSpecExpanded ? <ChevronUp size={20} className="text-white" /> : <ChevronDown size={20} className="text-white" />}
//                     </button>
//                  </div>
//                )}
//              </div>
//              <div className="h-[40px]"></div>
//            </div>
//         )}

//         {/* --- HOW TO USE TAB --- */}
//         {activeTab === 'usage' && (
//           <div className="w-full font-jakarta animate-in fade-in duration-300">
//             <div className="flex flex-col gap-10 items-center">
              
//               {videoUrl && (
//                 <div className="flex flex-col gap-4 w-full max-w-[650px]">
//                   <h3 className="font-bold text-[#013220] text-lg self-start">Video Tutorial</h3>
//                   <div className="relative w-full pt-[56.25%] rounded-xl overflow-hidden border border-[#E0E2E7] bg-black shadow-sm">
//                     <iframe 
//                       className="absolute top-0 left-0 w-full h-full" 
//                       src={videoUrl} 
//                       title="Product Usage Video" 
//                       frameBorder="0" 
//                       allowFullScreen
//                     ></iframe>
//                   </div>
//                 </div>
//               )}

//               {product.doses.length > 0 && (
//                 <div className="flex flex-col gap-4 w-full max-w-[1232px] relative pb-10"> 
//                   <h3 className="font-bold text-[#013220] text-lg">Dosage & Application</h3>
                  
//                   <div 
//                      className={`
//                        overflow-x-auto overflow-y-hidden transition-all duration-500 ease-in-out border border-[#E0E2E7] rounded-[12px] shadow-sm w-full
//                        ${product.doses.length > dosesThreshold
//                           ? (isUsageExpanded ? 'max-h-[2000px]' : dosesCollapsedHeight) // [!code changed] Used variable
//                           : 'max-h-none'}
//                      `}
//                   >
//                     <table className="w-full text-left text-sm border-collapse min-w-[600px]">
//                       <thead className="bg-[#F9F9F9]">
//                         <tr className="border-b border-[#E0E2E7] h-[44px]">
//                           <th className="p-3 font-semibold text-black border-r border-[#E0E2E7]">Crop</th>
//                           <th className="p-3 font-semibold text-black border-r border-[#E0E2E7]">Target Pest</th>
//                           <th className="p-3 font-semibold text-black border-r border-[#E0E2E7]">Formulation (ml/ha)</th>
//                           <th className="p-3 font-semibold text-black border-r border-[#E0E2E7]">a.i (g/ha)</th>
//                           <th className="p-3 font-semibold text-black border-r border-[#E0E2E7]">Water (L/ha)</th>
//                           <th className="p-3 font-semibold text-black">Waiting (days)</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {product.doses.map((row, idx) => (
//                           <tr key={idx} className="border-b border-[#E0E2E7] last:border-0 hover:bg-gray-50 transition-colors bg-white h-[48px]">
//                             <td className="p-3 text-[#4D4D4D] border-r border-[#E0E2E7] font-medium">{row.crop_name}</td>
//                             <td className="p-3 text-[#4D4D4D] border-r border-[#E0E2E7]">{row.target_pest}</td>
//                             <td className="p-3 text-[#4D4D4D] border-r border-[#E0E2E7]">{row.dosage_formulation_hectare}</td>
//                             <td className="p-3 text-[#4D4D4D] border-r border-[#E0E2E7]">{row.dosage_ai_hectare}</td>
//                             <td className="p-3 text-[#4D4D4D] border-r border-[#E0E2E7]">{row.water_liters_hectare}</td>
//                             <td className="p-3 text-[#4D4D4D]">{row.waiting_period_days}</td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>

//                    {!isUsageExpanded && product.doses.length > dosesThreshold && (
//                      <div className="absolute bottom-0 left-0 w-full h-[60px] bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none rounded-b-[12px]" />
//                    )}
                   
//                   {product.doses.length > dosesThreshold && (
//                     <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 z-20">
//                        <button 
//                          onClick={() => setIsUsageExpanded(!isUsageExpanded)}
//                          className="w-[40px] h-[40px] bg-[#013220] rounded-full flex items-center justify-center shadow-lg hover:bg-[#024430] transition-all hover:scale-110"
//                        >
//                          {isUsageExpanded ? (
//                            <ChevronUp size={20} className="text-white" />
//                          ) : (
//                            <ChevronDown size={20} className="text-white" />
//                          )}
//                        </button>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// };

// export default ProductTabs;
'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { ProductDetail } from '@/types';

interface ProductTabsProps {
  product: ProductDetail;
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const [activeTab, setActiveTab] = useState<'specification' | 'details' | 'usage'>('details');
  const [isSpecExpanded, setIsSpecExpanded] = useState(false);
  const [isUsageExpanded, setIsUsageExpanded] = useState(false);

  // Extract Data
  const videoMedia = product.media.find(m => m.purpose === 'HOW_TO_USE' && m.media_type === 'YOUTUBE_LINK');
  const videoUrl = videoMedia?.url.replace('youtu.be/', 'www.youtube.com/embed/').replace('watch?v=', 'embed/');
  const hasVideo = !!videoUrl;

  const dosesThreshold = hasVideo ? 3 : 8; 
  const dosesCollapsedHeight = hasVideo ? 'max-h-[30vh]' : 'max-h-[60vh]';
  const specCollapsedHeight = 'max-h-[60vh]';
  
  const specs = product.tags.map(tag => ({ title: tag.tag_name, desc: tag.tag_value }));
  
  const tabs = [
    { id: 'specification', label: 'Specification' },
    { id: 'details', label: 'Product Details' },
    { id: 'usage', label: 'How to Use' },
  ];

  // Helper to format property keys into Title Case
  const formatLabel = (key: string) => {
    return key
      .replace(/_/g, ' ') // Replace underscores with spaces
      .replace(/\b\w/g, char => char.toUpperCase()); // Capitalize first letter of each word
  };

  return (
    <div className="w-full mt-12 font-jakarta flex flex-col items-center">
      
      {/* Tab Headers */}
      <div 
        className={`
          bg-white border border-[#E0E2E7] 
          rounded-[8px] md:rounded-[12px] 
          p-[4px] gap-[4px] mb-3 md:mb-8
          flex flex-wrap justify-center w-full max-w-[369px]
          md:flex-nowrap md:w-[612px] md:h-[44px] md:max-w-none md:items-center
        `}
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`
              rounded-[8px] text-sm font-semibold transition-all duration-200 flex items-center justify-center
              h-[36px] w-[calc(50%-2px)]
              md:h-full md:w-auto md:flex-1
              ${activeTab === tab.id 
                ? 'bg-[#013220] text-white' 
                : 'bg-[#F3F3F5] text-[#4D4D4D] hover:bg-gray-200'} 
            `}
            style={{ fontFamily: '"Plus Jakarta Sans", sans-serif', lineHeight: '100%' }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content Area */}
      <div 
        className={`
          relative w-full bg-white border border-[#E0E2E7] 
          rounded-[12px] p-6 md:p-10 animate-in fade-in duration-300
          max-w-[369px] min-h-[783px]
          md:max-w-[1296px] md:min-h-[600px]
        `}
      >
        
        {/* --- PRODUCT DETAILS TAB (DYNAMIC) --- */}
        {activeTab === 'details' && (
          <div className="relative w-full h-full">
            <div className="hidden lg:block absolute bg-[#E0E2E7]" style={{ width: '1px', height: '100%', minHeight: '536px', left: '50%', transform: 'translateX(-50%)', top: '0px' }}></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 text-sm text-gray-600 leading-relaxed">
              
              {/* Left Column (Standard Info + Even Index Properties) */}
              <div className="space-y-8 pr-0 lg:pr-4">
                
                {/* 1. Basic Product Name & Desc */}
                <div>
                  <h3 className="font-bold text-[#000000] text-xl mb-3 font-jakarta">{product.product_name}</h3>
                  <p className="text-[#4D4D4D]">{product.description}</p>
                </div>

                {/* 2. Technical Name */}
                <div>
                  <h4 className="font-bold text-[#000000] mb-3 font-jakarta text-base">Technical Details</h4>
                  <p className="text-[#4D4D4D]"><strong>Technical Name:</strong> {product.product_tech_name}</p>
                </div>

                {/* 3. Dynamic Properties (Even Indices) */}
                {product.properties && Object.entries(product.properties).map(([key, value], index) => {
                  if (index % 2 !== 0) return null; // Skip odd indices (rendered in right col)
                  
                  return (
                    <div key={key}>
                      <h4 className="font-bold text-[#000000] mb-3 font-jakarta text-base">{formatLabel(key)}</h4>
                      {Array.isArray(value) ? (
                        <ul className="list-disc list-outside pl-5 space-y-2 marker:text-[#000000] text-[#4D4D4D]">
                          {value.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                      ) : (
                        <p className="text-[#4D4D4D]">{value}</p>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Right Column (Odd Index Properties) */}
              <div className="space-y-8 lg:pl-8">
                
                {/* Dynamic Properties (Odd Indices) */}
                {product.properties && Object.entries(product.properties).map(([key, value], index) => {
                  if (index % 2 === 0) return null; // Skip even indices (rendered in left col)

                  return (
                    <div key={key}>
                      <h4 className="font-bold text-[#000000] mb-3 font-jakarta text-base">{formatLabel(key)}</h4>
                      {Array.isArray(value) ? (
                        <ul className="list-disc list-outside pl-5 space-y-2 marker:text-[#000000] text-[#4D4D4D]">
                          {value.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                      ) : (
                        <p className="text-[#4D4D4D]">{value}</p>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        )}

        {/* --- SPECIFICATION TAB --- */}
        {activeTab === 'specification' && (
           <div className="flex flex-col items-center w-full h-full">
             <div className="w-full max-w-[1232px] relative">
               
               <div className={`
                 overflow-x-auto overflow-y-hidden transition-all duration-500 ease-in-out border border-[#E0E2E7] rounded-[12px]
                 ${specs.length > 8 
                    ? (isSpecExpanded ? 'max-h-[2000px]' : specCollapsedHeight) 
                    : 'max-h-none'}
               `}>
                 <table className="w-full border-collapse text-left font-jakarta min-w-[500px]">
                   <thead className="bg-[#F9FAFB] sticky top-0 z-10">
                     <tr>
                       <th className="py-4 pl-6 font-semibold text-[#101828] text-[15px] border-b border-[#E0E2E7] w-[30%] bg-[#F9FAFB]">Title</th>
                       <th className="py-4 pl-6 font-semibold text-[#101828] text-[15px] border-b border-[#E0E2E7] bg-[#F9FAFB]">Description</th>
                     </tr>
                   </thead>
                   <tbody>
                     {specs.map((row, index) => (
                       <tr key={index} className={`border-b border-[#E0E2E7] last:border-b-0 ${index % 2 === 0 ? 'bg-white' : 'bg-[#F9FAFB]'}`}>
                         <td className="py-4 pl-6 text-sm text-[#475467] font-medium border-r border-[#E0E2E7]">{row.title}</td>
                         <td className="py-4 pl-6 text-sm text-[#475467]">{row.desc}</td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>

               {!isSpecExpanded && specs.length > 8 && (
                 <div className="absolute bottom-0 left-0 w-full h-[120px] bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none rounded-b-[12px]" />
               )}

               {specs.length > 8 && (
                 <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 z-20">
                    <button 
                      onClick={() => setIsSpecExpanded(!isSpecExpanded)}
                      className="w-[40px] h-[40px] bg-[#013220] rounded-full flex items-center justify-center shadow-lg hover:bg-[#024430] transition-all hover:scale-110"
                    >
                      {isSpecExpanded ? <ChevronUp size={20} className="text-white" /> : <ChevronDown size={20} className="text-white" />}
                    </button>
                 </div>
               )}
             </div>
             <div className="h-[40px]"></div>
           </div>
        )}

        {/* --- HOW TO USE TAB --- */}
        {activeTab === 'usage' && (
          <div className="w-full font-jakarta animate-in fade-in duration-300">
            <div className="flex flex-col gap-10 items-center">
              
              {videoUrl && (
                <div className="flex flex-col gap-4 w-full max-w-[650px]">
                  <h3 className="font-bold text-[#013220] text-lg self-start">Video Tutorial</h3>
                  <div className="relative w-full pt-[56.25%] rounded-xl overflow-hidden border border-[#E0E2E7] bg-black shadow-sm">
                    <iframe 
                      className="absolute top-0 left-0 w-full h-full" 
                      src={videoUrl} 
                      title="Product Usage Video" 
                      frameBorder="0" 
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}

              {product.doses.length > 0 && (
                <div className="flex flex-col gap-4 w-full max-w-[1232px] relative pb-10"> 
                  <h3 className="font-bold text-[#013220] text-lg">Dosage & Application</h3>
                  
                  <div 
                     className={`
                       overflow-x-auto overflow-y-hidden transition-all duration-500 ease-in-out border border-[#E0E2E7] rounded-[12px] shadow-sm w-full
                       ${product.doses.length > dosesThreshold
                          ? (isUsageExpanded ? 'max-h-[2000px]' : dosesCollapsedHeight) 
                          : 'max-h-none'}
                     `}
                  >
                    <table className="w-full text-left text-sm border-collapse min-w-[600px]">
                      <thead className="bg-[#F9F9F9]">
                        <tr className="border-b border-[#E0E2E7] h-[44px]">
                          <th className="p-3 font-semibold text-black border-r border-[#E0E2E7]">Crop</th>
                          <th className="p-3 font-semibold text-black border-r border-[#E0E2E7]">Target Pest</th>
                          <th className="p-3 font-semibold text-black border-r border-[#E0E2E7]">Formulation (ml/ha)</th>
                          <th className="p-3 font-semibold text-black border-r border-[#E0E2E7]">a.i (g/ha)</th>
                          <th className="p-3 font-semibold text-black border-r border-[#E0E2E7]">Water (L/ha)</th>
                          <th className="p-3 font-semibold text-black">Waiting (days)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {product.doses.map((row, idx) => (
                          <tr key={idx} className="border-b border-[#E0E2E7] last:border-0 hover:bg-gray-50 transition-colors bg-white h-[48px]">
                            <td className="p-3 text-[#4D4D4D] border-r border-[#E0E2E7] font-medium">{row.crop_name}</td>
                            <td className="p-3 text-[#4D4D4D] border-r border-[#E0E2E7]">{row.target_pest}</td>
                            <td className="p-3 text-[#4D4D4D] border-r border-[#E0E2E7]">{row.dosage_formulation_hectare}</td>
                            <td className="p-3 text-[#4D4D4D] border-r border-[#E0E2E7]">{row.dosage_ai_hectare}</td>
                            <td className="p-3 text-[#4D4D4D] border-r border-[#E0E2E7]">{row.water_liters_hectare}</td>
                            <td className="p-3 text-[#4D4D4D]">{row.waiting_period_days}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                   {!isUsageExpanded && product.doses.length > dosesThreshold && (
                     <div className="absolute bottom-0 left-0 w-full h-[60px] bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none rounded-b-[12px]" />
                   )}
                   
                  {product.doses.length > dosesThreshold && (
                    <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 z-20">
                       <button 
                         onClick={() => setIsUsageExpanded(!isUsageExpanded)}
                         className="w-[40px] h-[40px] bg-[#013220] rounded-full flex items-center justify-center shadow-lg hover:bg-[#024430] transition-all hover:scale-110"
                       >
                         {isUsageExpanded ? (
                           <ChevronUp size={20} className="text-white" />
                         ) : (
                           <ChevronDown size={20} className="text-white" />
                         )}
                       </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProductTabs;