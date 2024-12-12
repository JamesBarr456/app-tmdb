import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


const validRoutes = [
    "/",
  "/home",
  "movies", 
  "tv", 
];

export function middleware(req: NextRequest) {
  const url = req.nextUrl.pathname;

 
  if (!validRoutes.includes(url)) {
    return NextResponse.redirect(new URL("/not-found", req.url));
  }


  return NextResponse.next();
}


export const config = {
  matcher: ["/((?!api|_next|favicon.ico|assets).*)"],
};
