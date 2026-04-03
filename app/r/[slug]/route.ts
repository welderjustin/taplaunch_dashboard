import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const { slug } = params
  const { data, error } = await supabase
    .from('tags')
    .select('current_url')
    .eq('slug', slug)
    .maybeSingle()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  if (!data?.current_url) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  return NextResponse.redirect(data.current_url, { status: 302 })
}
