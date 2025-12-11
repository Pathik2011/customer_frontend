export interface ApiProductVariant {
  product_variant_id: number;
  size: number;
  uom: string;
  price: number;
  discounted_price: number; // Ensure this matches API
}

export interface ApiBrand {
  brand_id: number;
  brand_name: string;
  logo_url: string; // [!code highlight] Updated from brand_image
}

export interface ApiProduct {
  display_order: number;
  product_id: number;
  product_name: string;
  brand: ApiBrand;
  product_variants: ApiProductVariant[];
  product_description: string;
  image: string;
}

// 1. Farmers Bundle Section
export interface FarmersBundleSection {
  home_section_id: number;
  section_name: string;
  display_title: string;
  section_type: string;
  items: ApiProduct[];
}

// 2. Seasonal Problem & Solution Section
export interface SeasonalProblemItem {
  display_order: number;
  problem_id: number;
  question: string;
  answer: string;
  solutions: ApiProduct[];
}

export interface ProbSolutionSection {
  home_section_id: number;
  section_name: string;
  display_title: string; // [!code highlight] Added
  section_type: string;
  items: SeasonalProblemItem[];
}

// 3. Brand Section
export interface BrandSection {
  home_section_id: number;
  section_name: string;
  display_title: string; // [!code highlight] Added
  items: ApiBrand[];
}

// Full API Response
export interface HomePageTopResponse {
  farmers_bundle: FarmersBundleSection;
  prob_solution: ProbSolutionSection;
  brand?: BrandSection; 
}


// --- MID SECTION TYPES ---

export interface ApiYoutubeVideo {
  display_order: number;
  video_id: number;
  video_title: string;
  thumbnail_url: string | null;
  youtube_url: string;
}

export interface YoutubeVideoSection {
  home_section_id: number;
  section_name: string;
  display_title: string;
  section_type: string;
  items: ApiYoutubeVideo[];
}

export interface ApiCrop {
  display_order: number;
  crop_id: number;
  crop_name: string;
  icon_url: string;
}

export interface CropSection {
  home_section_id: number;
  section_name: string;
  display_title: string;
  section_type: string;
  items: ApiCrop[];
}

export interface SeedSection {
  home_section_id: number;
  section_name: string;
  display_title: string;
  section_type: string;
  items: any[]; // We will refine this when we get to the Seed section
}

export interface HomePageMidResponse {
  youtube_video: YoutubeVideoSection;
  crop: CropSection;
  seed: SeedSection;
}


// 3. Seeds
export interface SeedSection {
  home_section_id: number;
  section_name: string;
  display_title: string;
  section_type: string;
  items: ApiProduct[]; // [!code highlight] Now properly typed
}

export interface HomePageMidResponse {
  youtube_video: YoutubeVideoSection;
  crop: CropSection;
  seed: SeedSection;
}


// --- BOTTOM SECTION TYPES ---

// Reuse ApiProduct for the items
export interface UpcomingProductsSection {
  home_section_id: number;
  section_name: string;
  display_title: string;
  section_type: string;
  items: ApiProduct[];
}

export interface HomePageBottomResponse {
  products_upcoming: UpcomingProductsSection;
  // Add popular_products here later if needed, based on your API structure
  popular_products?: any; 
}

// 4. Popular Products
export interface PopularProductsSection {
  home_section_id: number;
  section_name: string;
  display_title: string;
  section_type: string;
  items: ApiProduct[];
}

export interface HomePageBottomResponse {
  products_upcoming: UpcomingProductsSection;
  popular_products: PopularProductsSection; // [!code ++] Added
}