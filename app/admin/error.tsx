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
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold mb-2">Admin Dashboard Error</h1>
        <p className="text-gray-400 mb-6">
          Unable to load the admin dashboard. Please check your connection and try again.
        </p>
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
