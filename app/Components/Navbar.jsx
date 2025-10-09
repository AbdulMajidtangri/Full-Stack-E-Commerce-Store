'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, User, ShoppingCart } from 'lucide-react';
import { LoginLink, RegisterLink, LogoutLink, useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { cartCount } = useCart();
  const { user, isAuthenticated } = useKindeAuth();
  const profileRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
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
            {/* Cart Icon with Badge */}
            <Link 
              href="/dashboard/cart" 
              className="relative p-2 hover:text-blue-400 transition-colors duration-200"
            >
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-pulse">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Link>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
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
                          <LoginLink className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded-md transition-colors duration-200">
                            Sign In
                          </LoginLink>
                        </li>
                        <li>
                          <RegisterLink className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded-md transition-colors duration-200">
                            Sign Up
                          </RegisterLink>
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
                  <ShoppingCart size={18} />
                  Cart
                  {cartCount > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold ml-auto">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}