"use client";

import { motion } from "framer-motion";
import { stats } from "@/lib/brand";

export default function StatsBar() {
  return (
    <section className="bg-brand-dark py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-5xl font-bold text-brand-highlight mb-2">{s.value}</div>
              <div className="text-brand-300 uppercase tracking-wider text-sm">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
