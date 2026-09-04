import type { ApiResponse } from "../../types/axios";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import {
  GimbalBannerItem,
  GimbalBannerPaginatedResponse,
  GimbalBannerQueryParams,
  UpdateGimbalBannerRequest,
} from "@/src/types/gimbalBannerType";

const GIMBAL_BANNER_URL = "/gimbal-banner";

export const gimbalBannerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. CREATE GIMBAL BANNER
    createGimbalBanner: builder.mutation<ApiResponse<GimbalBannerItem>, FormData>({
      query: (formData) => ({
        url: GIMBAL_BANNER_URL,
        method: "POST",
        data: formData,
        contentType: true, // Enables multipart/form-data for image uploads
      }),
      invalidatesTags: [tagTypes.gimbal_banner],
    }),

    // 2. GET ALL GIMBAL BANNER ENTRIES (Paginated & Filtered)
    getAllGimbalBanner: builder.query<
      GimbalBannerPaginatedResponse,
      GimbalBannerQueryParams | void
    >({
      query: (params) => ({
        url: GIMBAL_BANNER_URL,
        method: "GET",
        params: params || {},
      }),
      providesTags: [tagTypes.gimbal_banner],
    }),

    // 3. GET SINGLE GIMBAL BANNER ENTRY BY ID
    getSingleGimbalBanner: builder.query<ApiResponse<GimbalBannerItem>, string>({
      query: (id) => ({
        url: `${GIMBAL_BANNER_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.gimbal_banner],
    }),

    // 4. UPDATE GIMBAL BANNER
    updateGimbalBanner: builder.mutation<
      ApiResponse<GimbalBannerItem>,
      UpdateGimbalBannerRequest
    >({
      query: ({ id, data }) => ({
        url: `${GIMBAL_BANNER_URL}/${id}`,
        method: "PATCH",
        data,
        contentType: true, // Enables multipart/form-data for image updates
      }),
      invalidatesTags: [tagTypes.gimbal_banner],
    }),

    // 5. DELETE GIMBAL BANNER
    deleteGimbalBanner: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `${GIMBAL_BANNER_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.gimbal_banner],
    }),
  }),
});

// Auto-generated hooks for components
export const {
  useCreateGimbalBannerMutation,
  useGetAllGimbalBannerQuery,
  useGetSingleGimbalBannerQuery,
  useUpdateGimbalBannerMutation,
  useDeleteGimbalBannerMutation,
} = gimbalBannerApi;
