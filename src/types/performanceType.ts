// ==========================================
// 1. Core Entity Model
// ==========================================
export interface PerformanceUserSummary {
  id: string;
  name?: string;
  email?: string;
  role?: string;
}

export interface PerformanceFeature {
  icon: string;
  title: string;
  description: string;
}

export interface PerformanceItem {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  features?: PerformanceFeature[];
  image?: string;
  rating_value?: string;
  rating_label?: string;
  community_text?: string;
  community_subtext?: string;
  button_text?: string;
  button_link?: string;
  position: number;
  is_active: boolean;
  addedBy?: PerformanceUserSummary;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

// ==========================================
// 2. Request Payloads
// ==========================================
export interface UpdatePerformanceRequest {
  id: string;
  data: FormData;
}

// ==========================================
// 3. Query Parameters
// ==========================================
export interface PerformanceQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  title?: string;
  position?: number;
  is_active?: boolean;
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

export interface SinglePerformanceResponse extends BaseApiResponse {
  data: PerformanceItem;
}

export interface PerformancePaginatedResponse extends BaseApiResponse {
  meta: PaginationMeta;
  links?: PaginationLinks;
  data: PerformanceItem[];
}
