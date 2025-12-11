export interface SeasonalQuestion {
  id: number;
  text: string;
  desc: string;
}

export interface SeasonalVariant {
  product_variant_id: number; // Changed from variant_id to match API consistency
  size: number;
  uom: string;
  price: number;
  discounted_price: number; // [!code fix] Renamed from 'discounted'
}

export interface SeasonalProduct {
  id: number;
  name: string;
  brand: string;
  image: string;
  variants: SeasonalVariant[];
}