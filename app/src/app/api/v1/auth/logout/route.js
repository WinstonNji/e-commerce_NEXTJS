import cookie from 'cookie'
import { NextResponse } from 'next/server'

export async function GET() {
    const serialized = cookie.serialize('auth_token', "", {
        httpOnly : true,
        secure : process.env.NODE_ENV === 'production',
        sameSite : "strict",
        expires : new Date(0),
        path: '/'
    })

    return NextResponse.json({
        loggedIn: false
    }, {
        status : 200,
        headers :  {
            'Set-Cookie' : serialized
        }
    })
}