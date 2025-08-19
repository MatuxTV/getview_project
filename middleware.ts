import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // Chránené routes - vyžadujú prihlásenie
  const protectedRoutes = ['/map']
  
  // Skontroluj, či je aktuálna cesta chránená
  const isProtectedRoute = protectedRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  )
  
  if (isProtectedRoute) {
    // Skontroluj, či existuje session cookie
    const sessionToken = request.cookies.get('authjs.session-token') || 
                         request.cookies.get('__Secure-authjs.session-token')
    
    // Ak nie je session cookie, presmeruj na hlavnú stránku
    if (!sessionToken) {
      const url = new URL('/', request.url)
      url.searchParams.set('error', 'authentication-required')
      return NextResponse.redirect(url)
    }
  }
  
  return NextResponse.next()
}

// Konfiguruj, na ktorých cestách má middleware bežať
export const config = {
  matcher: [
    // Spustiť len na chránených cestách
    '/map/:path*',
  ],
}
