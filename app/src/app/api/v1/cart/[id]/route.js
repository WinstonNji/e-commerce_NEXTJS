import { getUserId } from "@/lib/utils/verifyUser"
import { NextResponse } from "next/server"
import pool from "@/lib/db"


export async function DELETE(req, {params}) {
    try {
        const userId = await getUserId()
        const {id} = await params
        const cartItemId = id

        console.log(userId, '***userId', cartItemId, '****cartItemId')

        const result = await pool.query(`
            DELETE FROM carts c
            WHERE c.user_id = $1 AND c.id = $2
            RETURNING*;
        `, [userId, cartItemId ])

        console.log(result, '****result')

        if(result.rowCount === 0){
            return NextResponse.json({
                success: false,
                message: "Couldn't remove item from cart. Try again later",
            })
        }

        return NextResponse.json({
            success: true,
            message: "Item successfully removed from cart",
        })
    } catch (error) {
        console.error(error)
        return NextResponse.json({
            success: false,
            message: "An error occured. Couln't remove item from cart",
            error: error
        })
    }
    
}