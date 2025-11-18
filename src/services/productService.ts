import {
  Product,
  ProductsQueryParams,
  ProductFilters,
  ProductSearchListDropdownResponse,
} from "@/types/product";
import {
  getApiConfig,
  buildProductEndpoint,
  createApiError,
  ApiErrorType,
} from "@/config/api";

// Generic API fetch function with retry logic
async function fetchProductData<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const config = getApiConfig();
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= config.retry.attempts; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), config.timeout);

      const response = await fetch(url, {
        method: "GET",
        headers: config.defaultHeaders,
        signal: controller.signal,
        ...options,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorType =
          response.status >= 500
            ? ApiErrorType.SERVER_ERROR
            : ApiErrorType.CLIENT_ERROR;

        throw createApiError(
          errorType,
          `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          url
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      lastError = error as Error;

      // Don't retry on client errors (4xx)
      if (error instanceof Error && error.message.includes("HTTP 4")) {
        throw error;
      }

      // Wait before retry (with exponential backoff)
      if (attempt < config.retry.attempts) {
        const delay =
          config.retry.delay * Math.pow(config.retry.backoff, attempt - 1);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  // All retries failed
  console.error(
    `Failed to fetch product data after ${config.retry.attempts} attempts:`,
    lastError
  );
  throw createApiError(
    ApiErrorType.NETWORK_ERROR,
    lastError?.message ||
    `Failed to fetch data after ${config.retry.attempts} attempts`,
    undefined,
    url
  );
}

export const productService = {
  // Get single product by ID
  async getProductById(productId: string | number): Promise<Product> {
    const url = buildProductEndpoint("detail", productId);
    return fetchProductData<Product>(url);
  },

  // Get all products with optional filters
  async getProducts(params: ProductsQueryParams = {}): Promise<Product[]> {
    const searchParams = new URLSearchParams();

    // Add query parameters - handle arrays by adding same key multiple times
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        // If value is an array, append each item with the same key
        if (Array.isArray(value)) {
          value.forEach((item) => {
            if (item !== undefined && item !== null && item !== "") {
              searchParams.append(key, item.toString());
            }
          });
        } else {
          searchParams.append(key, value.toString());
        }
      }
    });

    const baseUrl = buildProductEndpoint("list");
    const url = `${baseUrl}${searchParams.toString() ? `?${searchParams.toString()}` : ""
      }`;

    return fetchProductData<Product[]>(url);
  },

  // Search products by term
  async searchProducts(
    searchTerm: string,
    limit: number = 20
  ): Promise<Product[]> {
    return this.getProducts({ search_term: searchTerm, limit });
  },

  // Get products by category
  async getProductsByCategory(
    category: string,
    limit: number = 20
  ): Promise<Product[]> {
    return this.getProducts({ category, limit });
  },

  // Get products by brand
  async getProductsByBrand(
    brand: string,
    limit: number = 20
  ): Promise<Product[]> {
    return this.getProducts({ brand, limit });
  },

  // Get products by crop
  async getProductsByCrop(
    crop: string,
    limit: number = 20
  ): Promise<Product[]> {
    return this.getProducts({ crop, limit });
  },

  // Get products by price range
  async getProductsByPriceRange(
    minPrice: number,
    maxPrice: number,
    limit: number = 20
  ): Promise<Product[]> {
    return this.getProducts({
      min_price: minPrice,
      max_price: maxPrice,
      limit,
    });
  },

  // Get paginated products
  async getPaginatedProducts(
    skip: number = 0,
    limit: number = 20
  ): Promise<Product[]> {
    return this.getProducts({ skip, limit });
  },

  // Get product filters (extract unique values from products)
  async getProductFilters(): Promise<ProductFilters> {
    try {
      // Get a large sample of products to extract filter options
      const products = await this.getProducts({ limit: 1000 });

      const categories = Array.from(
        new Set(products.map((p) => p.category_name))
      ).filter(Boolean);
      const brands = Array.from(new Set(products.map((p) => p.brand))).filter(
        Boolean
      );
      const crops = Array.from(
        new Set(
          products.flatMap((p) => p.crops?.map((c) => c.crop_name) || [])
        )
      ).filter(Boolean) as string[];
      const targetPests = Array.from(
        new Set(
          products.flatMap((p) => p.doses?.map((d) => d.target_pest) || [])
        )
      ).filter(Boolean) as string[];

      // Calculate price range
      const prices = products.flatMap(
        (p) => p.variants?.map((v) => v.price) || []
      );
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);

      return {
        categories,
        brands,
        crops,
        priceRange: {
          min: minPrice || 0,
          max: maxPrice || 10000,
        },
        targetPests,
      };
    } catch (error) {
      console.error("Failed to fetch product filters:", error);
      return {
        categories: [],
        brands: [],
        crops: [],
        priceRange: { min: 0, max: 10000 },
        targetPests: [],
      };
    }
  },

  // Get all product filters from dropdown API
  async getAllProductFilters(): Promise<ProductSearchListDropdownResponse> {
    const url = buildProductEndpoint("filters");
    return fetchProductData<ProductSearchListDropdownResponse>(url);
  },
};
