

export const QUERY_CONFIG = {
  // Navigation (Categories/Brands) - Rarely changes
  NAVIGATION: {
    STALE_TIME: 1000 * 60 * 25,//Infinity, 
    GC_TIME: 1000 * 60 * 30, 
  },

  // Product Lists
  PRODUCTS: {
    STALE_TIME: 1000 * 60 * 25, // 25 Minutes (Fixed comment typo from previous code)
    GC_TIME: 1000 * 60 * 30,   
    PAGE_SIZE: 15,
  },

  // [!code ++] HOME PAGE SETTINGS
  HOME: {
    // Server-side Cache (Next.js 'revalidate')
    // How often the server checks for new data from your backend
    REVALIDATE_TIME: 60 , // 1 Hour (3600 seconds)

    // Client-side Cache (React Query 'staleTime')
    // How long the browser waits before refetching in the background
    STALE_TIME: 1000 * 60 * 25, // 25 minutes
  },

  // User/Cart - Always volatile
  USER: {
    STALE_TIME: 0, 
  }
} as const;