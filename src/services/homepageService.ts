import {
  HomepageResponse,
  HomepageMidResponse,
  HomepageBottomResponse,
} from "@/types/homepage";
import {
  getApiConfig,
  buildEndpoint,
  createApiError,
  ApiErrorType,
} from "@/config/api";

// Generic API fetch function with retry logic
async function fetchHomepageSection<T>(
  section: "top" | "mid" | "bottom"
): Promise<T> {
  const config = getApiConfig();
  const url = buildEndpoint(section);
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= config.retry.attempts; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), config.timeout);

      const response = await fetch(url, {
        method: "GET",
        headers: config.defaultHeaders,
        signal: controller.signal,
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
      console.log("error ==>", error);
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
    `Failed to fetch ${section} after ${config.retry.attempts} attempts:`,
    lastError
  );
  throw createApiError(
    ApiErrorType.NETWORK_ERROR,
    lastError?.message ||
      `Failed to fetch ${section} data after ${config.retry.attempts} attempts`,
    undefined,
    url
  );
}

export const homepageService = {
  // ===== TOP SECTION METHODS =====
  async getHomepageSections(): Promise<HomepageResponse> {
    return fetchHomepageSection<HomepageResponse>("top");
  },

  async getSection(sectionName: keyof HomepageResponse): Promise<any> {
    const data = await this.getHomepageSections();
    return data[sectionName];
  },

  async getFarmersBundle() {
    return this.getSection("farmers_bundle");
  },

  async getProblemSolution() {
    return this.getSection("prob_solution");
  },

  async getBrands() {
    return this.getSection("brand");
  },

  // ===== MID SECTION METHODS =====
  async getHomepageMidSections(): Promise<HomepageMidResponse> {
    return fetchHomepageSection<HomepageMidResponse>("mid");
  },

  async getMidSection(sectionName: keyof HomepageMidResponse): Promise<any> {
    const data = await this.getHomepageMidSections();
    return data[sectionName];
  },

  async getYouTubeVideos() {
    return this.getMidSection("youtube_video");
  },

  async getCrops() {
    return this.getMidSection("crop");
  },

  async getSeeds() {
    return this.getMidSection("seed");
  },

  // ===== BOTTOM SECTION METHODS =====
  async getHomepageBottomSections(): Promise<HomepageBottomResponse> {
    return fetchHomepageSection<HomepageBottomResponse>("bottom");
  },

  async getBottomSection(
    sectionName: keyof HomepageBottomResponse
  ): Promise<any> {
    const data = await this.getHomepageBottomSections();
    return data[sectionName];
  },

  async getUpcomingProducts() {
    return this.getBottomSection("products_upcoming");
  },

  async getPopularProductsBottom() {
    return this.getBottomSection("popular_products");
  },

  // ===== UTILITY METHODS =====
  async getAllSections(): Promise<{
    top: HomepageResponse;
    mid: HomepageMidResponse;
    bottom: HomepageBottomResponse;
  }> {
    const [top, mid, bottom] = await Promise.all([
      this.getHomepageSections(),
      this.getHomepageMidSections(),
      this.getHomepageBottomSections(),
    ]);

    return { top, mid, bottom };
  },

  // Health check method
  async healthCheck(): Promise<boolean> {
    try {
      await Promise.all([
        fetch(buildEndpoint("top"), { method: "HEAD" }),
        fetch(buildEndpoint("mid"), { method: "HEAD" }),
        fetch(buildEndpoint("bottom"), { method: "HEAD" }),
      ]);
      return true;
    } catch {
      return false;
    }
  },
};
