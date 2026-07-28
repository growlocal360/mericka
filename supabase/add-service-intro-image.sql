-- =========================================================================
-- Mericka Group — add a secondary image to Services (the "What We Do" section)
--
-- Adds crafts.intro_image_url. The admin Service form gets a "Secondary Image
-- (What We Do section)" uploader, and the service page shows it to the right of
-- the What We Do text (same pattern as the Sector pages' intro image).
--
-- Run in the Supabase SQL Editor. Idempotent / safe to re-run.
-- =========================================================================

alter table crafts add column if not exists intro_image_url text;

-- ------------------------------ verification ------------------------------
select column_name, data_type
from information_schema.columns
where table_name = 'crafts' and column_name = 'intro_image_url';
