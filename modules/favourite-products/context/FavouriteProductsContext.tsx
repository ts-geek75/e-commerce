"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useFavourites as useFavouritesHook, FavouriteProduct } from "../hooks/useFavouriteProduct";

interface FavouriteContextType {
  favourites: FavouriteProduct[];
  loading: boolean;
  addFavourite: (product: FavouriteProduct) => Promise<void>;
  removeFavourite: (productUuid: string) => Promise<void>;
}

const FavouriteContext = createContext<FavouriteContextType | undefined>(undefined);

export const FavouriteProvider = ({ children }: { children: ReactNode }) => {
  const { favourites, loading, addFavourite, removeFavourite } = useFavouritesHook();

  return (
    <FavouriteContext.Provider value={{ favourites, loading, addFavourite, removeFavourite }}>
      {children}
    </FavouriteContext.Provider>
  );
};

export const useFavourites = () => {
  const context = useContext(FavouriteContext);
  if (!context) throw new Error("useFavourites must be used within FavouriteProvider");
  return context;
};
