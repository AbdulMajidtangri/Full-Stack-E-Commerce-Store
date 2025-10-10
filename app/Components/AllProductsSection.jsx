"use client";
import React, { useState, useEffect } from "react";
import { ShoppingCart, Loader2, AlertCircle, Eye, CheckCircle2 } from "lucide-react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import toast, { Toaster } from "react-hot-toast";
import productsData from "../Data/productsData/productsData";
import Link from "next/link";
import Image from "next/image";

export default function AllProductsSection() {
  const [addingId, setAddingId] = useState(null);
  const [cart, setCart] = useState(null);
  const [displayProducts, setDisplayProducts] = useState([]);
  const { isAuthenticated, user } = useKindeAuth();

  useEffect(() => {
    // Filter out launched and featured products, show only regular products
    const regularProducts = productsData.filter(
      product => product.category !== "launched" && product.category !== "featured"
    );
    
    // Take first 6 products from regular categories
    setDisplayProducts(regularProducts.slice(0, 6));
  }, []);

  // Fetch cart data when user is logged in
  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        try {
          const res = await fetch(`/api/cart?userId=${user.id}`);
          const data = await res.json();
          setCart(data.cart);
          
          // Update cart count in localStorage and dispatch event
          if (data.cart?.items) {
            const totalItems = data.cart.items.reduce((acc, item) => acc + item.quantity, 0);
            localStorage.setItem('cartCount', totalItems.toString());
            window.dispatchEvent(new CustomEvent('cartUpdate', { detail: { count: totalItems } }));
          }
        } catch (error) {
          console.error("Error fetching cart:", error);
        }
      }
    };
    fetchCart();
  }, [user]);

  const getQuantityInCart = (productId) => {
    const item = cart?.items?.find((i) => String(i.productId) === String(productId));
    return item ? item.quantity : 0;
  };

  const updateCartCount = () => {
    if (cart?.items) {
      const totalItems = cart.items.reduce((acc, item) => acc + item.quantity, 0);
      localStorage.setItem('cartCount', totalItems.toString());
      window.dispatchEvent(new CustomEvent('cartUpdate', { detail: { count: totalItems } }));
    }
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
      
      // SIMPLE FIX: Get current count and add 1
      const currentCount = parseInt(localStorage.getItem('cartCount') || '0');
      const newCount = currentCount + 1;
      
      // Update using the unified method
      if (typeof updateCartCount === 'function') {
        updateCartCount(newCount);
      } else {
        // Fallback: update directly
        localStorage.setItem('cartCount', newCount.toString());
        window.dispatchEvent(new CustomEvent('cartUpdate', { 
          detail: { count: newCount } 
        }));
      }
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

  if (!displayProducts || displayProducts.length === 0) {
    return (
      <p className="text-center text-gray-400 py-12">
        No products available.
      </p>
    );
  }

  return (
    <section className="py-20 bg-black text-white">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-400">
          Our Latest Products
        </h2>

        {/* Product Grid - No horizontal scroll */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProducts.map((product) => {
            const quantityInCart = getQuantityInCart(product.id);
            const outOfStock = quantityInCart >= product.stock;

            return (
              <div
                key={product.id}
                className="group relative bg-neutral-900 border border-gray-800 rounded-2xl shadow-lg hover:shadow-blue-500/20 hover:scale-105 transition-transform duration-300 overflow-hidden flex flex-col"
              >
                {/* Category Badge */}
                <div className="absolute top-2 left-2 z-10">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                    product.category === "launched" 
                      ? "bg-green-500/20 text-green-400" 
                      : product.category === "featured"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-blue-500/20 text-blue-400"
                  }`}>
                    {product.category === "launched" ? "New" : 
                     product.category === "featured" ? "Featured" : 
                     product.category}
                  </span>
                </div>

                {/* Product Image - Optimized */}
                <Link href={`/dashboard/product/${product.id}`} className="block">
                  <div className="overflow-hidden bg-white flex justify-center items-center h-56 relative">
                    <Image
                      src={product.thumbnail}
                      alt={product.title}
                      width={300}
                      height={224}
                      className="object-contain h-52 w-full group-hover:scale-110 transition-transform duration-300"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R"
                    />
                  </div>
                </Link>

                {/* Product Info */}
                <div className="p-5 flex flex-col flex-1">
                  <Link href={`/dashboard/product/${product.id}`} className="block mb-1">
                    <h2 className="font-bold text-lg text-white truncate hover:text-blue-400 transition-colors">
                      {product.title}
                    </h2>
                  </Link>
                  
                  <p className="text-gray-400 text-sm mb-2 capitalize">{product.category}</p>
                  <p className="text-xl font-bold text-blue-400 mb-3">
                    ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
                  </p>

                  <div className="flex justify-between text-sm text-gray-400 mb-4">
                    <p>Stock: <span className="text-yellow-400">{product.stock}</span></p>
                    {product.rating && (
                      <p className="flex items-center gap-1">
                        ⭐ {product.rating}
                      </p>
                    )}
                  </div>

                  {quantityInCart > 0 && (
                    <div className="mb-3 text-sm text-green-400 flex items-center gap-1">
                      <CheckCircle2 size={14} />
                      In Cart: {quantityInCart}
                    </div>
                  )}

                  <div className="flex gap-2 mt-auto">
                    <Link
                      href={`/dashboard/product/${product.id}`}
                      className="flex items-center justify-center gap-2 py-2 px-4 flex-1 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-sm font-semibold transition-all duration-300"
                    >
                      <Eye size={16} />
                      View Details
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
                          Out of Stock
                        </>
                      ) : addingId === product.id ? (
                        <>
                          <Loader2 className="animate-spin" size={16} />
                          Adding...
                        </>
                      ) : (
                        <>
                          <ShoppingCart size={16} />
                          Add to Cart
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
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-10 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/30"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}