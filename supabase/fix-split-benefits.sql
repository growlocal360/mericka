-- =========================================================================
-- Mericka Group — repair the Industrial Coatings benefit that got split
--
-- The admin's list field used to split on commas, so
--   "Corrosion mitigation for tanks, pipe, concrete, and steel"
-- was saved as 4 separate bullets. The field now splits on newlines instead,
-- so this can't recur. This stitches the 4 fragments back into one bullet.
--
-- Run in the Supabase SQL Editor. Idempotent / safe to re-run.
-- =========================================================================

update crafts
set benefits = array[
  'Surface preparation and blasting to spec',
  'Protective coatings and linings that extend asset life',
  'Corrosion mitigation for tanks, pipe, concrete, and steel',
  'Containment and environmental compliance'
]
where slug = 'industrial-coatings';

-- ------------------------------ verification ------------------------------
-- Should return 4 rows, with the corrosion line intact and comma-containing.
select unnest(benefits) as benefit from crafts where slug = 'industrial-coatings';
