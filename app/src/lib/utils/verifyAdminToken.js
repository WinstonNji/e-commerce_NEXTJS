import { cookies } from "next/headers"
import jwt from 'jsonwebtoken'

export async function verifyAdminToken(){
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value
    
    if(!token){
        throw new Error("No token found. Access denied")
    }

    const decoded  = jwt.verify(token, process.env.SECRET_JWT_TOKEN)
    const {role} = decoded

    if(role !== 'admin' && role !== 'demo-admin'){
        throw new Error("Access Denied.")
    }

    return decoded
}