// src/utils/idempotency.ts

/**
 * Generates a deterministic SHA-256 hash based on checkout inputs.
 * If the user inputs the exact same data, this function returns the exact same string.
 * This allows the backend to detect "Page Refreshes" vs "New Orders".
 */
export async function generateIdempotencyKey(
  amount: number,
  method: string,
  orderType: 'pickup' | 'delivery',
  userDetails: {
    name: string;
    phone: string;
    village: string;
  },
  shippingAddressId?: string | number | null
): Promise<string> {

  // 1. Normalize Inputs
  const safeName = userDetails.name.trim().toLowerCase();
  const safePhone = userDetails.phone.trim();
  const safeVillage = userDetails.village.trim().toLowerCase();
  const safeMethod = method.trim();
  const safeAddress = shippingAddressId ? String(shippingAddressId) : 'null';

  // 2. Create the "Digital Fingerprint" String
  const rawString = `${amount}|${safeMethod}|${orderType}|${safeName}|${safePhone}|${safeVillage}|${safeAddress}`;

  // Debug Log
  console.log("🔐 Generating Hash from:", rawString);

  // 3. Hash it using Native Browser Crypto API (SHA-256)
  const encoder = new TextEncoder();
  const data = encoder.encode(rawString);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);

  // 4. Convert to Hex String
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  // [!code highlight] 5. TRUNCATE TO 32 CHARACTERS (Safe for Razorpay Receipt)
  // SHA-256 is 64 chars. Razorpay 'receipt' limit is 40.
  // 32 chars is perfectly safe and unique.
  return hashHex.substring(0, 32); 
}