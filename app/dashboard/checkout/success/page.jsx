import React from 'react'
import { CheckCircle, Package, Truck, Home, ShoppingBag, Mail, Phone } from 'lucide-react'
import Link from 'next/link'

const SuccessPage = ({ searchParams }) => {
  const sessionId = searchParams?.sessionId

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2">
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-black mb-4">
            Payment Successful!
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Thank you for your purchase. Your order has been confirmed and is being processed.
          </p>
          {sessionId && (
            <p className="text-sm text-gray-500 mt-2">
              Order ID: {sessionId}
            </p>
          )}
        </div>

        {/* Order Summary Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-black mb-6 flex items-center gap-3">
            <Package className="w-6 h-6 text-black" />
            Order Confirmation
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-3">
                <Package className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-black mb-1">Order Confirmed</h3>
              <p className="text-sm text-gray-600">Your payment was successful</p>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-3">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-black mb-1">Processing</h3>
              <p className="text-sm text-gray-600">Preparing your shipment</p>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-black mb-1">Delivery</h3>
              <p className="text-sm text-gray-600">Expected in 3-5 business days</p>
            </div>
          </div>

          {/* What's Next */}
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-black mb-4">What happens next?</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <p className="text-gray-700">You'll receive an email confirmation with your order details</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <p className="text-gray-700">We'll start processing your order immediately</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <p className="text-gray-700">Tracking information will be sent to your email once shipped</p>
              </div>
            </div>
          </div>
        </div>

        {/* Support Information */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
          <h2 className="text-xl font-semibold text-black mb-4">Need Help?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 border border-gray-200 rounded-lg hover:border-gray-400 transition-colors duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-black">Customer Support</h3>
              </div>
              <p className="text-gray-600 text-sm mb-3">Our team is here to help with any questions</p>
              <button className="text-black hover:text-gray-700 font-medium text-sm flex items-center gap-1 transition-colors duration-300">
                Contact Support
                <span className="text-lg">→</span>
              </button>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg hover:border-gray-400 transition-colors duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-black">Order Status</h3>
              </div>
              <p className="text-gray-600 text-sm mb-3">Track your order and view updates</p>
              <button className="text-black hover:text-gray-700 font-medium text-sm flex items-center gap-1 transition-colors duration-300">
                Track Order
                <span className="text-lg">→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/dashboard/product"
            className="inline-flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <ShoppingBag className="w-5 h-5" />
            Continue Shopping
          </Link>
          
          <Link 
            href="/"
            className="inline-flex items-center justify-center gap-2 border border-gray-300 hover:border-black text-gray-700 hover:text-black font-semibold py-4 px-8 rounded-xl transition-all duration-300"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
        </div>

        {/* Thank You Message */}
        <div className="text-center mt-12">
          <p className="text-gray-600">
            Thank you for shopping with us! We appreciate your business.
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-gray-50 rounded-xl p-6 mt-8 border border-gray-200">
          <h3 className="text-lg font-semibold text-black mb-4">Order Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Order Date</p>
              <p className="text-black font-medium">{new Date().toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-gray-600">Estimated Delivery</p>
              <p className="text-black font-medium">
                {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Shipping Method</p>
              <p className="text-black font-medium">Standard Shipping (Free)</p>
            </div>
            <div>
              <p className="text-gray-600">Order Status</p>
              <p className="text-black font-medium">Confirmed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuccessPage