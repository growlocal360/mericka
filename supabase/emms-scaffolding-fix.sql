-- =========================================================================
-- Mericka Group — fix 2 EMMS mentions re-introduced when the Scaffolding
-- service was re-edited after emms-rename.sql ran.
--
-- Both already contained "Proprietary"/"proprietary", so a literal swap would
-- double it up ("Proprietary Proprietary Software (EMMS)"). These use clean
-- wording instead. Tweak the phrasing to taste in Admin > Services > Scaffolding.
--
-- Run in the Supabase SQL Editor. Idempotent / safe to re-run.
-- =========================================================================

update crafts set
  benefits = array_replace(
    benefits,
    'Proprietary EMMS technology delivers real-time visibility and accountability for every scaffold',
    'Proprietary Software (EMMS) delivers real-time visibility and accountability for every scaffold'
  ),
  capabilities = array_replace(
    capabilities,
    'Real-time scaffold tracking and asset accountability through Mericka''s proprietary EMMS platform',
    'Real-time scaffold tracking and asset accountability through Mericka''s Proprietary Software (EMMS)'
  )
where slug = 'scaffolding';

-- ------------------------------ verification ------------------------------
-- Expect 0 rows: no bare EMMS left in the scaffolding service.
select 'still has bare EMMS' as flag, unnest(benefits || capabilities) as line
from crafts
where slug = 'scaffolding'
  and (benefits::text || capabilities::text) ~ 'EMMS'
  and (benefits::text || capabilities::text) !~ 'Proprietary Software \(EMMS\)';
