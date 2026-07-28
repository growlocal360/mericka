-- =========================================================================
-- Mericka Group — attach logos to the 3 new clients + swap Performance
-- Contractors' logo file.
--
-- Crusoe / Yaya Foods / Quantum Industrial already exist (added by
-- add-projects.sql, unpublished + logo-less). Now that they have logos they
-- are published so they appear in the homepage "Trusted By" strip.
--
-- Run in the Supabase SQL Editor. Idempotent / safe to re-run.
-- =========================================================================

update clients
  set logo_url = '/clients/crusoe-energy.svg',      published = true, display_order = 13
  where name = 'Crusoe';

update clients
  set logo_url = '/clients/yaya-foods.webp',        published = true, display_order = 14
  where name = 'Yaya Foods';

update clients
  set logo_url = '/clients/quantum-industrial.png', published = true, display_order = 15
  where name = 'Quantum Industrial';

update clients
  set logo_url = '/clients/performance-contractors-inc-logo.png'
  where name = 'Performance Contractors';

-- ------------------------------ verification ------------------------------
-- All four should show the new logo path; the three new ones published = true.
select name, logo_url, published, display_order
from clients
where name in ('Crusoe', 'Yaya Foods', 'Quantum Industrial', 'Performance Contractors')
order by display_order;
