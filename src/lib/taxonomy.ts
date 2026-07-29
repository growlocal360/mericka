import { safeList } from "@/lib/supabase/safe";
import { sectors as sectorsFallback, crafts as craftsFallback, sectorCategories } from "@/lib/brand";

export type NavItem = { slug: string; name: string };
export type NavGroup = { category: string; items: NavItem[] };
export type SectorCard = { slug: string; name: string; icon: string; description: string; cta: string; category: string | null };
export type NavData = { sectors: NavGroup[]; services: NavItem[] };

// A usable URL slug: lowercase, digits, single hyphens. Guards the menu/grid
// against rows where a title or sentence was pasted into the slug field.
const isValidSlug = (s: string | null | undefined): s is string =>
  !!s && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s);

// Curated ordering for the nav: sectors sort by their position in brand.ts.
const sectorOrder = new Map<string, number>(sectorsFallback.map((s, i) => [s.slug, i]));

/**
 * Published sectors for the homepage / sectors-page grid.
 *
 * The database is authoritative: add a sector and it appears; delete one and
 * it disappears. brand.ts supplies curated card copy (short description, CTA,
 * icon, menu category) per slug, and is the whole list only when the sectors
 * table is empty (fresh project) so the site still renders during bring-up.
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
    // Separate lookup so a missing `category` column (before its migration
    // runs) can't error out the whole sector list. DB value wins; brand.ts is
    // the per-slug fallback.
    const cats = await safeList<{ slug: string; category: string | null }>((sb) =>
      sb.from("sectors").select("slug, category").eq("published", true)
    );
    const catMap = new Map(cats.map((c) => [c.slug, c.category]));
    return db.filter((s) => isValidSlug(s.slug)).map((s) => {
      const fb = sectorsFallback.find((f) => f.slug === s.slug);
      return {
        slug: s.slug,
        name: s.name,
        icon: s.icon || fb?.icon || "Factory",
        description: fb?.description ?? "",
        cta: fb?.cta ?? "Learn more",
        category: catMap.get(s.slug) ?? fb?.category ?? null,
      };
    });
  }
  return sectorsFallback.map((s) => ({
    slug: s.slug,
    name: s.name,
    icon: s.icon,
    description: s.description,
    cta: s.cta,
    category: s.category,
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

// Group sector cards into the ordered menu categories; anything without a known
// category falls into a trailing "Other" group so it's never dropped.
function groupSectors(cards: SectorCard[]): NavGroup[] {
  const byOrder = (a: NavItem, b: NavItem) =>
    (sectorOrder.get(a.slug) ?? 999) - (sectorOrder.get(b.slug) ?? 999);
  const groups: NavGroup[] = [];
  for (const category of sectorCategories) {
    const items = cards
      .filter((c) => c.category === category)
      .map((c) => ({ slug: c.slug, name: c.name }))
      .sort(byOrder);
    if (items.length) groups.push({ category, items });
  }
  const known = new Set<string>(sectorCategories);
  const rest = cards
    .filter((c) => !c.category || !known.has(c.category))
    .map((c) => ({ slug: c.slug, name: c.name }))
    .sort(byOrder);
  if (rest.length) groups.push({ category: "Other", items: rest });
  return groups;
}

/** Sector (grouped) + service lists for the header/footer navigation. */
export async function getNavData(): Promise<NavData> {
  const [cards, services] = await Promise.all([getSectorCards(), getServiceItems()]);
  return { sectors: groupSectors(cards), services };
}
