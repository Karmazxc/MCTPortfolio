"use client";

import { ReactNode } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

// Only initialize if we have a valid URL. 
// If missing, we use a recognizable 'missing' string to trigger UI warnings in the app.
const isMissing = !convexUrl || convexUrl.includes("placeholder") || convexUrl.includes("happy-monkey");
const finalUrl = isMissing ? "https://missing-convex-url.convex.cloud" : convexUrl;

const convex = new ConvexReactClient(finalUrl);

export default function ConvexClientProvider({ children }: { children: ReactNode }) {
  if (isMissing) {
    console.warn("⚠️ CONVEX_URL is missing or invalid. Please set NEXT_PUBLIC_CONVEX_URL in your .env.local file.");
  }
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
