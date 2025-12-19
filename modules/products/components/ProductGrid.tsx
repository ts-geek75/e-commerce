"use client";

import React, { useState } from "react"; // Added useState for toggle effect
import Link from "next/link";
import { Heart } from "lucide-react"; // Import the icon
import Loader from "@/components/common/loader";
import FilterSidebar from "./ProductFilterPanel";
import { Product } from "../types/ProductType";

interface Props {
  products: Product[];
  loading: boolean;
}

const ProductGrid: React.FC<Props> = ({ products, loading }) => {
  // Local state to handle heart toggle (usually this would connect to an API)
  const [wishlist, setWishlist] = useState<string[]>([]);

  const toggleWishlist = (e: React.MouseEvent, uuid: string) => {
    e.preventDefault(); // Prevents the Link from triggering
    e.stopPropagation(); // Prevents bubbling up to the Link
    
    setWishlist((prev) =>
      prev.includes(uuid) ? prev.filter((id) => id !== uuid) : [...prev, uuid]
    );
  };

  if (loading) return <Loader />;

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
        <h3 className="text-lg font-medium text-primary-text">No products found</h3>
        <Link href="/products" className="text-xs uppercase font-medium border-b border-gray-200 pb-1 text-primary-text-gray hover:text-primary-text">
          Back to all products
        </Link>
      </div>
    );
  }

  return (
    <section>
      <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-7">
        <div className="text-sm text-primary-text-gray">{products.length} items</div>
        <FilterSidebar />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-8">
        {products.map((product) => {
          const isOutOfStock = product.stock <= 0;
          const isLiked = wishlist.includes(product.uuid);

          return (
            <Link
              key={product.uuid}
              href={isOutOfStock ? "#" : `/products/${product.uuid}`}
              className={`group relative ${isOutOfStock ? "pointer-events-none opacity-60" : ""}`}
            >
              <div className="relative overflow-hidden">
                <button
                  onClick={(e) => toggleWishlist(e, product.uuid)}
                  className="absolute top-2 right-2 z-10 p-1.5 bg-white/80 rounded-full shadow-sm hover:bg-white transition-colors duration-200 pointer-events-auto"
                >
                  <Heart
                    size={18}
                    className={`transition-colors duration-300 ${
                      isLiked ? "fill-red-400 text-red-400" : "text-gray-600"
                    }`}
                  />
                </button>

                <img
                  src={product.image_url.split(",")[0].trim()}
                  alt={product.name}
                  className="h-40 sm:h-65 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {isOutOfStock && (
                  <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                    <span className="text-white text-sm sm:text-2xl font-bold uppercase">
                      Out of stock
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-3 space-y-1">
                <h2 className="text-xs sm:text-sm text-primary-text-gray capitalize">
                  {product.category}
                </h2>
                <div className="flex items-center justify-between">
                  <p className="text-xs sm:text-sm font-medium truncate">{product.name}</p>
                  <p className="text-xs sm:text-sm font-semibold">₹{product.price}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default ProductGrid;