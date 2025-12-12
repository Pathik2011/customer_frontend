
// // 'use client';

// // import React, { useState, useEffect } from 'react';
// // import { Search, ShoppingBag, User, ChevronDown, Menu, X, ChevronRight } from 'lucide-react';
// // import Link from 'next/link';
// // import { fetchFilterOptions } from '@/services/filterService'; 
// // import { FilterApiResponse } from '@/types';
// // import { useCart } from '@/context/CartContext'; 
// // import LoginPopup from '@/components/auth/LoginPopup';
// // import { getCurrentUser } from 'aws-amplify/auth';
// // import { Hub } from 'aws-amplify/utils'; // [!code ++] 1. Import Hub

// // const Header = () => {
// //   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
// //   const [isLoginOpen, setIsLoginOpen] = useState(false);
  
// //   const [navData, setNavData] = useState<FilterApiResponse | null>(null);
// //   const [expandedItem, setExpandedItem] = useState<string | null>(null);
  
// //   const { cartCount } = useCart(); 
// //   const [animate, setAnimate] = useState(false);

// //   // [!code ++] 2. Updated Auth Logic with Event Listener
// //   useEffect(() => {
// //     const checkAuthUser = async () => {
// //       try {
// //         const user = await getCurrentUser();
// //         console.log("✅ User Details:", user);
// //         console.log("🆔 Cognito ID:", user.userId);
// //       } catch (error) {
// //         // It's okay if this fails initially
// //         console.log("⚪ No user session found yet.");
// //       }
// //     };

// //     // Run immediately (in case user is already logged in from before)
// //     checkAuthUser();

// //     // Listen for the 'signedIn' event (fires immediately AFTER redirect finishes)
// //     const hubListener = Hub.listen('auth', ({ payload }) => {
// //       if (payload.event === 'signedIn') {
// //         console.log("🔔 Login detected! Fetching ID...");
// //         checkAuthUser();
// //       }
// //     });

// //     return () => hubListener(); // Cleanup listener
// //   }, []);

// //   useEffect(() => {
// //     if (cartCount > 0) {
// //       setAnimate(true);
// //       const timer = setTimeout(() => setAnimate(false), 300); 
// //       return () => clearTimeout(timer);
// //     }
// //   }, [cartCount]);

// //   useEffect(() => {
// //     const loadData = async () => {
// //       try {
// //         const result = await fetchFilterOptions();
// //         setNavData(result);
// //       } catch (error) {
// //         console.error("Failed to load mobile nav data", error);
// //       }
// //     };
// //     loadData();
// //   }, []);

// //   const toggleAccordion = (label: string) => {
// //     setExpandedItem(expandedItem === label ? null : label);
// //   };

// //   useEffect(() => {
// //     if (isMobileMenuOpen) {
// //       document.body.style.overflow = 'hidden';
// //     } else {
// //       if(!isLoginOpen) document.body.style.overflow = 'unset';
// //     }
// //   }, [isMobileMenuOpen, isLoginOpen]);

// //   const getCategory = (name: string) => navData?.categories.find(c => c.category_name === name);
  
// //   const mobileMenuItems = [
// //     { label: 'Pesticides', data: getCategory('Pesticides')?.sub_categories },
// //     { label: 'Fertilizers', data: getCategory('Fertilizers')?.sub_categories },
// //     { label: 'Seeds', data: getCategory('Seeds')?.sub_categories },
// //     { label: 'Brands', data: navData?.brands },
// //     { label: 'Crops', data: navData?.crops },
// //   ];

// //   const handleLoginClick = (e: React.MouseEvent) => {
// //     e.preventDefault(); 
// //     setIsLoginOpen(true);
// //   };

// //   return (
// //     <>
// //     <LoginPopup isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} /> 

// //     <div className="w-full bg-white border-b border-gray-100 font-jakarta relative z-50">
// //         <div className="max-w-[1600px] mx-auto px-4 py-3 lg:py-0 lg:h-[98px] flex flex-col lg:block relative">
            
// //             <div className="flex justify-between items-center h-[44px] lg:h-full lg:static">
                
