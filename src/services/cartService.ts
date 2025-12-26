import { getOrSetGuestId } from '@/utils/guestIdentity';

const API_BASE_URL = 'https://zko23b3pf4.execute-api.ap-south-1.amazonaws.com/dev';
const CART_URL = `https://6jk2hyyxsl.execute-api.ap-south-1.amazonaws.com/dev/cart`;
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
export const mergeCart = async (idToken: string, guestId: string): Promise<void> => {
  console.log("🛒 [cartService] mergeCart() STARTING...");

  try {
    const response = await fetch(`${CART_URL}/merge`, {
      method: 'POST',
      keepalive: true,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`, // Correct Header for API Gateway
        'guest-cart-id': guestId,
      },
      body: JSON.stringify({}), 
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("   ❌ [cartService] Merge Failed:", errorText);
      throw new Error(errorText);
    }

    console.log("   ✅ [cartService] Merge API SUCCESS!");

  } catch (error) {
    console.error('   ❌ [cartService] Network/Logic Error:', error);
    throw error;
  }
}