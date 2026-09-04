import type { ApiResponse } from "../../types/axios";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import {
  VideoShowcaseItem,
  VideoShowcasePaginatedResponse,
  VideoShowcaseQueryParams,
  UpdateVideoShowcaseRequest,
} from "@/src/types/videoShowcaseType";

const VIDEO_SHOWCASE_URL = "/video-showcase";

export const videoShowcaseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. CREATE VIDEO SHOWCASE
    createVideoShowcase: builder.mutation<ApiResponse<VideoShowcaseItem>, FormData>({
      query: (formData) => ({
        url: VIDEO_SHOWCASE_URL,
        method: "POST",
        data: formData,
        contentType: true, // Enables multipart/form-data for image uploads
      }),
      invalidatesTags: [tagTypes.video_showcase],
    }),

    // 2. GET ALL VIDEO SHOWCASE ENTRIES (Paginated & Filtered)
    getAllVideoShowcase: builder.query<
      VideoShowcasePaginatedResponse,
      VideoShowcaseQueryParams | void
    >({
      query: (params) => ({
        url: VIDEO_SHOWCASE_URL,
        method: "GET",
        params: params || {},
      }),
      providesTags: [tagTypes.video_showcase],
    }),

    // 3. GET SINGLE VIDEO SHOWCASE ENTRY BY ID
    getSingleVideoShowcase: builder.query<ApiResponse<VideoShowcaseItem>, string>({
      query: (id) => ({
        url: `${VIDEO_SHOWCASE_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.video_showcase],
    }),

    // 4. UPDATE VIDEO SHOWCASE
    updateVideoShowcase: builder.mutation<
      ApiResponse<VideoShowcaseItem>,
      UpdateVideoShowcaseRequest
    >({
      query: ({ id, data }) => ({
        url: `${VIDEO_SHOWCASE_URL}/${id}`,
        method: "PATCH",
        data,
        contentType: true, // Enables multipart/form-data for image updates
      }),
      invalidatesTags: [tagTypes.video_showcase],
    }),

    // 5. DELETE VIDEO SHOWCASE
    deleteVideoShowcase: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `${VIDEO_SHOWCASE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.video_showcase],
    }),
  }),
});

// Auto-generated hooks for components
export const {
  useCreateVideoShowcaseMutation,
  useGetAllVideoShowcaseQuery,
  useGetSingleVideoShowcaseQuery,
  useUpdateVideoShowcaseMutation,
  useDeleteVideoShowcaseMutation,
} = videoShowcaseApi;
