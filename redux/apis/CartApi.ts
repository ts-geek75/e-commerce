import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface CartItem {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  image: string;
}

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Cart"], 
  endpoints: (builder) => ({
    getCart: builder.query<CartItem[], void>({
      query: () => "/cart",
      providesTags: ["Cart"],
      transformResponse: (response: { cartItems: any[] }) =>
        (response.cartItems || []).map((item) => ({
          id: item.id,
          name: item.name,
          category: item.category,
          price: Number(item.price),
          quantity: item.quantity,
          image: item.image_url?.split(",")[0].trim() || "",
        })),
    }),
    updateQuantity: builder.mutation<void, { productId: string; quantity: number }>({
      query: (body) => ({
        url: "/cart",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cart"], 
    }),
    removeItem: builder.mutation<void, string>({
      query: (productId) => ({
        url: "/cart",
        method: "DELETE",
        body: { productId },
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useUpdateQuantityMutation,
  useRemoveItemMutation,
} = cartApi;