"use client"; // This line is required for hooks like useCart

import React from "react";
import Image from "next/image";
import { Star, Truck, RefreshCcw, CreditCard, Headphones } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from '@/context/CartContext'; // Adjust path if needed
import Link from "next/link";
import { useClerk, UserButton } from "@clerk/nextjs";


export default function ProductDetails({ formattedProduct, productOriginal }) {
  const [showsucess, setShowsucess] = useState(false)
  const { addToCart } = useCart();
  const {user}=useCart();
  const {openSignIn}= useClerk();
  const handleAddToCart = () => {
    addToCart(productOriginal);
    setShowsucess(true);

    setTimeout(() => {
      setShowsucess(false);

    }, 3000);


  }

  const renderStars = (rating) => {
    return (
      <div className="flex text-yellow-400">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={16}
            fill={i < Math.floor(rating) ? "gold" : "none"}
            stroke="gold"
          />
        ))}
      </div>
    );
  };


  return (
    <div className="max-w-6xl mx-auto p-6 text-gray-800">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        Home &gt; Category &gt; Product
      </div>

      {/* Product Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Image */}
        <div>
          <Image
            src={formattedProduct.image}
            alt="product"
            width={400}
            height={400}
            className="rounded-lg shadow-sm border object-cover"
          />
        </div>

        {/* Details */}
        <div className="md:col-span-2">
          <h1 className="text-lg font-semibold mb-2">{formattedProduct.name}</h1>

          <div className="flex items-center gap-2 text-sm mb-2">
            {renderStars(formattedProduct.rating)}
            <span className="text-gray-500">(2 Reviews)</span>
          </div>

          <div className="flex items-center gap-3 mb-2">
            <span className="text-xl font-bold text-red-600">
              Rs. {formattedProduct.price}
            </span>
            <span className="line-through text-gray-400 text-sm">
              Rs. {formattedProduct.oldPrice}
            </span>
            <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
              {formattedProduct.discount}
            </span>
          </div>

          <div className="text-sm mb-3">
            <p>
              <span className="font-semibold">Stock:</span>{" "}
              {formattedProduct.stock}
            </p>
            <p>
              <span className="font-semibold">Delivery:</span>{" "}
              {formattedProduct.delivery}
            </p>
            <p>
              <span className="font-semibold">Delivery Area:</span>{" "}
              {formattedProduct.deliveryArea}
            </p>
            <p>
              <span className="font-semibold">Country of Origin:</span>{" "}
              {formattedProduct.country}
            </p>
            <p>
              <span className="font-semibold">Shipped By:</span>{" "}
              {formattedProduct.shippedBy}
            </p>
          </div>

          {/* Highlights */}
          <div className="mb-4">
            <h2 className="font-semibold mb-2">Product Highlights:</h2>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              {formattedProduct.highlights.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>
          {showsucess &&
            <div className="fixed top-155 right-5 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-xl z-50 text-gray-900">
              <h2 className="font-semibold text-sm">Item added to your cart</h2>
              <Link href="/AddToCart">
                <p className="text-blue-600 text-xs font-medium underline cursor-pointer">
                  View cart
                </p></Link>
            </div>



          }

          {/* Add to Cart - Interactive Button */}
          {user? 
          <button
            onClick={handleAddToCart


            }
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md text-sm font-medium"
          >
            Add to Cart
          </button>
          :
          <button
            onClick={openSignIn}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md text-sm font-medium"
          >
            Log In/Sign UP
          </button>}

          
        </div>

        {/* Sidebar */}
        <div className="hidden md:flex flex-col gap-4 text-sm text-gray-700 border-l pl-6">
          <div className="flex items-center gap-2">
            <Truck size={18} /> Fast Shipping (1–3 Days)
          </div>
          <div className="flex items-center gap-2">
            <RefreshCcw size={18} /> Free Returns (Within 7 Days)
          </div>
          <div className="flex items-center gap-2">
            <CreditCard size={18} /> Payment on Delivery
          </div>
          <div className="flex items-center gap-2">
            <Headphones size={18} /> Customer Support
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-t mt-8">
        <div className="flex gap-4 mt-4 border-b">
          <button className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-black">
            DESCRIPTION
          </button>
          <button className="px-4 py-2 text-sm font-semibold border-b-2 border-blue-600 text-blue-600">
            REVIEWS ({formattedProduct.reviews.length})
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-4">Customer Reviews</h2>

        <div className="space-y-6">
          {formattedProduct.reviews.map((review, idx) => (
            <div key={idx} className="border-b pb-4">
              <h3 className="font-semibold">{review.title}</h3>
              <div className="flex items-center text-sm text-gray-500">
                Overall Product Rating: {renderStars(review.rating)}
              </div>
              <p className="mt-2 text-sm">{review.content}</p>
              <p className="text-xs text-gray-400 mt-1">
                Review by <b>{review.author}</b> on {review.date}
              </p>
            </div>
          ))}
        </div>

        {/* User Rating Section */}
        <div className="mt-8">
          <h3 className="text-sm font-semibold mb-2">Your Rating</h3>
          {renderStars(0)}
        </div>
      </div>
    </div>
  );
}