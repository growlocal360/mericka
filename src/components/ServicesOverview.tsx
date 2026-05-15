"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/brand";

export default function ServicesOverview() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center max-w-3xl mx-auto"
        >
          <span className="text-sm tracking-wider font-semibold text-brand-accent uppercase">
            What We Do
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-bold text-brand-900">
            Services across every phase
          </h2>
          <p className="mt-5 text-lg text-brand-600 leading-relaxed">
            From pre-construction planning to outage turnarounds, we staff and
            execute the disciplines that keep industrial facilities running.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s, index) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                href={`/services/${s.slug}`}
                className="relative block h-96 rounded-2xl overflow-hidden group"
              >
                <Image
                  src={s.img}
                  alt={s.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-900/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <h3 className="text-2xl font-bold text-white mb-3">{s.title}</h3>
                  <ul className="space-y-1 mb-4">
                    {s.points.map((p) => (
                      <li key={p} className="text-sm text-brand-200 flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-brand-accent" />
                        {p}
                      </li>
                    ))}
                  </ul>
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
  );
}
