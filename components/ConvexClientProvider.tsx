"use client";

import { ReactNode } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";

// Initialize Convex client immediately with the env var
// This ensures it's available during SSR/hydration
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
const isValidUrl = convexUrl && !convexUrl.includes("placeholder") && !convexUrl.includes("happy-monkey") && !convexUrl.includes("missing") && !convexUrl.includes("undefined");

const convex = isValidUrl ? new ConvexReactClient(convexUrl) : null;

export default function ConvexClientProvider({ children }: { children: ReactNode }) {
  if (!convex) {
    if (process.env.NODE_ENV === "development") {
      console.warn("⚠️ CONVEX_URL is missing or invalid. Please set NEXT_PUBLIC_CONVEX_URL in your .env.local file.");
    }
    // Render children without Convex - pages using Convex will show loading/empty states
    return <>{children}</>;
  }

  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
