import { NextRequest, NextResponse } from "next/server";
import { authGuard } from "./features/auth/middleware/authGuard";

export default function middleware(request: NextRequest) {
  console.log("Middleware triggered for:", request.nextUrl.pathname);

  // Perform authentication first
  const redirectURL = authGuard(request);

  if (redirectURL) {
    console.log("Redirecting to:", redirectURL.toString());
    return NextResponse.redirect(redirectURL);
  }

  console.log("Allowing request to continue");
  // If everything is fine, continue with the request
  return NextResponse.next();
}

export const config = {
  // Match all paths except for API routes, static files, etc.
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
