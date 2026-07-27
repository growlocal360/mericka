-- =========================================================================
-- Mericka Group — remove "Aerospace" entirely (client request, insurance)
--
-- The Aerospace sector was already deleted in the admin; its replacement is
-- Advanced Manufacturing. This removes the last things still referencing it
-- and gives the icon-less / mis-set sectors valid Lucide icons so the grid
-- (now DB-driven) renders correctly.
--
-- Run in the Supabase SQL Editor. Idempotent / safe to re-run.
-- =========================================================================

-- 1. Delete the scaffolding sub-page that lived under Aerospace.
delete from sector_services where sector_slug = 'aerospace';

-- 2. Move any clients tagged to the retired sector onto its replacement.
update clients set sector_slug = 'advanced-manufacturing' where sector_slug = 'aerospace';

-- 3. Valid Lucide icon names (matched by name so this works regardless of
--    whether fix-sector-slugs.sql has run yet). "Advanced Manufacturing" had
--    an invalid icon value of "SpaceX".
update sectors set icon = 'Factory'          where name = 'Advanced Manufacturing';
update sectors set icon = 'Flame'            where name = 'LNG';
update sectors set icon = 'Zap'              where name = 'Power Generation';
update sectors set icon = 'UtensilsCrossed'  where name = 'Food & Beverage Manufacturing';
update sectors set icon = 'Building2'         where name = 'Government Sector';

-- ------------------------------ verification ------------------------------
-- (a) No sector_services or clients should reference aerospace (expect 0 / 0).
select
  (select count(*) from sector_services where sector_slug = 'aerospace') as sector_service_hits,
  (select count(*) from clients          where sector_slug = 'aerospace') as client_hits;

-- (b) No sector should have an "aerospace" slug (expect 0 rows).
select name, slug from sectors where lower(slug) like '%aerospace%';
