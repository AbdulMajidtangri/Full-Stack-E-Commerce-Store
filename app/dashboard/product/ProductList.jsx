"use client";
import React, { useEffect, useState } from "react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import toast, { Toaster } from "react-hot-toast";
import { 
  ShoppingCart, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Eye,
  ChevronLeft,
  ChevronRight,
  Filter,
  X,
  Image as ImageIcon
} from "lucide-react";
import Image from "next/image";
import productsData from "../../Data/productsData/productsData";
import Link from "next/link";
import { useCart } from '../../context/CartContext';

export default function ProductList({ 
  products = [], 
  showAll = false,
  category = null 
}) {
  const [addingId, setAddingId] = useState(null);
  const [cart, setCart] = useState(null);
  const [displayProducts, setDisplayProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [selectedCategory, setSelectedCategory] = useState(category || "all");
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const [imageErrors, setImageErrors] = useState({});
  const { isAuthenticated, user } = useKindeAuth();
  const { updateCartCount } = useCart();

  // Get all unique categories
  const allCategories = ["all", ...new Set(productsData
    .filter(product => product.category !== "launched" && product.category !== "featured")
    .map(product => product.category)
  )];

  // Simple initialization - run only once
  useEffect(() => {
    const filteredProducts = productsData.filter(
      product => product.category !== "launched" && product.category !== "featured"
    );
    setDisplayProducts(filteredProducts);
  }, []);

  // Handle category changes separately
  useEffect(() => {
    if (selectedCategory === "all") {
      const filteredProducts = productsData.filter(
        product => product.category !== "launched" && product.category !== "featured"
      );
      setDisplayProducts(filteredProducts);
    } else {
      const filteredProducts = productsData.filter(
        product => product.category === selectedCategory
      );
      setDisplayProducts(filteredProducts);
    }
    setCurrentPage(1);
  }, [selectedCategory]);

  // Handle products prop changes
  useEffect(() => {
    if (products && products.length > 0) {
      setDisplayProducts(products);
      setCurrentPage(1);
    }
  }, [products]);

  // Handle showAll prop changes
  useEffect(() => {
    if (showAll) {
      const filteredProducts = productsData.filter(
        product => product.category !== "launched" && product.category !== "featured"
      );
      setDisplayProducts(filteredProducts);
      setCurrentPage(1);
    }
  }, [showAll]);

  // Handle category prop changes
  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
    }
  }, [category]);

  // Fetch cart data when user is logged in
  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        try {
          const res = await fetch(`/api/cart?userId=${user.id}`);
          const data = await res.json();
          setCart(data.cart);
          
          if (data.cart?.items) {
            const totalItems = data.cart.items.reduce((acc, item) => acc + item.quantity, 0);
            updateCartCount(totalItems);
          }
        } catch (error) {
          console.error("Error fetching cart:", error);
        }
      }
    };
    fetchCart();
  }, [user, updateCartCount]);

  // Handle image loading errors
  const handleImageError = (productId) => {
    setImageErrors(prev => ({
      ...prev,
      [productId]: true
    }));
  };

  // Get optimized image URL or fallback
  const getOptimizedImage = (product) => {
    if (imageErrors[product.id]) {
      return '/images/placeholder-product.jpg';
    }
    
    if (product.thumbnail) {
      return product.thumbnail;
    }
    
    if (product.image) {
      return product.image;
    }
    
    return '/images/placeholder-product.jpg';
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = displayProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(displayProducts.length / productsPerPage);

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
      image: getOptimizedImage(product),
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
        
        if (data.cart?.items) {
          const totalItems = data.cart.items.reduce((acc, item) => acc + item.quantity, 0);
          updateCartCount(totalItems);
        }
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

  // Pagination functions
  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  // Clear category filter
  const clearCategoryFilter = () => {
    setSelectedCategory("all");
  };

  if (!displayProducts || displayProducts.length === 0) {
    return (
      <div className="text-center text-gray-300 py-20">
        <p className="text-lg mb-4">No products found{selectedCategory !== "all" ? ` in ${selectedCategory} category` : ""}.</p>
        {selectedCategory !== "all" && (
          <button
            onClick={clearCategoryFilter}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-xl transition-all"
          >
            Show All Products
          </button>
        )}
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      
      {/* Category Filter and Products Count */}
      <div className="px-6 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          {/* Category Filter */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowCategoryFilter(!showCategoryFilter)}
              className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-300"
            >
              <Filter size={18} />
              Categories
            </button>
            
            {/* Selected Category Badge */}
            {selectedCategory !== "all" && (
              <div className="flex items-center gap-2 bg-blue-500/20 text-blue-400 px-3 py-2 rounded-full">
                <span className="text-sm font-semibold capitalize">{selectedCategory}</span>
                <button
                  onClick={clearCategoryFilter}
                  className="hover:text-blue-300 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Products Count */}
          <div className="text-gray-400 text-sm">
            Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, displayProducts.length)} of {displayProducts.length} products
            {selectedCategory !== "all" && ` in ${selectedCategory}`}
          </div>
        </div>

        {/* Category Dropdown */}
        {showCategoryFilter && (
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-4 mb-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-white font-semibold">Filter by Category</h3>
              <button
                onClick={() => setShowCategoryFilter(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setShowCategoryFilter(false);
                  }}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 capitalize ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white shadow-lg scale-105'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-gray-300 hover:text-white'
                  }`}
                >
                  {cat === "all" ? "All Products" : cat}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Products Grid - CONSISTENT CARD SIZING */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-6">
        {currentProducts.map((product) => {
          const quantityInCart = getQuantityInCart(product.id);
          const outOfStock = quantityInCart >= product.stock;
          const imageUrl = getOptimizedImage(product);

          return (
            <div
              key={product.id}
              className="group relative bg-neutral-900 border border-gray-800 rounded-2xl shadow-lg hover:shadow-blue-500/20 hover:scale-105 transition-all duration-300 overflow-hidden flex flex-col h-[480px]"
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

              {/* Product Image - FIXED HEIGHT */}
              <Link href={`/dashboard/product/${product.id}`} className="block flex-shrink-0">
                <div className="overflow-hidden bg-white flex justify-center items-center h-48">
                  {imageErrors[product.id] ? (
                    <div className="flex flex-col items-center justify-center w-full h-full bg-gray-200 text-gray-500">
                      <ImageIcon size={48} className="mb-2" />
                      <span className="text-sm">Image not available</span>
                    </div>
                  ) : (
                    <Image
                      src={imageUrl}
                      alt={product.title}
                      width={280}
                      height={192}
                      className="object-contain h-44 w-full group-hover:scale-110 transition-transform duration-300"
                      onError={() => handleImageError(product.id)}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R"
                    />
                  )}
                </div>
              </Link>

              {/* Product Info - FLEXIBLE CONTENT AREA */}
              <div className="p-4 flex flex-col flex-1">
                <Link href={`/dashboard/product/${product.id}`} className="block mb-1 flex-shrink-0">
                  <h2 className="font-bold text-lg text-white truncate hover:text-blue-400 transition-colors">
                    {product.title}
                  </h2>
                </Link>
                
                <p className="text-gray-400 text-sm mb-2 capitalize flex-shrink-0">{product.category}</p>
                <p className="text-xl font-bold text-blue-400 mb-3 flex-shrink-0">
                  ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
                </p>

                <div className="flex justify-between text-sm text-gray-400 mb-4 flex-shrink-0">
                  <p>Stock: <span className="text-yellow-400">{product.stock}</span></p>
                  {product.rating && (
                    <p className="flex items-center gap-1">
                      ⭐ {product.rating}
                    </p>
                  )}
                </div>

                {quantityInCart > 0 && (
                  <div className="mb-3 text-sm text-green-400 flex items-center gap-1 flex-shrink-0">
                    <CheckCircle2 size={14} />
                    In Cart: {quantityInCart}
                  </div>
                )}

                {/* Buttons - ALWAYS AT BOTTOM */}
                <div className="flex gap-2 mt-auto pt-3 flex-shrink-0">
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

      {/* Professional Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-12 px-6 py-8 border-t border-gray-800">
          <div className="text-gray-400 text-sm">
            Page {currentPage} of {totalPages}
          </div>
          
          <div className="flex items-center gap-2">
            {/* Previous Button */}
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 ${
                currentPage === 1
                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-500/25'
              }`}
            >
              <ChevronLeft size={18} />
              Previous
            </button>

            {/* Page Numbers */}
            <div className="flex gap-1 mx-4">
              {getPageNumbers().map((pageNum, index) => 
                pageNum === '...' ? (
                  <span 
                    key={`ellipsis-${index}`} 
                    className="w-12 h-12 flex items-center justify-center text-gray-500 text-lg"
                  >
                    •••
                  </span>
                ) : (
                  <button
                    key={pageNum}
                    onClick={() => goToPage(pageNum)}
                    className={`w-12 h-12 rounded-xl transition-all duration-300 font-semibold ${
                      currentPage === pageNum
                        ? 'bg-blue-600 text-white shadow-lg scale-105'
                        : 'bg-neutral-800 hover:bg-neutral-700 text-gray-300 hover:text-white hover:scale-105'
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              )}
            </div>

            {/* Next Button */}
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 ${
                currentPage === totalPages
                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-500/25'
              }`}
            >
              Next
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="text-gray-400 text-sm hidden sm:block">
            {displayProducts.length} total products
            {selectedCategory !== "all" && ` in ${selectedCategory}`}
          </div>
        </div>
      )}
    </>
  );
}