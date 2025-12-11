'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProductById } from '@/services/productService';

// Layouts
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';

// Product Components
import ProductHero from '@/components/shop/product/ProductHero';
import ProductGallery from '@/components/shop/product/ProductGallery';
import ProductInfo from '@/components/shop/product/ProductInfo';
import ProductTabs from '@/components/shop/product/ProductTabs';
import SimilarProducts from '@/components/shop/product/SimilarProducts';
import Spinner from '@/components/shared/Spinner';

interface ProductDetailClientProps {
  productId: string;
}

export default function ProductDetailClient({ productId }: ProductDetailClientProps) {
  // 1. Fetch Data (Hydrated from Server)
  const { data: product, isLoading } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchProductById(productId),
    staleTime: 60 * 1000, // 1 minute cache
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#013220]">
        <Spinner className="w-8 h-8" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Product not found
      </div>
    );
  }

  // Extract Gallery Images
  const galleryImages = product.media
    .filter(m => m.purpose === 'GALLERY' && m.media_type === 'IMAGE')
    .map(m => m.url);
    
  const images = galleryImages.length > 0 ? galleryImages : [product.image_url || 'https://placehold.co/600x600?text=No+Image'];

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans">
      <TopBar />
      <Header />
      <NavBar />

      <ProductHero productName={product.product_name} />

      <main className="max-w-[1296px] mx-auto px-0 md:px-4 xl:px-0 pb-8 pt-0 md:py-8">
        
        {/* 1. Top Section: Gallery + Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 mb-16">
          <ProductGallery images={images} />
          
          <div className="px-4 md:px-0">
            <ProductInfo product={product} />
          </div>
        </div>

        {/* 2. Tabs Section */}
        <div className="mb-16 px-4 md:px-0">
           <ProductTabs product={product} />
        </div>

        {/* --- SEPARATOR LINE --- */}
        <div className="w-full h-[1px] bg-[#E0E2E7] mb-16"></div>

        {/* 3. Similar Products Section */}
        <SimilarProducts currentProductId={product.product_id} />

      </main>

      <Footer />
    </div>
  );
}