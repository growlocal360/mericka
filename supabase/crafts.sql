-- =========================================================================
-- Mericka Group — Core Crafts ("Capabilities") table + seed
-- Run this on the live database. Idempotent / safe to re-run.
-- =========================================================================

create table if not exists crafts (
  id uuid default uuid_generate_v4() primary key,
  slug text unique not null,
  name text not null,
  tagline text,
  positioning_headline text,
  benefits text[] default '{}',
  capabilities text[] default '{}',
  summary text,
  description jsonb,
  hero_image_url text,
  icon text,
  display_order integer default 0,
  published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table crafts enable row level security;

drop policy if exists "public read crafts" on crafts;
create policy "public read crafts" on crafts for select using (published = true);

drop policy if exists "admin all crafts" on crafts;
create policy "admin all crafts" on crafts for all to authenticated using (true) with check (true);

insert into crafts
  (slug, name, tagline, positioning_headline, benefits, capabilities, summary, hero_image_url, display_order, published)
values
  ('scaffolding', 'Scaffolding',
   'Safe, engineered access for work at any height.',
   'Engineered access that keeps your crews safe and productive',
   array[
     'Safe, code-compliant access for work at any height',
     'Engineered scaffold designs for complex geometries',
     'EMMS tracking down to the single scaffold',
     'Rapid erection and dismantle to protect your schedule'
   ],
   array[
     'Tube-and-clamp and systems scaffolding',
     'Elevated work platforms and stair towers',
     'Rope access for hard-to-reach areas',
     'Scaffold inspection and tagging programs'
   ],
   'From refineries to launch pads, Mericka Group builds the safe, reliable access your crews need to get the job done — engineered, tracked, and managed down to the single scaffold.',
   '/images/scaffolding.jpg', 1, true),

  ('industrial-coatings', 'Industrial Coatings & Painting',
   'Protective coatings and linings that extend asset life.',
   'Protective coatings that defend your assets against corrosion',
   array[
     'Surface preparation and blasting to spec',
     'Protective coatings and linings that extend asset life',
     'Corrosion mitigation for tanks, pipe, and steel',
     'Containment and environmental compliance'
   ],
   array[
     'Abrasive blasting and surface preparation',
     'High-performance protective coatings',
     'Internal tank liners and external coatings',
     'Coating and blasting robotics'
   ],
   'Mericka Group protects your assets with industrial coatings and linings applied to spec — from abrasive blasting and surface prep to high-performance coatings on tanks, pipe, and structural steel.',
   '/images/paint-spray.jpg', 2, true),

  ('insulation', 'Insulation',
   'Thermal and personnel-protection insulation for industrial systems.',
   'Insulation that drives efficiency and protects your people',
   array[
     'Thermal efficiency that lowers energy loss',
     'Personnel protection from hot surfaces',
     'Process temperature control and condensation prevention',
     'Removable insulation for serviceable equipment'
   ],
   array[
     'Hot and cold pipe and vessel insulation',
     'Removable insulation blankets',
     'Tank and equipment insulation',
     'Jacketing and weatherproofing'
   ],
   'Mericka Group''s insulation services keep your processes efficient and your people safe — from hot and cold pipe and vessel insulation to removable blankets and weatherproof jacketing.',
   '/images/pipes.jpg', 3, true),

  ('fireproofing', 'Fireproofing',
   'Passive fire protection that buys critical time.',
   'Passive fire protection that safeguards people and assets',
   array[
     'Passive fire protection to code and spec',
     'Structural steel and vessel skirt fireproofing',
     'Protection that buys critical escape and response time',
     'Cementitious and intumescent systems'
   ],
   array[
     'Cementitious fireproofing',
     'Intumescent coatings',
     'Structural steel and vessel skirt protection',
     'Inspection and repair of existing fireproofing'
   ],
   'Mericka Group delivers passive fire protection engineered to code — cementitious and intumescent systems on structural steel and vessel skirts that safeguard people and assets when it matters most.',
   '/images/Fireproofing.jpg', 4, true)

on conflict (slug) do update set
  name = excluded.name,
  tagline = excluded.tagline,
  positioning_headline = excluded.positioning_headline,
  benefits = excluded.benefits,
  capabilities = excluded.capabilities,
  summary = excluded.summary,
  hero_image_url = excluded.hero_image_url,
  display_order = excluded.display_order,
  published = excluded.published;
