import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  Product,
  ProductsQueryParams,
  ProductFilters,
} from "@/types/product";
import { productService } from "@/services/productService";

interface ProductStore {
  // State
  products: Product[];
  filteredProducts: Product[];
  filters: ProductFilters | null;
  currentFilters: ProductsQueryParams;
  isLoading: boolean;
  error: string | null;

  // Pagination
  currentPage: number;
  totalProducts: number;
  hasMore: boolean;

  // Actions
  setProducts: (products: Product[]) => void;
  setFilteredProducts: (products: Product[]) => void;
  setFilters: (filters: ProductFilters) => void;
  setCurrentFilters: (filters: ProductsQueryParams) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // API Actions
  fetchProducts: (params?: ProductsQueryParams) => Promise<void>;
  fetchMoreProducts: () => Promise<void>;
  searchProducts: (searchTerm: string) => Promise<void>;
  fetchProductsByCategory: (category: string) => Promise<void>;
  fetchProductsByBrand: (brand: string) => Promise<void>;
  fetchProductsByCrop: (crop: string) => Promise<void>;
  fetchProductFilters: () => Promise<void>;
  applyFilters: (filters: ProductsQueryParams) => Promise<void>;
  clearFilters: () => Promise<void>;
  resetStore: () => void;
}

const ITEMS_PER_PAGE = 20;

