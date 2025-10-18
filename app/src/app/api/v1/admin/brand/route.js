import pool from "@/lib/db";
import { NextResponse } from "next/server";

// export async function GET() {
//     console.log('works')
//     try {
//         const query = `
//             SELECT * from brand;
//         `

//         const result = await pool.query(query)

//         console.log(result)

//         if(!result.rows){
//             return NextResponse.json({
//                 success: false,
//                 message: "Couldn't fetch brands"
//             })
//         }

//         return NextResponse.json({
//             success: true,
//             message: "Brands sucessfully fetched",
//             data: result.rows
//         })
//     } catch (error) {
//         return NextResponse.json({
//             success: false,
//             error: error.message 
//         })
//     }
    
// }

export async function POST(req) {
    const data = await req.json()
    console.log(req.json, data, '-----body')
    try {
        const brandName = data.brandName
        const query = `
            INSERT INTO brand (
                brand_name
            )
            VALUES ($1)
            RETURNING *;
        `;
        const values = [brandName]

        let result = await pool.query(query,values)
        result.rows[0]

        console.log(result)

        if(!result){
            return NextResponse.json({
                success: false,
                message: "Couldn't add a new brand",
            })
        }

        return NextResponse.json({
            success: true,
            message: "Brands sucessfully created",
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error.message 
        })
    }
}