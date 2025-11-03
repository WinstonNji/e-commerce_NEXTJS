import React, { Suspense } from 'react'
import { cookies } from 'next/headers'
import AnalyticsOverview from '@/components/(admin)/dashboard/AnalyticsOverview'
import OrdersList from '@/components/(admin)/dashboard/OrdersList'
import AnalyticsSkeleton from '@/components/(admin)/dashboard/AnalyticsSkeleton'
import OrdersSkeleton from '@/components/(admin)/dashboard/OrdersSkeleton'

async function fetchOrderSummary() {
  const cookieStore = await cookies()
  const cookieHeader = cookieStore.toString()

  const baseUrl = process.env.VERCEL_url ?  `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'  

  const res = await fetch(`${baseUrl}/api/v1/admin/dashboard/orders_summary`, {
    headers: {
      'Cookie': cookieHeader,
    },
    cache: 'no-store'
  })

  if (!res.ok) {
    throw new Error('Failed to fetch orders')
  }

  const result = await res.json()
  return result.success ? result.data : []
}

async function fetchAnalytics() {
  const cookieStore = await cookies()
  const cookieHeader = cookieStore.toString()

  const baseUrl = process.env.VERCEL_url ?  `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'

  const res = await fetch(`${baseUrl}/api/v1/admin/dashboard/analytics`, {
    headers: {
      'Cookie': cookieHeader,
    },
    cache: 'no-store'
  })

  if (!res.ok) {
    throw new Error('Failed to fetch analytics')
  }

  const result = await res.json()
  return result.success ? result.data?.[0] : null
}

export default async function Page() {
  const [orders, analytics] = await Promise.all([
    fetchOrderSummary(),
    fetchAnalytics()
  ])

  return (
    <div className="min-h-screen py-6 pb-32 md:pb-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Analytics Overview */}
      <Suspense fallback={<AnalyticsSkeleton />}>
        {analytics && <AnalyticsOverview analytics={analytics} />}
      </Suspense>

      {/* Orders Section */}
      <Suspense fallback={<OrdersSkeleton />}>
        <OrdersList orders={orders} />
      </Suspense>
    </div>
  )
}