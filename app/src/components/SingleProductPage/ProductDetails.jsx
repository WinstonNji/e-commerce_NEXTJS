import React from 'react'
import { products } from '../../../public/product'

function ProductDetails({productId}) {
    const product = products.find((product) => product.id == Number(productId))

    return (
        <div className='bg-base-300 rounded-lg p-6 mt-12 md:mt-0'>
            {/* Header */}
            <div className='mb-6'>
                <h2 className='text-xl font-bold text-accent'>Product Details</h2>
            </div>

            {/* Details Section */}
            <div className='text-base-content/70'>
                <hr className='mb-4' />
                
                <div className='space-y-4'>
                    {/* Weight */}
                    <div className='flex justify-between items-center'>
                        <p className='font-medium'>Weight</p>
                        <p className='text-base-content'>{product?.weight}</p>
                    </div>

                    {/* SKU */}
                    <div className='flex justify-between items-center'>
                        <p className='font-medium'>SKU</p>
                        <p className='text-base-content font-mono text-sm'>{product?.sku}</p>
                    </div>

                    {/* Dimensions */}
                    <div className='space-y-2'>
                        <p className='font-medium'>Dimensions</p>
                        <div className='bg-base-200 rounded-lg p-3 ml-4'>
                            <div className='grid grid-cols-3 gap-4 text-sm'>
                                <div className='text-center'>
                                    <p className='font-medium text-base-content/60'>Width</p>
                                    <p className='text-base-content font-semibold'>{product?.dimensions.width}</p>
                                </div>
                                <div className='text-center'>
                                    <p className='font-medium text-base-content/60'>Height</p>
                                    <p className='text-base-content font-semibold'>{product?.dimensions.height}</p>
                                </div>
                                <div className='text-center'>
                                    <p className='font-medium text-base-content/60'>Depth</p>
                                    <p className='text-base-content font-semibold'>{product?.dimensions.depth}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className='my-4' />

                    {/* Warranty Information */}
                    <div className='space-y-2'>
                        <p className='font-medium'>Warranty Information</p>
                        <p className='text-base-content text-sm leading-relaxed pl-4'>
                            {product?.warrantyInformation}
                        </p>
                    </div>

                    {/* Return Policy */}
                    <div className='space-y-2'>
                        <p className='font-medium'>Return Policy</p>
                        <p className='text-base-content text-sm leading-relaxed pl-4'>
                            {product?.returnPolicy}
                        </p>
                    </div>
                </div>
                
                <hr className='mt-4' />
            </div>
        </div>
    )
}

export default ProductDetails