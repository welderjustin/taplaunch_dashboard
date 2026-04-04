import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  if (!supabaseAdmin) return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 })
  const { slug } = params
  const { data: tag, error } = await supabaseAdmin
    .from('tags')
    .select('id, current_url')
    .eq('slug', slug)
    .maybeSingle()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  if (!tag?.current_url || !tag?.id) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  // Log the scan
  await supabaseAdmin.from('tag_scans').insert({ tag_id: tag.id }).select().single().catch(() => null)

  return NextResponse.redirect(tag.current_url, { status: 302 })
}
