import { getOrSetGuestId } from '@/utils/guestIdentity';

const API_BASE_URL = 'https://zko23b3pf4.execute-api.ap-south-1.amazonaws.com/dev';
const CART_URL = `${API_BASE_URL}/cart`;
export const cartService = {
  /**
   * Adds items to the cart (Delta quantity).
   * Uses POST /cart
   */
  addToCart: async (variantId: number, quantity: number = 1) => {
    const guestId = getOrSetGuestId();

    try {
      const response = await fetch(`${API_BASE_URL}/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'guest-cart-id': guestId,
        },
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
   * Uses DELETE /cart?product_variant_id=...
   */
  removeFromCart: async (variantId: number) => {
    const guestId = getOrSetGuestId();

    try {
      const response = await fetch(`${API_BASE_URL}/cart?product_variant_id=${variantId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'guest-cart-id': guestId,
        },
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
   * Uses GET /cart
   */
  fetchCart: async () => {
    const guestId = getOrSetGuestId();

    try {
      const response = await fetch(`${API_BASE_URL}/cart`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'guest-cart-id': guestId,
        },
      });

      if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Cart API Error (Fetch):', error);
      throw error;
    }
  }
};
export const mergeCart = async (customerId: string, guestId: string): Promise<void> => {
  console.log("---------------------------------------------");
  console.log("🛒 [cartService] mergeCart() STARTING...");

  try {
    const response = await fetch(`${CART_URL}/merge`, {
      method: 'POST',
      keepalive: true, // Ensures request survives page reload
      headers: {
        'Content-Type': 'application/json',
        'customer-id': customerId,
        'guest-cart-id': guestId,
      },
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      // [!code changed] READ THE SERVER ERROR MESSAGE
      const errorText = await response.text(); 
      console.error("   ❌ [cartService] Merge API FAILED. Status:", response.status);
      console.error("   ❌ [cartService] Server Message:", errorText);
      
      // Pass this message up so AuthContext can save it to LocalStorage
      throw new Error(`Server responded ${response.status}: ${errorText}`);
    }

    console.log("   ✅ [cartService] Merge API SUCCESS!");
    console.log("---------------------------------------------");

  } catch (error) {
    console.error('   ❌ [cartService] Network/Logic Error in mergeCart:', error);
    throw error;
  }
};