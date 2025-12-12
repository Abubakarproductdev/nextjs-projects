import React from "react";
import ProductDetails from "./ProductDetails"; // Import the client component

export default async function Page({ params }) {
  const resolveparams = await params;
  const { id } = resolveparams;

  // 1. Fetch actual product based on ID
  const res = await fetch(`https://dummyjson.com/products/${id}`, {
    cache: "no-store",
  });
  const product = await res.json();

  // 2. Format Data for the UI
  const formattedProduct = {
    name: product.title,
    price: product.price,
    oldPrice: product.price + 200,
    discount: product.discountPercentage
      ? `${Math.round(product.discountPercentage)}% OFF`
      : "10% OFF",
    stock: product.stock > 0 ? "In Stock" : "Out of Stock",
    delivery: "1-3 Days",
    deliveryArea: "Nationwide",
    country: product.brand || "Imported",
    shippedBy: "Naheed",
    highlights: [
      "High-quality and durable design",
      "Customer-favorite product",
      "Delivered fast across Pakistan",
      "Trusted by thousands of users",
      "Best value for money",
    ],
    rating: product.rating,
    reviews: [
      {
        title: "Great Product",
        rating: 5,
        content: "Loved the quality! Exactly as shown.",
        author: "Ali",
        date: "12/01/24",
      },
      {
        title: "Worth it",
        rating: 4,
        content: "Good purchase for the price.",
        author: "Sara",
        date: "11/15/24",
      },
    ],
    image: product.images[0],
  };
const productForCart = { 
    id: id, 
    title: product.title, 
    price: product.price,
    image: product.images[0] 
};  // 3. Pass both the formatted data AND the raw product data to the client component
  return (
    <ProductDetails 
      formattedProduct={formattedProduct} 
      productOriginal={productForCart} 
    />
  );
}