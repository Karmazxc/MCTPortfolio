import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "default_secret_123");
const ADMIN_SLUG = process.env.ADMIN_SLUG || "admin-portal";

// Simple in-memory rate limiting for Edge Runtime (resets on worker restart)
const ipCache = new Map<string, { count: number; lastReset: number }>();

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. RATE LIMITING for Admin Portal Login
  if (pathname.startsWith(`/portal/${ADMIN_SLUG}`)) {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
    const now = Date.now();
    const windowMs = 15 * 60 * 1000; // 15 minutes
    const maxAttempts = 5;

    const record = ipCache.get(ip) || { count: 0, lastReset: now };
    
    if (now - record.lastReset > windowMs) {
      record.count = 0;
      record.lastReset = now;
    }

    if (record.count >= maxAttempts) {
      return new NextResponse("Too many login attempts. Please try again in 15 minutes.", { status: 429 });
    }

    record.count++;
    ipCache.set(ip, record);
  }

  // 2. SESSION CHECK for Dashboard
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("admin_session")?.value;

    if (!token) {
      return NextResponse.redirect(new URL(`/portal/${ADMIN_SLUG}`, request.url));
    }

    try {
      await jwtVerify(token, JWT_SECRET);
      return NextResponse.next();
    } catch (err) {
      return NextResponse.redirect(new URL(`/portal/${ADMIN_SLUG}`, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/portal/:path*", "/admin/:path*"],
};
