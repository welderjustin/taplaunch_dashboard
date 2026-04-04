-- Separate scans table (distinct from tag_audit which tracks URL changes)
create table if not exists public.tag_scans (
  id bigserial primary key,
  tag_id uuid not null references public.tags(id) on delete cascade,
  scanned_at timestamptz not null default now(),
  user_info jsonb
);

alter table public.tag_scans enable row level security;
create policy "allow read all scans" on public.tag_scans for select using (true);
