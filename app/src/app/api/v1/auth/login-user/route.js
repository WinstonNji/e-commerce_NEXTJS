import pool from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import { cookies } from "next/headers";


export async function POST(req) {
    try {
        const cookieStore = await cookies()
        const {email, password} = await req.json()

        console.log(email, 'user email')

        if(!email || !password){
            return NextResponse.json({
                success: false,
                message : 'Enter valid credentials'
            })
        }

        const result  = await pool.query(`
            SELECT * FROM USERS
            WHERE email = $1
        `, [email])

        console.log(result, 'result from select')

        if(result.rowCount == 0){
            return NextResponse.json({
                success: false,
                message : "Account not found. Register Instead"
            })
        }

        const user = result.rows[0]

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return NextResponse.json({
                success: false,
                message : 'Invalid Credentials'
            })
        }

        const token = jwt.sign({role : user.role, userId : user.id},process.env.SECRET_JWT_TOKEN,{expiresIn : '24h'})

        cookieStore.set({
            name: 'auth_token',
            value: token,
            httpOnly : true,
            secure : process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge : 24 * 60 * 60,
            path : '/'
        })

        return NextResponse.json({
            success: true,
            message: `Welcome ${user.name}`
        })
    } catch (error) {
        console.error(error)
        return NextResponse({
            success : false,
            message : 'An error occured'
        }, {status:500})
    }
    

}