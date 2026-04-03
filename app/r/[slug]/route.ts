import { NextResponse } from 'next/server'

// Placeholder: In v1, this will look up the slug in Supabase and 302 to current_url
export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const { slug } = params
  // TODO: fetch from DB by slug
  const target = 'https://example.com/' + encodeURIComponent(slug)
  return NextResponse.redirect(target, { status: 302 })
}
