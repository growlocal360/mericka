import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { services as fallback } from "@/lib/brand";
import { safeList } from "@/lib/supabase/safe";

type Service = {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  hero_image_url: string | null;
  display_order: number;
};

export const metadata = {
  title: "Services | Mericka Group",
  description: "Pre-construction, execution, and maintenance & outage services.",
};

export default async function ServicesIndex() {
  const fromDb = await safeList<Service>((sb) =>
    sb.from("services")
      .select("id, slug, name, tagline, hero_image_url, display_order")
      .eq("published", true)
      .order("display_order", { ascending: true })
  );

  const list =
    fromDb.length > 0
      ? fromDb
      : fallback.map((s, i) => ({
          id: s.slug,
          slug: s.slug,
          name: s.title,
          tagline: s.points.join(" · "),
          hero_image_url: s.img,
          display_order: i,
        }));

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-16 max-w-3xl">
          <span className="text-sm tracking-wider font-semibold text-brand-accent uppercase">
            Services
          </span>
          <h1 className="mt-3 text-5xl font-bold text-brand-900">What we deliver</h1>
          <p className="mt-5 text-lg text-brand-600">
            Disciplines and phases that keep industrial facilities running.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-8">
          {list.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group block bg-white rounded-2xl overflow-hidden border border-brand-100 hover:shadow-xl transition-shadow"
            >
              <div className="relative h-56 bg-brand-100">
                {s.hero_image_url && (
                  <Image
                    src={s.hero_image_url}
                    alt={s.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold text-brand-900 mb-2">{s.name}</h2>
                {s.tagline && <p className="text-sm text-brand-600 mb-4">{s.tagline}</p>}
                <span className="inline-flex items-center gap-1 text-brand-accent group-hover:text-brand-highlight transition-colors text-sm font-semibold">
                  Learn more <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
