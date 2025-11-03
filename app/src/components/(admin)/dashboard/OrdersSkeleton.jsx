import React from 'react'

function OrdersSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-8 w-48 bg-base-300 rounded mb-4"></div>
      <div className="space-y-6">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="bg-primary rounded-lg p-4 md:p-6 shadow-md border-2 border-base-300">
            {/* Header Skeleton */}
            <div className="flex flex-col md:flex-row md:justify-between gap-3 mb-4 pb-4 border-b-2 border-base-300">
              <div>
                <div className="h-3 w-16 bg-base-300 rounded mb-2"></div>
                <div className="h-4 w-64 bg-base-300 rounded"></div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="h-7 w-20 bg-base-300 rounded-full"></div>
                <div className="h-3 w-32 bg-base-300 rounded"></div>
              </div>
            </div>
            
            {/* Customer Skeleton */}
            <div className="mb-4 pb-4 border-b-2 border-base-300 bg-base-300 p-3 rounded">
              <div className="h-3 w-16 bg-secondary rounded mb-2"></div>
              <div className="h-4 w-32 bg-secondary rounded mb-1"></div>
              <div className="h-3 w-48 bg-secondary rounded"></div>
            </div>
            
            {/* Items Skeleton */}
            <div className="mb-4">
              <div className="h-16 w-full bg-base-300 rounded"></div>
            </div>
            
            {/* Total Skeleton */}
            <div className="flex justify-between items-center pt-4 border-t-2 border-base-300 bg-base-300 p-4 rounded">
              <div className="h-5 w-24 bg-secondary rounded"></div>
              <div className="h-7 w-20 bg-secondary rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OrdersSkeleton