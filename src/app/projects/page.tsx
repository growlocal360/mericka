import Link from "next/link";
import Image from "next/image";
import { safeList } from "@/lib/supabase/safe";

type Project = {
  id: string;
  slug: string;
  title: string;
  client: string | null;
  location: string | null;
  excerpt: string | null;
  featured_image: string | null;
  sectors: string[] | null;
};

export const metadata = {
  title: "Projects | Mericka Group",
  description: "Recent industrial projects by Mericka Group.",
};

export default async function ProjectsIndex() {
  const projects = await safeList<Project>((sb) =>
    sb.from("projects")
      .select("id, slug, title, client, location, excerpt, featured_image, sectors")
      .eq("published", true)
      .order("completed_at", { ascending: false, nullsFirst: false })
  );

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-16 max-w-3xl">
          <span className="text-sm tracking-wider font-semibold text-brand-accent uppercase">
            Projects
          </span>
          <h1 className="mt-3 text-5xl font-bold text-brand-900">Recent work</h1>
          <p className="mt-5 text-lg text-brand-600">
            A selection of recent industrial projects across our service lines.
          </p>
        </header>

        {projects.length === 0 ? (
          <p className="text-brand-600 italic">
            No published projects yet — add some from the admin to populate this page.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((p) => (
              <Link
                key={p.id}
                href={`/projects/${p.slug}`}
                className="group relative block h-80 rounded-2xl overflow-hidden bg-brand-100"
              >
                {p.featured_image && (
                  <Image
                    src={p.featured_image}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-900/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  {p.sectors?.[0] && (
                    <span className="inline-block px-3 py-1 mb-3 text-xs rounded-full bg-brand-accent/20 border border-brand-accent/40 text-brand-100 uppercase tracking-wider">
                      {p.sectors[0]}
                    </span>
                  )}
                  <h2 className="text-xl font-bold text-white mb-1">{p.title}</h2>
                  <p className="text-sm text-brand-300">
                    {[p.client, p.location].filter(Boolean).join(" · ")}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
