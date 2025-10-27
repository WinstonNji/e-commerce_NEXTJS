'use client'
import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

export const UserContext = createContext()

function UserContextProvider({children}) {

    const [isLoggedIn, setLoginStatus] = useState(false)
    const [userId, setUserId] = useState(null)
    const router = useRouter()

    const isUserLoggedIn = async () => {
        try {
            const res = await fetch('/api/v1/auth/checkUserLogin', {credentials : 'include'})
            const result = await res.json()
            console.log(result, '***checking user cookie')
            setLoginStatus(result.loggedIn)
            setUserId(result.userId)
            return result.userId
        } catch (error) {
            console.error(error)
        }
            
    }
    

    useEffect(() => {
        isUserLoggedIn()
    }, []);

    const handleLogout = async () => {
        try {
            const res = await fetch('/api/v1/auth/logout')
            const result = await res.json()
            console.log(result, '***checking user cookie')
            setLoginStatus(result.loggedIn)
            router.push('/login')
        } catch (error) {
            console.error(error)
        }
    }

    // const addToCart = async (productId, quantity) => {
    //     try {
    //         if(!isLoggedIn || !userId){
    //             toast.info("Login Required for this feature")
    //             router.push('/login')
    //             return
    //         }

    //         const data = {
    //             quantity,
    //             productId
    //         }

    //         const res = await fetch('/api/v1/cart/add_to_cart', {
    //             method : 'POST',
    //             credentials : 'include',
    //             body : JSON.stringify(data)
    //         })

    //         if(!res.ok){
    //             toast.error("Couldn't add product to cart.")
    //             return
    //         }

    //         const result = await res.json()

    //         if(!result.success){
    //             toast.error(result.message)
    //             return
    //         }

    //     } catch (error) {
    //         toast.error("An error occured couldn't add to cart")
    //     }
        
    // }



    return (
            <UserContext.Provider value={
                    {
                        isLoggedIn, 
                        setLoginStatus, 
                        handleLogout, 
                        userId, 
                        isUserLoggedIn,
                        // addToCart
                    }
                } >
                {children}
            </UserContext.Provider>
    )
}

export default UserContextProvider