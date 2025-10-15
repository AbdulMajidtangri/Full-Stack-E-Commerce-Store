"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, Lock, Shield, CheckCircle } from "lucide-react";
import { useCart } from '../../../context/CartContext';

export default function PaymentForm({ cartData, subtotal, sessionId }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
    saveCard: false
  });
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const { clearCart } = useCart();

  const exactSubtotal = subtotal || 0;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  // Early return if no cart data
  if (!cartData || !cartData.items || cartData.items.length === 0) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Cart Not Found</h2>
          <p className="text-gray-600 mb-6">Your cart appears to be empty or unavailable.</p>
          <button 
            onClick={() => router.push('/dashboard/cart')}
            className="bg-black hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
          >
            Return to Cart
          </button>
        </div>
      </div>
    );
  }

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.cardNumber) {
      newErrors.cardNumber = "Card number is required";
    } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ""))) {
      newErrors.cardNumber = "Card number must be 16 digits";
    }

    if (!formData.expiryDate) {
      newErrors.expiryDate = "Expiry date is required";
    } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = "Use MM/YY format";
    }

    if (!formData.cvv) {
      newErrors.cvv = "CVV is required";
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = "CVV must be 3 or 4 digits";
    }

    if (!formData.nameOnCard) {
      newErrors.nameOnCard = "Name on card is required";
    }

    if (!formData.address) {
      newErrors.address = "Address is required";
    }

    if (!formData.city) {
      newErrors.city = "City is required";
    }

    if (!formData.zipCode) {
      newErrors.zipCode = "Zip code is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearUserCart = async () => {
    try {
      // Clear the user's cart from the database
      const response = await fetch("/api/cart/clear", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: cartData.userId
        }),
      });

      if (!response.ok) {
        console.error("Failed to clear cart");
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!validateForm()) {
    return;
  }

  setIsProcessing(true);

  try {
    // Simulate payment processing for 5 seconds - DEMO ONLY
    console.log("🔄 Starting payment processing...");
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Show success state
    console.log("✅ Payment successful, showing success state...");
    setIsSuccess(true);
    
    // Clear user's cart from database
    console.log("🗑️ Clearing user cart...");
    await clearUserCart();
    
    // Clear cart from context and localStorage
    console.log("🔄 Clearing cart context...");
    clearCart();
    
    // Set order completed flag
    sessionStorage.setItem('orderCompleted', 'true');
    
    // Clear any existing session storage
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('checkoutCart');
      localStorage.removeItem('checkoutCart_backup');
      localStorage.removeItem('cartCount');
    }
    
    // Wait 2 seconds to show success state
    console.log("⏳ Showing success state for 2 seconds...");
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Redirect to success page
    console.log("🚀 Redirecting to success page...");
    router.push(`/dashboard/checkout/success?sessionId=${sessionId}`);
    
  } catch (error) {
    console.error("Payment error:", error);
    // Don't show error to user in demo
  } finally {
    setIsProcessing(false);
    setIsSuccess(false);
  }
};

  const formatCardNumber = (value) => {
    return value.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim();
  };

  const formatExpiryDate = (value) => {
    return value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2");
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black mb-4">
            Complete Your Purchase
          </h1>
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <Shield className="w-5 h-5" />
            <span>Secure payment processed with SSL encryption</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div className="bg-white border border-gray-300 rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4 text-black">
                  Contact Information
                </h2>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-white text-gray-600 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white border border-gray-300 rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4 text-black flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Method
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={(e) => {
                        const formatted = formatCardNumber(e.target.value);
                        setFormData(prev => ({ ...prev, cardNumber: formatted }));
                        if (errors.cardNumber) {
                          setErrors(prev => ({ ...prev, cardNumber: "" }));
                        }
                      }}
                      maxLength={19}
                      className={`w-full px-4 py-3 bg-white text-gray-600 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black ${
                        errors.cardNumber ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="1234 5678 9012 3456"
                    />
                    {errors.cardNumber && (
                      <p className="text-red-600 text-sm mt-1">{errors.cardNumber}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="nameOnCard" className="block text-sm font-medium text-gray-700 mb-2">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      id="nameOnCard"
                      name="nameOnCard"
                      value={formData.nameOnCard}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-white text-gray-600  border rounded-lg focus:outline-none focus:ring-2 focus:ring-black ${
                        errors.nameOnCard ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="John Doe"
                    />
                    {errors.nameOnCard && (
                      <p className="text-red-600 text-sm mt-1">{errors.nameOnCard}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={(e) => {
                        const formatted = formatExpiryDate(e.target.value);
                        setFormData(prev => ({ ...prev, expiryDate: formatted }));
                        
                        if (errors.expiryDate) {
                          setErrors(prev => ({ ...prev, expiryDate: "" }));
                        }
                      }}
                      maxLength={5}
                      className={`w-full px-4 py-3 bg-white text-gray-600 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black ${
                        errors.expiryDate ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="MM/YY"
                    />
                    {errors.expiryDate && (
                      <p className="text-red-600 text-sm mt-1">{errors.expiryDate}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      maxLength={4}
                      className={`w-full px-4 py-3 bg-white text-gray-600 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black ${
                        errors.cvv ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="123"
                    />
                    {errors.cvv && (
                      <p className="text-red-600 text-sm mt-1">{errors.cvv}</p>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="saveCard"
                      checked={formData.saveCard}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-black bg-white text-gray-600 border-gray-300 rounded focus:ring-black"
                    />
                    <span className="text-gray-700 text-sm">Save card for future purchases</span>
                  </label>
                </div>
              </div>

              {/* Billing Address */}
              <div className="bg-white border border-gray-300 rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4 text-black">
                  Billing Address
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                      Street Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-white text-gray-600 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black ${
                        errors.address ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="123 Main St"
                    />
                    {errors.address && (
                      <p className="text-red-600 text-sm mt-1">{errors.address}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-white text-gray-600 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black ${
                        errors.city ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="New York"
                    />
                    {errors.city && (
                      <p className="text-red-600 text-sm mt-1">{errors.city}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-white text-gray-600 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black ${
                        errors.state ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="NY"
                    />
                    {errors.state && (
                      <p className="text-red-600 text-sm mt-1">{errors.state}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-2">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-white text-gray-600 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black ${
                        errors.zipCode ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="10001"
                    />
                    {errors.zipCode && (
                      <p className="text-red-600 text-sm mt-1">{errors.zipCode}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                      Country
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white  border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    >
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="AU">Australia</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="bg-white border border-gray-300 rounded-xl p-6">
                <button
                  type="submit"
                  disabled={isProcessing || isSuccess}
                  className={`w-full font-semibold py-4 rounded-lg transition-all duration-300 transform shadow-lg disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 ${
                    isProcessing 
                      ? "bg-blue-600 text-white" 
                      : isSuccess 
                        ? "bg-green-600 text-white" 
                        : "bg-black hover:bg-gray-800 text-white hover:scale-105"
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing Payment ....
                    </>
                  ) : isSuccess ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Payment Successful! Redirecting...
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      Pay ${exactSubtotal.toFixed(2)}
                    </>
                  )}
                </button>

                <p className="text-gray-600 text-xs text-center mt-4">
                  By completing your purchase, you agree to our Terms of Service and Privacy Policy.
                  Your payment is secure and encrypted.
                </p>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-300 rounded-xl p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4 text-black">Order Summary</h2>
              
              <div className="space-y-3 mb-4">
                {cartData.items.map((item) => (
                  <div key={item.productId} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-contain bg-gray-100 border border-gray-300"
                      />
                      <div>
                        <p className="text-sm font-medium text-black">{item.name}</p>
                        <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="text-black font-medium">
                      ${((item.price || 0) * (item.quantity || 0)).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <hr className="border-gray-300 my-4" />

              <div className="space-y-2">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>${exactSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              <hr className="border-gray-300 my-4" />

              <div className="flex justify-between text-lg font-bold text-black">
                <span>Total</span>
                <span>${exactSubtotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}