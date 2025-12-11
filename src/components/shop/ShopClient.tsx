'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ProductFilters } from '@/types';

// Layout Components
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';

// Shop Components
import ShopHero from '@/components/shop/ShopHero';
import FilterBar from '@/components/shop/FilterBar';
import ProductGrid from '@/components/shop/ProductGrid';
import CTABanner from '@/components/shared/CTABanner';

export default function ShopClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // 1. Initialize State from URL (Ensures Client Key matches Server Key)
  const [filters, setFilters] = useState<ProductFilters>(() => ({
    categories: searchParams.getAll('category'),
    brands: searchParams.getAll('brand'),
    crops: searchParams.getAll('crop'),
    minPrice: searchParams.get('min_price') ? Number(searchParams.get('min_price')) : undefined,
    maxPrice: searchParams.get('max_price') ? Number(searchParams.get('max_price')) : undefined,
  }));

  // 2. Sync URL Changes to State (Browser Back Button support)
  useEffect(() => {
    setFilters({
      categories: searchParams.getAll('category'),
      brands: searchParams.getAll('brand'),
      crops: searchParams.getAll('crop'),
      minPrice: searchParams.get('min_price') ? Number(searchParams.get('min_price')) : undefined,
      maxPrice: searchParams.get('max_price') ? Number(searchParams.get('max_price')) : undefined,
    });
  }, [searchParams]);

  // 3. Filter Change Handler
  const handleFilterChange = (newFilters: ProductFilters) => {
    setFilters(newFilters); // Optimistic Update

    const params = new URLSearchParams();
    newFilters.categories.forEach(c => params.append('category', c));
    newFilters.brands.forEach(b => params.append('brand', b));
    newFilters.crops.forEach(c => params.append('crop', c));
    
    if (newFilters.minPrice !== undefined) params.set('min_price', newFilters.minPrice.toString());
    if (newFilters.maxPrice !== undefined) params.set('max_price', newFilters.maxPrice.toString());

    router.push(`/shop?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans overflow-x-hidden">
      <TopBar />
      <Header />
      <NavBar />
      
      <ShopHero />
      
      <main className="w-full flex flex-col items-center pb-8 font-jakarta">
        <div className="w-full max-w-[1296px] px-4 xl:px-0">
           <FilterBar 
             filters={filters} 
             onFilterChange={handleFilterChange} 
           />
        </div>
        
        {/* The Grid uses useProducts hook internally, which picks up Hydrated data */}
        <ProductGrid filters={filters} />
      </main>

      <div className="w-full flex justify-center pb-16 px-0 md:px-4 xl:px-0">
         <CTABanner />
      </div>
      
      <Footer />
    </div>
  );
}