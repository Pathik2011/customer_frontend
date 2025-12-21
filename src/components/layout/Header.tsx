
// 'use client';

// import React, { useState, useEffect } from 'react';
// import { Search, ShoppingBag, User, ChevronDown, Menu, X, ChevronRight, LogOut } from 'lucide-react';
// import Link from 'next/link';
// import { fetchFilterOptions } from '@/services/filterService'; 
// import { FilterApiResponse } from '@/types';
// import { useCart } from '@/context/CartContext'; 
// import { useAuth } from '@/context/AuthContext'; 
// import LoginPopup from '@/components/auth/LoginPopup';

// const Header = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isLoginOpen, setIsLoginOpen] = useState(false);
  
//   const [navData, setNavData] = useState<FilterApiResponse | null>(null);
//   const [expandedItem, setExpandedItem] = useState<string | null>(null);
//   const [animate, setAnimate] = useState(false);

//   const { cartCount } = useCart(); 
//   const { isAuthenticated, logout } = useAuth(); 

//   // --- Cart Animation ---
//   useEffect(() => {
//     if (cartCount > 0) {
//       setAnimate(true);
//       const timer = setTimeout(() => setAnimate(false), 300); 
//       return () => clearTimeout(timer);
//     }
//   }, [cartCount]);

//   // --- Fetch Menu Data ---
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

//   // --- Scroll Lock ---
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
  
//   // [!code highlight] Updated Structure: Added 'type' field to match NavBar logic
//   const mobileMenuItems = [
//     { label: 'Pesticides', type: 'category', data: getCategory('Pesticides')?.sub_categories },
//     { label: 'Fertilizers', type: 'category', data: getCategory('Fertilizers')?.sub_categories },
//     { label: 'Seeds', type: 'category', data: getCategory('Seeds')?.sub_categories },
//     { label: 'Brands', type: 'brand', data: navData?.brands },
//     { label: 'Crops', type: 'crop', data: navData?.crops },
//   ];

//   return (
//     <>
//     <LoginPopup isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} /> 

//     {/* --- DESKTOP HEADER (Unchanged) --- */}
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
//                         onClick={() => setIsLoginOpen(true)}
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

//     {/* --- MOBILE DRAWER (Fixed) --- */}
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
//                        item.data.map((subItem: any) => {
//                          // [!code highlight] Extract correct name based on type
//                          const itemName = subItem.category_name || subItem.brand_name || subItem.crop_name;
                         
//                          return (
//                            <li key={subItem.category_id || subItem.brand_id || subItem.crop_id}>
//                              <Link 
//                                // [!code highlight] Dynamic Link Construction: /shop?type=value
//                                href={{
//                                  pathname: '/shop',
//                                  query: { [item.type]: itemName } // uses 'category', 'brand', or 'crop'
//                                }}
//                                onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
//                                className="block py-2 text-sm text-gray-600 hover:text-emerald-600"
//                              >
//                                {itemName}
//                              </Link>
//                            </li>
//                          );
//                        })
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
// 'use client';

// import React, { useState, useEffect } from 'react';
// import { Search, ShoppingBag, User, ChevronDown, Menu, X, ChevronRight, LogOut } from 'lucide-react';
// import Link from 'next/link';
// import { fetchFilterOptions } from '@/services/filterService'; 
// import { FilterApiResponse } from '@/types';
// import { useCart } from '@/context/CartContext'; 
// import { useAuth } from '@/context/AuthContext'; 
// import LoginPopup from '@/components/auth/LoginPopup';

// const Header = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isLoginOpen, setIsLoginOpen] = useState(false);
  
//   const [navData, setNavData] = useState<FilterApiResponse | null>(null);
//   const [expandedItem, setExpandedItem] = useState<string | null>(null);
//   const [animate, setAnimate] = useState(false);

//   const { cartCount } = useCart(); 
//   const { isAuthenticated, logout } = useAuth(); 

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
//     { label: 'Pesticides', type: 'category', data: getCategory('Pesticides')?.sub_categories },
//     { label: 'Fertilizers', type: 'category', data: getCategory('Fertilizers')?.sub_categories },
//     { label: 'Seeds', type: 'category', data: getCategory('Seeds')?.sub_categories },
//     { label: 'Brands', type: 'brand', data: navData?.brands },
//     { label: 'Crops', type: 'crop', data: navData?.crops },
//   ];

//   return (
//     <>
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
//                         onClick={() => setIsLoginOpen(true)}
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

