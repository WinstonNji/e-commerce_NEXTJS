import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(){
    try {
        const result = await pool.query(`
            SELECT * from category
            WHERE display = true;
        `)

        console.log(result, 'result backend')

        if(result.rowCount === 0){
            return NextResponse.json({
                success: false,
                message: "No category Found",
                data: result.rows
            })
        }

        return NextResponse.json({
            success: true,
            message: "Categories fetched successfully",
            data: result.rows
        })
    } catch (error) {
         return NextResponse.json({
            success: false,
            message: 'An error occured',
            error: error
        })
    }
   

}