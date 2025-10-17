import { deleteProduct, getAllProducts, getSingleProduct, updateProduct } from "@/lib/models/productController";
import { NextResponse } from "next/server";

export async function PATCH(req, {params}) {
    try {
        const {id} = await params
        const data = await req.formData()

        const result = await updateProduct(data,id)

        if(!result){
            return NextResponse.json({
                success: false,
                message : "Couldn't update product"
            })
            
        }

        return NextResponse.json({
            success: true,
            message: 'Product successfully Updated',
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: 'An Error Occured',
            error: error.message
        })
    }

    
}

export async function DELETE(req, {params}){
    try {
        const {id} = await params
        const result = await deleteProduct(id)

        if(!result){
            return NextResponse.json({
                success: false,
                message : "Couldn't update product",
                data: result
            })
        }

         return NextResponse.json({
            success: true,
            message: 'Product successfully Deleted',
            data: result
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'An Error Occured',
            error: error.message
        })
    }
}

export async function GET(req, {params}) {
    try {
        const {id} = await params
        const product = await getSingleProduct(id)

        if(!product){
            return NextResponse.json({
                success: false,
                message: " Couldn't fetch products",
            })
        }

        return NextResponse.json({
            success: true,
            message: 'Products sucessfully fetched',
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