"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { marqueeImages } from "@/lib/brand";

export default function ImageMarquee() {
  const a = marqueeImages;
  const b = [...marqueeImages].reverse();

  return (
    <section className="py-20 bg-brand-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="text-sm tracking-wider font-semibold text-brand-accent uppercase">
            On Site
          </span>
          <h2 className="mt-3 text-4xl font-bold text-brand-900">Work in motion</h2>
          <p className="mt-4 text-brand-600">
            Snapshots from refineries, fabs, and turnarounds across the country.
          </p>
        </motion.div>
      </div>

      <MarqueeRow images={a} direction="left" />
      <div className="h-4" />
      <MarqueeRow images={b} direction="right" />
    </section>
  );
}

function MarqueeRow({ images, direction }: { images: string[]; direction: "left" | "right" }) {
  const anim =
    direction === "left"
      ? "animate-[var(--animate-marquee)]"
      : "animate-[var(--animate-marquee-reverse)]";
  return (
    <div className="group overflow-hidden">
      <div className={`flex w-max ${anim} group-hover:[animation-play-state:paused]`}>
        {[...images, ...images].map((src, i) => (
          <div key={i} className="mx-2 relative h-48 w-72 rounded-lg overflow-hidden flex-shrink-0">
            <Image src={src} alt="" fill sizes="288px" className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
