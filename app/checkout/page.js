"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { FaPaypal, FaCreditCard } from "react-icons/fa";
import { useCart } from "@/context/CartContext";
import { useUser } from "@clerk/nextjs";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const { user } = useUser();
  const router = useRouter();

  // Form State
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  
  // Card State (Added to allow validation)
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: ""
  });

  // Error State
  const [errors, setErrors] = useState({});

  const totals = useMemo(() => {
    const subtotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const salesTax = subtotal * 0.1;
    const grandTotal = subtotal + salesTax;
    return { subtotal, salesTax, grandTotal };
  }, [cartItems]);

  // Handle Card Input Changes
  const handleCardChange = (field, value) => {
    setCardDetails(prev => ({ ...prev, [field]: value }));
    // Clear error for this field as user types
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  // Validation Logic
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    }

    if (!address.trim()) {
      newErrors.address = "Address is required";
      isValid = false;
    }

    if (paymentMethod === "card") {
      if (!cardDetails.number.trim()) {
        newErrors.cardNumber = "Card number is required";
        isValid = false;
      }
      if (!cardDetails.name.trim()) {
        newErrors.cardName = "Name on card is required";
        isValid = false;
      }
      if (!cardDetails.expiry.trim()) {
        newErrors.cardExpiry = "Expiry date is required";
        isValid = false;
      }
      if (!cardDetails.cvc.trim()) {
        newErrors.cardCvc = "CVC is required";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const placeOrder = async () => {
    if (!user) {
      toast.error("Please login first");
      return;
    }

    // 1. Run Validation
    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      // 2. Pass Phone and Address Correctly
      const res = await fetch("/api/Order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartItems,
          customer: {
            email: user.emailAddresses[0].emailAddress,
            name: user.fullName,
            address: address, // Passed correctly
            phone: phone,     // Passed correctly
          },
          paymentMethod,
          // Only pass card details if strictly necessary for backend, usually handled by Stripe/Gateway
          subtotal: totals.subtotal,
          tax: totals.salesTax,
          total: totals.grandTotal,
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Order placed successfully!");
        router.push("/");
        cartItems.length = 0; // Clear cart after successful order
        localStorage.cart = "[]"; // Clear cart after successful order
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to place order");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] text-gray-900 py-12">
      <ToastContainer />
      <div className="max-w-5xl mx-auto px-4 space-y-8">

        {/* ITEMS */}
        <Section title={`Your Items (${cartItems.length})`}>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 py-4 border-b border-gray-200 last:border-none"
            >
              <div className="w-14 h-14 bg-gray-100 rounded-lg relative">
                <Image
                  src={item.thumbnail || item.images?.[0] || item.image}
                  alt="item"
                  fill
                  className="object-contain p-2"
                />
              </div>

              <div className="flex-1">
                <div className="flex justify-between">
                  <p className="text-sm font-medium">{item.title}</p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    ×
                  </button>
                </div>

                <div className="flex justify-between items-center mt-2">
                  <div className="flex border border-gray-300 rounded-md overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="px-2 hover:bg-gray-100"
                    >
                      +
                    </button>
                    <div className="px-3 font-bold border-x border-gray-300">
                      {item.quantity}
                    </div>
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="px-2 hover:bg-gray-100"
                    >
                      −
                    </button>
                  </div>

                  <span className="text-sm font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </Section>

        {/* DELIVERY INFO */}
        <Section title="Delivery Info">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input 
              label="Email" 
              value={user?.emailAddresses[0].emailAddress || ""} 
              disabled 
            />
            <Input 
              label="Full name" 
              value={user?.fullName || ""} 
              disabled 
            />
            <Input 
              label="Phone" 
              placeholder="Phone number" 
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (errors.phone) setErrors({...errors, phone: null});
              }}
              error={errors.phone}
            />
            <Input
              label="Address"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                if (errors.address) setErrors({...errors, address: null});
              }}
              error={errors.address}
            />
          </div>
        </Section>

        {/* PAYMENT */}
        <Section title="Payment Method">
          <div className="flex gap-4">
            <PaymentOption
              active={paymentMethod === "card"}
              onClick={() => setPaymentMethod("card")}
              icon={<FaCreditCard />}
              label="Card"
            />
            <PaymentOption
              active={paymentMethod === "paypal"}
              onClick={() => setPaymentMethod("paypal")}
              icon={<FaPaypal />}
              label="PayPal"
            />
          </div>

          {paymentMethod === "card" && (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input 
                label="Card number" 
                value={cardDetails.number}
                onChange={(e) => handleCardChange('number', e.target.value)}
                error={errors.cardNumber}
              />
              <Input 
                label="Name on card" 
                value={cardDetails.name}
                onChange={(e) => handleCardChange('name', e.target.value)}
                error={errors.cardName}
              />
              <Input 
                label="Expiry date" 
                placeholder="MM/YY"
                value={cardDetails.expiry}
                onChange={(e) => handleCardChange('expiry', e.target.value)}
                error={errors.cardExpiry}
              />
              <Input 
                label="CVC" 
                value={cardDetails.cvc}
                onChange={(e) => handleCardChange('cvc', e.target.value)}
                error={errors.cardCvc}
              />
            </div>
          )}

          {paymentMethod === "paypal" && (
            <div className="mt-6 bg-gray-100 border border-gray-200 p-4 rounded-lg text-sm text-gray-600">
              You’ll be redirected to PayPal to complete payment.
            </div>
          )}
        </Section>

        {/* SUMMARY */}
        <Section>
          <Row label="Subtotal" value={`$${totals.subtotal.toFixed(2)}`} />
          <Row label="Tax (10%)" value={`$${totals.salesTax.toFixed(2)}`} />

          <div className="flex justify-between font-bold text-lg border-t border-gray-200 pt-4 mt-4">
            <span>Total</span>
            <span>${totals.grandTotal.toFixed(2)}</span>
          </div>

          <button
            onClick={placeOrder}
            className="w-full mt-6 py-3 rounded-lg bg-black text-white font-bold hover:opacity-90 transition-opacity"
          >
            PAY NOW
          </button>
        </Section>

      </div>
    </div>
  );
}

/* COMPONENTS */

function Section({ title, children }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      {title && (
        <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-4">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
}

// Updated Input to handle Errors
function Input({ label, error, ...props }) {
  return (
    <div>
      <label className="text-xs text-gray-500 mb-1 block">{label}</label>
      <input
        {...props}
        type="text"
        className={`w-full bg-white border rounded-lg px-3 py-2 text-sm outline-none transition-colors disabled:bg-gray-100 ${
          error 
            ? "border-red-500 focus:border-red-500" 
            : "border-gray-300 focus:border-black"
        }`}
      />
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );
}

function PaymentOption({ active, onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition ${
        active
          ? "border-black bg-gray-100"
          : "border-gray-300 hover:bg-gray-50"
      }`}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between text-gray-700 text-sm mt-2">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}