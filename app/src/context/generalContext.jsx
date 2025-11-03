"use client"

import { createContext } from "react"
import { toast } from "react-toastify"
import React from 'react'

export const GeneralContext = createContext()

function GeneralContextProvider({children}) {

const fetchCategory_general = async () => {
    try {
        const res = await fetch('/api/v1/general/category', {cache: 'force-cache'})
        if(!res.ok){
            throw new Error('Failed to create new product')
        }
        const result = await res.json()
        return result.data
    } catch (error) {
        console.error(error)
    }
}

const fetchCategory = async () => {
    try {
        const res = await fetch('/api/v1/admin/category', {cache: 'force-cache'})
        if(!res.ok){
            throw new Error('Failed to create new product')
        }
        const result = await res.json()
        return result.data
    } catch (error) {
        console.error(error)
    }
}

const fetchBrands = async () => {
    try {
        const res = await fetch('/api/v1/general/brand', {cache : 'force-cache'})
        if(!res.ok){
            throw new Error("An error occured, couldn't fetch brands")
        }
        const result = await res.json()
        if(!result){
            throw new Error("Couldn't get brands")
        }
        return result.data

    } catch (error) {
        console.error(error)
    }
}

  return (
    <GeneralContext.Provider value={{fetchCategory,fetchBrands,fetchCategory_general}}>
        {children}
    </GeneralContext.Provider>
  )
}

export default GeneralContextProvider