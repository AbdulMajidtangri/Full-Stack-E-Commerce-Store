'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);

  // Initialize from localStorage and listen for updates
  useEffect(() => {
    // Get initial count from localStorage
    const storedCount = localStorage.getItem('cartCount');
    if (storedCount) {
      setCartCount(parseInt(storedCount));
    }

    // Listen for cart updates from other components
    const handleCartUpdate = (event) => {
      const newCount = event.detail.count;
      setCartCount(newCount);
      localStorage.setItem('cartCount', newCount.toString());
    };

    // Listen for storage events (from other tabs)
    const handleStorageChange = (event) => {
      if (event.key === 'cartCount') {
        const newCount = parseInt(event.newValue || '0');
        setCartCount(newCount);
      }
    };

    // Listen for logout events
    const handleLogout = () => {
      console.log('Logout event detected, clearing cart...');
      clearCart();
    };

    window.addEventListener('cartUpdate', handleCartUpdate);
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('userLogout', handleLogout);
    
    return () => {
      window.removeEventListener('cartUpdate', handleCartUpdate);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userLogout', handleLogout);
    };
  }, []);

  // Function to update cart count globally
  const updateCartCount = (newCount) => {
    setCartCount(newCount);
    localStorage.setItem('cartCount', newCount.toString());
    window.dispatchEvent(new CustomEvent('cartUpdate', { 
      detail: { count: newCount } 
    }));
  };

  // Function to clear cart count
  const clearCart = () => {
    console.log('Clearing cart count...');
    setCartCount(0);
    localStorage.removeItem('cartCount');
    // Clear all cart-related storage
    localStorage.removeItem('checkoutCart');
    localStorage.removeItem('checkoutCart_backup');
    sessionStorage.removeItem('checkoutCart');
    sessionStorage.removeItem('orderCompleted');
    
    // Dispatch events to notify all components
    window.dispatchEvent(new CustomEvent('cartUpdate', { 
      detail: { count: 0 } 
    }));
    
    console.log('Cart cleared successfully');
  };

  const value = {
    cartCount,
    updateCartCount,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}