import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import ArticleContent from "@/components/editor/ArticleContent";
import { safeSingle } from "@/lib/supabase/safe";
import { services as fallback } from "@/lib/brand";

type Service = {
  slug: string;
  name: string;
  tagline: string | null;
  description: unknown;
  hero_image_url: string | null;
  phase: string | null;
};

async function fetchService(slug: string): Promise<Service | null> {
  const db = await safeSingle<Service>((sb) =>
    sb.from("services")
      .select("slug, name, tagline, description, hero_image_url, phase")
      .eq("slug", slug)
      .eq("published", true)
      .single()
  );
  if (db) return db;
  const fb = fallback.find((s) => s.slug === slug);
  if (!fb) return null;
  return {
    slug: fb.slug,
    name: fb.title,
    tagline: fb.points.join(" · "),
    description: null,
    hero_image_url: fb.img,
    phase: fb.slug,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await fetchService(slug);
  if (!data) return { title: "Service | Mericka Group" };
  return {
    title: `${data.name} | Mericka Group`,
    description: data.tagline ?? undefined,
  };
}

export default async function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await fetchService(slug);
  if (!data) notFound();

  return (
    <article>
      <header className="relative h-[60vh] min-h-[400px] bg-brand-900 flex items-end overflow-hidden">
        {data.hero_image_url && (
          <Image
            src={data.hero_image_url}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-900/80 to-brand-900/40" />
        <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-16">
          <Link href="/services" className="text-brand-300 hover:text-brand-100 text-sm font-medium">
            ← All Services
          </Link>
          <h1 className="mt-4 text-5xl sm:text-6xl font-bold text-white max-w-3xl">{data.name}</h1>
          {data.tagline && <p className="mt-4 text-xl text-brand-200 max-w-2xl">{data.tagline}</p>}
        </div>
      </header>

      <div className="py-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {data.description != null ? (
          <ArticleContent content={data.description as never} />
        ) : (
          <p className="text-brand-600 italic">
            Detailed description coming soon. Add content from the admin to see it here.
          </p>
        )}
      </div>
    </article>
  );
}
