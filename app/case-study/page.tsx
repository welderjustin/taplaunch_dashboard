export default function CaseStudyPage() {
  return (
    <main className="prose prose-invert max-w-3xl mx-auto p-6">
      <h1>TapLaunch Dashboard — Case Study</h1>
      <h2>Overview</h2>
      <p>A full-stack dashboard to manage NFC tag redirects and view real-time scan analytics, with a client-friendly edit link and secure admin access.</p>
      <h2>Problem</h2>
      <ul>
        <li>Manage NFC tag destinations without exposing full admin access</li>
        <li>Track scans and last-activity quickly</li>
      </ul>
      <h2>Solution</h2>
      <ul>
        <li>Next.js app with Admin dashboard, Client edit page, and analytics logging</li>
        <li>In‑app sign‑in (short session) for admin routes</li>
        <li>Deployed on Vercel, data in Supabase (Postgres)</li>
      </ul>
      <h2>Stack</h2>
      <ul>
        <li>Frontend: Next.js (App Router), Tailwind CSS</li>
        <li>Backend: Next.js API routes (analytics, admin CRUD)</li>
        <li>Database: Supabase (Postgres)</li>
        <li>Hosting/CI: Vercel (auto‑deploy on push)</li>
        <li>Auth: In‑app sign‑in (2‑minute TTL)</li>
      </ul>
      <h2>Key Features</h2>
      <ul>
        <li>Admin → Tags: Destination URL, Scans, Time (last scan), Tag URL, Updated, Actions</li>
        <li>Actions: Open edit, Copy client link, Copy analytics link, Delete</li>
        <li>Client Edit: Scoped update to Destination URL via tokenized link</li>
        <li>Analytics: Logs scans (tag_scans) and shows count + last scanned (America/Edmonton)</li>
        <li>Mobile: Responsive table with horizontal scroll</li>
      </ul>
      <h2>Notable Decisions</h2>
      <ul>
        <li>Separate tag_scans table from audit trails</li>
        <li>Log on redirect to ensure analytics coverage</li>
        <li>Replace Basic Auth (browser-cached) with app sign‑in + short TTL</li>
      </ul>
      <h2>Challenges → Fixes</h2>
      <ul>
        <li>Header clarity → Standardized headers</li>
        <li>Basic Auth caching → App-level sign‑in (2‑minute TTL) + Logout</li>
        <li>Workflow → After Save on edit page, auto‑redirect back to Admin</li>
      </ul>
      <h2>Impact</h2>
      <p>Production‑ready admin with secure access, fast edits, and visible analytics. Iterated quickly from live feedback to improve UX and security.</p>
      <h2>Links</h2>
      <ul>
        <li>Admin: <a href="/admin/tags">/admin/tags</a></li>
        <li>Sign‑in: <a href="/admin/signin">/admin/signin</a></li>
        <li>Repo: <a href="https://github.com/welderjustin/taplaunch_dashboard">github.com/welderjustin/taplaunch_dashboard</a></li>
        <li>Supabase Project: <a href="https://xxzlywzgmzyfualxejow.supabase.co">supabase.co project</a></li>
      </ul>
      <h2>Roadmap</h2>
      <ul>
        <li>User accounts/roles (Supabase Auth)</li>
        <li>Client alerts (scan spikes, URL change notifications)</li>
        <li>Payments (subscriptions)</li>
        <li>Filters/search, bulk actions</li>
        <li>Analytics detail by time window</li>
      </ul>
    </main>
  )
}
