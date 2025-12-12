"use client"
import React from 'react'
import { useEffect, useState } from "react";

const hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { bg: "from-blue-600 to-blue-800", title: "Holiday Sale", subtitle: "Up to 70% Off on Electronics", cta: "Shop Now" },
    { bg: "from-purple-600 to-purple-800", title: "New Arrivals", subtitle: "Discover the Latest Trends", cta: "Explore" },
    { bg: "from-orange-600 to-orange-800", title: "Free Shipping", subtitle: "On Orders Over $50", cta: "Learn More" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-96 overflow-hidden">
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 bg-gradient-to-r ${slide.bg} transition-opacity duration-1000 ${
            idx === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="container mx-auto px-8 h-full flex items-center">
            <div className="text-white max-w-2xl">
              <h1 className="text-5xl font-bold mb-4">{slide.title}</h1>
              <p className="text-xl mb-6">{slide.subtitle}</p>
              <button className="bg-white text-gray-900 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition">
                {slide.cta}
              </button>
            </div>
          </div>
        </div>
      ))}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-3 h-3 rounded-full transition ${
              idx === currentSlide ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default hero