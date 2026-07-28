import { safeList, safeSingle } from "@/lib/supabase/safe";
import { clients as clientsFallback } from "@/lib/brand";

export type ClientView = {
  name: string;
  logo_url: string | null;
  website: string | null;
};

// Published clients from the CMS, ordered for display. Falls back to the
// static roster in brand.ts when the DB is empty or unreachable.
export async function getClients(): Promise<ClientView[]> {
  const db = await safeList<ClientView>((sb) =>
    sb
      .from("clients")
      .select("name, logo_url, website")
      .eq("published", true)
      .order("display_order", { ascending: true, nullsFirst: false })
  );
  if (db.length) return db;

  return clientsFallback.map((c) => ({
    name: c.name,
    logo_url: c.logo,
    website: null,
  }));
}

// Logo for a single client, matched by name (that's what projects.client
// stores). Falls back to the brand.ts roster so it resolves even if the DB
// row is missing or unpublished.
export async function getClientLogo(name: string | null): Promise<string | null> {
  if (!name) return null;
  const row = await safeSingle<{ logo_url: string | null }>((sb) =>
    sb.from("clients").select("logo_url").eq("name", name).eq("published", true).single()
  );
  if (row?.logo_url) return row.logo_url;
  return clientsFallback.find((c) => c.name === name)?.logo ?? null;
}
