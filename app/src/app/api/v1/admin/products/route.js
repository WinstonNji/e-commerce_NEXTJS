import pool from "@/lib/db";
import { NextResponse } from "next/server";
import { createProduct } from "@/lib/models/admin/productController";
import { getAllProducts } from "@/lib/models/admin/productController";
import { verifyAdminToken } from "@/lib/utils/verifyAdminToken";

export async function POST(req){
    try {
        const decoded = await verifyAdminToken()
        const {role} = decoded;

        if(role === 'demo-admin'){
            return NextResponse.json({
                isDemo: true,
                success: false,
                message: "Functionaliity not allowed for demo_admin account",
            })
        }

        const formData = await req.formData();
        const result = await createProduct(formData)

        if(!result){
            return NextResponse.json({
                success: false,
                message: "Couldn't create a new product",
            })
        }
        
        
        return NextResponse.json({
            success: true,
            message: 'Product Created Successfully',
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "An error occured",
            error: error.message
        })
    }
    
}

export async function GET() {
    const products = await getAllProducts()

    try {
        if(products.length == 0){
            return NextResponse.json({
                success: false,
                message: " Couldn't fetch products",
            })
        }

        return NextResponse.json({
            success: true,
            message: 'Products sucessfully fetched',
            data: products
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Products sucessfully fetched',
            error: error.message
        })
    }

    
}
