import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SESSION_TOKEN = process.env.SESSION_SECRET || "your-secret-session-token";

export function middleware(request: NextRequest) {
  // Only protect /admin routes, except /admin/login
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Allow access to login page
    if (request.nextUrl.pathname === "/admin/login") {
      return NextResponse.next();
    }

    // Check for admin session cookie
    const session = request.cookies.get("admin-session");

    if (!session || session.value !== SESSION_TOKEN) {
      // Redirect to login page
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};

