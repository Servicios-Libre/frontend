import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  const { pathname } = req.nextUrl;

  // Si no hay token, redirigimos a /auth
  if (!token) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  // Solo bloquear si intenta acceder al dashboard y no es admin
  if (pathname.startsWith("/dashboard") && token.role !== "admin") {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile"],
};
