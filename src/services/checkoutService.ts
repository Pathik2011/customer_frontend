// import { CartItem, CartSummary } from '@/context/CartContext';
// // import { API_CONFIG } from '@/config/apiConfig'; // 🟢 Import Config

// //const API_URL = API_CONFIG.ENDPOINTS.CHECKOUT; #use this url in production when order service transfer to Centralized API Gateway

// const API_URL = "https://qhn6j7iwlc.execute-api.ap-south-1.amazonaws.com/dev/checkout"

// export interface PaymentMethod {
//   method: string;
//   label: string;
//   discount_percent: string;
// }

// export interface ShippingOption {
//   type: string;
//   cost: number;
// }

// export interface ShippingAddress {
//   street: string;
//   village: string;
//   taluka: string | null;
//   district: string | null;
//   state: string | null;
//   pin_code: string | null;
// }

// export interface CheckoutUser {
//   full_name: string;
//   phone: string;
//   email: string;
//   village_name: string;
// }

// export interface CheckoutResponse {
//   user: CheckoutUser;
//   cart: {
//     items: CartItem[];
//     total_cart_items: number;
//     total_cart_price: number;
//     total_cart_discount: number;
//     final_cart_price: number;
//   };
//   payment_methods: PaymentMethod[];
//   shipping_options: ShippingOption[];
//   shipping_address: ShippingAddress;
//   summary: {
//     sub_total: number;
//     product_discounts_total: number;
//     payment_method_discount: number;
//     shipping_cost: number;
//     grand_total: number;
//   };
// }

// export const checkoutService = {
//   // [!code changed] Now accepts the Authorization Token
//   getCheckoutDetails: async (authToken: string): Promise<CheckoutResponse> => {
//     try {
//       const headers = {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${authToken}` // [!code highlight] Standard Bearer Token
//       };

//       const response = await fetch(API_URL, {
//         method: 'GET',
//         headers: headers,
//       });

//       if (!response.ok) {
//         // Handle 401 Unauthorized specifically if needed
//         if (response.status === 401) {
//              throw new Error("Session expired. Please login again.");
//         }
//         throw new Error(`Checkout API failed: ${response.status}`);
//       }

//       return await response.json();
//     } catch (error) {
//       console.error('Error fetching checkout details:', error);
//       throw error;
//     }
//   }
// };

import { CartItem } from '@/context/CartContext';
// import { API_CONFIG } from '@/config/apiConfig'; 

const API_URL = "https://qhn6j7iwlc.execute-api.ap-south-1.amazonaws.com/dev/checkout";
// [!code ++] Add your Create Order Endpoint here
const CREATE_ORDER_URL = "https://2ghxzeo1k9.execute-api.ap-south-1.amazonaws.com/dev/orchestrator/order/process"; 

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
  // 1. Get Details (Existing)
  getCheckoutDetails: async (authToken: string): Promise<CheckoutResponse> => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      };

      const response = await fetch(API_URL, {
        method: 'GET',
        headers: headers,
      });

      if (!response.ok) {
        if (response.status === 401) {
             throw new Error("Session expired. Please login again.");
        }
        throw new Error(`Checkout API failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching checkout details:', error);
      throw error;
    }
  },

  // [!code ++] 2. Create Order (New)
  // This handles the connection_id and idempotency_key for your WebSocket flow
  createOrder: async (
    authToken: string, 
    orderData: any, 
    connectionId: string, 
    idempotencyKey: string
  ) => {
    try {
      const response = await fetch(CREATE_ORDER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
          'x-connection-id': connectionId,     // [!code highlight] Link to WebSocket
          'x-idempotency-key': idempotencyKey  // [!code highlight] Prevent duplicates
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        throw new Error(`Order Creation Failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }
};