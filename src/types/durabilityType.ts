// ==========================================
// 1. Core Entity Model
// ==========================================
export interface DurabilityUserSummary {
  id: string;
  name?: string;
  email?: string;
  role?: string;
}

export interface DurabilitySpec {
  value: string;
  label: string;
}

export interface DurabilityItem {
  id: string;
  title: string;
  description?: string;
  image?: string;
  specs?: DurabilitySpec[];
  button_text?: string;
  button_link?: string;
  position: number;
  is_active: boolean;
  addedBy?: DurabilityUserSummary;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

// ==========================================
// 2. Request Payloads
// ==========================================
export interface UpdateDurabilityRequest {
  id: string;
  data: FormData;
}

// ==========================================
// 3. Query Parameters
// ==========================================
export interface DurabilityQueryParams {
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

export interface SingleDurabilityResponse extends BaseApiResponse {
  data: DurabilityItem;
}

export interface DurabilityPaginatedResponse extends BaseApiResponse {
  meta: PaginationMeta;
  links?: PaginationLinks;
  data: DurabilityItem[];
}
