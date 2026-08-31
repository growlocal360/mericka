-- =========================================================================
-- Mericka Group — client change list, Delivery 1
--   Item 1  remove "rope access" from 8 sector descriptions
--   Item 2  (mechanical part) "Our self-performed services" -> "Mericka's ..."
--   Item 3  new sectors: Aerospace + Pharmaceutical
--   Item 4  Leadership: add Heather Mendler; update Chad + Chase bios
--   Item 5  SpaceX: tag project with both sectors; move client to Aerospace
--   Note    coatings standard "SSPC/NACE" -> "AMPP (SSPC/NACE)"
--
-- Run in the Supabase SQL Editor. Idempotent / safe to re-run.
-- =========================================================================

-- ---- Item 1: remove "rope access, " from every sector description ---------
update sectors
set description = replace(description::text, 'rope access, ', '')::jsonb
where description::text like '%rope access%';

-- ---- Item 2 (mechanical): third-person "self-performed" phrase ------------
update sectors
set description = replace(description::text, 'Our self-performed services', 'Mericka''s self-performed services')::jsonb
where description::text like '%Our self-performed services%';

-- ---- Coatings standard: SSPC/NACE -> AMPP (SSPC/NACE) ---------------------
-- Guarded so re-running can't double-wrap into "AMPP (AMPP (SSPC/NACE))".
update crafts
set benefits = array(select replace(x, 'SSPC/NACE', 'AMPP (SSPC/NACE)') from unnest(benefits) x)
where slug = 'industrial-coatings'
  and array_to_string(benefits, '|') like '%SSPC/NACE%'
  and array_to_string(benefits, '|') not like '%AMPP%';

-- ---- Item 3: new sectors -------------------------------------------------
insert into sectors (name, slug, category, icon, intro_image_url, published, display_order, description)
values (
  'Aerospace', 'aerospace', 'Advanced Industries', 'Rocket',
  '/mericka-group-contractor-horizontal.svg', true,
  (select coalesce(max(display_order), 0) + 1 from sectors),
  $aero$
  {"type":"doc","content":[
    {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Supporting the Facilities Where Flight Hardware Is Built"}]},
    {"type":"paragraph","content":[{"type":"text","text":"Aerospace manufacturing facilities operate to delivery commitments that leave no room for schedule slip. From engine, airframe, and component production plants to facility expansions, upgrades, and ongoing maintenance, this work takes place around high-value tooling, controlled process areas, and finished hardware — environments where an industrial contractor has to execute cleanly inside an operating plant without disrupting production."}]},
    {"type":"paragraph","content":[{"type":"text","text":"Mericka Group provides integrated scaffolding and access, insulation, passive fireproofing, and protective coatings that help aerospace manufacturers and their general contractors complete projects safely, efficiently, and on schedule. Mericka's self-performed services improve coordination, reduce contractor interfaces, and keep construction and maintenance activity moving through every phase of the facility lifecycle."}]},
    {"type":"paragraph","content":[{"type":"text","text":"With an experienced workforce, disciplined project management, and an unwavering commitment to safety and quality, Mericka helps clients reduce risk, protect their equipment and their schedule, and keep production capacity online."}]}
  ]}
  $aero$::jsonb
)
on conflict (slug) do update set
  name = excluded.name, category = excluded.category, icon = excluded.icon,
  intro_image_url = excluded.intro_image_url, published = excluded.published,
  description = excluded.description;

insert into sectors (name, slug, category, icon, intro_image_url, published, display_order, description)
values (
  'Pharmaceutical', 'pharmaceutical', 'Advanced Industries', 'Pill',
  '/mericka-group-contractor-horizontal.svg', true,
  (select coalesce(max(display_order), 0) + 1 from sectors),
  $pharma$
  {"type":"doc","content":[
    {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Supporting the Facilities That Keep Critical Medicines in Production"}]},
    {"type":"paragraph","content":[{"type":"text","text":"Pharmaceutical and life sciences facilities are held to validated conditions, strict housekeeping, and documentation at every step. From new production plants to ongoing maintenance and capital improvements, work in cleanroom-adjacent and controlled environments has to be planned around contamination control, containment, and production schedules that will not move."}]},
    {"type":"paragraph","content":[{"type":"text","text":"Mericka Group provides integrated scaffolding and access, insulation, passive fireproofing, and protective coatings that help pharmaceutical manufacturers and their general contractors complete projects safely, efficiently, and on schedule. Mericka's self-performed services improve coordination, reduce contractor interfaces, and support critical construction, shutdown, and maintenance activities throughout the facility lifecycle."}]},
    {"type":"paragraph","content":[{"type":"text","text":"With an experienced workforce, disciplined project management, and an unwavering commitment to safety and quality, Mericka helps clients reduce risk, maintain productivity, and protect the cGMP conditions their processes depend on."}]}
  ]}
  $pharma$::jsonb
)
on conflict (slug) do update set
  name = excluded.name, category = excluded.category, icon = excluded.icon,
  intro_image_url = excluded.intro_image_url, published = excluded.published,
  description = excluded.description;

-- ---- Item 4: Leadership --------------------------------------------------
-- Chad + Chase bios (they had none).
update team_members set bio = $chad$30+ years across general contracting and specialty services. Known for assembling high-performing teams and delivering projects on time, below cost, and safely; has scaled multiple regional platforms using disciplined estimating and KPI evaluation.$chad$
  where name = 'Chad King';
update team_members set bio = $chase$20+ years across the petrochemical, heavy industrial, and manufacturing sectors, specialized in the soft craft space, with leadership roles spanning project execution and team development and organization.$chase$
  where name = 'Chase Munn';

-- Add Heather at position 3 (business-development lead prospects contact),
-- pushing the operations roles down. Placeholder headshot like the others.
update team_members set display_order = display_order + 1 where display_order >= 3;
insert into team_members (name, title, email, bio, photo_url, display_order, published)
select 'Heather Mendler', 'Manager of Business Development', 'heather.mendler@merickagroup.com',
  $heather$More than a decade of industrial business development across specialty and turnaround contracting — refractory, integrated specialty services, and heat-exchanger work sold into refining, petrochemical, and power generation. Primary point of contact for new opportunities, prequalification, and scope development. BBA, Southwestern College; based in Baytown, Texas.$heather$,
  'https://zeykdqgjsamlngfuimcp.supabase.co/storage/v1/object/public/uploads/photo_url/1781849911349-ey65y5.svg',
  3, true
where not exists (select 1 from team_members where name = 'Heather Mendler');

-- ---- Item 5: SpaceX ------------------------------------------------------
update projects set sectors = array['Advanced Manufacturing', 'Aerospace'] where slug = 'spacex';
update clients  set sector_slug = 'aerospace' where name = 'SpaceX';

-- ------------------------------ verification ------------------------------
select 'sectors w/ rope access (want 0)' as check, count(*)::text as v from sectors where description::text like '%rope access%'
union all select 'sectors w/ "Our self-performed" (want 0)', count(*)::text from sectors where description::text like '%Our self-performed%'
union all select 'aerospace + pharma present (want 2)', count(*)::text from sectors where slug in ('aerospace','pharmaceutical')
union all select 'coatings AMPP present (want 1)', count(*)::text from crafts where slug='industrial-coatings' and array_to_string(benefits,'|') like '%AMPP (SSPC/NACE)%'
union all select 'Heather present (want 1)', count(*)::text from team_members where name='Heather Mendler'
union all select 'SpaceX project has Aerospace tag (want 1)', count(*)::text from projects where slug='spacex' and 'Aerospace' = any(sectors);
