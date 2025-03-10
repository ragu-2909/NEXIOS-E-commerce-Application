import React, { useState } from 'react';
import { Search, Calendar, Filter, FileText, AlertCircle, ChevronDown, MapPin, Check, Box, Truck } from 'lucide-react';

const OrderHistory = ({ orderHistory = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const getStatusColor = (deliveryStatusCode) => {
    switch (deliveryStatusCode) {
      case 0: return 'bg-yellow-600 text-yellow-200';
      case 1: return 'bg-blue-600 text-blue-200';
      case 2: return 'bg-purple-600 text-purple-200';
      case 3: return 'bg-orange-600 text-orange-200';
      case 4: return 'bg-green-600 text-green-200';
      default: return 'bg-gray-600 text-gray-200';
    }
  };

  const getProgressWidth = (statusCode) => {
    return `${(statusCode + 1) * 25}%`;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <nav className="bg-gray-800 border-b border-blue-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-white">Order History</h1>
            </div>
            <div className="flex items-center">
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium">
                <AlertCircle className="w-4 h-4 inline mr-2" />
                Support
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="mt-4 flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search orders"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-blue-800 rounded-md text-white focus:ring-blue-500 focus:border-blue-500"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
              </div>
            </div>
            <div className="flex gap-2">
              <button className="bg-gray-800 border border-blue-800 px-4 py-2 rounded-md text-sm font-medium text-white hover:bg-blue-900">
                <Calendar className="w-4 h-4 inline mr-2" />
                Date Range
              </button>
              <button className="bg-gray-800 border border-blue-800 px-4 py-2 rounded-md text-sm font-medium text-white hover:bg-blue-900">
                <Filter className="w-4 h-4 inline mr-2" />
                Filter
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {orderHistory.map((order) => (
            <div key={order.orderId} className="bg-gray-800 rounded-lg shadow-lg border border-blue-800">
              {order.orderItems.map((item) => (
                <div key={item.LineId} className="p-6 border-b border-blue-800 last:border-b-0">
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="w-24 h-24 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-white">{item.productName}</h3>
                        <p className="text-sm text-gray-400">Order #{order.orderId}</p>
                        <p className="text-sm text-gray-400">
                          Ordered on {formatDate(order.orderTimeStamp)}
                        </p>
                        <div className="mt-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.deliveryStatusCode)}`}>
                            {item.deliveryStatus}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-white">
                        {formatPrice(item.totalPrice)}
                      </p>
                      <p className="text-sm text-gray-400">
                        ETA: {item.eta} days
                      </p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="relative">
                      <div className="flex justify-between mb-2">
                        {['Order Placed', 'Order Accepted', 'Shipped', 'Out for Delivery', 'Delivered'].map((status, index) => (
                          <div key={status} className="flex flex-col items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${index <= item.deliveryStatusCode ? 'bg-blue-600' : 'bg-gray-700'}`}>
                              {index <= item.deliveryStatusCode ? (
                                <Check className="w-4 h-4 text-white" />
                              ) : (
                                [<Box className="w-4 h-4 text-gray-500" />, <Box className="w-4 h-4 text-gray-500" />, <Truck className="w-4 h-4 text-gray-500" />, <Truck className="w-4 h-4 text-gray-500" />, <Box className="w-4 h-4 text-gray-500" />][index]
                              )}
                            </div>
                            <p className="mt-2 text-xs text-gray-400">{status}</p>
                          </div>
                        ))}
                      </div>
                      <div className="absolute top-4 left-0 right-0 h-1 bg-gray-700">
                        <div
                          className="h-full bg-blue-600"
                          style={{ width: getProgressWidth(item.deliveryStatusCode) }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="bg-gray-900 rounded-lg p-4">
                      <div className="flex items-center space-x-4">
                        <MapPin className="w-5 h-5 text-blue-500" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white">Delivery Address</p>
                          <p className="text-sm text-gray-400">{order.deliveryAdd}</p>
                        </div>
                        <button className="text-blue-500 hover:bg-blue-600 hover:text-white border border-blue-500 px-4 py-2 rounded-md text-sm font-medium">
                          Track Order
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-between">
                    <div className="flex space-x-2">
                     
                      
                    </div>
                    <button className="text-blue-500 hover:text-blue-400">
                      <ChevronDown className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default OrderHistory;