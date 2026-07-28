import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import ArticleContent from "@/components/editor/ArticleContent";
import { safeSingle } from "@/lib/supabase/safe";
import { getClientLogo } from "@/lib/clients";

type Project = {
  id: string;
  slug: string;
  title: string;
  client: string | null;
  location: string | null;
  excerpt: string | null;
  description: unknown;
  featured_image: string | null;
  gallery_images: string[] | null;
  services_used: string[] | null;
  sectors: string[] | null;
  completed_at: string | null;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await safeSingle<Project>((sb) =>
    sb.from("projects").select("title, excerpt").eq("slug", slug).eq("published", true).single()
  );
  if (!data) return { title: "Project | Mericka Group" };
  return { title: `${data.title} | Mericka Group`, description: data.excerpt ?? undefined };
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await safeSingle<Project>((sb) =>
    sb.from("projects")
      .select(
        "id, slug, title, client, location, excerpt, description, featured_image, gallery_images, services_used, sectors, completed_at"
      )
      .eq("slug", slug)
      .eq("published", true)
      .single()
  );
  if (!data) notFound();

  const clientLogo = await getClientLogo(data.client);

  return (
    <article>
      <header className="relative h-[60vh] min-h-[420px] bg-brand-900 flex items-end overflow-hidden">
        {data.featured_image && (
          <Image
            src={data.featured_image}
            alt=""
            fill
            priority
            sizes="100vw"
            unoptimized={data.featured_image.endsWith(".svg")}
            className={data.featured_image.endsWith(".svg") ? "object-contain p-16 opacity-60" : "object-cover"}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-900/80 to-brand-900/40" />
        <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-16">
          <Link href="/projects" className="text-brand-300 hover:text-brand-100 text-sm font-medium">
            ← All Projects
          </Link>
          <h1 className="mt-4 text-5xl sm:text-6xl font-bold text-white max-w-4xl">{data.title}</h1>
          <p className="mt-4 text-lg text-brand-200">
            {[data.client, data.location].filter(Boolean).join(" · ")}
          </p>
        </div>
      </header>

      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Main content */}
          <div className="lg:col-span-2">
            {data.featured_image && (
              <div className="relative mb-10 aspect-video w-full overflow-hidden rounded-2xl bg-brand-100">
                <Image
                  src={data.featured_image}
                  alt={data.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  unoptimized={data.featured_image.endsWith(".svg")}
                  className={data.featured_image.endsWith(".svg") ? "object-contain p-10" : "object-cover"}
                />
              </div>
            )}
            {data.excerpt && <p className="text-xl text-brand-700 leading-relaxed mb-8">{data.excerpt}</p>}
            {data.description != null ? (
              <ArticleContent content={data.description as never} />
            ) : (
              <p className="text-brand-600 italic">No detailed description yet.</p>
            )}
            {data.gallery_images && data.gallery_images.length > 0 && (
              <div className="mt-12">
                <h2 className="mb-4 text-xs uppercase tracking-wider font-semibold text-brand-500">
                  Project Gallery
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {data.gallery_images.map((url, i) => (
                    <div key={`${url}-${i}`} className="relative aspect-square overflow-hidden rounded-xl bg-brand-100">
                      <Image
                        src={url}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 50vw, 22vw"
                        unoptimized={url.endsWith(".svg")}
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar: client logo + project metadata */}
          <aside className="lg:col-span-1 self-start space-y-8 lg:sticky lg:top-28">
            {clientLogo && (
              <div>
                <h2 className="text-xs uppercase tracking-wider font-semibold text-brand-500 mb-3">Client</h2>
                <div className="flex h-28 items-center justify-center rounded-2xl border border-brand-100 bg-white p-6">
                  <div className="relative h-14 w-full">
                    <Image src={clientLogo} alt={data.client ?? ""} fill unoptimized className="object-contain" />
                  </div>
                </div>
              </div>
            )}

            {data.sectors && data.sectors.length > 0 && (
              <div>
                <h2 className="text-xs uppercase tracking-wider font-semibold text-brand-500 mb-3">Sectors</h2>
                <ul className="flex flex-wrap gap-2">
                  {data.sectors.map((s) => (
                    <li key={s} className="rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-sm text-brand-700">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {data.services_used && data.services_used.length > 0 && (
              <div>
                <h2 className="text-xs uppercase tracking-wider font-semibold text-brand-500 mb-3">Services Used</h2>
                <ul className="space-y-2">
                  {data.services_used.map((s) => (
                    <li key={s} className="flex items-center gap-2.5 text-sm text-brand-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-highlight" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </div>
    </article>
  );
}
