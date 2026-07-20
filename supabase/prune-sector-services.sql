-- =========================================================================
-- Mericka Group — keep only the Scaffolding & Access Solutions sector pages
-- Removes the other 16 sector x service pages (4 sectors x 4 services).
--
-- The full content of the deleted rows is preserved in
-- supabase/sector-services.sql if it ever needs restoring.
--
-- Run in the Supabase SQL Editor. Idempotent / safe to re-run.
-- =========================================================================

-- Optional preview — run this first to eyeball exactly what goes away:
-- select sector_slug, service_slug from sector_services
--   where service_slug <> 'scaffolding-and-access-solutions'
--   order by sector_slug, service_slug;

delete from sector_services
where service_slug <> 'scaffolding-and-access-solutions';

-- ------------------------------ verification ------------------------------
-- Should return exactly 4 rows, all scaffolding-and-access-solutions:
--   aerospace / downstream-oil-gas / petrochemical / semiconductor
select sector_slug, service_slug, published
from sector_services
order by sector_slug;
