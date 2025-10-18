import { NextResponse } from "next/server"
import { getSingleProduct } from "@/lib/models/general/products"

export async function GET(req, {params}) {
    try {
        const {id} = await params
        const product = await getSingleProduct(id)

        if(!product){
            return NextResponse.json({
                success: false,
                message: " Couldn't find product",
            })
        }

        return NextResponse.json({
            success: true,
            message: 'Product sucessfully fetched',
            data: product
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Ooops. An error occured',
            error: error.message
        })
    }
}