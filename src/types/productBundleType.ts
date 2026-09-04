// ==========================================
// 1. Core Entity Model
// ==========================================
export interface ProductBundleUserSummary {
  id: string;
  name?: string;
  email?: string;
  role?: string;
}

export interface ProductBundleItem {
  id: string;
  name: string;
  price: number;
  description?: string;
  image?: string;
  featured: boolean;
  includes?: string[];
  button_text?: string;
  button_link?: string;
  position: number;
  is_active: boolean;
  addedBy?: ProductBundleUserSummary;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

// ==========================================
// 2. Request Payloads
// ==========================================
export interface UpdateProductBundleRequest {
  id: string;
  data: FormData;
}

// ==========================================
// 3. Query Parameters
// ==========================================
export interface ProductBundleQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  name?: string;
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

export interface SingleProductBundleResponse extends BaseApiResponse {
  data: ProductBundleItem;
}

export interface ProductBundlePaginatedResponse extends BaseApiResponse {
  meta: PaginationMeta;
  links?: PaginationLinks;
  data: ProductBundleItem[];
}
