-- ============================================================
-- PFF32 // Tschakka! — Supabase Schema (Stufe B)
-- ============================================================
-- Dieses Skript läuft einmal im Supabase SQL-Editor.
-- Es ist idempotent (kann mehrfach ausgeführt werden).
-- ============================================================

-- ---------- profiles ----------
-- Erweitert auth.users um einen menschenlesbaren Username.
create table if not exists public.profiles (
  id          uuid        primary key references auth.users(id) on delete cascade,
  username    text        not null unique,
  created_at  timestamptz not null default now()
);

create index if not exists profiles_username_idx
  on public.profiles (lower(username));

-- ---------- student_progress ----------
-- Ein JSON-Blob pro Schüler. Wir speichern den kompletten App-State
-- als jsonb (xp, level, streak, completed[], achievements …).
create table if not exists public.student_progress (
  user_id     uuid        primary key references auth.users(id) on delete cascade,
  state       jsonb       not null default '{}'::jsonb,
  updated_at  timestamptz not null default now()
);

create index if not exists student_progress_updated_idx
  on public.student_progress (updated_at desc);

-- ---------- RLS aktivieren ----------
alter table public.profiles          enable row level security;
alter table public.student_progress  enable row level security;

-- ---------- Policies: profiles ----------
-- Der Username-Index ist öffentlich lesbar, damit der Client die
-- Eindeutigkeit beim Registrieren prüfen kann. Es ist kein Klarname.
drop policy if exists "profiles_select_all"   on public.profiles;
drop policy if exists "profiles_insert_own"   on public.profiles;
drop policy if exists "profiles_update_own"   on public.profiles;

create policy "profiles_select_all"
  on public.profiles for select
  using (true);

create policy "profiles_insert_own"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id);

-- ---------- Policies: student_progress ----------
-- Jeder sieht NUR den eigenen Fortschritt.
drop policy if exists "progress_select_own"  on public.student_progress;
drop policy if exists "progress_insert_own"  on public.student_progress;
drop policy if exists "progress_update_own"  on public.student_progress;
drop policy if exists "progress_upsert_own"  on public.student_progress;

create policy "progress_select_own"
  on public.student_progress for select
  using (auth.uid() = user_id);

create policy "progress_insert_own"
  on public.student_progress for insert
  with check (auth.uid() = user_id);

create policy "progress_update_own"
  on public.student_progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ---------- Auto-Update updated_at ----------
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists progress_touch_updated_at on public.student_progress;
create trigger progress_touch_updated_at
  before update on public.student_progress
  for each row execute function public.touch_updated_at();

-- ============================================================
-- Fertig.
-- ============================================================
