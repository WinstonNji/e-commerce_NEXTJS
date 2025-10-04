"use client"
import React, { useState } from 'react'
import { products } from '../../../../public/product'
import ProductCard from '@/components/(public)/Shared/ProductCard'


function page() {

  const [displayProducts, setDisplayProducts] = useState(products)
  const [allProducts] = useState(products)

  const handleSearch = (e) => { 
    const query = e.target.value
    console.log(query.length)
    
    if(query.length > 0){
      const filterArr = displayProducts.filter((product) => product.title.toLowerCase().includes(query.toLowerCase()))

      setDisplayProducts(filterArr)
    }else{
      setDisplayProducts(allProducts)
    }

  }

  return (
    <div className='py-8 mb-28 min-h-screen'>
        <div>
            <div>
                <p className='font-bold text-4xl text-accent ' >Select Product to Edit</p>

                <p className='text-ms text-gray-500 mb-6' >Click on a product to edit its details.</p>
            </div>

            <div className='w-full  flex items-center justify-center my-12'>
                <label className="input">
                  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.3-4.3"></path>
                    </g>
                  </svg>
                  <input type="search" className="  input-lg" placeholder="Search" onChange={handleSearch} />
                </label>
                
            </div>
            
        </div>

        
        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4  gap-y-8'>
            {displayProducts.map((product,index) => (
                <ProductCard key={index} product={product} admin={true}/>
            ))}
        </div>
    </div>
  )
}

export default page