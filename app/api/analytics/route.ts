import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const tag_id = searchParams.get('tag_id')

  // Build the query based on if tag_id is provided
  let query = supabase.from('tag_audit').select('*')
  if (tag_id) query = query.eq('tag_id', tag_id)

  const { data, error } = await query

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ items: data ?? [] })
}
