'use client'
import { useEffect, useMemo, useState } from 'react'

type Tag = { id: string; slug: string; label: string | null; current_url: string; updated_at: string; client_edit_token?: string }

export default function AdminTagsPage() {
  const [items, setItems] = useState<Tag[]>([])
  const [stats, setStats] = useState<Record<string, { count: number; last_scanned: string | null }>>({})
  const [loading, setLoading] = useState(false)
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [slug, setSlug] = useState('')
  const [label, setLabel] = useState('')
  const [url, setUrl] = useState('')

  async function load() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/admin/tags', { cache: 'no-store' })
      const j = await res.json()
      if (!res.ok) throw new Error(j?.error || 'Failed to load')
      const list: Tag[] = j.items || []
      setItems(list)
      // fetch summaries in parallel (small scale)
      const pairs = await Promise.all(list.map(async t => {
        try {
          const r = await fetch(`/api/analytics/summary?tag_id=${t.id}`, { cache: 'no-store' })
          const s = await r.json()
          return [t.id, { count: s.count ?? 0, last_scanned: s.last_scanned ?? null }] as const
        } catch {
          return [t.id, { count: 0, last_scanned: null }] as const
        }
      }))
      setStats(Object.fromEntries(pairs))
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  async function onCreate(e: React.FormEvent) {
    e.preventDefault()
    setCreating(true)
    setError(null)
    try {
      const res = await fetch('/api/admin/tags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, label: label || null, current_url: url }),
      })
      const j = await res.json()
      if (!res.ok) throw new Error(j?.error || 'Failed to create')
      setSlug(''); setLabel(''); setUrl('')
      await load()
      // copy client link to clipboard
      const link = `${process.env.NEXT_PUBLIC_APP_BASE_URL || window.location.origin}/edit/${j.created.client_edit_token}`
      await navigator.clipboard.writeText(link)
      alert('Tag created. Client edit link copied to clipboard.')
    } catch (e: any) {
      setError(e.message)
    } finally {
      setCreating(false)
    }
  }

  const appBase = useMemo(() => (typeof window !== 'undefined' ? window.location.origin : ''), [])

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold">Tags</h1>
            <p className="text-neutral-300">Create, list, and copy client edit links.</p>
          </div>
          <a href="/admin/logout" className="px-3 py-2 rounded bg-neutral-800 hover:bg-neutral-700 text-sm">Logout</a>
        </div>
      </div>

      <form className="grid gap-3 sm:grid-cols-4 items-end" onSubmit={onCreate}>
        <div>
          <label className="block text-sm text-neutral-300 mb-1">Slug</label>
          <input value={slug} onChange={(e)=>setSlug(e.target.value)} required placeholder="demo-2" className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800" />
        </div>
        <div>
          <label className="block text-sm text-neutral-300 mb-1">Label</label>
          <input value={label} onChange={(e)=>setLabel(e.target.value)} placeholder="Optional label" className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800" />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm text-neutral-300 mb-1">Destination URL</label>
          <input type="url" value={url} onChange={(e)=>setUrl(e.target.value)} required placeholder="https://target.com" className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800" />
        </div>
        <button disabled={creating} className="px-3 py-2 rounded bg-blue-600 hover:bg-blue-500 disabled:opacity-60">{creating ? 'Creating…' : 'Create tag'}</button>
      </form>

      {error && <p className="text-red-400">Error: {error}</p>}

      <div className="rounded-lg border border-neutral-800 overflow-x-auto">
        <table className="w-full min-w-[900px] text-sm">
          <thead className="bg-neutral-900 text-neutral-300">
            <tr>
              <th className="text-left p-3">Label</th>
              <th className="text-left p-3">Slug</th>
              <th className="text-left p-3">Destination URL</th>
              <th className="text-left p-3">Scans</th>
              <th className="text-left p-3">Time</th>
              <th className="text-left p-3">Tag URL</th>
              <th className="text-left p-3">Updated</th>
              <th className="text-left p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td className="p-3" colSpan={5}>Loading…</td></tr>
            )}
            {!loading && items.length === 0 && (
              <tr><td className="p-3" colSpan={5}>No tags yet.</td></tr>
            )}
            {items.map(t => (
              <tr key={t.id} className="border-t border-neutral-800">
                <td className="p-3">{t.label ?? '—'}</td>
                <td className="p-3">{t.slug}</td>
                <td className="p-3 truncate max-w-[32ch]"><a className="text-blue-400 hover:underline" href={t.current_url} target="_blank" rel="noreferrer">{t.current_url}</a></td>
                <td className="p-3">{stats[t.id]?.count ?? '—'}</td>
                <td className="p-3">{stats[t.id]?.last_scanned ? new Intl.DateTimeFormat('en-CA', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'America/Edmonton' }).format(new Date(stats[t.id]!.last_scanned!)) : '—'}</td>
                <td className="p-3 truncate max-w-[28ch]">
                  <div className="flex items-center gap-2">
                    <a className="text-blue-400 hover:underline" href={`${appBase}/r/${t.slug}`} target="_blank" rel="noreferrer">/r/{t.slug}</a>
                    <button onClick={async()=>{ await navigator.clipboard.writeText(`${appBase}/r/${t.slug}`); }} className="px-2 py-0.5 rounded bg-neutral-800 hover:bg-neutral-700 text-xs">Copy</button>
                  </div>
                </td>
                <td className="p-3">{new Intl.DateTimeFormat('en-CA', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'America/Edmonton' }).format(new Date(t.updated_at))}</td>
                <td className="p-3 space-x-2">
                  <button onClick={async()=>{ await navigator.clipboard.writeText(`${appBase}/edit/${t.client_edit_token ?? ''}`); alert('Client link copied.') }} className="px-2 py-1 rounded bg-neutral-800 hover:bg-neutral-700">Copy client link</button>
                  <button onClick={async()=>{ await navigator.clipboard.writeText(`${appBase}/a/${t.client_edit_token ?? ''}`); alert('Client analytics link copied.') }} className="px-2 py-1 rounded bg-neutral-800 hover:bg-neutral-700">Copy analytics link</button>
                  <button onClick={async()=>{ if (confirm('Delete this tag?')) { const r = await fetch(`/api/admin/tags?id=${t.id}`, { method: 'DELETE' }); if (r.ok) { await load() } else { const j = await r.json().catch(()=>({})); alert('Delete failed: ' + (j.error||'unknown')) } } }} className="px-2 py-1 rounded bg-red-700 hover:bg-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