// //                 <Link href="/" className="flex items-center gap-2 cursor-pointer lg:absolute lg:left-[84px] lg:top-[27px] shrink-0 z-20">
// //                     <div className="w-[163px] h-[44px] relative hidden lg:block">
// //                       <img src="/Logo.png" alt="Sapana Fertilizer" className="w-full h-full object-contain"/>
// //                     </div>
// //                     <div className="w-[120px] h-[36px] relative lg:hidden">
// //                       <img src="/Logo.png" alt="Sapana Fertilizer" className="w-full h-full object-contain"/>
// //                     </div>
// //                 </Link>

// //                 <div className="hidden lg:block flex-1 mx-6 lg:mx-0 lg:absolute lg:left-[50%] lg:-translate-x-1/2 lg:top-[26px] lg:w-[40%] lg:max-w-[470px] lg:h-[46px] z-10">
// //                     <div className="relative w-full h-full">
// //                       <input type="text" placeholder="Search your product..." className="w-full h-[40px] lg:h-full bg-gray-100 rounded-[40px] border border-gray-200 px-6 pl-12 text-sm outline-none focus:ring-1 focus:ring-emerald-600 transition-shadow" />
// //                       <Search className="w-4 h-4 absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
// //                     </div>
// //                 </div>

// //                 <div className="flex items-center gap-2 sm:gap-4 lg:absolute lg:right-[84px] lg:top-[31px] shrink-0 z-20">
// //                     <button className="hidden sm:flex items-center justify-between gap-2 border border-gray-300 rounded-full px-3 py-1.5 text-xs lg:text-sm font-medium text-emerald-900 hover:bg-gray-50 transition-colors lg:w-[97px] lg:h-[36px] lg:rounded-[12px]">English <ChevronDown size={14} /></button>
                    
// //                     <button 
// //                       type="button"
// //                       onClick={handleLoginClick}
// //                       className="flex items-center gap-1 text-emerald-900 hover:text-emerald-700 transition-colors"
// //                     >
// //                       <div className="p-2 bg-gray-100 rounded-full lg:bg-transparent lg:p-0">
// //                         <User size={20} className="lg:w-[18px] lg:h-[18px]" />
// //                       </div>
// //                       <span className="hidden lg:inline text-sm font-medium">Login</span>
// //                     </button>
                    
// //                     <Link href="/bag" className="flex items-center gap-1 text-emerald-900 hover:text-emerald-700 transition-colors relative group">
// //                         <div className={`
// //                           p-2 bg-gray-100 rounded-full lg:bg-transparent lg:p-0 relative transition-transform duration-300
// //                           ${animate ? 'scale-125' : 'scale-100'} 
// //                         `}>
// //                             <ShoppingBag size={20} className="lg:w-[18px] lg:h-[18px]" />
                            
// //                             {cartCount > 0 && (
// //                               <span className="
// //                                 absolute -top-1 -right-1 lg:-top-2 lg:-right-2
// //                                 flex items-center justify-center
// //                                 min-w-[18px] h-[18px] px-1
// //                                 bg-[#FD820B] text-white text-[10px] font-bold
// //                                 rounded-full border-2 border-white
// //                                 shadow-sm pointer-events-none
// //                               ">
// //                                 {cartCount > 99 ? '99+' : cartCount}
// //                               </span>
// //                             )}
// //                         </div>
// //                         <span className="hidden lg:inline text-sm font-medium">Bag</span>
// //                     </Link>

// //                     <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 bg-gray-100 rounded-full text-emerald-900 hover:bg-gray-200 transition-colors"><Menu size={20} /></button>
// //                 </div>
// //             </div>

// //             <div className="mt-3 lg:hidden relative w-full">
// //                 <input type="text" placeholder="Search product..." className="w-full h-[44px] bg-gray-100 rounded-full border border-gray-200 px-4 pl-10 text-sm outline-none focus:ring-1 focus:ring-emerald-600" />
// //                 <Search className="w-4 h-4 absolute left-3.5 top-[14px] text-gray-400" />
// //             </div>
// //         </div>
// //     </div>

