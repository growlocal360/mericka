-- =========================================================================
-- Mericka Group — client change list, Delivery 2 (third-person, DB portion)
--
-- The marketing CODE copy (About, homepage, Contact, Merickan Way, CTA) is
-- already deployed in third person. This handles the DB copy: the Industrial
-- Coatings "What We Do" summary. (The 3 scaffolding combo pages have pervasive
-- first-person and get their own rewrite pass.)
--
-- Run in the Supabase SQL Editor. Idempotent / safe to re-run.
-- =========================================================================

update crafts
set summary = $s$Corrosion never stops—but neither does Mericka Group. Mericka delivers industrial protective coating and lining solutions that help clients extend asset life, improve reliability, and reduce long-term maintenance costs. From abrasive blasting and precision surface preparation to high-performance coating systems for tanks, piping, structural steel, and concrete, Mericka's experienced teams execute every project to the highest standards of quality, safety, and performance. Whether supporting routine maintenance, turnarounds, or capital projects, Mericka helps protect client assets and keep operations running longer.$s$
where slug = 'industrial-coatings';

-- ------------------------------ verification ------------------------------
-- Expect 0: no we/our left in the coatings summary.
select slug from crafts where slug = 'industrial-coatings'
  and summary ~* '\y(we|our|us)\y';
