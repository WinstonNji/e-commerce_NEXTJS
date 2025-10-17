import { deleteCategory, updateCategory } from "@/lib/models/categories";
import {NextResponse} from "next/server";


export async function DELETE(req, {params}){
    try {
        const {id} = await params;

        const result = await deleteCategory(id)

        if(result.rowCount === 0){
            return NextResponse.json({
                success: false,
                message: `Product not found`
            })
        }

        return NextResponse.json({
            success: true,
            message: 'Category sucessfully deleted'
        })
    } catch (error) {
         return NextResponse.json({
            success: false,
            message: 'An error occured',
            error: error.message
        })
    }
    
}

export async function PATCH(req, {params}){
    try {
        console.log(params, '--params--')
        const {id} = await params
        const formData = await req.formData()
        const result = await updateCategory(id, formData )

        if(result.rowCount == 0){
            return NextResponse.json({
                success: false,
                message: "Couldn't update product"
            })
        }

        return NextResponse.json({
            success: true,
            message: "Product sucessfully updated"
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "An error occured",
            error: error.message
        })
    }


}