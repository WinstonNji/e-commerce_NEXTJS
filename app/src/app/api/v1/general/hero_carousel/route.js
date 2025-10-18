import pool from "@/lib/db"
import { NextResponse } from "next/server"


export async function GET(){
    try {
        const result = await pool.query(`
                SELECT * FROM hero_carousel 
                WHERE display = true
            `)

        if(result.rowCount === 0){
            return NextResponse.json({
                success: false,
                message: "Couldn't fetch carousels"
            })
        }

        return NextResponse.json({
            success: true,
            message: "Carousels fetched successfully",
            data: result.rows
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