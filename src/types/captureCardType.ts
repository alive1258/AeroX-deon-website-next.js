// ==========================================
// 1. Core Entity Model
// ==========================================
export interface CaptureCardUserSummary {
  id: string;
  name?: string;
  email?: string;
  role?: string;
}

export interface CaptureCardItem {
  id: string;
  title: string;
  description?: string;
  image?: string;
  button_link?: string;
  position: number;
  is_active: boolean;
  addedBy?: CaptureCardUserSummary;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

// ==========================================
// 2. Request Payloads
// ==========================================
export interface UpdateCaptureCardRequest {
  id: string;
  data: FormData;
}

// ==========================================
// 3. Query Parameters
// ==========================================
export interface CaptureCardQueryParams {
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

export interface SingleCaptureCardResponse extends BaseApiResponse {
  data: CaptureCardItem;
}

export interface CaptureCardPaginatedResponse extends BaseApiResponse {
  meta: PaginationMeta;
  links?: PaginationLinks;
  data: CaptureCardItem[];
}
