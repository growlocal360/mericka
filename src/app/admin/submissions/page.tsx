import { format } from "date-fns";
import { createClient } from "@/lib/supabase/server";

type Submission = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string;
  read: boolean;
  created_at: string;
};

export default async function SubmissionsPage() {
  let submissions: Submission[] = [];
  let error: string | null = null;
  try {
    const sb = await createClient();
    const { data, error: err } = await sb
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });
    if (err) error = err.message;
    submissions = (data as Submission[]) ?? [];
  } catch (e) {
    error = e instanceof Error ? e.message : "Server error";
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-brand-900">Contact Submissions</h1>
      <p className="text-brand-600 mt-1">Messages from the public contact form.</p>
      {error && <p className="mt-6 text-sm text-brand-highlight">{error}</p>}
      <div className="mt-8 grid gap-4">
        {submissions.length === 0 ? (
          <p className="text-brand-500 italic">No submissions yet.</p>
        ) : (
          submissions.map((s) => (
            <article
              key={s.id}
              className="bg-white border border-brand-100 rounded-xl p-6"
            >
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div>
                  <h2 className="font-bold text-brand-900">{s.name}</h2>
                  <p className="text-sm text-brand-600">
                    <a href={`mailto:${s.email}`} className="hover:text-brand-highlight">{s.email}</a>
                    {s.phone && <> · <a href={`tel:${s.phone}`} className="hover:text-brand-highlight">{s.phone}</a></>}
                    {s.company && <> · {s.company}</>}
                  </p>
                </div>
                <time className="text-xs text-brand-500">
                  {format(new Date(s.created_at), "MMM d, yyyy 'at' h:mm a")}
                </time>
              </div>
              <p className="mt-4 text-brand-800 leading-relaxed whitespace-pre-wrap">{s.message}</p>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
