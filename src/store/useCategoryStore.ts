import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Category } from "@/types/category";
import { LoadingState } from "@/types/api";
import { categoryService } from "@/services";

interface CategoryStore extends LoadingState {
  // State
  categories: Category[];
  flatCategories: Category[];
  featuredCategories: Category[];
  currentCategory: Category | null;
  brands: Array<{ brand_id: number; brand_name: string }>;
  crops: Array<{ crop_id: number; crop_name: string }>;

  // Actions
  setCategories: (categories: Category[]) => void;
  setFlatCategories: (categories: Category[]) => void;
  setFeaturedCategories: (categories: Category[]) => void;
  setCurrentCategory: (category: Category | null) => void;
  setBrands: (brands: Array<{ brand_id: number; brand_name: string }>) => void;
  setCrops: (crops: Array<{ crop_id: number; crop_name: string }>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // API Actions
  fetchCategories: () => Promise<void>;
  fetchFeaturedCategories: () => Promise<void>;
  fetchCategory: (id: number) => Promise<void>;
  fetchCategoryByName: (name: string) => Promise<void>;
  fetchCategoriesBrandsAndCrops: () => Promise<void>;
}

export const useCategoryStore = create<CategoryStore>()(
  devtools(
    (set, get) => ({
      // Initial State
      categories: [],
      flatCategories: [],
      featuredCategories: [],
      currentCategory: null,
      brands: [],
      crops: [],
      isLoading: false,
      error: null,

      // Basic Actions
      setCategories: (categories) => set({ categories }),
      setFlatCategories: (flatCategories) => set({ flatCategories }),
      setFeaturedCategories: (featuredCategories) =>
        set({ featuredCategories }),
      setCurrentCategory: (currentCategory) => set({ currentCategory }),
      setBrands: (brands) => set({ brands }),
      setCrops: (crops) => set({ crops }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),

      // API Actions
      fetchCategories: async () => {
        set({ isLoading: true, error: null });
        try {
          const categories = await categoryService.getCategories();
          const flatCategories = categoryService.flattenCategories(categories);
          set({ categories, flatCategories, isLoading: false });
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error.message
                : "Failed to fetch categories",
            isLoading: false,
          });
        }
      },

      fetchFeaturedCategories: async () => {
        set({ isLoading: true, error: null });
        try {
          const categories = await categoryService.getFeaturedCategories();
          set({ featuredCategories: categories, isLoading: false });
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error.message
                : "Failed to fetch featured categories",
            isLoading: false,
          });
        }
      },

      fetchCategory: async (id) => {
        set({ isLoading: true, error: null });
        try {
          const category = await categoryService.getCategory(id);
          set({ currentCategory: category || null, isLoading: false });
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error.message
                : "Failed to fetch category",
            isLoading: false,
          });
        }
      },

      fetchCategoryByName: async (name) => {
        set({ isLoading: true, error: null });
        try {
          const category = await categoryService.getCategoryByName(name);
          set({ currentCategory: category || null, isLoading: false });
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error.message
                : "Failed to fetch category",
            isLoading: false,
          });
        }
      },

      fetchCategoriesBrandsAndCrops: async () => {
        const { categories, brands, crops, isLoading } = get();

        // Skip if already loaded or currently loading
        if (
          (categories.length > 0 && brands.length > 0 && crops.length > 0) ||
          isLoading
        ) {
          return;
        }

        set({ isLoading: true, error: null });
        try {
          const data = await categoryService.getSearchDropdownData();
          const flatCategories = categoryService.flattenCategories(
            data.categories
          );
          set({
            categories: data.categories,
            flatCategories,
            brands: data.brands,
            crops: data.crops,
            isLoading: false,
          });
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error.message
                : "Failed to fetch dropdown data",
            isLoading: false,
          });
        }
      },
    }),
    {
      name: "category-store",
    }
  )
);
