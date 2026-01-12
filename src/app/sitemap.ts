import { MetadataRoute } from 'next';
import { fetchProducts } from '@/services/productService';

// Define your Production Domain explicitly
const BASE_URL = 'https://sapanafertilizer.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. SECURITY CHECK: If this is DEV, return an empty list.
  // Google won't find anything to index.
  if (process.env.NEXT_PUBLIC_ENVIRONMENT === 'dev') {
    return [];
  }

  // 2. Define Static Pages (Pages that always exist)
  const staticRoutes = [
    '',          // Homepage
    '/shop',     // Shop Page
         // Bag (Optional, but usually okay)
    // Add '/about', '/contact' if you have them
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // 3. Dynamic Products (Fetch from your API)
  let productRoutes: MetadataRoute.Sitemap = [];

  try {
    // Fetch a large batch of products (e.g., 1000). 
    // Ideally, your API should have a lightweight "getAllIds" endpoint, 
    // but this works for now with your existing service.
    const products = await fetchProducts(0, 1000, {
        categories: [], 
        brands: [], 
        crops: [], 
        searchTerm: ''
    });
    
    productRoutes = products.map((product) => ({
      url: `${BASE_URL}/shop/${product.product_id}`,
      lastModified: new Date(), // Or use product.updated_at if available
      changeFrequency: 'weekly' as const,
      priority: 0.9, // High priority for products
    }));
    
    console.log(`✅ [Sitemap] Generated URLs for ${products.length} products.`);

  } catch (error) {
    console.error("❌ [Sitemap] Failed to fetch products:", error);
    // Even if API fails, we return the static routes so the homepage is still indexed
  }

  // 4. Combine and Return
  return [...staticRoutes, ...productRoutes];
}