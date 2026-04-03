import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

// POST /api/edit  { token, url }
export async function POST(req: Request) {
  const body = await req.json().catch(() => null) as { token?: string; url?: string } | null
  if (!body?.token || !body?.url) {
    return NextResponse.json({ error: 'Missing token or url' }, { status: 400 })
  }
  try {
    // Basic URL sanity check
    const u = new URL(body.url)
    if (!/^https?:$/.test(u.protocol)) throw new Error('Invalid URL')
  } catch {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 })
  }

  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Server misconfigured: missing service role key' }, { status: 500 })
  }

  // Lookup tag by client_edit_token
  const { data: tag, error: findErr } = await supabaseAdmin
    .from('tags')
    .select('id, current_url')
    .eq('client_edit_token', body.token)
    .maybeSingle()

  if (findErr) return NextResponse.json({ error: findErr.message }, { status: 500 })
  if (!tag) return NextResponse.json({ error: 'Invalid or expired token' }, { status: 404 })

  // Update URL
  const { error: updErr } = await supabaseAdmin
    .from('tags')
    .update({ current_url: body.url })
    .eq('id', tag.id)

  if (updErr) return NextResponse.json({ error: updErr.message }, { status: 500 })

  // Audit
  await supabaseAdmin
    .from('tag_audit')
    .insert({ tag_id: tag.id, old_url: tag.current_url, new_url: body.url, changed_by: 'client' })

  return NextResponse.json({ ok: true })
}
