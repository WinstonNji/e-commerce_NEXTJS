import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
    try {
        const query = `
            SELECT * from brand;
        `

        const result = await pool.query(query)

        console.log(result)

        if(!result.rows){
            return NextResponse.json({
                success: false,
                message: "Couldn't fetch brands"
            })
        }

        return NextResponse.json({
            success: true,
            message: "Brands sucessfully fetched",
            data: result.rows
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error.message 
        })
    }
    
}