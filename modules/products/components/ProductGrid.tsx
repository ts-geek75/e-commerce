"use client";

import React from "react";
import Link from "next/link";
import Loader from "@/components/common/loader";
import FilterSidebar from "./ProductFilterPanel";
import { Product } from "../types/ProductType";

interface Props {
  products: Product[];
  loading: boolean;
}

const ProductGrid: React.FC<Props> = ({ products, loading }) => {
  if (loading) {
    return <Loader />;
  }
  console.log(products);
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

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-8">
        {products.map((product) => {
          const isOutOfStock = product.stock <= 0;

          return (
            <Link
              key={product.uuid}
              href={isOutOfStock ? "#" : `/products/${product.uuid}`}
              className={`group ${
                isOutOfStock ? "pointer-events-none opacity-60" : ""
              }`}
            >
              <div className="relative overflow-hidden">
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
                  <p className="text-xs sm:text-sm font-medium truncate">
                    {product.name}
                  </p>
                  <p className="text-xs sm:text-sm  font-semibold">
                    ₹{product.price}
                  </p>
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
