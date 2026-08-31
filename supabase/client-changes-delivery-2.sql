-- =========================================================================
-- Mericka Group — client change list, Delivery 2 (third-person, DB portion)
--
-- Marketing CODE copy (About, homepage, Contact, Merickan Way, CTA) is already
-- deployed in third person. This handles the DB copy:
--   • Industrial Coatings "What We Do" summary
--   • the 3 scaffolding sector×service combo pages (full third-person rewrite)
-- Targeted phrase swaps preserve each page's headings and lists; verb forms
-- are corrected (e.g. "We handle" -> "Mericka handles").
--
-- Run in the Supabase SQL Editor. Idempotent / safe to re-run.
-- =========================================================================

-- ---------------------------- Coatings summary ----------------------------
update crafts
set summary = $s$Corrosion never stops—but neither does Mericka Group. Mericka delivers industrial protective coating and lining solutions that help clients extend asset life, improve reliability, and reduce long-term maintenance costs. From abrasive blasting and precision surface preparation to high-performance coating systems for tanks, piping, structural steel, and concrete, Mericka's experienced teams execute every project to the highest standards of quality, safety, and performance. Whether supporting routine maintenance, turnarounds, or capital projects, Mericka helps protect client assets and keep operations running longer.$s$
where slug = 'industrial-coatings';

