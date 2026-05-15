import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { safeList } from "@/lib/supabase/safe";
import ProjectsShowcaseClient from "./ProjectsShowcaseClient";

type Project = {
  id: string;
  slug: string;
  title: string;
  client: string | null;
  location: string | null;
  featured_image: string | null;
  sectors: string[] | null;
};

export default async function ProjectsShowcase() {
  const projects = await safeList<Project>((sb) =>
    sb.from("projects")
      .select("id, slug, title, client, location, featured_image, sectors")
      .eq("featured", true)
      .eq("published", true)
      .order("completed_at", { ascending: false, nullsFirst: false })
      .limit(3)
  );

  if (projects.length === 0) {
    return (
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-sm tracking-wider font-semibold text-brand-accent uppercase">
            Selected Projects
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-bold text-brand-900">Recent Work</h2>
          <p className="mt-6 text-brand-600 max-w-2xl mx-auto">
            Featured projects will appear here once added in the admin.
          </p>
          <Link
            href="/projects"
            className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-brand-300 text-brand-900 font-semibold hover:bg-brand-50 transition-colors"
          >
            View all projects <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    );
  }

  return <ProjectsShowcaseClient projects={projects} />;
}
