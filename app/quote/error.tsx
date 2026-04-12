'use client';

import { useEffect } from 'react';

export default function QuoteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Quote page error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold mb-2">Unable to load Quote Form</h1>
        <p className="text-gray-400 mb-6">
          There was a problem loading the quote request form. Please try again or contact us directly.
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
            href="mailto:contact@mct.dev"
            className="px-6 py-2 border border-gray-700 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Email Us
          </a>
        </div>
      </div>
    </div>
  );
}
