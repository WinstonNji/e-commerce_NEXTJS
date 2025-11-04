import { updateCarousel,deleteCarousel } from "@/lib/models/admin/carousel";
import { NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/utils/verifyAdminToken";


export async function PATCH(req, {params}){
    try {
        const decoded = await verifyAdminToken()
        const { role } = decoded

        if (role === "demo-admin") {
            return NextResponse.json({ message: "Functionality not allowed for demo admin account", success: false, isDemo: true }, { status: 200 })
        }

        const {id} = await params
        const data = await req.formData()

        const result = await updateCarousel(data,id)

        if(!result){
            return NextResponse.json({message: 'Carousel not found'}, {status: 404})
        }

        return NextResponse.json(
            {
                message: 'Carousel updated successfully', 
                data: result, 
                success: true
            },
            {status: 200}
        )
    } catch (error) {
        console.error('Error updating carousel:', error)
        return NextResponse.json({message: 'Internal Server Error'}, {status: 500})
    }
}

export async function DELETE(req, {params}){
    try {
        const decoded = await verifyAdminToken()
        const { role } = decoded

        if (role === "demo-admin") {
            return NextResponse.json({ message: "Functionality not allowed for demo admin account", success: false, isDemo: true }, { status: 200 })
        }

        const {id} = await params
        const result = await deleteCarousel(id)
        if(!result){
            return NextResponse.json({message: 'Carousel not found'}, {status: 404})
        }
        return NextResponse.json({message: 'Carousel deleted successfully', data: result}, {status: 200})
    } catch (error) {
        console.error('Error deleting carousel:', error)
        return NextResponse.json({message: 'Internal Server Error'}, {status: 500})
    }
}