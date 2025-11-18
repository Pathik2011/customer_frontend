import { Category } from "@/types/category";

export interface SearchDropdownResponse {
  categories: Category[];
  brands: Array<{ brand_id: number; brand_name: string }>;
  crops: Array<{ crop_id: number; crop_name: string }>;
}

export const categoryService = {
  // Get all categories, brands, and crops from the search dropdown API
  async getSearchDropdownData(): Promise<SearchDropdownResponse> {
    const response = await fetch(
      "https://e6lt9wjit7.execute-api.ap-south-1.amazonaws.com/dev/product/list-for-search-dropdown"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch search dropdown data");
    }
    return response.json();
  },

  // Get all categories with nested subcategories
  async getCategories(): Promise<Category[]> {
    const data = await this.getSearchDropdownData();
    return data.categories;
  },

  // Get all brands
  async getBrands(): Promise<Array<{ brand_id: number; brand_name: string }>> {
    const data = await this.getSearchDropdownData();
    return data.brands;
  },

  // Get all crops
  async getCrops(): Promise<Array<{ crop_id: number; crop_name: string }>> {
    const data = await this.getSearchDropdownData();
    return data.crops;
  },

  // Get featured categories (top-level only)
  async getFeaturedCategories(): Promise<Category[]> {
    const categories = await this.getCategories();
    return categories.filter(
      (cat) =>
        cat.category_name === "Fertilizers" ||
        cat.category_name === "Seeds" ||
        cat.category_name === "Pesticides"
    );
  },

  // Get single category by ID (searches recursively through subcategories)
  async getCategory(id: number): Promise<Category | undefined> {
    const categories = await this.getCategories();

    const findCategory = (cats: Category[]): Category | undefined => {
      for (const cat of cats) {
        if (cat.category_id === id) return cat;
        if (cat.sub_categories.length > 0) {
          const found = findCategory(cat.sub_categories);
          if (found) return found;
        }
      }
      return undefined;
    };

    return findCategory(categories);
  },

  // Get category by name (searches recursively through subcategories)
  async getCategoryByName(name: string): Promise<Category | undefined> {
    const categories = await this.getCategories();

    const findCategory = (cats: Category[]): Category | undefined => {
      for (const cat of cats) {
        if (cat.category_name.toLowerCase() === name.toLowerCase()) return cat;
        if (cat.sub_categories.length > 0) {
          const found = findCategory(cat.sub_categories);
          if (found) return found;
        }
      }
      return undefined;
    };

    return findCategory(categories);
  },

  // Flatten all categories including subcategories into a single array
  flattenCategories(categories: Category[]): Category[] {
    const flattened: Category[] = [];

    const flatten = (cats: Category[]) => {
      for (const cat of cats) {
        flattened.push(cat);
        if (cat.sub_categories.length > 0) {
          flatten(cat.sub_categories);
        }
      }
    };

    flatten(categories);
    return flattened;
  },

  // Get all flattened categories
  async getAllCategoriesFlat(): Promise<Category[]> {
    const categories = await this.getCategories();
    return this.flattenCategories(categories);
  },
};
