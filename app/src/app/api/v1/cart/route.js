import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken'
import { getUserId } from "@/lib/utils/verifyUser";

export async function POST(req) {
    try {
        const userId = await getUserId()
        const data = await req.json()
        console.log(data, 'data from frontend')
        let {quantity, productId} = data

        if(!quantity || !productId || !userId){
            return NextResponse.json({
                success: false,
                message: "Couldn't add product to cart "
            })
        }

        if (quantity === 0){
            return quantity = 1
        }

        // Check if product exists already
        const product = await pool.query(
            `
                SELECT * FROM carts 
                WHERE product_id = $1 AND user_id = $2
            `, [productId, userId])


        // Update product if it exists already
        if(product.rowCount > 0){
            console.log('received')
            let existingProduct = product.rows[0]
            console.log(existingProduct, '**existingProduct')
            existingProduct.quantity = quantity
            console.log('new exiting product quantity:::::', existingProduct)
            await pool.query(
                `
                    UPDATE carts 
                    SET
                        quantity = $1
                    WHERE product_id = $2 AND user_id = $3 
                    RETURNING *
                `, [existingProduct.quantity, productId, userId ])
            
                return NextResponse.json({
                    success: true,
                    message : 'Product added to cart'
                })
        }

        // ADD PRODUCT TO CART
        const query = `
            INSERT INTO carts(
                user_id,
                product_id,
                quantity
            )VALUES(
                $1,$2,$3
            )
            RETURNING *
        `

        const values = [userId, productId, quantity]

        const result = await pool.query(query, values)

        if(result.rowCount == 0){
            return NextResponse.json({
                success: false,
                message: "Couldn't add to cart "
            })
        }

        return NextResponse.json({
            success: true,
            message: "Product added to cart"
        })

    } catch (error) {
        console.error(error, '****add to cart error')
        return NextResponse.json({
            success: false,
            message: "An error occured",
            error: error
        })
    }
}

export async function GET(req) {
    try {
        const userId = await getUserId()

        console.log(userId, '****userId')
        const query = `
            SELECT 
                p.id,
                p.title,
                p.price,
                p.discount_percentage,
                p.thumbnail_img,
                c.quantity,
                c.id as cart_item_id
            from products p
            JOIN carts c
                ON p.id = c.product_id
            WHERE c.user_id = $1 AND is_deleted = false AND display = true
        `
        const values = [userId]
        const result = await pool.query(query, values)
        const cartItems = result.rows

        console.log(cartItems)

        if(result.rowCount == 0){
            return NextResponse.json({
                success: true,
                data : []
            })
        }

        return NextResponse.json({
            success: true,
            data : cartItems
        })
    } catch (error) {
        console.error(error)
        return NextResponse.json({
            success: false,
            message: 'An error occured',
            error : error
        })
    }
}



