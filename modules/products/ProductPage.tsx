"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

import Breadcrumb from "@/components/common/Breadcrumb";
import ProductGrid from "@/components/common/ProductGrid";
import useGetProducts from "@/modules/products/hooks/useGetProducts";

const ProductsPage: React.FC = () => {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") || undefined;

  const { products, loading } = useGetProducts(categoryParam);

  const formatLabel = (label: string | undefined) => {
    if (!label) return "Shop";
    return label.charAt(0).toUpperCase() + label.slice(1);
  };

  return (
    <div className="pt-16 md:pt-20 px-4 space-y-6 pb-9">
      <Breadcrumb
        items={[
          { label: "Home", href: "/home" },
          { label: "Shop", href: "/products" },
          categoryParam ? { label: formatLabel(categoryParam) } : null,
        ].filter(Boolean) as any}
      />

      <ProductGrid products={products} loading={loading} />
    </div>
  );
};

export default ProductsPage;
