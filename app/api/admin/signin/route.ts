import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

function hash(s: string) {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0
  return String(h >>> 0)
}

export async function POST(req: NextRequest) {
  const { password, next } = await req.json().catch(()=>({}))
  const pass = process.env.ADMIN_PASS
  if (!pass) return NextResponse.json({ error: 'Admin not configured' }, { status: 401 })
  if (!password || password !== pass) return NextResponse.json({ error: 'Invalid password' }, { status: 401 })

  // Very short TTL so it effectively prompts often (10 seconds)
  const ttlMs = 10_000
  const exp = Date.now() + ttlMs
  const sig = hash(pass + '::' + exp)

  const res = NextResponse.redirect(new URL(next || '/admin/tags', req.url))
  res.cookies.set('admin_session', `${exp}:${sig}`, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: Math.ceil(ttlMs / 1000),
    secure: true,
  })
  return res
}
