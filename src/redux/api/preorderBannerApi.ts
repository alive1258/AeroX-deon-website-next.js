import type { ApiResponse } from "../../types/axios";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import {
  CreatePreorderBannerRequest,
  PreorderBannerItem,
  PreorderBannerPaginatedResponse,
  PreorderBannerQueryParams,
  UpdatePreorderBannerRequest,
} from "@/src/types/preorderBannerType";

const PREORDER_BANNER_URL = "/preorder-banner";

export const preorderBannerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. CREATE PREORDER BANNER
    createPreorderBanner: builder.mutation<
      ApiResponse<PreorderBannerItem>,
      CreatePreorderBannerRequest
    >({
      query: (data) => ({
        url: PREORDER_BANNER_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.preorder_banner],
    }),

    // 2. GET ALL PREORDER BANNER ENTRIES (Paginated & Filtered)
    getAllPreorderBanner: builder.query<
      PreorderBannerPaginatedResponse,
      PreorderBannerQueryParams | void
    >({
      query: (params) => ({
        url: PREORDER_BANNER_URL,
        method: "GET",
        params: params || {},
      }),
      providesTags: [tagTypes.preorder_banner],
    }),

    // 3. GET SINGLE PREORDER BANNER ENTRY BY ID
    getSinglePreorderBanner: builder.query<
      ApiResponse<PreorderBannerItem>,
      string
    >({
      query: (id) => ({
        url: `${PREORDER_BANNER_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.preorder_banner],
    }),

    // 4. UPDATE PREORDER BANNER
    updatePreorderBanner: builder.mutation<
      ApiResponse<PreorderBannerItem>,
      UpdatePreorderBannerRequest
    >({
      query: ({ id, data }) => ({
        url: `${PREORDER_BANNER_URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.preorder_banner],
    }),

    // 5. DELETE PREORDER BANNER
    deletePreorderBanner: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `${PREORDER_BANNER_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.preorder_banner],
    }),
  }),
});

// Auto-generated hooks for components
export const {
  useCreatePreorderBannerMutation,
  useGetAllPreorderBannerQuery,
  useGetSinglePreorderBannerQuery,
  useUpdatePreorderBannerMutation,
  useDeletePreorderBannerMutation,
} = preorderBannerApi;
