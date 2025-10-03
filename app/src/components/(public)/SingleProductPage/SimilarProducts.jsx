import React from 'react'
import ProductCard from '../Shared/ProductCard'

function SimilarProducts({products}) {
    return (
        <div className='mt-12'>
            <div>
                <p className='font-bold text-3xl text-accent'>Similar Products</p>

                <div className='flex gap-6 w-full mt-5 overflow-x-auto py-5 px-5'>
                    {products.map((product, idx) => (
                        <ProductCard key={idx} product={product} singleTrue={true} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SimilarProducts