//     {/* --- MOBILE DRAWER --- */}
//     <div className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 lg:hidden ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={() => setIsMobileMenuOpen(false)} />
//     <div className={`fixed top-0 right-0 h-full w-[85%] max-w-[320px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 lg:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
//        <div className="p-4 flex justify-between items-center border-b border-gray-100">
//           <span className="font-bold text-lg text-emerald-900">Menu</span>
//           <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-gray-100 rounded-full"><X size={24} className="text-gray-600"/></button>
//        </div>
       
//        {/* Scrollable Container */}
//        <div className="p-4 overflow-y-auto h-[calc(100%-60px)]">
//           <ul className="space-y-2">
//              {mobileMenuItems.map((item) => (
//                <li key={item.label} className="border-b border-gray-50 last:border-0">
//                  <button onClick={() => toggleAccordion(item.label)} className="w-full flex items-center justify-between py-3 text-base font-medium text-gray-800 hover:text-emerald-700">
//                    {item.label} <ChevronRight size={16} className={`text-gray-400 transition-transform duration-200 ${expandedItem === item.label ? 'rotate-90' : ''}`} />
//                  </button>
                 
//                  {/* [!code highlight] FIXED: Increased max-h from 500px to 3000px so long lists (like Crops) don't get cut off. */}
//                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${expandedItem === item.label ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'}`}>
//                    <ul className="pl-4 pb-2 space-y-2 bg-gray-50/50 rounded-lg mb-2">
//                      {item.data && item.data.length > 0 ? (
//                        item.data.map((subItem: any) => {
//                          const itemName = subItem.category_name || subItem.brand_name || subItem.crop_name;
                         
//                          return (
//                            <li key={subItem.category_id || subItem.brand_id || subItem.crop_id}>
//                              <Link 
//                                href={{
//                                  pathname: '/shop',
//                                  query: { [item.type]: itemName }
//                                }}
//                                onClick={() => setIsMobileMenuOpen(false)}
//                                className="block py-2 text-sm text-gray-600 hover:text-emerald-600"
//                              >
//                                {itemName}
//                              </Link>
//                            </li>
//                          );
//                        })
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

