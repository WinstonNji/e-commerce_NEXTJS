"use client"
import React, { useState, useContext, useEffect, createContext } from 'react'
import { toast } from 'react-toastify'
import { UserContext } from './userContext'
import { useRouter } from 'next/navigation'

export const CartContext = createContext()

function CartContextProvider({children}) {
    const {isLoggedIn, userId} = useContext(UserContext)
    const [cartItems, setCartItems] = useState([])
    const [cartLength, setCartLength] = useState(0)
    const [loading, setLoading] = useState(false)
    
    const router = useRouter()

    // Fetch cart items when user logs in
    useEffect(() => {
        if(isLoggedIn && userId){
            fetchCartItems()
        } else {
            setCartItems([])
            setCartLength(0)
        }
    }, [isLoggedIn, userId])

    // Update cart length whenever items change
    useEffect(() => {
        setCartLength(cartItems.length)
    }, [cartItems])

    const fetchCartItems = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/v1/cart', {
                credentials: 'include'
            })

            if(!res.ok){
                toast.error("Couldn't fetch cart items.")
                setLoading(false)
                return []
            }

            const result = await res.json()

            if(!result.success){
                toast.error(result.message)
                setLoading(false)
                return []
            }

            const items = result.data || []
            setCartItems(items)
            setLoading(false)
            return items
        } catch (error) {
            toast.error("An error occurred couldn't fetch cart")
            setLoading(false)
            return []
        }
    }

    const addToCart = async (productId, quantity, productData = null) => {
        try {
            if(!isLoggedIn || !userId){
                toast.info("Login Required for this feature")

                setTimeout(()=> {
                    router.push('/login')
                }, 2000)
                return false
            }

            // Optimistically add to cart UI
            const existingItem = cartItems.find(item => item.id === productId)
            
            if (existingItem) {
                // Item already exists, just update quantity optimistically
                setCartItems(prev =>
                    prev.map(item =>
                        item.id === productId
                            ? { ...item, quantity: item.quantity + quantity }
                            : item
                    )
                )
            } else if (productData) {
                // Add new item optimistically with product data
                const optimisticItem = {
                    id: productId,
                    quantity: quantity,
                    ...productData
                }
                setCartItems(prev => [...prev, optimisticItem])
            }

            toast.success('Added to cart')

            // Sync with backend
            const data = {
                quantity,
                productId
            }

            const res = await fetch('/api/v1/cart', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            if(!res.ok){
                toast.error("Failed to sync with server")
                // Revert optimistic update
                await fetchCartItems()
                return false
            }

            const result = await res.json()

            if(!result.success){
                toast.error(result.message)
                // Revert optimistic update
                await fetchCartItems()
                return false
            }

            // Sync with actual server data in background
            await fetchCartItems()
            return true

        } catch (error) {
            console.error(error)
            toast.error("An error occurred couldn't add to cart")
            // Revert optimistic update
            await fetchCartItems()
            return false
        }
    }

    const updateCartItem = async (productId, quantity) => {
        // Store original state for rollback
        const originalItems = [...cartItems]
        
        // Optimistically update UI
        setCartItems(prev =>
            prev.map(item =>
                item.id === productId ? { ...item, quantity: quantity } : item
            )
        )

        try {
            if(!isLoggedIn || !userId){
                toast.info("Login Required for this feature")
                setCartItems(originalItems)
                return false
            }

            const data = {
                quantity,
                productId
            }

            const res = await fetch('/api/v1/cart', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            if(!res.ok){
                toast.error("Couldn't update cart item.")
                setCartItems(originalItems)
                return false
            }

            const result = await res.json()

            if(!result.success){
                toast.error(result.message)
                setCartItems(originalItems)
                return false
            }

            return true

        } catch (error) {
            toast.error("An error occurred couldn't update cart")
            setCartItems(originalItems)
            return false
        }
    }

    const deleteCartItem = async (cartItemId, optimistic = true) => {
        const originalItems = [...cartItems]
        
        // Optimistically remove from UI first if requested
        if (optimistic) {
            setCartItems(prev => prev.filter(item => item.cart_item_id !== cartItemId))
        }

        try {
            const res = await fetch(`/api/v1/cart/${cartItemId}`, {
                method: 'DELETE',
                credentials: 'include'
            })

            if(!res.ok){
                throw new Error("Couldn't perform this action")
            }

            const result = await res.json()

            if(!result.success){
                toast.error(result.message)
                setCartItems(originalItems)
                return false
            }

            if (!optimistic) {
                setCartItems(prev => prev.filter(item => item.cart_item_id !== cartItemId))
            }
            return true

        } catch (error) {
            console.error(error)
            toast.error(error.message || "Something went wrong while deleting item")
            setCartItems(originalItems)
            return false
        }
    }

    // Optimistic update for quantity changes
    const updateQuantityLocal = (productId, newQuantity) => {
        setCartItems(prev =>
            prev.map(item =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            )
        )
    }

    return (
        <CartContext.Provider value={{
            cartItems,
            cartLength,
            loading,
            fetchCartItems,
            addToCart,
            updateCartItem,
            deleteCartItem,
            updateQuantityLocal
        }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContextProvider