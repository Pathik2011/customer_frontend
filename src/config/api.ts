// API Configuration
export const API_CONFIG = {
    // Base URLs
    homepage: {
        baseUrl: 'https://ojh8a1xen2.execute-api.ap-south-1.amazonaws.com/dev/user/homepage/sections',
        endpoints: {
            top: '/top',
            mid: '/mid',
            bottom: '/bottom'
        }
    },
    products: {
        baseUrl: 'https://e6lt9wjit7.execute-api.ap-south-1.amazonaws.com/dev',
        endpoints: {
            list: '/products',
            detail: '/products',
            filters: '/product/list-for-search-dropdown'
        }
    },

    // Default headers
    defaultHeaders: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },

    // Timeout settings
    timeout: 30000, // 30 seconds

    // Cache settings
    cache: {
        defaultTTL: 5 * 60 * 1000, // 5 minutes
        maxAge: 30 * 60 * 1000,    // 30 minutes
    },

    // Retry settings
    retry: {
        attempts: 3,
        delay: 1000, // 1 second
        backoff: 2   // exponential backoff multiplier
    }
} as const;

// Environment-specific overrides
export const getApiConfig = () => {
    const env = process.env.NODE_ENV;

    if (env === 'development') {
        return {
            ...API_CONFIG,
            cache: {
                ...API_CONFIG.cache,
                defaultTTL: 1000, // 1 second for development
            }
        };
    }

    return API_CONFIG;
};

// API endpoint builders
export const buildEndpoint = (section: 'top' | 'mid' | 'bottom'): string => {
    const config = getApiConfig();
    return `${config.homepage.baseUrl}${config.homepage.endpoints[section]}`;
};

export const buildProductEndpoint = (endpoint: 'list' | 'detail' | 'filters', id?: string | number): string => {
    const config = getApiConfig();
    if (endpoint === 'detail' && id) {
        return `${config.products.baseUrl}${config.products.endpoints.detail}/${id}`;
    }
    return `${config.products.baseUrl}${config.products.endpoints[endpoint]}`;
};

// Error types
export enum ApiErrorType {
    NETWORK_ERROR = 'NETWORK_ERROR',
    TIMEOUT_ERROR = 'TIMEOUT_ERROR',
    SERVER_ERROR = 'SERVER_ERROR',
    CLIENT_ERROR = 'CLIENT_ERROR',
    UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

export interface ApiError {
    type: ApiErrorType;
    message: string;
    status?: number;
    endpoint?: string;
    timestamp: number;
}

export const createApiError = (
    type: ApiErrorType,
    message: string,
    status?: number,
    endpoint?: string
): ApiError => ({
    type,
    message,
    status,
    endpoint,
    timestamp: Date.now()
});