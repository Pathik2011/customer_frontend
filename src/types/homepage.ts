// ===== COMMON TYPES =====
export interface Brand {
  brand_id: number;
  brand_name: string;
}

export interface ProductVariant {
  product_variant_id: number;
  size: number;
  uom: string;
  price: number;
  discounted_price: number;
}

// Base section interface
export interface HomepageSection<T = any> {
  home_section_id: number;
  section_name: string;
  display_title: string;
  section_type: string;
  items: T[];
}

// Product Types
export interface Product {
  product_id: number;
  product_name: string;
  brand: Brand;
  product_variants: ProductVariant[];
  product_description: string | null;
  image: string;
}

// Farmers Bundle Item
export interface FarmersBundleItem {
  display_order: number;
  product_id: number;
  product_name: string;
  brand: Brand;
  product_variants: ProductVariant[];
  product_description: string;
  image: string;
}

// Problem Solution Item
export interface ProblemSolutionItem {
  display_order: number;
  problem_id: number;
  question: string;
  answer: string;
  solutions: Product[];
}

// Brand Item
export interface BrandItem {
  display_order: number;
  brand_id: number;
  brand_name: string;
  logo_url: string;
}

// ===== TOP SECTION ITEM TYPES =====

// ===== MID SECTION ITEM TYPES =====
export interface YouTubeVideoItem {
  display_order: number;
  video_id: number;
  video_title: string;
  youtube_url: string;
}

export interface CropItem {
  display_order: number;
  crop_id: number;
  crop_name: string;
  icon_url: string | null;
}

// ===== BOTTOM SECTION ITEM TYPES =====
export interface SeedItem {
  display_order: number;
  product_id: number;
  product_name: string;
  brand: Brand;
  product_variants: ProductVariant[];
  image: string;
}

// ===== API RESPONSE TYPES =====
export interface HomepageResponse {
  farmers_bundle: HomepageSection<FarmersBundleItem>;
  prob_solution: HomepageSection<ProblemSolutionItem>;
  brand: HomepageSection<BrandItem>;
}

export interface HomepageMidResponse {
  youtube_video: HomepageSection<YouTubeVideoItem>;
  crop: HomepageSection<CropItem>;
  seed: HomepageSection<SeedItem>;
}

export interface HomepageBottomResponse {
  products_upcoming: HomepageSection<SeedItem>;
  popular_products: HomepageSection<SeedItem>;
}

// ===== UTILITY TYPES =====
export type HomepageSectionType = "home_top" | "home_mid" | "home_bottom";

export interface ApiError {
  message: string;
  status?: number;
  endpoint?: string;
}

export interface HomepageAllSections {
  top: HomepageResponse;
  mid: HomepageMidResponse;
  bottom: HomepageBottomResponse;
}
