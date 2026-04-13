'use client';

import { useConvexConnection } from './ConvexClientProvider';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ConnectionWarningProps {
  message?: string;
  className?: string;
}

/**
 * Shows a warning banner when Convex connection fails.
 * Includes a retry button with loading state.
 */
export default function ConnectionWarning({
  message = "Unable to connect to the server. Some features may be unavailable.",
  className = ""
}: ConnectionWarningProps) {
  const { connectionError, retry } = useConvexConnection();

  if (!connectionError) return null;

  return (
    <div
      role="alert"
      aria-live="polite"
      className={`bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-4 ${className}`}
    >
      <div className="flex items-start gap-3">
        <AlertTriangle className="text-red-400 flex-shrink-0 mt-0.5" size={20} />
        <div className="flex-1">
          <p className="text-sm text-red-400">{message}</p>
          {process.env.NODE_ENV === 'development' && (
            <p className="text-xs text-gray-500 mt-1 font-mono break-all">
              {connectionError.message}
            </p>
          )}
        </div>
        <button
          onClick={retry}
          className="text-xs px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded transition-colors flex items-center gap-1.5"
          aria-label="Retry connection"
        >
          <RefreshCw size={12} />
          Retry
        </button>
      </div>
    </div>
  );
}
