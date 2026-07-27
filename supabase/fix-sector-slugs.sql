-- =========================================================================
-- Mericka Group — repair sector rows whose SLUG field holds a tagline sentence
--
-- Four sectors were saved with a full sentence in the slug column instead of a
-- URL slug, e.g. Semiconductor -> "Building and Maintaining the Facilities...".
-- The site now hides any sector with an invalid slug from the menu/grid, so
-- until this runs those four won't appear. Matched on name (which is correct).
--
-- Run in the Supabase SQL Editor. Idempotent / safe to re-run.
-- =========================================================================

update sectors set slug = 'semiconductor'                 where name = 'Semiconductor';
update sectors set slug = 'midstream-oil-gas'             where name = 'Midstream Oil & Gas';
update sectors set slug = 'food-beverage-manufacturing'   where name = 'Food & Beverage Manufacturing';
update sectors set slug = 'power-generation'              where name = 'Power Generation';

-- ------------------------------ verification ------------------------------
-- Every slug below should be lowercase-with-hyphens and contain no spaces.
select name, slug,
       (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$') as slug_ok
from sectors
order by display_order;
