"use client";

import React, { createContext, useContext } from "react";
import useShoppingCart, { CartItem } from "../hooks/useShoppingCart";

interface ShoppingCartContextValue {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  subtotal: number;
  loading: boolean;
}

const ShoppingCartContext = createContext<ShoppingCartContextValue | null>(null);

const ShoppingCartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const cart = useShoppingCart();

  return (
    <ShoppingCartContext.Provider value={cart}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(ShoppingCartContext);
  if (!context) throw new Error("useCart must be used within ShoppingCartProvider");
  return context;
};

export default ShoppingCartProvider;
