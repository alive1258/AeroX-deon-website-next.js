// ==========================================
// 1. Core Entity Model
// ==========================================
export interface PreorderBannerUserSummary {
  id: string;
  name?: string;
  email?: string;
  role?: string;
}

export interface PreorderBundleItem {
  icon: string;
  label: string;
}

export interface PreorderBannerItem {
  id: string;
  badge_text?: string;
  title: string;
  description?: string;
  button_text?: string;
  button_link?: string;
  bundle_items?: PreorderBundleItem[];
  position: number;
  is_active: boolean;
  addedBy?: PreorderBannerUserSummary;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

// ==========================================
// 2. Request Payloads
// ==========================================
export interface CreatePreorderBannerRequest {
  badge_text?: string;
  title: string;
  description?: string;
  button_text?: string;
  button_link?: string;
  bundle_items?: PreorderBundleItem[];
  position?: number;
  is_active?: boolean;
}

export interface UpdatePreorderBannerRequest {
  id: string;
  data: Partial<CreatePreorderBannerRequest>;
}

// ==========================================
// 3. Query Parameters
// ==========================================
export interface PreorderBannerQueryParams {
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

export interface SinglePreorderBannerResponse extends BaseApiResponse {
  data: PreorderBannerItem;
}

export interface PreorderBannerPaginatedResponse extends BaseApiResponse {
  meta: PaginationMeta;
  links?: PaginationLinks;
  data: PreorderBannerItem[];
}
