import { NextResponse } from "next/server";
import { createCategory,getAllCategories } from "@/lib/models/admin/categories";
import { verifyAdminToken } from "@/lib/utils/verifyAdminToken";

export async function POST(req) {
    try {
        const decoded = await verifyAdminToken()
        const { role } = decoded

        if (role === "demo-admin") {
            return NextResponse.json({
                isDemo: true,
                success: false,
                message: "Functionality not allowed for demo admin account",
            })
        }

        const formData = await req.formData();

        console.log(formData, '**formData from frontend')
        const result = await createCategory(formData)

        if(!result){
            return NextResponse.json({
                success: false, 
                message: "Couldn't create category"
            })
        }

        return NextResponse.json({
            success: true, 
            message : "Category successfully created",
            data: result
        }, {status: 200})
    } catch (error) {
        console.error(error)
        NextResponse.json({
            success: false, 
            message:'An error occured',
            error: error
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
