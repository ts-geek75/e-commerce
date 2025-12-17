"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import ProductsPage from "@/modules/products/ProductPage";

const Products: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <ProductsPage />
    </div>
  );
};

export default Products;
