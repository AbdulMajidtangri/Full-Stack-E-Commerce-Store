"use client";
import React, { useState, useEffect } from "react";
import { ShoppingCart, Loader2, AlertCircle, Eye } from "lucide-react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import toast, { Toaster } from "react-hot-toast";
import { getFeaturedProducts } from '../Data/productsData/productsData';
import Link from "next/link";

export default function FeaturedProducts() {
  const [addingId, setAddingId] = useState(null);
  const [cart, setCart] = useState(null);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const { isAuthenticated, user } = useKindeAuth();

  // Load featured products
  useEffect(() => {
    const products = getFeaturedProducts();
    setFeaturedProducts(products);
  }, []);

  // Fetch cart data when user is logged in
  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        const res = await fetch(`/api/cart?userId=${user.id}`);
        const data = await res.json();
        setCart(data.cart);
      }
    };
    fetchCart();
  }, [user]);

  const getQuantityInCart = (productId) => {
    const item = cart?.items?.find((i) => String(i.productId) === String(productId));
    return item ? item.quantity : 0;
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
      quantity: 1,
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
      } else if (data.error === "Out of stock") {
        toast.error("Item is out of stock!");
      } else {
        toast.error("Failed to add item to cart.");
      }
    } catch {
      toast.error("Something went wrong.");
    }

    setAddingId(null);
  };

  if (!featuredProducts || featuredProducts.length === 0)
    return <div className="text-center text-gray-400 py-20">No featured products available.</div>;

  return (
    <section className="py-16 bg-black text-white">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-center text-blue-400">
          Featured Products
        </h2>

        <div className="flex overflow-x-auto gap-6 pb-4 no-scrollbar">
          {featuredProducts.map((product) => {
           
            const quantityInCart = getQuantityInCart(product.id);
            const outOfStock = quantityInCart >= product.stock;

            return (
              <div
                key={product.id}
                className="min-w-[280px] bg-neutral-900 border border-gray-800 rounded-2xl shadow-md hover:shadow-blue-500/30 hover:scale-105 transition-transform duration-300"
              >
                 <Link href={`/dashboard/product/${product.id}`}
            >
                <div className="relative overflow-hidden rounded-t-2xl bg-white flex justify-center items-center h-48">
                  <img
                    src={product.thumbnail || product.image}
                    alt={product.title}
                    className="object-contain h-44 transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute top-2 left-2">
                    <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded-full">
                      Featured
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1 text-white truncate">
                    {product.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm text-blue-400">
                      Stock: <span className="text-gray-200">{product.stock}</span>
                    </p>
                    {product.rating && (
                      <p className="text-sm text-yellow-400 flex items-center gap-1">
                        ⭐ {product.rating}
                      </p>
                    )}
                  </div>

                  <p className="text-lg font-bold text-white mb-4">
                    ${product.price.toFixed(2)}
                  </p>

                  <div className="flex gap-2">
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
                        </>
                      ) : addingId === product.id ? (
                        <>
                          <Loader2 className="animate-spin" size={16} />
                        </>
                      ) : (
                        <>
                          <ShoppingCart size={16} />
                        </>
                      )}
                    </button>
                  </div>
                </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}