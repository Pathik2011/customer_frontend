import { ApiResponse, ApiError } from '@/types/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

class ApiClient {
    private baseURL: string;

    constructor(baseURL: string = API_BASE_URL) {
        this.baseURL = baseURL;
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const url = `${this.baseURL}${endpoint}`;

        const config: RequestInit = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        };

        try {
            const response = await fetch(url, config);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new ApiError(
                    errorData.message || `HTTP error! status: ${response.status}`,
                    response.status,
                    errorData.code
                );
            }

            const data: ApiResponse<T> = await response.json();

            if (!data.success) {
                throw new ApiError(
                    data.error || data.message || 'API request failed',
                    response.status
                );
            }

            return data.data;
        } catch (error) {
            if (error instanceof ApiError) {
                throw error;
            }

            throw new ApiError(
                error instanceof Error ? error.message : 'Network error occurred',
                0
            );
        }
    }

    async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
        const searchParams = params ? new URLSearchParams(params).toString() : '';
        const url = searchParams ? `${endpoint}?${searchParams}` : endpoint;

        return this.request<T>(url, {
            method: 'GET',
        });
    }

    async post<T>(endpoint: string, data?: any): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    async put<T>(endpoint: string, data?: any): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'PUT',
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    async delete<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'DELETE',
        });
    }
}

export const apiClient = new ApiClient();
export { ApiError };