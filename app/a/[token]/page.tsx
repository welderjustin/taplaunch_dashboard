'use client'
import { useEffect, useState } from 'react'

export default function ClientAnalyticsPage({ params }: { params: { token: string } }) {
  const { token } = params
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [summary, setSummary] = useState<{ count: number; last_scanned: string | null } | null>(null)
  const [tag, setTag] = useState<{ slug: string; label: string | null; current_url: string; updated_at: string } | null>(null)

  useEffect(() => {
    (async () => {
      setLoading(true)
      setError(null)
      try {
        const r = await fetch(`/api/analytics/by-token?token=${token}`, { cache: 'no-store' })
        const j = await r.json()
        if (!r.ok) throw new Error(j?.error || 'Failed')
        setSummary(j.summary)
        setTag(j.tag)
      } catch (e: any) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    })()
  }, [token])

  return (
    <div className="space-y-4 max-w-2xl">
      <h1 className="text-xl font-semibold">Tag Analytics</h1>
      {error && <p className="text-red-400">Error: {error}</p>}
      {loading && <p>Loading…</p>}
      {tag && (
        <div className="rounded border border-neutral-800 p-3">
          <div className="text-neutral-300 text-sm">Slug</div>
          <div className="mb-3">{tag.slug}</div>
          <div className="text-neutral-300 text-sm">Current URL</div>
          <div className="truncate"><a className="text-blue-400 hover:underline" href={tag.current_url} target="_blank" rel="noreferrer">{tag.current_url}</a></div>
        </div>
      )}
      {summary && (
        <div className="rounded border border-neutral-800 p-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-neutral-300 text-sm">Total scans</div>
              <div className="text-2xl font-semibold">{summary.count}</div>
            </div>
            <div>
              <div className="text-neutral-300 text-sm">Last scanned</div>
              <div>{summary.last_scanned ? new Date(summary.last_scanned).toLocaleString() : '—'}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
