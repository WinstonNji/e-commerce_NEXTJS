import React from 'react'
import ProductCard from '../Shared/ProductCard'
import { products } from '../../../public/product'

function Products() {
  return (
    <div className='mt-12'>
        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4  gap-y-8'>
            {products.map((product,index) => (
                <ProductCard key={index} product={product} />
            ))}
        </div>
        
    </div>
  )
}

export default Products