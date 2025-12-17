import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image_url: string;
}

const useGetProducts = (category?: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = "/api/products";
        if (category) {
          url += `?category=${encodeURIComponent(category)}`;
        }

        const res = await fetch(url);
        const data = await res.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  return { products, loading };
};

export default useGetProducts;
