-- =========================================================================
-- Mericka Group — replace the two old paint photos with the new one
--   /images/paint-spray.jpg  and  /images/Paint-spray-tank-roof.jpg
--     -> /images/industrial-painting-and-coating-mericka-group.jpg
--
-- Only crafts.hero_image_url currently uses one in the live DB, but this
-- swaps every image field defensively in case one was set in the admin later.
--
-- Run in the Supabase SQL Editor. Idempotent / safe to re-run.
-- =========================================================================

update crafts   set hero_image_url = '/images/industrial-painting-and-coating-mericka-group.jpg'
  where hero_image_url in ('/images/paint-spray.jpg', '/images/Paint-spray-tank-roof.jpg');

update services set hero_image_url = '/images/industrial-painting-and-coating-mericka-group.jpg'
  where hero_image_url in ('/images/paint-spray.jpg', '/images/Paint-spray-tank-roof.jpg');

update sectors  set hero_image_url = '/images/industrial-painting-and-coating-mericka-group.jpg'
  where hero_image_url in ('/images/paint-spray.jpg', '/images/Paint-spray-tank-roof.jpg');
update sectors  set intro_image_url = '/images/industrial-painting-and-coating-mericka-group.jpg'
  where intro_image_url in ('/images/paint-spray.jpg', '/images/Paint-spray-tank-roof.jpg');

update projects set featured_image = '/images/industrial-painting-and-coating-mericka-group.jpg'
  where featured_image in ('/images/paint-spray.jpg', '/images/Paint-spray-tank-roof.jpg');

-- ------------------------------ verification ------------------------------
-- Expect 0 rows: no table still points at either old paint image.
select 'crafts' as tbl, slug from crafts where hero_image_url ~ '[Pp]aint-spray'
union all select 'services', slug from services where hero_image_url ~ '[Pp]aint-spray'
union all select 'sectors', slug from sectors where coalesce(hero_image_url,'')||coalesce(intro_image_url,'') ~ '[Pp]aint-spray'
union all select 'projects', slug from projects where coalesce(featured_image,'') ~ '[Pp]aint-spray';