-- ============================= PETROCHEMICAL ==============================
update sector_services set content = replace(content::text, $$At Mericka Group, we understand that operating within the petrochemical$$, $$Mericka Group understands that operating within the petrochemical$$)::jsonb where sector_slug='petrochemical' and service_slug='scaffolding-and-access-solutions';
update sector_services set content = replace(content::text, $$our Scaffolding & Access Solutions are tailored to meet the high standards$$, $$Mericka's Scaffolding & Access Solutions are tailored to meet the high standards$$)::jsonb where sector_slug='petrochemical' and service_slug='scaffolding-and-access-solutions';
update sector_services set content = replace(content::text, $$scaffolding man-hours under our belt$$, $$scaffolding man-hours under its belt$$)::jsonb where sector_slug='petrochemical' and service_slug='scaffolding-and-access-solutions';
update sector_services set content = replace(content::text, $$we make scaffolding simple while adding immense value$$, $$Mericka makes scaffolding simple while adding immense value$$)::jsonb where sector_slug='petrochemical' and service_slug='scaffolding-and-access-solutions';
update sector_services set content = replace(content::text, $$What sets our scaffolding solutions apart$$, $$What sets Mericka's scaffolding solutions apart$$)::jsonb where sector_slug='petrochemical' and service_slug='scaffolding-and-access-solutions';
update sector_services set content = replace(content::text, $$Comprehensive Services: We handle scaffolding$$, $$Comprehensive Services: Mericka handles scaffolding$$)::jsonb where sector_slug='petrochemical' and service_slug='scaffolding-and-access-solutions';
update sector_services set content = replace(content::text, $$Safety-First Approach: Our strategies and procedures prioritize$$, $$Safety-First Approach: Mericka's strategies and procedures prioritize$$)::jsonb where sector_slug='petrochemical' and service_slug='scaffolding-and-access-solutions';
update sector_services set content = replace(content::text, $$tracking systems, we ensure accountability$$, $$tracking systems, Mericka ensures accountability$$)::jsonb where sector_slug='petrochemical' and service_slug='scaffolding-and-access-solutions';
update sector_services set content = replace(content::text, $$Our Process:$$, $$The Process:$$)::jsonb where sector_slug='petrochemical' and service_slug='scaffolding-and-access-solutions';
update sector_services set content = replace(content::text, $$Collaborate: We work with you to identify where we can provide value and how our expertise impacts$$, $$Collaborate: Mericka works with you to identify where it can provide value and how its expertise impacts$$)::jsonb where sector_slug='petrochemical' and service_slug='scaffolding-and-access-solutions';
update sector_services set content = replace(content::text, $$Plan: Through customized proposals and execution plans, we ensure every step aligns$$, $$Plan: Through customized proposals and execution plans, Mericka ensures every step aligns$$)::jsonb where sector_slug='petrochemical' and service_slug='scaffolding-and-access-solutions';
update sector_services set content = replace(content::text, $$Execute: Once plans are in place, we deliver immediate results$$, $$Execute: Once plans are in place, Mericka delivers immediate results$$)::jsonb where sector_slug='petrochemical' and service_slug='scaffolding-and-access-solutions';

-- ============================= SEMICONDUCTOR ==============================
update sector_services set content = replace(content::text, $$At Mericka Group LLC, we understand the critical nature of cleanliness$$, $$Mericka Group LLC understands the critical nature of cleanliness$$)::jsonb where sector_slug='semiconductor' and service_slug='scaffolding-and-access-solutions';
update sector_services set content = replace(content::text, $$Our Scaffolding and Access Solutions are purpose-built$$, $$Mericka's Scaffolding and Access Solutions are purpose-built$$)::jsonb where sector_slug='semiconductor' and service_slug='scaffolding-and-access-solutions';
update sector_services set content = replace(content::text, $$high-bay utilities, our systems ensure safe$$, $$high-bay utilities, Mericka's systems ensure safe$$)::jsonb where sector_slug='semiconductor' and service_slug='scaffolding-and-access-solutions';
update sector_services set content = replace(content::text, $$Cleanroom-Compliant Scaffolding: Our aluminum and composite scaffolding systems are engineered$$, $$Cleanroom-Compliant Scaffolding: Mericka's aluminum and composite scaffolding systems are engineered$$)::jsonb where sector_slug='semiconductor' and service_slug='scaffolding-and-access-solutions';
update sector_services set content = replace(content::text, $$Precision Installation and Rapid Deployment: We specialize in$$, $$Precision Installation and Rapid Deployment: Mericka specializes in$$)::jsonb where sector_slug='semiconductor' and service_slug='scaffolding-and-access-solutions';
update sector_services set content = replace(content::text, $$Contamination Control Built In: Our systems are tailored$$, $$Contamination Control Built In: Mericka's systems are tailored$$)::jsonb where sector_slug='semiconductor' and service_slug='scaffolding-and-access-solutions';
update sector_services set content = replace(content::text, $$Flexibility for Complex Fab Layouts: Our modular systems can be configured$$, $$Flexibility for Complex Fab Layouts: Mericka's modular systems can be configured$$)::jsonb where sector_slug='semiconductor' and service_slug='scaffolding-and-access-solutions';
update sector_services set content = replace(content::text, $$Improved Uptime and Workflow Continuity: Our turnkey scaffolding solutions are designed$$, $$Improved Uptime and Workflow Continuity: Mericka's turnkey scaffolding solutions are designed$$)::jsonb where sector_slug='semiconductor' and service_slug='scaffolding-and-access-solutions';

-- ========================== DOWNSTREAM OIL & GAS ==========================
update sector_services set content = replace(content::text, $$Our scaffolding and access solutions are designed to keep your operations$$, $$Mericka's scaffolding and access solutions are designed to keep your operations$$)::jsonb where sector_slug='downstream-oil-gas' and service_slug='scaffolding-and-access-solutions';
update sector_services set content = regexp_replace(content::text, $$We.ve partnered with numerous facilities$$, $$Mericka has partnered with numerous facilities$$)::jsonb where sector_slug='downstream-oil-gas' and service_slug='scaffolding-and-access-solutions';
update sector_services set content = replace(content::text, $$We build access systems that adapt to your project scope$$, $$Mericka builds access systems that adapt to your project scope$$)::jsonb where sector_slug='downstream-oil-gas' and service_slug='scaffolding-and-access-solutions';
update sector_services set content = replace(content::text, $$difficult-to-reach areas, we tailor our solutions to ensure minimal disruption$$, $$difficult-to-reach areas, Mericka tailors its solutions to ensure minimal disruption$$)::jsonb where sector_slug='downstream-oil-gas' and service_slug='scaffolding-and-access-solutions';
update sector_services set content = replace(content::text, $$We offer modular, adjustable access systems$$, $$Mericka offers modular, adjustable access systems$$)::jsonb where sector_slug='downstream-oil-gas' and service_slug='scaffolding-and-access-solutions';
update sector_services set content = replace(content::text, $$Our teams help reduce downtime and keep compliance$$, $$Mericka's teams help reduce downtime and keep compliance$$)::jsonb where sector_slug='downstream-oil-gas' and service_slug='scaffolding-and-access-solutions';
update sector_services set content = replace(content::text, $$accidents grows. We help you stay on schedule$$, $$accidents grows. Mericka helps you stay on schedule$$)::jsonb where sector_slug='downstream-oil-gas' and service_slug='scaffolding-and-access-solutions';

-- ------------------------------ verification ------------------------------
-- Expect 0 rows: no first-person left in the coatings summary or the 3 combos.
select 'crafts:'||slug as where_ from crafts where slug='industrial-coatings' and summary ~* '\y(we|our|us)\y'
union all
select 'combo:'||sector_slug from sector_services
  where service_slug='scaffolding-and-access-solutions'
  and sector_slug in ('petrochemical','semiconductor','downstream-oil-gas')
  and content::text ~* '\y(we|our)\y';
