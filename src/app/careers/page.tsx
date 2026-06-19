import Link from "next/link";
import { ArrowRight, MapPin, Briefcase } from "lucide-react";
import { safeList } from "@/lib/supabase/safe";

type Job = {
  id: string;
  slug: string;
  title: string;
  department: string | null;
  location: string | null;
  employment_type: string | null;
};

export const revalidate = 60;

export const metadata = { title: "Careers | Mericka Group" };

export default async function CareersIndex() {
  const jobs = await safeList<Job>((sb) =>
    sb.from("job_postings")
      .select("id, slug, title, department, location, employment_type")
      .eq("published", true)
      .order("created_at", { ascending: false })
  );

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-12 max-w-3xl">
          <span className="text-sm tracking-wider font-semibold text-brand-accent uppercase">Careers</span>
          <h1 className="mt-3 text-5xl font-bold text-brand-900">Join the crew</h1>
          <p className="mt-5 text-lg text-brand-600">
            Build a career in industrial services with a team that takes safety
            seriously and gets the work done.
          </p>
        </header>

        {jobs.length === 0 ? (
          <div className="bg-brand-50 border border-brand-100 rounded-2xl p-10 text-center">
            <p className="text-brand-700 mb-4">No open roles at the moment.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 text-brand-accent hover:text-brand-highlight font-semibold">
              Reach out anyway <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {jobs.map((j) => (
              <Link
                key={j.id}
                href={`/careers/${j.slug}`}
                className="flex items-center justify-between bg-white border border-brand-100 rounded-xl p-6 hover:border-brand-accent/50 hover:shadow-md transition-all"
              >
                <div>
                  <h2 className="text-xl font-bold text-brand-900">{j.title}</h2>
                  <div className="mt-2 flex flex-wrap gap-4 text-sm text-brand-600">
                    {j.department && (
                      <span className="inline-flex items-center gap-1.5">
                        <Briefcase className="w-4 h-4" /> {j.department}
                      </span>
                    )}
                    {j.location && (
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" /> {j.location}
                      </span>
                    )}
                    {j.employment_type && <span>{j.employment_type}</span>}
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-brand-accent" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
