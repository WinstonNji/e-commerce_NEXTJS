import React from 'react'
import { products } from '../../../public/product'
import ProductCard from '../Shared/ProductCard'

function SimilarProducts({productId}) {

    const foundProduct = products.find((product) => product.id === Number(productId))

    console.log(foundProduct, '----found')

    const similarProducts = products.filter(product => product.category === foundProduct.category && product.id !== foundProduct.id)

  return (
    <div className='mt-12'>
        <div>
            <p className='font-bold text-3xl text-accent '>Similar Products</p>

            <div className='flex gap-6 w-full mt-5 overflow-x-auto py-5 px-5 '>
                {similarProducts.map((product,idx) => (
                <ProductCard key={idx} product={product} singleTrue={true} />
                ))}
                
            </div>
        </div>
    </div>
  )
}

export default SimilarProducts