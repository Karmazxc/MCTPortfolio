"use client";

import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { validateConvexUrl } from "@/lib/convex-config";
import ConnectionWarning from "./ConnectionWarning";

type ConvexContextType = {
  isConnected: boolean;
  connectionError: Error | null;
  retry: () => void;
};

const ConvexContext = createContext<ConvexContextType>({
  isConnected: false,
  connectionError: null,
  retry: () => {},
});

export function useConvexConnection() {
  return useContext(ConvexContext);
}

// Initialize Convex client with validated URL
const convexUrl = validateConvexUrl(process.env.NEXT_PUBLIC_CONVEX_URL);
const convex = convexUrl ? new ConvexReactClient(convexUrl) : null;

// ConvexStatus component to track connection
function ConvexStatus({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(true);
  const [connectionError, setConnectionError] = useState<Error | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (!convex) {
      setConnectionError(new Error("Convex URL is not configured"));
      setIsConnected(false);
      return;
    }

    // Convex handles connection state internally via hooks
    // We just need to track if the client was initialized successfully
    setIsConnected(true);
    setConnectionError(null);

    return () => {
      // Cleanup if needed
    };
  }, [retryCount]);

  const retry = () => {
    setRetryCount(c => c + 1);
  };

  return (
    <ConvexContext.Provider value={{ isConnected, connectionError, retry }}>
      {children}
      <ConnectionWarning />
    </ConvexContext.Provider>
  );
}

export default function ConvexClientProvider({ children }: { children: ReactNode }) {
  if (!convex) {
    if (process.env.NODE_ENV === "development") {
      console.warn("⚠️ CONVEX_URL is missing or invalid. Please set NEXT_PUBLIC_CONVEX_URL in your .env.local file.");
    }
    // Render children without Convex - pages using Convex will show loading/empty states
    return (
      <ConvexContext.Provider value={{ isConnected: false, connectionError: new Error("Convex not configured"), retry: () => {} }}>
        {children}
        <ConnectionWarning message="Convex is not configured. Please set NEXT_PUBLIC_CONVEX_URL in your .env.local file." />
      </ConvexContext.Provider>
    );
  }

  return (
    <ConvexProvider client={convex}>
      <ConvexStatus>{children}</ConvexStatus>
    </ConvexProvider>
  );
}
