"use client";
import React, { useState } from "react";
import { ShoppingCart, Loader2, AlertCircle, Eye, CheckCircle2 } from "lucide-react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";

export default function FeaturedProductsGrid({ products, initialCart, user }) {
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
        
        // Update cart count
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
      <div className="text-center text-gray-400 py-20">
        No featured products available.
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      
      <div className="flex overflow-x-auto gap-6 pb-4 no-scrollbar">
        {products.map((product) => {
          const quantityInCart = getQuantityInCart(product.id);
          const outOfStock = quantityInCart >= product.stock;

          return (
            <div
              key={product.id}
              className="min-w-[280px] max-w-[320px] bg-neutral-900 border border-gray-800 rounded-2xl shadow-md hover:shadow-blue-500/30 hover:scale-105 transition-all duration-300 flex flex-col h-[480px] flex-shrink-0"
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
                    <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded-full font-semibold">
                      Featured
                    </span>
                  </div>
                </div>
              </Link>

              {/* Product Info */}
              <div className="p-4 flex flex-col flex-1">
                <Link href={`/dashboard/product/${product.id}`}>
                  <h3 className="font-semibold text-lg mb-1 text-white truncate hover:text-blue-400 transition-colors">
                    {product.title}
                  </h3>
                </Link>
                
                <p className="text-gray-400 text-sm mb-3 line-clamp-2 flex-1 min-h-[40px]">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mb-3 flex-shrink-0">
                  <p className="text-sm text-blue-400">
                    Stock: <span className="text-gray-200">{product.stock}</span>
                  </p>
                  {product.rating && (
                    <p className="text-sm text-yellow-400 flex items-center gap-1">
                      ⭐ {product.rating}
                    </p>
                  )}
                </div>

                {quantityInCart > 0 && (
                  <div className="mb-2 text-sm text-green-400 flex items-center gap-1 flex-shrink-0">
                    <CheckCircle2 size={14} />
                    In Cart: {quantityInCart}
                  </div>
                )}

                <p className="text-lg font-bold text-white mb-4 flex-shrink-0">
                  ${product.price.toFixed(2)}
                </p>

                {/* Buttons */}
                <div className="flex gap-2 mt-auto pt-2 flex-shrink-0">
                  <Link
                    href={`/dashboard/product/${product.id}`}
                    className="flex items-center justify-center gap-2 py-2 px-4 flex-1 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-sm font-semibold transition-all duration-300"
                  >
                    <Eye size={16} />
                    View
                  </Link>
                  
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={addingId === product.id || outOfStock}
                    className={`flex items-center justify-center gap-2 py-2 px-4 flex-1 rounded-xl text-sm font-semibold transition-all duration-300 ${
                      outOfStock
                        ? "bg-gray-700 cursor-not-allowed text-gray-400"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
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