import type { ApiResponse } from "../../types/axios";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import {
  FlightModeItem,
  FlightModePaginatedResponse,
  FlightModeQueryParams,
  UpdateFlightModeRequest,
} from "@/src/types/flightModeType";

const FLIGHT_MODE_URL = "/flight-modes";

export const flightModeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. CREATE FLIGHT MODE
    createFlightMode: builder.mutation<ApiResponse<FlightModeItem>, FormData>({
      query: (formData) => ({
        url: FLIGHT_MODE_URL,
        method: "POST",
        data: formData,
        contentType: true, // Enables multipart/form-data for image uploads
      }),
      invalidatesTags: [tagTypes.flight_modes],
    }),

    // 2. GET ALL FLIGHT MODES (Paginated & Filtered)
    getAllFlightMode: builder.query<
      FlightModePaginatedResponse,
      FlightModeQueryParams | void
    >({
      query: (params) => ({
        url: FLIGHT_MODE_URL,
        method: "GET",
        params: params || {},
      }),
      providesTags: [tagTypes.flight_modes],
    }),

    // 3. GET SINGLE FLIGHT MODE BY ID
    getSingleFlightMode: builder.query<ApiResponse<FlightModeItem>, string>({
      query: (id) => ({
        url: `${FLIGHT_MODE_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.flight_modes],
    }),

    // 4. UPDATE FLIGHT MODE
    updateFlightMode: builder.mutation<
      ApiResponse<FlightModeItem>,
      UpdateFlightModeRequest
    >({
      query: ({ id, data }) => ({
        url: `${FLIGHT_MODE_URL}/${id}`,
        method: "PATCH",
        data,
        contentType: true, // Enables multipart/form-data for image updates
      }),
      invalidatesTags: [tagTypes.flight_modes],
    }),

    // 5. DELETE FLIGHT MODE
    deleteFlightMode: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `${FLIGHT_MODE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.flight_modes],
    }),
  }),
});

// Auto-generated hooks for components
export const {
  useCreateFlightModeMutation,
  useGetAllFlightModeQuery,
  useGetSingleFlightModeQuery,
  useUpdateFlightModeMutation,
  useDeleteFlightModeMutation,
} = flightModeApi;
