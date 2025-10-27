import React from 'react'
import ProductCard from '../Shared/ProductCard'
import Link from 'next/link'


async function Products_List() {

    const fetchAllProduct = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/general/products`)

            if(!res.ok){
                throw new Error("An error occured")
            }

            const result = await res.json()
            return result.data
        } catch (error) {
            console.error(error)
        }
    }

    const products = await fetchAllProduct()

    return (
        <div>
            {products.map((product,index) => (
                <ProductCard key={index} product={product} />
            ))}
        </div>
    )
}

export default Products_List