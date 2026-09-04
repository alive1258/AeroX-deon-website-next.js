import type { ApiResponse } from "../../types/axios";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import {
  AccessoriesBannerItem,
  AccessoriesBannerPaginatedResponse,
  AccessoriesBannerQueryParams,
  UpdateAccessoriesBannerRequest,
} from "@/src/types/accessoriesBannerType";

const ACCESSORIES_BANNER_URL = "/accessories-banner";

export const accessoriesBannerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. CREATE ACCESSORIES BANNER
    createAccessoriesBanner: builder.mutation<ApiResponse<AccessoriesBannerItem>, FormData>({
      query: (formData) => ({
        url: ACCESSORIES_BANNER_URL,
        method: "POST",
        data: formData,
        contentType: true,
      }),
      invalidatesTags: [tagTypes.accessories_banner],
    }),

    // 2. GET ALL ACCESSORIES BANNER ENTRIES (Paginated & Filtered)
    getAllAccessoriesBanner: builder.query<
      AccessoriesBannerPaginatedResponse,
      AccessoriesBannerQueryParams | void
    >({
      query: (params) => ({
        url: ACCESSORIES_BANNER_URL,
        method: "GET",
        params: params || {},
      }),
      providesTags: [tagTypes.accessories_banner],
    }),

    // 3. GET SINGLE ACCESSORIES BANNER ENTRY BY ID
    getSingleAccessoriesBanner: builder.query<ApiResponse<AccessoriesBannerItem>, string>({
      query: (id) => ({
        url: `${ACCESSORIES_BANNER_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.accessories_banner],
    }),

    // 4. UPDATE ACCESSORIES BANNER
    updateAccessoriesBanner: builder.mutation<
      ApiResponse<AccessoriesBannerItem>,
      UpdateAccessoriesBannerRequest
    >({
      query: ({ id, data }) => ({
        url: `${ACCESSORIES_BANNER_URL}/${id}`,
        method: "PATCH",
        data,
        contentType: true,
      }),
      invalidatesTags: [tagTypes.accessories_banner],
    }),

    // 5. DELETE ACCESSORIES BANNER
    deleteAccessoriesBanner: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `${ACCESSORIES_BANNER_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.accessories_banner],
    }),
  }),
});

// Auto-generated hooks for components
export const {
  useCreateAccessoriesBannerMutation,
  useGetAllAccessoriesBannerQuery,
  useGetSingleAccessoriesBannerQuery,
  useUpdateAccessoriesBannerMutation,
  useDeleteAccessoriesBannerMutation,
} = accessoriesBannerApi;
