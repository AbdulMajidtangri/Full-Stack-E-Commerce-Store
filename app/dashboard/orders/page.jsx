import React from 'react'
import { Package, Truck, CheckCircle, Clock, MapPin, Calendar, ArrowRight, Home, ShoppingBag } from 'lucide-react'
import Link from 'next/link'

const OrdersPage = () => {
  // Sample orders data - in real app, this would come from your database
  const orders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'delivered',
      items: [
        { name: 'Wireless Headphones', quantity: 1, price: 129.99, image: '/api/placeholder/80/80' },
        { name: 'Phone Case', quantity: 2, price: 19.99, image: '/api/placeholder/80/80' }
      ],
      total: 169.97,
      trackingNumber: 'TRK123456789',
      estimatedDelivery: '2024-01-18',
      shippingAddress: {
        name: 'John Doe',
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA'
      }
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      status: 'shipped',
      items: [
        { name: 'Smart Watch', quantity: 1, price: 249.99, image: '/api/placeholder/80/80' }
      ],
      total: 249.99,
      trackingNumber: 'TRK987654321',
      estimatedDelivery: '2024-01-17',
      shippingAddress: {
        name: 'John Doe',
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA'
      }
    },
    {
      id: 'ORD-003',
      date: '2024-01-05',
      status: 'processing',
      items: [
        { name: 'Laptop Sleeve', quantity: 1, price: 39.99, image: '/api/placeholder/80/80' },
        { name: 'USB-C Cable', quantity: 3, price: 14.99, image: '/api/placeholder/80/80' }
      ],
      total: 84.96,
      trackingNumber: null,
      estimatedDelivery: '2024-01-12',
      shippingAddress: {
        name: 'John Doe',
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA'
      }
    }
  ]

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-black" />
      case 'shipped':
        return <Truck className="w-5 h-5 text-black" />
      case 'processing':
        return <Clock className="w-5 h-5 text-black" />
      default:
        return <Package className="w-5 h-5 text-black" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'shipped':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'processing':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'delivered':
        return 'Delivered'
      case 'shipped':
        return 'Shipped'
      case 'processing':
        return 'Processing'
      default:
        return 'Pending'
    }
  }

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-black mb-4">
            Your Orders
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Track your orders and view order history
          </p>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
              {/* Order Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {getStatusIcon(order.status)}
                    <div>
                      <h3 className="text-lg font-semibold text-black">Order {order.id}</h3>
                      <p className="text-gray-600 text-sm flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Placed on {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                    <span className="text-lg font-bold text-black">${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6 border-b border-gray-200">
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover bg-gray-100 border border-gray-300"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-black">{item.name}</h4>
                        <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-black">${(item.price * item.quantity).toFixed(2)}</p>
                        <p className="text-gray-600 text-sm">${item.price} each</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Footer */}
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Shipping Info */}
                  <div>
                    <h4 className="font-semibold text-black mb-3 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Shipping Address
                    </h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>{order.shippingAddress.name}</p>
                      <p>{order.shippingAddress.street}</p>
                      <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                      <p>{order.shippingAddress.country}</p>
                    </div>
                  </div>

                  {/* Order Actions */}
                  <div className="space-y-4">
                    {order.trackingNumber && (
                      <div>
                        <h4 className="font-semibold text-black mb-2">Tracking Information</h4>
                        <p className="text-sm text-gray-600">Tracking #: {order.trackingNumber}</p>
                        <p className="text-sm text-gray-600">
                          Estimated Delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-3">
                      <button className="bg-black hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 text-sm">
                        View Order Details
                      </button>
                      {order.status === 'delivered' && (
                        <button className="border border-gray-300 hover:border-black text-gray-700 hover:text-black font-medium py-2 px-4 rounded-lg transition-all duration-300 text-sm">
                          Leave Review
                        </button>
                      )}
                      {order.status === 'shipped' && (
                        <button className="border border-gray-300 hover:border-black text-gray-700 hover:text-black font-medium py-2 px-4 rounded-lg transition-all duration-300 text-sm">
                          Track Package
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {orders.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-black mb-4">No Orders Yet</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              You haven't placed any orders yet. Start shopping to see your orders here!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/dashboard/product"
                className="bg-black hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto"
              >
                <ShoppingBag className="w-5 h-5" />
                Start Shopping
              </Link>
              <Link 
                href="/"
                className="border border-gray-300 hover:border-black text-gray-700 hover:text-black font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center gap-2 mx-auto"
              >
                <Home className="w-5 h-5" />
                Back to Home
              </Link>
            </div>
          </div>
        )}

        {/* Load More Button */}
        {orders.length > 0 && (
          <div className="text-center mt-8">
            <button className="border border-gray-300 hover:border-black text-gray-700 hover:text-black font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center gap-2 mx-auto">
              Load More Orders
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default OrdersPage