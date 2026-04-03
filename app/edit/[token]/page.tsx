'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function ClientEditPage({ params }: { params: { token: string } }) {
  const { token } = params
  const [url, setUrl] = useState('')
  const [status, setStatus] = useState<null | 'saving' | 'ok' | string>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('saving')
    try {
      const res = await fetch('/api/edit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, url }),
      })
      const j = await res.json()
      if (!res.ok) throw new Error(j?.error || 'Failed')
      setStatus('ok')
    } catch (err: any) {
      setStatus(err.message)
    }
  }

  return (
    <div className="space-y-4 max-w-xl">
      <h1 className="text-xl font-semibold">Update Link</h1>
      <p className="text-neutral-300">You’re updating the redirect for your NFC tag.</p>
      <form className="space-y-3" onSubmit={onSubmit}>
        <div>
          <label className="block text-sm text-neutral-300 mb-1">New URL</label>
          <input
            type="url"
            name="url"
            placeholder="https://your-target.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 outline-none focus:ring-2 ring-blue-500"
          />
        </div>
        <button disabled={status==='saving'} type="submit" className="px-3 py-2 rounded bg-blue-600 hover:bg-blue-500 disabled:opacity-60">
          {status==='saving' ? 'Saving…' : 'Save'}
        </button>
      </form>
      {status==='ok' && <p className="text-green-400">Saved. Your tag will now redirect to the new URL.</p>}
      {status && status!=='ok' && status!=='saving' && <p className="text-red-400">Error: {status}</p>}
      <p className="text-xs text-neutral-400">Token: {token}</p>
      <p className="text-neutral-300">Need help? <Link className="text-blue-400 hover:underline" href="/">Contact admin</Link></p>
    </div>
  )
}
