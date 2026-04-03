import { NextResponse } from 'next/server'

// GET: list, POST: create (placeholders)
export async function GET() {
  return NextResponse.json({ items: [] })
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null)
  return NextResponse.json({ created: body ?? {} })
}
