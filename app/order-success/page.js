"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) return;

    const fetchOrder = async () => {
      const res = await fetch(`/api/Order/${orderId}`);
      const data = await res.json();

      if (data.success) {
        setOrder(data.order);
      }

      setLoading(false);
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return <p className="p-10 text-center">Loading order...</p>;
  }

  if (!order) {
    return <p className="p-10 text-center">Order not found</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FB] px-4">
      <div className="bg-white max-w-md w-full rounded-xl border p-6 shadow-sm">
        <h1 className="text-xl font-bold text-green-600 mb-2">
          🎉 Order Placed Successfully
        </h1>

        <p className="text-sm text-gray-600 mb-4">
          Thank you for your order! Here are the details:
        </p>

        <div className="space-y-2 text-sm">
          <Row label="Order ID" value={order._id} />
          <Row label="Name" value={order.customer.name} />
          <Row label="Email" value={order.customer.email} />
          <Row label="Address" value={order.customer.address} />
          <Row label="Payment" value={order.paymentMethod} />
          <Row label="Total" value={`$${order.total.toFixed(2)}`} />
        </div>

        <button
          onClick={() => window.location.href = "/"}
          className="mt-6 w-full bg-black text-white py-2 rounded-lg font-semibold"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
