"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import ArticleContent from "@/components/editor/ArticleContent";
import MerickanWay from "@/components/MerickanWay";

export type ServiceView = {
  slug: string;
  name: string;
  tagline: string | null;
  positioning_headline: string | null;
  benefits: string[] | null;
  capabilities: string[] | null;
  summary: string | null;
  description: unknown;
  hero_image_url: string | null;
  phase: string | null;
};

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
};

export default function ServiceBody({ service }: { service: ServiceView }) {
  const benefits = service.benefits?.filter(Boolean) ?? [];
  const capabilities = service.capabilities?.filter(Boolean) ?? [];
  const hasIntro = !!service.positioning_headline || benefits.length > 0;

  return (
    <>
      {/* Intro — positioning headline + key benefits */}
      {hasIntro && (
        <section className="py-20 sm:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
                <span className="text-sm tracking-wider font-semibold text-brand-accent uppercase">
                  Overview
                </span>
                <h2 className="mt-3 text-4xl sm:text-5xl font-bold text-brand-900 leading-tight">
                  {service.positioning_headline ?? `${service.name} with Mericka Group`}
                </h2>
                {service.tagline && (
                  <p className="mt-5 text-lg text-brand-600 leading-relaxed">
                    {service.tagline}
                  </p>
                )}
              </motion.div>

              {benefits.length > 0 && (
                <motion.ul
                  {...fadeUp}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="space-y-4"
                >
                  {benefits.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <span className="mt-1 flex-none inline-flex items-center justify-center w-6 h-6 rounded-full bg-brand-accent/15 text-brand-accent">
                        <Check className="w-4 h-4" />
                      </span>
                      <span className="text-brand-700 leading-relaxed">{b}</span>
                    </li>
                  ))}
                </motion.ul>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Capabilities — how we help */}
      {capabilities.length > 0 && (
        <section className="py-20 sm:py-24 bg-gradient-brand-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="mb-12 max-w-3xl">
              <span className="text-sm tracking-wider font-semibold text-brand-accent uppercase">
                How We Help
              </span>
              <h2 className="mt-3 text-4xl sm:text-5xl font-bold text-brand-900">
                What we bring to your site
              </h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {capabilities.map((c, i) => (
                <motion.div
                  key={c}
                  {...fadeUp}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="bg-white rounded-2xl p-6 border border-brand-100"
                >
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-brand-accent/10 text-brand-accent mb-4">
                    <Check className="w-5 h-5" />
                  </span>
                  <p className="text-brand-700 leading-relaxed">{c}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <MerickanWay />

      {/* What We Do — closing summary */}
      {(service.summary || service.description != null) && (
        <section className="py-20 sm:py-28 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
              <span className="text-sm tracking-wider font-semibold text-brand-accent uppercase">
                What We Do
              </span>
              {service.summary && (
                <p className="mt-4 text-xl text-brand-700 leading-relaxed">{service.summary}</p>
              )}
              {service.description != null && (
                <div className="mt-6">
                  <ArticleContent content={service.description as never} />
                </div>
              )}
            </motion.div>
          </div>
        </section>
      )}
    </>
  );
}
