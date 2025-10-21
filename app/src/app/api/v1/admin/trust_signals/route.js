import { NextResponse } from "next/server";
import { createTrustSignal,getAllTrustSignals } from "@/lib/models/admin/trust_signals"; 


export async function POST(req) { 
    try {
        const formData = await req.json();
        const result = await createTrustSignal(formData)

        if(!result){
            return NextResponse.json({
                success: false, 
                message: "Couldn't create a new trust signal",
            })
        }

        return NextResponse.json({
            success: true, 
            message: "Trust signal created successfully",
            data: result
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
        const result = await getAllTrustSignals()
        if(!result){
            return NextResponse.json({
                success: true,
                message: "Couldn't fetch trust signals",
                data: result
            })
        }
        return NextResponse.json({
            success: true,
            message: "Trust signals fetched successfully",
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