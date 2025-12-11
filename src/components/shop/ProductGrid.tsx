// 'use client';

// import React, { useState, useEffect, useRef } from 'react';
// import { ChevronDown, ShoppingBag } from 'lucide-react';
// import ProductCard from '@/components/shop/ProductCard';
// import { fetchProducts } from '@/services/productService';
// import { Product } from '@/types';
// // --- 1. TYPES (Move to src/types/index.ts locally) ---


// // --- 2. API SERVICE (Move to src/services/productService.ts locally) ---


// // --- 3. PRODUCT CARD COMPONENT (Move to src/components/shop/ProductCard.tsx locally) ---


// // --- 4. MAIN GRID COMPONENT ---
// const ProductGrid = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [hasMore, setHasMore] = useState(true);
//   const [skip, setSkip] = useState(0);
//   const limit = 15;

//   const loaderRef = useRef<HTMLDivElement>(null);

//   // Initial Load
//   useEffect(() => {
//     const loadInitialProducts = async () => {
//       try {
//         setLoading(true);
//         const initialData = await fetchProducts(0, limit);
//         setProducts(initialData);
//         setSkip(limit);
//         if (initialData.length < limit) setHasMore(false);
//       } catch (error) {
//         console.error("Failed to load initial products", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadInitialProducts();
//   }, []);

//   // Fetch More Function
//   const loadMoreProducts = async () => {
//     if (loading || !hasMore) return;

//     try {
//       setLoading(true);
//       const moreData = await fetchProducts(skip, limit);
      
//       if (moreData.length === 0) {
//         setHasMore(false);
//       } else {
//         setProducts((prev) => [...prev, ...moreData]);
//         setSkip((prev) => prev + limit);
//         if (moreData.length < limit) setHasMore(false);
//       }
//     } catch (error) {
//       console.error("Failed to load more products", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Auto Scroll Observer
//   useEffect(() => {
//     const observer = new IntersectionObserver((entries) => {
//       const target = entries[0];
//       if (target.isIntersecting && hasMore && !loading) {
//         loadMoreProducts();
//       }
//     }, {
//       root: null,
//       rootMargin: '200px',
//       threshold: 0.1
//     });

//     if (loaderRef.current) {
//       observer.observe(loaderRef.current);
//     }

//     return () => {
//       if (loaderRef.current) {
//         observer.unobserve(loaderRef.current);
//       }
//     };
//   }, [hasMore, loading, skip]);

//   return (
//     <div className="w-full max-w-[1296px] px-4 xl:px-0">
//       {/* Grid Layout */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-12 justify-items-center">
//         {products.map((product, index) => (
//           <ProductCard 
//             // Fallback key combo because product_id might repeat in dev/mock scenarios
//             key={`${product.product_id}-${index}`} 
//             product={product} 
//           />
//         ))}
//       </div>

//       {/* Loading Indicator */}
//       <div ref={loaderRef} className="w-full flex justify-center py-8 h-20">
//         {loading && (
//           <div className="flex gap-2">
//             <div className="w-3 h-3 bg-[#013220] rounded-full animate-bounce"></div>
//             <div className="w-3 h-3 bg-[#013220] rounded-full animate-bounce delay-100"></div>
//             <div className="w-3 h-3 bg-[#013220] rounded-full animate-bounce delay-200"></div>
//           </div>
//         )}
//         {!hasMore && products.length > 0 && (
//           <span className="text-gray-400 text-sm">You've reached the end of the list.</span>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductGrid;
// 'use client';

// import React, { useState, useEffect, useRef } from 'react';
// import ProductCard from '@/components/shop/ProductCard';
// import { fetchProducts } from '@/services/productService';
// import { Product, ProductFilters } from '@/types';

// interface ProductGridProps {
//   filters: ProductFilters;
// }

// const ProductGrid = ({ filters }: ProductGridProps) => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [hasMore, setHasMore] = useState(true);
//   const [skip, setSkip] = useState(0);
//   const limit = 15;

//   const loaderRef = useRef<HTMLDivElement>(null);

