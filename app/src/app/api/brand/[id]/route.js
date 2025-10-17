import pool from "@/lib/db";
const { NextResponse } = require("next/server");


export async function DELETE(req, {params}) {

    try {
        const {id} = await params

        const query = `
            DELETE FROM brand
            WHERE id = $1
            RETURNING *;
        `;

        const result = await pool.query(query,[id])

        console.log(result)

        if(result.rows.length === 0){
            return NextResponse.json({
                success: false,
                messaage: "Couldn't find brand"
            })
        }

        return NextResponse.json({
            success: true,
            messaage: "Brand sucessfully deleted"
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            messaage: 'An error occured',
            error: error.messaage
        })
    }

    
}

export async function PATCH(req, {params}) {
    try {
        const {id} = await params
        const data = await req.json()
        
        const query = `
            UPDATE brand
            SET 
                brand_name = $1
            WHERE id = $2
            RETURNING*;
        `;

        const values = [data.brandName,id]

        const result = await pool.query(query,values)

        console.log(result)

        if(result.rowCount === 0){
            return NextResponse.json({
                success: false,
                messaage : "Couldn't find product"
            })
        }

        return NextResponse.json({
            success: true,
            messaage : "Product Updated Sucessfully"
        })

    } catch (error) {
        return NextResponse.json({
            success: false,
            messaage: 'An error occured',
            error: error.messaage
        })
    }
   
}