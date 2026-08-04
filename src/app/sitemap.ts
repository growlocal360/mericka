import type { MetadataRoute } from "next";
import { safeList } from "@/lib/supabase/safe";

// Canonical production origin. Override with NEXT_PUBLIC_SITE_URL if the final
// domain differs (e.g. non-www).
const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.merickagroup.com";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = [
    "",
    "/sectors",
    "/services",
    "/energy-services",
    "/company",
    "/careers",
    "/news",
    "/projects",
    "/locations",
    "/contact",
    "/privacy",
    "/terms",
  ];

  const [sectors, crafts, services, combos, projects, news] = await Promise.all([
    safeList<{ slug: string }>((sb) => sb.from("sectors").select("slug").eq("published", true)),
    safeList<{ slug: string }>((sb) => sb.from("crafts").select("slug").eq("published", true)),
    safeList<{ slug: string }>((sb) => sb.from("services").select("slug").eq("published", true)),
    safeList<{ sector_slug: string; service_slug: string }>((sb) =>
      sb.from("sector_services").select("sector_slug, service_slug").eq("published", true)
    ),
    safeList<{ slug: string }>((sb) => sb.from("projects").select("slug").eq("published", true)),
    safeList<{ slug: string }>((sb) => sb.from("news_articles").select("slug").eq("published", true)),
  ]);

  const paths = new Set<string>(staticPaths);
  sectors.forEach((s) => paths.add(`/${s.slug}`));
  crafts.forEach((s) => paths.add(`/${s.slug}`));
  services.forEach((s) => paths.add(`/${s.slug}`));
  combos.forEach((c) => paths.add(`/${c.sector_slug}/${c.service_slug}`));
  projects.forEach((p) => paths.add(`/projects/${p.slug}`));
  news.forEach((n) => paths.add(`/news/${n.slug}`));

  const lastModified = new Date();
  return [...paths].map((path) => ({ url: `${SITE}${path}`, lastModified }));
}
