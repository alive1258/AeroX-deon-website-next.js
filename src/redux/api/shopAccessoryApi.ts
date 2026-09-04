import type { ApiResponse } from "../../types/axios";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import {
  CreateShopAccessoryRequest,
  ShopAccessoryItem,
  ShopAccessoryPaginatedResponse,
  ShopAccessoryQueryParams,
  UpdateShopAccessoryRequest,
} from "@/src/types/shopAccessoryType";

const SHOP_ACCESSORIES_URL = "/shop-accessories";

export const shopAccessoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. CREATE SHOP ACCESSORY
    createShopAccessory: builder.mutation<
      ApiResponse<ShopAccessoryItem>,
      CreateShopAccessoryRequest
    >({
      query: (data) => ({
        url: SHOP_ACCESSORIES_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.shop_accessories],
    }),

    // 2. GET ALL SHOP ACCESSORIES (Paginated & Filtered)
    getAllShopAccessory: builder.query<
      ShopAccessoryPaginatedResponse,
      ShopAccessoryQueryParams | void
    >({
      query: (params) => ({
        url: SHOP_ACCESSORIES_URL,
        method: "GET",
        params: params || {},
      }),
      providesTags: [tagTypes.shop_accessories],
    }),

    // 3. GET SINGLE SHOP ACCESSORY BY ID
    getSingleShopAccessory: builder.query<ApiResponse<ShopAccessoryItem>, string>({
      query: (id) => ({
        url: `${SHOP_ACCESSORIES_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.shop_accessories],
    }),

    // 4. UPDATE SHOP ACCESSORY
    updateShopAccessory: builder.mutation<
      ApiResponse<ShopAccessoryItem>,
      UpdateShopAccessoryRequest
    >({
      query: ({ id, data }) => ({
        url: `${SHOP_ACCESSORIES_URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.shop_accessories],
    }),

    // 5. DELETE SHOP ACCESSORY
    deleteShopAccessory: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `${SHOP_ACCESSORIES_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.shop_accessories],
    }),
  }),
});

export const {
  useCreateShopAccessoryMutation,
  useGetAllShopAccessoryQuery,
  useGetSingleShopAccessoryQuery,
  useUpdateShopAccessoryMutation,
  useDeleteShopAccessoryMutation,
} = shopAccessoryApi;
