"use client";

import React from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import Loader from "@/components/common/loader";
import FilterSidebar from "./ProductFilterPanel";
import { Product } from "../../../types/ProductType";
import {
  useGetFavouritesQuery,
  useAddFavouriteMutation,
  useRemoveFavouriteMutation,
} from "@/redux/apis/FavouritesApi";

interface Props {
  products: Product[];
  loading: boolean;
}

const ProductGrid: React.FC<Props> = ({ products, loading }) => {
  const { data: favourites = [], isLoading: favLoading } =
    useGetFavouritesQuery();
  const [addFavourite] = useAddFavouriteMutation();
  const [removeFavourite] = useRemoveFavouriteMutation();

  const isProductLiked = (uuid: string) =>
    favourites.some((f) => f.uuid === uuid);

  const toggleWishlist = async (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();

    if (isProductLiked(product.uuid)) {
      await removeFavourite(product.uuid);
    } else {
      await addFavourite({
        uuid: product.uuid,
        name: product.name,
        image: product.image_url.split(",")[0].trim(),
        price: product.price,
        category: product.category,
      });
    }
  };

  if (loading || favLoading) return <Loader />;

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
        <h3 className="text-lg font-medium text-primary-text">
          No products found
        </h3>
        <Link
          href="/products"
          className="text-xs uppercase font-medium border-b border-gray-200 pb-1 text-primary-text-gray hover:text-primary-text"
        >
          Back to all products
        </Link>
      </div>
    );
  }

  return (
    <section>
      <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-7">
        <div className="text-sm text-primary-text-gray">
          {products.length} items
        </div>
        <FilterSidebar />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-8">
        {products.map((product) => {
          const isOutOfStock = product.stock <= 0;
          const isLiked = isProductLiked(product.uuid);
          return (
            <div key={product.uuid} className="group relative">
              <button
                onClick={(e) => toggleWishlist(e, product)}
                className="absolute top-2 right-2 z-20 p-1.5 bg-white/90 rounded-full shadow-md hover:scale-110 transition-transform duration-200"
              >
                <Heart
                  size={18}
                  className={`transition-colors duration-300 ${
                    isLiked
                      ? "fill-red-400 text-red-400"
                      : "text-primary-text-gray"
                  }`}
                />
              </button>
              <Link href={`/products/${product.uuid}`}>
                <div
                  className={`relative overflow-hidden ${
                    isOutOfStock ? "opacity-60" : ""
                  }`}
                >
                  <img
                    src={product.image_url.split(",")[0].trim()}
                    className="h-40 sm:h-65 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt={product.name}
                  />
                  {isOutOfStock && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="text-white text-xs sm:text-sm font-bold uppercase bg-black/60 px-3 py-1">
                        Out of stock
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-3 space-y-1">
                  <h2 className="text-[10px] sm:text-xs text-primary-text-gray uppercase tracking-wider">
                    {product.category}
                  </h2>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <p className="text-xs sm:text-sm font-medium truncate pr-2">
                      {product.name}
                    </p>
                    <p className="text-xs sm:text-sm font-bold text-primary-text">
                      ₹{product.price}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProductGrid;
