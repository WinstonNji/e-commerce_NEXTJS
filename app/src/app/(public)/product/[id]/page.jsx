import React from 'react'
import ProductImages from '@/components/(public)/SingleProductPage/ProductImages'
import ProductDescription from '@/components/(public)/SingleProductPage/ProductDescription'
import ReviewSection from '@/components/(public)/SingleProductPage/ReviewSection'
import ProductDetails from '@/components/(public)/SingleProductPage/ProductDetails'
import SimilarProducts from '@/components/(public)/SingleProductPage/SimilarProducts'
import { products } from '../../../../../public/product'

function SingleProduct({params}) {
    const {id} = params

    // Fetch data once here
    const product = products.find(p => p.id === Number(id))
    const similarProducts = products.filter(p => 
        p.category === product.category && p.id !== product.id
    )

    return (
        <div>
            <div className='mt-3 flex flex-col md:flex-row gap-8 min-h-screen'>
                <ProductImages product={product} />
                <ProductDescription product={product} />
            </div>

            <ProductDetails product={product} />
            <SimilarProducts products={similarProducts} />
            <ReviewSection product={product} />
        </div>
    )
}

export default SingleProduct