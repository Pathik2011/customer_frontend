// Export all stores
export { useProductStore } from './useProductStore';
export { useCategoryStore } from './useCategoryStore';
export { useBrandStore } from './useBrandStore';
export { useUIStore } from './useUIStore';
export { useHomepageStore } from './useHomepageStore';
export { useSimilarProductsStore } from './useSimilarProductsStore';

// Export store types for convenience
export type { Product, ProductFilters } from '@/types/product';
export type { Category } from '@/types/category';
export type { Brand } from '@/types/brand';
export type {
    HomepageResponse,
    HomepageMidResponse,
    HomepageSection,
    FarmersBundleItem,
    ProblemSolutionItem,
    BrandItem,
    YouTubeVideoItem,
    CropItem,
    SeedItem,
    ProductVariant
} from '@/types/homepage';