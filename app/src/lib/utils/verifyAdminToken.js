import { cookies } from "next/headers";
import jwt from 'jsonwebtoken'



export async function verifyAdminToken(token){

    console.log(token, 'obtained token')

    if(!token){
        throw new Error('No token insight')
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_JWT_TOKEN)
        const {role} = decoded

        console.log(decoded, 'decoded')

        if(role !== 'admin'){
            return false
        }

        return true

    } catch (error) {
        console.log(error)
        return false
    }
}