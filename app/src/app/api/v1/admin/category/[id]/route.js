import {NextResponse} from "next/server";
import { deleteCategory, updateCategory } from "@/lib/models/admin/categories";
import pool from "@/lib/db";


export async function DELETE(req, {params}){
    try {
        const {id} = await params;

        // Checking if a product already uses this category
        const categoryExists = await pool.query(`
            SELECT p.title FROM products p
            WHERE p.category = $1
        `, [id])

        console.log(categoryExists.rows, '---category exists check')

        if(categoryExists.rowCount !== 0){
            const product = categoryExists.rows[0].title
            return NextResponse.json({
                success: false,
                message: `Couldn't update category. "${product}" is already using this category. Update this product's category first.`
            })
        }

        // If product doesn't use category, then we can delete
        const result = await deleteCategory(id)

        if(result.rowCount === 0){
            return NextResponse.json({
                success: false,
                message: `Category not found`
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
        const {id} = await params
        const formData = await req.formData()
        const result = await updateCategory(id, formData )

        if(result.rowCount == 0){
            return NextResponse.json({
                success: false,
                message: "Couldn't update category"
            })
        }

        return NextResponse.json({
            success: true,
            message: "Category sucessfully updated"
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "An error occured",
            error: error.message
        })
    }


}