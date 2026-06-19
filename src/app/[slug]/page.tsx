import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { safeSingle, safeList } from "@/lib/supabase/safe";
import {
  sectors as sectorFallback,
  services as serviceFallback,
  crafts as craftFallback,
} from "@/lib/brand";
import SectorBody, {
  type SectorView,
  type ServiceCard,
} from "@/components/SectorBody";
import ServiceBody, { type ServiceView } from "@/components/ServiceBody";
import CTASection from "@/components/CTASection";

// Static generation + ISR: pages are pre-rendered to static HTML and
// revalidated in the background so admin edits show up within the window.
export const revalidate = 60;
export const dynamicParams = true; // new slugs added in the CMS render on-demand

/* ----------------------------- data fetching ----------------------------- */

async function fetchSector(slug: string): Promise<SectorView | null> {
  const db = await safeSingle<SectorView>((sb) =>
    sb
      .from("sectors")
      .select("slug, name, description, hero_image_url, intro_image_url")
      .eq("slug", slug)
      .eq("published", true)
      .single()
  );
  if (db) return db;

  const fb = sectorFallback.find((s) => s.slug === slug);
  if (!fb) return null;
  return {
    slug: fb.slug,
    name: fb.name,
    description: null,
    hero_image_url: null,
    intro_image_url: null,
  };
}

async function fetchService(slug: string): Promise<ServiceView | null> {
  const db = await safeSingle<ServiceView>((sb) =>
    sb
      .from("services")
      .select(
        "slug, name, tagline, positioning_headline, benefits, capabilities, summary, description, hero_image_url, phase"
      )
      .eq("slug", slug)
      .eq("published", true)
      .single()
  );
  if (db) return db;

  const fb = serviceFallback.find((s) => s.slug === slug);
  if (!fb) return null;
  return {
    slug: fb.slug,
    name: fb.title,
    tagline: fb.points.join(" · "),
    positioning_headline: null,
    benefits: [...fb.points],
    capabilities: null,
    summary: null,
    description: null,
    hero_image_url: fb.img,
    phase: null,
  };
}

async function fetchCraft(slug: string): Promise<ServiceView | null> {
  const db = await safeSingle<ServiceView>((sb) =>
    sb
      .from("crafts")
      .select(
        "slug, name, tagline, positioning_headline, benefits, capabilities, summary, description, hero_image_url"
      )
      .eq("slug", slug)
      .eq("published", true)
      .single()
  );
  if (db) return { ...db, phase: null };

  const fb = craftFallback.find((c) => c.slug === slug);
  if (!fb) return null;
  return {
    slug: fb.slug,
    name: fb.title,
    tagline: fb.points.join(" · "),
    positioning_headline: null,
    benefits: [...fb.points],
    capabilities: null,
    summary: null,
    description: null,
    hero_image_url: fb.img,
    phase: null,
  };
}

async function fetchServiceCards(): Promise<ServiceCard[]> {
  const db = await safeList<ServiceCard>((sb) =>
    sb
      .from("services")
      .select("slug, name, tagline, hero_image_url, display_order")
      .eq("published", true)
      .order("display_order", { ascending: true })
  );
  if (db.length > 0) return db;

  return serviceFallback.map((s) => ({
    slug: s.slug,
    name: s.title,
    tagline: s.points.join(" · "),
    hero_image_url: s.img,
    points: [...s.points],
  }));
}

/* --------------------------- static generation --------------------------- */

export async function generateStaticParams() {
  const [dbSectors, dbServices, dbCrafts] = await Promise.all([
    safeList<{ slug: string }>((sb) =>
      sb.from("sectors").select("slug").eq("published", true)
    ),
    safeList<{ slug: string }>((sb) =>
      sb.from("services").select("slug").eq("published", true)
    ),
    safeList<{ slug: string }>((sb) =>
      sb.from("crafts").select("slug").eq("published", true)
    ),
  ]);

  const slugs = new Set<string>([
    ...sectorFallback.map((s) => s.slug),
    ...serviceFallback.map((s) => s.slug),
    ...craftFallback.map((s) => s.slug),
    ...dbSectors.map((s) => s.slug),
    ...dbServices.map((s) => s.slug),
    ...dbCrafts.map((s) => s.slug),
  ]);

  return [...slugs].map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const sector = await fetchSector(slug);
  if (sector) {
    return {
      title: `${sector.name} | Mericka Group`,
      description: `Mericka Group soft-craft scaffolding, coatings, insulation, and maintenance services for the ${sector.name} sector.`,
    };
  }

  const service = await fetchService(slug);
  if (service) {
    return {
      title: `${service.name} | Mericka Group`,
      description: service.tagline ?? undefined,
    };
  }

  const craft = await fetchCraft(slug);
  if (craft) {
    return {
      title: `${craft.name} | Mericka Group`,
      description: craft.tagline ?? undefined,
    };
  }

  return { title: "Mericka Group" };
}

/* -------------------------------- render --------------------------------- */

function Hero({
  title,
  imageUrl,
  backHref,
  backLabel,
}: {
  title: string;
  imageUrl: string | null;
  backHref: string;
  backLabel: string;
}) {
  return (
    <header className="relative h-[55vh] min-h-[420px] bg-brand-900 flex items-end overflow-hidden">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-900/80 to-brand-900/40" />
      <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-16">
        <Link
          href={backHref}
          className="text-brand-300 hover:text-brand-100 text-sm font-medium"
        >
          ← {backLabel}
        </Link>
        <h1 className="mt-4 text-5xl sm:text-6xl font-bold text-white max-w-3xl">
          {title}
        </h1>
      </div>
    </header>
  );
}

export default async function FlatPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Sectors take precedence, then services. Slugs don't collide in our data.
  const sector = await fetchSector(slug);
  if (sector) {
    const services = await fetchServiceCards();
    return (
      <article>
        <Hero
          title={sector.name}
          imageUrl={sector.hero_image_url}
          backHref="/sectors"
          backLabel="All Sectors"
        />
        <SectorBody sector={sector} services={services} />
        <CTASection />
      </article>
    );
  }

  const service = await fetchService(slug);
  if (service) {
    return (
      <article>
        <Hero
          title={service.name}
          imageUrl={service.hero_image_url}
          backHref="/services"
          backLabel="All Services"
        />
        <ServiceBody service={service} />
        <CTASection />
      </article>
    );
  }

  const craft = await fetchCraft(slug);
  if (craft) {
    return (
      <article>
        <Hero
          title={craft.name}
          imageUrl={craft.hero_image_url}
          backHref="/energy-services"
          backLabel="Energy Services"
        />
        <ServiceBody service={craft} />
        <CTASection />
      </article>
    );
  }

  notFound();
}
