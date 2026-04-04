import { NextResponse } from 'next/server'

export async function GET() {
  // Force browsers to drop cached Basic Auth by changing the realm and returning 401
  const nonce = Math.random().toString(36).slice(2)
  return new NextResponse(
    '<!doctype html><html><body style="font-family:sans-serif;color:#e5e7eb;background:#0b0b0b;padding:24px">' +
      '<h1>Logged out</h1><p>Close this tab or go back to the dashboard. You will be asked to sign in again next time.</p>' +
    '</body></html>',
    {
      status: 401,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Set-Cookie': 'admin_session=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax',
        'WWW-Authenticate': `Basic realm="logout-${nonce}"`,
        'Cache-Control': 'no-store, max-age=0',
      },
    }
  )
}
