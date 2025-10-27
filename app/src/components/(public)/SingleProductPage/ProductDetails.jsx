import React from 'react'

function ProductDetails({product}) {
    return (
        <div className='bg-base-300 rounded-lg p-6 mt-12 md:mt-0'>
            <div className='mb-6'>
                <h2 className='text-xl font-bold text-accent'>Product Details</h2>
            </div>

            <div className='text-base-content/70'>
                <hr className='mb-4' />
                
                <div className='space-y-4'>
                    <div className='flex justify-between items-center'>
                        <p className='font-medium'>Weight</p>
                        <p className='text-base-content'>{product?.weight}</p>
                    </div>

                    <div className='flex justify-between items-center'>
                        <p className='font-medium'>SKU</p>
                        <p className='text-base-content font-mono text-sm'>{product?.sku}</p>
                    </div>

                    <div className='space-y-2'>
                        <p className='font-medium'>Dimensions</p>
                        <div className='bg-base-200 rounded-lg p-3 ml-4'>
                            <div className='grid grid-cols-3 gap-4 text-sm'>
                                <div className='text-center'>
                                    <p className='font-medium text-base-content/60'>Width</p>
                                    <p className='text-base-content font-semibold'>{product?.width}</p>
                                </div>
                                <div className='text-center'>
                                    <p className='font-medium text-base-content/60'>Height</p>
                                    <p className='text-base-content font-semibold'>{product?.height}</p>
                                </div>
                                <div className='text-center'>
                                    <p className='font-medium text-base-content/60'>Depth</p>
                                    <p className='text-base-content font-semibold'>{product?.depth}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className='my-4' />

                    <div className='space-y-2'>
                        <p className='font-medium'>Warranty Information</p>
                        <p className='text-base-content text-sm leading-relaxed pl-4'>
                            {product?.warranty_info}
                        </p>
                    </div>

                    <div className='space-y-2'>
                        <p className='font-medium'>Return Policy</p>
                        <p className='text-base-content text-sm leading-relaxed pl-4'>
                            {product?.return_policy}
                        </p>
                    </div>
                </div>
                
                <hr className='mt-4' />
            </div>
        </div>
    )
}

export default ProductDetails