import React from 'react'
import ProductImages from '@/components/SingleProductPage/ProductImages'
import ProductDescription from '@/components/SingleProductPage/ProductDescription'
import ReviewSection from '@/components/SingleProductPage/ReviewSection'
import ProductDetails from '@/components/SingleProductPage/ProductDetails'
import SimilarProducts from '@/components/SingleProductPage/SimilarProducts'

function SingleProduct({params}) {

    const {id} = params

    console.log(id, '---id')

  return (
    <div >
        <div className='mt-3 flex flex-col md:flex-row  gap-8 min-h-screen'>
            <ProductImages productId={id} />
            {/* Product information */}
            <ProductDescription productId={id} />
            {/* Product Review */}
        </div>

      <ProductDetails productId={id} />
      <SimilarProducts productId={id} />
      <ReviewSection productId={id} />
      
      
    </div>
  )
}

export default SingleProduct