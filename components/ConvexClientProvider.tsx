"use client";

import { ReactNode, useEffect, useState } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";

export default function ConvexClientProvider({ children }: { children: ReactNode }) {
  const [convex, setConvex] = useState<ConvexReactClient | null>(null);

  useEffect(() => {
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
    
    // Only initialize if we have a valid URL
    if (convexUrl && !convexUrl.includes("placeholder") && !convexUrl.includes("happy-monkey") && !convexUrl.includes("missing")) {
      setConvex(new ConvexReactClient(convexUrl));
    }
  }, []);

  // Render children without Convex if URL is missing (shows warnings in UI)
  if (!convex) {
    if (process.env.NODE_ENV === "development") {
      console.warn("⚠️ CONVEX_URL is missing or invalid. Please set NEXT_PUBLIC_CONVEX_URL in your .env.local file.");
    }
    return <>{children}</>;
  }

  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
