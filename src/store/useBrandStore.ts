import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Brand } from '@/types/brand';
import { LoadingState } from '@/types/api';
import { brandService } from '@/services';

interface BrandStore extends LoadingState {
  // State
  brands: Brand[];
  featuredBrands: Brand[];
  currentBrand: Brand | null;

  // Actions
  setBrands: (brands: Brand[]) => void;
  setFeaturedBrands: (brands: Brand[]) => void;
  setCurrentBrand: (brand: Brand | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // API Actions
  fetchBrands: () => Promise<void>;
  fetchFeaturedBrands: () => Promise<void>;
  fetchBrand: (id: number) => Promise<void>;
  fetchBrandBySlug: (slug: string) => Promise<void>;
}

export const useBrandStore = create<BrandStore>()(
  devtools(
    (set) => ({
      // Initial State
      brands: [],
      featuredBrands: [],
      currentBrand: null,
      isLoading: false,
      error: null,

      // Basic Actions
      setBrands: (brands) => set({ brands }),
      setFeaturedBrands: (featuredBrands) => set({ featuredBrands }),
      setCurrentBrand: (currentBrand) => set({ currentBrand }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),

      // API Actions
      fetchBrands: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await brandService.getBrands();
          set({ brands: response.brands, isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to fetch brands',
            isLoading: false,
          });
        }
      },

      fetchFeaturedBrands: async () => {
        set({ isLoading: true, error: null });
        try {
          const brands = await brandService.getFeaturedBrands();
          set({ featuredBrands: brands, isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to fetch featured brands',
            isLoading: false,
          });
        }
      },

      fetchBrand: async (id) => {
        set({ isLoading: true, error: null });
        try {
          const brand = await brandService.getBrand(id);
          set({ currentBrand: brand, isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to fetch brand',
            isLoading: false,
          });
        }
      },

      fetchBrandBySlug: async (slug) => {
        set({ isLoading: true, error: null });
        try {
          const brand = await brandService.getBrandBySlug(slug);
          set({ currentBrand: brand, isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Failed to fetch brand',
            isLoading: false,
          });
        }
      },
    }),
    {
      name: 'brand-store',
    }
  )
);