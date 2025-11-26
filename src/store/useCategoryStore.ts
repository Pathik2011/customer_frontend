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

        const response = await categoryService.getCategories();

        if (response.success && response.res) {
          const categories = response.res;
          const flatCategories = categoryService.flattenCategories(categories);
          set({ categories, flatCategories, isLoading: false });
        } else {
          set({
            error: response.error || "Failed to fetch categories",
            isLoading: false,
          });
        }
      },

      fetchFeaturedCategories: async () => {
        set({ isLoading: true, error: null });

        const response = await categoryService.getFeaturedCategories();

        if (response.success && response.res) {
          set({ featuredCategories: response.res, isLoading: false });
        } else {
          set({
            error: response.error || "Failed to fetch featured categories",
            isLoading: false,
          });
        }
      },

      fetchCategory: async (id) => {
        set({ isLoading: true, error: null });

        const response = await categoryService.getCategory(id);

        if (response.success) {
          set({ currentCategory: response.res || null, isLoading: false });
        } else {
          set({
            error: response.error || "Failed to fetch category",
            isLoading: false,
          });
        }
      },

      fetchCategoryByName: async (name) => {
        set({ isLoading: true, error: null });

        const response = await categoryService.getCategoryByName(name);

        if (response.success) {
          set({ currentCategory: response.res || null, isLoading: false });
        } else {
          set({
            error: response.error || "Failed to fetch category",
            isLoading: false,
          });
        }
      },

      fetchCategoriesBrandsAndCrops: async () => {
        console.log("🔍 Fetching categories, brands, and crops...");
        set({ isLoading: true, error: null });

        const response = await categoryService.getSearchDropdownData();

        if (response.success && response.res) {
          const data = response.res;
          const flatCategories = categoryService.flattenCategories(
            data.categories
          );

          set({
            categories: data.categories || [],
            flatCategories,
            brands: data.brands || [],
            crops: data.crops || [],
            isLoading: false,
          });
        } else {
          console.error("❌ Failed to fetch data:", response.error);
          set({
            error: response.error || "Failed to fetch dropdown data",
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
