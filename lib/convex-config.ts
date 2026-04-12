/**
 * Validates and sanitizes the Convex URL
 * Returns a clean URL or null if invalid
 */
export function validateConvexUrl(url: string | undefined): string | null {
  if (!url) return null;

  // Check for placeholder values
  const invalidPatterns = [
    'placeholder',
    'happy-monkey',
    'missing',
    'undefined',
    'your-',
    'example',
  ];

  const lowerUrl = url.toLowerCase();
  if (invalidPatterns.some(pattern => lowerUrl.includes(pattern))) {
    return null;
  }

  // Validate URL format
  try {
    const parsed = new URL(url);
    if (!parsed.protocol.startsWith('http')) {
      return null;
    }
    return url;
  } catch {
    return null;
  }
}

/**
 * Gets a friendly status message for Convex connection
 */
export function getConvexStatusMessage(status: string): string {
  switch (status) {
    case 'connected':
      return 'Connected to database';
    case 'error':
      return 'Database connection error';
    case 'unreachable':
      return 'Database unreachable';
    case 'not configured':
      return 'Database not configured';
    default:
      return 'Checking connection...';
  }
}
