import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product } from "@/types/ProductType";

type ProductFilters = {
  uuid?: string;
  search?: string;
  category?: string[];
  material?: string[];
  price?: string[];
};

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], ProductFilters>({
      query: (filters) => {
        const params = new URLSearchParams();

        if (filters.uuid) {
          params.set("id", filters.uuid);
        } else {
          if (filters.search) params.set("search", filters.search);
          filters.category?.forEach((v) => params.append("category", v));
          filters.material?.forEach((v) => params.append("material", v));
          filters.price?.forEach((v) => params.append("price", v));
        }

        return {
          url: "/products",
          params,
        };
      },
      transformResponse: (data: any, meta, filters) => {
        const normalizeProduct = (prod: any): Product => ({
          ...prod,
          id: prod.uuid,
          images: prod.image_url
            ? prod.image_url.split(",").map((img: string) => img.trim())
            : [],
        });

        if (filters.uuid) {
          return data.product ? [normalizeProduct(data.product)] : [];
        }
        return data.products ? data.products.map(normalizeProduct) : [];
      },
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;