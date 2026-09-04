// ==========================================
// 1. Core Entity Model
// ==========================================
export interface FlightModeUserSummary {
  id: string;
  name?: string;
  email?: string;
  role?: string;
}

export interface FlightModeItem {
  id: string;
  title: string;
  description?: string;
  image?: string;
  featured: boolean;
  position: number;
  is_active: boolean;
  addedBy?: FlightModeUserSummary;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

// ==========================================
// 2. Request Payloads
// ==========================================
export interface UpdateFlightModeRequest {
  id: string;
  data: FormData;
}

// ==========================================
// 3. Query Parameters
// ==========================================
export interface FlightModeQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  title?: string;
  position?: number;
  is_active?: boolean;
  featured?: boolean;
  sort_by?: string;
  sort_order?: "ASC" | "DESC";
}

// ==========================================
// 4. API Response Wrappers
// ==========================================
export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginationLinks {
  first?: string;
  last?: string;
  current?: string;
  next?: string;
  previous?: string;
}

export interface BaseApiResponse {
  apiVersion?: string;
  statusCode?: number;
  status?: number;
  success: boolean;
  message: string;
}

export interface SingleFlightModeResponse extends BaseApiResponse {
  data: FlightModeItem;
}

export interface FlightModePaginatedResponse extends BaseApiResponse {
  meta: PaginationMeta;
  links?: PaginationLinks;
  data: FlightModeItem[];
}
