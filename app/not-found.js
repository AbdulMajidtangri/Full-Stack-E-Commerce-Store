// app/not-found.js (Enhanced version)
"use client";
import { useState } from "react";
import Link from "next/link";
import { Home, ArrowLeft, Search, RotateCcw } from "lucide-react";

export default function NotFound() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Redirect to search page or implement search logic
      window.location.href = `/dashboard/${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* Animated 404 */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-black mb-4 relative">
            4<span className="text-gray-300">0</span>4
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Lost in Space?
        </h1>
        <p className="text-gray-600 mb-8 text-lg">
          The page you're looking for seems to have drifted off into the digital cosmos.
        </p>

        {/* Search Suggestion */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What are you looking for?"
              className="w-full px-4 py-3 pl-12 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </form>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            <Home size={18} />
            Back to Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-black font-semibold py-3 px-6 rounded-lg transition-all duration-200"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>

          <button
            onClick={() => window.location.reload()}
            className="flex items-center justify-center gap-2 border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-black font-semibold py-3 px-6 rounded-lg transition-all duration-200"
          >
            <RotateCcw size={18} />
            Try Again
          </button>
        </div>

        {/* Quick Navigation */}
        <div className="border-t border-gray-200 pt-6">
          <p className="text-gray-500 text-sm mb-4">Quick Navigation</p>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <Link href="/dashboard/product" className="text-black hover:text-gray-700 transition-colors p-2 bg-gray-50 rounded">
              Products
            </Link>
            <Link href="/dashboard/contact" className="text-black hover:text-gray-700 transition-colors p-2 bg-gray-50 rounded">
              Contact
            </Link>
            <Link href="/dashboard/cart" className="text-black hover:text-gray-700 transition-colors p-2 bg-gray-50 rounded">
               Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}