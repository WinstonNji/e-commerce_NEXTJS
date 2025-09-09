"use client"
import React from 'react'
import { useEffect, useState } from 'react'
import { products } from '../../../public/product'

function ProductImages({productId}) {

    const [displayIndex, setDisplayIndex] = useState(0)
    const [isLoading, setIsLoading] = useState(true)


    const product = products.find(product => {
        return  product.id === Number(productId)
    })

    useEffect(() => {
        setIsLoading(false)
    }, [product, productId])

    return (
        <div>
            {/* Image */}
            <div className='flex flex-col w-full items-center'>
                {/* Thumbnall */}
                {isLoading && (
                    <div className={`skeleton opacity-100 w-sm md:w-lg h-96`}></div>
                )}

                {!isLoading && (
                    <div className={`card bg-base-300 ring ring-accent shadow-sm w-sm md:w-lg`}>
                        <figure>
                            {product.images.length == 1 ? (
                                <img
                                src={product.thumbnail}
                                alt={product.title}
                                className="w-full"
                                />
                            ) : (
                                <img
                                src={product.images[displayIndex]}
                                alt={product.title} 
                                
                                />
                            )
                                    
                            }
                                        
                        </figure>
                    </div>
                )}

                            
                {/* Other Images */}
                {
                    product.images.length > 1 && (
                        <div className='mt-4 flex gap-4 items-center  justify-center cursor-pointer w-xs md:w-sm'>
                            {product.images.map((image,index) => (  
                                isLoading ? (
                                    <div key={index} className="skeleton h-32 md:w-32 w-28"></div>
                                ) :  (
                                    <div onClick={()=> setDisplayIndex(index)} key={index} className={`card  shadow-sm transition-all duration-700  w-full ${displayIndex === index ? 'bg-base-300 ring ring-accent' : 'bg-secondary' }`}>
                                    <figure>
                                        <img
                                        src={image}
                                        alt={`${product.title} image`} />
                                    </figure>
                                    </div>
                                )
                                            
                            ))}
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default ProductImages