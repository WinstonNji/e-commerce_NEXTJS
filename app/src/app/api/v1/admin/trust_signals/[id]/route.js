import { NextResponse } from "next/server";
import { deleteTrustSignal, editTrustSignal } from "@/lib/models/admin/trust_signals";
import { verifyAdminToken } from "@/lib/utils/verifyAdminToken";


export async function PATCH(req, {params}){
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
        const decoded = await verifyAdminToken()
        const { role } = decoded

        if (role === "demo-admin") {
            return NextResponse.json({
                isDemo: true,
                success: false,
                message: "Functionality not allowed for demo admin account",
            })
        }

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