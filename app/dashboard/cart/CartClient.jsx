"use client";

import { useState, useEffect } from "react";
import QuantityControls from "./QuantityControls";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CartClient({ cartData, userId }) {
  const [cart, setCart] = useState(cartData);
  const [isRemoving, setIsRemoving] = useState(null);
  const router = useRouter();

  // Calculate subtotal dynamically
  const subtotal = cart.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Calculate total items count for navbar badge
  const totalItemsCount = cart.items.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  // Update navbar cart count (you might want to use context or state management for this)
  useEffect(() => {
    // Dispatch custom event to update navbar
    const event = new CustomEvent('cartUpdate', { detail: { count: totalItemsCount } });
    window.dispatchEvent(event);
  }, [totalItemsCount]);

  // Handle quantity update callback from child component
  const handleQuantityChange = (productId, newQty) => {
    setCart((prevCart) => ({
      ...prevCart,
      items: prevCart.items.map((item) =>
        item.productId === productId
          ? { ...item, quantity: newQty }
          : item
      ),
    }));
  };

  // Handle item removal
  const handleRemoveItem = async (productId) => {
    setIsRemoving(productId);
    
    try {
      const response = await fetch("/api/cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          productId: productId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Remove item from local state
        setCart((prevCart) => ({
          ...prevCart,
          items: prevCart.items.filter((item) => item.productId !== productId),
        }));
      } else {
        console.error("Failed to remove item:", data.error);
      }
    } catch (error) {
      console.error("Error removing item:", error);
    } finally {
      setIsRemoving(null);
    }
  };

  // Continue shopping function
  const continueShopping = () => {
    router.push("/dashboard/products");
  };

  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-neutral-900 border border-gray-800 rounded-3xl p-12">
            <ShoppingBag className="w-24 h-24 text-gray-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-300 mb-4">Your Cart is Empty</h2>
            <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet. Start shopping to discover amazing products!
            </p>
            <button
              onClick={continueShopping}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3 mx-auto"
            >
              Continue Shopping
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold mb-4 text-blue-400">
            Your Shopping Cart
          </h1>
          <p className="text-gray-400 text-lg">
            {cart.items.length} {cart.items.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => {
              const stock = item.stock ?? 0;
              const isOutOfStock = item.quantity >= stock;
              const displayQty = stock > 0 ? Math.min(item.quantity, stock) : item.quantity;
              const totalPrice = (item.price * item.quantity).toFixed(2);

              return (
                <div
                  key={item.productId}
                  className="flex flex-col sm:flex-row items-center justify-between bg-neutral-900 border border-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
                >
                  {/* Product Info */}
                  <div className="flex items-center gap-4 flex-1 mb-4 sm:mb-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-contain bg-white flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h2 className="text-lg font-semibold text-white truncate">{item.name}</h2>
                      <p className="text-gray-400 text-sm capitalize">{item.category}</p>
                      <p className="text-blue-400 font-semibold mt-2">
                        ${item.price} × {item.quantity} ={" "}
                        <span className="text-green-400">${totalPrice}</span>
                      </p>
                      {isOutOfStock && (
                        <p className="text-red-400 text-sm mt-1">Out of stock</p>
                      )}
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    <QuantityControls
                      item={{ ...item, quantity: displayQty, stock }}
                      userId={userId}
                      onQuantityChange={handleQuantityChange}
                    />
                    
                    {/* Delete Button */}
                    <button
                      onClick={() => handleRemoveItem(item.productId)}
                      disabled={isRemoving === item.productId}
                      className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Remove item"
                    >
                      {isRemoving === item.productId ? (
                        <div className="w-5 h-5 border-2 border-red-400 border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <Trash2 className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cart Summary */}
          <div className="bg-neutral-900 border border-gray-800 rounded-2xl p-6 shadow-xl sticky top-24 self-start">
            <h2 className="text-2xl font-semibold mb-6 text-white">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal ({totalItemsCount} items)</span>
                <span className="text-white font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Shipping</span>
                <span className="text-green-400">Free</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Tax</span>
                <span className="text-gray-400">Calculated at checkout</span>
              </div>
            </div>

            <hr className="border-gray-700 my-4" />

            <div className="flex justify-between text-xl font-bold text-blue-400 mb-6">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg mb-4">
              Proceed to Checkout
            </button>

            <button
              onClick={continueShopping}
              className="w-full border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-semibold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}