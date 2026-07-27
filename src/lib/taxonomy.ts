import { safeList } from "@/lib/supabase/safe";
import { sectors as sectorsFallback, crafts as craftsFallback } from "@/lib/brand";

export type NavItem = { slug: string; name: string };
export type SectorCard = { slug: string; name: string; icon: string; description: string; cta: string };
export type NavData = { sectors: NavItem[]; services: NavItem[] };

// A usable URL slug: lowercase, digits, single hyphens. Guards the menu/grid
// against rows where a title or sentence was pasted into the slug field.
const isValidSlug = (s: string | null | undefined): s is string =>
  !!s && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s);

/**
 * Published sectors for the homepage / sectors-page grid.
 *
 * The database is authoritative: add a sector and it appears; delete one and
 * it disappears. brand.ts supplies curated card copy (short description, CTA,
 * icon) per slug, and is the whole list only when the sectors table is empty
 * (fresh project) so the site still renders during bring-up.
 */
export async function getSectorCards(): Promise<SectorCard[]> {
  const db = await safeList<{ slug: string; name: string; icon: string | null }>((sb) =>
    sb
      .from("sectors")
      .select("slug, name, icon, display_order")
      .eq("published", true)
      .order("display_order", { ascending: true, nullsFirst: false })
  );
  if (db.length) {
    return db.filter((s) => isValidSlug(s.slug)).map((s) => {
      const fb = sectorsFallback.find((f) => f.slug === s.slug);
      return {
        slug: s.slug,
        name: s.name,
        icon: s.icon || fb?.icon || "Factory",
        description: fb?.description ?? "",
        cta: fb?.cta ?? "Learn more",
      };
    });
  }
  return sectorsFallback.map((s) => ({
    slug: s.slug,
    name: s.name,
    icon: s.icon,
    description: s.description,
    cta: s.cta,
  }));
}

/** Published services (crafts) as simple nav items, DB-first. */
export async function getServiceItems(): Promise<NavItem[]> {
  const db = await safeList<{ slug: string; name: string }>((sb) =>
    sb
      .from("crafts")
      .select("slug, name, display_order")
      .eq("published", true)
      .order("display_order", { ascending: true, nullsFirst: false })
  );
  if (db.length) return db.filter((s) => isValidSlug(s.slug)).map((s) => ({ slug: s.slug, name: s.name }));
  return craftsFallback.map((c) => ({ slug: c.slug, name: c.title }));
}

/**
 * Authoritative set of published sector slugs, used for routing / prerender.
 * An empty array signals "sectors table not populated" so callers can decide
 * whether to fall back to brand.ts.
 */
export async function getSectorSlugs(): Promise<string[]> {
  const db = await safeList<{ slug: string }>((sb) =>
    sb.from("sectors").select("slug").eq("published", true)
  );
  return db.map((s) => s.slug);
}

/** Sector + service lists for the header/footer navigation. */
export async function getNavData(): Promise<NavData> {
  const [cards, services] = await Promise.all([getSectorCards(), getServiceItems()]);
  return {
    sectors: cards.map((s) => ({ slug: s.slug, name: s.name })),
    services,
  };
}
