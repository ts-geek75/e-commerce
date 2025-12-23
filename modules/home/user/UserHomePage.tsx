"use client";

import React from "react";
import ProductCategoryDisplay from "@/components/common/CategoryGrid";
import ProductGrid from "@/modules/products/components/ProductGrid";
import { useGetProductsQuery } from "@/redux/apis/ProductsApi";

const UserHomePage: React.FC = () => {
  const categories = [
    {
      url: "/background/Bracelet1.png",
      href: "/shop/bracelets",
      name: "Bracelets",
    },
    {
      url: "/background/Earrings1.png",
      href: "/shop/earrings",
      name: "Earrings",
    },
    { url: "/background/Ring1.png", href: "/shop/rings", name: "Rings" },
  ];

  const { data: products = [], isLoading: loading } = useGetProductsQuery({});

  return (
    <div className="min-h-screen">
      <div className="mt-5 pt-16 md:pt-20 px-4 space-y-16 pb-9">
        <ProductCategoryDisplay categories={categories} />
        <ProductGrid products={products} loading={loading} />
      </div>
    </div>
  );
};

export default UserHomePage;
