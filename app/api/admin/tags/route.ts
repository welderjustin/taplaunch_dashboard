import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
  if (!supabaseAdmin) return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 })
  const { data, error } = await supabaseAdmin
    .from('tags')
    .select('id, slug, label, current_url, client_edit_token, updated_at')
    .order('updated_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ items: data ?? [] })
}

export async function POST(req: Request) {
  if (!supabaseAdmin) return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 })
  const body = await req.json().catch(() => null) as { slug?: string; label?: string; current_url?: string }
  if (!body?.slug || !body?.current_url) return NextResponse.json({ error: 'Missing slug or current_url' }, { status: 400 })

  // Generate client token
  const { data: ins, error } = await supabaseAdmin
    .from('tags')
    .insert({ slug: body.slug, label: body.label ?? null, current_url: body.current_url, client_edit_token: crypto.randomUUID() })
    .select('id, slug, label, current_url, client_edit_token, updated_at')
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ created: ins })
}
