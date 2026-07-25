import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales,  getLocaleFromHeaders } from "./i18n/config";

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 1. STATIC ASSETS & IMAGES BYPASS
    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/api") ||
        pathname.includes(".") ||
        pathname === "/og-image.png"
    ) {
        return NextResponse.next();
    }

    const segments = pathname.split("/");
    const currentLocale = segments[1];

    const hasLocale = (locales as readonly string[]).includes(currentLocale);

    // 2. AUTOMATIC BROWSER LOCALE DETECTION LOGIC
    if (!hasLocale) {
        // Step A: Pehle dekho ke user ne pehle koi language select karke cookie mein save ki hai?
        let targetLocale = request.cookies.get("NEXT_LOCALE")?.value;

        // Step B: Agar cookie nahi mili, toh browser ki Accept-Language header se language detect karo
        if (!targetLocale) {
            const acceptLanguage = request.headers.get("accept-language");
            targetLocale = getLocaleFromHeaders(acceptLanguage);
        }

        // Redirect Path Banayein
        const redirectPath = pathname === "/" ? `/${targetLocale}` : `/${targetLocale}${pathname}`;

        const response = NextResponse.redirect(new URL(redirectPath, request.url));

        // Cookie set kar dein taaki agli baar detection fast ho
        response.cookies.set("NEXT_LOCALE", targetLocale, {
            path: "/",
            maxAge: 31536000, // 1 year
            sameSite: "lax",
        });

        return response;
    }

    // 3. SECURITY & CSP HEADERS (Aapka existing logic)
    const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

    const cspHeader = `
        default-src 'self';
        script-src 'self' 'nonce-${nonce}' 'strict-dynamic' ${process.env.NODE_ENV === 'development' ? "'unsafe-eval'" : ""};
        style-src 'self' 'unsafe-inline';
        img-src 'self' blob: data:;
        font-src 'self';
        object-src 'none';
        base-uri 'self';
        form-action 'self';
        frame-ancestors 'none';
        upgrade-insecure-requests;
    `.replace(/\s{2,}/g, ' ').trim();

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-nonce', nonce);
    requestHeaders.set('Content-Security-Policy', cspHeader);

    const response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });

    response.headers.set('Content-Security-Policy', cspHeader);

    return response;
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|og-image.png|.*\\..*|api).*)",
    ],
};