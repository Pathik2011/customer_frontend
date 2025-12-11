import { ApiProductVariant } from '@/types/homeApi';

export interface SeedProduct {
  id: number;
  name: string;
  brand: string;
  image: string;
  variants: ApiProductVariant[];
}