import { apiClient } from '@/lib/api';
import { Brand, BrandsResponse } from '@/types/brand';

export const brandService = {
  // Get all brands
  async getBrands(): Promise<BrandsResponse> {
    return apiClient.get<BrandsResponse>('/brands');
  },

  // Get featured brands
  async getFeaturedBrands(): Promise<Brand[]> {
    return apiClient.get<Brand[]>('/brands/featured');
  },

  // Get single brand
  async getBrand(id: number): Promise<Brand> {
    return apiClient.get<Brand>(`/brands/${id}`);
  },

  // Get brand by slug
  async getBrandBySlug(slug: string): Promise<Brand> {
    return apiClient.get<Brand>(`/brands/slug/${slug}`);
  },
};