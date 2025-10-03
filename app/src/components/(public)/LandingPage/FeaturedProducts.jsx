"use client"
import React from 'react'
import ProductCard from '../Shared/ProductCard'
import { products } from '../../../../public/product' 
import Link from 'next/link'


function FeaturedProducts() {
    let isLoading = false
    

  return (
    <div className='mt-8 md:mt-12'>
        <h2 className='text-accent text-3xl font-bold '>Popular Products</h2>
        <p className="text-gray-500 mb-8">Discover our most sought after products</p>
        
        <div className={`mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6  ${isLoading ? 'gap-y-12' : ''}`}>
            {
                isLoading ? (
                    [...Array(4)].map((_,index) => (
                    <div key={index} className="flex w-full flex-col gap-4 ">
                      <div className="skeleton h-70 w-full"></div>
                      <div className="skeleton h-4 w-28"></div>
                      <div className="skeleton h-4 w-full"></div>
                      <div className="skeleton h-4 w-full"></div>
                    </div>
                    ))
                ) : (
                    products.slice(0,6).map((product, index) => (
                            <ProductCard key={index} product={product} />
                        ))
                )
            }


            
        </div>

        <div className='w-full flex items-center justify-center mt-12'>
            <Link href={'/all-products'} className='btn px-8 transition-all duration-150 ease-in-out font-semibold text-white  btn-accent hover:bg-accent-hover hover:px-12 transition-all duration-150 ease-in-out'>See More</Link>
        </div>
    </div>
  )
}

export default FeaturedProducts
