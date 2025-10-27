import { NextResponse } from "next/server";
import { verifyAdminToken } from "./lib/utils/verifyAdminToken";

export async function middleware(req) {
    const token = req.cookies.get('auth_token')?.value

    if(!token){
        return NextResponse.redirect(new URL("/login", req.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        "/admin-dashboard",
        "/admin-add-product",
        "/admin-edit-brand",
        "/admin-edit-categories",
        "/admin-edit-hero-page",
        "/admin-edit-icons",
        "/admin-edit-product"
    ]
}