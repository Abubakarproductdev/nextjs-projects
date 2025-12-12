"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaPaypal, FaCreditCard, FaChevronDown, FaCheck } from "react-icons/fa";

export default function CheckoutPage() {
  // State for toggles (visual only for this demo)
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [deliveryOption, setDeliveryOption] = useState("regular");

  return (
    <div className="bg-[#F8F8F8] min-h-screen py-8 font-sans text-gray-800">
      <div className="max-w-[1400px] mx-auto px-4">
        
        {/* Main Grid Layout: 3 Columns on Large Screens */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ================= COLUMN 1: REVIEW YOUR ORDER ================= */}
          <div className="lg:col-span-4 bg-white p-6 shadow-sm border border-gray-200">
            <h2 className="text-sm font-bold text-gray-700 tracking-wide mb-6 uppercase">
              1. Review Your Order (1 Items)
            </h2>

            {/* Product Item */}
            <div className="flex gap-4 border-b border-gray-200 pb-6 mb-6 relative">
              <div className="w-20 h-20 bg-gray-100 rounded-md relative flex-shrink-0">
                {/* Replace with actual image path */}
                <Image 
                  src="/api/placeholder/80/80" 
                  alt="Wallet" 
                  fill 
                  className="object-contain p-2"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-sm">Note Sleeve</h3>
                  <button className="text-gray-400 hover:text-gray-600">✕</button>
                </div>
                <p className="text-xs text-gray-500 mt-1">Color: Tan</p>
                <p className="text-xs text-gray-500">Finish: Leather / RFID</p>
                <div className="flex justify-between items-end mt-2">
                   <div className="flex items-center text-sm border border-gray-300 rounded px-2 py-1 bg-white">
                      <span className="text-xs text-gray-500 mr-2">Qty:</span>
                      <select className="bg-transparent font-bold outline-none text-sm">
                          <option>1</option>
                          <option>2</option>
                      </select>
                   </div>
                   <span className="font-bold text-sm">$109 CAD</span>
                </div>
              </div>
            </div>

            {/* Subtotal Row */}
            <div className="flex justify-between font-bold text-sm mb-8">
                <span>SUBTOTAL</span>
                <span>$109 CAD</span>
            </div>

            {/* Shipping Selectors */}
            <div className="space-y-4 mb-8">
                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Shipping to:</label>
                    <div className="relative">
                        <div className="flex items-center w-full border border-gray-300 p-2.5 rounded bg-white">
                             {/* Flag Placeholder */}
                            <span className="mr-2 text-lg">🇨🇦</span> 
                            <span className="text-sm flex-1">Canada</span>
                            <FaChevronDown className="text-gray-400 text-xs" />
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Shipping to (state or province):</label>
                    <div className="relative">
                        <select className="w-full border border-gray-300 p-2.5 rounded bg-white text-sm outline-none appearance-none">
                            <option>Ontario</option>
                            <option>British Columbia</option>
                            <option>Quebec</option>
                        </select>
                         <FaChevronDown className="absolute right-3 top-3.5 text-gray-400 text-xs pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Delivery Method */}
            <div className="mb-8">
                <label className="block text-xs font-bold text-gray-700 mb-2">Select delivery:</label>
                <p className="text-[11px] text-[#C05621] font-medium leading-tight mb-3">
                    Buying gifts for the holidays? Check the timeframes on your shipping options to make sure it will arrive in time.
                </p>

                <div 
                    onClick={() => setDeliveryOption("regular")}
                    className={`flex justify-between items-center p-4 border rounded cursor-pointer transition-colors ${deliveryOption === 'regular' ? 'bg-[#FFF5F0] border-[#C05621]' : 'border-gray-200'}`}
                >
                    <div>
                        <span className="font-bold text-xs block">FREE</span>
                    </div>
                    <div className="flex-1 px-4">
                         <span className="font-bold text-xs block">Regular</span>
                         <span className="text-xs text-gray-500">(5-10 business days, tracking)</span>
                    </div>
                    {deliveryOption === 'regular' && <div className="bg-[#C05621] rounded-full p-1 text-white text-[8px]"><FaCheck /></div>}
                </div>
                 <p className="text-[10px] text-[#C05621] underline mt-2 cursor-pointer">Delivery rate is calculated according to item size.</p>
            </div>

            {/* Quick Payment Buttons */}
            <div className="mb-6">
                <p className="text-xs font-bold mb-2">For quick payment:</p>
                <button className="w-full bg-[#FFC439] hover:bg-[#F4BB30] flex items-center justify-center h-12 rounded shadow-sm transition-colors">
                    <span className="font-bold text-sm mr-2 text-gray-800 opacity-80">Check out with</span>
                    <FaPaypal className="text-[#003087] text-xl" />
                </button>
                <p className="text-[10px] text-gray-400 mt-2 leading-tight">
                    Use your PayPal account to complete the transaction and avoid entering billing or delivery information.
                </p>
            </div>

            {/* Separator */}
            <div className="mb-4 text-xs font-bold">Or, for other payment methods:</div>

            <button className="w-full bg-gray-200 text-gray-600 font-bold py-3 rounded text-xs tracking-wide hover:bg-gray-300 transition-colors">
                CONTINUE TO DELIVERY ADDRESS
            </button>
          </div>


          {/* ================= COLUMN 2: DELIVERY ADDRESS ================= */}
          <div className="lg:col-span-4 bg-white p-6 shadow-sm border border-gray-200 h-full">
            <h2 className="text-sm font-bold text-gray-700 tracking-wide mb-2 uppercase">
              2. Delivery Address
            </h2>
            <p className="text-xs text-gray-400 mb-6">All fields required</p>

            <form className="space-y-4">
                <InputGroup label="Email address" placeholder="e.g. roy@bellroy.com" />
                <InputGroup label="First name" />
                <InputGroup label="Last name" />
                <InputGroup label="Telephone" />
                <InputGroup label="Delivery address" placeholder="e.g. Unit 1, 123 Main Street" />
                <InputGroup /> {/* Empty second address line */}
                <InputGroup label="Suburb/town" />
                
                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">State/territory*</label>
                    <div className="relative">
                        <select className="w-full border border-gray-300 p-2.5 rounded bg-white text-sm outline-none appearance-none focus:border-gray-400">
                            <option>Ontario</option>
                        </select>
                        <FaChevronDown className="absolute right-3 top-3.5 text-gray-400 text-xs pointer-events-none" />
                    </div>
                </div>

                <InputGroup label="Postcode" />
                
                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Country*</label>
                    <div className="relative">
                        <select className="w-full border border-gray-300 p-2.5 rounded bg-white text-sm outline-none appearance-none focus:border-gray-400">
                            <option>Canada</option>
                        </select>
                        <FaChevronDown className="absolute right-3 top-3.5 text-gray-400 text-xs pointer-events-none" />
                    </div>
                </div>

                <div className="flex items-center pt-2">
                    <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                    <label className="ml-2 block text-xs font-bold text-gray-700">
                        Same billing address
                    </label>
                </div>
            </form>
          </div>


          {/* ================= COLUMN 3: PAYMENT & SUMMARY ================= */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Payment Method Selector */}
            <div className="bg-white p-6 shadow-sm border border-gray-200">
                <h2 className="text-sm font-bold text-gray-700 tracking-wide mb-6 uppercase">
                    3. Select Payment Method
                </h2>

                <div className="border border-gray-200 rounded overflow-hidden">
                    {/* Card Option */}
                    <div 
                        onClick={() => setPaymentMethod('card')}
                        className={`flex items-center justify-between p-4 cursor-pointer border-b border-gray-200 hover:bg-gray-50 ${paymentMethod === 'card' ? 'bg-gray-50' : 'bg-white'}`}
                    >
                        <div className="flex items-center gap-3">
                            <FaCreditCard className="text-gray-500" />
                            <span className="text-sm font-medium">Card</span>
                        </div>
                        <FaChevronDown className="text-gray-400 text-xs transform -rotate-90" />
                    </div>

                    {/* PayPal Option */}
                    <div 
                        onClick={() => setPaymentMethod('paypal')}
                        className={`flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 ${paymentMethod === 'paypal' ? 'bg-gray-50' : 'bg-white'}`}
                    >
                        <div className="flex items-center gap-3">
                            <FaPaypal className="text-[#003087]" />
                            <span className="text-sm font-medium">PayPal</span>
                        </div>
                        <FaChevronDown className="text-gray-400 text-xs transform -rotate-90" />
                    </div>
                </div>
            </div>

            {/* Order Summary Box */}
            <div className="bg-white p-6 shadow-sm border border-gray-200">
                <h2 className="text-sm font-bold text-gray-700 tracking-wide mb-6 uppercase">
                    Order Summary
                </h2>

                <div className="space-y-3 text-sm pb-4 border-b border-gray-200">
                    <div className="flex justify-between">
                        <span className="text-gray-600">1 x Note Sleeve, Tan</span>
                        <span className="font-medium">$109 —</span>
                    </div>
                    <div className="flex justify-between font-bold">
                        <span className="text-gray-800">Subtotal</span>
                        <span className="text-gray-800">$109 —</span>
                    </div>
                    <div className="flex justify-between">
                        <div className="flex flex-col">
                            <span className="text-gray-600">Shipping to <span className="font-bold text-gray-800">Canada</span></span>
                            <span className="text-xs text-gray-400">Regular (5–10 business days, tracking)</span>
                        </div>
                        <span className="font-medium">FREE</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Sales Tax</span>
                        <span className="font-medium">$14.17</span>
                    </div>
                </div>

                {/* Total Bar */}
                <div className="flex justify-between items-center bg-[#C7C7C7] p-3 -mx-6 px-6 mt-4">
                    <span className="font-bold text-sm text-gray-800">ORDER TOTAL</span>
                    <div className="text-right">
                        <span className="text-sm text-gray-800 font-bold mr-1">CAD</span>
                        <span className="text-xl font-bold text-gray-900">$123<span className="text-sm align-top">.17</span></span>
                    </div>
                </div>

                {/* Newsletter Checkbox */}
                <div className="mt-6 flex items-start">
                    <input type="checkbox" className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded" />
                    <label className="ml-2 text-xs text-gray-600 leading-tight">
                        I'm keen for new releases and subscriber exclusives. Sign me up!*
                    </label>
                </div>

                {/* Pay Now Button */}
                <button className="w-full bg-[#C05621] hover:bg-[#A5471B] text-white font-bold py-3 mt-6 rounded shadow-sm transition-colors tracking-widest text-sm">
                    PAY NOW
                </button>

                {/* Disclaimer */}
                <p className="text-[10px] text-gray-400 mt-4 leading-normal">
                    *By signing up or placing an order, you're consenting to our privacy policy.
                </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// Reusable Helper Component for Form Inputs
function InputGroup({ label, placeholder }) {
    return (
        <div>
            {label && <label className="block text-xs font-bold text-gray-700 mb-1">{label}*</label>}
            <input 
                type="text" 
                placeholder={placeholder || ""} 
                className="w-full border border-gray-300 p-2.5 rounded bg-white text-sm outline-none focus:border-gray-400 placeholder-gray-300"
            />
        </div>
    );
}