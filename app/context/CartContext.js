'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);

  // Load cart count from localStorage on initial load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCartCount = localStorage.getItem('cartCount');
      if (savedCartCount) {
        setCartCount(parseInt(savedCartCount));
      }
    }
  }, []);

  // Save cart count to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cartCount', cartCount.toString());
    }
  }, [cartCount]);

  // Function to update cart count
  const updateCartCount = (count) => {
    setCartCount(count);
  };

  // Function to increment cart count
  const incrementCartCount = (amount = 1) => {
    setCartCount(prev => prev + amount);
  };

  // Function to decrement cart count
  const decrementCartCount = (amount = 1) => {
    setCartCount(prev => Math.max(0, prev - amount));
  };

  // Function to reset cart count
  const resetCartCount = () => {
    setCartCount(0);
  };

  return (
    <CartContext.Provider value={{ 
      cartCount, 
      updateCartCount, 
      incrementCartCount, 
      decrementCartCount,
      resetCartCount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};