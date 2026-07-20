-- =========================================================================
-- Mericka Group — rename every EMMS reference to "Proprietary Software (EMMS)"
--
-- Two pages also spelled the acronym out, inconsistently:
--   "EMMS (Elevate Management and Monitoring Systems)"        [petrochemical]
--   "our proprietary Enterprise Management & Metrics System (EMMS)" [aerospace]
-- Both expansions are collapsed into the new wording so the text doesn't end
-- up reading "Proprietary Software (EMMS) (Elevate Management ...)".
--
-- Run in the Supabase SQL Editor. Idempotent / safe to re-run (step 1 of the
-- helper normalises any previous run before re-applying).
-- =========================================================================

create or replace function emms_fix(t text) returns text as $$
  select case when t is null then null else
    replace(                                                    -- 4. apply new wording
      replace(                                                  -- 3. drop aerospace expansion
        replace(                                                -- 2. drop petrochemical expansion
          replace(t, 'Proprietary Software (EMMS)', 'EMMS'),    -- 1. normalise prior runs
          'EMMS (Elevate Management and Monitoring Systems)', 'EMMS'),
        'proprietary Enterprise Management & Metrics System (EMMS)', 'EMMS'),
      'EMMS', 'Proprietary Software (EMMS)')
  end;
$$ language sql immutable;

update crafts set
  tagline              = emms_fix(tagline),
  positioning_headline = emms_fix(positioning_headline),
  summary              = emms_fix(summary),
  benefits             = array(select emms_fix(x) from unnest(benefits) x),
  capabilities         = array(select emms_fix(x) from unnest(capabilities) x),
  description          = emms_fix(description::text)::jsonb;

update services set
  tagline              = emms_fix(tagline),
  positioning_headline = emms_fix(positioning_headline),
  summary              = emms_fix(summary),
  benefits             = array(select emms_fix(x) from unnest(benefits) x),
  capabilities         = array(select emms_fix(x) from unnest(capabilities) x),
  description          = emms_fix(description::text)::jsonb;

update sector_services set
  title            = emms_fix(title),
  meta_description = emms_fix(meta_description),
  content          = emms_fix(content::text)::jsonb;

update sectors set
  description = emms_fix(description::text)::jsonb;

drop function if exists emms_fix(text);

-- ------------------------------ verification ------------------------------
-- Every row below should show 0 bare/mis-expanded references remaining.
select 'crafts' as source, count(*) as bad from crafts
  where (tagline || coalesce(summary,'') || benefits::text || capabilities::text
         || coalesce(description::text,'')) ~ 'EMMS'
    and (tagline || coalesce(summary,'') || benefits::text || capabilities::text
         || coalesce(description::text,'')) !~ 'Proprietary Software \(EMMS\)'
union all
select 'double-wrapped', count(*) from sector_services
  where content::text like '%Proprietary Software (Proprietary Software%';

-- Eyeball the converted text:
select 'crafts' as src, unnest(benefits) as line from crafts where slug = 'scaffolding'
union all
select 'services', unnest(capabilities) from services where slug = 'scaffolding-and-access-solutions';
