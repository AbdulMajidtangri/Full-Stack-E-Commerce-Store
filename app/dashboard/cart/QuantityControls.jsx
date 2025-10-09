"use client";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";

export default function QuantityControls({ item, userId, onQuantityChange }) {
  const [loading, setLoading] = useState(false);

  const updateQuantity = async (newQuantity) => {
    if (newQuantity < 1 || newQuantity > item.stock) return;
    
    setLoading(true);
    try {
      const response = await fetch("/api/cart", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          productId: item.productId,
          quantity: newQuantity,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        onQuantityChange(item.productId, newQuantity);
      } else {
        console.error("Failed to update quantity:", data.error);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-3 bg-neutral-800 rounded-xl p-1">
      <button
        onClick={() => updateQuantity(item.quantity - 1)}
        disabled={item.quantity <= 1 || loading}
        className="p-2 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <Minus className="w-4 h-4" />
      </button>
      
      <span className="text-white font-semibold min-w-8 text-center">
        {loading ? "..." : item.quantity}
      </span>
      
      <button
        onClick={() => updateQuantity(item.quantity + 1)}
        disabled={item.quantity >= item.stock || loading}
        className="p-2 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}