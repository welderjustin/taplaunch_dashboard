import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// App-level auth: require pass every visit (very short session TTL)
const ADMIN_PATHS = [/^\/admin(\/.*)?$/, /^\/api\/admin(\/.*)?$/]

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl
  const allow = [/^\/admin\/signin$/, /^\/admin\/logout$/, /^\/api\/admin\/signin$/]
  if (allow.some(rx => rx.test(pathname))) return NextResponse.next()
  const protect = ADMIN_PATHS.some(rx => rx.test(pathname))
  if (!protect) return NextResponse.next()

  const pass = process.env.ADMIN_PASS
  if (!pass) {
    return new NextResponse('Admin auth not configured', { status: 401 })
  }

  // Check short-lived session cookie
  const cookie = req.cookies.get('admin_session')?.value
  const now = Date.now()
  const [stamp, sig] = (cookie || '').split(':')
  const ok = stamp && sig && Number(stamp) > now && sig === hash(pass + '::' + stamp)
  if (ok) return NextResponse.next()

  // Not authed → redirect to signin with next
  const url = req.nextUrl.clone()
  url.pathname = '/admin/signin'
  url.search = `?next=${encodeURIComponent(pathname + (search || ''))}`
  return NextResponse.redirect(url)
}

// Tiny hash to sign cookie (not cryptographically strong, but fine for this minimal gate)
function hash(s: string) {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0
  return String(h >>> 0)
}

export const config = { matcher: ['/admin/:path*', '/api/admin/:path*'] }
