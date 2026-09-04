import type { ApiResponse } from "../../types/axios";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import {
  CaptureCardItem,
  CaptureCardPaginatedResponse,
  CaptureCardQueryParams,
  UpdateCaptureCardRequest,
} from "@/src/types/captureCardType";

const CAPTURE_CARD_URL = "/capture-cards";

export const captureCardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. CREATE CAPTURE CARD
    createCaptureCard: builder.mutation<ApiResponse<CaptureCardItem>, FormData>({
      query: (formData) => ({
        url: CAPTURE_CARD_URL,
        method: "POST",
        data: formData,
        contentType: true,
      }),
      invalidatesTags: [tagTypes.capture_cards],
    }),

    // 2. GET ALL CAPTURE CARDS (Paginated & Filtered)
    getAllCaptureCard: builder.query<CaptureCardPaginatedResponse, CaptureCardQueryParams | void>({
      query: (params) => ({
        url: CAPTURE_CARD_URL,
        method: "GET",
        params: params || {},
      }),
      providesTags: [tagTypes.capture_cards],
    }),

    // 3. GET SINGLE CAPTURE CARD BY ID
    getSingleCaptureCard: builder.query<ApiResponse<CaptureCardItem>, string>({
      query: (id) => ({
        url: `${CAPTURE_CARD_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.capture_cards],
    }),

    // 4. UPDATE CAPTURE CARD
    updateCaptureCard: builder.mutation<ApiResponse<CaptureCardItem>, UpdateCaptureCardRequest>({
      query: ({ id, data }) => ({
        url: `${CAPTURE_CARD_URL}/${id}`,
        method: "PATCH",
        data,
        contentType: true,
      }),
      invalidatesTags: [tagTypes.capture_cards],
    }),

    // 5. DELETE CAPTURE CARD
    deleteCaptureCard: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `${CAPTURE_CARD_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.capture_cards],
    }),
  }),
});

export const {
  useCreateCaptureCardMutation,
  useGetAllCaptureCardQuery,
  useGetSingleCaptureCardQuery,
  useUpdateCaptureCardMutation,
  useDeleteCaptureCardMutation,
} = captureCardApi;
