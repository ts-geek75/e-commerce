"use client";

import React from "react";
import { Heart, Trash2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Loader from "@/components/common/loader";
import Link from "next/link";
import {
  useGetFavouritesQuery,
  useRemoveFavouriteMutation,
} from "@/redux/apis/FavouritesApi";

const FavoriteProducts: React.FC = () => {
  const { data: favourites = [], isLoading } = useGetFavouritesQuery();
  const [removeFavourite] = useRemoveFavouriteMutation();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative p-2 hover:bg-gray-100 rounded-full">
          <Heart size={20} />
          {favourites.length > 0 && (
            <span className="absolute top-0 right-0 bg-red-400 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
              {favourites.length}
            </span>
          )}
        </button>
      </SheetTrigger>

      <SheetContent side="right" className="w-full max-w-[350px] flex flex-col">
        <SheetHeader className="border-b pb-4">
          <SheetTitle>Your Favorites</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4 px-4">
          {isLoading ? (
            <Loader />
          ) : favourites.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">No favorites yet.</p>
          ) : (
            <div className="space-y-4">
              {favourites.map((item) => (
                <div
                  key={item.uuid}
                  className=" mx-4 flex items-center gap-4 p-3 border rounded-xl hover:shadow-sm transition-shadow"
                >

                  <Link
                    href={`/products/${item.uuid}`}
                    className="text-sm font-semibold truncate block hover:underline"
                  >
                    <div className="h-20 w-16 shrink-0 overflow-hidden ">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/products/${item.uuid}`}
                      className="text-base font-medium truncate block hover:underline"
                    >
                      {item.name}
                    </Link>
                    <p className="text-sm text-primary-text mt-1">
                      ₹{item.price}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFavourite(item.uuid)}
                    className="p-2 text-primary-text-gray hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        {favourites.length > 0 && (
          <div className="border-t p-6">
            <Link
              href="/products"
              className="block w-full text-center py-3 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default FavoriteProducts;