// //     <div className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 lg:hidden ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={() => setIsMobileMenuOpen(false)} />
// //     <div className={`fixed top-0 right-0 h-full w-[85%] max-w-[320px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 lg:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
// //        <div className="p-4 flex justify-between items-center border-b border-gray-100">
// //           <span className="font-bold text-lg text-emerald-900">Menu</span>
// //           <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-full"><X size={24} className="text-gray-600"/></button>
// //        </div>
// //        <div className="p-4 overflow-y-auto h-[calc(100%-60px)]">
// //           <ul className="space-y-2">
// //              {mobileMenuItems.map((item) => (
// //                <li key={item.label} className="border-b border-gray-50 last:border-0">
// //                  <button onClick={() => toggleAccordion(item.label)} className="w-full flex items-center justify-between py-3 text-base font-medium text-gray-800 hover:text-emerald-700">
// //                    {item.label} <ChevronRight size={16} className={`text-gray-400 transition-transform duration-200 ${expandedItem === item.label ? 'rotate-90' : ''}`} />
// //                  </button>
// //                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedItem === item.label ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
// //                    <ul className="pl-4 pb-2 space-y-2 bg-gray-50/50 rounded-lg mb-2">
// //                      {item.data && item.data.length > 0 ? (
// //                        item.data.map((subItem: any) => (
// //                          <li key={subItem.category_id || subItem.brand_id || subItem.crop_id}>
// //                            <Link href="#" className="block py-2 text-sm text-gray-600 hover:text-emerald-600">
// //                              {subItem.category_name || subItem.brand_name || subItem.crop_name}
// //                            </Link>
// //                          </li>
// //                        ))
// //                      ) : <li className="py-2 text-sm text-gray-400 italic">No items found</li>}
// //                    </ul>
// //                  </div>
// //                </li>
// //              ))}
// //           </ul>
// //           <div className="mt-8 pt-8 border-t border-gray-100">
// //             <button 
// //               type="button" 
// //               onClick={() => { setIsMobileMenuOpen(false); setIsLoginOpen(true); }} 
// //               className="w-full bg-emerald-900 text-white py-3 rounded-xl font-bold mb-4 hover:bg-emerald-800 transition-colors"
// //             >
// //               Login / Sign Up
// //             </button>
// //             <p className="text-center text-sm text-gray-500">Need Help? +91 70451 12345</p>
// //           </div>
// //        </div>
// //     </div>
// //     </>
// //   );
// // };

// // export default Header;
// 'use client';

// import React, { useState, useEffect } from 'react';
// import { Search, ShoppingBag, User, ChevronDown, Menu, X, ChevronRight, LogOut } from 'lucide-react';
// import Link from 'next/link';
// import { fetchFilterOptions } from '@/services/filterService'; 
// import { FilterApiResponse } from '@/types';
// import { useCart } from '@/context/CartContext'; 
// import { useAuth } from '@/context/AuthContext'; 
// import LoginPopup from '@/components/auth/LoginPopup'; // [!code ++] Import Popup

// const Header = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isLoginOpen, setIsLoginOpen] = useState(false); // [!code ++] State for Popup
  
//   const [navData, setNavData] = useState<FilterApiResponse | null>(null);
//   const [expandedItem, setExpandedItem] = useState<string | null>(null);
//   const [animate, setAnimate] = useState(false);

//   const { cartCount } = useCart(); 
//   const { isAuthenticated, logout } = useAuth(); 

//   // ... (Keep existing useEffects for Cart, Data Load, Scroll Lock) ...
//   useEffect(() => {
//     if (cartCount > 0) {
//       setAnimate(true);
//       const timer = setTimeout(() => setAnimate(false), 300); 
//       return () => clearTimeout(timer);
//     }
//   }, [cartCount]);

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const result = await fetchFilterOptions();
//         setNavData(result);
//       } catch (error) {
//         console.error("Failed to load mobile nav data", error);
//       }
//     };
//     loadData();
//   }, []);

//   // [!code changed] Scroll lock checks both Mobile Menu AND Login Popup
//   useEffect(() => {
//     if (isMobileMenuOpen || isLoginOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
//   }, [isMobileMenuOpen, isLoginOpen]);

//   const toggleAccordion = (label: string) => {
//     setExpandedItem(expandedItem === label ? null : label);
//   };

//   const getCategory = (name: string) => navData?.categories.find(c => c.category_name === name);
  
//   const mobileMenuItems = [
//     { label: 'Pesticides', data: getCategory('Pesticides')?.sub_categories },
//     { label: 'Fertilizers', data: getCategory('Fertilizers')?.sub_categories },
//     { label: 'Seeds', data: getCategory('Seeds')?.sub_categories },
//     { label: 'Brands', data: navData?.brands },
//     { label: 'Crops', data: navData?.crops },
//   ];

