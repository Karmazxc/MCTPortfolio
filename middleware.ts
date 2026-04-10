import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_SLUG = process.env.ADMIN_SLUG || "mark-admin-2026";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only process admin and portal paths
  if (!pathname.startsWith("/admin") && !pathname.startsWith("/portal")) {
    return NextResponse.next();
  }

  try {
    // Session CHECK for Dashboard
    if (pathname === "/admin" || pathname.startsWith("/admin/")) {
      // Simple cookie check - skip JWT verification in middleware to avoid edge runtime issues
      const token = request.cookies.get("admin_session")?.value;

      if (!token) {
        return NextResponse.redirect(new URL(`/portal/${ADMIN_SLUG}`, request.url));
      }

      // If token exists, allow through - detailed verification happens in the page
      return NextResponse.next();
    }
  } catch (error) {
    // If middleware fails, allow the request through
    console.error("Middleware error:", error);
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/portal/:path*", "/admin/:path*"],
};
