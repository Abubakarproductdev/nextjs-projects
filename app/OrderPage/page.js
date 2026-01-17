"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";

export default function OrderPage() {
  const { user, isLoaded } = useUser();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded || !user) return;

    const fetchOrders = async () => {
      try {
        const res = await fetch(
          `/api/Orderspage?email=${user.emailAddresses[0].emailAddress}`
        );
        const data = await res.json();
        if (data.success) {
          setOrders(data.orders);
        }
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, isLoaded]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading your orders…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FB] py-12">
      <div className="max-w-4xl mx-auto px-4 space-y-6">
        <h1 className="text-2xl font-bold">My Orders</h1>

        {orders.length === 0 && (
          <div className="bg-white p-6 rounded-xl border text-gray-500">
            You haven’t placed any orders yet.
          </div>
        )}

        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white border rounded-xl p-6 space-y-4"
          >
            {/* Order Header */}
            <div className="flex justify-between items-center text-sm">
              <div>
                <p className="font-semibold">
                  Order #{order._id.slice(-6).toUpperCase()}
                </p>
                <p className="text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <span className="font-bold">
                ${order.total.toFixed(2)}
              </span>
            </div>

            {/* Items */}
            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex gap-4 border-b pb-3 last:border-none"
                >
                  <div className="w-12 h-12 bg-gray-100 rounded relative">
                    <Image
                      src={item.thumbnail || item.images?.[0] || item.image}
                      alt={item.title}
                      fill
                      className="object-contain p-2"
                    />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="text-sm font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="pt-3 text-sm text-gray-600 flex justify-between">
              <span>Payment: {order.paymentMethod}</span>
              <span>Tax: ${order.tax.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
