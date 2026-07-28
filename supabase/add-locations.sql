-- =========================================================================
-- Mericka Group — seed the 4 office locations
--
-- Powers the /locations page (and the "All Locations" footer link). Manage the
-- live list going forward in Admin > Locations.
--
-- Run in the Supabase SQL Editor. Idempotent (won't duplicate by name).
-- =========================================================================

insert into locations (name, address, city, state, zip, is_headquarters, published)
select 'Houston Office', '2323 S Houston Ave, Building 5', 'Humble', 'TX', '77396', true, true
where not exists (select 1 from locations where name = 'Houston Office');

insert into locations (name, address, city, state, zip, is_headquarters, published)
select 'Port Arthur Office', '401 Marcontell', 'Port Arthur', 'TX', '77640', false, true
where not exists (select 1 from locations where name = 'Port Arthur Office');

insert into locations (name, address, city, state, zip, is_headquarters, published)
select 'Brownsville Office', '912 N. Indiana Ave.', 'Brownsville', 'TX', '78521', false, true
where not exists (select 1 from locations where name = 'Brownsville Office');

insert into locations (name, address, city, state, zip, is_headquarters, published)
select 'Louisiana Office', '2102 W. Kenny Dr.', 'Gonzales', 'LA', '70737', false, true
where not exists (select 1 from locations where name = 'Louisiana Office');

-- ------------------------------ verification ------------------------------
-- Expect 4 rows, Houston Office flagged is_headquarters = true.
select name, address, city, state, zip, is_headquarters, published
from locations
order by is_headquarters desc, name;
