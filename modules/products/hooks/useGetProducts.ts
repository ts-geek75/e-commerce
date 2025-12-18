import { useEffect, useState } from "react";

interface Product {
  id: number;
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

const useGetProducts = (category?: string, id?: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = "/api/products";
        const params: string[] = [];

        if (category) params.push(`category=${encodeURIComponent(category)}`);
        if (id) params.push(`id=${encodeURIComponent(id)}`);
        if (params.length) url += `?${params.join("&")}`;

        const res = await fetch(url);
        const data = await res.json();

        const normalizeProduct = (prod: any): Product => ({
          ...prod,
          images: prod.image_url
            ? prod.image_url.split(",").map((img: string) => img.trim())
            : [],
        });

        if (id && data.product) {
          setProducts([normalizeProduct(data.product)]);
        } else if (data.products) {
          setProducts(data.products.map(normalizeProduct));
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, id]);

  return { products, loading };
};

export default useGetProducts;
