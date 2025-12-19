"use client";

import { useState, useEffect, useCallback } from "react";

export interface Product {
  uuid: string;
  name: string;
  price: number;
  category: string;
  image_url: string;
  stock?: number;
}

interface UseFavouritesReturn {
  favourites: Product[];
  loading: boolean;
  error: string | null;
  addToFavourites: (productUuid: string) => Promise<void>;
  removeFromFavourites: (productUuid: string) => Promise<void>;
  isFavourite: (productUuid: string) => boolean;
}

const API_URL = "/api/favourites"; 

const useFavourites = (): UseFavouritesReturn => {
  const [favourites, setFavourites] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFavourites = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch favourites");
      const data = await res.json();
      setFavourites(data.products || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFavourites();
  }, [fetchFavourites]);

  const addToFavourites = async (productUuid: string) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ productUuid }),
      });
      if (!res.ok) throw new Error("Failed to add to favourites");
      setFavourites((prev) => [...prev, { uuid: productUuid } as Product]);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const removeFromFavourites = async (productUuid: string) => {
    try {
      const res = await fetch(API_URL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ productUuid }),
      });
      if (!res.ok) throw new Error("Failed to remove from favourites");
      setFavourites((prev) =>
        prev.filter((product) => product.uuid !== productUuid)
      );
    } catch (err: any) {
      setError(err.message);
    }
  };

  const isFavourite = (productUuid: string) => {
    return favourites.some((product) => product.uuid === productUuid);
  };

  return {
    favourites,
    loading,
    error,
    addToFavourites,
    removeFromFavourites,
    isFavourite,
  };
};

export default useFavourites;
