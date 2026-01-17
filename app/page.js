"use client";
import React, { useEffect, useState, useRef } from "react";
import { Truck, ShieldCheck, Headphones, RefreshCcw } from "lucide-react";
import Grid from "./components/grid";
import Hero from "./components/hero";


const Page = () => {
  const [products, setProducts] = useState([]);
  const sectionref = useRef({});
    

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((err) => console.error(err));
  }, []);

  const categories = [...new Set(products.map((item) => item.category))];

  const handleScroll = (category) => {
    const section = sectionref.current[category];
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const renderSection = (category, bg = "white") => {
    const filtered = products.filter((item) => item.category === category);
    if (filtered.length === 0) return null;

    return (
      <section
        ref={(el) => (sectionref.current[category] = el)}
        className={`${bg} py-10`}
        key={category}
      >
        <div className="container mx-auto px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 capitalize border-l-4 border-blue-600 pl-4">
              {category}
            </h2>

            <button className="text-blue-600 font-semibold hover:text-blue-700 transition text-sm">
              See all →
            </button>
          </div>

          <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
            {filtered.map((item, index) => (
                <Grid
                key={item.id}
                indexes={index}
                  id={item.id}
                  name={item.title}
                  images={item.images[0]}
                  catname={item.category}
                  prices={item.price}
                  ratings={item.rating}
                />
            ))}
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Category Navigation */}
      <div className="bg-blue-700 flex justify-center border-t border-blue-500 sticky top-0 z-50">
        <div className="container mx-auto px-8">
          <div className="flex gap-6 text-white text-sm py-2 overflow-x-auto">
            {categories.map((category, idx) => (
              <button
                key={idx}
                onClick={() => handleScroll(category)}
                className="whitespace-nowrap hover:text-gray-200 transition font-medium"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Hero */}
      <Hero />
      

      {/* Quick Links */}
      <div className="bg-white py-8 border-b">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Truck, text: "Free Shipping", sub: "On orders $50+" },
              { icon: RefreshCcw, text: "Easy Returns", sub: "30-day policy" },
              { icon: ShieldCheck, text: "Secure Checkout", sub: "100% protected" },
              { icon: Headphones, text: "24/7 Support", sub: "Here to help" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-4 rounded-lg hover:bg-gray-50 transition"
              >
                <item.icon className="w-10 h-10 text-blue-600" />
                <div>
                  <div className="font-semibold text-gray-900">{item.text}</div>
                  <div className="text-xs text-gray-600">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Sections */}
      {renderSection("beauty")}
      {renderSection("furniture")}
      {renderSection("fragrances")}
      {renderSection("groceries")}
    </div>
  );
};

export default Page;
