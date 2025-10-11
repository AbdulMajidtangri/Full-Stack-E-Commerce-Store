"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight, Star, Shield, Truck, Zap, Home, Smartphone, Sparkles } from "lucide-react";
import { ChevronRight } from 'lucide-react'

export default function ProductHerosection() {
  return (
    <section className="relative bg-white text-gray-900 min-h-screen flex items-center justify-center py-8 lg:py-0 overflow-hidden">
     
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-100 via-transparent to-transparent"></div>
      
      {/* Animated Background Elements - Adjusted for mobile */}
      <div className="absolute top-4 left-2 w-32 h-32 lg:top-10 lg:left-10 lg:w-72 lg:h-72 bg-gray-300 rounded-full mix-blend-multiply filter blur-2xl lg:blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute top-32 right-2 w-36 h-36 lg:top-40 lg:right-10 lg:w-96 lg:h-96 bg-gray-400 rounded-full mix-blend-multiply filter blur-2xl lg:blur-3xl opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute bottom-16 left-1/4 w-32 h-32 lg:bottom-20 lg:left-1/3 lg:w-80 lg:h-80 bg-gray-500 rounded-full mix-blend-multiply filter blur-2xl lg:blur-3xl opacity-20 animate-pulse delay-500"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
             {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li><Link href="/" className="hover:text-black transition-colors">Home</Link></li>
            <li><ChevronRight size={16} /></li>
            <li><Link href="/dashboard/product" className="hover:text-black transition-colors">Products</Link></li>
          </ol>
        </nav>
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gray-100 border border-gray-300 rounded-full px-4 py-2">
              <Zap className="w-4 h-4 text-black" />
              <span className="text-black text-sm font-medium">Premium Quality Products</span>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Discover
              <span className="block text-black mt-2">
                Amazing Products
              </span>
              For Everyone
            </h1>
            
            {/* Description */}
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Explore our curated collection of premium products designed to enhance your lifestyle. 
              From cutting-edge technology to everyday essentials, we bring you the best at unbeatable prices.
            </p>

            {/* Stats */}
            <div className="flex justify-center lg:justify-start flex-wrap gap-4 sm:gap-6 lg:gap-8">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-black">10K+</div>
                <div className="text-gray-600 text-xs sm:text-sm">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-black">500+</div>
                <div className="text-gray-600 text-xs sm:text-sm">Premium Products</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-black">4.9</div>
                <div className="text-gray-600 text-xs sm:text-sm flex items-center gap-1 justify-center lg:justify-start">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-500 text-yellow-500" />
                  Average Rating
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Link
                href="#products"
                className="group bg-black hover:bg-gray-800 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg text-sm sm:text-base"
              >
                Shop Now
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="/dashboard/products"
                className="group border-2 border-black hover:bg-black hover:text-white text-black font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg transition-all duration-300 flex items-center justify-center gap-3 text-sm sm:text-base"
              >
                View All Products
              </Link>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-4 sm:pt-6">
              <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600 justify-center lg:justify-start">
                <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600 justify-center lg:justify-start">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                <span>2-Year Warranty</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600 justify-center lg:justify-start">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
                <span>Premium Quality</span>
              </div>
            </div>
          </div>

          {/* Right Content - Product Showcase */}
          <div className="relative mt-8 lg:mt-0 flex justify-center">
            <div className="relative w-full max-w-sm lg:max-w-none">
              {/* Main Product Card */}
              <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-300 transform lg:rotate-3 hover:rotate-0 transition-transform duration-500 mx-auto">
                <div className="bg-white rounded-xl p-3 sm:p-4 lg:p-6 flex items-center justify-center h-40 sm:h-48 lg:h-64 border border-gray-200">
                  <div className="text-center">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-gray-800 to-black rounded-2xl mx-auto mb-2 sm:mb-3 lg:mb-4 flex items-center justify-center shadow-lg">
                      <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white" />
                    </div>
                    <h3 className="text-black font-semibold text-sm sm:text-base lg:text-lg mb-1 lg:mb-2">Latest Collection</h3>
                    <p className="text-gray-600 text-xs sm:text-sm">Premium Quality</p>
                  </div>
                </div>
                
                {/* Floating Elements - Adjusted for mobile */}
                <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 lg:-top-4 lg:-right-4 bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-semibold shadow-lg">
                  Featured
                </div>
                <div className="absolute -bottom-2 -left-2 sm:-bottom-3 sm:-left-3 lg:-bottom-4 lg:-left-4 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg">
                  -20% OFF
                </div>
              </div>

              {/* Floating Cards - Adjusted positions for mobile */}
              <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 lg:-bottom-8 lg:-left-8 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl p-2 sm:p-3 w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 shadow-lg transform -rotate-12">
                <div className="text-center text-white flex flex-col items-center justify-center h-full">
                  <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 lg:w-8 lg:h-8 mb-0 sm:mb-1" />
                  <div className="text-[10px] sm:text-xs font-bold">Tech</div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 lg:-top-8 lg:-right-8 bg-gradient-to-br from-gray-600 to-gray-800 rounded-xl p-2 sm:p-3 w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 shadow-lg transform rotate-12">
                <div className="text-center text-white flex flex-col items-center justify-center h-full">
                  <Home className="w-4 h-4 sm:w-5 sm:h-5 lg:w-8 lg:h-8 mb-0 sm:mb-1" />
                  <div className="text-[10px] sm:text-xs font-bold">Home</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Hidden on small screens */}
      <div className="absolute bottom-4 lg:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block">
        <div className="w-6 h-10 border-2 border-black rounded-full flex justify-center">
          <div className="w-1 h-3 bg-black rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}