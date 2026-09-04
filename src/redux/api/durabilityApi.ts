import type { ApiResponse } from "../../types/axios";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import {
  DurabilityItem,
  DurabilityPaginatedResponse,
  DurabilityQueryParams,
  UpdateDurabilityRequest,
} from "@/src/types/durabilityType";

const DURABILITY_URL = "/durability";

export const durabilityApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. CREATE DURABILITY
    createDurability: builder.mutation<ApiResponse<DurabilityItem>, FormData>({
      query: (formData) => ({
        url: DURABILITY_URL,
        method: "POST",
        data: formData,
        contentType: true, // Enables multipart/form-data for image uploads
      }),
      invalidatesTags: [tagTypes.durability],
    }),

    // 2. GET ALL DURABILITY ENTRIES (Paginated & Filtered)
    getAllDurability: builder.query<DurabilityPaginatedResponse, DurabilityQueryParams | void>({
      query: (params) => ({
        url: DURABILITY_URL,
        method: "GET",
        params: params || {},
      }),
      providesTags: [tagTypes.durability],
    }),

    // 3. GET SINGLE DURABILITY ENTRY BY ID
    getSingleDurability: builder.query<ApiResponse<DurabilityItem>, string>({
      query: (id) => ({
        url: `${DURABILITY_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.durability],
    }),

    // 4. UPDATE DURABILITY
    updateDurability: builder.mutation<ApiResponse<DurabilityItem>, UpdateDurabilityRequest>({
      query: ({ id, data }) => ({
        url: `${DURABILITY_URL}/${id}`,
        method: "PATCH",
        data,
        contentType: true, // Enables multipart/form-data for image updates
      }),
      invalidatesTags: [tagTypes.durability],
    }),

    // 5. DELETE DURABILITY
    deleteDurability: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `${DURABILITY_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.durability],
    }),
  }),
});

// Auto-generated hooks for components
export const {
  useCreateDurabilityMutation,
  useGetAllDurabilityQuery,
  useGetSingleDurabilityQuery,
  useUpdateDurabilityMutation,
  useDeleteDurabilityMutation,
} = durabilityApi;
