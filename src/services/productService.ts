import axiosInstance, { apiCall, ApiResponse } from '@/lib/axios';
import { API_ENDPOINTS } from '@/config/api';
import {
  Product,
  ProductsQueryParams,
  ProductFilters,
  ProductSearchListDropdownResponse,
  SimilarProduct,
} from '@/types/product';

export const productService = {
  // Get single product by ID
  async getProductById(productId: string | number): Promise<ApiResponse<Product>> {
    const url = `${API_ENDPOINTS.products.base}${API_ENDPOINTS.products.detail(productId)}`;
    return apiCall<Product>(() => axiosInstance.get(url));
  },

  // Get all products with optional filters
  async getProducts(params: ProductsQueryParams = {}): Promise<ApiResponse<Product[]>> {
    const searchParams = new URLSearchParams();

    // Add query parameters - handle arrays by adding same key multiple times
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value)) {
          value.forEach((item) => {
            if (item !== undefined && item !== null && item !== '') {
              searchParams.append(key, item.toString());
            }
          });
        } else {
          searchParams.append(key, value.toString());
        }
      }
    });

    const baseUrl = `${API_ENDPOINTS.products.base}${API_ENDPOINTS.products.list}`;
    const url = searchParams.toString() ? `${baseUrl}?${searchParams.toString()}` : baseUrl;

    return apiCall<Product[]>(() => axiosInstance.get(url));
  },

  // Search products by term
  async searchProducts(searchTerm: string, limit: number = 20): Promise<ApiResponse<Product[]>> {
    return this.getProducts({ search_term: searchTerm, limit });
  },

  // Get products by category
  async getProductsByCategory(category: string, limit: number = 20): Promise<ApiResponse<Product[]>> {
    return this.getProducts({ category, limit });
  },

  // Get products by brand
  async getProductsByBrand(brand: string, limit: number = 20): Promise<ApiResponse<Product[]>> {
    return this.getProducts({ brand, limit });
  },

  // Get products by crop
  async getProductsByCrop(crop: string, limit: number = 20): Promise<ApiResponse<Product[]>> {
    return this.getProducts({ crop, limit });
  },

  // Get products by price range
  async getProductsByPriceRange(
    minPrice: number,
    maxPrice: number,
    limit: number = 20
  ): Promise<ApiResponse<Product[]>> {
    return this.getProducts({
      min_price: minPrice,
      max_price: maxPrice,
      limit,
    });
  },

  // Get paginated products
  async getPaginatedProducts(skip: number = 0, limit: number = 20): Promise<ApiResponse<Product[]>> {
    return this.getProducts({ skip, limit });
  },

  // Get product filters (extract unique values from products)
  async getProductFilters(): Promise<ApiResponse<ProductFilters>> {
    const response = await this.getProducts({ limit: 1000 });

    if (!response.success || !response.res) {
      return {
        success: false,
        error: response.error || 'Failed to fetch products for filters',
      };
    }

    const products = response.res;

    const categories = Array.from(new Set(products.map((p) => p.category_name))).filter(Boolean);
    const brands = Array.from(new Set(products.map((p) => p.brand))).filter(Boolean);
    const crops = Array.from(
      new Set(products.flatMap((p) => p.crops?.map((c) => c.crop_name) || []))
    ).filter(Boolean) as string[];
    const targetPests = Array.from(
      new Set(products.flatMap((p) => p.doses?.map((d) => d.target_pest) || []))
    ).filter(Boolean) as string[];

    // Calculate price range
    const prices = products.flatMap((p) => p.variants?.map((v) => v.price) || []);
    const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
    const maxPrice = prices.length > 0 ? Math.max(...prices) : 10000;

    return {
      success: true,
      res: {
        categories,
        brands,
        crops,
        priceRange: {
          min: minPrice,
          max: maxPrice,
        },
        targetPests,
      },
    };
  },

  // Get all product filters from dropdown API
  async getAllProductFilters(): Promise<ApiResponse<ProductSearchListDropdownResponse>> {
    const url = `${API_ENDPOINTS.products.base}${API_ENDPOINTS.products.filters}`;
    return apiCall<ProductSearchListDropdownResponse>(() => axiosInstance.get(url));
  },

  // Get similar products by product ID
  async getSimilarProducts(productId: string | number): Promise<ApiResponse<SimilarProduct[]>> {
    const url = `${API_ENDPOINTS.products.base}/products/${productId}/similar`;
    return apiCall<SimilarProduct[]>(() => axiosInstance.get(url));
  },
};
