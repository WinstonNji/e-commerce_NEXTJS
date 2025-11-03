"use client"
import React from 'react'

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatCurrency = (amount) => {
  return `$${parseFloat(amount || 0).toFixed(2)}`
}

function OrdersList({ orders }) {
  if (!orders || orders.length === 0) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4 text-accent">Recent Orders</h2>
        <div className="bg-primary p-8 rounded-lg text-center shadow">
          <p className="text-lg text-gray-600">No orders found</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-accent">Recent Orders</h2>
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.order_id} className="bg-white rounded-lg p-4 md:p-6 shadow-md border-2 border-base-300">
            {/* Order Header */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3 mb-4 pb-4 border-b-2 border-base-300">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-600 font-semibold mb-1">Order ID</p>
                <p className="font-mono text-sm md:text-base break-all font-semibold text-gray-800">
                  {order.order_id}
                </p>
              </div>
              <div className="flex flex-col md:items-end gap-2">
                <span className={`px-4 py-1.5 rounded-full text-sm font-bold w-fit shadow-sm ${
                  order.payment_status === 'paid' 
                    ? 'bg-green-600 text-white' 
                    : order.payment_status === 'pending'
                    ? 'bg-orange text-white'
                    : 'bg-red text-white'
                }`}>
                  {order.payment_status.toUpperCase()}
                </span>
                <p className="text-sm text-gray-600 font-medium">{formatDate(order.created_at)}</p>
              </div>
            </div>

            {/* Customer Info */}
            <div className="mb-4 pb-4 border-b-2 border-base-300 bg-secondary/50 p-3 rounded">
              <p className="text-xs uppercase tracking-wide text-gray-600 font-semibold mb-1">Customer</p>
              <p className="font-bold text-gray-900">{order.user?.name || 'N/A'}</p>
              <p className="text-sm text-gray-700">{order.user?.email || 'N/A'}</p>
            </div>

            {/* Order Items - Mobile Card View */}
            <div className="block md:hidden space-y-3 mb-4">
              {order.order_items?.map((item, index) => (
                <div key={index} className="bg-base-300 p-4 rounded border-2 border-secondary">
                  <p className="font-bold mb-3 text-gray-900">{item.title || 'Product'}</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-white p-2 rounded">
                      <span className="text-gray-600 block text-xs mb-1">Quantity</span>
                      <span className="font-bold text-gray-900 text-lg">{item.quantity || 0}</span>
                    </div>
                    <div className="bg-white p-2 rounded">
                      <span className="text-gray-600 block text-xs mb-1">Inventory</span>
                      <span className={`font-bold text-lg ${
                        (item.inventory || 0) < 0 ? 'text-accent' : 'text-gray-900'
                      }`}>
                        {item.inventory || 0}
                      </span>
                    </div>
                    <div className="col-span-2 bg-white p-2 rounded">
                      <span className="text-gray-600 block text-xs mb-1">Subtotal</span>
                      <span className="font-bold text-accent text-lg">
                        {formatCurrency(item.subtotal)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Items - Desktop Table View */}
            <div className="hidden md:block overflow-x-auto mb-4">
              <table className="w-full">
                <thead>
                  <tr className="bg-base-300">
                    <th className="text-left p-4 rounded-tl-lg font-bold text-gray-900">Product</th>
                    <th className="text-center p-4 font-bold text-gray-900">Quantity</th>
                    <th className="text-center p-4 font-bold text-gray-900">Inventory</th>
                    <th className="text-right p-4 rounded-tr-lg font-bold text-gray-900">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {order.order_items?.map((item, index) => (
                    <tr key={index} className="border-b-2 border-base-300 hover:bg-base-300 transition-colors">
                      <td className="p-4 font-semibold text-gray-900">{item.title || 'Product'}</td>
                      <td className="p-4 text-center font-bold text-lg text-gray-900">{item.quantity || 0}</td>
                      <td className={`p-4 text-center font-bold text-lg ${
                        (item.inventory || 0) < 0 ? 'text-accent' : 'text-gray-900'
                      }`}>
                        {item.inventory || 0}
                      </td>
                      <td className="p-4 text-right font-bold text-accent text-lg">{formatCurrency(item.subtotal)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Order Total */}
            <div className="flex justify-between items-center pt-4 border-t-2 border-base-300 bg-base-300 p-4 rounded">
              <span className="text-lg font-bold text-gray-900">Total Amount</span>
              <span className="text-2xl font-bold text-accent">
                {formatCurrency(order.total_amount)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OrdersList