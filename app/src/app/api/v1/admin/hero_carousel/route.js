import { createCarousel, getAllCarousel } from "@/lib/models/admin/carousel";
import { NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/utils/verifyAdminToken";

export async function POST(req){
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

        const data = await req.formData()

        const result = await createCarousel(data)

        if(!result){
            return NextResponse.json({
                success: false,
                message: "Couldn't create a new carousel"
            })
        }

        return NextResponse.json({
            success: true,
            message: "Carousel Successfully created",
            data: result
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "Ooops. An error occured",
            error: error.message
        })
    }
    
}

export async function GET(){
    try {
        const result = await getAllCarousel()

        if(!result){
            return NextResponse.json({
                success: false,
                message: "Couldn't fetch carousels"
            })
        }

        return NextResponse.json({
            success: true,
            message: "Carousels fetched successfully",
            data: result
        })
    } catch (error) {
        console.error(error)
        return NextResponse.json({
            success: false,
            message: "An Error Occured",
            error: error.message
        })
    }
}
