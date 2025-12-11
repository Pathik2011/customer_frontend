
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { fetchFilterOptions } from '@/services/filterService'; 
import { FilterApiResponse } from '@/types';

import { useFilterData } from '@/hooks/useFilterData'; // [!code ++]

const NavBar = () => {
  // const [data, setData] = useState<FilterApiResponse | null>(null);
  // const [loading, setLoading] = useState(true);
   const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
   const dropdownRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const loadData = async () => {
  //     try {
  //       setLoading(true);
  //       const result = await fetchFilterOptions();
  //       setData(result);
  //     } catch (error) {
  //       console.error("Failed to load nav data", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   loadData();
  // }, []);

  const { data, isLoading: loading } = useFilterData();

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Helper to find category by name
  const getCategory = (name: string) => data?.categories.find(c => c.category_name === name);

  // Define Menu Items structure
  const menuItems = [
    { label: 'Pesticides', type: 'category', data: getCategory('Pesticides')?.sub_categories },
    { label: 'Fertilizers', type: 'category', data: getCategory('Fertilizers')?.sub_categories },
    { label: 'Seeds', type: 'category', data: getCategory('Seeds')?.sub_categories }, // Seeds added as Category
    { label: 'Brands', type: 'brand', data: data?.brands },
    { label: 'Crops', type: 'crop', data: data?.crops },
  ];

  return (
    // Visible on lg (1024px) and up
    <div ref={dropdownRef} className="hidden lg:flex w-full h-[46px] border-b border-gray-200 bg-white relative overflow-visible items-center justify-center font-jakarta z-40">
        
        <ul className="relative z-10 flex items-center gap-8 whitespace-nowrap px-4 h-full">
            {loading ? (
              <div className="flex gap-8 animate-pulse">
                {[1,2,3,4,5].map(i => <div key={i} className="h-4 w-16 bg-gray-200 rounded"></div>)}
              </div>
            ) : (
              menuItems.map((item) => (
                <li 
                  key={item.label} 
                  className="relative h-full flex items-center"
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                  onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                >
                  <div 
                    className={`
                      flex items-center cursor-pointer transition-colors px-2 py-3
                      text-[#003C22] text-[15px] font-semibold leading-[100%] tracking-[0.01em]
                      ${activeDropdown === item.label ? 'opacity-80' : 'hover:opacity-80'}
                    `}
                    style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                  >
                    {item.label} 
                    
                    <img 
                      src="/icons/arrow-down.svg" 
                      alt="down"
                      className={`ml-1 transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`}
                      style={{
                        width: '20px',
                        height: '20px',
                        opacity: 1
                      }}
                    />
                  </div>

                  {/* Dropdown */}
                  <div 
                    className={`
                      absolute top-full left-0 min-w-[200px] bg-white border border-gray-100 shadow-lg rounded-b-xl z-50 max-h-[400px] overflow-y-auto
                      transition-all duration-200 transform origin-top
                      ${activeDropdown === item.label ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}
                    `}
                  >
                    <ul className="py-2">
                      {item.data && item.data.length > 0 ? (
                        item.data.map((subItem: any) => {
                          const itemName = subItem.category_name || subItem.brand_name || subItem.crop_name;
                          const queryParam = item.type === 'category' ? 'category' : item.type; // category, brand, or crop
                          
                          return (
                            <li key={subItem.category_id || subItem.brand_id || subItem.crop_id}>
                              <Link 
                                 href={{
                                   pathname: '/shop',
                                   query: { [queryParam]: itemName }
                                 }}
                                 className="block px-4 py-2 hover:bg-gray-50 text-gray-700 text-xs transition-colors"
                              >
                                {itemName}
                              </Link>
                            </li>
                          );
                        })
                      ) : (
                        <li className="px-4 py-2 text-gray-400 text-xs">No items found</li>
                      )}
                    </ul>
                  </div>
                </li>
              ))
            )}
        </ul>
    </div>
  );
};

export default NavBar;