
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { checkAuthAction } from './actions/auth';

const validPaths = [
  '/home',
  '/movies',
  '/tv',
  '/search',
  '/favorites',
  /^\/movies\/[^/]+$/,  
  /^\/tv\/[^/]+$/,      
];


const authRequiredPaths = ['/favorites'];
const publicOnlyPaths = ['/login', '/register'];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicOnly = publicOnlyPaths.includes(path);
  const isAuthRequired = authRequiredPaths.includes(path);

  const isValidPath = validPaths.some((validPath) =>
    typeof validPath === 'string' ? path === validPath : validPath.test(path)
  );

  // Sólo pedir autenticación si es necesario
  const currentUser = (isPublicOnly || isAuthRequired) ? await checkAuthAction() : null;

  // Redirigir a /home si ya está logueado e intenta acceder a login o register
  if (isPublicOnly) {
    return currentUser
      ? NextResponse.redirect(new URL('/home', request.url))
      : NextResponse.next();
  }

  // Redirigir a login si no está autenticado e intenta acceder a /favorites (u otra protegida)
  if (isAuthRequired && !currentUser) {
    return NextResponse.redirect(new URL('/login', request.url));
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
    '/favorites',
    '/home',
    '/',
  ],
};