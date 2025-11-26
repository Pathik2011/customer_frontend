# API Services Documentation

## Overview

This project uses a clean and simple API structure with Axios for making HTTP requests. All API calls return a standardized response format for easy error handling.

## Structure

```
src/
├── lib/
│   └── axios.ts          # Axios instance with interceptors
├── config/
│   └── api.ts            # API endpoints configuration
├── services/
│   └── homepageService.ts # Homepage API calls
└── store/
    └── useHomepageStore.ts # Zustand store for state management
```

## API Response Format

All API calls return a consistent response format:

```typescript
interface ApiResponse<T> {
  success: boolean;  // true if request succeeded
  res?: T;          // response data (only present on success)
  error?: string;   // error message (only present on failure)
}
```

## Usage Examples

### 1. Client-Side (React Components)

```typescript
'use client';
import { useEffect } from 'react';
import { useHomepageStore } from '@/store/useHomepageStore';

export default function MyComponent() {
  const { brands, loadingStates, errorStates, fetchBrands } = useHomepageStore();

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  if (loadingStates.brands) return <div>Loading...</div>;
  if (errorStates.brands) return <div>Error: {errorStates.brands}</div>;

  return (
    <div>
      {brands?.items.map(brand => (
        <div key={brand.brand_id}>{brand.brand_name}</div>
      ))}
    </div>
  );
}
```

### 2. Server-Side (Next.js Server Components)

```typescript
import { homepageService } from '@/services/homepageService';

export default async function HomePage() {
  const response = await homepageService.getTopSection();

  if (!response.success) {
    return <div>Error: {response.error}</div>;
  }

  const data = response.res;

  return (
    <div>
      <h1>{data.brand.display_title}</h1>
      {data.brand.items.map(brand => (
        <div key={brand.brand_id}>{brand.brand_name}</div>
      ))}
    </div>
  );
}
```

### 3. Direct API Service Call

```typescript
import { homepageService } from '@/services/homepageService';

async function fetchData() {
  const response = await homepageService.getTopSection();
  
  if (response.success) {
    console.log('Data:', response.res);
  } else {
    console.error('Error:', response.error);
  }
}
```

## Adding New API Endpoints

### Step 1: Add endpoint to config

```typescript
// src/config/api.ts
export const API_ENDPOINTS = {
  products: {
    base: 'https://api.example.com',
    list: '/products',
    detail: (id: string) => `/products/${id}`,
  },
};
```

### Step 2: Create service

```typescript
// src/services/productService.ts
import axiosInstance, { apiCall, ApiResponse } from '@/lib/axios';
import { API_ENDPOINTS } from '@/config/api';

export const productService = {
  async getProducts(): Promise<ApiResponse<Product[]>> {
    const url = `${API_ENDPOINTS.products.base}${API_ENDPOINTS.products.list}`;
    return apiCall<Product[]>(() => axiosInstance.get(url));
  },

  async getProductById(id: string): Promise<ApiResponse<Product>> {
    const url = `${API_ENDPOINTS.products.base}${API_ENDPOINTS.products.detail(id)}`;
    return apiCall<Product>(() => axiosInstance.get(url));
  },
};
```

### Step 3: Use in components

```typescript
const response = await productService.getProducts();

if (response.success) {
  // Use response.res
} else {
  // Handle response.error
}
```

## Error Handling

Errors are automatically caught and formatted by the Axios interceptor:

- **Network errors**: "Network error. Please check your connection."
- **401**: "Unauthorized. Please login again."
- **403**: "Access forbidden."
- **404**: "Resource not found."
- **500+**: "Server error. Please try again later."

## Request/Response Interceptors

The Axios instance includes interceptors for:

- **Request logging**: Logs all outgoing requests
- **Error handling**: Catches and formats all errors
- **Auth tokens**: Add authentication headers (commented out, uncomment when needed)

```typescript
// To add auth token:
// In src/lib/axios.ts, uncomment:
const token = localStorage.getItem('token');
if (token) {
  config.headers.Authorization = `Bearer ${token}`;
}
```

## Benefits

1. **Clean & Simple**: Easy to understand and maintain
2. **Consistent**: All API calls follow the same pattern
3. **Type-Safe**: Full TypeScript support
4. **Error Handling**: Centralized error management
5. **Debugging**: Request/response logging built-in
6. **Flexible**: Works with both client and server components
