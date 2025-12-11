import { ApiProductVariant } from '@/types/homeApi';

export interface UpcomingProduct {
  id: number;
  name: string;
  brand: string;
  image: string;
  variants: ApiProductVariant[];
}