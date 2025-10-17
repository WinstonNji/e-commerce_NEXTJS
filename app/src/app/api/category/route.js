import pool from "@/lib/db";
import { NextResponse } from "next/server";
import { createCategory, getAllCategories } from "@/lib/models/categories";

export async function POST(req) {
    try {
        const formData = await req.formData();
        const result = await createCategory(formData)

        if(!result){
            throw error
        }

        return NextResponse.json({
            success: true, data: result
        })
    } catch (error) {
        NextResponse.json({
            success: false, 
            message:'An error occured',
            data: error
        })
    }
}

export async function GET(){
    try {
        const result = await getAllCategories()
        if(!result){
            return NextResponse.json({
                success: true,
                message: "Couldn't fetch categories",
                data: result
            })
        }

        return NextResponse.json({
            success: true,
            message: "Categories fetched successfully",
            data: result
        })
    } catch (error) {
         return NextResponse.json({
            success: false,
            message: 'An error occured',
            error: error
        })
    }
   

}
