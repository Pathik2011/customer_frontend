

// export const QUERY_CONFIG = {
//   // Navigation (Categories/Brands) - Rarely changes
//   NAVIGATION: {
//     STALE_TIME: 1000 * 60 * 25,//Infinity, 
//     GC_TIME: 1000 * 60 * 30, 
//   },

//   // Product Lists
//   PRODUCTS: {
//     STALE_TIME: 1000 * 60 * 25, // 25 Minutes (Fixed comment typo from previous code)
//     GC_TIME: 1000 * 60 * 30,   
//     PAGE_SIZE: 15,
//   },

//   // [!code ++] HOME PAGE SETTINGS
//   HOME: {
//     // Server-side Cache (Next.js 'revalidate')
//     // How often the server checks for new data from your backend
//     REVALIDATE_TIME: 60 , // 1 Hour (3600 seconds)

//     // Client-side Cache (React Query 'staleTime')
//     // How long the browser waits before refetching in the background
//     STALE_TIME: 1000 * 60 * 25, // 25 minutes
//   },

//   // User/Cart - Always volatile
//   USER: {
//     STALE_TIME: 0, 
//   }
// } as const;
export const QUERY_CONFIG = {
  // Navigation (Categories/Brands) - Rarely changes
  NAVIGATION: {
    STALE_TIME: 1000 * 60 * 25, 
    GC_TIME: 1000 * 60 * 30, 
    REVALIDATE_TIME: 60 * 60 * 24, 
  },

  // Product Lists
  PRODUCTS: {
    STALE_TIME: 1000 * 60 * 25, 
    GC_TIME: 1000 * 60 * 30,   
    PAGE_SIZE: 15,
    REVALIDATE_TIME: 300,
  },

  // [!code ++] ADD THIS SECTION FOR FILTERS
  FILTERS: {
    // Server Cache: 24 Hours (86400 seconds)
    // Amplify will reuse the JSON file for a full day.
    REVALIDATE_TIME: 60 * 60 * 24, 
    
    // Client Cache: 1 Hour
    STALE_TIME: 1000 * 60 * 60, 

    // Garbage Collection: Keep in memory for 24 Hours (even if unused)
    GC_TIME: 1000 * 60 * 60 * 24,
  },

  // HOME PAGE SETTINGS
  HOME: {
    //REVALIDATE_TIME: 60 * 60, // 1 Hour
    //REVALIDATE_TIME: 60 , // 60 seconds
    STALE_TIME: 1000 * 60 * 25, 
  },

  // User/Cart - Always volatile
  USER: {
    STALE_TIME: 0, 
  }
} as const;