'use client'
import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { getBaseUrl } from '@/lib/utils/getBaseUrl'

export const UserContext = createContext()

function UserContextProvider({children}) {

    const [isLoggedIn, setLoginStatus] = useState(false)
    const [userId, setUserId] = useState(null)
    const router = useRouter()
    const baseUrl = getBaseUrl()

    const isUserLoggedIn = async () => {
        try {
            const res = await fetch(`${baseUrl}/api/v1/auth/checkUserLogin`, {credentials : 'include'})
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
            const res = await fetch(`${baseUrl}/api/v1/auth/logout`)
            const result = await res.json()
            console.log(result, '***checking user cookie')
            setLoginStatus(result.loggedIn)
            router.push('/login')
        } catch (error) {
            console.error(error)
        }
    }




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