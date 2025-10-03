"use client"
import React from 'react'
import { Plus } from 'lucide-react'
import { Minus } from 'lucide-react'
import { products } from '../../../../public/product'
import { useState } from 'react'

function Quantity({productId}) {

const product = products.find((product) => product.id === productId)

console.log(product, '---product')


  const [price, setPrice] = useState(product.price)
  const [quantity, setQuantity] = useState(1)
  


  return (
    <div className='flex flex-col gap-4 '>
        <div className='flex items-center gap-4'>
            <p className='text-3xl font-bold'>${((product.price - (product.price * (product.discountPercentage) / 100))* quantity).toFixed(2)}</p>
            <p className='self-end text-gray-500 font-bold line-through text-xl'>${((product.price) * quantity).toFixed(2)}</p>
        </div>
        <div className='flex w-full gap-2 opacity-70'>
              <button disabled={quantity == 1}>
                <Minus color='#97322D' onClick={() => setQuantity(prev => prev - 1)} onChange={()=> setQuantity(quantity)} />
              </button>
                
                  <input  className='ring w-23 text-center text-gray-600 font-bold ring-accent' type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)}   />

                <Plus color='#97322D' onClick={() => setQuantity(prev => prev + 1)} />
        </div>
        
    </div>
  )
}

export default Quantity