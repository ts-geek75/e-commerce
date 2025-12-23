import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface UserDetails {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
    }),

    getProfile: builder.query<UserDetails, void>({
      query: () => "/users",
      providesTags: ["User"],
      transformResponse: (response: { user: any }) => ({
        email: response.user?.email || "",
        firstName: response.user?.first_name || "",
        lastName: response.user?.last_name || "",
        phone: response.user?.phone || "",
        address: response.user?.address || "",
        city: response.user?.city || "",
        postalCode: response.user?.postal_code || "",
        country: response.user?.country || "",
      }),
    }),
  }),
});

export const { 
  useLoginMutation, 
  useRegisterMutation, 
  useGetProfileQuery 
} = authApi;