// Product API Types
export interface ProductTag {
  tag_id: number;
  tag_name: string;
  tag_value: string;
}

export interface ProductVariant {
  size: number;
  uom: string;
  price: number;
  stock_quantity: number;
  discount: number;
  discounted_price: number;
  is_active: boolean;
  variant_id: number;
}

export interface ProductMedia {
  media_id?: number;
  url?: string;
  media_type?: string;
  media_url?: string;
  is_primary?: boolean;
}

export interface ProductYouTubeMedia {
  media_id: number;
  media_type: "YOUTUBE_LINK";
  purpose: string;
  label: string;
  sequence: number;
  url: string;
  url_or_key: string;
}

export interface ProductCrop {
  crop_id?: number;
  crop_name?: string;
}

export interface ProductDose {
  dose_id?: number;
  crop?: string;
  target_pest?: string;
  dosage?: string;
  application_method?: string;
}

export interface Product {
  product_id: number;
  category_id: number;
  brand_id: number;
  product_name: string;
  product_tech_name: string;
  description: string;
  category_name: string;
  image: string;
  brand: string;
  sku: string;
  firm: string;
  created_at: string;
  updated_at: string;
  tags: ProductTag[];
  variants: ProductVariant[];
  product_variants: ProductVariant[];
  media: ProductMedia[];
  upload_instructions: string | null;
  properties: Record<string, any>;
  crops: ProductCrop[];
  doses: ProductDose[];
}

// API Query Parameters (matches the API documentation exactly)
export interface ProductsQueryParams {
  search_term?: string;
  category?: string | string[];
  brand?: string | string[];
  crop?: string | string[];
  min_price?: number;
  max_price?: number;
  target_pest?: string | string[];
  skip?: number;
  limit?: number;
}

// API Response
export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

// Filter Options for UI (available filter values)
export interface ProductFilters {
  categories: string[];
  brands: string[];
  crops: string[];
  priceRange: {
    min: number;
    max: number;
  };
  targetPests: string[];
}

// Search and Filter State (for UI state management)
export interface ProductSearchFilters {
  searchTerm?: string;
  selectedCategory?: string;
  selectedBrand?: string;
  selectedCrop?: string;
  minPrice?: number;
  maxPrice?: number;
  selectedTargetPest?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

//API response list-for-search-dropdown
export interface SubCategory {
  category_id: number;
  category_name: string;
  sub_categories: SubCategory[];
}

export interface ProductCategory {
  category_id: number;
  category_name: string;
  sub_categories: SubCategory[];
}

export interface ProductBrand {
  brand_id: number;
  brand_name: string;
}

export interface ProductCropDropdown {
  crop_id: number;
  crop_name: string;
}

export interface ProductSearchListDropdownResponse {
  categories: ProductCategory[];
  brands: ProductBrand[];
  crops: ProductCropDropdown[];
}
