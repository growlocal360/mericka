import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { safeList } from "@/lib/supabase/safe";

type Article = {
  id: string;
  slug: string;
  title: string;
  type: "news" | "blog";
  excerpt: string | null;
  featured_image: string | null;
  published_at: string | null;
};

export const metadata = { title: "News | Mericka Group" };

export default async function NewsIndex() {
  const articles = await safeList<Article>((sb) =>
    sb.from("news_articles")
      .select("id, slug, title, type, excerpt, featured_image, published_at")
      .eq("published", true)
      .order("published_at", { ascending: false, nullsFirst: false })
  );

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-16 max-w-3xl">
          <span className="text-sm tracking-wider font-semibold text-brand-accent uppercase">
            News &amp; Blog
          </span>
          <h1 className="mt-3 text-5xl font-bold text-brand-900">From the field</h1>
        </header>

        {articles.length === 0 ? (
          <p className="text-brand-600 italic">No articles yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((a) => (
              <Link
                key={a.id}
                href={`/news/${a.slug}`}
                className="group block bg-white rounded-2xl overflow-hidden border border-brand-100 hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48 bg-brand-100">
                  {a.featured_image && (
                    <Image src={a.featured_image} alt={a.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-2 py-0.5 text-xs rounded-full bg-brand-accent/10 text-brand-accent uppercase tracking-wider">
                      {a.type}
                    </span>
                    {a.published_at && (
                      <time className="text-xs text-brand-500">
                        {format(new Date(a.published_at), "MMM d, yyyy")}
                      </time>
                    )}
                  </div>
                  <h2 className="text-lg font-bold text-brand-900 mb-2 group-hover:text-brand-highlight transition-colors">
                    {a.title}
                  </h2>
                  {a.excerpt && <p className="text-sm text-brand-600">{a.excerpt}</p>}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
