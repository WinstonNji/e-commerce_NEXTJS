export function getBaseUrl() {
    if (process.env.NODE_ENV === "production") {
        // deployed URL only in production
        return "https://e-commerce-nextjs-sage.vercel.app/";
    }


    return "http://localhost:3000";
}
