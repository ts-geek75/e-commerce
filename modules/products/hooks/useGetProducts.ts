import { useEffect, useState } from "react";

interface Product {
  uuid: string; 
  name: string;
  price: string;
  category: string;
  image_url: string;
  images: string[];
  description: string;
  stock?: number;
  material: string;
  dimension: string;
  weight: string;
  editors_note: string;
}

type ProductFilters = {
  uuid?: string; 
  search?: string;
  category?: string[];
  material?: string[];
  price?: string[];
};

const useGetProducts = (filters: ProductFilters = {}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const params = new URLSearchParams();

        if (filters.uuid) {
          params.set("id", filters.uuid); 
        } else {
          filters.search && params.set("search", filters.search);
          filters.category?.forEach((v) => params.append("category", v));
          filters.material?.forEach((v) => params.append("material", v));
          filters.price?.forEach((v) => params.append("price", v));
        }

        const url = params.toString()
          ? `/api/products?${params.toString()}`
          : "/api/products";

        const res = await fetch(url);
        const data = await res.json();

        const normalizeProduct = (prod: any): Product => ({
          ...prod,
          id: prod.uuid, 
          images: prod.image_url
            ? prod.image_url.split(",").map((img: string) => img.trim())
            : [],
        });

        if (filters.uuid) {
          setProducts(data.product ? [normalizeProduct(data.product)] : []);
        } else {
          setProducts(
            data.products ? data.products.map(normalizeProduct) : []
          );
        }
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [
    filters.uuid,
    filters.search,
    filters.category?.join(","),
    filters.material?.join(","),
    filters.price?.join(","),
  ]);

  return { products, loading };
};

export default useGetProducts;
