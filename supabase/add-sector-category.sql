-- =========================================================================
-- Mericka Group — make the sector menu category CMS-managed
--
-- Adds sectors.category and seeds it to match the current menu grouping, so
-- the "Menu Category" dropdown in Admin > Sectors is pre-filled. The Sectors
-- nav dropdown groups by this value; a blank/unknown category falls under
-- "Other". Until this runs, the menu still groups correctly from brand.ts.
--
-- Run in the Supabase SQL Editor. Idempotent / safe to re-run.
-- =========================================================================

alter table sectors add column if not exists category text;

update sectors set category = 'Energy'
  where slug in ('downstream-oil-gas', 'midstream-oil-gas', 'petrochemical', 'power-generation', 'lng');

update sectors set category = 'Advanced Industries'
  where slug in ('advanced-manufacturing', 'semiconductor', 'data-centers');

update sectors set category = 'Infrastructure & Government'
  where slug = 'government-sector';

update sectors set category = 'Manufacturing'
  where slug = 'food-beverage-manufacturing';

-- ------------------------------ verification ------------------------------
select category, string_agg(name, ', ' order by display_order) as sectors
from sectors
where published = true
group by category
order by category;