//   return (
//     <>
//     {/* [!code ++] Render Popup */}
//     <LoginPopup isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} /> 

//     <div className="w-full bg-white border-b border-gray-100 font-jakarta relative z-50">
//         <div className="max-w-[1600px] mx-auto px-4 py-3 lg:py-0 lg:h-[98px] flex flex-col lg:block relative">
            
//             <div className="flex justify-between items-center h-[44px] lg:h-full lg:static">
                
//                 <Link href="/" className="flex items-center gap-2 cursor-pointer lg:absolute lg:left-[84px] lg:top-[27px] shrink-0 z-20">
//                     <div className="w-[163px] h-[44px] relative hidden lg:block">
//                       <img src="/Logo.png" alt="Sapana Fertilizer" className="w-full h-full object-contain"/>
//                     </div>
//                     <div className="w-[120px] h-[36px] relative lg:hidden">
//                       <img src="/Logo.png" alt="Sapana Fertilizer" className="w-full h-full object-contain"/>
//                     </div>
//                 </Link>

//                 <div className="hidden lg:block flex-1 mx-6 lg:mx-0 lg:absolute lg:left-[50%] lg:-translate-x-1/2 lg:top-[26px] lg:w-[40%] lg:max-w-[470px] lg:h-[46px] z-10">
//                     <div className="relative w-full h-full">
//                       <input type="text" placeholder="Search your product..." className="w-full h-[40px] lg:h-full bg-gray-100 rounded-[40px] border border-gray-200 px-6 pl-12 text-sm outline-none focus:ring-1 focus:ring-emerald-600 transition-shadow" />
//                       <Search className="w-4 h-4 absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
//                     </div>
//                 </div>

//                 <div className="flex items-center gap-2 sm:gap-4 lg:absolute lg:right-[84px] lg:top-[31px] shrink-0 z-20">
//                     <button className="hidden sm:flex items-center justify-between gap-2 border border-gray-300 rounded-full px-3 py-1.5 text-xs lg:text-sm font-medium text-emerald-900 hover:bg-gray-50 transition-colors lg:w-[97px] lg:h-[36px] lg:rounded-[12px]">English <ChevronDown size={14} /></button>
                    
//                     {isAuthenticated ? (
//                       <button 
//                         onClick={logout}
//                         className="flex items-center gap-1 text-red-600 hover:text-red-700 transition-colors"
//                       >
//                         <div className="p-2 bg-red-50 rounded-full lg:bg-transparent lg:p-0">
//                           <LogOut size={20} className="lg:w-[18px] lg:h-[18px]" />
//                         </div>
//                         <span className="hidden lg:inline text-sm font-medium">Logout</span>
//                       </button>
//                     ) : (
//                       <button 
//                         type="button"
//                         onClick={() => setIsLoginOpen(true)} // [!code highlight] Open Popup
//                         className="flex items-center gap-1 text-emerald-900 hover:text-emerald-700 transition-colors"
//                       >
//                         <div className="p-2 bg-gray-100 rounded-full lg:bg-transparent lg:p-0">
//                           <User size={20} className="lg:w-[18px] lg:h-[18px]" />
//                         </div>
//                         <span className="hidden lg:inline text-sm font-medium">Login</span>
//                       </button>
//                     )}
                    
//                     <Link href="/bag" className="flex items-center gap-1 text-emerald-900 hover:text-emerald-700 transition-colors relative group">
//                         <div className={`p-2 bg-gray-100 rounded-full lg:bg-transparent lg:p-0 relative transition-transform duration-300 ${animate ? 'scale-125' : 'scale-100'}`}>
//                             <ShoppingBag size={20} className="lg:w-[18px] lg:h-[18px]" />
//                             {cartCount > 0 && (
//                               <span className="absolute -top-1 -right-1 lg:-top-2 lg:-right-2 flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-[#FD820B] text-white text-[10px] font-bold rounded-full border-2 border-white shadow-sm pointer-events-none">
//                                 {cartCount > 99 ? '99+' : cartCount}
//                               </span>
//                             )}
//                         </div>
//                         <span className="hidden lg:inline text-sm font-medium">Bag</span>
//                     </Link>

