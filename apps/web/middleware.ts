import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = await getToken({ req, secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET });

  // Public routes that don't require authentication
  const publicPaths = ["/login", "/register", "/api", "/_next", "/favicon.ico"];

  // Skip middleware for public assets or API routes
  if (publicPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // 🚫 No token → redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // ✅ Has token but not onboarded → must go to onboarding
  if (!token.onboardingCompleted && pathname !== "/onboarding") {
    return NextResponse.redirect(new URL("/onboarding", req.url));
  }

  // ✅ Has token and onboarded → prevent visiting onboarding again
  if (token.onboardingCompleted && pathname === "/onboarding") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // ✅ Otherwise, allow request
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
      Run middleware on all routes except static files, API, and Next.js internals
    */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