//   // 1. Fetch Initial Data (Triggers on Mount OR when Filters change)
//   useEffect(() => {
//     const loadInitialProducts = async () => {
//       try {
//         setLoading(true);
//         setSkip(0); // Reset pagination
//         const initialData = await fetchProducts(0, limit, filters); // Pass filters here
//         setProducts(initialData);
//         setSkip(limit);
//         if (initialData.length < limit) setHasMore(false);
//         else setHasMore(true); // Reset hasMore if we got a full page
//       } catch (error) {
//         console.error("Failed to load initial products", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadInitialProducts();
//   }, [filters]); // Dependency on filters ensures refetch

//   // 2. Fetch More Function (For scrolling)
//   const loadMoreProducts = async () => {
//     if (loading || !hasMore) return;

//     try {
//       setLoading(true);
//       // Pass the CURRENT filters to the pagination call too
//       const moreData = await fetchProducts(skip, limit, filters);
      
//       if (moreData.length === 0) {
//         setHasMore(false);
//       } else {
//         setProducts((prev) => [...prev, ...moreData]);
//         setSkip((prev) => prev + limit);
//         if (moreData.length < limit) setHasMore(false);
//       }
//     } catch (error) {
//       console.error("Failed to load more products", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 3. Intersection Observer
//   useEffect(() => {
//     const observer = new IntersectionObserver((entries) => {
//       const target = entries[0];
//       if (target.isIntersecting && hasMore && !loading) {
//         loadMoreProducts();
//       }
//     }, { root: null, rootMargin: '200px', threshold: 0.1 });

//     if (loaderRef.current) observer.observe(loaderRef.current);
//     return () => { if (loaderRef.current) observer.unobserve(loaderRef.current); };
//   }, [hasMore, loading, skip, filters]); // Added filters to deps

//   return (
//     <div className="w-full max-w-[1296px] px-4 xl:px-0">
//       {products.length === 0 && !loading ? (
//         <div className="w-full py-20 text-center text-gray-500">No products found matching your filters.</div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-12 justify-items-center">
//           {products.map((product, index) => (
//             <ProductCard 
//               key={`${product.product_id}-${index}`} 
//               product={product} 
//             />
//           ))}
//         </div>
//       )}

//       <div ref={loaderRef} className="w-full flex justify-center py-8 h-20">
//         {loading && (
//           <div className="flex gap-2">
//             <div className="w-3 h-3 bg-[#013220] rounded-full animate-bounce"></div>
//             <div className="w-3 h-3 bg-[#013220] rounded-full animate-bounce delay-100"></div>
//             <div className="w-3 h-3 bg-[#013220] rounded-full animate-bounce delay-200"></div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductGrid;

// 'use client';

// import React, { useState, useEffect, useRef } from 'react';
// import ProductCard from '@/components/shop/ProductCard';
// import { fetchProducts } from '@/services/productService';
// import { Product, ProductFilters } from '@/types';

// interface ProductGridProps {
//   filters: ProductFilters;
// }

// const ProductGrid = ({ filters }: ProductGridProps) => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [hasMore, setHasMore] = useState(true);
//   const [skip, setSkip] = useState(0);
//   const limit = 15;

//   const loaderRef = useRef<HTMLDivElement>(null);

//   // 1. Fetch Initial Data
//   useEffect(() => {
//     const loadInitialProducts = async () => {
//       try {
//         setLoading(true);
//         setSkip(0); 
//         const initialData = await fetchProducts(0, limit, filters);
//         setProducts(initialData);
//         setSkip(limit);
//         if (initialData.length < limit) setHasMore(false);
//         else setHasMore(true);
//       } catch (error) {
//         console.error("Failed to load initial products", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadInitialProducts();
//   }, [filters]);

//   // 2. Fetch More Function
//   const loadMoreProducts = async () => {
//     if (loading || !hasMore) return;

//     try {
//       setLoading(true);
//       const moreData = await fetchProducts(skip, limit, filters);
      
