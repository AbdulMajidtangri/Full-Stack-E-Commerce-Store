'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, User, ShoppingCart, XCircle, LogIn, UserPlus, Star } from 'lucide-react';
import { LoginLink, RegisterLink, LogoutLink, useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { cartCount } = useCart();
  const { user, isAuthenticated } = useKindeAuth();
  const profileRef = useRef(null);
  const modalRef = useRef(null);

  // Show modal automatically only for new unauthenticated users
  useEffect(() => {
    // Check if user has seen the modal before using sessionStorage (resets on browser close)
    const hasSeenModal = sessionStorage.getItem('hasSeenAuthModal');
    
    // Only show modal if:
    // 1. User is not authenticated
    // 2. User hasn't seen the modal in this session
    // 3. Add a small delay for better UX
    if (!isAuthenticated && !hasSeenModal) {
      const timer = setTimeout(() => {
        setShowAuthModal(true);
        sessionStorage.setItem('hasSeenAuthModal', 'true');
      }, 1500); // Show after 1.5 second delay
      
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowAuthModal(false);
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

  return (
    <>
      <nav className="bg-black text-white border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="text-xl font-bold text-white hover:text-gray-300">
              Majid
            </Link>

            {/* Desktop Menu - Center */}
            <div className="hidden md:flex flex-1 justify-center">
              <ul className="flex gap-8 text-sm">
                <li>
                  <Link href="/" className="hover:text-blue-400 transition-colors duration-200">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/product" className="hover:text-blue-400 transition-colors duration-200">
                    Products
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/about" className="hover:text-blue-400 transition-colors duration-200">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/contact" className="hover:text-blue-400 transition-colors duration-200">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Right Side - Cart & Profile */}
            <div className="flex items-center gap-4">
              {/* Cart Icon with Badge and Red Dot */}
              <Link 
                href="/dashboard/cart" 
                className="relative p-2 hover:text-blue-400 transition-colors duration-200"
              >
                <ShoppingCart size={22} />
                {/* Red Dot Indicator - Shows when cart has items */}
                {cartCount > 0 && (
                  <>
                    {/* Small Red Dot */}
                    <span className="absolute -top-0.5 -right-0.5 bg-red-500 rounded-full h-3 w-3 flex items-center justify-center animate-pulse"></span>
                    {/* Count Badge */}
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                      {cartCount > 9 ? '9+' : cartCount}
                    </span>
                  </>
                )}
              </Link>

              {/* Profile Dropdown */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={handleProfileClick}
                  className="flex items-center gap-2 p-2 hover:text-blue-400 transition-colors duration-200 rounded-lg"
                >
                  <User size={22} />
                  <span className="hidden md:inline text-sm">
                    {user?.given_name || 'Guest'}
                  </span>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {user?.given_name || 'Guest'}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user?.email || 'Not signed in'}
                      </p>
                    </div>
                    <ul className="p-2">
                      {user ? (
                        <li>
                          <LogoutLink className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded-md transition-colors duration-200">
                            Sign Out
                          </LogoutLink>
                        </li>
                      ) : (
                        <>
                          <li>
                            <button 
                              onClick={() => setShowAuthModal(true)}
                              className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded-md transition-colors duration-200"
                            >
                              Sign In
                            </button>
                          </li>
                          <li>
                            <button 
                              onClick={() => setShowAuthModal(true)}
                              className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded-md transition-colors duration-200"
                            >
                              Sign Up
                            </button>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button 
                className="md:hidden p-2 hover:text-blue-400 transition-colors duration-200"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden border-t border-gray-800 py-4">
              <ul className="flex flex-col gap-3 text-sm">
                <li>
                  <Link 
                    href="/" 
                    className="block py-2 px-4 hover:bg-gray-800 rounded-lg transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/dashboard/product" 
                    className="block py-2 px-4 hover:bg-gray-800 rounded-lg transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/dashboard/about" 
                    className="block py-2 px-4 hover:bg-gray-800 rounded-lg transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/dashboard/contact" 
                    className="block py-2 px-4 hover:bg-gray-800 rounded-lg transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/dashboard/cart" 
                    className="flex items-center gap-2 py-2 px-4 hover:bg-gray-800 rounded-lg transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="relative">
                      <ShoppingCart size={18} />
                      {/* Red Dot for Mobile */}
                      {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 rounded-full h-2 w-2"></span>
                      )}
                    </div>
                    Cart
                    {cartCount > 0 && (
                      <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold ml-auto">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                </li>
                {!isAuthenticated && (
                  <>
                    <li>
                      <button 
                        onClick={() => {
                          setShowAuthModal(true);
                          setIsOpen(false);
                        }}
                        className="flex items-center gap-2 w-full text-left py-2 px-4 hover:bg-gray-800 rounded-lg transition-colors duration-200"
                      >
                        <LogIn size={18} />
                        Sign In
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => {
                          setShowAuthModal(true);
                          setIsOpen(false);
                        }}
                        className="flex items-center gap-2 w-full text-left py-2 px-4 hover:bg-gray-800 rounded-lg transition-colors duration-200"
                      >
                        <UserPlus size={18} />
                        Sign Up
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          )}
        </div>
      </nav>

      {/* Authentication Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-tranparent backdrop-blur bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div 
            ref={modalRef}
            className="bg-white text-black rounded-2xl max-w-md w-full mx-auto animate-in fade-in-90 zoom-in-90 duration-300"
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                Welcome to Majid! 👋
              </h2>
              <button
                onClick={closeAuthModal}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <XCircle size={24} className="text-gray-500 hover:text-gray-700" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Join Our Community
                </h3>
                <p className="text-gray-600 text-sm">
                  Sign in to unlock premium features and enhance your shopping experience.
                </p>
              </div>

              {/* Benefits List */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 text-xs font-bold">✓</span>
                  </div>
                  <span className="text-gray-700">Save items to your wishlist</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 text-xs font-bold">✓</span>
                  </div>
                  <span className="text-gray-700">Faster checkout process</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 text-xs font-bold">✓</span>
                  </div>
                  <span className="text-gray-700">Track your order history</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 text-xs font-bold">✓</span>
                  </div>
                  <span className="text-gray-700">Exclusive member discounts</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <LoginLink className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2">
                  <LogIn size={18} />
                  Sign In to Your Account
                </LoginLink>
                
                <RegisterLink className="w-full border border-gray-300 hover:bg-gray-50 text-gray-900 font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2">
                  <UserPlus size={18} />
                  Create New Account
                </RegisterLink>
              </div>

              {/* Continue as Guest */}
              <button
                onClick={closeAuthModal}
                className="w-full text-center text-gray-500 hover:text-gray-700 text-sm py-3 mt-4 transition-colors duration-200"
              >
                Continue browsing as guest
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}