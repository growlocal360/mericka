import { createClient } from "@/lib/supabase/server";

type SbClient = Awaited<ReturnType<typeof createClient>>;
type Awaitable<T> = T | Promise<T> | PromiseLike<T>;

/**
 * Helper that swallows Supabase errors when the project isn't configured yet
 * (e.g. .env.local still holds placeholder values). Returns `[]` on failure
 * so list pages still render during local bring-up.
 */
export async function safeList<T = unknown>(
  builder: (sb: SbClient) => Awaitable<{ data: T[] | null; error: unknown }>
): Promise<T[]> {
  try {
    const sb = await createClient();
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
    const sb = await createClient();
    const { data, error } = await builder(sb);
    if (error) return null;
    return data;
  } catch {
    return null;
  }
}
