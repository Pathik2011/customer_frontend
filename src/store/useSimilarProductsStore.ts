import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { SimilarProduct } from "@/types/product";
import { productService } from "@/services/productService";

interface SimilarProductsStore {
    // State - keyed by product_id for caching
    similarProductsCache: Record<number, SimilarProduct[]>;
    isLoading: boolean;
    error: string | null;

    // Actions
    fetchSimilarProducts: (productId: number) => Promise<void>;
    getSimilarProducts: (productId: number) => SimilarProduct[];
    clearCache: () => void;
}

export const useSimilarProductsStore = create<SimilarProductsStore>()(
    devtools(
        (set, get) => ({
            // Initial State
            similarProductsCache: {},
            isLoading: false,
            error: null,

            // Fetch similar products
            fetchSimilarProducts: async (productId: number) => {
                const { similarProductsCache } = get();

                // Return cached data if available
                if (similarProductsCache[productId]) {
                    return;
                }

                set({ isLoading: true, error: null });

                const response = await productService.getSimilarProducts(productId);

                if (response.success && response.res) {
                    const products = response.res;
                    set((state) => ({
                        similarProductsCache: {
                            ...state.similarProductsCache,
                            [productId]: products,
                        },
                        isLoading: false,
                    }));
                } else {
                    set({
                        error: response.error || "Failed to fetch similar products",
                        isLoading: false,
                    });
                }
            },

            // Get similar products from cache
            getSimilarProducts: (productId: number) => {
                const { similarProductsCache } = get();
                return similarProductsCache[productId] || [];
            },

            // Clear cache
            clearCache: () => {
                set({ similarProductsCache: {}, error: null });
            },
        }),
        {
            name: "similar-products-store",
        }
    )
);