//       if (moreData.length === 0) {
//         setHasMore(false);
//       } else {
//         setProducts((prev) => [...prev, ...moreData]);
//         setSkip((prev) => prev + limit);
//         if (moreData.length < limit) setHasMore(false);
//       }
//     } catch (error) {
//       console.error("Failed to load more products", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 3. Intersection Observer
//   useEffect(() => {
//     const observer = new IntersectionObserver((entries) => {
//       const target = entries[0];
//       if (target.isIntersecting && hasMore && !loading) {
//         loadMoreProducts();
//       }
//     }, { root: null, rootMargin: '200px', threshold: 0.1 });

//     if (loaderRef.current) observer.observe(loaderRef.current);
//     return () => { if (loaderRef.current) observer.unobserve(loaderRef.current); };
//   }, [hasMore, loading, skip, filters]);

//   return (
//     <div className="w-full max-w-[1296px] px-4 xl:px-0">
//       {products.length === 0 && !loading ? (
//         <div className="w-full py-20 text-center text-gray-500">No products found matching your filters.</div>
//       ) : (
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6 mb-12 justify-items-center">
//           {products.map((product, index) => (
//             <ProductCard 
//               key={`${product.product_id}-${index}`} 
//               product={product} 
//             />
//           ))}
//         </div>
//       )}

//       <div ref={loaderRef} className="w-full flex justify-center py-8 h-20">
//         {loading && (
//           <div className="flex gap-2">
//             <div className="w-3 h-3 bg-[#013220] rounded-full animate-bounce"></div>
//             <div className="w-3 h-3 bg-[#013220] rounded-full animate-bounce delay-100"></div>
//             <div className="w-3 h-3 bg-[#013220] rounded-full animate-bounce delay-200"></div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductGrid;
// src/components/shop/ProductGrid.tsx
'use client';

import React, { useEffect, useRef } from 'react'; // Removed useState
import ProductCard from '@/components/shop/ProductCard';
import { Product, ProductFilters } from '@/types';
import { useProducts } from '@/hooks/useProducts'; // [!code ++] Import custom hook

interface ProductGridProps {
  filters: ProductFilters;
}

const ProductGrid = ({ filters }: ProductGridProps) => {
  // [!code ++] Use the React Query Hook
  const { 
    data, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage, 
    isLoading,
    isError 
  } = useProducts(filters);

  const loaderRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for Infinite Scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      // Load more if visible, we have more pages, and we aren't currently fetching one
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }, { root: null, rootMargin: '200px', threshold: 0.1 });

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => { if (loaderRef.current) observer.unobserve(loaderRef.current); };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // --- Render Loading State (Initial Load) ---
  if (isLoading) {
    return (
      <div className="w-full flex justify-center py-20">
        <div className="flex gap-2">
            <div className="w-3 h-3 bg-[#013220] rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-[#013220] rounded-full animate-bounce delay-100"></div>
            <div className="w-3 h-3 bg-[#013220] rounded-full animate-bounce delay-200"></div>
        </div>
      </div>
    );
  }

  // --- Render Error State ---
  if (isError) {
    return <div className="w-full py-20 text-center text-red-500">Failed to load products.</div>;
  }

  // Flatten the pages into a single list
  const allProducts = data?.pages.flatMap(page => page) || [];

  return (
    <div className="w-full max-w-[1296px] px-4 xl:px-0">
      
      {/* Empty State */}
      {allProducts.length === 0 ? (
        <div className="w-full py-20 text-center text-gray-500">
            No products found matching your filters.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6 mb-12 justify-items-center">
          {allProducts.map((product, index) => (
            <ProductCard 
              // Using product_id + index as a fallback key strategy
              key={`${product.product_id}-${index}`} 
              product={product} 
            />
          ))}
        </div>
      )}

      {/* Bottom Loading Indicator */}
      <div ref={loaderRef} className="w-full flex justify-center py-8 h-20">
        {isFetchingNextPage && (
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-[#013220] rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-[#013220] rounded-full animate-bounce delay-100"></div>
            <div className="w-3 h-3 bg-[#013220] rounded-full animate-bounce delay-200"></div>
          </div>
        )}
        {!hasNextPage && allProducts.length > 0 && (
           <span className="text-gray-400 text-sm">You&apos;ve reached the end of the list.</span>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;