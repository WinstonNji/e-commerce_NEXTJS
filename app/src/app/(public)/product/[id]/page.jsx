export const dynamic = "force-dynamic";

import React from 'react'
import ProductImages from '@/components/(public)/SingleProductPage/ProductImages'
import ProductDescription from '@/components/(public)/SingleProductPage/ProductDescription'
import ReviewSection from '@/components/(public)/SingleProductPage/ReviewSection'
import ProductDetails from '@/components/(public)/SingleProductPage/ProductDetails'
import SimilarProducts from '@/components/(public)/SingleProductPage/SimilarProducts'
import ProductCard from '@/components/(public)/Shared/ProductCard'


async function SingleProduct({params}) {
    const {id} =  params

    const fetchSingleProduct = async (productId) => {
      try {
        const baseUrl =
        process.env.NODE_ENV === "production"
          ? "https://e-commerce-nextjs-sage.vercel.app"
          : "http://localhost:3000";
        const res = await fetch(`${baseUrl}/api/v1/general/products/${productId}`, {cache : 'no-store'})

        if(!res.ok){
          throw Error("Couldn't fetch product")
        }
        const result = await res.json()
        console.log(result.data, '****single Product')
        return result.data
      } catch (error) {
        console.error(error)
      } 
    }

    const fetchAllProducts = async () => {
      const baseUrl =
      process.env.NODE_ENV === "production"
        ? "https://e-commerce-nextjs-sage.vercel.app"
        : "http://localhost:3000";
      const res = await fetch(`${baseUrl}/api/v1/general/products`, {cache: 'force-cache'})
      if(!res.ok){
        throw Error("Couldn't fetch similar products")
      }
      const result = await res.json()
      const allProducts = result.data
      return allProducts
    }

    const [product, allProducts] = await Promise.all([fetchSingleProduct(id), fetchAllProducts()])

    const similarProducts = allProducts.filter((p,idx) => p.category ===  product.category  && p.id !== id)

    const featuredProducts = allProducts.filter(
      (p) => p.is_featured && p.id !== id
    )


    console.log(featuredProducts, 'featuredProducts')

    return (
        <div>
            <div className='mt-3 flex flex-col lg:flex-row gap-8 min-h-screen md:min-h-fit max-w-7xl mx-auto'>
              <ProductImages product={product} />
              <ProductDescription product={product} productId = {id} />
            </div>

            <div className='mt-8'>
              <ProductDetails product={product} />
            </div>
            
            {similarProducts.length > 0 ? (
              <SimilarProducts products={similarProducts} />
            ):(
              <>
                <p className='font-bold text-3xl text-accent mt-12'>Popular Products</p>

                <div className='flex gap-6 w-full mt-5 overflow-x-auto py-5 px-5'>
                    {featuredProducts.map((product, idx) => (
                        <ProductCard key={idx} product={product} singleTrue={true} />
                    ))}
                </div>
              </>
              
            )}
            
            {/* <ReviewSection product={product} /> */}
        </div>
    )
}

export default SingleProduct