import React, { useState, useEffect, useRef } from 'react';
import { Search, ShoppingBag, User, ChevronDown, Menu, X, ChevronRight, LogOut, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; 
import { fetchFilterOptions } from '@/services/filterService'; 
import { fetchProducts } from '@/services/productService'; 
import { FilterApiResponse, Product } from '@/types'; 
import { useCart } from '@/context/CartContext'; 
import { useAuth } from '@/context/AuthContext'; 
import LoginPopup from '@/components/auth/LoginPopup';

const Header = () => {
  const router = useRouter(); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  
  const [navData, setNavData] = useState<FilterApiResponse | null>(null);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [animate, setAnimate] = useState(false);

  // --- Search State ---
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  
  // [!code changed] Added separate ref for Mobile Search
  const desktopSearchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);

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

  // --- Search Logic ---
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm.trim().length > 1) {
        setIsSearching(true);
        setShowDropdown(true);
        try {
          const products = await fetchProducts(0, 5, { searchTerm: searchTerm, categories: [], brands: [], crops: [] });
          setSearchResults(products);
        } catch (error) {
          console.error("Search failed", error);
          setSearchResults([]);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
        setShowDropdown(false);
      }
    }, 400); 

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // [!code changed] Updated "Click Outside" to check BOTH Desktop and Mobile refs
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      
      const isDesktopInside = desktopSearchRef.current && desktopSearchRef.current.contains(target);
      const isMobileInside = mobileSearchRef.current && mobileSearchRef.current.contains(target);

      // Only close if click is outside BOTH containers
      if (!isDesktopInside && !isMobileInside) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!searchTerm.trim()) return;
    setShowDropdown(false);
    router.push(`/shop?search_term=${encodeURIComponent(searchTerm)}`);
  };

  const handleProductClick = (productId: number) => {
    setShowDropdown(false);
    router.push(`/shop/${productId}`);
  };

  const toggleAccordion = (label: string) => {
    setExpandedItem(expandedItem === label ? null : label);
  };

  const getCategory = (name: string) => navData?.categories.find(c => c.category_name === name);
  
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

                {/* --- DESKTOP SEARCH BAR --- */}
                <div 
                  ref={desktopSearchRef} // [!code changed] Renamed ref
                  className="hidden lg:block flex-1 mx-6 lg:mx-0 lg:absolute lg:left-[50%] lg:-translate-x-1/2 lg:top-[26px] lg:w-[40%] lg:max-w-[470px] lg:h-[46px] z-30"
                >
                    <form onSubmit={handleSearchSubmit} className="relative w-full h-full">
                      <input 
                        type="text" 
                        placeholder="Search your product..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full h-[40px] lg:h-full bg-gray-100 rounded-[40px] border border-gray-200 px-6 pl-12 text-sm text-gray-900 outline-none focus:ring-1 focus:ring-emerald-600 transition-shadow" 
                      />
                      <Search className="w-4 h-4 absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                      
                      {/* Search Dropdown */}
                      {showDropdown && searchTerm.length > 1 && (
                        <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-2">
                           {isSearching ? (
                             <div className="flex items-center justify-center p-4 text-gray-500 text-sm">
                               <Loader2 className="w-4 h-4 animate-spin mr-2" /> Searching...
                             </div>
                           ) : searchResults.length > 0 ? (
                             <>
                               {searchResults.map((product) => (
                                 <div 
                                   key={product.product_id}
                                   onClick={() => handleProductClick(product.product_id)}
                                   className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0"
                                 >
                                    <div className="w-10 h-10 shrink-0 bg-gray-50 rounded-md p-1 border border-gray-100">
                                       <img src={product.image_url} alt={product.product_name} className="w-full h-full object-contain mix-blend-multiply" />
                                    </div>
                                    <div className="flex flex-col">
                                       <span className="text-sm font-semibold text-gray-900 line-clamp-1">{product.product_name}</span>
                                       <span className="text-xs text-gray-500">{product.brand_name}</span>
                                    </div>
                                 </div>
                               ))}
                               <button 
                                 onClick={() => handleSearchSubmit()}
                                 className="w-full text-center py-2 text-xs font-bold text-emerald-700 hover:bg-gray-50 border-t border-gray-100"
                               >
                                 View All Results
                               </button>
                             </>
                           ) : (
                             <div className="p-4 text-center text-sm text-gray-500">No products found</div>
                           )}
                        </div>
                      )}
                    </form>
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

            {/* --- MOBILE SEARCH BAR --- */}
            <div 
              ref={mobileSearchRef} // [!code changed] Added Ref here!
              className="mt-3 lg:hidden relative w-full"
            >
                <form onSubmit={handleSearchSubmit}>
                  <input 
                    type="text" 
                    placeholder="Search product..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full h-[44px] bg-gray-100 rounded-full border border-gray-200 px-4 pl-10 text-sm text-gray-900 outline-none focus:ring-1 focus:ring-emerald-600" 
                  />
                  <Search className="w-4 h-4 absolute left-3.5 top-[14px] text-gray-400" />
                </form>
                {/* Simplified dropdown for mobile */}
                {showDropdown && searchTerm.length > 1 && (
                   <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden py-2">
                      {isSearching ? (
                         <div className="p-4 text-center text-sm text-gray-500">Searching...</div>
                      ) : searchResults.length > 0 ? (
                         <>
                           {searchResults.map((product) => (
                             <div 
                               key={product.product_id}
                               onClick={() => handleProductClick(product.product_id)}
                               className="flex items-center gap-3 px-4 py-2 border-b border-gray-50 last:border-0 active:bg-gray-50"
                             >
                                <div className="w-10 h-10 shrink-0 bg-gray-50 rounded-md p-1 border border-gray-100">
                                   <img src={product.image_url} alt={product.product_name} className="w-full h-full object-contain mix-blend-multiply" />
                                </div>
                                <div className="flex flex-col">
                                   <span className="text-sm font-semibold text-gray-900 line-clamp-1">{product.product_name}</span>
                                   <span className="text-xs text-gray-500">{product.brand_name}</span>
                                </div>
                             </div>
                           ))}
                           <button 
                             onClick={() => handleSearchSubmit()}
                             className="w-full text-center py-3 text-xs font-bold text-emerald-700 bg-gray-50"
                           >
                             See All Results
                           </button>
                         </>
                      ) : (
                         <div className="p-4 text-center text-sm text-gray-500">No products found</div>
                      )}
                   </div>
                )}
            </div>
        </div>
    </div>

    {/* --- MOBILE DRAWER (Unchanged) --- */}
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
                 
                 <div className={`overflow-hidden transition-all duration-500 ease-in-out ${expandedItem === item.label ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                   <ul className="pl-4 pb-2 space-y-2 bg-gray-50/50 rounded-lg mb-2">
                     {item.data && item.data.length > 0 ? (
                       item.data.map((subItem: any) => {
                         const itemName = subItem.category_name || subItem.brand_name || subItem.crop_name;
                         
                         return (
                           <li key={subItem.category_id || subItem.brand_id || subItem.crop_id}>
                             <Link 
                               href={{
                                 pathname: '/shop',
                                 query: { [item.type]: itemName }
                               }}
                               onClick={() => setIsMobileMenuOpen(false)}
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