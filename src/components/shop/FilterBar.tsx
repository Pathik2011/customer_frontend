
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useFilterData } from '@/hooks/useFilterData'; // [!code ++]
import { RefreshCw, Check, ChevronRight, ArrowRight } from 'lucide-react'; 
import { fetchFilterOptions } from '@/services/filterService'; 
import { Category, FilterApiResponse, ProductFilters } from '@/types';

// Predefined Price Ranges
const PRICE_RANGES = [
  { label: 'Under ₹500', min: 0, max: 500 },
  { label: '₹500 - ₹1,000', min: 500, max: 1000 },
  { label: '₹1,000 - ₹2,000', min: 1000, max: 2000 },
  { label: 'Above ₹2,000', min: 2000, max: undefined },
];

// --- CSS to Hide Scrollbars ONLY ---
const scrollStyles = `
  /* Hide scrollbar for Chrome, Safari and Opera */
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  .no-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
`;

interface FilterBarProps {
  filters: ProductFilters;
  onFilterChange: (newFilters: ProductFilters) => void;
}

const FilterBar = ({ filters, onFilterChange }: FilterBarProps) => {
  // --- State ---
  //const [data, setData] = useState<FilterApiResponse | null>(null);
  //const [loading, setLoading] = useState(true);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  
  // Price Inputs
  const [minInput, setMinInput] = useState('');
  const [maxInput, setMaxInput] = useState('');

  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data, isLoading: loading } = useFilterData();
  // --- Fetch Data ---
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true);
  //       const result = await fetchFilterOptions();
  //       setData(result);
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // --- Click Outside ---
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && dropdownRef.current.contains(event.target as Node)) {
        return; 
      }
      setOpenDropdown(null);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // --- Scroll Close ---
  useEffect(() => {
    const handleScroll = (event: Event) => {
      if (dropdownRef.current && dropdownRef.current.contains(event.target as Node)) {
        return; 
      }
      if (openDropdown) setOpenDropdown(null);
    };

    if (openDropdown) window.addEventListener('scroll', handleScroll, true);
    return () => window.removeEventListener('scroll', handleScroll, true);
  }, [openDropdown]);

  // --- Handlers ---
  const toggleDropdown = (name: string) => setOpenDropdown(openDropdown === name ? null : name);

  const handleParentCategoryClick = (cat: Category) => {
    setSelectedCategory(cat);
    onFilterChange({ ...filters, categories: [cat.category_name] });
  };

  const handleSubCategoryClick = (subName: string) => {
    let newCategories = [...filters.categories];
    if (selectedCategory && newCategories.includes(selectedCategory.category_name)) {
        newCategories = newCategories.filter(c => c !== selectedCategory.category_name);
    }
    if (newCategories.includes(subName)) {
      newCategories = newCategories.filter(c => c !== subName);
      if(newCategories.length === 0 && selectedCategory) newCategories = [selectedCategory.category_name];
    } else {
      newCategories.push(subName);
    }
    onFilterChange({ ...filters, categories: newCategories });
  };

  const toggleFilter = (type: 'brands' | 'crops', value: string) => {
    const list = filters[type];
    const newList = list.includes(value) ? list.filter(i => i !== value) : [...list, value];
    onFilterChange({ ...filters, [type]: newList });
  };

  const applyPriceRange = (min: number | undefined, max: number | undefined) => {
    onFilterChange({ ...filters, minPrice: min, maxPrice: max });
  };

  const applyCustomPrice = () => {
    const min = minInput ? parseFloat(minInput) : undefined;
    const max = maxInput ? parseFloat(maxInput) : undefined;
    onFilterChange({ ...filters, minPrice: min, maxPrice: max });
  };

  const handleReset = () => {
    onFilterChange({ categories: [], brands: [], crops: [], minPrice: undefined, maxPrice: undefined });
    setSelectedCategory(null);
    setMinInput('');
    setMaxInput('');
    setOpenDropdown(null);
  };

  const isRangeActive = (min?: number, max?: number) => filters.minPrice === min && filters.maxPrice === max;

  const getPriceLabel = () => {
    if (filters.minPrice !== undefined && filters.maxPrice !== undefined) return `₹${filters.minPrice} - ₹${filters.maxPrice}`;
    if (filters.minPrice !== undefined) return `Above ₹${filters.minPrice}`;
    if (filters.maxPrice !== undefined) return `Below ₹${filters.maxPrice}`;
    return 'Price';
  };

  // --- Styles ---
  const buttonStyle = {
    height: '46px',
    padding: '0 16px',
    gap: '8px',
    whiteSpace: 'nowrap' as const
  };

  const buttonTextClasses = "font-jakarta font-semibold text-[15px] leading-[100%] tracking-[0.01em] text-[#000000]";

  const dropdownContainerClass = `
    /* Mobile (Bottom Sheet) */
    fixed inset-x-0 bottom-0 z-[100] w-full bg-white rounded-t-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] border-t border-gray-200 overflow-hidden flex flex-col max-h-[60vh]
    
    /* Desktop (Dropdown) */
    lg:absolute lg:inset-auto lg:top-full lg:left-0 lg:w-[280px] lg:rounded-xl lg:shadow-xl lg:border lg:border-gray-200 lg:p-0 lg:mt-2 lg:max-h-[300px] lg:z-[100]
  `;

  const MobileBackdrop = () => (
    <div 
      className="fixed inset-0 bg-black/50 z-[90] lg:hidden" 
      onClick={(e) => { e.stopPropagation(); setOpenDropdown(null); }}
    />
  );

  if (loading) return <div className="w-full h-[100px] animate-pulse bg-gray-50 rounded-lg" />;
  if (!data) return null;

  return (
    <>
      <style>{scrollStyles}</style>

      <div className="w-full font-google mb-[40px]" ref={dropdownRef}>
        <div className="w-full"> 
          
          <h2 
            style={{
              height: '36px',
              fontFamily: '"Google Sans", "Plus Jakarta Sans", sans-serif',
              fontWeight: 500,
              fontSize: '28px',
              lineHeight: '100%',
              color: '#000000',
              marginBottom: '28px',
              marginTop: '28px'
            }}
          >
            All Products
          </h2>

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 w-full">
            
            <div 
              className="
                flex items-center flex-nowrap gap-3 
                overflow-x-auto no-scrollbar
                lg:flex-wrap lg:gap-3 lg:overflow-visible
              "
              style={{
                maxWidth: '813px',
                width: '100%',
                paddingBottom: '4px' 
              }}
            >
              
              {/* Categories */}
              <div className="relative">
                <button 
                  onClick={() => toggleDropdown('Categories')} 
                  className={`bg-white border ${openDropdown === 'Categories' || filters.categories.length > 0 ? 'border-[#013220] text-[#013220]' : 'border-gray-200 text-[#000000]'} rounded-lg flex items-center justify-center transition-colors ${buttonTextClasses}`} 
                  style={buttonStyle}
                >
                  {/* [!code changed] Use Label + Count Badge style */}
                  All Categories 
                  {filters.categories.length > 0 && (
                    <span className="bg-[#013220] text-white text-[10px] px-1.5 py-0.5 rounded-full ml-1 font-normal">
                      {filters.categories.length}
                    </span>
                  )}
                  <img 
                    src="/icons/arrow-down.svg" 
                    alt="down" 
                    className={`transition-transform duration-200 ${openDropdown === 'Categories' ? 'rotate-180' : ''}`}
                    style={{ width: '20px', height: '20px' }} 
                  />
                </button>
                {openDropdown === 'Categories' && (
                  <>
                    <MobileBackdrop />
                    <div className={dropdownContainerClass}>
                      <div className="w-full flex justify-center py-3 lg:hidden bg-gray-50 border-b border-gray-100"><div className="w-12 h-1.5 bg-gray-300 rounded-full"></div></div>
                      {!selectedCategory ? (
                        <div className="overflow-y-auto p-2 lg:max-h-[300px]">
                          {data.categories.map((cat) => (
                            <div key={cat.category_id} onClick={() => handleParentCategoryClick(cat)} className="flex items-center justify-between px-3 py-3 lg:py-2 hover:bg-gray-50 cursor-pointer rounded-md text-sm text-gray-700 border-b border-gray-50 lg:border-0 last:border-0">
                              {cat.category_name} <ChevronRight size={14} className="text-gray-400" />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col h-full">
                          <div className="flex items-center justify-between p-3 border-b border-gray-100 bg-gray-50 sticky top-0 z-10">
                            <button onClick={(e) => { e.stopPropagation(); setSelectedCategory(null); }} className="text-xs font-bold text-gray-500 hover:text-[#013220]">← Back</button>
                            <span className="text-sm font-bold text-[#013220] truncate max-w-[150px]">{selectedCategory.category_name}</span>
                          </div>
                          <div className="overflow-y-auto p-2 lg:max-h-[250px]">
                            {selectedCategory.sub_categories.length > 0 ? selectedCategory.sub_categories.map((sub) => (
                              <label key={sub.category_id} className="flex items-center gap-3 px-3 py-3 lg:py-2 hover:bg-gray-50 cursor-pointer rounded-md border-b border-gray-50 lg:border-0 last:border-0">
                                <div className={`w-4 h-4 border rounded flex items-center justify-center shrink-0 ${filters.categories.includes(sub.category_name) ? 'bg-[#013220] border-[#013220]' : 'border-gray-300'}`}>{filters.categories.includes(sub.category_name) && <Check size={10} className="text-white" />}</div>
                                <input type="checkbox" className="hidden" checked={filters.categories.includes(sub.category_name)} onChange={() => handleSubCategoryClick(sub.category_name)} />
                                <span className="text-sm text-gray-700">{sub.category_name}</span>
                              </label>
                            )) : <div className="p-4 text-center text-xs text-gray-400">No subcategories</div>}
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* Brands */}
              <div className="relative">
                <button 
                  onClick={() => toggleDropdown('Brands')} 
                  className={`bg-white border ${filters.brands.length > 0 ? 'border-[#013220] text-[#013220]' : 'border-gray-200 text-[#000000]'} rounded-lg flex items-center justify-center transition-colors ${buttonTextClasses}`} 
                  style={buttonStyle}
                >
                  Brands {filters.brands.length > 0 && <span className="bg-[#013220] text-white text-[10px] px-1.5 py-0.5 rounded-full ml-1 font-normal">{filters.brands.length}</span>} 
                  <img 
                    src="/icons/arrow-down.svg" 
                    alt="down" 
                    className={`transition-transform duration-200 ${openDropdown === 'Brands' ? 'rotate-180' : ''}`}
                    style={{ width: '20px', height: '20px' }} 
                  />
                </button>
                {openDropdown === 'Brands' && (
                  <>
                    <MobileBackdrop />
                    <div className={dropdownContainerClass}>
                       <div className="w-full flex justify-center py-3 lg:hidden bg-gray-50 border-b border-gray-100"><div className="w-12 h-1.5 bg-gray-300 rounded-full"></div></div>
                      <div className="overflow-y-auto p-2">
                        {data.brands.map((brand) => (
                          <label key={brand.brand_id} className="flex items-center gap-3 px-3 py-3 lg:py-2 hover:bg-gray-50 cursor-pointer rounded-md border-b border-gray-50 lg:border-0 last:border-0">
                            <div className={`w-4 h-4 border rounded flex items-center justify-center shrink-0 ${filters.brands.includes(brand.brand_name) ? 'bg-[#013220] border-[#013220]' : 'border-gray-300'}`}>{filters.brands.includes(brand.brand_name) && <Check size={10} className="text-white" />}</div>
                            <input type="checkbox" className="hidden" checked={filters.brands.includes(brand.brand_name)} onChange={() => toggleFilter('brands', brand.brand_name)} />
                            <span className="text-sm text-gray-700">{brand.brand_name}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Crops */}
              <div className="relative">
                <button 
                  onClick={() => toggleDropdown('Crops')} 
                  className={`bg-white border ${filters.crops.length > 0 ? 'border-[#013220] text-[#013220]' : 'border-gray-200 text-[#000000]'} rounded-lg flex items-center justify-center transition-colors ${buttonTextClasses}`} 
                  style={buttonStyle}
                >
                  Crop {filters.crops.length > 0 && <span className="bg-[#013220] text-white text-[10px] px-1.5 py-0.5 rounded-full ml-1 font-normal">{filters.crops.length}</span>} 
                  <img 
                    src="/icons/arrow-down.svg" 
                    alt="down" 
                    className={`transition-transform duration-200 ${openDropdown === 'Crops' ? 'rotate-180' : ''}`}
                    style={{ width: '20px', height: '20px' }} 
                  />
                </button>
                {openDropdown === 'Crops' && (
                  <>
                     <MobileBackdrop />
                     <div className={dropdownContainerClass}>
                      <div className="w-full flex justify-center py-3 lg:hidden bg-gray-50 border-b border-gray-100"><div className="w-12 h-1.5 bg-gray-300 rounded-full"></div></div>
                      <div className="overflow-y-auto p-2">
                        {data.crops.map((crop) => (
                          <label key={crop.crop_id} className="flex items-center gap-3 px-3 py-3 lg:py-2 hover:bg-gray-50 cursor-pointer rounded-md border-b border-gray-50 lg:border-0 last:border-0">
                            <div className={`w-4 h-4 border rounded flex items-center justify-center shrink-0 ${filters.crops.includes(crop.crop_name) ? 'bg-[#013220] border-[#013220]' : 'border-gray-300'}`}>{filters.crops.includes(crop.crop_name) && <Check size={10} className="text-white" />}</div>
                            <input type="checkbox" className="hidden" checked={filters.crops.includes(crop.crop_name)} onChange={() => toggleFilter('crops', crop.crop_name)} />
                            <span className="text-sm text-gray-700">{crop.crop_name}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Price */}
              <div className="relative">
                <button 
                  onClick={() => toggleDropdown('Price')} 
                  className={`bg-white border ${(filters.minPrice !== undefined || filters.maxPrice !== undefined) ? 'border-[#013220] text-[#013220]' : 'border-gray-200 text-[#000000]'} rounded-lg flex items-center justify-center transition-colors ${buttonTextClasses}`} 
                  style={buttonStyle}
                >
                  {getPriceLabel()} 
                  <img 
                    src="/icons/arrow-down.svg" 
                    alt="down" 
                    className={`transition-transform duration-200 ${openDropdown === 'Price' ? 'rotate-180' : ''}`}
                    style={{ width: '20px', height: '20px' }} 
                  />
                </button>
                {openDropdown === 'Price' && (
                  <>
                    <MobileBackdrop />
                    <div className={dropdownContainerClass}>
                      <div className="w-full flex justify-center py-3 lg:hidden bg-gray-50 border-b border-gray-100"><div className="w-12 h-1.5 bg-gray-300 rounded-full"></div></div>
                      
                      <div className="p-2 border-b border-gray-100">
                        <div className="text-[10px] font-bold text-gray-400 mb-2 px-2 pt-2 lg:pt-0">QUICK SELECT</div>
                        {PRICE_RANGES.map((range, i) => (
                          <div key={i} onClick={() => applyPriceRange(range.min, range.max)} className={`flex items-center justify-between px-3 py-3 lg:py-2 cursor-pointer rounded-md text-sm mb-1 ${isRangeActive(range.min, range.max) ? 'bg-[#013220]/10 text-[#013220] font-medium' : 'hover:bg-gray-50 text-gray-700'}`}>
                            {range.label} {isRangeActive(range.min, range.max) && <Check size={14} />}
                          </div>
                        ))}
                      </div>
                      <div className="p-3 bg-gray-50">
                        <div className="text-[10px] font-bold text-gray-400 mb-2">CUSTOM RANGE</div>
                        <div className="flex items-center gap-2 pb-4 lg:pb-0">
                          <div className="relative flex-1">
                            <span className="absolute left-2 top-2 text-xs text-gray-400">₹</span>
                            <input 
                              type="number" 
                              placeholder="Min" 
                              value={minInput} 
                              onChange={(e) => setMinInput(e.target.value)} 
                              className="w-full pl-5 pr-2 py-1.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-[#013220] text-gray-900 placeholder:text-gray-400" 
                            />
                          </div>
                          <span className="text-gray-400">-</span>
                          <div className="relative flex-1">
                            <span className="absolute left-2 top-2 text-xs text-gray-400">₹</span>
                            <input 
                              type="number" 
                              placeholder="Max" 
                              value={maxInput} 
                              onChange={(e) => setMaxInput(e.target.value)} 
                              className="w-full pl-5 pr-2 py-1.5 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-[#013220] text-gray-900 placeholder:text-gray-400" 
                            />
                          </div>
                          <button onClick={applyCustomPrice} className="bg-[#013220] text-white p-2 rounded-md hover:bg-emerald-800 transition-colors"><ArrowRight size={14} /></button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Static Buttons */}
              {['Application', 'Form'].map((f) => (
                <button 
                  key={f} 
                  className={`bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:border-[#013220] transition-colors ${buttonTextClasses}`} 
                  style={buttonStyle}
                >
                  {f} 
                  <img 
                    src="/icons/arrow-down.svg" 
                    alt="down" 
                    style={{ width: '20px', height: '20px' }} 
                  />
                </button>
              ))}

              {/* Mobile Only: Sort & Reset */}
              <div className="flex items-center gap-3 lg:hidden">
                <button className={`bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:border-[#013220] ${buttonTextClasses}`} style={buttonStyle}>
                  Sort By 
                  <img 
                    src="/icons/arrow-down.svg" 
                    alt="down" 
                    style={{ width: '20px', height: '20px' }} 
                  />
                </button>
                <button onClick={handleReset} className={`bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:text-[#013220] hover:border-[#013220] transition-colors ${buttonTextClasses}`} style={buttonStyle}>
                  Reset <RefreshCw size={14} className="ml-1"/>
                </button>
              </div>

            </div>

            {/* Desktop Only: Sort & Reset */}
            <div 
              className="hidden lg:flex items-center"
              style={{
                width: '281px',
                height: '46px',
                gap: '12px'
              }}
            >
              <button 
                className={`flex-1 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:border-[#013220] ${buttonTextClasses}`}
                style={{ height: '46px', padding: '0 16px' }}
              >
                Sort By 
                <img 
                  src="/icons/arrow-down.svg" 
                  alt="down" 
                  style={{ width: '20px', height: '20px' }} 
                />
              </button>
              
              <button 
                onClick={handleReset}
                className={`flex-1 bg-white border border-gray-200 rounded-lg flex items-center justify-center gap-2 hover:text-[#013220] hover:border-[#013220] transition-colors ${buttonTextClasses}`}
                style={{ height: '46px' }}
              >
                Reset Filter <RefreshCw size={14} />
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default FilterBar;