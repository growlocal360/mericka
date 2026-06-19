import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { MapPin, Briefcase, DollarSign } from "lucide-react";
import ArticleContent from "@/components/editor/ArticleContent";
import { safeSingle } from "@/lib/supabase/safe";
import GetInTouchButton from "@/components/GetInTouchButton";

type Job = {
  slug: string;
  title: string;
  department: string | null;
  location: string | null;
  employment_type: string | null;
  description: unknown;
  requirements: unknown;
  salary_range: string | null;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await safeSingle<Job>((sb) =>
    sb.from("job_postings").select("title").eq("slug", slug).eq("published", true).single()
  );
  if (!data) return { title: "Career | Mericka Group" };
  return { title: `${data.title} | Mericka Group` };
}

export default async function JobDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await safeSingle<Job>((sb) =>
    sb.from("job_postings")
      .select("slug, title, department, location, employment_type, description, requirements, salary_range")
      .eq("slug", slug)
      .eq("published", true)
      .single()
  );
  if (!data) notFound();

  return (
    <article className="pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/careers" className="text-brand-accent hover:text-brand-highlight text-sm font-medium">
          ← All Careers
        </Link>
        <h1 className="mt-6 text-5xl font-bold text-brand-900">{data.title}</h1>
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-brand-600">
          {data.department && (
            <span className="inline-flex items-center gap-1.5"><Briefcase className="w-4 h-4" /> {data.department}</span>
          )}
          {data.location && (
            <span className="inline-flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {data.location}</span>
          )}
          {data.salary_range && (
            <span className="inline-flex items-center gap-1.5"><DollarSign className="w-4 h-4" /> {data.salary_range}</span>
          )}
          {data.employment_type && <span>{data.employment_type}</span>}
        </div>

        {!!data.description && (
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-brand-900 mb-4">About the role</h2>
            <ArticleContent content={data.description as never} />
          </section>
        )}
        {!!data.requirements && (
          <section className="mt-10">
            <h2 className="text-2xl font-bold text-brand-900 mb-4">Requirements</h2>
            <ArticleContent content={data.requirements as never} />
          </section>
        )}

        <div className="mt-12">
          <GetInTouchButton />
        </div>
      </div>
    </article>
  );
}
