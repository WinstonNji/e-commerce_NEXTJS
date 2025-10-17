import { createCarousel } from "@/lib/models/carousel";
import { NextResponse } from "next/server";

export async function POST(req){
    try {
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