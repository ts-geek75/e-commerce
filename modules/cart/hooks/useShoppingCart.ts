"use client";

import { useEffect, useState } from "react";

export interface CartItem {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  image: string;
}

const useShoppingCart = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const authFetch = (url: string, options: RequestInit = {}) => {
    const token = localStorage.getItem("token");

    return fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
        ...(options.headers || {}),
      },
    });
  };

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);

      try {
        const res = await authFetch("/api/cart");
        if (!res.ok) throw new Error("Failed to load cart");

        const data = await res.json();

        const normalizedItems: CartItem[] = (data.cartItems || []).map(
          (item: any) => ({
            id: item.id,
            name: item.name,
            category: item.category,
            price: Number(item.price),
            quantity: item.quantity,
            image:
              item.image_url
                ?.split(",")
                .map((img: string) =>
                  img.replace(/\n/g, "").trim()
                )
                .find(Boolean) || "",
          })
        );

        setItems(normalizedItems);
      } catch (error) {
        console.error(error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const addItem = async (product: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      return existing
        ? prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        )
        : [...prev, product];
    });

    await authFetch("/api/cart", {
      method: "POST",
      body: JSON.stringify({
        productId: product.id,
        quantity: product.quantity,
      }),
    });
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => item.id !== productId));
      await authFetch("/api/cart", {
        method: "DELETE",
        body: JSON.stringify({ productId }),
      });
      return;
    }

    setItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );

    await authFetch("/api/cart", {
      method: "POST",
      body: JSON.stringify({
        productId,
        quantity,
      }),
    });
  };


  const removeItem = async (productId: string) => {
    setItems((prev) =>
      prev.filter((item) => item.id !== productId)
    );

    await authFetch("/api/cart", {
      method: "DELETE",
      body: JSON.stringify({ productId }),
    });
  };

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return {
    items,
    addItem,
    updateQuantity,
    removeItem,
    subtotal,
    loading,
  };
};

export default useShoppingCart;
