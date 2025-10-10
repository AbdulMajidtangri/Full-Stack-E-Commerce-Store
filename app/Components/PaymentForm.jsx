// app/dashboard/checkout/payment/PaymentForm.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, Lock, Shield } from "lucide-react";

export default function PaymentForm({ cart, subtotal }) {
  const [isProcessing, setIsProcessing] = useState(false);
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

  // Use the exact subtotal from cart - no recalculation
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    try {
      const paymentResponse = await fetch("/api/payment/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems: cart?.items || [],
          totalAmount: exactSubtotal, // Use exact subtotal
          paymentMethod: {
            cardNumber: formData.cardNumber,
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
        // Clear session storage after successful payment
        sessionStorage.removeItem('checkoutCart');
        
        // Redirect to success page
        router.push(`/`);
      } else {
        throw new Error(paymentResult.error || "Payment failed");
      }
    } catch (error) {
      console.error("Payment error:", error);
      setErrors({ submit: error.message });
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCardNumber = (value) => {
    return value.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim();
  };

  const formatExpiryDate = (value) => {
    return value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2");
  };

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
                  onChange={(e) => {
  const formatted = formatCardNumber(e.target.value);
  setFormData(prev => ({ ...prev, cardNumber: formatted }));
  
  if (errors.cardNumber) {
    setErrors(prev => ({ ...prev, cardNumber: "" }));
  }
}}
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
                    onChange={(e) => {
  const formatted = formatCardNumber(e.target.value);
  setFormData(prev => ({ ...prev, cardNumber: formatted }));
  
  if (errors.cardNumber) {
    setErrors(prev => ({ ...prev, cardNumber: "" }));
  }
}}
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

              {/* Submit Button */}
              <div className="bg-neutral-900 border border-gray-800 rounded-2xl p-6">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </>
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

                <p className="text-gray-400 text-xs text-center mt-4">
                  By completing your purchase, you agree to our Terms of Service and Privacy Policy.
                  Your payment is secure and encrypted.
                </p>
              </div>
            </form>
          </div>

          {/* Order Summary - Shows EXACT same prices as cart */}
          <div className="lg:col-span-1">
            <div className="bg-neutral-900 border border-gray-800 rounded-2xl p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4 text-white">Order Summary</h2>
              
              <div className="space-y-3 mb-4">
                {cart?.items?.map((item) => (
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
                  <span>Subtotal</span>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}