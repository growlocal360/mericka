-- =========================================================================
-- Mericka Group — add "Supporting / Secondary Images" to projects
--
-- Adds a gallery_images text[] column. The admin Project form now has a
-- multi-image uploader for it, and the project page renders these below the
-- body copy. The featured image renders in the hero AND above the body.
--
-- Run in the Supabase SQL Editor. Idempotent / safe to re-run.
-- =========================================================================

alter table projects add column if not exists gallery_images text[] default '{}';

-- ------------------------------ verification ------------------------------
select column_name, data_type
from information_schema.columns
where table_name = 'projects' and column_name = 'gallery_images';
