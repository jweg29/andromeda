import { NextRequest, NextResponse } from "next/server";

// Middleware function to handle authentication
export function middleware(req: NextRequest): NextResponse | void {
    // Example: Check for a cookie named 'authToken'
    const token = req.cookies.get("authToken");
    console.log("middleware function");
    console.log("token: ")

    if (!token) {
        // Redirect unauthenticated users to the homepage
        console.log("No token found. Redirection...")
        return NextResponse.redirect(new URL("/", req.url));
    }

    // Allow the request to proceed
    return NextResponse.next();
}

// Specify the routes where this middleware should apply
export const config = {
    matcher: ["/app/:path*"], // Apply middleware to /app and its subpaths
};