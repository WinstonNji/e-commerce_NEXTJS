'use client'
import React, { useEffect } from 'react'
import { ShoppingCart, Wallet, Heart, Minus, Plus } from 'lucide-react'
import { useState } from 'react'
import { useContext } from 'react'
import { CartContext } from '@/context/cartContext'

function ProductDescription({product, productId}) {
    const [quantity, setQuantity] = useState(1)
    const {addToCart, cartItems, updateCartItem} = useContext(CartContext)
    const [productFoundInCart, setproductFoundInCart] = useState(cartItems.find(p => p.id === productId)) 

    useEffect(() => {
        const productInCart = cartItems.find(p => p.id === productId)
        setproductFoundInCart(productInCart)
    }, [cartItems])

    // Calculate the display quantity and price
    const displayQuantity = productFoundInCart ? productFoundInCart.quantity : quantity
    const basePrice = product.price
    const discountedPrice = product.discount_percentage > 0 
        ? basePrice - (basePrice * product.discount_percentage / 100)
        : basePrice

    function returnStars(rating, id = "rating") {
        const maxStars = 5;
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating - fullStars >= 0.5;

        return (
            <span className="flex gap-1 scale-75">
                {Array.from({ length: maxStars }, (_, i) => {
                    if (i < fullStars) {
                        return (
                            <span
                                key={i}
                                className="mask mask-star-2 w-5 h-5"
                                style={{ backgroundColor: "#97322D" }}
                            />
                        );
                    } else if (i === fullStars && hasHalfStar) {
                        return (
                            <span
                                key={i}
                                className="mask mask-star-2 w-5 h-5"
                                style={{
                                    background: `linear-gradient(to right, #97322D 50%, #d1d5db 50%)`,
                                }}
                            />
                        );
                    } else {
                        return (
                            <span
                                key={i}
                                className="mask mask-star-2 w-5 h-5"
                                style={{ backgroundColor: "#d1d5db" }}
                            />
                        );
                    }
                })}
            </span>
        );
    }

    return (
        <div className='w-full flex flex-col gap-8'>
            <div className='flex flex-col gap-5'>
                <h1 className='font-bold text-3xl lg:text-4xl leading-tight'>{product.title}</h1>
                <div className='flex flex-wrap items-center gap-3 ring ring-secondary rounded-lg p-1 w-fit text-black'>
                    {returnStars(product.rating)}
                    <span className='text-sm font-medium text-gray-600'>
                        {product.rating.toString().slice(0,3)} out of 5
                    </span>
                    <span className='text-xs text-black'>• {product?.reviews?.length || 0} reviews</span>
                </div>
                <div className='text-gray-500'>
                    <p>{product.description}</p>
                </div>

                {/* Quantity and Price */}
                <div className='flex flex-col gap-4 '>
                    <div className='flex items-center gap-4'>
                        {product.discount_percentage > 0 ? (
                            <>
                                <p className='text-3xl font-bold'>${(discountedPrice * displayQuantity).toFixed(2)}</p>
                                <p className='self-end text-gray-500 font-bold line-through text-xl'>${(basePrice * displayQuantity).toFixed(2)}</p>
                            </>
                        ) : (
                          <p className='text-3xl font-bold'>${(basePrice * displayQuantity).toFixed(2)}</p>
                        )}
                    </div>
                    <div className='flex w-full gap-2 opacity-70'>
                        {productFoundInCart ? (
                            <>
                                <button 
                                    disabled = {productFoundInCart.quantity == 1}
                                    onClick={()=> {
                                        const newQty = productFoundInCart.quantity - 1
                                        if (newQty >= 1) {
                                            setproductFoundInCart(prev => ({...prev, quantity: newQty}))
                                            updateCartItem(productId, newQty)
                                        }
                                    }} 
                                >
                                    <Minus color='#97322D' />
                                </button>

                                <input  
                                    className='ring w-23 text-center text-gray-600 font-bold ring-accent' 
                                    type="text" 
                                    value={productFoundInCart.quantity || 1} 
                                    onChange={(e) => {
                                        let newQty = e.target.value
                                        if(isNaN(newQty) || newQty <= 0) return
                                        newQty = Number(newQty)
                                        if (newQty >= 1) {
                                            setproductFoundInCart(prev => ({ ...prev, quantity: newQty }))
                                            updateCartItem(productId, newQty)
                                        }
                                    }} 
                                    min='1'
                                    />
                                <button 
                                    onClick={()=> {
                                        const newQty = productFoundInCart.quantity + 1
                                        setproductFoundInCart(prev => ({...prev, quantity: newQty}))
                                        updateCartItem(productId, newQty)
                                    }} 
                                >
                                    <Plus color='#97322D' />
                                </button>
                                
                            </>
                        ) : (
                            <>
                                <button disabled={quantity == 1}>
                                    <Minus color='#97322D' onClick={() => setQuantity(prev => prev - 1)} />
                                </button>
                                <input  
                                    className='ring w-23 text-center text-gray-600 font-bold ring-accent' 
                                    type="text" 
                                    value={quantity} 
                                    onChange={(e) => {
                                        const val = Number(e.target.value)
                                        if (!isNaN(val) && val >= 1) {
                                            setQuantity(val)
                                        }
                                    }} 
                                    min='1'
                                    />

                                <Plus color='#97322D' onClick={() => setQuantity(prev => prev + 1)} />
                            </>
                        )}
                            
                    </div>
        
                </div>
            </div>
            
            <div className='text-gray-500 py-6'>
                <hr className='mb-4' />
                <div className='space-y-3'>
                    <div className='flex justify-between'>
                        <p className='font-medium'>Brand</p>
                        <p>{product.brand}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='font-medium'>Category</p>
                        <p>{product.category}</p>
                    </div>
                </div>
                <hr className='mt-4' />
            </div>
            
            {/* Button */}
            <div className='flex flex-col gap-3 w-full -mt-8 xl:flex-row'>
                
                <button
                disabled = {productFoundInCart} 
                className={`flex-1 btn btn-accent text-white font-bold hover:bg-accent-hover hover:-translate-y-1 transition-all duration-300 ease-in-out py-2 ${productFoundInCart ? 'text-black' : ''}` }
                onClick={() => addToCart(product.id, quantity)}>
                    <ShoppingCart />
                    {productFoundInCart ? 'Already In Cart' : 'Add to Cart'}
                </button>
                <button className='flex-1 btn btn-accent text-white font-bold hover:btn-accent-hover hover:-translate-y-1 transition-all duration-300 ease-in-out py-2'>
                    <Wallet /> Buy Now
                </button>
                <button className='flex-1 btn bg-secondary text-white font-bold hover:btn-accent-hover hover:-translate-y-1 transition-all duration-300 ease-in-out py-2'>
                    <Heart /> Add to wishlist
                </button>
            </div>
        </div>
    )
}

export default ProductDescription