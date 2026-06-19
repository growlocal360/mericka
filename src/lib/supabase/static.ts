import { createClient } from "@supabase/supabase-js";

/**
 * Cookie-free anon Supabase client for PUBLIC reads.
 *
 * Unlike the cookie-based server client (./server.ts), this does NOT call
 * next/headers `cookies()`, so pages that use it can be statically generated
 * and served as static HTML / ISR. RLS already permits the anon role to read
 * rows where `published = true`, which is all the public site needs.
 *
 * Use ./server.ts (cookie client) only where an authenticated session matters
 * (the /admin panel and its API routes).
 */
let cached: ReturnType<typeof createClient> | null = null;

export function createStaticClient() {
  if (cached) return cached;
  cached = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
  return cached;
}
