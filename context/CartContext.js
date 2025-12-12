"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
const CartContext = createContext();

export function CartProvider({ children }) {
  // Initialize with empty array
  const [cartItems, setCartItems] = useState([]);
  
  const {user}=useUser();

  // 1. LOAD DATA: When the app starts, read from Local Storage
  useEffect(() => {
    // We check if window is defined to avoid server-side errors
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        try {
          setCartItems(JSON.parse(storedCart));
        } catch (error) {
          console.error("Failed to parse cart data", error);
        }
      }
    }
  }, []);

  // 2. SAVE DATA: Whenever cartItems changes, save to Local Storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // --- Logic: Add to Cart ---
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // --- Logic: Remove from Cart ---
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // --- Logic: Update Quantity ---
  const updateQuantity = (id, amount) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + amount);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  return (
    <CartContext.Provider
      value={{
        user,
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}