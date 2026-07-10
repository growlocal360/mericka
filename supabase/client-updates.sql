-- =========================================================================
-- Mericka Group — client feedback updates (run in Supabase SQL Editor)
-- Safe to re-run.
-- =========================================================================

-- Item 1: match the /scaffolding page heading to the new "Scaffolding & Access" label
update crafts set name = 'Scaffolding & Access' where slug = 'scaffolding';

-- ----------------------------- Item 3: Team ------------------------------
-- Remove Charlene Stewart Terry
delete from team_members where name = 'Charlene Stewart Terry';

-- Cliff Bowden -> Chief Operating Officer (drop the P.E., CWI, PMP credentials)
update team_members
  set title = 'Chief Operating Officer', display_order = 4
  where name = 'Cliff Bowden';

-- Add the leadership team. Reuses the same uploaded logo SVG the existing
-- members use as a placeholder photo. Delete-then-insert = safe to re-run.
delete from team_members where name in ('Chad King', 'Chase Munn', 'Gary Munn', 'Tim Burke');
insert into team_members (name, title, photo_url, display_order, published) values
  ('Chad King',  'Managing Partner/President',     'https://zeykdqgjsamlngfuimcp.supabase.co/storage/v1/object/public/uploads/photo_url/1781849911349-ey65y5.svg', 1, true),
  ('Chase Munn', 'Vice President',                 'https://zeykdqgjsamlngfuimcp.supabase.co/storage/v1/object/public/uploads/photo_url/1781849911349-ey65y5.svg', 2, true),
  ('Gary Munn',  'HSE & Risk Management Director', 'https://zeykdqgjsamlngfuimcp.supabase.co/storage/v1/object/public/uploads/photo_url/1781849911349-ey65y5.svg', 3, true),
  ('Tim Burke',  'Controller',                     'https://zeykdqgjsamlngfuimcp.supabase.co/storage/v1/object/public/uploads/photo_url/1781849911349-ey65y5.svg', 5, true);

-- --------------------- Item 4: Chase Munn CMS access ---------------------
-- Allowlist Chase's email. He also needs a Supabase Auth user with this email
-- (Authentication -> Users -> Add user, "Auto Confirm") to actually log in.
insert into approved_emails (email) values ('chase.munn@merickagroup.com')
  on conflict (email) do nothing;
