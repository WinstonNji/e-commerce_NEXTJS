import { getAllProducts_general } from '@/lib/models/general/products'
import { NextResponse } from 'next/server'


export async function GET() {
    const products = await getAllProducts_general()

    try {
        if(products.length == 0){
            return NextResponse.json({
                success: false,
                message: " Couldn't fetch products",
            })
        }

        return NextResponse.json({
            success: true,
            message: 'Products sucessfully fetched',
            data: products
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Products sucessfully fetched',
            error: error.message
        })
    }

    
}