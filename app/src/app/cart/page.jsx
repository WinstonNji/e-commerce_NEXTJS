"use client"
import React, { useEffect } from 'react'
import { products } from '../../../public/product'
import Image from 'next/image'
import { Key, Minus } from 'lucide-react'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

function page() {
  const [quantity, setQuantity] = useState(()=>     Object.fromEntries(products.map(p => [p.id, 1]))
  )

  const [priceBefore, setPriceBefore] = useState(0)

  const [tax, setTax] = useState(2)

  const [total, setTotal] = useState(0)

  const handleIncrease = (id) => {
    setQuantity (prev => ({...prev, [id]: (prev[id] + 1) || 1}))
  }

  const handleDecrease = (id) => {
    setQuantity (prev => ({...prev, [id]: (prev[id] - 1) || 1}))
  }

  const handleManualChange = (value, id) => {

    if (value === "") {
      setQuantity(prev => ({ ...prev, [id]: value }));
      return;
    }

    const parsed = parseInt(value,10)
    if(isNaN(parsed)){
      return
    }
    setQuantity(prev => ({...prev, [id]: (prev[id] = parsed)}))
  }

  const [totalItems, setTotalItems] = useState(0)

  useEffect(() => {
    const totalItems = Object.values(quantity).reduce((sum,q) => sum + Number(q), 0);

    setTotalItems(totalItems)

    const totalBefore = products.slice(5,12).reduce((sum,product)=> {
      const discountedPrice = (product.price - (product.price * product.discountPercentage)/100);
      return sum + discountedPrice * quantity[product.id]
    }, 0)

    setPriceBefore(totalBefore)

    const vat = (totalBefore * (tax / 100))

    setTax(vat)

    console.log(priceBefore)

    setTotal((totalBefore + tax))
    
  } , [quantity])



  return (
    <div className='min-h-screen mt-8 lg:flex gap-8'>
      <div className='flex-2'>
          <div className='flex justify-between w-full text-xl pb-2'>
              <p>Your Cart</p>
              <p className='text-accent font-bold'>{totalItems} Items</p>
          </div>
          <hr />
          
          <div className='mt-5'>
            <table className='table'>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {products.slice(5,12).map((product, idx) => {

                  const discountedPrice = ((product.price - (product.price * (product.discountPercentage) / 100))).toFixed(2)


                return (
                    <tr key={idx} className='hover:bg-base-300 transition-all duration-300 ease-in-out'>
                    <td>
                      <Link className='relative flex flex-col items-center gap-2 xl:flex-row' href={`/product/${product.id}`}>
                        <Image 
                          src={product.thumbnail}
                          width={130}
                          height={100}
                          alt={product.title}
                          className='object-contain bg-secondary rounded-sm md:rounded-sm'
                        />
                        <p className='font-bold text-gray-500 text-xs sm:text-sm xl:text-lg text-center hidden sm:block '>{product.title}</p>
                      </Link>
                    </td>
                    <td className='font-bold text-lg text-gray-500'>
                      ${discountedPrice ? discountedPrice : product.price}
                    </td>

                    <td>
                      <div className='flex  gap-2 opacity-70'>
                            <button>
                              <Minus color='#97322D' onClick={() => handleDecrease(product.id)} />
                            </button>
                    
                              <input className='ring w-10 text-center text-gray-600 font-bold ring-accent' type="text" value={quantity[product.id]} onChange={(e) => handleManualChange(e.target.value, product.id)}   />

                              <Plus color='#97322D' onClick={() => handleIncrease(product.id)} />
                      </div>
                    </td>

                    <td className='font-semibold text-lg'>
                      ${((discountedPrice ? discountedPrice : product.price) * (quantity[product.id])).toFixed(2)}
                    </td>
                  </tr>
                )
              })}
                
              </tbody>
            </table>
          </div>
      </div>
        

        <div className='mt-8 bg-white p-5 rounded-sm flex-1 h-fit lg:sticky top-4 ring ring-secondary bottom-10'>
          <div>
              <div>
                <h3 className='text-2xl font-bold'>Order Summary</h3>
                
              </div>

            <div className='mt-4 mb-5'>
              <hr className='mb-6' />
              <p className='mb-3 font-bold'>PROMO CODE</p>
              <input type="text" className='input' placeholder='Enter promo code' /><br />
              <button className='btn btn-accent mt-4 text-white font-bold'>Apply</button>
            </div>
            <hr />
          </div>
          
            <div className='flex flex-col gap-4 py-4'>
              <div className='flex justify-between font-bold'>
                <p>Price</p>
                <span>${priceBefore.toFixed(2)}</span>
              </div>
              <div className='flex justify-between font-bold'>
                <p>Cart Items</p>
                <span>{totalItems} items</span>
              </div>
              <div className='flex justify-between font-bold'>
                <p>Tax (2%)</p>
                <span>${tax.toFixed(2)}</span>
              </div>
              <hr />
              <div className='flex justify-between font-bold text-2xl'>
                <p>Total</p>
                <span>${(priceBefore + tax).toFixed(2)}</span>
              </div>
            </div>
          
            <div className='mt-8 w-full p-4'>
              <button className='btn btn-accent text-white w-full hover:scale-105 transition-all duration-300 ease-in-out'>
                Place Order
              </button>
            </div>
        </div>
          
        
    </div>
  )
}

export default page