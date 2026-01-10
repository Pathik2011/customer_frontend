// // import { getOrSetGuestId } from '@/utils/guestIdentity';

// // const API_BASE_URL = 'https://zko23b3pf4.execute-api.ap-south-1.amazonaws.com/dev';
// // const CART_URL = `https://6jk2hyyxsl.execute-api.ap-south-1.amazonaws.com/dev/cart`;
// // export const cartService = {
// //   /**
// //    * Adds items to the cart (Delta quantity).
// //    * Uses POST /cart
// //    */
// //   addToCart: async (variantId: number, quantity: number = 1) => {
// //     const guestId = getOrSetGuestId();

// //     try {
// //       const response = await fetch(`${API_BASE_URL}/cart`, {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           'guest-cart-id': guestId,
// //         },
// //         body: JSON.stringify({
// //           product_variant_id: variantId,
// //           quantity: quantity,
// //         }),
// //       });

// //       if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
// //       return await response.json();
// //     } catch (error) {
// //       console.error('Cart API Error (Add):', error);
// //       throw error;
// //     }
// //   },

// //   /**
// //    * Removes an item from the cart.
// //    * Uses DELETE /cart?product_variant_id=...
// //    */
// //   removeFromCart: async (variantId: number) => {
// //     const guestId = getOrSetGuestId();

// //     try {
// //       const response = await fetch(`${API_BASE_URL}/cart?product_variant_id=${variantId}`, {
// //         method: 'DELETE',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           'guest-cart-id': guestId,
// //         },
// //       });

// //       if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
// //       return await response.json();
// //     } catch (error) {
// //       console.error('Cart API Error (Remove):', error);
// //       throw error;
// //     }
// //   },

// //   /**
// //    * Fetches the current cart state.
// //    * Uses GET /cart
// //    */
// //   fetchCart: async () => {
// //     const guestId = getOrSetGuestId();

// //     try {
// //       const response = await fetch(`${API_BASE_URL}/cart`, {
// //         method: 'GET',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           'guest-cart-id': guestId,
// //         },
// //       });

// //       if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
// //       return await response.json();
// //     } catch (error) {
// //       console.error('Cart API Error (Fetch):', error);
// //       throw error;
// //     }
// //   }
// // };
// // export const mergeCart = async (idToken: string, guestId: string): Promise<void> => {
// //   console.log("🛒 [cartService] mergeCart() STARTING...");

// //   try {
// //     const response = await fetch(`${CART_URL}/merge`, {
// //       method: 'POST',
// //       keepalive: true,
// //       headers: {
// //         'Content-Type': 'application/json',
// //         'Authorization': `Bearer ${idToken}`, // Correct Header for API Gateway
// //         'guest-cart-id': guestId,
// //       },
// //       body: JSON.stringify({}), 
// //     });

// //     if (!response.ok) {
// //       const errorText = await response.text();
// //       console.error("   ❌ [cartService] Merge Failed:", errorText);
// //       throw new Error(errorText);
// //     }

// //     console.log("   ✅ [cartService] Merge API SUCCESS!");

// //   } catch (error) {
// //     console.error('   ❌ [cartService] Network/Logic Error:', error);
// //     throw error;
// //   }
// // }
// import { fetchAuthSession } from 'aws-amplify/auth';
// import { getOrSetGuestId } from '@/utils/guestIdentity';

// // 1. URL for General Cart Operations (Add/Remove/Get)
// const API_BASE_URL = 'https://zko23b3pf4.execute-api.ap-south-1.amazonaws.com/dev';

// // 2. URL specifically for Merge Cart (As you requested)
// const CART_URL = `https://6jk2hyyxsl.execute-api.ap-south-1.amazonaws.com/dev/cart`;

// // --- HELPER: Decide if we are "User" or "Guest" ---
// const getAuthHeaders = async () => {
//   try {
//     // Try to get the logged-in User Token
//     const session = await fetchAuthSession();
//     const idToken = session.tokens?.idToken?.toString();

