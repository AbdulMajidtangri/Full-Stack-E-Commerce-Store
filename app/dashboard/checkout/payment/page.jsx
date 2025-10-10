// app/dashboard/checkout/payment/PaymentForm.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, Lock, Shield, AlertCircle, CheckCircle } from "lucide-react";

export default function PaymentForm() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [progress, setProgress] = useState(0);
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
  const [cartData, setCartData] = useState(null);
  const router = useRouter();

  // Load cart data from storage when component mounts
  useEffect(() => {
    const loadCartData = () => {
      try {
        // Try sessionStorage first
        const sessionCart = sessionStorage.getItem('checkoutCart');
        if (sessionCart) {
          const parsedCart = JSON.parse(sessionCart);
          setCartData(parsedCart);
          console.log("Loaded cart from sessionStorage:", parsedCart);
          return;
        }

        // Fallback to localStorage
        const localCart = localStorage.getItem('checkoutCart_backup');
        if (localCart) {
          const parsedCart = JSON.parse(localCart);
          setCartData(parsedCart);
          console.log("Loaded cart from localStorage:", parsedCart);
          return;
        }

        // If no cart data found, redirect back to cart
        console.error("No cart data found in storage");
        router.push('/dashboard/cart');
      } catch (error) {
        console.error("Error loading cart data:", error);
        router.push('/dashboard/cart');
      }
    };

    loadCartData();
  }, [router]);

  // Use the exact subtotal from cart data
  const exactSubtotal = cartData?.subtotal || 0;

  // Calculate items count for display
  const totalItemsCount = cartData?.totalItems || cartData?.items?.reduce(
    (acc, item) => acc + (item.quantity || 0),
    0
  ) || 0;

  // SIMPLIFIED input change handler - no formatting during input
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  // Format card number only for display, not during input
  const formatCardNumber = (value) => {
    const cleaned = value.replace(/\s/g, "").replace(/\D/g, "");
    const matches = cleaned.match(/\d{1,16}/g);
    const grouped = matches ? matches.join(" ").substring(0, 19) : "";
    return grouped;
  };

  // Format expiry date only for display, not during input
  const formatExpiryDate = (value) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 3) {
      return `${cleaned.substring(0, 2)}/${cleaned.substring(2, 4)}`;
    }
    return cleaned;
  };

  // Handle card number input with proper formatting
  const handleCardNumberChange = (e) => {
    const rawValue = e.target.value.replace(/\s/g, "").replace(/\D/g, "");
    const formattedValue = formatCardNumber(rawValue);
    
    setFormData(prev => ({
      ...prev,
      cardNumber: formattedValue
    }));
    
    if (errors.cardNumber) {
      setErrors(prev => ({ ...prev, cardNumber: "" }));
    }
  };

  // Handle expiry date input with proper formatting
  const handleExpiryDateChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    const formattedValue = formatExpiryDate(rawValue);
    
    setFormData(prev => ({
      ...prev,
      expiryDate: formattedValue
    }));
    
    if (errors.expiryDate) {
      setErrors(prev => ({ ...prev, expiryDate: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    // Remove spaces for card number validation
    const rawCardNumber = formData.cardNumber.replace(/\s/g, "");
    if (!rawCardNumber) {
      newErrors.cardNumber = "Card number is required";
    } else if (!/^\d{16}$/.test(rawCardNumber)) {
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

  // Demo payment processing with progress animation
  const processDemoPayment = () => {
    setIsProcessing(true);
    setProgress(0);
    
    // Simulate payment processing with progress updates
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 20;
        if (newProgress >= 100) {
          clearInterval(interval);
          // Show success state after 5 seconds
          setTimeout(() => {
            setIsSuccess(true);
            // Redirect to success page after 2 seconds of showing success state
            setTimeout(() => {
              // Clear storage after successful payment
              sessionStorage.removeItem('checkoutCart');
              localStorage.removeItem('checkoutCart_backup');
              router.push(`/checkout/success?orderId=DEMO-${Date.now()}&amount=${exactSubtotal}`);
            }, 2000);
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 1000); // Update every second for 5 seconds total
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Use demo payment processing instead of real API call
    processDemoPayment();
    
    // Original API call (commented out for demo)
    /*
    setIsProcessing(true);

    try {
      // Remove spaces from card number before sending to server
      const rawCardNumber = formData.cardNumber.replace(/\s/g, "");
      
      const paymentResponse = await fetch("/api/payment/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems: cartData?.items || [],
          totalAmount: exactSubtotal,
          paymentMethod: {
            cardNumber: rawCardNumber,
            expiryDate: formData.expiryDate,
            cvv: formData.cvv,
            nameOnCard: formData.nameOnCard
          },
          billingAddress: {
            address: formData.address,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
            country: formData.country
          },
          email: formData.email
        }),
      });

      const paymentResult = await paymentResponse.json();

      if (paymentResponse.ok) {
        // Clear storage after successful payment
        sessionStorage.removeItem('checkoutCart');
        localStorage.removeItem('checkoutCart_backup');
        
        // Redirect to success page
        router.push(`/checkout/success?orderId=${paymentResult.orderId}&amount=${exactSubtotal}`);
      } else {
        throw new Error(paymentResult.error || "Payment failed");
      }
    } catch (error) {
      console.error("Payment error:", error);
      setErrors({ submit: error.message });
    } finally {
      setIsProcessing(false);
    }
    */
  };

  // Show loading state while cart data is being loaded
  if (!cartData) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading your cart...</p>
        </div>
      </div>
    );
  }

  // If no cart items, show error
  if (!cartData.items || cartData.items.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-red-400 mb-4">No Items Found</h2>
          <p className="text-gray-400 mb-6">Your cart appears to be empty or the data was lost.</p>
          <button 
            onClick={() => router.push('/dashboard/cart')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl"
          >
            Return to Cart
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-400 mb-4">
            Complete Your Purchase
          </h1>
          <div className="flex items-center justify-center gap-2 text-gray-400">
            <Shield className="w-5 h-5" />
            <span>Secure payment processed with SSL encryption</span>
          </div>
          <div className="mt-2 text-green-400">
            Total: <span className="font-bold">${exactSubtotal.toFixed(2)}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div className="bg-neutral-900 border border-gray-800 rounded-2xl p-6">
                <h2 className="text-xl font-semibold mb-4 text-white">
                  Contact Information
                </h2>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-neutral-800 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.email ? "border-red-500" : "border-gray-700"
                    }`}
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-neutral-900 border border-gray-800 rounded-2xl p-6">
                <h2 className="text-xl font-semibold mb-4 text-white flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Method
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-300 mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleCardNumberChange}
                      maxLength={19}
                      className={`w-full px-4 py-3 bg-neutral-800 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.cardNumber ? "border-red-500" : "border-gray-700"
                      }`}
                      placeholder="1234 5678 9012 3456"
                    />
                    {errors.cardNumber && (
                      <p className="text-red-400 text-sm mt-1">{errors.cardNumber}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="nameOnCard" className="block text-sm font-medium text-gray-300 mb-2">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      id="nameOnCard"
                      name="nameOnCard"
                      value={formData.nameOnCard}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-neutral-800 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.nameOnCard ? "border-red-500" : "border-gray-700"
                      }`}
                      placeholder="John Doe"
                    />
                    {errors.nameOnCard && (
                      <p className="text-red-400 text-sm mt-1">{errors.nameOnCard}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-300 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleExpiryDateChange}
                      maxLength={5}
                      className={`w-full px-4 py-3 bg-neutral-800 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.expiryDate ? "border-red-500" : "border-gray-700"
                      }`}
                      placeholder="MM/YY"
                    />
                    {errors.expiryDate && (
                      <p className="text-red-400 text-sm mt-1">{errors.expiryDate}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-300 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      maxLength={4}
                      className={`w-full px-4 py-3 bg-neutral-800 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.cvv ? "border-red-500" : "border-gray-700"
                      }`}
                      placeholder="123"
                    />
                    {errors.cvv && (
                      <p className="text-red-400 text-sm mt-1">{errors.cvv}</p>
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
                      className="w-4 h-4 text-blue-600 bg-neutral-800 border-gray-700 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-300 text-sm">Save card for future purchases</span>
                  </label>
                </div>
              </div>

              {/* Billing Address */}
              <div className="bg-neutral-900 border border-gray-800 rounded-2xl p-6">
                <h2 className="text-xl font-semibold mb-4 text-white">
                  Billing Address
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-300 mb-2">
                      Street Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-neutral-800 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.address ? "border-red-500" : "border-gray-700"
                      }`}
                      placeholder="123 Main St"
                    />
                    {errors.address && (
                      <p className="text-red-400 text-sm mt-1">{errors.address}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-300 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-neutral-800 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.city ? "border-red-500" : "border-gray-700"
                      }`}
                      placeholder="New York"
                    />
                    {errors.city && (
                      <p className="text-red-400 text-sm mt-1">{errors.city}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-300 mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-neutral-800 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.state ? "border-red-500" : "border-gray-700"
                      }`}
                      placeholder="NY"
                    />
                    {errors.state && (
                      <p className="text-red-400 text-sm mt-1">{errors.state}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-300 mb-2">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-neutral-800 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.zipCode ? "border-red-500" : "border-gray-700"
                      }`}
                      placeholder="10001"
                    />
                    {errors.zipCode && (
                      <p className="text-red-400 text-sm mt-1">{errors.zipCode}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-300 mb-2">
                      Country
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-neutral-800 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="AU">Australia</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Submit Button with Demo Processing */}
              <div className="bg-neutral-900 border border-gray-800 rounded-2xl p-6">
                {isProcessing && !isSuccess && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-300 mb-2">
                      <span>Processing payment...</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-400 mt-2 text-center">
                      Please wait while we process your payment. Do not refresh the page.
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`w-full font-semibold py-4 rounded-xl transition-all duration-300 transform shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 ${
                    isSuccess 
                      ? "bg-green-600 hover:bg-green-700 text-white" 
                      : isProcessing 
                      ? "bg-blue-600 text-white" 
                      : "bg-blue-600 hover:bg-blue-700 text-white hover:scale-105"
                  }`}
                >
                  {isProcessing ? (
                    isSuccess ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        Payment Successful!
                      </>
                    ) : (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing... ({progress}%)
                      </>
                    )
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      Pay ${exactSubtotal.toFixed(2)}
                    </>
                  )}
                </button>
                
                {errors.submit && (
                  <p className="text-red-400 text-center mt-4">{errors.submit}</p>
                )}

                {!isProcessing && (
                  <p className="text-gray-400 text-xs text-center mt-4">
                    By completing your purchase, you agree to our Terms of Service and Privacy Policy.
                    Your payment is secure and encrypted.
                  </p>
                )}
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-neutral-900 border border-gray-800 rounded-2xl p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4 text-white">Order Summary</h2>
              
              <div className="space-y-3 mb-4">
                {cartData.items.map((item) => (
                  <div key={item.productId} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-contain bg-white"
                      />
                      <div>
                        <p className="text-sm font-medium text-white">{item.name}</p>
                        <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="text-white font-medium">
                      ${((item.price || 0) * (item.quantity || 0)).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <hr className="border-gray-700 my-4" />

              <div className="space-y-2">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal ({totalItemsCount} items)</span>
                  <span>${exactSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Shipping</span>
                  <span className="text-green-400">Free</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Tax</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              <hr className="border-gray-700 my-4" />

              <div className="flex justify-between text-lg font-bold text-blue-400">
                <span>Total</span>
                <span>${exactSubtotal.toFixed(2)}</span>
              </div>

              {/* Demo Notice */}
              <div className="mt-6 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <p className="text-yellow-400 text-xs text-center">
                  💳 Demo Mode: This is a simulation. No real payment will be processed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}