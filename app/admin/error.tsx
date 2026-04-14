'use client';

import { useEffect } from 'react';

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Admin page error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <div className="text-6xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold mb-2">Admin Dashboard Error</h1>
        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 mb-6 text-left">
          <p className="text-red-400 text-sm font-mono break-all">{error.message}</p>
          {error.stack && (
            <pre className="text-gray-500 text-xs mt-3 overflow-x-auto whitespace-pre-wrap font-mono">
              {error.stack.split('\n').slice(0, 5).join('\n')}
            </pre>
          )}
        </div>
        <div className="flex gap-3 justify-center flex-wrap">
          <button
            onClick={reset}
            className="px-6 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Try Again
          </button>
          <a
            href="/"
            className="px-6 py-2 border border-gray-700 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Go Home
          </a>
          <button
            onClick={() => window.location.href = '/portal/mark-admin-2026'}
            className="px-6 py-2 border border-gray-700 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Re-login
          </button>
        </div>
      </div>
    </div>
  );
}
