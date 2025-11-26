import axiosInstance, { apiCall, ApiResponse } from '@/lib/axios';
import { API_ENDPOINTS } from '@/config/api';
import {
  HomepageResponse,
  HomepageMidResponse,
  HomepageBottomResponse,
} from '@/types/homepage';

export const homepageService = {
  // Top section
  async getTopSection(): Promise<ApiResponse<HomepageResponse>> {
    const url = `${API_ENDPOINTS.homepage.base}${API_ENDPOINTS.homepage.top}`;
    return apiCall<HomepageResponse>(() => axiosInstance.get(url));
  },

  // Mid section
  async getMidSection(): Promise<ApiResponse<HomepageMidResponse>> {
    const url = `${API_ENDPOINTS.homepage.base}${API_ENDPOINTS.homepage.mid}`;
    return apiCall<HomepageMidResponse>(() => axiosInstance.get(url));
  },

  // Bottom section
  async getBottomSection(): Promise<ApiResponse<HomepageBottomResponse>> {
    const url = `${API_ENDPOINTS.homepage.base}${API_ENDPOINTS.homepage.bottom}`;
    return apiCall<HomepageBottomResponse>(() => axiosInstance.get(url));
  },

  // Get all sections at once
  async getAllSections(): Promise<{
    top: ApiResponse<HomepageResponse>;
    mid: ApiResponse<HomepageMidResponse>;
    bottom: ApiResponse<HomepageBottomResponse>;
  }> {
    const [top, mid, bottom] = await Promise.all([
      this.getTopSection(),
      this.getMidSection(),
      this.getBottomSection(),
    ]);

    return { top, mid, bottom };
  },
};
