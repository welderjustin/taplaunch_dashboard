# TapLaunch Dashboard — Case Study

## Overview
A full-stack dashboard to manage NFC tag redirects and view real-time scan analytics, with a client-friendly edit link and secure admin access.

## Problem
- Manage NFC tag destinations without exposing full admin access
- Track scans and last-activity quickly

## Solution
- Next.js app with Admin dashboard, Client edit page, and analytics logging
- In‑app sign‑in (short session) for admin routes
- Deployed on Vercel, data in Supabase (Postgres)

## Stack
- Frontend: Next.js (App Router), Tailwind CSS
- Backend: Next.js API routes (analytics, admin CRUD)
- Database: Supabase (Postgres)
- Hosting/CI: Vercel (auto‑deploy on push)
- Auth: In‑app sign‑in (2‑minute TTL)

## Key Features
- Admin → Tags: Destination URL, Scans, Time (last scan), Tag URL, Updated, Actions
- Actions: Open edit, Copy client link, Copy analytics link, Delete
- Client Edit: Scoped update to Destination URL via tokenized link
- Analytics: Logs scans (tag_scans) and shows count + last scanned (America/Edmonton)
- Mobile: Responsive table with horizontal scroll

## Notable Decisions
- Separate tag_scans table from audit trails
- Log on redirect to ensure analytics coverage
- Replace Basic Auth (browser-cached) with app sign‑in + short TTL

## Challenges → Fixes
- Header clarity → Standardized headers
- Basic Auth caching → App-level sign‑in (2‑minute TTL) + Logout
- Workflow → After Save on edit page, auto‑redirect back to Admin

## Impact
- Production‑ready admin with secure access, fast edits, and visible analytics
- Iterated quickly from live feedback to improve UX and security

## Links
- Admin: https://taplaunch-dashboard-16z6.vercel.app/admin/tags
- Sign‑in: https://taplaunch-dashboard-16z6.vercel.app/admin/signin
- Repo: https://github.com/welderjustin/taplaunch_dashboard
- Supabase Project: https://xxzlywzgmzyfualxejow.supabase.co

## Roadmap
- User accounts/roles (Supabase Auth)
- Client alerts (scan spikes, URL change notifications)
- Payments (subscriptions)
- Filters/search, bulk actions
- Analytics detail by time window
