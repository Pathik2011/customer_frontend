import axiosInstance, { apiCall, ApiResponse } from '@/lib/axios';
import { API_ENDPOINTS } from '@/config/api';
import { Category } from '@/types/category';

export interface SearchDropdownResponse {
  categories: Category[];
  brands: Array<{ brand_id: number; brand_name: string }>;
  crops: Array<{ crop_id: number; crop_name: string }>;
}

export const categoryService = {
  // Get all categories, brands, and crops from the search dropdown API
  async getSearchDropdownData(): Promise<ApiResponse<SearchDropdownResponse>> {
    const url = `${API_ENDPOINTS.products.base}${API_ENDPOINTS.products.filters}`;
    return apiCall<SearchDropdownResponse>(() => axiosInstance.get(url));
  },

  // Get all categories with nested subcategories
  async getCategories(): Promise<ApiResponse<Category[]>> {
    const response = await this.getSearchDropdownData();
    if (response.success && response.res) {
      return {
        success: true,
        res: response.res.categories,
      };
    }
    return {
      success: false,
      error: response.error || 'Failed to fetch categories',
    };
  },

  // Get all brands
  async getBrands(): Promise<ApiResponse<Array<{ brand_id: number; brand_name: string }>>> {
    const response = await this.getSearchDropdownData();
    if (response.success && response.res) {
      return {
        success: true,
        res: response.res.brands,
      };
    }
    return {
      success: false,
      error: response.error || 'Failed to fetch brands',
    };
  },

  // Get all crops
  async getCrops(): Promise<ApiResponse<Array<{ crop_id: number; crop_name: string }>>> {
    const response = await this.getSearchDropdownData();
    if (response.success && response.res) {
      return {
        success: true,
        res: response.res.crops,
      };
    }
    return {
      success: false,
      error: response.error || 'Failed to fetch crops',
    };
  },

  // Get featured categories (top-level only)
  async getFeaturedCategories(): Promise<ApiResponse<Category[]>> {
    const response = await this.getCategories();
    if (response.success && response.res) {
      const featured = response.res.filter(
        (cat) =>
          cat.category_name === 'Fertilizers' ||
          cat.category_name === 'Seeds' ||
          cat.category_name === 'Pesticides'
      );
      return {
        success: true,
        res: featured,
      };
    }
    return {
      success: false,
      error: response.error || 'Failed to fetch featured categories',
    };
  },

  // Get single category by ID (searches recursively through subcategories)
  async getCategory(id: number): Promise<ApiResponse<Category | undefined>> {
    const response = await this.getCategories();
    if (!response.success || !response.res) {
      return {
        success: false,
        error: response.error || 'Failed to fetch categories',
      };
    }

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

    return {
      success: true,
      res: findCategory(response.res),
    };
  },

  // Get category by name (searches recursively through subcategories)
  async getCategoryByName(name: string): Promise<ApiResponse<Category | undefined>> {
    const response = await this.getCategories();
    if (!response.success || !response.res) {
      return {
        success: false,
        error: response.error || 'Failed to fetch categories',
      };
    }

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

    return {
      success: true,
      res: findCategory(response.res),
    };
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
  async getAllCategoriesFlat(): Promise<ApiResponse<Category[]>> {
    const response = await this.getCategories();
    if (response.success && response.res) {
      return {
        success: true,
        res: this.flattenCategories(response.res),
      };
    }
    return {
      success: false,
      error: response.error || 'Failed to fetch categories',
    };
  },
};
