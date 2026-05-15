# Mericka Group — Marketing Site

Next.js 16 (App Router) + Tailwind v4 + Supabase + TipTap.

## Setup

1. **Install deps**
   ```bash
   npm install
   ```

2. **Create a Supabase project**, then copy your project URL and anon key into `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
   ```

3. **Run the schema** in `supabase/schema.sql` via the Supabase SQL editor.
4. **Approve your admin email** in the SQL editor:
   ```sql
   insert into approved_emails (email) values ('your@email.com');
   ```
5. **Create your auth user** in Supabase Dashboard → Authentication → Add User.

## Run

```bash
npm run dev          # http://localhost:3000
npm run build        # production build
npm run lint
```

## Structure

- `src/app/` — App Router pages
  - `/` home, `/services`, `/sectors`, `/projects`, `/news`, `/careers`, `/company`, `/contact`
  - `/login` admin sign-in
  - `/admin/...` CMS (gated by `approved_emails` via middleware)
- `src/components/` — UI components
  - `editor/` TipTap rich-text editor + read-only renderer
  - `admin/` admin-only components (image upload, entity form/list)
- `src/lib/`
  - `brand.ts` brand tokens + static content fallbacks
  - `supabase/` SSR-safe Supabase clients
  - `admin/entities.ts` declarative config that drives all admin CRUD
- `src/middleware.ts` — gates `/admin/*` behind approved emails
- `supabase/schema.sql` — full schema + RLS policies + storage bucket
- `public/` — brand logos

## Admin

After signing in at `/login`, you'll land on `/admin`. Each entity has list / new / edit pages backed by `/api/admin/<entity>` REST endpoints. Adding a new content type is one entry in `src/lib/admin/entities.ts`.

## Deploy (Vercel)

1. Push the `merickagroup.com` directory to GitHub.
2. Import the repo in Vercel.
3. Set the env vars (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
4. Point your `merickagroup.com` domain at the project.

## Notes

- Until Supabase is configured, list pages render empty states and detail pages fall back to seed data in `src/lib/brand.ts` where possible. The contact form will return a 500.
- Hero, service, and marquee photos are Unsplash placeholders — swap them for real jobsite photos before launch.
