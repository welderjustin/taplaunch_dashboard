import Link from 'next/link'

export default function Home() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Welcome</h1>
      <p className="text-neutral-300">This is the TapLaunch NFC control panel.</p>
      <ul className="list-disc list-inside text-neutral-300">
        <li>
          <Link className="text-blue-400 hover:underline" href="/admin/tags">Go to Admin → Tags</Link>
        </li>
        <li>
          Client edit links will look like <code className="px-1 py-0.5 bg-neutral-900 rounded">/edit/&lt;token&gt;</code>
        </li>
        <li>
          NFC redirect URLs will look like <code className="px-1 py-0.5 bg-neutral-900 rounded">/r/&lt;slug&gt;</code>
        </li>
      </ul>
    </div>
  )
}
