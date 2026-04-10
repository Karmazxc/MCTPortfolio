import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "default_secret_123");
const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL;

function getAdminCredentials() {
  return {
    adminPassword: process.env.ADMIN_PASSWORD,
    adminSecretKey: process.env.ADMIN_SECRET_KEY,
  };
}

async function logActivity(action: string, details: string, userIdentifier: string) {
  const { adminSecretKey } = getAdminCredentials();

  if (!CONVEX_URL || CONVEX_URL.includes("placeholder") || !adminSecretKey) return;
  try {
    await fetch(`${CONVEX_URL}/log`, {
      method: "POST",
      body: JSON.stringify({ action, details, userIdentifier, secret: adminSecretKey }),
    });
  } catch (error) {
    console.error("Convex logging error:", error);
  }
}

export async function POST(request: Request) {
  try {
    const { password, secretKey } = await request.json();
    const { adminPassword, adminSecretKey } = getAdminCredentials();

    if (!adminPassword || !adminSecretKey) {
      return NextResponse.json(
        {
          message:
            "Admin login is not configured for this environment. Set ADMIN_PASSWORD and ADMIN_SECRET_KEY, then restart the server.",
        },
        { status: 500 }
      );
    }

    if (password === adminPassword && secretKey === adminSecretKey) {
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
        maxAge: 7200,
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
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
