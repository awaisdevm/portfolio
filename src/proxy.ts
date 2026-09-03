import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, getLocaleFromHeaders } from "./i18n/config";

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const hostname = request.headers.get("host") || request.nextUrl.hostname;

    // ── SEO: Redirect www → non-www (permanent 301) ──
    if (hostname.startsWith("www.")) {
        const nonWwwUrl = new URL(request.url);
        nonWwwUrl.hostname = hostname.replace(/^www\./, "");
        return NextResponse.redirect(nonWwwUrl, 301);
    }

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

    if (!hasLocale) {
        let targetLocale = request.cookies.get("NEXT_LOCALE")?.value;

        if (!targetLocale) {
            const acceptLanguage = request.headers.get("accept-language");
            targetLocale = getLocaleFromHeaders(acceptLanguage);
        }

        const redirectPath = pathname === "/" ? `/${targetLocale}` : `/${targetLocale}${pathname}`;

        const response = NextResponse.redirect(new URL(redirectPath, request.url));

        response.cookies.set("NEXT_LOCALE", targetLocale, {
            path: "/",
            maxAge: 31536000, // 1 year
            sameSite: "lax",
        });

        return response;
    }

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