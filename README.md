# TapLaunch Dashboard (NFC Control Panel)

A minimal control UI to manage NFC tag redirects.

What it includes (v1)
- Admin panel: list/search tags, edit target URL, view change history, generate client edit links
- Client edit page: scoped update form (no auth account needed)
- Redirect endpoint: /r/[slug] → 302 to current_url
- Dark mode, responsive UI (Tailwind)

Stack
- Next.js (App Router)
- Tailwind CSS (dark theme)
- Supabase (Postgres + Auth)
- Deploy: Vercel

Quick start
1) Clone this repo
2) Copy your logo to public/brand/taplaunch_logo_master.png (see Logo section)
3) Install deps: `npm install`
4) Run dev: `npm run dev`

Environment
- Copy `.env.example` to `.env.local` and fill:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
APP_BASE_URL=http://localhost:3000
ADMIN_USER=your_admin_username
ADMIN_PASS=your_admin_password
```

Basic auth (optional)
- Set ADMIN_USER and ADMIN_PASS to protect /admin and /api/admin with HTTP Basic Auth.
- For Vercel, add both vars in Project → Settings → Environment Variables, then redeploy.

Supabase setup
1) Create a new project at supabase.com
2) Open SQL editor and run `sql/initial.sql`
3) Add the keys to `.env.local`

Deploy (Vercel)
- Connect this GitHub repo in Vercel
- Set the same env vars on Vercel
- Deploy → you’ll get https://<project>.vercel.app

Paths
- Admin: /admin/tags
- Client edit: /edit/[token]
- Redirect: /r/[slug]

Logo
- Place your file at `public/brand/taplaunch_logo_master.png`
  (Source you provided: /home/owner/.openclaw/workspace/projects/nfc-sites/brand/taplaunch_logo_master.png)

Notes
- v1 uses server API routes and Supabase service key for token-verified client updates. Admin routes require session auth (to be completed after Supabase setup).

---

To do next
- Wire Supabase auth for admin pages
- Implement token verification in /api/edit for client updates
- Add audit trail table writes on every change

