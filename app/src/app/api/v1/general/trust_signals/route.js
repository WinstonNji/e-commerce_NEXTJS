import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
    try {
        const query = `
            SELECT * FROM trust_signal
            WHERE display = true;
        `;
        const result = await pool.query(query);
        
        if(result.rowCount === 0){
            return NextResponse.json({
                success: false,
                message: "Couldn't fetch trust signals",
                data: result.rows
            });
        }

        return NextResponse.json({
            success: true,
            message: "Trust signals fetched successfully",
            data: result.rows
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
}