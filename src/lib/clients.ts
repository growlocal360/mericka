import { safeList } from "@/lib/supabase/safe";
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
