// --- Product Data Types ---
export interface ProductVariant {
  product_variant_id: number;
  size: number;
  uom: string;
  price: number;
  discount: number;
  discounted_price: number;
  is_active?: boolean;
}

export interface ProductMedia {
  media_id: number;
  media_type: "IMAGE" | "YOUTUBE_LINK";
  purpose: "GALLERY" | "HOW_TO_USE";
  label: string;
  url: string;
}

export interface ProductDose {
  crop_name: string;
  target_pest: string;
  dosage_formulation_hectare: string;
  dosage_ai_hectare: string;
  water_liters_hectare: string;
  waiting_period_days: number;
}

export interface ProductTag {
  tag_name: string;
  tag_value: string;
}

export interface ProductProperties {
  caution: string;
  introduction: string;
  features_and_benefits: string[];
  mode_of_action_details: string;
}

// Detailed view (usually has more info, but structures are converging)
export interface ProductDetail {
  product_id: number;
  product_name: string;
  product_tech_name: string;
  description: string;
  category_name: string;
  brand: string;
  image_url?: string; 
  variants: ProductVariant[];
  media: ProductMedia[];
  doses: ProductDose[];
  tags: ProductTag[];
  properties: ProductProperties;
}

// List Item View (Matches your Backend Response)
export interface Product {
  display_order?: number;
  product_id: number;
  product_name: string;
  brand_name: string;
  image_url: string;
  
  // The "Display Variant" fields (from backend filtering)
  product_variant_id: number; 
  size: number;
  uom: string;
  price: number;
  discount: number;
  discounted_price: number;

  variants: ProductVariant[];
}

// --- Existing Filter Types ---
export interface SubCategory {
  category_id: number;
  category_name: string;
  sub_categories: any[]; 
}

export interface Category {
  category_id: number;
  category_name: string;
  sub_categories: SubCategory[];
}

export interface Brand {
  brand_id: number;
  brand_name: string;
}

export interface Crop {
  crop_id: number;
  crop_name: string;
}

export interface FilterApiResponse {
  categories: Category[];
  brands: Brand[];
  crops: Crop[];
}

export interface ProductFilters {
  categories: string[];
  brands: string[];
  crops: string[];
  minPrice?: number;
  maxPrice?: number;
}


export interface CustomerUser {
  cognito_id: string;
  email: string;
  first_name: string;
  last_name: string;
  profile_pic_url: string;
}