import axios, { AxiosError, AxiosInstance } from 'axios';

// API Response type
export interface ApiResponse<T = any> {
    success: boolean;
    res?: T;
    error?: string;
}

// Create axios instance
const axiosInstance: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || '',
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // You can add auth tokens here if needed
        // const token = localStorage.getItem('token');
        // if (token) {
        //   config.headers.Authorization = `Bearer ${token}`;
        // }

        console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
        return config;
    },
    (error) => {
        console.error('[API Request Error]', error);
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        // Success response
        console.log(`[API Response] ${response.config.url} - Status: ${response.status}`);
        return response;
    },
    (error: AxiosError) => {
        // Error response
        console.error('[API Response Error]', error.message);

        let errorMessage = 'An unexpected error occurred';

        if (error.response) {
            // Server responded with error status
            const status = error.response.status;
            const data = error.response.data as any;

            errorMessage = data?.message || data?.error || `Server error: ${status}`;

            // Handle specific status codes
            if (status === 401) {
                errorMessage = 'Unauthorized. Please login again.';
            } else if (status === 403) {
                errorMessage = 'Access forbidden.';
            } else if (status === 404) {
                errorMessage = 'Resource not found.';
            } else if (status >= 500) {
                errorMessage = 'Server error. Please try again later.';
            }
        } else if (error.request) {
            // Request made but no response
            errorMessage = 'Network error. Please check your connection.';
        } else {
            // Error in request setup
            errorMessage = error.message || errorMessage;
        }

        // Store error message in error object for easy access
        error.message = errorMessage;
        return Promise.reject(error);
    }
);

// Helper function to wrap API calls
export async function apiCall<T>(
    apiFunction: () => Promise<any>
): Promise<ApiResponse<T>> {
    try {
        const response = await apiFunction();
        return {
            success: true,
            res: response.data,
        };
    } catch (error) {
        const axiosError = error as AxiosError;
        return {
            success: false,
            error: axiosError.message || 'An unexpected error occurred',
        };
    }
}

export default axiosInstance;
