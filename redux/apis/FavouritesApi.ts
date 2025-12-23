import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface FavouriteProduct {
  uuid: string;
  name: string;
  image: string;
  price: number | string;
  category?: string;
}

export const favouritesApi = createApi({
  reducerPath: "favouritesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Favourites"],
  endpoints: (builder) => ({
    getFavourites: builder.query<FavouriteProduct[], void>({
      query: () => "/favourites",
      providesTags: ["Favourites"],
      transformResponse: (response: { products: any[] }) =>
        (response.products || []).map((p) => ({
          uuid: p.product_uuid,
          name: p.name,
          image: p.image_url?.split(",")[0].trim(),
          price: p.price,
          category: p.category,
        })),
    }),
    addFavourite: builder.mutation<void, FavouriteProduct>({
      query: (product) => ({
        url: "/favourites",
        method: "POST",
        body: { productUuid: product.uuid },
      }),
      invalidatesTags: ["Favourites"],
    }),
    removeFavourite: builder.mutation<void, string>({
      query: (productUuid) => ({
        url: "/favourites",
        method: "DELETE",
        body: { productUuid },
      }),
      invalidatesTags: ["Favourites"],
    }),
  }),
});

export const {
  useGetFavouritesQuery,
  useAddFavouriteMutation,
  useRemoveFavouriteMutation,
} = favouritesApi;