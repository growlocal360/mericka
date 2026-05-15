import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import type { Metadata } from "next";
import ArticleContent from "@/components/editor/ArticleContent";
import { safeSingle } from "@/lib/supabase/safe";

type Article = {
  slug: string;
  title: string;
  type: "news" | "blog";
  excerpt: string | null;
  content: unknown;
  featured_image: string | null;
  published_at: string | null;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await safeSingle<Article>((sb) =>
    sb.from("news_articles").select("title, excerpt").eq("slug", slug).eq("published", true).single()
  );
  if (!data) return { title: "Article | Mericka Group" };
  return { title: `${data.title} | Mericka Group`, description: data.excerpt ?? undefined };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await safeSingle<Article>((sb) =>
    sb.from("news_articles")
      .select("slug, title, type, excerpt, content, featured_image, published_at")
      .eq("slug", slug)
      .eq("published", true)
      .single()
  );
  if (!data) notFound();

  return (
    <article className="pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/news" className="text-brand-accent hover:text-brand-highlight text-sm font-medium">
          ← All articles
        </Link>
        <div className="mt-6 flex items-center gap-3 mb-5">
          <span className="px-2 py-0.5 text-xs rounded-full bg-brand-accent/10 text-brand-accent uppercase tracking-wider">
            {data.type}
          </span>
          {data.published_at && (
            <time className="text-sm text-brand-500">
              {format(new Date(data.published_at), "MMMM d, yyyy")}
            </time>
          )}
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-brand-900 leading-tight">{data.title}</h1>
        {data.excerpt && <p className="mt-5 text-xl text-brand-700">{data.excerpt}</p>}

        {data.featured_image && (
          <div className="relative h-80 sm:h-[420px] my-10 rounded-2xl overflow-hidden bg-brand-100">
            <Image src={data.featured_image} alt={data.title} fill priority sizes="(max-width: 768px) 100vw, 768px" className="object-cover" />
          </div>
        )}

        {!!data.content && <ArticleContent content={data.content as never} />}
      </div>
    </article>
  );
}
