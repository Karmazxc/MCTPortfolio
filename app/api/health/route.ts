import { NextResponse } from 'next/server';

export async function GET() {
  const health: {
    status: 'ok' | 'degraded';
    timestamp: string;
    services: {
      convex: {
        status: string;
        url: string;
        error?: string;
      };
    };
    version: string;
  } = {
    status: 'degraded',
    timestamp: new Date().toISOString(),
    services: {
      convex: {
        status: 'unknown',
        url: process.env.NEXT_PUBLIC_CONVEX_URL || 'not configured',
      },
    },
    version: process.env.npm_package_version || 'dev',
  };

  // Check Convex connectivity
  try {
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
    if (convexUrl && !convexUrl.includes('placeholder')) {
      // Simple fetch to check if Convex is reachable
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);

      const response = await fetch(`${convexUrl}/api/listTables`, {
        method: 'GET',
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      health.services.convex.status = response.ok ? 'connected' : 'error';
    } else {
      health.services.convex.status = 'not configured';
    }
  } catch (error) {
    health.services.convex.status = 'unreachable';
    health.services.convex.error = error instanceof Error ? error.message : 'Unknown error';
  }

  // Overall status
  health.status = health.services.convex.status === 'connected' ? 'ok' : 'degraded';

  return NextResponse.json(health, {
    status: health.status === 'ok' ? 200 : 503,
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}
