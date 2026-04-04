import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const tag_id = searchParams.get('tag_id')
  if (!supabase) return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 })
  if (!tag_id) return NextResponse.json({ error: 'Missing tag_id' }, { status: 400 })

  const { data, error } = await supabase
    .from('tag_scans')
    .select('scanned_at')
    .eq('tag_id', tag_id)
    .order('scanned_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  const count = data?.length ?? 0
  const last_scanned = data && data[0]?.scanned_at || null
  return NextResponse.json({ count, last_scanned })
}
