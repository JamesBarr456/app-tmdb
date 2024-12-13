import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
const validPaths = [
  '/home',
  '/movies',
  '/tv',
  '/search',
  /^\/movies\/[^/]+$/,
  /^\/tv\/[^/]+$/,
];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;


  const isValidPath = validPaths.some((validPath) => {
    if (typeof validPath === 'string') {
      return path === validPath;
    }

    return validPath.test(path);
  });

 
  if (!isValidPath && path !== '/') {
    return NextResponse.rewrite(new URL('/not-found', request.url));
  }

  return NextResponse.next();
}


export const config = {
  matcher: ["/movies/:path", "/tv/:path", "/bookmarked", "/home", "/"],
};