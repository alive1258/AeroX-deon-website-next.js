// ==========================================
// 1. Core Entity Model
// ==========================================
export interface ShopAccessoryUserSummary {
  id: string;
  name?: string;
  email?: string;
  role?: string;
}

export interface ShopAccessoryItem {
  id: string;
  name: string;
  price: number;
  icon?: string;
  button_link?: string;
  position: number;
  is_active: boolean;
  addedBy?: ShopAccessoryUserSummary;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

// ==========================================
// 2. Request Payloads
// ==========================================
export interface CreateShopAccessoryRequest {
  name: string;
  price: number;
  icon?: string;
  button_link?: string;
  position?: number;
  is_active?: boolean;
}

export interface UpdateShopAccessoryRequest {
  id: string;
  data: Partial<CreateShopAccessoryRequest>;
}

// ==========================================
// 3. Query Parameters
// ==========================================
export interface ShopAccessoryQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  name?: string;
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

export interface BaseApiResponse {
  apiVersion?: string;
  statusCode?: number;
  status?: number;
  success: boolean;
  message: string;
}

export interface SingleShopAccessoryResponse extends BaseApiResponse {
  data: ShopAccessoryItem;
}

export interface ShopAccessoryPaginatedResponse extends BaseApiResponse {
  meta: PaginationMeta;
  data: ShopAccessoryItem[];
}
