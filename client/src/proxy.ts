import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // Paths that should stay reachable without authentication
  // Determine if the request is for a static asset (e.g., .js, .css, .png)
  const isStaticAsset = /\.[^/]+$/.test(pathname);
  const PUBLIC_PATHS = ['/', '/login', '/register'];
  const isPublic = PUBLIC_PATHS.includes(pathname) || isStaticAsset;

  if (isPublic) return NextResponse.next();

  // Check if logged in...
  return NextResponse.next();
}

// Run on everything except static assets and images
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
