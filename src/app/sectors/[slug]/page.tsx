import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import ArticleContent from "@/components/editor/ArticleContent";
import { safeSingle } from "@/lib/supabase/safe";
import { sectors as fallback } from "@/lib/brand";

type Sector = {
  slug: string;
  name: string;
  description: unknown;
  hero_image_url: string | null;
};

async function fetchSector(slug: string): Promise<Sector | null> {
  const db = await safeSingle<Sector>((sb) =>
    sb.from("sectors")
      .select("slug, name, description, hero_image_url")
      .eq("slug", slug)
      .eq("published", true)
      .single()
  );
  if (db) return db;
  const fb = fallback.find((s) => s.slug === slug);
  if (!fb) return null;
  return { slug: fb.slug, name: fb.name, description: null, hero_image_url: null };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await fetchSector(slug);
  if (!data) return { title: "Sector | Mericka Group" };
  return { title: `${data.name} | Mericka Group` };
}

export default async function SectorDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await fetchSector(slug);
  if (!data) notFound();

  return (
    <article>
      <header className="relative h-[50vh] min-h-[360px] bg-brand-900 flex items-end overflow-hidden">
        {data.hero_image_url && (
          <Image src={data.hero_image_url} alt="" fill priority sizes="100vw" className="object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-900/80 to-brand-900/40" />
        <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-16">
          <Link href="/sectors" className="text-brand-300 hover:text-brand-100 text-sm font-medium">
            ← All Sectors
          </Link>
          <h1 className="mt-4 text-5xl sm:text-6xl font-bold text-white">{data.name}</h1>
        </div>
      </header>
      <div className="py-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {data.description != null ? (
          <ArticleContent content={data.description as never} />
        ) : (
          <p className="text-brand-600 italic">Sector overview coming soon.</p>
        )}
      </div>
    </article>
  );
}
