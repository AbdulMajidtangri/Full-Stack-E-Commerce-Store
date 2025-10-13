"use client";
import { useState, useEffect } from "react";
import QuantityControls from "./QuantityControls";
import { Trash2, ShoppingBag, ArrowRight, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from '../../context/CartContext';

export default function CartClient({ cartData, userId }) {
  const [cart, setCart] = useState(cartData);
  const [isRemoving, setIsRemoving] = useState(null);
  const router = useRouter();
  const { updateCartCount } = useCart();

  const totalItemsCount = cart.items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const updateCartCounts = (count) => {
    updateCartCount(count);
    localStorage.setItem('cartCount', count.toString());
    window.dispatchEvent(new CustomEvent('cartUpdate', { detail: { count } }));
  };

  useEffect(() => {
    updateCartCounts(totalItemsCount);
  }, [totalItemsCount]);

  const handleQuantityChange = async (productId, newQty) => {
    setCart((prevCart) => {
      const updatedCart = {
        ...prevCart,
        items: prevCart.items.map((item) =>
          item.productId === productId
            ? { ...item, quantity: newQty }
            : item
        ),
      };
      
      const newTotal = updatedCart.items.reduce((acc, item) => acc + item.quantity, 0);
      updateCartCounts(newTotal);
      
      return updatedCart;
    });
  };

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
        setCart((prevCart) => {
          const updatedCart = {
            ...prevCart,
            items: prevCart.items.filter((item) => item.productId !== productId),
          };
          
          const newTotal = updatedCart.items.reduce((acc, item) => acc + item.quantity, 0);
          updateCartCounts(newTotal);
          
          return updatedCart;
        });
      } else {
        console.error("Failed to remove item:", data.error);
      }
    } catch (error) {
      console.error("Error removing item:", error);
    } finally {
      setIsRemoving(null);
    }
  };

  const continueShopping = () => {
    router.push("/dashboard/product");
  };

// In CartClient.jsx - Enhanced handleCheckout
const handleCheckout = () => {
  // Debug: Check what's in the cart
  console.log('🛒 Cart items at checkout:', cart.items);
  console.log('💰 Subtotal at checkout:', subtotal);
  console.log('🔢 Total items at checkout:', totalItemsCount);

  const checkoutData = {
    items: cart.items,
    subtotal: subtotal,
    totalItems: totalItemsCount,
    userId: userId, // Make sure this is included
    timestamp: new Date().toISOString()
  };

  // Store for payment page
  sessionStorage.setItem('checkoutCart', JSON.stringify(checkoutData));
  
  router.push("/dashboard/checkout/payment");
};

  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-white py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 sm:p-12">
            <ShoppingBag className="w-16 h-16 sm:w-24 sm:h-24 text-gray-400 mx-auto mb-4 sm:mb-6" />
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Your Cart is Empty</h2>
            <p className="text-gray-600 text-base sm:text-lg mb-6 sm:mb-8 max-w-md mx-auto px-4">
              Looks like you haven't added any items to your cart yet. Start shopping to discover amazing products!
            </p>
            <button
              onClick={continueShopping}
              className="bg-black hover:bg-gray-800 text-white font-semibold py-3 px-6 sm:px-8 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 sm:gap-3 mx-auto text-sm sm:text-base"
            >
              Continue Shopping
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-3 sm:mb-4 text-black">
            Your Shopping Cart
          </h1>
          <p className="text-gray-600 text-base sm:text-lg">
            {cart.items.length} {cart.items.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {cart.items.map((item) => {
              const stock = item.stock ?? 0;
              const isOutOfStock = item.quantity >= stock;
              const displayQty = stock > 0 ? Math.min(item.quantity, stock) : item.quantity;
              const totalPrice = (item.price * item.quantity).toFixed(2);

              return (
                <div
                  key={item.productId}
                  className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between bg-white border border-gray-200 rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  {/* Product Info */}
                  <div className="flex items-start sm:items-center gap-3 sm:gap-4 flex-1 mb-4 sm:mb-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-lg object-contain bg-gray-100 flex-shrink-0 border border-gray-300"
                    />
                    <div className="flex-1 min-w-0">
                      <h2 className="text-base sm:text-lg font-semibold text-black truncate mb-1">{item.name}</h2>
                      <p className="text-gray-600 text-xs sm:text-sm capitalize mb-2">{item.category}</p>
                      <p className="text-black font-semibold text-sm sm:text-base">
                        ${item.price} × {item.quantity} ={" "}
                        <span className="text-green-600">${totalPrice}</span>
                      </p>
                      {isOutOfStock && (
                        <p className="text-red-600 text-xs sm:text-sm mt-1">Out of stock</p>
                      )}
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
                    <div className="flex-1 sm:flex-none">
                      <QuantityControls
                        item={{ ...item, quantity: displayQty, stock }}
                        userId={userId}
                        onQuantityChange={handleQuantityChange}
                      />
                    </div>
                    
                    {/* Delete Button */}
                    <button
                      onClick={() => handleRemoveItem(item.productId)}
                      disabled={isRemoving === item.productId}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 border border-gray-300"
                      title="Remove item"
                    >
                      {isRemoving === item.productId ? (
                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cart Summary */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 shadow-lg lg:sticky lg:top-24 self-start">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-black">Order Summary</h2>
            
            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
              <div className="flex justify-between text-sm sm:text-base text-gray-700">
                <span>Subtotal ({totalItemsCount} items)</span>
                <span className="text-black font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm sm:text-base text-gray-700">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-sm sm:text-base text-gray-700">
                <span>Tax</span>
                <span className="text-gray-500 text-xs sm:text-sm">Calculated at checkout</span>
              </div>
            </div>

            <hr className="border-gray-300 my-3 sm:my-4" />

            <div className="flex justify-between text-lg sm:text-xl font-bold text-black mb-4 sm:mb-6">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <button 
              onClick={handleCheckout}
              className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 sm:py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg mb-3 sm:mb-4 text-sm sm:text-base"
            >
              Proceed to Checkout
            </button>

            <button
              onClick={continueShopping}
              className="w-full border border-gray-400 hover:border-gray-600 text-gray-700 hover:text-black font-semibold py-2 sm:py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}