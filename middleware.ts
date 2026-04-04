import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simple Basic Auth gate for admin routes
const ADMIN_PATHS = [
  /^\/admin(\/.*)?$/,
  /^\/api\/admin(\/.*)?$/,
]

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Only protect admin paths
  const protect = ADMIN_PATHS.some(rx => rx.test(pathname))
  if (!protect) return NextResponse.next()

  const user = process.env.ADMIN_USER
  const pass = process.env.ADMIN_PASS

  if (!user || !pass) {
    // If not configured, deny to avoid accidental exposure
    return new NextResponse('Admin auth not configured', { status: 401 })
  }

  const header = req.headers.get('authorization') || ''
  const [scheme, encoded] = header.split(' ')
  if (scheme !== 'Basic' || !encoded) {
    return new NextResponse('Auth required', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="admin"' },
    })
  }

  const decoded = Buffer.from(encoded, 'base64').toString('utf8')
  const [u, p] = decoded.split(':')
  if (u === user && p === pass) return NextResponse.next()

  return new NextResponse('Unauthorized', { status: 401 })
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
