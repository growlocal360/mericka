-- =========================================================================
-- Mericka Group — Database schema
-- Paste into Supabase SQL Editor. Safe to re-run.
-- =========================================================================

drop table if exists contact_submissions cascade;
drop table if exists project_images cascade;
drop table if exists projects cascade;
drop table if exists services cascade;
drop table if exists sectors cascade;
drop table if exists news_articles cascade;
drop table if exists job_postings cascade;
drop table if exists locations cascade;
drop table if exists team_members cascade;
drop table if exists approved_emails cascade;

create extension if not exists "uuid-ossp";

create table approved_emails (
  id uuid default uuid_generate_v4() primary key,
  email text unique not null,
  created_at timestamptz default now()
);

create table team_members (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  title text not null,
  bio text,
  photo_url text,
  email text,
  phone text,
  display_order integer default 0,
  published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table services (
  id uuid default uuid_generate_v4() primary key,
  slug text unique not null,
  name text not null,
  tagline text,
  description jsonb,
  hero_image_url text,
  icon text,
  phase text check (phase in ('pre-construction','execution','maintenance-outage')),
  display_order integer default 0,
  published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table sectors (
  id uuid default uuid_generate_v4() primary key,
  slug text unique not null,
  name text not null,
  description jsonb,
  icon text,
  hero_image_url text,
  display_order integer default 0,
  published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table projects (
  id uuid default uuid_generate_v4() primary key,
  slug text unique not null,
  title text not null,
  client text,
  location text,
  excerpt text,
  description jsonb,
  featured_image text,
  services_used text[] default '{}',
  sectors text[] default '{}',
  featured boolean default false,
  published boolean default false,
  completed_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table project_images (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references projects(id) on delete cascade not null,
  image_url text not null,
  caption text,
  display_order integer default 0,
  created_at timestamptz default now()
);

create table news_articles (
  id uuid default uuid_generate_v4() primary key,
  slug text unique not null,
  title text not null,
  type text check (type in ('news','blog')) default 'news',
  excerpt text,
  content jsonb,
  featured_image text,
  published boolean default false,
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table job_postings (
  id uuid default uuid_generate_v4() primary key,
  slug text unique not null,
  title text not null,
  department text,
  location text,
  employment_type text,
  description jsonb,
  requirements jsonb,
  salary_range text,
  published boolean default false,
  expires_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table locations (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  address text,
  city text,
  state text,
  zip text,
  phone text,
  email text,
  is_headquarters boolean default false,
  lat numeric,
  lng numeric,
  published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table contact_submissions (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  phone text,
  company text,
  message text not null,
  read boolean default false,
  created_at timestamptz default now()
);

alter table approved_emails    enable row level security;
alter table team_members       enable row level security;
alter table services           enable row level security;
alter table sectors            enable row level security;
alter table projects           enable row level security;
alter table project_images     enable row level security;
alter table news_articles      enable row level security;
alter table job_postings       enable row level security;
alter table locations          enable row level security;
alter table contact_submissions enable row level security;

create policy "public read team"     on team_members    for select using (published = true);
create policy "public read services" on services        for select using (published = true);
create policy "public read sectors"  on sectors         for select using (published = true);
create policy "public read projects" on projects        for select using (published = true);
create policy "public read project_images" on project_images for select using (true);
create policy "public read news"     on news_articles   for select using (published = true);
create policy "public read jobs"     on job_postings    for select using (published = true);
create policy "public read locations" on locations      for select using (published = true);

create policy "public submit contact" on contact_submissions for insert with check (true);

do $$
declare t text;
begin
  for t in select unnest(array[
    'team_members','services','sectors','projects','project_images',
    'news_articles','job_postings','locations','contact_submissions','approved_emails'
  ]) loop
    execute format('create policy "admin all" on %I for all to authenticated using (true) with check (true);', t);
  end loop;
end $$;

insert into storage.buckets (id, name, public)
  values ('uploads', 'uploads', true)
  on conflict (id) do nothing;

create policy "public read uploads" on storage.objects
  for select using (bucket_id = 'uploads');
create policy "auth upload uploads" on storage.objects
  for insert to authenticated with check (bucket_id = 'uploads');
create policy "auth update uploads" on storage.objects
  for update to authenticated using (bucket_id = 'uploads');
create policy "auth delete uploads" on storage.objects
  for delete to authenticated using (bucket_id = 'uploads');

-- Seed data
insert into sectors (slug, name, icon, display_order, published) values
  ('downstream-oil-gas', 'Downstream Oil & Gas', 'Waves', 1, true),
  ('petrochemical', 'Petrochemical', 'FlaskConical', 2, true),
  ('aerospace', 'Aerospace', 'Rocket', 3, true),
  ('data-centers', 'Data Centers', 'Cpu', 4, true),
  ('semiconductor', 'Semiconductor', 'Microchip', 5, true),
  ('midstream-oil-gas', 'Midstream Oil & Gas', 'Droplet', 6, true);

insert into services (slug, name, tagline, phase, display_order, published) values
  ('pre-construction', 'Pre-Construction Services', 'Estimating, planning, and constructability review.', 'pre-construction', 1, true),
  ('execution', 'Execution Services', 'Scaffolding, coatings, insulation, fireproofing.', 'execution', 2, true),
  ('maintenance-outage', 'Maintenance and Outage Services', 'Turnaround support, inspection, emergency callouts.', 'maintenance-outage', 3, true);

-- IMPORTANT: seed your admin email before /admin will let you in:
-- insert into approved_emails (email) values ('david@graphicworksdesign.com');
