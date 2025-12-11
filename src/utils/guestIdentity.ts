export const GUEST_ID_KEY = 'guest-cart-id';

/**
 * Retrieves the existing guest UUID from localStorage,
 * or generates a new one if it doesn't exist.
 */
export const getOrSetGuestId = (): string => {
  // 1. Safety check for Server-Side Rendering (SSR)
  if (typeof window === 'undefined') {
    return '';
  }

  // 2. Try to get existing ID
  let guestId = localStorage.getItem(GUEST_ID_KEY);

  // 3. If no ID exists, generate a new one and save it
  if (!guestId) {
    // Use native crypto API for robust UUID generation
    guestId = crypto.randomUUID(); 
    localStorage.setItem(GUEST_ID_KEY, guestId);
  }

  return guestId;
};