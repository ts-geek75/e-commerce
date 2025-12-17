"use client";

import React from "react";
import Link from "next/link";
import Loader from "./loader";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image_url: string;
}

interface Props {
  products: Product[];
  loading: boolean;
}

const ProductGrid: React.FC<Props> = ({ products, loading }) => {
  if (loading) {
    return <Loader />
  }

  return (
    <section>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-8">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="group"
          >
            <div className="overflow-hidden rounded">
              <img
                src={product.image_url}
                alt={product.name}
                className="h-40 sm:h-65 w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            <div className="mt-3 space-y-1">
              <h2 className="text-xs sm:text-sm text-gray-600 capitalize">
                {product.category}
              </h2>

              <div className="flex items-center justify-between">
                <p className="text-xs sm:text-sm font-medium truncate">{product.name}</p>
                <p className="text-xs sm:text-sm  font-semibold">₹{product.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
