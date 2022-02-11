import React from "react";
import { useRouter } from "next/router";
import data from "../../utils/data";

export default function ProductPage() {
  const router = useRouter();
  const { slug } = router.query;
  const product = data.products.find((product) => product.slug === slug);
  if (!product) {
    return <h1>Product not found</h1>;
  }
  return <div>{product.name}</div>;
}
