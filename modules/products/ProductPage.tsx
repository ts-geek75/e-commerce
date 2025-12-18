"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import Breadcrumb from "@/components/common/Breadcrumb";
import { ProductGrid } from "@/modules/products/components";
import useGetProducts from "@/modules/products/hooks/useGetProducts";

const ProductsPage: React.FC = () => {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") || undefined;

  const { products, loading } = useGetProducts(categoryParam);

  const breadcrumbItems = [
    { label: "Home", href: "/home" },
    { label: "Shop", href: "/products" },
    ...(categoryParam
      ? [{ label: categoryParam }]
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
