// src/services/filterService.ts
import { FilterApiResponse } from '@/types';

// Use env variable if available, otherwise default to the dev URL
const API_HOST = process.env.NEXT_PUBLIC_PRODUCT_API_URL || 'https://6jk2hyyxsl.execute-api.ap-south-1.amazonaws.com/dev';
// Construct the full URL using the base host
const API_URL = `${API_HOST}/products/list-for-search-dropdown`;

export const fetchFilterOptions = async (): Promise<FilterApiResponse> => {
  try {
    // In Next.js 13+, you can configure caching here if needed
    // e.g. { next: { revalidate: 3600 } } for 1 hour cache
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Failed to fetch filters: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching filter options:', error);
    throw error;
  }
};