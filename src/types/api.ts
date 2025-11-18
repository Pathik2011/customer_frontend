export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export class ApiError extends Error {
  public status: number;
  public code?: string;

  constructor(message: string, status: number = 0, code?: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}