import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const tag_id = searchParams.get('tag_id')

  if (!supabase) return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 })

  let query = supabase.from('tag_scans').select('*').order('scanned_at', { ascending: false })
  if (tag_id) query = query.eq('tag_id', tag_id)

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ items: data ?? [] })
}
