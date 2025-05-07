import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const validPaths = [
  '/home',
  '/movies',
  '/tv',
  '/search',
  '/login',
  '/register',
  '/favorites',
  /^\/movies\/[^/]+$/,
  /^\/tv\/[^/]+$/,
];

const privateOnlyPaths = ['/favorites'];
const publicOnlyPaths = ['/login', '/register'];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicOnly = publicOnlyPaths.includes(path);
  const isPrivateOnly = privateOnlyPaths.includes(path);
  const token = request.cookies.get('token')?.value;
  const isLoggedIn = !!token;

  const isValidPath = validPaths.some((validPath) =>
    typeof validPath === 'string' ? path === validPath : validPath.test(path)
  );

  if (isPrivateOnly && !isLoggedIn) {
    // Redirigir a /login si no está logueado e intenta acceder a rutas privadas
    return NextResponse.redirect(new URL('/login', request.url));
  }
  // Redirigir a /home si ya está logueado e intenta acceder a login o register
  if (isPublicOnly && isLoggedIn) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  // Redirigir a not-found si no es una ruta válida
  if (!isValidPath && path !== '/') {
    return NextResponse.rewrite(new URL('/not-found', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/login',
    '/register',
    '/movies/:path*',
    '/tv/:path*',
    '/home',
    '/favorites',
    '/',
  ],
};
