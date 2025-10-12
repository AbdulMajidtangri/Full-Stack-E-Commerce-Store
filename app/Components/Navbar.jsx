'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, User, ShoppingCart, XCircle, LogIn, UserPlus, Star, ChevronDown, Search, Shield, Clock, Package, Award } from 'lucide-react';
import { LoginLink, RegisterLink, LogoutLink, useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { useCart } from '../context/CartContext';
import { useSearch } from '../context/SearchContext'; // Add this import

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartCount } = useCart();
  const { user, isAuthenticated } = useKindeAuth();
  
  // Use search context
  const { 
    searchQuery, 
    setSearchQuery, 
    searchResults, 
    isSearchOpen, 
    setIsSearchOpen 
  } = useSearch();
  
  const profileRef = useRef(null);
  const modalRef = useRef(null);
  const searchRef = useRef(null);

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Show modal automatically only for new unauthenticated users
  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem('hasSeenAuthModal');
    
    if (!isAuthenticated && !hasSeenModal) {
      const timer = setTimeout(() => {
        setShowAuthModal(true);
        sessionStorage.setItem('hasSeenAuthModal', 'true');
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowAuthModal(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProfileClick = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      setIsProfileOpen(false);
    } else {
      setIsProfileOpen(!isProfileOpen);
    }
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setIsSearchOpen(true);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // You can navigate to search results page or handle it here
      console.log('Searching for:', searchQuery);
      setIsSearchOpen(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setIsSearchOpen(false);
  };

  return (
    <>
      <nav className={`bg-white backdrop-blur-md border-b transition-all duration-300 sticky top-0 z-50 ${
        scrolled ? 'shadow-lg border-gray-200' : 'border-gray-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">PP</span>
              </div>
              <span className="text-xl font-bold text-black group-hover:text-gray-700 transition-all duration-300">
                PurePick
              </span>
            </Link>

            {/* Desktop Menu - Center */}
            <div className="hidden lg:flex flex-1 justify-center">
              <ul className="flex gap-8 text-sm font-medium">
                {[
                  { href: "/", label: "Home" },
                  { href: "/dashboard/product", label: "Products" },
                  { href: "/dashboard/contact", label: "Contact" }
                ].map((item) => (
                  <li key={item.href}>
                    <Link 
                      href={item.href} 
                      className="text-gray-700 hover:text-black transition-colors duration-200 relative group"
                    >
                      {item.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-xs mx-8 relative" ref={searchRef}>
              <form onSubmit={handleSearchSubmit} className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => setIsSearchOpen(true)}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 bg-white"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={18} />
                  </button>
                )}
              </form>

              {/* Search Results Dropdown */}
              {isSearchOpen && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                  <div className="p-2">
                    {searchResults.map((product) => (
                      <Link
                        key={product.id}
                        href={`/dashboard/product/${product.id}`}
                        className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                        onClick={() => setIsSearchOpen(false)}
                      >
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="w-10 h-10 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {product.title}
                          </p>
                          <p className="text-sm text-gray-500 truncate">
                            {product.brand} • ${product.price}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* No Results Message */}
              {isSearchOpen && searchQuery && searchResults.length === 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4">
                  <p className="text-gray-500 text-center">No products found</p>
                </div>
              )}
            </div>

            {/* Right Side - Icons */}
            <div className="flex items-center gap-3">
              {/* Cart */}
              <Link 
                href="/dashboard/cart" 
                className="relative p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition-all duration-200 group"
              >
                <ShoppingCart size={20} className="group-hover:scale-110 transition-transform duration-200" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </Link>

              {/* Profile Dropdown */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={handleProfileClick}
                  className="flex items-center gap-2 p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition-all duration-200 group"
                >
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {user?.given_name?.[0] || 'G'}
                  </div>
                  <ChevronDown size={16} className={`transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 z-50 animate-in fade-in-80 zoom-in-95">
                    {user ? (
                      <>
                        <div className="p-4 border-b border-gray-200">
                          <p className="font-semibold text-black truncate">
                            {user.given_name} {user.family_name}
                          </p>
                          <p className="text-sm text-gray-500 truncate">
                            {user.email}
                          </p>
                        </div>
                        <div className="p-2">
                          <LogoutLink className="flex items-center gap-3 w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                            Sign Out
                          </LogoutLink>
                        </div>
                      </>
                    ) : (
                      <div className="p-2">
                        <button 
                          onClick={() => setShowAuthModal(true)}
                          className="flex items-center gap-3 w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                        >
                          <LogIn size={16} />
                          Sign In
                        </button>
                        <button 
                          onClick={() => setShowAuthModal(true)}
                          className="flex items-center gap-3 w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                        >
                          <UserPlus size={16} />
                          Create Account
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button 
                className="lg:hidden p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition-all duration-200"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="lg:hidden border-t border-gray-200 py-4 bg-white animate-in slide-in-from-top duration-300">
              {/* Mobile Search */}
              <div className="relative mb-4 px-4" ref={searchRef}>
                <Search className="absolute left-7 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => setIsSearchOpen(true)}
                  className="w-full pl-12 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 bg-white"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute right-7 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={18} />
                  </button>
                )}

                {/* Mobile Search Results */}
                {isSearchOpen && searchResults.length > 0 && (
                  <div className="absolute top-full left-4 right-4 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                    <div className="p-2">
                      {searchResults.map((product) => (
                        <Link
                          key={product.id}
                          href={`/dashboard/product/${product.id}`}
                          className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                          onClick={() => {
                            setIsSearchOpen(false);
                            setIsOpen(false);
                          }}
                        >
                          <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="w-10 h-10 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {product.title}
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                              {product.brand} • ${product.price}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <ul className="flex flex-col gap-1 text-sm font-medium">
                {[
                  { href: "/", label: "Home" },
                  { href: "/dashboard/product", label: "Products" },
                  { href: "/dashboard/contact", label: "Contact" },
                  { href: "/dashboard/cart", label: "Cart", icon: ShoppingCart, badge: cartCount }
                ].map((item) => (
                  <li key={item.href}>
                    <Link 
                      href={item.href} 
                      className="flex items-center gap-3 py-3 px-4 text-gray-700 hover:bg-gray-100 hover:text-black rounded-lg transition-all duration-200 group"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.icon && <item.icon size={18} className="text-gray-400 group-hover:text-black" />}
                      <span>{item.label}</span>
                      {item.badge > 0 && (
                        <span className="ml-auto bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
                
                {!isAuthenticated && (
                  <>
                    <div className="border-t border-gray-200 my-2 pt-2">
                      <button 
                        onClick={() => {
                          setShowAuthModal(true);
                          setIsOpen(false);
                        }}
                        className="flex items-center gap-3 w-full text-left py-3 px-4 text-gray-700 hover:bg-gray-100 hover:text-black rounded-lg transition-all duration-200"
                      >
                        <LogIn size={18} />
                        Sign In
                      </button>
                      <button 
                        onClick={() => {
                          setShowAuthModal(true);
                          setIsOpen(false);
                        }}
                        className="flex items-center gap-3 w-full text-left py-3 px-4 text-gray-700 hover:bg-gray-100 hover:text-black rounded-lg transition-all duration-200"
                      >
                        <UserPlus size={18} />
                        Create Account
                      </button>
                    </div>
                  </>
                )}
              </ul>
            </div>
          )}
        </div>
      </nav>

      {/* Enhanced Authentication Modal - Black & White Theme */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
          <div 
            ref={modalRef}
            className="bg-white rounded-2xl max-w-md w-full mx-auto shadow-2xl border border-gray-200 animate-in zoom-in-95 duration-300"
          >
            {/* Modal Header */}
            <div className="relative p-6 pb-4">
              <button
                onClick={closeAuthModal}
                className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <XCircle size={24} className="text-gray-500 hover:text-gray-700" />
              </button>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-black mb-2">
                  Welcome to PurePick
                </h2>
                <p className="text-gray-600 text-sm">
                  Sign in to access your account and start shopping
                </p>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 pt-2">
              {/* Benefits with Icons */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { icon: Shield, text: "Secure payments" },
                  { icon: Clock, text: "Fast checkout" },
                  { icon: Package, text: "Order tracking" },
                  { icon: Award, text: "Best quality" }
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <benefit.icon size={18} className="text-black" />
                    <span className="text-sm font-medium text-gray-700">{benefit.text}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <LoginLink
                postLoginRedirectURL="/"
                className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl">
                  <LogIn size={20} />
                  Sign In to Account
                </LoginLink>
                
                <RegisterLink
                postLoginRedirectURL="/"
                className="w-full border-2 border-gray-300 hover:border-black hover:bg-gray-50 text-black font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-3">
                  <UserPlus size={20} />
                  Create New Account
                </RegisterLink>
              </div>

              {/* Guest Option */}
              <div className="text-center mt-4 pt-4 border-t border-gray-200">
                <button
                  onClick={closeAuthModal}
                  className="text-gray-500 hover:text-black text-sm font-medium transition-colors duration-200"
                >
                  Continue browsing as guest
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}