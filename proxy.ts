import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isLocalizedRoute = /^\/(en|ar)(\/|$)/.test(pathname);

  if (isLocalizedRoute) {
    return NextResponse.next();
  }

  // Detect language (you can enhance this by checking cookies)
  const acceptLanguage = req.headers.get("accept-language") || "en";
  const userLang = acceptLanguage.startsWith("ar") ? "ar" : "en";

  return NextResponse.redirect(new URL(`/${userLang}${pathname}`, req.url));
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|assets).*)",
  ],
};
