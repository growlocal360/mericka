import { createStaticClient } from "@/lib/supabase/static";

type SbClient = ReturnType<typeof createStaticClient>;
type Awaitable<T> = T | Promise<T> | PromiseLike<T>;

/**
 * Helpers for PUBLIC reads. Backed by the cookie-free static client so the
 * pages that use them can be statically generated / served via ISR.
 *
 * They also swallow Supabase errors when the project isn't configured yet
 * (e.g. tables not created), returning `[]` / `null` so pages still render
 * from `brand.ts` fallback data during bring-up.
 */
export async function safeList<T = unknown>(
  builder: (sb: SbClient) => Awaitable<{ data: T[] | null; error: unknown }>
): Promise<T[]> {
  try {
    const sb = createStaticClient();
    const { data, error } = await builder(sb);
    if (error || !data) return [];
    return data;
  } catch {
    return [];
  }
}

export async function safeSingle<T = unknown>(
  builder: (sb: SbClient) => Awaitable<{ data: T | null; error: unknown }>
): Promise<T | null> {
  try {
    const sb = createStaticClient();
    const { data, error } = await builder(sb);
    if (error) return null;
    return data;
  } catch {
    return null;
  }
}
