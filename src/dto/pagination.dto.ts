export interface PaginationParams {
  page: number; // zero-based
  size: number;
  sortBy?: string;
  sortDirection?: string;
  [key: string]: any;
}

export interface PaginationResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
