import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken'
import { verifyAdminToken } from "@/lib/utils/verifyAdminToken";

export async function GET() {
    try {
        const decoded = await verifyAdminToken()
        const {role} = decoded;

        if(role === 'demo-admin'){
            console.log("Demo admin accessing dashboard")
        }

        const response = await pool.query(`
                SELECT 
                    o.id AS order_id,
                    o.total_amount,
                    o.payment_status,
                    o.created_at,
                    json_build_object(
                        'name',u.name,
                        'email',u.email
                    ) AS user,
                    json_agg(
                        json_build_object(
                            'title', p.title,
                            'quantity', oi.quantity,
                            'subtotal', oi.subtotal,
                            'inventory', p.inventory
                        )
                    ) AS order_items
                FROM orders o
                JOIN users u
                    ON o.user_id = u.id
                JOIN order_items oi
                    ON o.id = oi.order_id
                JOIN products p
                    ON p.id = oi.product_id
                GROUP BY o.id, u.id
                ORDER BY o.created_at DESC;
            `)

        if(response.rowCount === 0){
            throw new Error("An error occured while getting order summary")
        }

        const result = response.rows

        return NextResponse.json({
            success: true,
            message: "Order summaries fetched successfully",
            data : result
        })

    } catch (error) {
        console.error(error, '****ERR MESSAGE')
        return NextResponse.json({
            success: false,
            message: error,
            error: error
        })
    }

}