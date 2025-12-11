
import { Product, ProductDetail, ProductFilters } from '@/types';
// [!code --] Removed unused import: getOrSetGuestId

// Base Host (Product Service)
// const API_HOST = 'https://6jk2hyyxsl.execute-api.ap-south-1.amazonaws.com/dev';
const API_HOST = process.env.NEXT_PUBLIC_PRODUCT_API_URL
// Existing endpoint
const PRODUCTS_URL = `${API_HOST}/products`;

// New endpoint for recommendations
const RECOMMENDATIONS_URL = `${API_HOST}/products/cart/recommendations`;

// --- Fetch List (Existing) ---
export const fetchProducts = async (
  skip: number = 0, 
  limit: number = 15, 
  filters?: ProductFilters
): Promise<Product[]> => {
  try {
    const url = new URL(PRODUCTS_URL);
    url.searchParams.append('is_card_view', 'true');
    url.searchParams.append('skip', skip.toString());
    url.searchParams.append('limit', limit.toString());

    if (filters) {
      if (filters.categories) filters.categories.forEach(cat => url.searchParams.append('category', cat));
      if (filters.brands) filters.brands.forEach(brand => url.searchParams.append('brand', brand));
      if (filters.crops) filters.crops.forEach(crop => url.searchParams.append('crop', crop));
      if (filters.minPrice !== undefined) url.searchParams.append('min_price', filters.minPrice.toString());
      if (filters.maxPrice !== undefined) url.searchParams.append('max_price', filters.maxPrice.toString());
    }

    const response = await fetch(url.toString());
    if (!response.ok) throw new Error(`Failed to fetch products: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error in productService (list):', error);
    throw error;
  }
};

// --- Fetch Details (Existing) ---
export const fetchProductById = async (id: string): Promise<ProductDetail> => {
  try {
    const url = `${PRODUCTS_URL}/${id}`;
    const response = await fetch(url);

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

// --- Fetch Similar Products (Existing) ---
export const fetchSimilarProducts = async (productId: number | string): Promise<Product[]> => {
  try {
    const url = `${PRODUCTS_URL}/${productId}/similar`;
    const response = await fetch(url);

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

// --- Fetch Crop-Based Recommendations (Fixed) ---
export const fetchRecommendations = async (productIds: number[]): Promise<Product[]> => {
  // [!code --] Removed: const guestId = getOrSetGuestId();

  try {
    const url = `${RECOMMENDATIONS_URL}?is_card_view=true`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // [!code --] Removed: 'guest-cart-id': guestId, 
      },
      body: JSON.stringify({
        product_ids: productIds,
        limit: 4 
      }),
    });

    if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
    const data = await response.json();
    return data.recommended_products || [];
  } catch (error) {
    console.error('Product API Error (Recommendations):', error);
    return [];
  }
};