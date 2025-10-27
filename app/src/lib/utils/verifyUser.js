import { cookies } from "next/headers"
import jwt from 'jsonwebtoken'
import { NextResponse } from "next/server"

export async function getUserId(params) {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value

    if(!token){
        return NextResponse.redirect(new URL('/login'), req.url )
    }

    const decoded =  jwt.verify(token, process.env.SECRET_JWT_TOKEN)
    const {userId} = decoded || null

    if(!userId){
        return NextResponse.redirect(new URL('/login'), req.url )
    }

    return userId
}