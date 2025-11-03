import React from 'react'

function AnalyticsSkeleton() {
  return (
    <div className="mb-8 animate-pulse">
      <div className="h-8 w-48 bg-base-300 rounded mb-4"></div>
      
      {/* Key Metrics Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-primary rounded-lg shadow-md p-5 border-2 border-base-300">
            <div className="flex items-center justify-between mb-2">
              <div className="h-3 w-24 bg-base-300 rounded"></div>
              <div className="w-6 h-6 rounded-full bg-base-300"></div>
            </div>
            <div className="h-8 w-32 bg-base-300 rounded mb-2"></div>
            <div className="h-3 w-28 bg-base-300 rounded"></div>
          </div>
        ))}
      </div>
      
      {/* Secondary Metrics Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="bg-primary rounded-lg shadow-md p-5 border-2 border-base-300">
            <div className="h-4 w-32 bg-base-300 rounded mb-3"></div>
            <div className="space-y-2">
              <div className="h-3 w-full bg-base-300 rounded"></div>
              <div className="h-3 w-full bg-base-300 rounded"></div>
              <div className="h-3 w-full bg-base-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Best Selling Product Skeleton */}
      <div className="bg-base-300 p-6 rounded-lg shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-secondary"></div>
          <div className="flex-1">
            <div className="h-3 w-32 bg-secondary rounded mb-2"></div>
            <div className="h-6 w-48 bg-secondary rounded"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsSkeleton