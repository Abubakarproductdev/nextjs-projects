"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link"; // Import Link for navigation
import { FiMinus, FiPlus, FiX, FiTruck, FiArrowLeft } from "react-icons/fi";
import { useCart } from "@/context/CartContext"; // Ensure path is correct

export default function CartPage() {
  // 1. Get real data and functions from Context
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  // 2. Calculate Totals Automatically
  // We use useMemo so it only recalculates when cartItems change
  const totals = useMemo(() => {
    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const salesTax = subtotal * 0.1; // Assuming 10% tax (Adjust as needed)
    const grandTotal = subtotal + salesTax;
    return { subtotal, salesTax, grandTotal };
  }, [cartItems]);

  // Custom Orange color defined in the image
  const orangeColorClass = "text-[#FF6600]";

  // 3. Handle Empty State
  if (cartItems.length === 0) {
    return (
      <div className="bg-white min-h-screen flex flex-col items-center justify-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Your Cart is Empty</h1>
        <p className="text-gray-500">Looks like you havent added anything yet.</p>
        <Link href="/home">
          <button className="bg-black text-white px-6 py-3 rounded-md font-bold hover:bg-gray-800 transition">
            Continue Shopping
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen font-sans text-gray-900 font-medium">
      <main className="max-w-5xl mx-auto px-4 py-12">
        
        {/* Page Title */}
        <h1 className="text-3xl font-extrabold text-center mb-12">
          Your Cart ({cartItems.length} items)
        </h1>

        {/* Cart Table Header */}
        <div className="hidden md:grid grid-cols-12 border-b border-gray-200 pb-4 mb-6 text-sm font-bold">
          <div className="col-span-6">Item</div>
          <div className="col-span-2 text-center">Price</div>
          <div className="col-span-2 text-center">Quantity</div>
          <div className="col-span-2 text-right relative left-4">Total</div>
        </div>

        {/* Cart Items List */}
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-1 md:grid-cols-12 gap-y-4 md:gap-x-4 border-b border-gray-200 pb-8 items-center relative"
            >
              {/* 1. Item Details Column */}
              <div className="col-span-6 flex items-start">
                {/* Product Image */}
                <div className="w-24 h-24 relative flex-shrink-0 mr-6 border border-gray-100 rounded p-1">
                  {/* We try to use item.thumbnail or item.image, checking valid sources */}
                  <Image
                    src={item.thumbnail || item.images?.[0] || item.image }
                    alt={item.title || item.name}
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Product Text Info */}
                <div className="flex flex-col items-start">
                  <h2 className="text-xl font-extrabold leading-tight">
                    {item.title || item.name}
                  </h2>
                  
                  {/* Brand or Category as subtitle since real API doesn't have marketing subtitles */}
                  <p className={`text-base font-bold mt-1 ${orangeColorClass}`}>
                    {item.brand ? `Brand: ${item.brand}` : "In Stock"}
                  </p>

                  {/* Stock Status */}
                  <p className="text-gray-600 text-sm mt-1">
                    {item.stock > 0 ? "Fuel Source: Standard" : "Out of Stock"}
                  </p>
                </div>
              </div>

              {/* 2. Price Column */}
              <div className="col-span-2 text-center text-base font-bold">
                ${item.price}
              </div>

              {/* 3. Quantity Column */}
              <div className="col-span-2 flex justify-center">
                <div className="flex items-center border border-gray-300 rounded-sm overflow-hidden h-10">
                  {/* DECREMENT BUTTON */}
                  <button 
                    onClick={() => updateQuantity(item.id, -1)}
                    className="px-3 h-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition"
                  >
                    <FiMinus size={14} className="stroke-[3px]" />
                  </button>
                  
                  <div className="w-12 h-full flex items-center justify-center font-bold border-l border-r border-gray-300">
                    {item.quantity}
                  </div>

                  {/* INCREMENT BUTTON */}
                  <button 
                    onClick={() => updateQuantity(item.id, 1)}
                    className="px-3 h-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition"
                  >
                    <FiPlus size={14} className="stroke-[3px]" />
                  </button>
                </div>
              </div>

              {/* 4. Total Column & Remove Button */}
              <div className="col-span-2 text-right font-bold text-base flex justify-end items-center">
                <span>${(item.price * item.quantity).toFixed(2)}</span>
                
                {/* REMOVE BUTTON */}
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="ml-6 text-gray-400 hover:text-red-600 transition p-1 rounded-full bg-gray-100/50"
                >
                  <FiX size={14} className="stroke-[3px]" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary Section */}
        <div className="mt-12 flex flex-col items-end">
          <div className="w-full md:w-1/3 space-y-4 text-right">
            {/* Subtotal */}
            <div className="flex justify-between text-base font-bold">
              <span className="text-gray-800">Subtotal:</span>
              <span>${totals.subtotal.toFixed(2)}</span>
            </div>

            {/* Sales Tax */}
            <div className="flex justify-between text-base font-bold pb-4 border-b border-gray-200">
              <span className="text-gray-800">Sales Tax (10%):</span>
              <span className="text-gray-500">${totals.salesTax.toFixed(2)}</span>
            </div>

            {/* Coupon Code */}
            <div className="flex justify-between text-base font-bold py-2 border-b border-gray-200">
              <span className="text-gray-800">Coupon Code:</span>
              <button className="text-gray-500 underline hover:text-gray-700">
                Add Coupon
              </button>
            </div>

            {/* Grand Total */}
            <div className="flex justify-between text-2xl font-extrabold pt-2">
              <span>Grand total:</span>
              <span>${totals.grandTotal.toFixed(2)}</span>
            </div>

            {/* Shipping Message Bar */}
            <div className="mt-6 mb-4">
              <div className="flex items-center justify-between text-xs font-bold mb-2">
                <span className="flex items-center">
                  Based on items in your cart youre eligible for <span className="ml-1 font-extrabold">Free Shipping</span>
                </span>
                <FiTruck className="text-gray-700 h-5 w-5 transform scale-x-[-1]" />
              </div>
              {/* Green Progress Bar Line */}
              <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full w-full bg-green-500"></div>
              </div>
            </div>

            {/* Checkout Button - USING LINK HERE */}
            <Link href="/checkout" className="block w-full">
              <button className="w-full bg-black text-white text-base font-bold py-4 rounded-sm hover:bg-gray-900 transition-colors">
                Check out
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}