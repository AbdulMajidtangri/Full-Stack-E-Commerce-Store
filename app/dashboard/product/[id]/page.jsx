"use client";
import React, { useState } from "react";
import productsData from "../../../Data/productsData/productsData";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ShoppingCart, Loader2, Home, ArrowRight } from "lucide-react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import toast, { Toaster } from "react-hot-toast";

export default function ProductDetailPage({ params }) {
  const productId = parseInt(params.id);
  const product = productsData.find((p) => p.id === productId);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { isAuthenticated, user } = useKindeAuth();

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">❌</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Product Not Found</h1>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link
            href="/dashboard/product"
            className="bg-black hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 inline-flex items-center gap-2"
          >
            <ArrowRight size={16} />
            Back to Products
          </Link>
        </div>
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

  const updateCartCount = (count) => {
    localStorage.setItem('cartCount', count.toString());
    window.dispatchEvent(new CustomEvent('cartUpdate', { detail: { count } }));
  };

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
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <section className="py-8 bg-white text-gray-900 min-h-screen">
      <Toaster position="top-center" reverseOrder={false} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-black transition-colors flex items-center gap-1">
                <Home size={16} />
                Home
              </Link>
            </li>
            <li><ChevronRight size={16} /></li>
            <li><Link href="/dashboard/product" className="hover:text-black transition-colors">Products</Link></li>
            <li><ChevronRight size={16} /></li>
            <li className="text-black font-medium truncate max-w-[200px]">{product.title}</li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Product Gallery Section */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-white rounded-xl overflow-hidden border border-gray-200">
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

              {/* Navigation Arrows */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border border-gray-300 p-3 rounded-full transition-all duration-300 shadow-lg"
                  >
                    <ChevronLeft size={20} className="text-gray-700" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border border-gray-300 p-3 rounded-full transition-all duration-300 shadow-lg"
                  >
                    <ChevronRight size={20} className="text-gray-700" />
                  </button>
                </>
              )}

              {/* Image Counter */}
              {allImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/80 text-white px-3 py-1 rounded-full text-sm">
                  {selectedImageIndex + 1} / {allImages.length}
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {allImages.length > 1 && (
              <div className="flex space-x-3 overflow-x-auto pb-2 p-2 scrollbar-hide">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      selectedImageIndex === index 
                        ? 'border-black scale-105' 
                        : 'border-transparent hover:border-gray-400'
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
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold capitalize border ${
                product.category === "launched" 
                  ? "bg-green-50 text-green-700 border-green-200" 
                  : product.category === "featured"
                  ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                  : "bg-gray-100 text-gray-700 border-gray-300"
              }`}>
                {product.category === "launched" ? "Newly Launched" : 
                 product.category === "featured" ? "Featured" : 
                 product.category}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold mb-3 text-black leading-tight">
              {product.title}
            </h1>
            
            {product.brand && (
              <p className="text-gray-600 mb-3 text-base">Brand: <span className="text-black font-medium">{product.brand}</span></p>
            )}
            
            <p className="text-gray-700 mb-6 text-base leading-relaxed">
              {product.description}
            </p>

            {/* Price & Rating */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex items-center gap-3">
                <span className="text-black text-2xl sm:text-3xl font-bold">
                  ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
                </span>
                
                {product.discountPercentage && product.discountPercentage > 0 && (
                  <span className="text-red-600 text-lg line-through">
                    ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-4">
                {product.rating && (
                  <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-200">
                    <span className="text-yellow-600">⭐</span>
                    <span className="text-yellow-700 font-semibold">{product.rating}</span>
                  </div>
                )}
                
                <span className={`text-sm font-semibold px-3 py-1 rounded-full border ${
                  product.stock > 10 ? "bg-green-50 text-green-700 border-green-200" : 
                  product.stock > 0 ? "bg-yellow-50 text-yellow-700 border-yellow-200" : "bg-red-50 text-red-700 border-red-200"
                }`}>
                  {product.stock > 0 ? `${product.stock} in stock` : "Out of Stock"}
                </span>
              </div>
            </div>

            {/* Key Benefits */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3 text-black">
                Key Features
              </h3>
              <div className="space-y-2">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="text-green-600 flex-shrink-0">✓</span>
                    <span className="text-gray-700 text-sm sm:text-base">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Details */}
            <div className="mb-6 grid grid-cols-2 gap-3 text-sm">
              {product.brand && (
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <span className="text-gray-600 block text-xs">Brand</span>
                  <p className="text-black font-medium">{product.brand}</p>
                </div>
              )}
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <span className="text-gray-600 block text-xs">Category</span>
                <p className="text-black font-medium capitalize">
                  {product.category === "launched" ? product.category2 : 
                   product.category === "featured" ? product.category2 : 
                   product.category}
                </p>
              </div>
           
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <button 
                onClick={handleAddToCart}
                disabled={isAddingToCart || product.stock === 0}
                className={`flex items-center justify-center gap-3 py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex-1 border ${
                  isAddingToCart || product.stock === 0
                    ? 'bg-gray-100 border-gray-300 cursor-not-allowed text-gray-400'
                    : 'bg-black hover:bg-gray-800 text-white border-black'
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
                href="/dashboard/product"
                className="bg-white hover:bg-gray-50 text-black font-semibold py-3 px-6 rounded-lg transition-all duration-300 text-center border border-gray-300"
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
              <h2 className="text-2xl font-bold text-black">
                Related Products
              </h2>
              <Link 
                href="/dashboard/product" 
                className="text-gray-600 hover:text-black transition-colors duration-300 text-sm flex items-center gap-1"
              >
                View All <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedProducts.map((related) => (
                <Link key={related.id} href={`/dashboard/product/${related.id}`}>
                  <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all transform hover:-translate-y-1 cursor-pointer h-full group border border-gray-200">
                    <div className="relative overflow-hidden bg-gray-50">
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
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold border ${
                          related.category === "launched" 
                            ? "bg-green-50 text-green-700 border-green-200" 
                            : related.category === "featured"
                            ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                            : "bg-gray-100 text-gray-700 border-gray-300"
                        }`}>
                          {related.category === "launched" ? "New" : 
                           related.category === "featured" ? "Featured" : 
                           related.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2 text-black group-hover:text-gray-700 transition-colors line-clamp-2 text-sm">
                        {related.title}
                      </h3>
                      <div className="flex justify-between items-center">
                        <span className="text-black font-bold text-base">
                          ${typeof related.price === 'number' ? related.price.toFixed(2) : related.price}
                        </span>
                        {related.rating && (
                          <span className="text-gray-600 text-xs flex items-center gap-1">
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