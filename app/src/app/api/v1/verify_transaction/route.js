import Flutterwave from "flutterwave-node-v3"
import pool from "@/lib/db";
import { NextResponse } from "next/server";

const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

export async function GET(req) {
    try {
        const searchParams = req.nextUrl.searchParams

        const status = searchParams.get('status')
        const transactionId = searchParams.get('transaction_id')
        const userId = searchParams.get('userId')
        const productId = searchParams.get('productId')
        const quantity = searchParams.get('productQuantity')
        const orderId = searchParams.get('orderId')

        const productIds = productId.split(',') || []
        const quantities = quantity.split(',') || []


        if(!status || status !== 'successful'){
            await pool.query(`
                UPDATE orders
                SET 
                    payment_status = 'failed'
                WHERE id = $1
                RETURNING*
            `, [orderId])
            return NextResponse.json({
                success: false,
                message : "Couldn't complete transaction. Verification process failed, try again later"
            })
        }

        if(!userId){
            await pool.query(`
                UPDATE orders
                SET 
                    payment_status = 'failed'
                WHERE id = $1
                RETURNING*
            `, [orderId])
            return NextResponse.json({
                success: false,
                message: "Couldn't get your User Identifier. Try again later"
            })
        }


        const response = await flw.Transaction.verify({id:transactionId })

        if(response.status !== 'success' || response.data.status !== 'successful'){
            await pool.query(`
                UPDATE orders
                SET 
                    payment_status = 'failed'
                WHERE id = $1
                RETURNING*
            `, [orderId])
            return NextResponse.json({
                success: false,
                message: "Couldn't verify transaction"
            })
        }

        for(let i = 0; i < productIds.length ; i++){
            const productId = productIds[i]
            const quantity = quantities[i]

            const response = await pool.query(`
                    UPDATE products 
                    SET 
                        inventory = inventory - $1
                    WHERE id = $2
                    RETURNING *
                `, [quantity,productId])
            
            if(response.rowCount === 0){
                return NextResponse.json({
                    success: false,
                    message: "Couldn't verify transaction"
                })
            }
        }

        await pool.query(`
                DELETE FROM carts
                WHERE user_id = $1
                RETURNING *
            `, [userId])

        await pool.query(`
                UPDATE orders
                SET 
                    payment_status = 'paid'
                WHERE id = $1
                RETURNING*
            `, [orderId])

        return NextResponse.json({
            success: true,
            message : 'Transaction successfully verified'
        })
    } catch (error) {
        console.error(error)
        return NextResponse.json({
            success: false,
            message: error,
            error: error
        })
    }
    
}