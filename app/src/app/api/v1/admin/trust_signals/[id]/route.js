import { NextResponse } from "next/server";
import { deleteTrustSignal, editTrustSignal } from "@/lib/models/admin/trust_signals";


export async function PATCH(req, {params}){
    try {
        const {id} = await params
        const formData = await req.formData()
        const result = await editTrustSignal(formData, id )
        if(!result){
            return NextResponse.json({
                success: false,
                message: "Couldn't update trust signal"
            })
        }
        return NextResponse.json({
            success: true,
            message: "Trust Signal sucessfully updated",
            data : result
        })
    } catch (error) {
        return NextResponse.json({
            success: false, 
            message: "An error occured",
            error: error.message
        })
    }
}

export async function DELETE(req, {params}){
    try {
        const {id} = await params;
        const result = await deleteTrustSignal(id)

        if(!result){
            return NextResponse.json({
                success: false,
                message: `Trust Signal not found`
            })
        }
        return NextResponse.json({
            success: true,
            message: 'Trust Signal sucessfully deleted'
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'An error occured',
            error: error.message
        })
    }
}