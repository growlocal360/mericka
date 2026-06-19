"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Phone } from "lucide-react";
import { brand } from "@/lib/brand";

export default function CTASection() {
  return (
    <section className="relative py-24 bg-gradient-to-br from-brand-accent to-brand-highlight grid-pattern overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-brand-950 max-w-3xl mx-auto leading-tight">
            Ready to scope your next turnaround or build?
          </h2>
          <p className="mt-5 text-lg text-brand-950/80 max-w-2xl mx-auto">
            Tell us about your site, your schedule, and your safety targets. We&apos;ll come back
            with a constructable plan.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-brand-950 text-white font-semibold hover:bg-brand-900 transition-colors"
            >
              Get In Touch
              <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <a
              href={brand.phoneHref}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-white/90 text-brand-950 font-semibold hover:bg-white transition-colors"
            >
              <Phone className="w-5 h-5" /> Call {brand.phone}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
