
import { Product, ProductDetail, ProductFilters } from '@/types';
import { QUERY_CONFIG } from '@/config/queryConfig';
import { API_CONFIG } from '@/config/apiConfig';

const PRODUCTS_URL = API_CONFIG.ENDPOINTS.PRODUCTS;
const RECOMMENDATIONS_URL = API_CONFIG.ENDPOINTS.RECOMMENDATIONS;

// --- Fetch List ---
export const fetchProducts = async (
  skip: number = 0, 
  limit: number = 15, 
  filters?: ProductFilters
): Promise<Product[]> => {
  console.log(`⚡ [API Call] GET /products | Filters:`, filters ? JSON.stringify(filters) : "None");
  try {
    const url = new URL(PRODUCTS_URL);
    
    // 1. Core Params (DO NOT REMOVE)
    url.searchParams.append('is_card_view', 'true');
    url.searchParams.append('skip', skip.toString());
    url.searchParams.append('limit', limit.toString());

    // 2. Filter Params
    if (filters) {
      // Arrays
      if (filters.categories) filters.categories.forEach(cat => url.searchParams.append('category', cat));
      if (filters.brands) filters.brands.forEach(brand => url.searchParams.append('brand', brand));
      if (filters.crops) filters.crops.forEach(crop => url.searchParams.append('crop', crop));
      
      // Price
      if (filters.minPrice !== undefined) url.searchParams.append('min_price', filters.minPrice.toString());
      if (filters.maxPrice !== undefined) url.searchParams.append('max_price', filters.maxPrice.toString());
      
      // [!code ++] NEW: Pack Size Filters
      if (filters.size !== undefined) url.searchParams.append('size', filters.size.toString());
      if (filters.uom) url.searchParams.append('uom', filters.uom);
      if (filters.sortBy) url.searchParams.append('sort_by', filters.sortBy);
      // Search
      if (filters.searchTerm) url.searchParams.append('search_term', filters.searchTerm);
    }

    // 3. Fetch with Server Cache (ISR)
    const response = await fetch(url.toString(), {
      next: { revalidate: QUERY_CONFIG.PRODUCTS.REVALIDATE_TIME }
    });
    
    if (!response.ok) throw new Error(`Failed to fetch products: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error in productService (list):', error);
    throw error;
  }
};

// --- Fetch Details ---
export const fetchProductById = async (id: string): Promise<ProductDetail> => {
  try {
    const url = `${PRODUCTS_URL}/${id}`;
    
    const response = await fetch(url, {
      next: { revalidate: QUERY_CONFIG.PRODUCTS.REVALIDATE_TIME }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch product details: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in productService (detail):', error);
    throw error;
  }
};

// --- Fetch Similar Products ---
export const fetchSimilarProducts = async (productId: number | string): Promise<Product[]> => {
  try {
    const url = `${PRODUCTS_URL}/${productId}/similar`;
    
    const response = await fetch(url, {
      next: { revalidate: QUERY_CONFIG.PRODUCTS.REVALIDATE_TIME }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch similar products: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in productService (similar):', error);
    return [];
  }
};

// --- Fetch Recommendations ---
export const fetchRecommendations = async (productIds: number[]): Promise<Product[]> => {
  try {
    const url = `${RECOMMENDATIONS_URL}?is_card_view=true`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product_ids: productIds,
        limit: 4 
      }),
      // POST not cached by default
    });

    if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
    const data = await response.json();
    return data.recommended_products || [];
  } catch (error) {
    console.error('Product API Error (Recommendations):', error);
    return [];
  }
};