//                     <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 bg-gray-100 rounded-full text-emerald-900 hover:bg-gray-200 transition-colors"><Menu size={20} /></button>
//                 </div>
//             </div>

//             <div className="mt-3 lg:hidden relative w-full">
//                 <input type="text" placeholder="Search product..." className="w-full h-[44px] bg-gray-100 rounded-full border border-gray-200 px-4 pl-10 text-sm outline-none focus:ring-1 focus:ring-emerald-600" />
//                 <Search className="w-4 h-4 absolute left-3.5 top-[14px] text-gray-400" />
//             </div>
//         </div>
//     </div>

//     {/* Mobile Drawer (Keep as is, just ensure login button opens popup) */}
//     <div className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 lg:hidden ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={() => setIsMobileMenuOpen(false)} />
//     <div className={`fixed top-0 right-0 h-full w-[85%] max-w-[320px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 lg:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
//        <div className="p-4 flex justify-between items-center border-b border-gray-100">
//           <span className="font-bold text-lg text-emerald-900">Menu</span>
//           <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-full"><X size={24} className="text-gray-600"/></button>
//        </div>
//        <div className="p-4 overflow-y-auto h-[calc(100%-60px)]">
//           <ul className="space-y-2">
//              {mobileMenuItems.map((item) => (
//                <li key={item.label} className="border-b border-gray-50 last:border-0">
//                  <button onClick={() => toggleAccordion(item.label)} className="w-full flex items-center justify-between py-3 text-base font-medium text-gray-800 hover:text-emerald-700">
//                    {item.label} <ChevronRight size={16} className={`text-gray-400 transition-transform duration-200 ${expandedItem === item.label ? 'rotate-90' : ''}`} />
//                  </button>
//                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedItem === item.label ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
//                    <ul className="pl-4 pb-2 space-y-2 bg-gray-50/50 rounded-lg mb-2">
//                      {item.data && item.data.length > 0 ? (
//                        item.data.map((subItem: any) => (
//                          <li key={subItem.category_id || subItem.brand_id || subItem.crop_id}>
//                            <Link href="#" className="block py-2 text-sm text-gray-600 hover:text-emerald-600">
//                              {subItem.category_name || subItem.brand_name || subItem.crop_name}
//                            </Link>
//                          </li>
//                        ))
//                      ) : <li className="py-2 text-sm text-gray-400 italic">No items found</li>}
//                    </ul>
//                  </div>
//                </li>
//              ))}
//           </ul>

//           <div className="mt-8 pt-8 border-t border-gray-100">
//             {isAuthenticated ? (
//                <button 
//                  onClick={() => { setIsMobileMenuOpen(false); logout(); }} 
//                  className="w-full bg-red-50 text-red-600 border border-red-200 py-3 rounded-xl font-bold mb-4 hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
//                >
//                  <LogOut size={18} /> Logout
//                </button>
//             ) : (
//                <button 
//                  type="button" 
//                  // [!code highlight] Open Popup on Mobile
//                  onClick={() => { setIsMobileMenuOpen(false); setIsLoginOpen(true); }} 
//                  className="w-full bg-emerald-900 text-white py-3 rounded-xl font-bold mb-4 hover:bg-emerald-800 transition-colors"
//                >
//                  Login / Sign Up
//                </button>
//             )}
//             <p className="text-center text-sm text-gray-500">Need Help? +91 9898929874</p>
//           </div>
//        </div>
//     </div>
//     </>
//   );
// };

// export default Header;
'use client';

