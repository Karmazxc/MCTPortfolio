import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY;
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "default_secret_123");
const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL;

async function logActivity(action: string, details: string, userIdentifier: string) {
  if (!CONVEX_URL || CONVEX_URL.includes("placeholder")) return;
  try {
    await fetch(`${CONVEX_URL}/log`, {
      method: "POST",
      body: JSON.stringify({ action, details, userIdentifier, secret: ADMIN_SECRET_KEY }),
    });
  } catch (err) {
    console.error("Convex logging error:", err);
  }
}

export async function POST(request: Request) {
  try {
    const { password, secretKey } = await request.json();

    if (password === ADMIN_PASSWORD && secretKey === ADMIN_SECRET_KEY) {
      const token = await new SignJWT({ role: "admin" })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("2h")
        .sign(JWT_SECRET);

      const cookieStore = await cookies();
      cookieStore.set("admin_session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7200, // 2 hours
        path: "/",
      });

      await logActivity("LOGIN_SUCCESS", "Admin successfully logged in", "Admin");
      
      return NextResponse.json({ success: true });
    }

    await logActivity("LOGIN_FAILURE", `Failed login attempt with key: ${secretKey}`, "Unknown");
    
    return NextResponse.json(
      { message: "Invalid credentials. Attempt logged." },
      { status: 401 }
    );
  } catch (err) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
