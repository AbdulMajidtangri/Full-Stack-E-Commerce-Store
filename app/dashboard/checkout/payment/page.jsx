// app/dashboard/checkout/payment/page.jsx
import { redirect } from 'next/navigation';
import PaymentForm from './PaymentForm';

export default function PaymentPage({ searchParams }) {
  let cartData = null;
  
  // Try to get cart data from multiple sources
  if (typeof window !== 'undefined') {
    try {
      // From sessionStorage
      const sessionCart = sessionStorage.getItem('checkoutCart');
      if (sessionCart) {
        cartData = JSON.parse(sessionCart);
      }
      
      // From localStorage backup
      if (!cartData) {
        const backupCart = localStorage.getItem('checkoutCart_backup');
        if (backupCart) {
          cartData = JSON.parse(backupCart);
        }
      }
      
      // From URL parameters
      if (!cartData && searchParams.cart) {
        cartData = JSON.parse(atob(searchParams.cart));
      }
    } catch (error) {
      console.error('Error loading cart data:', error);
    }
  }

  // Redirect if no cart data
  if (!cartData) {
    redirect('/dashboard/cart');
    return null;
  }

  return (
    <PaymentForm 
      cart={cartData}
      subtotal={cartData.subtotal}
    />
  );
}