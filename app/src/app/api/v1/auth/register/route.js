import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import pool from "@/lib/db";

export async function POST(req) {
    const {email, password, name} = await req.json()

    if(!email || !password || !name){
        return NextResponse.json({
            success: false,
            message: 'Please, Enter all fields'
        })
    }

    const result = await pool.query(`
            SELECT * FROM USERS
            WHERE email = $1
        `, [email])

    if(result.rowCount > 0){
        return NextResponse.json({
            success: false,
            message: "Account already registered, Login instead"
        })
    }

    const hashedPassword = await bcrypt.hash(password,10)

    const newUser = await pool.query(`
            INSERT INTO USERS(
                name,
                email,
                password
            )VALUES($1,$2,$3)
            RETURNING *
        `, [name, email, hashedPassword])

    if(newUser.rowCount <= 0){
        return NextResponse.json({
            success: false,
            message: "Couldn't register your account, Try again Later."
        })
    }

    return NextResponse.json({
        success : true,
        message: `Account successfully created. Welcome ${name}`
    })
}