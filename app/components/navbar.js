"use client";
import { useState } from "react";
import Link from "next/link";
import { useClerk, UserButton } from "@clerk/nextjs";
import { ShoppingCart, User, ChevronDown, Car } from "lucide-react";
import { useCart } from "@/context/CartContext";



export default function Navbar() {
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const { user } = useCart();
  const { openSignIn } = useClerk();





  return (
    <header className="bg-blue-700 text-white">
      <div className="flex items-center justify-between px-6 py-2">
        {/* Logo */}
        <Link href={`/`}>
          <div className="flex items-center space-x-2">
            <img src="/H__2_-removebg-preview.png" alt="industrial ideation" className="h-15" />
          </div>
        </Link>

        {/* Categories */}
        <div className="relative">
          <button
            onClick={() => setCategoriesOpen(!categoriesOpen)}
            className="flex items-center bg-blue-800 px-4 py-2 rounded-md"
          >
            Categories <ChevronDown className="ml-1 h-4 w-4" />
          </button>
          {categoriesOpen && (
            <div className="absolute left-0 top-full mt-1 w-40 bg-white text-black rounded-md shadow-md z-50">
              <ul className="space-y-1 p-2 text-sm">
                <li className="hover:bg-gray-100 px-2 py-1 rounded">Groceries</li>
                <li className="hover:bg-gray-100 px-2 py-1 rounded">Beauty</li>
                <li className="hover:bg-gray-100 px-2 py-1 rounded">Hair Care</li>
              </ul>
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div className="flex w-1/3">
          <input
            type="text"
            placeholder="Search Naheed"
            className="w-full border-amber-50 border-2 bg-amber-50 rounded-l-md px-3 py-2 text-black focus:outline-none"
          />
          <button className="bg-white text-black px-4 rounded-r-md font-semibold">
            <lord-icon
              className="h-6 w-6"
              src="https://cdn.lordicon.com/wjyqkiew.json"
              trigger="hover"
              stroke="bold"

            >
            </lord-icon>
          </button>
        </div>

        {/* Icons */}

        <div className="flex items-center space-x-6">
          <Link href="/AddToCart">
            <div className="flex items-center  space-x-1">

              <lord-icon
                className="h-7 w-7"

                src="https://cdn.lordicon.com/uisoczqi.json"
                trigger="hover"
                colors="primary:#ffffff,secondary:#ffffff"
                stroke="bold"


              >
              </lord-icon>

            </div></Link>

          <div className="flex items-center space-x-1">
            <lord-icon
              className="h-7 w-7"
              src="https://cdn.lordicon.com/nvsfzbop.json"
              trigger="hover"
              stroke="bold"
              colors="primary:#ffffff,secondary:#ffffff"
            >
            </lord-icon>
          </div>
          {user ?
            <>
              
              <div className="flex items-center space-x-1">
                <Link href="/OrderPage">
                <lord-icon
                  src="https://cdn.lordicon.com/qfijwmqj.json"
                  trigger="hover"
                  stroke="bold"
                  colors="primary:#ffffff,secondary:#ffffff"
                >
                </lord-icon></Link>
              </div>
              <UserButton className="h-8 w-8" />

            </> :

            <div className="flex items-center space-x-1">
              <User className="h-5 w-5" />
              <button onClick={openSignIn} className="text-sm">Account</button>
            </div>}

        </div>
      </div>
    </header>
  );
}
