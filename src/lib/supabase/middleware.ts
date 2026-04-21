import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { rateLimitService } from '../wallpaper/services/ratelimit.service'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  // --- Domain-Based Isolation Logic ---
  const hostname = request.headers.get('host')
  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN // e.g., api.devawais.com
  const mainDomain = process.env.NEXT_PUBLIC_SITE_URL || 'https://devawais.com'

  // If we are currently serving traffic on the dedicated API SUBDOMAIN
  if (apiDomain && hostname === apiDomain) {
    const isWallpaperPath = request.nextUrl.pathname.startsWith('/wallpaper')
    
    // Block any attempt to view the portfolio/pages on the API subdomain
    if (!isWallpaperPath) {
      return NextResponse.redirect(new URL(mainDomain, request.url))
    }
  }
  // --- End Isolation Logic ---

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return supabaseResponse
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // 1. Protect Admin UI Routes
  if (
    !user &&
    request.nextUrl.pathname.startsWith('/wallpaper/admin') &&
    !request.nextUrl.pathname.startsWith('/wallpaper/admin/login')
  ) {
    const url = request.nextUrl.clone()
    url.pathname = '/wallpaper/admin/login'
    return NextResponse.redirect(url)
  }

  // 2. Protect Mobile API Routes (The Security Shield)
  if (
    request.nextUrl.pathname.startsWith('/wallpaper/api/') &&
    !request.nextUrl.pathname.startsWith('/wallpaper/api/wallpapers/upload')
  ) {
    const apiKey = request.headers.get('x-api-key')
    const appPackage = request.headers.get('x-app-package')
    const deviceId = request.headers.get('x-device-id')
    const integrityToken = request.headers.get('x-integrity-token')
    const validApiKey = process.env.MOBILE_API_KEY

    // Phase 1: Basic Authentication
    if (!appPackage || !deviceId || apiKey !== validApiKey) {
      return NextResponse.json({ 
        error: 'Unauthorized Access. Missing or invalid security headers (API Key, Package Name, or Device ID).' 
      }, { status: 401 })
    }

    // Phase 2: Rate Limiting (Device-Based)
    const ratelimit = await rateLimitService.check(deviceId)
    if (!ratelimit.success) {
      return NextResponse.json({ 
        error: 'Too many requests. Please slow down.',
        retryAfter: Math.ceil((ratelimit.reset - Date.now()) / 1000)
      }, { status: 429 })
    }

    // Phase 3: Integrity Check (Token existence)
    if (!integrityToken && process.env.NODE_ENV === 'production') {
      return NextResponse.json({ 
        error: 'Security Failure. Integrity token is required for production requests.' 
      }, { status: 403 })
    }
  }

  return supabaseResponse
}
