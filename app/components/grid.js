"use client";
import Link from "next/link";

import React, { useState } from "react";
import { Star, StarHalf, StarOff, ShoppingCart } from "lucide-react";

const Grid = ({ indexes, id, name, images, catname, prices, ratings }) => {
  const [isHovered, setIsHovered] = useState(false);
  

  // Helper to render rating stars
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center gap-0.5">
        {Array(fullStars)
          .fill()
          .map((_, i) => (
            <Star key={`f-${i}`} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          ))}
        {hasHalfStar && <StarHalf className="w-4 h-4 text-yellow-400 fill-yellow-400" />}
        {Array(emptyStars)
          .fill()
          .map((_, i) => (
            <StarOff key={`e-${i}`} className="w-4 h-4 text-gray-300" />
          ))}
      </div>
    );
  };

  return (
    <div
      className={`min-w-[230px] bg-white rounded-xl border border-gray-200 p-4 transition-all cursor-pointer ${
        isHovered ? "shadow-xl scale-[1.02]" : "shadow-sm"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative mb-3 flex justify-center items-center h-48 bg-gray-50 rounded-lg">
        <img
          src={images}
          alt={name}
          className="h-full w-auto object-contain rounded-md"
        />
        
      </div>

      {/* Product Details */}
      <div className="px-1">
        <h3 className="text-sm font-semibold overflow-x-hidden text-gray-900 line-clamp-2 mb-1">{name.length > 20 ? name.substring(0, 20) + "..." : name}</h3>
        <p className="text-xs text-gray-500 mb-2 capitalize">{catname}</p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-2">
          {renderStars(ratings)}
          <span className="text-xs text-gray-600">({ratings?.toFixed(1) || "4.5"})</span>
        </div>

        {/* Price */}
        <p className="text-lg font-bold text-blue-600">${prices?.toFixed(2) || "49.99"}</p>

        {/* Add to Cart Button */}
        <Link key={indexes} href={`/product/${id}`}>
        <button className="w-full mt-3 bg-blue-600 text-white py-2 rounded-md text-sm font-semibold hover:bg-blue-700 transition">
          Buy Now!
        </button>
        </Link>

      </div>
    </div>
  );
};

export default Grid;
