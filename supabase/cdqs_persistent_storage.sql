-- CDQS persistent storage for the static Threshold site.
-- Run this in Supabase SQL Editor, then set:
-- NEXT_PUBLIC_SUPABASE_URL
-- NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY
--
-- IMPORTANT:
-- Replace 'CHANGE-ME-CDQS-ADMIN-PIN' before running.
-- The admin PIN is checked inside SECURITY DEFINER functions so public clients
-- do not get direct table read/update policies.

create extension if not exists pgcrypto;

create table if not exists public.cdqs_admin_settings (
  id boolean primary key default true,
  admin_pin_hash text not null,
  created_at timestamptz not null default now(),
  constraint cdqs_admin_settings_singleton check (id)
);

insert into public.cdqs_admin_settings (id, admin_pin_hash)
values (true, crypt('CHANGE-ME-CDQS-ADMIN-PIN', gen_salt('bf')))
on conflict (id) do nothing;

create table if not exists public.cdqs_applications (
  id text primary key,
  full_name text not null,
  email text not null,
  phone text not null,
  role text,
  company text,
  years_experience text,
  city text,
  goal text not null,
  payment_preference text,
  status text not null default 'new',
  revenue_aed integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.cdqs_certificates (
  id uuid primary key default gen_random_uuid(),
  certificate_number text unique not null,
  student_name text not null,
  role_title text not null,
  cohort_name text not null default 'CDQS Cohort 001',
  issue_date date not null default current_date,
  verifier_name text not null default 'Threshold Technologies',
  verification_token text unique not null default encode(gen_random_bytes(24), 'hex'),
  status text not null default 'active',
  created_at timestamptz not null default now()
);

alter table public.cdqs_admin_settings enable row level security;
alter table public.cdqs_applications enable row level security;
alter table public.cdqs_certificates enable row level security;

drop policy if exists "Public can submit CDQS applications" on public.cdqs_applications;
create policy "Public can submit CDQS applications"
on public.cdqs_applications
for insert
to anon, authenticated
with check (true);

-- No direct SELECT policy for applications or certificates.
-- Read access goes through the functions below.

create or replace function public.cdqs_admin_pin_valid(p_admin_pin text)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.cdqs_admin_settings
    where id = true
      and admin_pin_hash = crypt(p_admin_pin, admin_pin_hash)
  );
$$;

revoke all on function public.cdqs_admin_pin_valid(text) from public;

