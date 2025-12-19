import React, { Suspense } from "react";
import Navbar from "@/components/Navbar";
import ProductsPage from "@/modules/products/ProductPage";
import Loader from "@/components/common/loader";

const Products: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Suspense fallback={<Loader />}>
        <ProductsPage />
      </Suspense>
    </div>
  );
};

export default Products;