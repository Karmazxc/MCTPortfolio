'use client';

import { useConvexConnection } from './ConvexClientProvider';

interface ConnectionWarningProps {
  message?: string;
  className?: string;
}

export default function ConnectionWarning({ 
  message = "Unable to connect to the server. Some features may be unavailable.", 
  className = "" 
}: ConnectionWarningProps) {
  const { connectionError, retry } = useConvexConnection();

  if (!connectionError) return null;

  return (
    <div className={`bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-4 ${className}`}>
      <div className="flex items-start gap-3">
        <span className="text-red-400 text-lg">⚠️</span>
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
          className="text-xs px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded transition-colors"
        >
          Retry
        </button>
      </div>
    </div>
  );
}
