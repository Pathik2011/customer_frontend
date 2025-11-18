// Application constants
export const APP_NAME = 'Next.js App'
export const APP_VERSION = '1.0.0'

export const API_ENDPOINTS = {
  USERS: '/api/users',
  AUTH: '/api/auth',
} as const

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
} as const

export const DEFAULT_PAGINATION = {
  page: 1,
  limit: 10,
} as const