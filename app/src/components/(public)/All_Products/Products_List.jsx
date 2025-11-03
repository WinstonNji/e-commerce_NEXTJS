import React from 'react'
import ProductCard from '../Shared/ProductCard'

async function Products_List({ params }) {
    const fetchAllProduct = async () => {
        const queryString = new URLSearchParams(params).toString()
        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/general/products${queryString ? `?${queryString}` : ''}`
        
        const res = await fetch(url, {
            cache: 'no-store'
        })
        if(!res.ok) throw new Error("An error occurred")
        const result = await res.json()
        return result.data
    }
    
    const products = await fetchAllProduct()
    
    return (
        <div className='min-h-screen'>
            {products && products.length > 0 ? (
                <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-7 gap-y-8 w-full'>
                    {products.map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))}
                </div>
            ) : (
                <div className='flex flex-col items-center justify-center py-16 px-4'>
                    <div className='text-center space-y-4'>
                        <svg 
                            className="mx-auto h-24 w-24 text-gray-400" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={1.5} 
                                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" 
                            />
                        </svg>
                        <h3 className='text-2xl font-bold text-gray-700'>No Products Found</h3>
                        <p className='text-gray-500 max-w-md'>
                            We couldn't find any products matching your filters. Try adjusting your search criteria.
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Products_List