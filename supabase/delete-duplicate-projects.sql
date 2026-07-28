-- =========================================================================
-- Mericka Group — remove the duplicate placeholder projects
--
-- add-projects.sql added a second copy of each project (all "Houston, TX",
-- no other data) because you'd already created them by hand with real
-- locations/content under different slugs. This deletes ONLY the 9 placeholder
-- copies and keeps your hand-entered versions.
--
-- KEPT (your data, real locations):
--   cp-chemical-kiewit-orange-tx, crusoe-structural-abilene-tx, exxon,
--   city-of-kent-kent-wa, spacex, state-of-washington-enterprise-services-shelton-wa,
--   targa-mount-belvieu, targa-pipeline-mount-belvieu, yaya-foods-ogden-ut,
--   quantum-industrial
--
-- Run in the Supabase SQL Editor. Idempotent / safe to re-run.
-- =========================================================================

-- Preview first if you like — these are the rows about to be deleted:
-- select slug, client, location from projects where slug in (
--   'cp-chemical-kiewit-orange','spacex-starbase-mcgregor-corpus-christi',
--   'exxon-labarge-baton-rouge-webster','targa-mont-belvieu',
--   'targa-pipeline-mont-belvieu','crusoe-structural-abilene','yaya-foods-ogden',
--   'state-of-washington-enterprise-services-shelton','city-of-kent');

delete from projects where slug in (
  'cp-chemical-kiewit-orange',
  'spacex-starbase-mcgregor-corpus-christi',
  'exxon-labarge-baton-rouge-webster',
  'targa-mont-belvieu',
  'targa-pipeline-mont-belvieu',
  'crusoe-structural-abilene',
  'yaya-foods-ogden',
  'state-of-washington-enterprise-services-shelton',
  'city-of-kent'
);

-- ------------------------------ verification ------------------------------
-- Expect 10 rows, each client once, with real (non-"Houston, TX") locations.
select client, slug, location from projects order by client, slug;
