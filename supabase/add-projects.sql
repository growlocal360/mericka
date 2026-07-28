-- =========================================================================
-- Mericka Group — seed 10 projects (+ 3 new clients they reference)
--
-- Per request: Services Used = "Scaffolding & Access Solutions" for all,
-- Location = "Houston, TX" for all, Featured Image = Mericka logo (placeholder).
-- Client is matched to an existing clients row where possible; three new
-- clients (Crusoe, Yaya Foods, Quantum Industrial) are added.
--
-- Run in the Supabase SQL Editor. Idempotent / safe to re-run.
-- =========================================================================

-- 1. New clients referenced by these projects. Added unpublished + logo-less
--    so they DON'T show as blank cards in the homepage "Trusted By" strip;
--    they still appear in the Project form's Client dropdown. Add logos and
--    publish them later.
insert into clients (name, sector_slug, published) values
  ('Crusoe',             'data-centers',                  false),
  ('Yaya Foods',         'food-beverage-manufacturing',   false),
  ('Quantum Industrial', null,                            false)
on conflict (name) do nothing;

-- 2. The projects. Client resolves to a clients.name; services_used and
--    location are the agreed placeholders; featured_image is the logo SVG.
insert into projects (slug, title, client, location, featured_image, services_used, published) values
  ('cp-chemical-kiewit-orange',                        'CP Chemical/Kiewit Orange',                              'Chevron Phillips Chemical', 'Houston, TX', '/mericka-group-contractor-horizontal.svg', array['Scaffolding & Access Solutions'], true),
  ('spacex-starbase-mcgregor-corpus-christi',          'SpaceX – Starbase, MacGregor, Corpus Christi',           'SpaceX',                    'Houston, TX', '/mericka-group-contractor-horizontal.svg', array['Scaffolding & Access Solutions'], true),
  ('exxon-labarge-baton-rouge-webster',                'Exxon LaBarge Wy, West Baton Rouge, LA, Webster, Tx',    'ExxonMobil',                'Houston, TX', '/mericka-group-contractor-horizontal.svg', array['Scaffolding & Access Solutions'], true),
  ('targa-mont-belvieu',                               'Targa – Mount Belvieu',                                  'Targa Resources',           'Houston, TX', '/mericka-group-contractor-horizontal.svg', array['Scaffolding & Access Solutions'], true),
  ('targa-pipeline-mont-belvieu',                      'Targa Pipeline – Mount Belvieu',                         'Targa Resources',           'Houston, TX', '/mericka-group-contractor-horizontal.svg', array['Scaffolding & Access Solutions'], true),
  ('crusoe-structural-abilene',                        'Crusoe Structural – Abilene, TX',                        'Crusoe',                    'Houston, TX', '/mericka-group-contractor-horizontal.svg', array['Scaffolding & Access Solutions'], true),
  ('yaya-foods-ogden',                                 'Yaya Foods – Ogden UT',                                  'Yaya Foods',                'Houston, TX', '/mericka-group-contractor-horizontal.svg', array['Scaffolding & Access Solutions'], true),
  ('quantum-industrial',                               'Quantum Industrial – various',                           'Quantum Industrial',        'Houston, TX', '/mericka-group-contractor-horizontal.svg', array['Scaffolding & Access Solutions'], true),
  ('state-of-washington-enterprise-services-shelton',  'State of Washington Enterprise Services – Shelton, WA',  'State of Washington',       'Houston, TX', '/mericka-group-contractor-horizontal.svg', array['Scaffolding & Access Solutions'], true),
  ('city-of-kent',                                     'City of Kent – Kent, WA',                                'Kent',                      'Houston, TX', '/mericka-group-contractor-horizontal.svg', array['Scaffolding & Access Solutions'], true)
on conflict (slug) do update set
  title = excluded.title,
  client = excluded.client,
  location = excluded.location,
  featured_image = excluded.featured_image,
  services_used = excluded.services_used,
  published = excluded.published;

-- ------------------------------ verification ------------------------------
-- Expect 10 rows, each with a client + Houston, TX + the logo placeholder.
select title, client, location, services_used, published
from projects
order by created_at;
