// ==========================================
// 1. Core Entity Model
// ==========================================
export interface GimbalBannerUserSummary {
  id: string;
  name?: string;
  email?: string;
  role?: string;
}

export interface GimbalBannerItem {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  image?: string;
  button_text?: string;
  button_link?: string;
  position: number;
  is_active: boolean;
  addedBy?: GimbalBannerUserSummary;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

// ==========================================
// 2. Request Payloads
// ==========================================
export interface UpdateGimbalBannerRequest {
  id: string;
  data: FormData;
}

// ==========================================
// 3. Query Parameters
// ==========================================
export interface GimbalBannerQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  title?: string;
  eyebrow?: string;
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

export interface SingleGimbalBannerResponse extends BaseApiResponse {
  data: GimbalBannerItem;
}

export interface GimbalBannerPaginatedResponse extends BaseApiResponse {
  meta: PaginationMeta;
  links?: PaginationLinks;
  data: GimbalBannerItem[];
}
