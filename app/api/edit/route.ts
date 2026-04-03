import { NextResponse } from 'next/server'

// POST /api/edit  { token, url }
// TODO: Verify token against Supabase, update tags.current_url, insert into tag_audit
export async function POST(req: Request) {
  const body = await req.json().catch(() => null) as { token?: string; url?: string } | null
  if (!body?.token || !body?.url) {
    return NextResponse.json({ error: 'Missing token or url' }, { status: 400 })
  }
  // Placeholder passthrough
  return NextResponse.json({ ok: true })
}
