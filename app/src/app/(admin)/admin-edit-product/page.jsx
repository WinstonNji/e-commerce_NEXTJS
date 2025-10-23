"use client"
import React, { useEffect, useState } from 'react'
import ProductCard from '@/components/(public)/Shared/ProductCard'
import { toast } from 'react-toastify'


 function page() {

  const [loading, setLoading] = useState(true)
  const [allProducts, setAllProducts] = useState([])
  const [displayProducts, setDisplayProducts] = useState(allProducts)
 

  const fetchProducts = async () => {
    try {
      const res = await fetch('api/v1/admin/products', {cache : 'no-cache'})
      if(!res.ok){
        throw Error("Couldn't fetch products")
      }
      const result = await res.json()
      setAllProducts(result.data)      
    } catch (error) {
      toast.error('An error occured')
    }
    finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    setDisplayProducts(allProducts)
  }, [allProducts])
  


  const handleSearch = (e) => { 
    const query = e.target.value.trim()
    
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

        
        <div >
          {loading ? (
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-8'>
              {[...Array(8)].map((_,idx) => (
                  <div key={idx} className="skeleton h-72  "></div>
              ))}
            </div>
          ) : (
            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4  gap-y-8'>
              {displayProducts.map((product,index) => (
                  <ProductCard key={index} product={product} admin={true}/>
              ))}
            </div>
          )}
        </div>
    </div>
  )
}

export default page