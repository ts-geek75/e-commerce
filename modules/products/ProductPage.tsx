"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

import Breadcrumb from "@/components/common/Breadcrumb";
import { ProductGrid } from "@/modules/products/components";
import useGetProducts from "@/modules/products/hooks/useGetProducts";

const ProductsPage: React.FC = () => {
  const searchParams = useSearchParams();

  const uuid = searchParams.get("id"); 

  const filters = {
    uuid: uuid || undefined, 
    search: searchParams.get("search") || undefined,
    category: searchParams.getAll("category"),
    material: searchParams.getAll("material"),
    price: searchParams.getAll("price"),
  };

  const normalizedFilters = Object.fromEntries(
    Object.entries(filters).filter(
      ([, value]) =>
        value !== undefined &&
        !(Array.isArray(value) && value.length === 0)
    )
  );

  const { products, loading } = useGetProducts(normalizedFilters);

  const breadcrumbItems = [
    { label: "Home", href: "/home" },
    { label: "Shop", href: "/products" },
    ...(filters.category?.length
      ? [{ label: filters.category.join(", ") }]
      : []),
    ...(filters.search
      ? [{ label: `Search: ${filters.search}` }]
      : []),
  ];

  return (
    <div className="pt-16 md:pt-20 px-4 space-y-6 pb-9">
      <Breadcrumb items={breadcrumbItems} />
      <ProductGrid products={products} loading={loading} />
    </div>
  );
};

export default ProductsPage;
