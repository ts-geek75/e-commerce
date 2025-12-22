"use client";

import { useState, useEffect, useCallback } from "react";

export interface FavouriteProduct {
  uuid: string;
  name: string;
  image: string;  
  price: number | string;
  category?: string;
}

export const useFavourites = () => {
  const [favourites, setFavourites] = useState<FavouriteProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getToken = () => localStorage.getItem("token");

  const fetchFavourites = useCallback(async () => {
    try {
      const res = await fetch("/api/favourites", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      const data = await res.json();
      if (res.ok) {
        const mapped = (data.products || []).map((p: any) => ({
          uuid: p.product_uuid,
          name: p.name,
          image: p.image_url?.split(",")[0].trim(),
          price: p.price,
          category: p.category,
        }));
        setFavourites(mapped);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addFavourite = async (product: FavouriteProduct) => {
    setFavourites((prev) => [product, ...prev]);
    try {
      const res = await fetch("/api/favourites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ productUuid: product.uuid }),
      });
      if (!res.ok) throw new Error("Failed to add");
    } catch {
      setFavourites((prev) => prev.filter((f) => f.uuid !== product.uuid));
    }
  };

  const removeFavourite = async (productUuid: string) => {
    const previousFavourites = [...favourites];
    setFavourites((prev) => prev.filter((f) => f.uuid !== productUuid));
    try {
      const res = await fetch("/api/favourites", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ productUuid }),
      });
      if (!res.ok) throw new Error("Failed to remove");
    } catch {
      setFavourites(previousFavourites);
    }
  };

  useEffect(() => {
    fetchFavourites();
  }, [fetchFavourites]);

  return { favourites, loading, addFavourite, removeFavourite };
};
