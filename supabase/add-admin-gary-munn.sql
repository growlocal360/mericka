-- =========================================================================
-- Mericka Group — grant CMS/admin access to Gary Munn
--
-- Granting access takes TWO steps. This file is step 1 only.
--
--   1. (this file) Allowlist the address in approved_emails.
--
--   2. Create the login itself, in the Supabase dashboard:
--        Authentication -> Users -> Add user
--          Email:    gary.munn@merickagroup.com
--          Password: set one, share it, have him change it after first login
--          [x] Auto Confirm User    <- otherwise he must click a verify email
--
-- Do both. With only step 1 there's no account to sign in with. With only
-- step 2 the sign-in succeeds and the middleware immediately bounces him to
-- /login?error=unauthorized, which looks like a broken password.
--
-- The middleware matches the address exactly (case-sensitive), so keep it
-- lowercase here and when creating the auth user.
--
-- Run in the Supabase SQL Editor. Idempotent / safe to re-run.
-- =========================================================================

insert into approved_emails (email) values ('gary.munn@merickagroup.com')
  on conflict (email) do nothing;

-- ------------------------------ verification ------------------------------
-- Should list Gary alongside the existing admins (david@, chase.munn@).
select email, created_at from approved_emails order by created_at;
