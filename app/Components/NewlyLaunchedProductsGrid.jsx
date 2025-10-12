"use client";
import React, { useState } from "react";
import { ShoppingCart, Loader2, AlertCircle, Eye, CheckCircle2 } from "lucide-react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";

export default function NewlyLaunchedGrid({ products, initialCart, user }) {
  const [addingId, setAddingId] = useState(null);
  const [cart, setCart] = useState(initialCart);
  const { isAuthenticated } = useKindeAuth();

  const getQuantityInCart = (productId) => {
    const item = cart?.items?.find((i) => String(i.productId) === String(productId));
    return item ? item.quantity : 0;
  };

  const updateCartCount = (count) => {
    localStorage.setItem('cartCount', count.toString());
    window.dispatchEvent(new CustomEvent('cartUpdate', { detail: { count } }));
  };

  const handleAddToCart = async (product) => {
    if (!isAuthenticated || !user) {
      toast.error("Please log in to add products to your cart.");
      return;
    }

    setAddingId(product.id);

    const cartProduct = {
      productId: String(product.id),
      name: product.title,
      image: product.thumbnail || product.image,
      price: product.price,
      category: product.category,
      quantity: 1,
      rating: product.rating || 4,
      stock: product.stock || 1,
    };

    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, product: cartProduct }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "Item added to your cart!");
        setCart(data.cart);
        
        const currentCount = parseInt(localStorage.getItem('cartCount') || '0');
        const newCount = currentCount + 1;
        updateCartCount(newCount);
      } else if (data.error === "Out of stock") {
        toast.error("Item is out of stock!");
      } else {
        toast.error("Failed to add item to cart.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Something went wrong.");
    }

    setAddingId(null);
  };

  if (!products || products.length === 0) {
    return (
      <div className="text-center text-gray-500 py-20">
        No newly launched products available.
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      
      <div className="flex overflow-x-auto  gap-3 pb-4 no-scrollbar">
        {products.map((product) => {
          const quantityInCart = getQuantityInCart(product.id);
          const outOfStock = quantityInCart >= product.stock;

          return (
            <div
              key={product.id}
              className="min-w-[250px] max-w-[300px] bg-white border border-gray-300 rounded-2xl shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 flex flex-col h-[480px] flex-shrink-0"
            >
              {/* Product Image */}
              <Link href={`/dashboard/product/${product.id}`} className="block flex-shrink-0">
                <div className="relative overflow-hidden rounded-t-2xl bg-white flex justify-center items-center h-48">
                  <Image
                    src={product.thumbnail || product.image}
                    alt={product.title}
                    width={280}
                    height={192}
                    className="object-contain h-44 w-full transition-transform duration-300 hover:scale-110"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R"
                  />
                  <div className="absolute top-2 left-2">
                    <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
                      New
                    </span>
                  </div>
                </div>
              </Link>

              {/* Product Info */}
              <div className="p-4 flex flex-col flex-1">
                <Link href={`/dashboard/product/${product.id}`}>
                  <h3 className="font-semibold text-lg mb-1 text-black truncate hover:text-gray-700 transition-colors">
                    {product.title}
                  </h3>
                </Link>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-1 min-h-[40px]">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mb-3 flex-shrink-0">
                  <p className="text-sm text-gray-700">
                    Stock: <span className="text-black font-medium">{product.stock}</span>
                  </p>
                  {product.rating && (
                    <p className="text-sm text-gray-700 flex items-center gap-1">
                      ⭐ {product.rating}
                    </p>
                  )}
                </div>

                {quantityInCart > 0 && (
                  <div className="mb-2 text-sm text-green-600 flex items-center gap-1 flex-shrink-0">
                    <CheckCircle2 size={14} />
                    In Cart: {quantityInCart}
                  </div>
                )}
                
                <p className="text-lg font-bold text-black mb-4 flex-shrink-0">
                  ${product.price.toFixed(2)}
                </p>

                {/* Buttons */}
                <div className="flex gap-2 mt-auto pt-2 flex-shrink-0">
                  <Link
                    href={`/dashboard/product/${product.id}`}
                    className="flex items-center justify-center gap-2 py-2 px-4 flex-1 bg-gray-100 hover:bg-gray-200 text-black rounded-xl text-sm font-semibold transition-all duration-300 border border-gray-300"
                  >
                    <Eye size={16} />
                    View
                  </Link>
                  
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={addingId === product.id || outOfStock}
                    className={`flex items-center justify-center gap-2 py-2 px-4 flex-1 rounded-xl text-sm font-semibold transition-all duration-300 border ${
                      outOfStock
                        ? "bg-gray-100 border-gray-300 cursor-not-allowed text-gray-400"
                        : "bg-black hover:bg-gray-800 text-white border-black"
                    }`}
                  >
                    {outOfStock ? (
                      <>
                        <AlertCircle size={16} />
                        Stock
                      </>
                    ) : addingId === product.id ? (
                      <>
                        <Loader2 className="animate-spin" size={16} />
                        Adding
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={16} />
                        Add
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}