"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface Category {
  url: string;
  href: string;
  name: string;
}

interface Props {
  categories: Category[];
}

const CategoryGrid: React.FC<Props> = ({ categories }) => {
  const router = useRouter();

  const handleClick = (category: string) => {
    router.push(`/products?category=${category.toLowerCase()}`);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 justify-center">
      {categories.map((item, index) => (
        <div
          key={index}
          className="w-full md:flex-1 text-center cursor-pointer"
          onClick={() => handleClick(item.name)}
        >
          <div className="group relative block overflow-hidden rounded">
            <img
              src={item.url}
              alt={item.name}
              className="h-[35vh] sm:h-[45vh] md:h-[60vh] w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
          </div>

          <h2 className="mt-4 text-lg font-semibold">{item.name}</h2>
          <p className="text-sm text-gray-600">
            Explore our exclusive collection of {item.name.toLowerCase()}.
          </p>
        </div>
      ))}
    </div>
  );
};

export default CategoryGrid;
