import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale } from "./i18n/config";

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 1. STATIC ASSETS & IMAGES BYPASS
    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/api") ||
        pathname.includes(".") || // Skip all files with extensions like .png, .svg, .ico
        pathname === "/og-image.png"
    ) {
        return NextResponse.next();
    }

    const segments = pathname.split("/");
    const currentLocale = segments[1];

    const hasLocale = (locales as readonly string[]).includes(currentLocale);
    if (!hasLocale) {
        if (pathname === "/") {
            return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
        }
        return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url));
    }

    // 🔒 SECURITY FIX: CSP Nonce and Headers Generation
    const nonce = Buffer.from(crypto.randomUUID()).toString('base64');

    const cspHeader = `
        default-src 'self';
        script-src 'self' 'nonce-${nonce}' 'strict-dynamic' ${process.env.NODE_ENV === 'development' ? "'unsafe-eval'" : ""
        };
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

// ⚡ 2. UPDATED MATCHER: Ignore static files, images, favicon, and og-image.png
export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|og-image.png|.*\\..*|api).*)",
    ],
};