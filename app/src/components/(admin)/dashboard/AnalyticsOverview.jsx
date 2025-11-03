"use client"
import React from 'react'
import { TrendingUp, DollarSign, Package, Users, ShoppingCart, AlertTriangle } from 'lucide-react'

const formatCurrency = (amount) => {
  return `$${parseFloat(amount || 0).toFixed(2)}`
}

const formatNumber = (num) => {
  return parseFloat(num || 0).toFixed(2)
}

function AnalyticsOverview({ analytics }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Analytics Overview</h2>
      
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Total Revenue */}
        <div className="bg-white p-5 rounded-lg shadow-md border-2 border-secondary">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Total Revenue</p>
            <DollarSign className="text-accent" size={24} />
          </div>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(analytics.total_revenue)}</p>
          <p className="text-xs text-gray-600 mt-1">Last 7 days: {formatCurrency(analytics.revenue_in_last_days)}</p>
        </div>

        {/* Orders */}
        <div className="bg-white p-5 rounded-lg shadow-md border-2 border-secondary">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Recent Orders</p>
            <ShoppingCart className="text-accent" size={24} />
          </div>
          <p className="text-2xl font-bold text-gray-900">{analytics.orders_in_last_7_days || 0}</p>
          <p className="text-xs text-gray-600 mt-1">Last 7 days</p>
        </div>

        {/* Average Revenue */}
        <div className="bg-white p-5 rounded-lg shadow-md border-2 border-secondary">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Avg Revenue/Order</p>
            <TrendingUp className="text-accent" size={24} />
          </div>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(analytics.avg_revenue)}</p>
          <p className="text-xs text-gray-600 mt-1">Avg items: {formatNumber(analytics.avg_item_per_order)}</p>
        </div>

        {/* Active Customers */}
        <div className="bg-white p-5 rounded-lg shadow-md border-2 border-secondary">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Customers</p>
            <Users className="text-accent" size={24} />
          </div>
          <p className="text-2xl font-bold text-gray-900">{analytics.active_customers || 0}</p>
          <p className="text-xs text-gray-600 mt-1">Repeated: {analytics.repeated_customers || 0}</p>
        </div>
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {/* Inventory Status */}
        <div className="bg-white p-5 rounded-lg shadow-md border-2 border-secondary">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-bold text-gray-900">Inventory Status</p>
            <Package className="text-gray-600" size={20} />
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Products:</span>
              <span className="font-bold">{analytics.total_products_listed || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Inventory:</span>
              <span className={`font-bold ${parseInt(analytics.total_inventory || 0) < 0 ? 'text-red-600' : ''}`}>
                {analytics.total_inventory || 0}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Out of Stock:</span>
              <span className="font-bold text-red-600">{analytics.number_of_out_of_stock_products || 0}</span>
            </div>
          </div>
        </div>

        {/* Best & Least Stocked */}
        <div className="bg-white p-5 rounded-lg shadow-md border-2 border-secondary">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-bold text-gray-900">Stock Levels</p>
            <AlertTriangle className="text-yellow-600" size={20} />
          </div>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-gray-600 block mb-1">Best Stocked:</span>
              <span className="font-bold text-green-600">{analytics.most_stocked_product || 'N/A'}</span>
            </div>
            <div>
              <span className="text-gray-600 block mb-1">Least Stocked:</span>
              <span className="font-bold text-red-600">{analytics.least_stocked_product || 'N/A'}</span>
            </div>
          </div>
        </div>

        {/* Payment Status & Users */}
        <div className="bg-white p-5 rounded-lg shadow-md border-2 border-secondary">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-bold text-gray-900">Additional Metrics</p>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Pending Payments:</span>
              <span className="font-bold text-yellow-600">{analytics.pending_payments || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Failed Payments:</span>
              <span className="font-bold text-red-600">{analytics.failed_payments || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Users w/o Purchase:</span>
              <span className="font-bold">{analytics.users_have_account_but_no_purchase || 0}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Best Selling Product Highlight */}
      <div className="bg-gradient-to-r from-accent to-red-700 p-6 rounded-lg shadow-md">
        <div className="flex items-center gap-3">
          <TrendingUp className="text-white" size={32} />
          <div>
            <p className="text-white text-sm font-semibold uppercase tracking-wide">Best Selling Product</p>
            <p className="text-white text-2xl font-bold">{analytics.best_selling_product || 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsOverview