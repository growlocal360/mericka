"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, ArrowRight, Shield } from "lucide-react";
import { brand, heroImage } from "@/lib/brand";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-brand-900">
      <Image
        src={heroImage}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-900/85 via-brand-900/75 to-brand-950/85" />

      <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-32 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-brand-highlight/10 border border-brand-highlight/20 rounded-full mb-8"
        >
          <Shield className="w-4 h-4 text-brand-highlight" />
          <span className="text-sm font-medium text-brand-100">{brand.tagline}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight max-w-4xl"
        >
          Industrial work,{" "}
          <span className="text-gradient">engineered</span>
          <br />
          for uptime.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-xl text-brand-200 leading-relaxed max-w-2xl"
        >
          Scaffolding, painting, insulation, and fireproofing — delivered across
          pre-construction, execution, and turnaround phases by a team that knows
          the cost of a missed window.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-brand-highlight text-white font-semibold hover:brightness-110 transition-all"
          >
            Get a Quote <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg border border-brand-300/40 text-white font-semibold hover:bg-white/10 transition-all"
          >
            Our Services
          </Link>
          <a
            href={brand.phoneHref}
            className="inline-flex items-center gap-2 px-6 py-3.5 text-brand-100 hover:text-brand-highlight transition-colors font-medium"
          >
            <Phone className="w-5 h-5" /> {brand.phone}
          </a>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-7 h-11 rounded-full border-2 border-brand-200/60 flex items-start justify-center p-1.5">
          <div className="w-1.5 h-2.5 rounded-full bg-brand-200/80" />
        </div>
      </motion.div>

      <svg
        className="absolute bottom-0 left-0 w-full h-20 z-0"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
      >
        <path fill="#ffffff" d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z" />
      </svg>
    </section>
  );
}
