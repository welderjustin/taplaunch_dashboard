"use client"
import { useState } from 'react'

export default function AdminSignIn() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null
  const next = params?.get('next') || '/admin/tags'

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    const res = await fetch('/api/admin/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, next }),
    })
    if (res.redirected) {
      window.location.href = res.url
      return
    }
    if (!res.ok) {
      const j = await res.json().catch(()=>({}))
      setError(j.error || 'Invalid password')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-neutral-100 p-6">
      <form onSubmit={onSubmit} className="w-full max-w-sm space-y-4 border border-neutral-800 p-5 rounded">
        <h1 className="text-lg font-semibold">Admin sign in</h1>
        <p className="text-sm text-neutral-400">Enter the admin password to continue.</p>
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800" placeholder="Password" />
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button className="w-full px-3 py-2 rounded bg-blue-600 hover:bg-blue-500">Continue</button>
      </form>
    </div>
  )
}
