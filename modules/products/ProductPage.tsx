"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

import Breadcrumb from "@/components/common/Breadcrumb";
import { ProductGrid } from "@/modules/products/components";
import { useGetProductsQuery } from "@/redux/apis/ProductsApi";

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


  const { data: products = [], isLoading: loading } = useGetProductsQuery(filters);

  const breadcrumbItems = [
    { label: "Home", href: "/home" },
    { label: "Shop", href: "/products" },
    ...(filters.category && filters.category.length > 0
      ? [{ label: filters.category.join(", ") }]
      : []),
    ...(filters.search
      ? [{ label: `Search: ${filters.search}` }]
      : []),
  ];

  return (
    <div className="pt-4 sm:pt-8 px-4 space-y-6 pb-9">
      <Breadcrumb items={breadcrumbItems} />
      <ProductGrid products={products} loading={loading} />
    </div>
  );
};

export default ProductsPage;