create or replace function public.cdqs_admin_list_applications(p_admin_pin text)
returns table (
  id text,
  full_name text,
  email text,
  phone text,
  role text,
  company text,
  years_experience text,
  city text,
  goal text,
  payment_preference text,
  status text,
  revenue_aed integer,
  created_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.cdqs_admin_pin_valid(p_admin_pin) then
    raise exception 'Invalid admin PIN';
  end if;

  return query
  select
    a.id,
    a.full_name,
    a.email,
    a.phone,
    a.role,
    a.company,
    a.years_experience,
    a.city,
    a.goal,
    a.payment_preference,
    a.status,
    a.revenue_aed,
    a.created_at
  from public.cdqs_applications a
  order by a.created_at desc;
end;
$$;

grant execute on function public.cdqs_admin_list_applications(text) to anon, authenticated;

create or replace function public.cdqs_admin_create_certificate(
  p_admin_pin text,
  p_certificate_number text,
  p_student_name text,
  p_role_title text,
  p_cohort_name text,
  p_issue_date date,
  p_verifier_name text
)
returns table (
  id uuid,
  certificate_number text,
  student_name text,
  role_title text,
  cohort_name text,
  issue_date date,
  verifier_name text,
  verification_token text,
  status text
)
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.cdqs_admin_pin_valid(p_admin_pin) then
    raise exception 'Invalid admin PIN';
  end if;

  return query
  insert into public.cdqs_certificates (
    certificate_number,
    student_name,
    role_title,
    cohort_name,
    issue_date,
    verifier_name
  )
  values (
    p_certificate_number,
    p_student_name,
    p_role_title,
    p_cohort_name,
    p_issue_date,
    p_verifier_name
  )
  on conflict (certificate_number) do update set
    student_name = excluded.student_name,
    role_title = excluded.role_title,
    cohort_name = excluded.cohort_name,
    issue_date = excluded.issue_date,
    verifier_name = excluded.verifier_name
  returning
    cdqs_certificates.id,
    cdqs_certificates.certificate_number,
    cdqs_certificates.student_name,
    cdqs_certificates.role_title,
    cdqs_certificates.cohort_name,
    cdqs_certificates.issue_date,
    cdqs_certificates.verifier_name,
    cdqs_certificates.verification_token,
    cdqs_certificates.status;
end;
$$;

grant execute on function public.cdqs_admin_create_certificate(text, text, text, text, text, date, text) to anon, authenticated;

create or replace function public.cdqs_verify_certificate(p_verification_token text)
returns table (
  id uuid,
  certificate_number text,
  student_name text,
  role_title text,
  cohort_name text,
  issue_date date,
  verifier_name text,
  verification_token text,
  status text
)
language sql
security definer
set search_path = public
as $$
  select
    c.id,
    c.certificate_number,
    c.student_name,
    c.role_title,
    c.cohort_name,
    c.issue_date,
    c.verifier_name,
    c.verification_token,
    c.status
  from public.cdqs_certificates c
  where c.verification_token = p_verification_token
  limit 1;
$$;

grant execute on function public.cdqs_verify_certificate(text) to anon, authenticated;

create table if not exists public.cdqs_registry_profiles (
  id uuid primary key default gen_random_uuid(),
  application_id text unique references public.cdqs_applications(id) on delete set null,
  full_name text not null,
  email text not null,
  title text,
  company text,
  location text not null default 'UAE',
  linkedin text,
  certification text not null default 'CDQS',
  cohort text not null default 'CDQS Cohort 001',
  status text not null default 'candidate',
  registration_number text unique not null,
  profile_token text unique not null default encode(gen_random_bytes(24), 'hex'),
  issued_at date,
  valid_until date,
  created_at timestamptz not null default now()
);

create table if not exists public.cdqs_registry_evidence (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.cdqs_registry_profiles(id) on delete cascade,
  title text not null,
  category text not null,
  file_name text,
  notes text,
  status text not null default 'submitted',
  admin_feedback text,
  submitted_at timestamptz not null default now(),
  reviewed_at timestamptz
);

alter table public.cdqs_registry_profiles enable row level security;
alter table public.cdqs_registry_evidence enable row level security;

create or replace function public.cdqs_admin_accept_application(
  p_admin_pin text,
  p_application_id text,
  p_revenue_aed integer default 2500
)
returns table (
  id uuid,
  application_id text,
  full_name text,
  email text,
  title text,
  company text,
  location text,
  linkedin text,
  certification text,
  cohort text,
  status text,
  registration_number text,
  profile_token text,
  issued_at date,
  valid_until date
)
language plpgsql
security definer
set search_path = public
as $$
declare
  next_registration text;
begin
  if not public.cdqs_admin_pin_valid(p_admin_pin) then
    raise exception 'Invalid admin PIN';
  end if;

  update public.cdqs_applications a
  set status = 'paid',
      revenue_aed = p_revenue_aed
  where a.id = p_application_id;

  select 'TPR-CDQS-' || lpad((count(*) + 1)::text, 3, '0')
  into next_registration
  from public.cdqs_registry_profiles;

  return query
  insert into public.cdqs_registry_profiles (
    application_id,
    full_name,
    email,
    title,
    company,
    location,
    certification,
    cohort,
    status,
    registration_number
  )
  select
    a.id,
    a.full_name,
    a.email,
    coalesce(nullif(a.role, ''), 'Quantity Surveyor'),
    coalesce(a.company, ''),
    coalesce(nullif(a.city, ''), 'UAE'),
    'CDQS',
    'CDQS Cohort 001',
    'candidate',
    next_registration
  from public.cdqs_applications a
  where a.id = p_application_id
  on conflict (application_id) do update set
    full_name = excluded.full_name,
    email = excluded.email,
    title = excluded.title,
    company = excluded.company,
    location = excluded.location
  returning
    cdqs_registry_profiles.id,
    cdqs_registry_profiles.application_id,
    cdqs_registry_profiles.full_name,
    cdqs_registry_profiles.email,
    cdqs_registry_profiles.title,
    cdqs_registry_profiles.company,
    cdqs_registry_profiles.location,
    cdqs_registry_profiles.linkedin,
    cdqs_registry_profiles.certification,
    cdqs_registry_profiles.cohort,
    cdqs_registry_profiles.status,
    cdqs_registry_profiles.registration_number,
    cdqs_registry_profiles.profile_token,
    cdqs_registry_profiles.issued_at,
    cdqs_registry_profiles.valid_until;
end;
$$;

grant execute on function public.cdqs_admin_accept_application(text, text, integer) to anon, authenticated;

create or replace function public.cdqs_registry_get_profile(p_profile_token text)
returns table (
  id uuid,
  application_id text,
  full_name text,
  email text,
  title text,
  company text,
  location text,
  linkedin text,
  certification text,
  cohort text,
  status text,
  registration_number text,
  profile_token text,
  issued_at date,
  valid_until date
)
language sql
security definer
set search_path = public
as $$
  select
    p.id,
    p.application_id,
    p.full_name,
    p.email,
    p.title,
    p.company,
    p.location,
    p.linkedin,
    p.certification,
    p.cohort,
    p.status,
    p.registration_number,
    p.profile_token,
    p.issued_at,
    p.valid_until
  from public.cdqs_registry_profiles p
  where p.profile_token = p_profile_token
  limit 1;
$$;

grant execute on function public.cdqs_registry_get_profile(text) to anon, authenticated;

create or replace function public.cdqs_registry_list_evidence(p_profile_token text)
returns table (
  id uuid,
  profile_id uuid,
  title text,
  category text,
  file_name text,
  notes text,
  status text,
  submitted_at timestamptz
)
language sql
security definer
set search_path = public
as $$
  select
    e.id,
    e.profile_id,
    e.title,
    e.category,
    e.file_name,
    e.notes,
    e.status,
    e.submitted_at
  from public.cdqs_registry_evidence e
  join public.cdqs_registry_profiles p on p.id = e.profile_id
  where p.profile_token = p_profile_token
  order by e.submitted_at desc;
$$;

grant execute on function public.cdqs_registry_list_evidence(text) to anon, authenticated;

create or replace function public.cdqs_registry_submit_evidence(
  p_profile_token text,
  p_title text,
  p_category text,
  p_file_name text,
  p_notes text
)
returns table (
  id uuid,
  profile_id uuid,
  title text,
  category text,
  file_name text,
  notes text,
  status text,
  submitted_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
declare
  target_profile_id uuid;
begin
  select p.id into target_profile_id
  from public.cdqs_registry_profiles p
  where p.profile_token = p_profile_token;

  if target_profile_id is null then
    raise exception 'Invalid profile token';
  end if;

  update public.cdqs_registry_profiles
  set status = 'evidence_submitted'
  where id = target_profile_id
    and status = 'candidate';

  return query
  insert into public.cdqs_registry_evidence (
    profile_id,
    title,
    category,
    file_name,
    notes
  )
  values (
    target_profile_id,
    p_title,
    p_category,
    p_file_name,
    p_notes
  )
  returning
    cdqs_registry_evidence.id,
    cdqs_registry_evidence.profile_id,
    cdqs_registry_evidence.title,
    cdqs_registry_evidence.category,
    cdqs_registry_evidence.file_name,
    cdqs_registry_evidence.notes,
    cdqs_registry_evidence.status,
    cdqs_registry_evidence.submitted_at;
end;
$$;

grant execute on function public.cdqs_registry_submit_evidence(text, text, text, text, text) to anon, authenticated;

create or replace function public.cdqs_admin_list_registry_profiles(p_admin_pin text)
returns table (
  id uuid,
  application_id text,
  full_name text,
  email text,
  title text,
  company text,
  location text,
  linkedin text,
  certification text,
  cohort text,
  status text,
  registration_number text,
  profile_token text,
  issued_at date,
  valid_until date
)
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.cdqs_admin_pin_valid(p_admin_pin) then
    raise exception 'Invalid admin PIN';
  end if;

  return query
  select
    p.id,
    p.application_id,
    p.full_name,
    p.email,
    p.title,
    p.company,
    p.location,
    p.linkedin,
    p.certification,
    p.cohort,
    p.status,
    p.registration_number,
    p.profile_token,
    p.issued_at,
    p.valid_until
  from public.cdqs_registry_profiles p
  order by p.created_at desc;
end;
$$;

grant execute on function public.cdqs_admin_list_registry_profiles(text) to anon, authenticated;

create or replace function public.cdqs_admin_list_evidence(p_admin_pin text, p_profile_id uuid)
returns table (
  id uuid,
  profile_id uuid,
  title text,
  category text,
  file_name text,
  notes text,
  status text,
  submitted_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.cdqs_admin_pin_valid(p_admin_pin) then
    raise exception 'Invalid admin PIN';
  end if;

  return query
  select
    e.id,
    e.profile_id,
    e.title,
    e.category,
    e.file_name,
    e.notes,
    e.status,
    e.submitted_at
  from public.cdqs_registry_evidence e
  where e.profile_id = p_profile_id
  order by e.submitted_at desc;
end;
$$;

grant execute on function public.cdqs_admin_list_evidence(text, uuid) to anon, authenticated;

create or replace function public.cdqs_admin_review_evidence(
  p_admin_pin text,
  p_evidence_id uuid,
  p_review_status text
)
returns table (
  id uuid,
  profile_id uuid,
  title text,
  category text,
  file_name text,
  notes text,
  status text,
  submitted_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.cdqs_admin_pin_valid(p_admin_pin) then
    raise exception 'Invalid admin PIN';
  end if;

  return query
  update public.cdqs_registry_evidence e
  set status = p_review_status,
      reviewed_at = now()
  where e.id = p_evidence_id
  returning
    e.id,
    e.profile_id,
    e.title,
    e.category,
    e.file_name,
    e.notes,
    e.status,
    e.submitted_at;
end;
$$;

grant execute on function public.cdqs_admin_review_evidence(text, uuid, text) to anon, authenticated;

create or replace function public.cdqs_admin_approve_registry_profile(p_admin_pin text, p_profile_id uuid)
returns table (
  id uuid,
  application_id text,
  full_name text,
  email text,
  title text,
  company text,
  location text,
  linkedin text,
  certification text,
  cohort text,
  status text,
  registration_number text,
  profile_token text,
  issued_at date,
  valid_until date
)
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.cdqs_admin_pin_valid(p_admin_pin) then
    raise exception 'Invalid admin PIN';
  end if;

  return query
  update public.cdqs_registry_profiles p
  set status = 'verified',
      issued_at = current_date,
      valid_until = current_date + 730
  where p.id = p_profile_id
  returning
    p.id,
    p.application_id,
    p.full_name,
    p.email,
    p.title,
    p.company,
    p.location,
    p.linkedin,
    p.certification,
    p.cohort,
    p.status,
    p.registration_number,
    p.profile_token,
    p.issued_at,
    p.valid_until;
end;
$$;

grant execute on function public.cdqs_admin_approve_registry_profile(text, uuid) to anon, authenticated;

-- If your Supabase project has "new tables are not automatically exposed"
-- enabled, expose these objects to the Data API in Dashboard settings or grant
-- schema/table/function access according to your project policy.
