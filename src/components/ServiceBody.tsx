import ArticleContent from "@/components/editor/ArticleContent";

export type ServiceView = {
  slug: string;
  name: string;
  tagline: string | null;
  description: unknown;
  hero_image_url: string | null;
  phase: string | null;
};

/**
 * Service detail body. For now this renders the rich-text description.
 * The full structured layout (pain points → how-we-help → "The Merickan Way"
 * → "What We Do") is the next build step and will slot in here.
 */
export default function ServiceBody({ service }: { service: ServiceView }) {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {service.description != null ? (
          <ArticleContent content={service.description as never} />
        ) : (
          <p className="text-lg text-brand-600 italic">
            Detailed description coming soon. Add content from the admin to see it here.
          </p>
        )}
      </div>
    </section>
  );
}
