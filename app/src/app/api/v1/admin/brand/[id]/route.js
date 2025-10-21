import pool from "@/lib/db";
const { NextResponse } = require("next/server");


export async function DELETE(req, {params}) {

    try {
        const {id} = await params

        // Check if product is tied to brand
        const product = await pool.query(`
            SELECT 
                p.id, 
                p.title,
                b.brand_name 
            FROM products p
            JOIN brand b ON p.brand = b.id
            WHERE p.brand = $1
            LIMIT 1;
        `, [id])
        if(product.rows[0]){
            return NextResponse.json({
                success: false,
                message: "A product is already tied to this brand. Delete or update that product first."
            })
        }

        // Deleting brand
        const query = `
            DELETE FROM brand
            WHERE id = $1
            RETURNING *;
        `;
        const result = await pool.query(query,[id])
        if(result.rows.length === 0){
            return NextResponse.json({
                success: false,
                message: "Couldn't find brand"
            })
        }
        return NextResponse.json({
            success: true,
            message: "Brand sucessfully deleted"
        })
    } catch (error) {
        console.log(error, '****Error')
        return NextResponse.json({
            success: false,
            message: 'An error occured',
            error: error
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

        console.log(id,data, '---DATA AND ID---')

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
        console.error(error)
        return NextResponse.json({
            success: false,
            messaage: 'An error occured',
            error: error.detail
        }, {status: 500})
    }
   
}