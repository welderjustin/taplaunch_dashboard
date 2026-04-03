export default function AdminTagsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Tags</h1>
        <p className="text-neutral-300">Admin view (placeholder). Search, create, edit, and copy client links will go here.</p>
      </div>
      <div className="rounded-lg border border-neutral-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-neutral-900 text-neutral-300">
            <tr>
              <th className="text-left p-3">Label</th>
              <th className="text-left p-3">Slug</th>
              <th className="text-left p-3">Current URL</th>
              <th className="text-left p-3">Updated</th>
              <th className="text-left p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-neutral-800">
              <td className="p-3">Example Tag</td>
              <td className="p-3">example</td>
              <td className="p-3 truncate max-w-[24ch]"><a className="text-blue-400 hover:underline" href="#">https://example.com</a></td>
              <td className="p-3">—</td>
              <td className="p-3 space-x-2">
                <button className="px-2 py-1 rounded bg-neutral-800 hover:bg-neutral-700">Edit</button>
                <button className="px-2 py-1 rounded bg-neutral-800 hover:bg-neutral-700">Copy client link</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
