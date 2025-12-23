"use client";

import { useParams } from "next/navigation";
import ProductDetails from "@/modules/products/components/ProductDetails";

const ProductId = () => {
  const params = useParams();
  const productId = Array.isArray(params.id) ? params.id[0] : params.id;
  if (!productId) return <p>Product not found</p>;

  return (
    <>
      <ProductDetails productId={productId} />
    </>
  );
};

export default ProductId;