import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, User, ChevronDown, Menu, X, ChevronRight, LogOut } from 'lucide-react';
import Link from 'next/link';
import { fetchFilterOptions } from '@/services/filterService'; 
import { FilterApiResponse } from '@/types';
import { useCart } from '@/context/CartContext'; 
import { useAuth } from '@/context/AuthContext'; 
import LoginPopup from '@/components/auth/LoginPopup';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  
  const [navData, setNavData] = useState<FilterApiResponse | null>(null);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [animate, setAnimate] = useState(false);

  const { cartCount } = useCart(); 
  const { isAuthenticated, logout } = useAuth(); 

  // --- Cart Animation ---
  useEffect(() => {
    if (cartCount > 0) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 300); 
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  // --- Fetch Menu Data ---
  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchFilterOptions();
        setNavData(result);
      } catch (error) {
        console.error("Failed to load mobile nav data", error);
      }
    };
    loadData();
  }, []);

  // --- Scroll Lock ---
  useEffect(() => {
    if (isMobileMenuOpen || isLoginOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen, isLoginOpen]);

  const toggleAccordion = (label: string) => {
    setExpandedItem(expandedItem === label ? null : label);
  };

  const getCategory = (name: string) => navData?.categories.find(c => c.category_name === name);
  
  // [!code highlight] Updated Structure: Added 'type' field to match NavBar logic
  const mobileMenuItems = [
    { label: 'Pesticides', type: 'category', data: getCategory('Pesticides')?.sub_categories },
    { label: 'Fertilizers', type: 'category', data: getCategory('Fertilizers')?.sub_categories },
    { label: 'Seeds', type: 'category', data: getCategory('Seeds')?.sub_categories },
    { label: 'Brands', type: 'brand', data: navData?.brands },
    { label: 'Crops', type: 'crop', data: navData?.crops },
  ];

  return (
    <>
    <LoginPopup isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} /> 

    {/* --- DESKTOP HEADER (Unchanged) --- */}
    <div className="w-full bg-white border-b border-gray-100 font-jakarta relative z-50">
        <div className="max-w-[1600px] mx-auto px-4 py-3 lg:py-0 lg:h-[98px] flex flex-col lg:block relative">
            
            <div className="flex justify-between items-center h-[44px] lg:h-full lg:static">
                
                <Link href="/" className="flex items-center gap-2 cursor-pointer lg:absolute lg:left-[84px] lg:top-[27px] shrink-0 z-20">
                    <div className="w-[163px] h-[44px] relative hidden lg:block">
                      <img src="/Logo.png" alt="Sapana Fertilizer" className="w-full h-full object-contain"/>
                    </div>
                    <div className="w-[120px] h-[36px] relative lg:hidden">
                      <img src="/Logo.png" alt="Sapana Fertilizer" className="w-full h-full object-contain"/>
                    </div>
                </Link>

                <div className="hidden lg:block flex-1 mx-6 lg:mx-0 lg:absolute lg:left-[50%] lg:-translate-x-1/2 lg:top-[26px] lg:w-[40%] lg:max-w-[470px] lg:h-[46px] z-10">
                    <div className="relative w-full h-full">
                      <input type="text" placeholder="Search your product..." className="w-full h-[40px] lg:h-full bg-gray-100 rounded-[40px] border border-gray-200 px-6 pl-12 text-sm outline-none focus:ring-1 focus:ring-emerald-600 transition-shadow" />
                      <Search className="w-4 h-4 absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-4 lg:absolute lg:right-[84px] lg:top-[31px] shrink-0 z-20">
                    <button className="hidden sm:flex items-center justify-between gap-2 border border-gray-300 rounded-full px-3 py-1.5 text-xs lg:text-sm font-medium text-emerald-900 hover:bg-gray-50 transition-colors lg:w-[97px] lg:h-[36px] lg:rounded-[12px]">English <ChevronDown size={14} /></button>
                    
                    {isAuthenticated ? (
                      <button 
                        onClick={logout}
                        className="flex items-center gap-1 text-red-600 hover:text-red-700 transition-colors"
                      >
                        <div className="p-2 bg-red-50 rounded-full lg:bg-transparent lg:p-0">
                          <LogOut size={20} className="lg:w-[18px] lg:h-[18px]" />
                        </div>
                        <span className="hidden lg:inline text-sm font-medium">Logout</span>
                      </button>
                    ) : (
                      <button 
                        type="button"
                        onClick={() => setIsLoginOpen(true)}
                        className="flex items-center gap-1 text-emerald-900 hover:text-emerald-700 transition-colors"
                      >
                        <div className="p-2 bg-gray-100 rounded-full lg:bg-transparent lg:p-0">
                          <User size={20} className="lg:w-[18px] lg:h-[18px]" />
                        </div>
                        <span className="hidden lg:inline text-sm font-medium">Login</span>
                      </button>
                    )}
                    
                    <Link href="/bag" className="flex items-center gap-1 text-emerald-900 hover:text-emerald-700 transition-colors relative group">
                        <div className={`p-2 bg-gray-100 rounded-full lg:bg-transparent lg:p-0 relative transition-transform duration-300 ${animate ? 'scale-125' : 'scale-100'}`}>
                            <ShoppingBag size={20} className="lg:w-[18px] lg:h-[18px]" />
                            {cartCount > 0 && (
                              <span className="absolute -top-1 -right-1 lg:-top-2 lg:-right-2 flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-[#FD820B] text-white text-[10px] font-bold rounded-full border-2 border-white shadow-sm pointer-events-none">
                                {cartCount > 99 ? '99+' : cartCount}
                              </span>
                            )}
                        </div>
                        <span className="hidden lg:inline text-sm font-medium">Bag</span>
                    </Link>

                    <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 bg-gray-100 rounded-full text-emerald-900 hover:bg-gray-200 transition-colors"><Menu size={20} /></button>
                </div>
            </div>

            <div className="mt-3 lg:hidden relative w-full">
                <input type="text" placeholder="Search product..." className="w-full h-[44px] bg-gray-100 rounded-full border border-gray-200 px-4 pl-10 text-sm outline-none focus:ring-1 focus:ring-emerald-600" />
                <Search className="w-4 h-4 absolute left-3.5 top-[14px] text-gray-400" />
            </div>
        </div>
    </div>

    {/* --- MOBILE DRAWER (Fixed) --- */}
    <div className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 lg:hidden ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={() => setIsMobileMenuOpen(false)} />
    <div className={`fixed top-0 right-0 h-full w-[85%] max-w-[320px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 lg:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
       <div className="p-4 flex justify-between items-center border-b border-gray-100">
          <span className="font-bold text-lg text-emerald-900">Menu</span>
          <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-full"><X size={24} className="text-gray-600"/></button>
       </div>
       
       <div className="p-4 overflow-y-auto h-[calc(100%-60px)]">
          <ul className="space-y-2">
             {mobileMenuItems.map((item) => (
               <li key={item.label} className="border-b border-gray-50 last:border-0">
                 <button onClick={() => toggleAccordion(item.label)} className="w-full flex items-center justify-between py-3 text-base font-medium text-gray-800 hover:text-emerald-700">
                   {item.label} <ChevronRight size={16} className={`text-gray-400 transition-transform duration-200 ${expandedItem === item.label ? 'rotate-90' : ''}`} />
                 </button>
                 
                 <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedItem === item.label ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                   <ul className="pl-4 pb-2 space-y-2 bg-gray-50/50 rounded-lg mb-2">
                     {item.data && item.data.length > 0 ? (
                       item.data.map((subItem: any) => {
                         // [!code highlight] Extract correct name based on type
                         const itemName = subItem.category_name || subItem.brand_name || subItem.crop_name;
                         
                         return (
                           <li key={subItem.category_id || subItem.brand_id || subItem.crop_id}>
                             <Link 
                               // [!code highlight] Dynamic Link Construction: /shop?type=value
                               href={{
                                 pathname: '/shop',
                                 query: { [item.type]: itemName } // uses 'category', 'brand', or 'crop'
                               }}
                               onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
                               className="block py-2 text-sm text-gray-600 hover:text-emerald-600"
                             >
                               {itemName}
                             </Link>
                           </li>
                         );
                       })
                     ) : <li className="py-2 text-sm text-gray-400 italic">No items found</li>}
                   </ul>
                 </div>
               </li>
             ))}
          </ul>

          <div className="mt-8 pt-8 border-t border-gray-100">
            {isAuthenticated ? (
               <button 
                 onClick={() => { setIsMobileMenuOpen(false); logout(); }} 
                 className="w-full bg-red-50 text-red-600 border border-red-200 py-3 rounded-xl font-bold mb-4 hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
               >
                 <LogOut size={18} /> Logout
               </button>
            ) : (
               <button 
                 type="button" 
                 onClick={() => { setIsMobileMenuOpen(false); setIsLoginOpen(true); }} 
                 className="w-full bg-emerald-900 text-white py-3 rounded-xl font-bold mb-4 hover:bg-emerald-800 transition-colors"
               >
                 Login / Sign Up
               </button>
            )}
            <p className="text-center text-sm text-gray-500">Need Help? +91 9898929874</p>
          </div>
       </div>
    </div>
    </>
  );
};

export default Header;