-- Tables
create table if not exists public.tags (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  label text,
  current_url text not null,
  client_edit_token text unique not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.tag_audit (
  id bigserial primary key,
  tag_id uuid not null references public.tags(id) on delete cascade,
  old_url text,
  new_url text not null,
  changed_by text not null check (changed_by in ('admin','client')),
  changed_at timestamptz not null default now()
);

-- Update trigger for updated_at
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_tags_updated_at on public.tags;
create trigger set_tags_updated_at
before update on public.tags
for each row execute function public.set_updated_at();

-- RLS (enable and define as needed)
alter table public.tags enable row level security;
alter table public.tag_audit enable row level security;

-- Basic permissive policies for now (tighten when wiring auth)
create policy "allow read all" on public.tags for select using (true);
create policy "allow read all audit" on public.tag_audit for select using (true);
