
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';




const validPaths = [
  '/home',
  '/movies',
  '/tv',
  '/search',
  /^\/movies\/[^/]+$/,  // Ej: /movies/123
  /^\/tv\/[^/]+$/,      // Ej: /tv/456
];

// Middleware principal
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Redirigir si está autenticado e intenta ir a /login o /register
  if (path === '/login' || path === '/register') {
    const token = request.cookies.get('session')?.value;

    if (token) {
 
        return NextResponse.redirect(new URL('/home', request.url));
    
    }

    return NextResponse.next(); // no hay token o no válido, dejar pasar
  }

  // Verificar rutas válidas para la app
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

// Configurar matcher para incluir login y register
export const config = {
  matcher: [
    '/login',
    '/register',
    '/movies/:path*',
    '/tv/:path*',
    '/bookmarked',
    '/home',
    '/',
  ],
};