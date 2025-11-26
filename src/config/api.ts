// API Base URLs
export const API_ENDPOINTS = {
    homepage: {
        base: 'https://ojh8a1xen2.execute-api.ap-south-1.amazonaws.com/dev/user/homepage/sections',
        top: '/top',
        mid: '/mid',
        bottom: '/bottom',
    },
    products: {
        base: 'https://e6lt9wjit7.execute-api.ap-south-1.amazonaws.com/dev',
        list: '/products',
        detail: (id: string | number) => `/products/${id}`,
        filters: '/product/list-for-search-dropdown',
    },
} as const;

// Cache settings
export const CACHE_CONFIG = {
    defaultTTL: process.env.NODE_ENV === 'development' ? 1000 : 5 * 60 * 1000, // 1s dev, 5min prod
    maxAge: 30 * 60 * 1000, // 30 minutes
} as const;