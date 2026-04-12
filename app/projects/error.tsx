'use client';

import { useEffect } from 'react';

export default function ProjectsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Projects page error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold mb-2">Unable to load Projects</h1>
        <p className="text-gray-400 mb-6">
          There was a problem loading the projects. This might be a temporary issue.
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
          <a
            href="/about"
            className="px-6 py-2 border border-gray-700 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            About Me
          </a>
        </div>
      </div>
    </div>
  );
}
