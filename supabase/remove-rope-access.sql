-- =========================================================================
-- Mericka Group — remove all "rope access" references (client request)
-- Run in the Supabase SQL Editor. Idempotent / safe to re-run.
-- =========================================================================

-- 1. Capabilities page: Scaffolding & Access (/scaffolding)
--    Drops the "Rope access for hard-to-reach areas" capability card.
update crafts
set capabilities = array_remove(capabilities, 'Rope access for hard-to-reach areas')
where slug = 'scaffolding';

-- 2. Service page: Scaffolding & Access Solutions
--    Tagline, one benefit, one capability, and the summary all mentioned it.
update services set
  tagline = 'Scaffolding, elevated work platforms, and stair towers.',
  benefits = array_replace(
    benefits,
    'Industry-leading rope access procedures protect your safety record',
    'Industry-leading access procedures protect your safety record'
  ),
  capabilities = array_replace(
    capabilities,
    'Scaffolding, elevated work platforms, stair towers, and rope access',
    'Scaffolding, elevated work platforms, and stair towers'
  ),
  summary = replace(
    summary,
    'elevated work platforms, stair towers, and rope access',
    'elevated work platforms, and stair towers'
  )
where slug = 'scaffolding-and-access-solutions';

-- 3. Sector x service page: /petrochemical/scaffolding-and-access-solutions
update sector_services
set content = replace(
  content::text,
  'elevated work platforms, stair towers, and rope access solutions',
  'elevated work platforms, and stair tower solutions'
)::jsonb
where sector_slug = 'petrochemical'
  and service_slug = 'scaffolding-and-access-solutions';

-- 4. Sector page: /data-centers narrative
update sectors
set description = replace(description::text, 'scaffolding, rope access, coatings', 'scaffolding, coatings')::jsonb
where slug = 'data-centers';

-- ------------------------------ verification ------------------------------
-- Should return ZERO rows. Anything listed still contains "rope access".
select 'crafts' as source, slug from crafts where lower(capabilities::text) like '%rope access%'
union all
select 'services', slug from services
  where lower(coalesce(tagline,'') || coalesce(summary,'') || capabilities::text || benefits::text) like '%rope access%'
union all
select 'sector_services', sector_slug || '/' || service_slug from sector_services
  where lower(content::text) like '%rope access%'
union all
select 'sectors', slug from sectors where lower(coalesce(description::text,'')) like '%rope access%';
