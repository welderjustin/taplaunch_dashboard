import Link from 'next/link'

export default function ClientEditPage({ params }: { params: { token: string } }) {
  const { token } = params
  return (
    <div className="space-y-4 max-w-xl">
      <h1 className="text-xl font-semibold">Update Link</h1>
      <p className="text-neutral-300">You’re updating the redirect for your NFC tag.</p>
      <form className="space-y-3">
        <div>
          <label className="block text-sm text-neutral-300 mb-1">New URL</label>
          <input
            type="url"
            name="url"
            placeholder="https://your-target.com"
            className="w-full px-3 py-2 rounded bg-neutral-900 border border-neutral-800 outline-none focus:ring-2 ring-blue-500"
          />
        </div>
        <button type="submit" className="px-3 py-2 rounded bg-blue-600 hover:bg-blue-500">Save</button>
      </form>
      <p className="text-xs text-neutral-400">Token: {token}</p>
      <p className="text-neutral-300">Need help? <Link className="text-blue-400 hover:underline" href="/">Contact admin</Link></p>
    </div>
  )
}
