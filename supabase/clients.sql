-- =========================================================================
-- Mericka Group — Clients table + seed
-- Powers: homepage logo scroller, Projects "Trusted By" showcase,
-- and the Client dropdown on the Project admin form.
-- Run this on the live database. Idempotent / safe to re-run.
-- =========================================================================

create table if not exists clients (
  id uuid default uuid_generate_v4() primary key,
  name text unique not null,
  logo_url text,
  location text,
  sector_slug text,
  website text,
  display_order integer default 0,
  published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table clients enable row level security;

drop policy if exists "public read clients" on clients;
create policy "public read clients" on clients for select using (published = true);

drop policy if exists "admin all clients" on clients;
create policy "admin all clients" on clients for all to authenticated using (true) with check (true);

insert into clients (name, logo_url, sector_slug, display_order, published) values
  ('ExxonMobil',                '/clients/exxonmobil.svg',            'downstream-oil-gas', 1,  true),
  ('Chevron Phillips Chemical', '/clients/chevron-phillips.svg',      'petrochemical',      2,  true),
  ('SpaceX',                    '/clients/spacex.svg',                'aerospace',          3,  true),
  ('Kiewit',                    '/clients/kiewit.jpg',                'data-centers',       4,  true),
  ('Targa Resources',          '/clients/targa.jpg',                 'midstream-oil-gas',  5,  true),
  ('Hilcorp',                   '/clients/hilcorp.svg',               'midstream-oil-gas',  6,  true),
  ('Venture Global',            '/clients/venture-global.svg',        'midstream-oil-gas',  7,  true),
  ('Saulsbury Industries',      '/clients/saulsbury.svg',             'petrochemical',      8,  true),
  ('Performance Contractors',   '/clients/performance-contractors.png','petrochemical',     9,  true),
  ('CCC Group',                 '/clients/ccc-group.jpg',             'petrochemical',      10, true),
  ('Kent',                      '/clients/kent.svg',                  'petrochemical',      11, true),
  ('State of Washington',       '/clients/state-of-washington.svg',   'aerospace',          12, true)
on conflict (name) do update set
  logo_url = excluded.logo_url,
  sector_slug = excluded.sector_slug,
  display_order = excluded.display_order,
  published = excluded.published;
