"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Waves, FlaskConical, Rocket, Cpu, Microchip, Droplet, LucideIcon } from "lucide-react";
import { sectors } from "@/lib/brand";

const iconMap: Record<string, LucideIcon> = {
  Waves,
  FlaskConical,
  Rocket,
  Cpu,
  Microchip,
  Droplet,
};

export default function SectorsGrid() {
  return (
    <section className="py-24 bg-gradient-brand-light grid-pattern relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center max-w-3xl mx-auto"
        >
          <span className="text-sm tracking-wider font-semibold text-brand-accent uppercase">
            Industries Served
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-bold text-brand-900">Built for the sectors that can&apos;t stop</h2>
          <p className="mt-5 text-lg text-brand-600 leading-relaxed">
            We work in high-stakes industrial environments where safety, schedule,
            and quality each carry real consequences.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectors.map((s, i) => {
            const Icon = iconMap[s.icon] ?? Waves;
            return (
              <motion.div
                key={s.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Link
                  href={`/${s.slug}`}
                  className="block h-full bg-white rounded-2xl p-8 border border-brand-100 hover:border-brand-accent/50 hover:shadow-xl transition-all group"
                >
                  <div className="inline-flex bg-brand-accent/10 rounded-xl p-3 mb-5">
                    <Icon className="w-6 h-6 text-brand-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-900 mb-2">{s.name}</h3>
                  <p className="text-sm text-brand-600 leading-relaxed mb-5">{s.description}</p>
                  <span className="inline-flex items-center gap-1 text-brand-accent group-hover:text-brand-highlight transition-colors text-sm font-semibold">
                    Learn more <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
