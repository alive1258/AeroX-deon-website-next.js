import type { ApiResponse } from "../../types/axios";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import {
  PerformanceItem,
  PerformancePaginatedResponse,
  PerformanceQueryParams,
  UpdatePerformanceRequest,
} from "@/src/types/performanceType";

const PERFORMANCE_URL = "/performance";

export const performanceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. CREATE PERFORMANCE
    createPerformance: builder.mutation<ApiResponse<PerformanceItem>, FormData>({
      query: (formData) => ({
        url: PERFORMANCE_URL,
        method: "POST",
        data: formData,
        contentType: true, // Enables multipart/form-data for image uploads
      }),
      invalidatesTags: [tagTypes.performance],
    }),

    // 2. GET ALL PERFORMANCE ENTRIES (Paginated & Filtered)
    getAllPerformance: builder.query<PerformancePaginatedResponse, PerformanceQueryParams | void>({
      query: (params) => ({
        url: PERFORMANCE_URL,
        method: "GET",
        params: params || {},
      }),
      providesTags: [tagTypes.performance],
    }),

    // 3. GET SINGLE PERFORMANCE ENTRY BY ID
    getSinglePerformance: builder.query<ApiResponse<PerformanceItem>, string>({
      query: (id) => ({
        url: `${PERFORMANCE_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.performance],
    }),

    // 4. UPDATE PERFORMANCE
    updatePerformance: builder.mutation<ApiResponse<PerformanceItem>, UpdatePerformanceRequest>({
      query: ({ id, data }) => ({
        url: `${PERFORMANCE_URL}/${id}`,
        method: "PATCH",
        data,
        contentType: true, // Enables multipart/form-data for image updates
      }),
      invalidatesTags: [tagTypes.performance],
    }),

    // 5. DELETE PERFORMANCE
    deletePerformance: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `${PERFORMANCE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.performance],
    }),
  }),
});

// Auto-generated hooks for components
export const {
  useCreatePerformanceMutation,
  useGetAllPerformanceQuery,
  useGetSinglePerformanceQuery,
  useUpdatePerformanceMutation,
  useDeletePerformanceMutation,
} = performanceApi;
