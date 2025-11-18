// Global type definitions
export interface User {
  id: string
  name: string
  email: string
  createdAt: Date
  updatedAt: Date
}

export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

export type Theme = 'light' | 'dark' | 'system'