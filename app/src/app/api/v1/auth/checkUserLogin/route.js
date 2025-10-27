import { NextResponse } from "next/server";
import cookie from 'cookie'
import jwt from 'jsonwebtoken'

export async function GET(req) {
    const token = await req.cookies.get('auth_token')?.value

    if(!token){
        return NextResponse.json({
            loggedIn: false
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_JWT_TOKEN);

        return NextResponse.json({
            loggedIn: true, userId : decoded.userId
        })
    } catch (error) {
        return NextResponse.json({ loggedIn: false });
    }
}