export const useProductStore = create<ProductStore>()(
  devtools(
    (set, get) => ({
      // Initial State
      products: [],
      filteredProducts: [],
      filters: null,
      currentFilters: {},
      isLoading: false,
      error: null,
      currentPage: 0,
      totalProducts: 0,
      hasMore: true,

      // Basic Actions
      setProducts: (products) => set({ products }),
      setFilteredProducts: (filteredProducts) => set({ filteredProducts }),
      setFilters: (filters) => set({ filters }),
      setCurrentFilters: (currentFilters) => set({ currentFilters }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),

      // API Actions
      fetchProducts: async (params = {}) => {
        set({ isLoading: true, error: null });
        try {
          const queryParams = {
            skip: 0,
            limit: ITEMS_PER_PAGE,
            ...params,
          };

          const products = await productService.getProducts(queryParams);
          set({
            products,
            filteredProducts: products,
            currentFilters: queryParams,
            currentPage: 0,
            totalProducts: products.length,
            hasMore: products.length === ITEMS_PER_PAGE,
            isLoading: false,
          });
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error.message
                : "Failed to fetch products",
            isLoading: false,
          });
        }
      },

      fetchMoreProducts: async () => {
        const { currentFilters, currentPage, products, isLoading } = get();

        if (isLoading) return;

        set({ isLoading: true, error: null });
        try {
          const nextPage = currentPage + 1;
          const queryParams = {
            ...currentFilters,
            skip: nextPage * ITEMS_PER_PAGE,
            limit: ITEMS_PER_PAGE,
          };

          const newProducts = await productService.getProducts(queryParams);
          const allProducts = [...products, ...newProducts];

          set({
            products: allProducts,
            filteredProducts: allProducts,
            currentPage: nextPage,
            hasMore: newProducts.length === ITEMS_PER_PAGE,
            isLoading: false,
          });
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error.message
                : "Failed to fetch more products",
            isLoading: false,
          });
        }
      },

      searchProducts: async (searchTerm) => {
        set({ isLoading: true, error: null });
        try {
          const products = await productService.searchProducts(
            searchTerm,
            ITEMS_PER_PAGE
          );
          set({
            products,
            filteredProducts: products,
            currentFilters: { search_term: searchTerm },
            currentPage: 0,
            hasMore: products.length === ITEMS_PER_PAGE,
            isLoading: false,
          });
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error.message
                : "Failed to search products",
            isLoading: false,
          });
        }
      },

      fetchProductsByCategory: async (category) => {
        set({ isLoading: true, error: null });
        try {
          const products = await productService.getProductsByCategory(
            category,
            ITEMS_PER_PAGE
          );
          set({
            products,
            filteredProducts: products,
            currentFilters: { category },
            currentPage: 0,
            hasMore: products.length === ITEMS_PER_PAGE,
            isLoading: false,
          });
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error.message
                : "Failed to fetch products by category",
            isLoading: false,
          });
        }
      },

      fetchProductsByBrand: async (brand) => {
        set({ isLoading: true, error: null });
        try {
          const products = await productService.getProductsByBrand(
            brand,
            ITEMS_PER_PAGE
          );
          set({
            products,
            filteredProducts: products,
            currentFilters: { brand },
            currentPage: 0,
            hasMore: products.length === ITEMS_PER_PAGE,
            isLoading: false,
          });
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error.message
                : "Failed to fetch products by brand",
            isLoading: false,
          });
        }
      },

      fetchProductsByCrop: async (crop) => {
        set({ isLoading: true, error: null });
        try {
          const products = await productService.getProductsByCrop(
            crop,
            ITEMS_PER_PAGE
          );
          set({
            products,
            filteredProducts: products,
            currentFilters: { crop },
            currentPage: 0,
            hasMore: products.length === ITEMS_PER_PAGE,
            isLoading: false,
          });
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error.message
                : "Failed to fetch products by crop",
            isLoading: false,
          });
        }
      },

      fetchProductFilters: async () => {
        const { filters } = get();

        // Skip if already loaded
        if (filters && filters.targetPests.length > 0) {
          return;
        }

        try {
          const filters = await productService.getProductFilters();
          set({ filters });
        } catch (error) {
          console.error("Failed to fetch product filters:", error);
        }
      },

      applyFilters: async (filters) => {
        const state = get();

        // Prevent concurrent calls
        if (state.isLoading) {
          return;
        }

        // Normalize values for comparison (treat empty string, null, undefined as same)
        const normalize = (val: any) => val || undefined;

        // Helper to compare arrays or single values
        const isEqual = (a: any, b: any) => {
          const normA = normalize(a);
          const normB = normalize(b);
          if (Array.isArray(normA) && Array.isArray(normB)) {
            return normA.length === normB.length && normA.every((v, i) => v === normB[i]);
          }
          return normA === normB;
        };

        // Check if filters are the same
        const isSameFilters =
          isEqual(state.currentFilters.category, filters.category) &&
          isEqual(state.currentFilters.brand, filters.brand) &&
          isEqual(state.currentFilters.crop, filters.crop) &&
          isEqual(state.currentFilters.target_pest, filters.target_pest) &&
          normalize(state.currentFilters.search_term) === normalize(filters.search_term) &&
          normalize(state.currentFilters.min_price) === normalize(filters.min_price) &&
          normalize(state.currentFilters.max_price) === normalize(filters.max_price);

        // Skip ONLY if same filters AND products already loaded
        // This ensures initial load always happens
        if (isSameFilters && state.products.length > 0) {
          return;
        }

        set({ isLoading: true, error: null });
        try {
          const queryParams = {
            ...filters,
            skip: 0,
            limit: ITEMS_PER_PAGE,
          };

          const products = await productService.getProducts(queryParams);
          set({
            products,
            filteredProducts: products,
            currentFilters: queryParams,
            currentPage: 0,
            hasMore: products.length === ITEMS_PER_PAGE,
            isLoading: false,
          });
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error.message
                : "Failed to apply filters",
            isLoading: false,
          });
        }
      },

      clearFilters: async () => {
        const { fetchProducts } = get();
        await fetchProducts();
      },

      resetStore: () => {
        set({
          products: [],
          filteredProducts: [],
          filters: null,
          currentFilters: {},
          isLoading: false,
          error: null,
          currentPage: 0,
          totalProducts: 0,
          hasMore: true,
        });
      },
    }),
    {
      name: "product-store",
    }
  )
);
