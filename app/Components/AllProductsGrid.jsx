"use client";
import React, { useState } from "react";
import { ShoppingCart, Loader2, AlertCircle, Eye, CheckCircle2 } from "lucide-react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";

export default function AllProductsGrid({ products, initialCart, user }) {
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
      <p className="text-center text-gray-500 py-12">
        No products available.
      </p>
    );
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => {
          const quantityInCart = getQuantityInCart(product.id);
          const outOfStock = quantityInCart >= product.stock;

          return (
            <div
              key={product.id}
              className="group relative bg-white border border-gray-300 rounded-2xl shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 overflow-hidden flex flex-col h-full min-h-[480px]"
            >
              {/* Category Badge */}
              <div className="absolute top-2 left-2 z-10">
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold border ${
                  product.category === "launched" 
                    ? "bg-green-50 text-green-700 border-green-200" 
                    : product.category === "featured"
                    ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                    : "bg-gray-100 text-gray-700 border-gray-300"
                }`}>
                  {product.category === "launched" ? "New" : 
                   product.category === "featured" ? "Featured" : 
                   product.category}
                </span>
              </div>

              {/* Product Image */}
              <Link href={`/dashboard/product/${product.id}`} className="block flex-shrink-0">
                <div className="overflow-hidden bg-gray-100 flex justify-center items-center h-48">
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    width={280}
                    height={192}
                    className="object-contain h-44 w-full group-hover:scale-110 transition-transform duration-300"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R"
                  />
                </div>
              </Link>

              {/* Product Info */}
              <div className="p-5 flex flex-col flex-1">
                <Link href={`/dashboard/product/${product.id}`} className="block mb-1 flex-shrink-0">
                  <h2 className="font-bold text-lg text-black truncate hover:text-gray-700 transition-colors">
                    {product.title}
                  </h2>
                </Link>
                
                <p className="text-gray-600 text-sm mb-2 capitalize flex-shrink-0">{product.category}</p>
                <p className="text-xl font-bold text-black mb-3 flex-shrink-0">
                  ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
                </p>

                <div className="flex justify-between text-sm text-gray-600 mb-4 flex-shrink-0">
                  <p>Stock: <span className="text-black font-medium">{product.stock}</span></p>
                  {product.rating && (
                    <p className="flex items-center gap-1">
                      ⭐ {product.rating}
                    </p>
                  )}
                </div>

                {quantityInCart > 0 && (
                  <div className="mb-3 text-sm text-green-600 flex items-center gap-1 flex-shrink-0">
                    <CheckCircle2 size={14} />
                    In Cart: {quantityInCart}
                  </div>
                )}

                {/* Buttons */}
                <div className="flex gap-2 mt-auto pt-3 flex-shrink-0">
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

      {/* View All Button */}
      <div className="flex justify-center mt-14">
        <Link
          href="/dashboard/product"
          className="bg-black hover:bg-gray-800 text-white font-semibold py-3 px-10 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border border-black"
        >
          View All Products
        </Link>
      </div>
    </>
  );
}