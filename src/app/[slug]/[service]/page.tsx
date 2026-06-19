import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import { safeSingle, safeList } from "@/lib/supabase/safe";
import { sectors, services } from "@/lib/brand";
import ArticleContent from "@/components/editor/ArticleContent";
import MerickanWay from "@/components/MerickanWay";
import CTASection from "@/components/CTASection";

export const revalidate = 60;
export const dynamicParams = true;

type Combo = {
  sector_slug: string;
  service_slug: string;
  title: string;
  meta_description: string | null;
  content: unknown;
  hero_image_url: string | null;
};

async function fetchCombo(sector: string, service: string): Promise<Combo | null> {
  return safeSingle<Combo>((sb) =>
    sb
      .from("sector_services")
      .select("sector_slug, service_slug, title, meta_description, content, hero_image_url")
      .eq("sector_slug", sector)
      .eq("service_slug", service)
      .eq("published", true)
      .single()
  );
}

export async function generateStaticParams() {
  const combos = await safeList<{ sector_slug: string; service_slug: string }>((sb) =>
    sb.from("sector_services").select("sector_slug, service_slug").eq("published", true)
  );
  return combos.map((c) => ({ slug: c.sector_slug, service: c.service_slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; service: string }>;
}): Promise<Metadata> {
  const { slug, service } = await params;
  const combo = await fetchCombo(slug, service);
  if (!combo) return { title: "Mericka Group" };
  return {
    title: `${combo.title} | Mericka Group`,
    description: combo.meta_description ?? undefined,
  };
}

export default async function SectorServicePage({
  params,
}: {
  params: Promise<{ slug: string; service: string }>;
}) {
  const { slug, service } = await params;
  const combo = await fetchCombo(slug, service);
  if (!combo) notFound();

  const sectorName = sectors.find((s) => s.slug === slug)?.name ?? slug;
  const serviceName = services.find((s) => s.slug === service)?.title ?? service;

  return (
    <article>
      <header className="relative h-[55vh] min-h-[420px] bg-brand-900 flex items-end overflow-hidden">
        {combo.hero_image_url && (
          <Image
            src={combo.hero_image_url}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-900/80 to-brand-900/40" />
        <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-16">
          <nav className="flex flex-wrap items-center gap-1.5 text-sm font-medium text-brand-300">
            <Link href={`/${slug}`} className="hover:text-brand-100">
              {sectorName}
            </Link>
            <ChevronRight className="w-4 h-4 text-brand-500" />
            <Link href={`/${service}`} className="hover:text-brand-100">
              {serviceName}
            </Link>
          </nav>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold text-white max-w-4xl">
            {combo.title}
          </h1>
        </div>
      </header>

      <div className="py-16 sm:py-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {combo.content != null ? (
          <ArticleContent content={combo.content as never} />
        ) : (
          <p className="text-brand-600 italic">Details coming soon.</p>
        )}
      </div>

      <MerickanWay />
      <CTASection />
    </article>
  );
}
