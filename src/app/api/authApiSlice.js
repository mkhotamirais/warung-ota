import { apiSlice } from "./apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (body) => ({ url: `/auth/signup`, method: "POST", body }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
    signin: builder.mutation({
      query: (body) => ({ url: `/auth/signin`, method: "PATCH", body }),
      invalidatesTags: ["User"],
    }),
    signout: builder.mutation({
      query: () => ({ url: `/auth/signout`, method: "PATCH" }),
      invalidatesTags: ["User"],
    }),
    getMe: builder.query({
      query: () => `/auth/me`,
      transformResponse: (res) => res.data,
      providesTags: ["User"],
    }),
    updateMe: builder.mutation({
      query: (body) => ({ url: `/auth/me`, method: "PATCH", body }),
      invalidatesTags: ["User"],
    }),
    deleteMe: builder.mutation({
      query: () => ({ url: `/auth/me`, method: "DELETE" }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useSigninMutation,
  useSignupMutation,
  useSignoutMutation,
  useGetMeQuery,
  useUpdateMeMutation,
  useDeleteMeMutation,
} = authApiSlice;
