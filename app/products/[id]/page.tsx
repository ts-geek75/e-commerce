"use client";

import { useParams } from "next/navigation";
import ProductDetails from "@/modules/products/components/ProductDetails";
import Navbar from "@/components/Navbar";

const ProductId = () => {
  const params = useParams();
  const productId = Array.isArray(params.id) ? params.id[0] : params.id;
  if (!productId) return <p>Product not found</p>;

  return (
    <>
      <Navbar />
      <ProductDetails productId={productId} />
    </>
  );
};

export default ProductId;
