import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (queryString) => `/product?${queryString}`,
      // transformResponse: (res) => res.data,
      providesTags: ["Product", "Tag"],
    }),
    getProductById: builder.query({
      query: (id) => `/product/${id}`,
      transformResponse: (res) => res.data,
      providesTags: ["Product", "Tag"],
    }),
    postProduct: builder.mutation({
      query: (body) => ({ url: `/product`, method: "POST", body }),
      invalidatesTags: (result, error, arg) => [{ type: "Product", id: arg.id }],
    }),
    updateProduct: builder.mutation({
      query: (body) => ({ url: `/product/${body?.id}`, method: "PATCH", body }),
      invalidatesTags: ["Product", "Tag"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({ url: `/product/${id}`, method: "DELETE" }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  usePostProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApiSlice;
