import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const token = searchParams.get('token')
  if (!supabase) return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 })
  if (!token) return NextResponse.json({ error: 'Missing token' }, { status: 400 })

  const { data: tag, error: tErr } = await supabase
    .from('tags')
    .select('id, slug, label, current_url, updated_at')
    .eq('client_edit_token', token)
    .maybeSingle()

  if (tErr) return NextResponse.json({ error: tErr.message }, { status: 500 })
  if (!tag) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const { data: scans, error: sErr } = await supabase
    .from('tag_scans')
    .select('scanned_at')
    .eq('tag_id', tag.id)
    .order('scanned_at', { ascending: false })

  if (sErr) return NextResponse.json({ error: sErr.message }, { status: 500 })
  const count = scans?.length ?? 0
  const last_scanned = scans && scans[0]?.scanned_at || null

  return NextResponse.json({ tag, summary: { count, last_scanned } })
}
