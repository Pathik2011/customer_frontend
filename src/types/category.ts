export interface Category {
  category_id: number;
  category_name: string;
  sub_categories: Category[];
}

export interface CategoriesResponse {
  categories: Category[];
  total: number;
}