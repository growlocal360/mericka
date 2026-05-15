import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import ArticleContent from "@/components/editor/ArticleContent";
import { safeSingle, safeList } from "@/lib/supabase/safe";

type Project = {
  id: string;
  slug: string;
  title: string;
  client: string | null;
  location: string | null;
  excerpt: string | null;
  description: unknown;
  featured_image: string | null;
  services_used: string[] | null;
  sectors: string[] | null;
  completed_at: string | null;
};

type ProjectImage = {
  id: string;
  image_url: string;
  caption: string | null;
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
        "id, slug, title, client, location, excerpt, description, featured_image, services_used, sectors, completed_at"
      )
      .eq("slug", slug)
      .eq("published", true)
      .single()
  );
  if (!data) notFound();

  const images = await safeList<ProjectImage>((sb) =>
    sb.from("project_images")
      .select("id, image_url, caption")
      .eq("project_id", data.id)
      .order("display_order", { ascending: true })
  );

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
            className="object-cover"
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

      <div className="py-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {data.excerpt && <p className="text-xl text-brand-700 leading-relaxed mb-8">{data.excerpt}</p>}
        {data.description != null ? (
          <ArticleContent content={data.description as never} />
        ) : (
          <p className="text-brand-600 italic">No detailed description yet.</p>
        )}
      </div>

      {images.length > 0 && (
        <div className="pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((img) => (
              <figure key={img.id} className="rounded-xl overflow-hidden bg-brand-100">
                <div className="relative h-64">
                  <Image src={img.image_url} alt={img.caption ?? ""} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                </div>
                {img.caption && (
                  <figcaption className="p-3 text-sm text-brand-600">{img.caption}</figcaption>
                )}
              </figure>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
