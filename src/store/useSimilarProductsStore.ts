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
                try {
                    const products = await productService.getSimilarProducts(productId);
                    set((state) => ({
                        similarProductsCache: {
                            ...state.similarProductsCache,
                            [productId]: products,
                        },
                        isLoading: false,
                    }));
                } catch (error) {
                    set({
                        error:
                            error instanceof Error
                                ? error.message
                                : "Failed to fetch similar products",
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
