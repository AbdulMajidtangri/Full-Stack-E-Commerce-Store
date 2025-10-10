"use client";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";

export default function QuantityControls({ item, userId, onQuantityChange }) {
  const [loading, setLoading] = useState(false);

  const updateQuantity = async (newQuantity) => {
    console.log("Updating quantity:", { 
      productId: item.productId, 
      newQuantity, 
      current: item.quantity, 
      stock: item.stock 
    });
    
    if (newQuantity < 1 || newQuantity > item.stock) {
      console.log("Invalid quantity:", newQuantity);
      return;
    }
    
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

      console.log("API Response status:", response.status);
      
      const data = await response.json();
      console.log("API Response data:", data);
      
      if (response.ok && data.success) {
        console.log("Quantity updated successfully, calling onQuantityChange");
        onQuantityChange(item.productId, newQuantity);
      } else {
        console.error("Failed to update quantity:", data.error);
        // Show user-friendly error message
        if (data.error === "Out of stock") {
          alert(`Only ${data.available} items available in stock`);
        } else {
          alert(`Failed to update quantity: ${data.error}`);
        }
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      alert("Error updating quantity. Please check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2 sm:gap-3 bg-neutral-800 rounded-lg sm:rounded-xl p-1 w-fit">
      <button
        onClick={() => updateQuantity(item.quantity - 1)}
        disabled={item.quantity <= 1 || loading}
        className="p-1 sm:p-2 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex-shrink-0"
      >
        <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
      </button>
      
      <span className="text-white font-semibold min-w-6 sm:min-w-8 text-center text-sm sm:text-base">
        {loading ? "..." : item.quantity}
      </span>
      
      <button
        onClick={() => updateQuantity(item.quantity + 1)}
        disabled={item.quantity >= item.stock || loading}
        className="p-1 sm:p-2 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex-shrink-0"
      >
        <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
      </button>
    </div>
  );
}