"use client";
import React, { useState } from "react";
import productsData from "../../../Data/productsData/productsData";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ShoppingCart, Loader2 } from "lucide-react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import toast from "react-hot-toast";

export default function ProductDetailPage({ params }) {
  const productId = parseInt(params.id);
  const product = productsData.find((p) => p.id === productId);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { isAuthenticated, user } = useKindeAuth();

  if (!product) {
    return (
      <div className="text-center text-gray-400 py-20">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <p className="text-gray-400 mb-6">The product you're looking for doesn't exist.</p>
        <Link
          href="/dashboard/products"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-xl transition-all"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  // Get all available images
  const allImages = product.images && product.images.length > 0 
    ? [product.thumbnail || product.image, ...product.images]
    : [product.thumbnail || product.image];

  const getBenefits = () => {
    if (product.benefits) {
      return product.benefits;
    } else if (product.benefit) {
      return [product.benefit];
    } else {
      const defaultBenefits = {
        smartphones: ["High-quality display", "Long battery life", "Advanced camera system"],
        laptops: ["Fast performance", "Lightweight design", "Long battery life"],
        fragrances: ["Long-lasting scent", "Premium ingredients", "Elegant packaging"],
        skincare: ["Natural ingredients", "Dermatologist tested", "Visible results"],
        groceries: ["Fresh quality", "Organic ingredients", "Great value"],
        "home-decoration": ["Modern design", "Easy to install", "Durable materials"],
        launched: ["Latest technology", "Innovative features", "Premium quality"],
        featured: ["Top rated", "Best seller", "Premium quality"]
      };
      return defaultBenefits[product.category] || ["High quality", "Great value", "Premium features"];
    }
  };

  const benefits = getBenefits();
  const relatedProducts = productsData
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  // Add to Cart Functionality
  const handleAddToCart = async () => {
    if (!isAuthenticated || !user) {
      toast.error("Please log in to add products to your cart.");
      return;
    }

    setIsAddingToCart(true);

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
      } else if (data.error === "Out of stock") {
        toast.error("Item is out of stock!");
      } else {
        toast.error("Failed to add item to cart.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <section className="py-8 bg-black text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-400">
            <li><Link href="/dashboard" className="hover:text-blue-400 transition-colors">Dashboard</Link></li>
            <li><ChevronRight size={16} /></li>
            <li><Link href="/dashboard/products" className="hover:text-blue-400 transition-colors">Products</Link></li>
            <li><ChevronRight size={16} /></li>
            <li className="text-white truncate max-w-[150px]">{product.title}</li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {/* Product Gallery Section */}
          <div className="space-y-4">
            {/* Main Image - Fixed Size Container */}
            <div className="relative bg-zinc-900 rounded-xl overflow-hidden">
              <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] flex items-center justify-center p-4">
                <Image
                  src={allImages[selectedImageIndex]}
                  alt={product.title}
                  width={500}
                  height={500}
                  quality={90}
                  className="object-contain w-full h-full"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R"
                />
              </div>

              {/* Navigation Arrows - Always visible on mobile */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 p-2 rounded-full transition-all duration-300"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 p-2 rounded-full transition-all duration-300"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              {/* Image Counter */}
              {allImages.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/70 px-3 py-1 rounded-full text-sm">
                  {selectedImageIndex + 1} / {allImages.length}
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {allImages.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-hide">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 bg-zinc-800 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      selectedImageIndex === index 
                        ? 'border-blue-500 scale-105' 
                        : 'border-transparent hover:border-gray-500'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.title} thumbnail ${index + 1}`}
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info Section */}
          <div className="lg:pl-4">
            {/* Category Badge */}
            <div className="mb-4">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                product.category === "launched" 
                  ? "bg-green-500/20 text-green-400" 
                  : product.category === "featured"
                  ? "bg-yellow-500/20 text-yellow-400"
                  : "bg-blue-500/20 text-blue-400"
              }`}>
                {product.category === "launched" ? "Newly Launched" : 
                 product.category === "featured" ? "Featured" : 
                 product.category}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold mb-3 text-white leading-tight">
              {product.title}
            </h1>
            
            {product.brand && (
              <p className="text-gray-400 mb-3 text-base">Brand: <span className="text-white font-medium">{product.brand}</span></p>
            )}
            
            <p className="text-gray-300 mb-6 text-base leading-relaxed">
              {product.description}
            </p>

            {/* Price & Rating */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 p-4 bg-zinc-900/50 rounded-xl">
              <div className="flex items-center gap-3">
                <span className="text-blue-400 text-2xl sm:text-3xl font-bold">
                  ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
                </span>
                
                {product.discountPercentage && product.discountPercentage > 0 && (
                  <span className="text-red-400 text-lg line-through">
                    ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-4">
                {product.rating && (
                  <div className="flex items-center gap-2 bg-yellow-500/20 px-3 py-1 rounded-full">
                    <span className="text-yellow-400">⭐</span>
                    <span className="text-yellow-400 font-semibold">{product.rating}</span>
                  </div>
                )}
                
                <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                  product.stock > 10 ? "bg-green-500/20 text-green-400" : 
                  product.stock > 0 ? "bg-yellow-500/20 text-yellow-400" : "bg-red-500/20 text-red-400"
                }`}>
                  {product.stock > 0 ? `${product.stock} in stock` : "Out of Stock"}
                </span>
              </div>
            </div>

            {/* Key Benefits */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3 text-blue-400">
                Key Features
              </h3>
              <div className="space-y-2">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-zinc-900/50 rounded-lg">
                    <span className="text-green-400 flex-shrink-0">✓</span>
                    <span className="text-gray-300 text-sm sm:text-base">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Details */}
            <div className="mb-6 grid grid-cols-2 gap-3 text-sm">
              {product.brand && (
                <div className="bg-zinc-900/50 p-3 rounded-lg">
                  <span className="text-gray-400 block text-xs">Brand</span>
                  <p className="text-white font-medium">{product.brand}</p>
                </div>
              )}
              <div className="bg-zinc-900/50 p-3 rounded-lg">
                <span className="text-gray-400 block text-xs">Category</span>
                <p className="text-white font-medium capitalize">
                  {product.category === "launched" ? "Newly Launched" : 
                   product.category === "featured" ? "Featured" : 
                   product.category}
                </p>
              </div>
              {product.discountPercentage && (
                <div className="bg-zinc-900/50 p-3 rounded-lg col-span-2">
                  <span className="text-gray-400 block text-xs">Special Offer</span>
                  <p className="text-green-400 font-medium">{product.discountPercentage}% OFF</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <button 
                onClick={handleAddToCart}
                disabled={isAddingToCart || product.stock === 0}
                className={`flex items-center justify-center gap-3 py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex-1 ${
                  isAddingToCart || product.stock === 0
                    ? 'bg-gray-600 cursor-not-allowed text-gray-400'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isAddingToCart ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Adding...
                  </>
                ) : product.stock === 0 ? (
                  "Out of Stock"
                ) : (
                  <>
                    <ShoppingCart size={20} />
                    Add to Cart
                  </>
                )}
              </button>
              <Link
                href="/dashboard/products"
                className="bg-zinc-800 hover:bg-zinc-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 text-center"
              >
                Back to Products
              </Link>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-blue-400">
                Related Products
              </h2>
              <Link 
                href="/dashboard/products" 
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300 text-sm"
              >
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedProducts.map((related) => (
                <Link key={related.id} href={`/dashboard/product/${related.id}`}>
                  <div className="bg-zinc-900 rounded-xl overflow-hidden shadow-lg hover:shadow-blue-500/20 transition-all transform hover:-translate-y-1 cursor-pointer h-full group">
                    <div className="relative overflow-hidden bg-white">
                      <div className="w-full h-40 flex items-center justify-center p-4">
                        <Image
                          src={related.thumbnail || related.image}
                          alt={related.title}
                          width={160}
                          height={160}
                          quality={80}
                          className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="absolute top-2 right-2">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                          related.category === "launched" 
                            ? "bg-green-500/20 text-green-400" 
                            : related.category === "featured"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-blue-500/20 text-blue-400"
                        }`}>
                          {related.category === "launched" ? "New" : 
                           related.category === "featured" ? "Featured" : 
                           related.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2 text-white group-hover:text-blue-400 transition-colors line-clamp-2 text-sm">
                        {related.title}
                      </h3>
                      <div className="flex justify-between items-center">
                        <span className="text-blue-400 font-bold text-base">
                          ${typeof related.price === 'number' ? related.price.toFixed(2) : related.price}
                        </span>
                        {related.rating && (
                          <span className="text-yellow-400 text-xs flex items-center gap-1">
                            ⭐ {related.rating}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}