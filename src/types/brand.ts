export interface Brand {
  id: number;
  name: string;
  slug: string;
  logo?: string;
  description?: string;
  website?: string;
  productCount?: number;
  featured?: boolean;
}

export interface BrandsResponse {
  brands: Brand[];
  total: number;
}