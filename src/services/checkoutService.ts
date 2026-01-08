import { CartItem, CartSummary } from '@/context/CartContext';
import { API_CONFIG } from '@/config/apiConfig'; // 🟢 Import Config

const API_URL = API_CONFIG.ENDPOINTS.CHECKOUT;

// Types for the Checkout API Response
export interface PaymentMethod {
  method: string;
  label: string;
  discount_percent: string;
}

export interface ShippingOption {
  type: string;
  cost: number;
}

export interface ShippingAddress {
  street: string;
  village: string;
  taluka: string | null;
  district: string | null;
  state: string | null;
  pin_code: string | null;
}

export interface CheckoutUser {
  full_name: string;
  phone: string;
  email: string;
  village_name: string;
}

export interface CheckoutResponse {
  user: CheckoutUser;
  cart: {
    items: CartItem[];
    total_cart_items: number;
    total_cart_price: number;
    total_cart_discount: number;
    final_cart_price: number;
  };
  payment_methods: PaymentMethod[];
  shipping_options: ShippingOption[];
  shipping_address: ShippingAddress;
  summary: {
    sub_total: number;
    product_discounts_total: number;
    payment_method_discount: number;
    shipping_cost: number;
    grand_total: number;
  };
}

export const checkoutService = {
  getCheckoutDetails: async (): Promise<CheckoutResponse> => {
    try {
      // Hardcoded customer-id as requested
      const headers = {
        'Content-Type': 'application/json',
        'customer-id': '2', 
      };

      const response = await fetch(API_URL, {
        method: 'GET',
        headers: headers,
      });

      if (!response.ok) {
        throw new Error(`Checkout API failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching checkout details:', error);
      throw error;
    }
  }
};