"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ArticleContent from "@/components/editor/ArticleContent";

export type SectorView = {
  slug: string;
  name: string;
  description: unknown;
  hero_image_url: string | null;
  intro_image_url: string | null;
};

export type ServiceCard = {
  slug: string;
  name: string;
  tagline: string | null;
  hero_image_url: string | null;
  points?: string[];
};

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
};

export default function SectorBody({
  sector,
  services,
}: {
  sector: SectorView;
  services: ServiceCard[];
}) {
  const hasDescription = sector.description != null;
  const introImage = sector.intro_image_url ?? sector.hero_image_url;

  return (
    <>
      {/* Narrative — "Mericka in [Sector]" — intentionally placed ABOVE the offerings */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
              <span className="text-sm tracking-wider font-semibold text-brand-accent uppercase">
                Our Expertise
              </span>
              <h2 className="mt-3 text-4xl sm:text-5xl font-bold text-brand-900">
                Mericka in {sector.name}
              </h2>
              <div className="mt-6">
                {hasDescription ? (
                  <ArticleContent content={sector.description as never} />
                ) : (
                  <p className="text-lg text-brand-600 leading-relaxed">
                    Sector overview coming soon. Add content from the admin to see it here.
                  </p>
                )}
              </div>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-brand-highlight text-white font-semibold hover:bg-brand-900 transition-colors"
              >
                Collaborate Now <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

            {introImage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="relative h-80 lg:h-[28rem] rounded-2xl overflow-hidden bg-brand-100"
              >
                <Image
                  src={introImage}
                  alt={sector.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Offerings — the disciplines we bring to this sector */}
      <section className="py-20 sm:py-24 bg-gradient-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="mb-14 max-w-3xl">
            <span className="text-sm tracking-wider font-semibold text-brand-accent uppercase">
              What We Do
            </span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-bold text-brand-900">
              Our offerings for {sector.name}
            </h2>
            <p className="mt-5 text-lg text-brand-600 leading-relaxed">
              The soft-craft disciplines we staff and execute to keep {sector.name} facilities
              running safely and on schedule.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((s, index) => (
              <motion.div
                key={s.slug}
                {...fadeUp}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  href={`/${s.slug}`}
                  className="relative block h-96 rounded-2xl overflow-hidden group bg-brand-900"
                >
                  {s.hero_image_url && (
                    <Image
                      src={s.hero_image_url}
                      alt={s.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-900/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-7">
                    <h3 className="text-2xl font-bold text-white mb-3">{s.name}</h3>
                    {s.points?.length ? (
                      <ul className="space-y-1 mb-4">
                        {s.points.map((p) => (
                          <li
                            key={p}
                            className="text-sm text-brand-200 flex items-center gap-2"
                          >
                            <span className="w-1 h-1 rounded-full bg-brand-accent" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    ) : s.tagline ? (
                      <p className="text-sm text-brand-200 mb-4 line-clamp-2">{s.tagline}</p>
                    ) : null}
                    <span className="inline-flex items-center gap-1 text-brand-accent group-hover:text-brand-highlight transition-colors text-sm font-semibold">
                      Learn more <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
