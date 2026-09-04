import type { ApiResponse } from "../../types/axios";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import {
  ProductBundleItem,
  ProductBundlePaginatedResponse,
  ProductBundleQueryParams,
  UpdateProductBundleRequest,
} from "@/src/types/productBundleType";

const PRODUCT_BUNDLES_URL = "/product-bundles";

export const productBundleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1. CREATE PRODUCT BUNDLE
    createProductBundle: builder.mutation<ApiResponse<ProductBundleItem>, FormData>({
      query: (formData) => ({
        url: PRODUCT_BUNDLES_URL,
        method: "POST",
        data: formData,
        contentType: true,
      }),
      invalidatesTags: [tagTypes.product_bundles],
    }),

    // 2. GET ALL PRODUCT BUNDLES (Paginated & Filtered)
    getAllProductBundle: builder.query<
      ProductBundlePaginatedResponse,
      ProductBundleQueryParams | void
    >({
      query: (params) => ({
        url: PRODUCT_BUNDLES_URL,
        method: "GET",
        params: params || {},
      }),
      providesTags: [tagTypes.product_bundles],
    }),

    // 3. GET SINGLE PRODUCT BUNDLE BY ID
    getSingleProductBundle: builder.query<ApiResponse<ProductBundleItem>, string>({
      query: (id) => ({
        url: `${PRODUCT_BUNDLES_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.product_bundles],
    }),

    // 4. UPDATE PRODUCT BUNDLE
    updateProductBundle: builder.mutation<
      ApiResponse<ProductBundleItem>,
      UpdateProductBundleRequest
    >({
      query: ({ id, data }) => ({
        url: `${PRODUCT_BUNDLES_URL}/${id}`,
        method: "PATCH",
        data,
        contentType: true,
      }),
      invalidatesTags: [tagTypes.product_bundles],
    }),

    // 5. DELETE PRODUCT BUNDLE
    deleteProductBundle: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `${PRODUCT_BUNDLES_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.product_bundles],
    }),
  }),
});

export const {
  useCreateProductBundleMutation,
  useGetAllProductBundleQuery,
  useGetSingleProductBundleQuery,
  useUpdateProductBundleMutation,
  useDeleteProductBundleMutation,
} = productBundleApi;
