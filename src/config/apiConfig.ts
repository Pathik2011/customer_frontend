// 1. Get the URL from the environment (injected by Amplify)
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// 2. Safety Check: Throw error if missing (helps debugging)
if (!API_URL) {
  console.warn("⚠️ NEXT_PUBLIC_API_URL is missing. Using localhost or crashing.");
}

// 3. Export clean URLs
export const API_CONFIG = {
  BASE_URL: API_URL || 'http://localhost:3000', // Fallback for local dev
  ENDPOINTS: {
    CART: `${API_URL}/cart`,
    PRODUCTS: `${API_URL}/products`,
    RECOMMENDATIONS: `${API_URL}/products/cart/recommendations`,
    MERGE_CART: `${API_URL}/cart/merge`,
    FILTERS: `${API_URL}/products/list-for-search-dropdown`,
    CUSTOMERS: `${API_URL}/customers`,
    CHECKOUT: `${API_URL}/checkout`,
    HOME_TOP: `${API_URL}/user/homepage/sections/top`,
    HOME_MID: `${API_URL}/user/homepage/sections/mid`,
    HOME_BOTTOM: `${API_URL}/user/homepage/sections/bottom`,
  }
};