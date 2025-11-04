"use client"
import React, { useEffect, useState, useContext } from 'react'
import Image from 'next/image'
import { Minus, Plus, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { UserContext } from '@/context/userContext'
import { CartContext } from '@/context/cartContext'
import { toast } from 'react-toastify'
import { generateToast } from '@/lib/utils/toastGenerator'
import { useRouter } from 'next/navigation'
import { getBaseUrl } from '@/lib/utils/getBaseUrl'


function page() {
  const {userId} = useContext(UserContext)
  const {
    cartItems,
    loading,
    deleteCartItem,
    updateCartItem,
    updateQuantityLocal
  } = useContext(CartContext)

  const [numberOfItems, setNumberOfItems] = useState(null)
  const [sumOfItems, setSumOfItems] = useState(0)
  const [priceBefore, setPriceBefore] = useState(0)
  const [tax, setTax] = useState(5)
  const [total, setTotal] = useState(0)
  const[ placeOrderActive, setPlaceOrderActive] = useState(false)

  // Calculate totals whenever cartItems change
  useEffect(() => {
    // Get quantities
    let quantity = 0
    cartItems.forEach((product) => {
      quantity += product.quantity
    })
    setNumberOfItems(quantity)

    // Get sumOfItems
    let sum = 0
    cartItems.forEach(product => {
      const subtotal = subTotalPerItem(product, product.quantity)
      sum += subtotal
    })
    setSumOfItems(sum)
    console.log(sum, 'sum of subtotal')
  }, [cartItems])

  const getItemPrice = (product) => {
    const discount = product.discount_percentage/100 || 0
    console.log(discount, '**discount')
    let price = product.price

    if(discount > 0){
      price = (product.price - (product.price * discount)).toFixed(2)
      console.log(price, '***discount price')
      return price
    }

    console.log(price)
    return price
  }

  const subTotalPerItem = (product, quantity) => {
    const subTotal = getItemPrice(product) * quantity
    return subTotal
  }

  useEffect(() => {
    let total = (sumOfItems + (sumOfItems * tax/100)).toFixed(2) || 0
    setTotal(total)

    let priceBeforeTax = (sumOfItems * tax/100).toFixed(2)
    setPriceBefore(priceBeforeTax)
  }, [sumOfItems])

  const handleDelete = async (cartItemId) => {
    // Store original item in case we need to revert
    const deletedItem = cartItems.find(p => p.cart_item_id === cartItemId)
    
    // Update UI immediately - remove from display
    updateQuantityLocal(deletedItem.id, 0) // This will filter it out visually
    // Or better yet, we need a proper remove function, so let's do it manually:
    const filteredCart = cartItems.filter(p => p.cart_item_id !== cartItemId)
    
    // Temporarily update the UI by setting filtered items
    // (This assumes we pass the filtered array back somehow - we'll handle in context)
    
    // Now make the API call
    const success = await deleteCartItem(cartItemId)
    
    // If delete failed, item will be restored by context or we handle it
    if (!success) {
      // The context should handle restoring, but if needed we can add restore logic
    }
  }

  // Decrease quantity
  const handleDecrease = async (id) => {
    const product = cartItems.find(p => p.id === id)
    if (!product || product.quantity <= 1) return

    const newQuantity = product.quantity - 1
    
    // Instant Ui update
    updateQuantityLocal(id, newQuantity)

    // Send to backend
    const success = await updateCartItem(id, newQuantity)
    
    // If failed, revert the change
    if (!success) {
      updateQuantityLocal(id, product.quantity)
    }
  }

  // Increase quantity
  const handleIncrease = async (id) => {
    const product = cartItems.find(p => p.id === id)
    if (!product) return

    const newQuantity = product.quantity + 1
    
    // Update UI immediately (optimistic update)
    updateQuantityLocal(id, newQuantity)

    // Send to backend
    const success = await updateCartItem(id, newQuantity)
    
    // If failed, revert the change
    if (!success) {
      updateQuantityLocal(id, product.quantity)
    }
  }

  // Manual input change
  const handleManualChange = async (e, productId) => {
    const value = parseInt(e.target.value, 10)
    if (isNaN(value) || value < 1) return

    const product = cartItems.find(p => p.id === productId)
    if (!product) return

    // Update UI immediately (optimistic update)
    updateQuantityLocal(productId, value)

    // Send to backend
    const success = await updateCartItem(productId, value)
    
    // If failed, revert the change
    if (!success) {
      updateQuantityLocal(productId, product.quantity)
    }
  }

  // Handle order item
  const handlePlaceOrder = async () => {
    setPlaceOrderActive(true)
    const loadingToastId = toast.loading('Initiating Payment, Please Wait', {autoClose: false})
    try {
      const data = {}, items = {}
      cartItems.forEach((item,idx) => {
        items[item.id] = item.quantity
      })
      data.item = items
      console.log(data, 'data to be sent to backend')

      const baseUrl = getBaseUrl()

      const response = await fetch(`${baseUrl}/api/v1/payment`, {
        method: 'POST',
        body : JSON.stringify(data),
        credentials : 'include'
      })

      if(!response.ok){
        throw new Error("An error occured")
      }

      const result = await response.json()

      if(!result.success){
        generateToast(loadingToastId, result.message, 'error')
      }

      generateToast(loadingToastId, result.message, 'success')

      window.open(result.flutterResponse.data.link, '_blank', 'noopener,noreferrer')

    } catch (error) {
      generateToast(loadingToastId, error, 'error')
    }finally{
      setPlaceOrderActive(false)
    }
    
  }

  return (
    <div className='min-h-screen mt-8 lg:flex gap-8'>
      {cartItems.length <= 0 && !loading 
        ? 
          (
          <div className='h-screen w-full flex items-center justify-center'>
            <div className='flex flex-col items-center justify-center'>
              <p className='text-2xl font-bold mb-4'>
                {userId 
                    ? "No products in your cart yet." 
                    : "You're not logged in."
                }
              </p>

              {userId && !loading ? (
                <Link href='/all-products'>
                  <button className='btn text-black btn-link'>View All Products</button>
                </Link>
              ) : (
                <Link href='/login'>
                  <button className='btn text-black btn-link'>Login to View Cart</button>
                </Link>
              )}
            </div>
          </div>

          ) 
            : 
          (
            <>
              {loading ? 
                (
                  <div className=' h-screen w-full flex items-center justify-center'>
                    <div className='flex flex-col items-center justify-center text-center'>
                      <span className="loading loading-dots loading-xl text-accent"></span>
                      <p className='text-lg font-bold'>Loading Cart Items</p>
                    </div>
                    
                  </div>
                ) 
                  : 
                (
                <>
                  <div className='flex-2'>
                    <div className='flex justify-between w-full text-xl pb-2'>
                        <p>Your Cart</p>
                        <p className='text-accent font-bold'>{numberOfItems} {numberOfItems > 1 ? 'items' : 'item' }</p>
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
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartItems.map((product, idx) => {
                          return (
                            <tr key={idx} className='hover:bg-base-300 transition-all duration-300 ease-in-out'>
                              <td>
                                <Link className='relative flex flex-col items-center gap-2 xl:flex-row' href={`/product/${product.id}`}>
                                  <Image 
                                    src={product.thumbnail_img}
                                    width={130}
                                    height={100}
                                    alt={product.title}
                                    className='object-contain bg-secondary rounded-sm md:rounded-sm'
                                  />
                                  <p className='font-bold text-gray-500 text-xs sm:text-sm xl:text-lg text-center hidden sm:block '>{product.title}</p>
                                </Link>
                              </td>
                              <td className='font-bold text-lg text-gray-500'>
                                ${getItemPrice(product)}
                              </td>

                              <td>
                                <div className='flex  gap-2 opacity-70'>
                                      <button>
                                        <Minus color='#97322D' onClick={() => handleDecrease(product.id)} />
                                      </button>
              
                                        <input 
                                          className='ring w-10 text-center text-gray-600 font-bold ring-accent' type="text" 
                                          value={product.quantity}
                                          onChange={(e) => handleManualChange(e, product.id)}
                                          />

                                        <Plus color='#97322D' onClick={() => handleIncrease(product.id)} />
                                </div>
                              </td>

                              <td className='font-semibold text-lg'>
                                ${subTotalPerItem(product, product.quantity).toFixed(2)}
                              </td>

                              <td>
                                <button 
                                  className='btn btn-ghost btn-sm text-gray-400 hover:text-accent hover:bg-transparent'
                                  onClick={() => handleDelete(product.cart_item_id)}
                                >
                                  <Trash2 size={18} />
                                </button>
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
                          <span>${sumOfItems.toFixed(2)}</span>
                        </div>
                        <div className='flex justify-between font-bold'>
                          <p>Cart Items</p>
                          <span>{numberOfItems} {numberOfItems > 1 ? 'items' : 'item' }</span>
                        </div>
                        <div className='flex justify-between font-bold'>
                          <p>Tax (5%)</p>
                          <span>${priceBefore}</span>
                        </div>
                        <hr />
                        <div className='flex justify-between font-bold text-2xl'>
                          <p>Total</p>
                          <span>${total}</span>
                        </div>
                      </div>
    
                      <div className='mt-8 w-full p-4'>
                        <button disabled={placeOrderActive} onClick={handlePlaceOrder} className='btn btn-accent text-white w-full hover:scale-105 transition-all duration-300 ease-in-out'>
                          Place Order
                        </button>
                      </div>
                  </div>
                </>
                )}
            </>
          )
        }
      
      
          
        
    </div>
  )
}

export default page