//     if (idToken) {
//       console.log("🛒 [cartService] Using USER Identity (Bearer Token)");
//       return { 
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${idToken}` 
//       };
//     }
//   } catch (e) {
//     // Not logged in? No problem. Fall through to Guest check.
//   }

//   // Fallback: Use Guest ID
//   const guestId = getOrSetGuestId();
//   console.log("🛒 [cartService] Using GUEST Identity:", guestId);
//   return { 
//     'Content-Type': 'application/json',
//     'guest-cart-id': guestId 
//   };
// };

// export const cartService = {
//   /**
//    * Adds items to the cart.
//    * Uses POST {API_BASE_URL}/cart
//    */
//   addToCart: async (variantId: number, quantity: number = 1) => {
//     try {
//       const headers = await getAuthHeaders(); // <--- DYNAMIC HEADERS

//       const response = await fetch(`${API_BASE_URL}/cart`, {
//         method: 'POST',
//         headers: headers,
//         body: JSON.stringify({
//           product_variant_id: variantId,
//           quantity: quantity,
//         }),
//       });

//       if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
//       return await response.json();
//     } catch (error) {
//       console.error('Cart API Error (Add):', error);
//       throw error;
//     }
//   },

//   /**
//    * Removes an item from the cart.
//    * Uses DELETE {API_BASE_URL}/cart?product_variant_id=...
//    */
//   removeFromCart: async (variantId: number) => {
//     try {
//       const headers = await getAuthHeaders(); // <--- DYNAMIC HEADERS

//       const response = await fetch(`${API_BASE_URL}/cart?product_variant_id=${variantId}`, {
//         method: 'DELETE',
//         headers: headers,
//       });

//       if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
//       return await response.json();
//     } catch (error) {
//       console.error('Cart API Error (Remove):', error);
//       throw error;
//     }
//   },

//   /**
//    * Fetches the current cart state.
//    * Uses GET {API_BASE_URL}/cart
//    */
//   fetchCart: async () => {
//     try {
//       const headers = await getAuthHeaders(); // <--- DYNAMIC HEADERS

//       const response = await fetch(`${API_BASE_URL}/cart`, {
//         method: 'GET',
//         headers: headers,
//       });

//       if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
//       return await response.json();
//     } catch (error) {
//       console.error('Cart API Error (Fetch):', error);
//       throw error;
//     }
//   }
// };

// /**
//  * Merges Guest Cart into User Cart.
//  * Uses POST {CART_URL}/merge
//  */
// export const mergeCart = async (idToken: string, guestId: string): Promise<any> => {
//   try {
//     const response = await fetch(`${CART_URL}/merge`, {
//       method: 'POST',
//       keepalive: true,
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${idToken}`, 
//         'guest-cart-id': guestId,
//       },
//       body: JSON.stringify({}), 
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(errorText);
//     }

//     // [!code ++] Return the data so we can use "total_cart_items"
//     return await response.json(); 

//   } catch (error) {
//     console.error('Cart Merge Error:', error);
//     throw error;
//   }
// };
import { fetchAuthSession } from 'aws-amplify/auth';
import { getOrSetGuestId } from '@/utils/guestIdentity';
import { API_CONFIG } from '@/config/apiConfig'; // 🟢 Import the Central Config

// --- HELPER: Decide if we are "User" or "Guest" ---
// This determines if we send an Authorization token (User) or a guest-cart-id (Guest)
const getAuthHeaders = async () => {
  try {
    // Try to get the logged-in User Token
    const session = await fetchAuthSession();
    const idToken = session.tokens?.idToken?.toString();

    if (idToken) {
      console.log("🛒 [cartService] Using USER Identity (Bearer Token)");
      return { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}` 
      };
    }
  } catch (e) {
    // Not logged in? No problem. Fall through to Guest check.
  }

  // Fallback: Use Guest ID
  const guestId = getOrSetGuestId();
  console.log("🛒 [cartService] Using GUEST Identity:", guestId);
  return { 
    'Content-Type': 'application/json',
    'guest-cart-id': guestId 
  };
};

export const cartService = {
  /**
   * Adds items to the cart.
   * Uses POST to API_CONFIG.ENDPOINTS.CART
   */
  addToCart: async (variantId: number, quantity: number = 1) => {
    try {
      const headers = await getAuthHeaders(); 

      // 🟢 USE CONFIG: Uses the dynamic URL injected by Terraform/Amplify
      const response = await fetch(API_CONFIG.ENDPOINTS.CART, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          product_variant_id: variantId,
          quantity: quantity,
        }),
      });

      if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Cart API Error (Add):', error);
      throw error;
    }
  },

  /**
   * Removes an item from the cart.
   * Uses DELETE to API_CONFIG.ENDPOINTS.CART
   */
  removeFromCart: async (variantId: number) => {
    try {
      const headers = await getAuthHeaders();

      // 🟢 USE CONFIG
      const response = await fetch(`${API_CONFIG.ENDPOINTS.CART}?product_variant_id=${variantId}`, {
        method: 'DELETE',
        headers: headers,
      });

      if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Cart API Error (Remove):', error);
      throw error;
    }
  },

  /**
   * Fetches the current cart state.
   * Uses GET to API_CONFIG.ENDPOINTS.CART
   */
  fetchCart: async () => {
    try {
      const headers = await getAuthHeaders();

      // 🟢 USE CONFIG
      const response = await fetch(API_CONFIG.ENDPOINTS.CART, {
        method: 'GET',
        headers: headers,
      });

      if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Cart API Error (Fetch):', error);
      throw error;
    }
  }
};

/**
 * Merges Guest Cart into User Cart.
 * Uses POST to API_CONFIG.ENDPOINTS.MERGE_CART
 */
export const mergeCart = async (idToken: string, guestId: string): Promise<any> => {
  try {
    // 🟢 USE CONFIG: This resolves to ".../cart/merge" automatically
    const response = await fetch(API_CONFIG.ENDPOINTS.MERGE_CART, {
      method: 'POST',
      keepalive: true,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`, 
        'guest-cart-id': guestId,
      },
      body: JSON.stringify({}), 
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    return await response.json(); 

  } catch (error) {
    console.error('Cart Merge Error:', error);
    throw error;
  }
};