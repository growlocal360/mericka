"use client";

import { motion } from "framer-motion";

// "The Merickan Way" is identical across service and sector×service pages,
// so it lives in the template as a fixed, designed section.
const STEPS = [
  {
    n: "01",
    title: "Collaborate",
    body: "We discover together where we can add value — and the financial impact that has on your bottom line.",
  },
  {
    n: "02",
    title: "Plan",
    body: "We identify a project that benefits from our value-add and provide a customized proposal and execution plan.",
  },
  {
    n: "03",
    title: "Execute",
    body: "We start delivering results right away, leveraging EMMS to monitor progress and drive continuous improvement.",
  },
];

export default function MerickanWay() {
  return (
    <section className="py-20 sm:py-24 bg-brand-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-3xl"
        >
          <span className="text-sm tracking-wider font-semibold text-brand-accent uppercase">
            Our Process
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-bold text-white">The Merickan Way</h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative rounded-2xl border border-brand-800 bg-brand-900 p-8"
            >
              <span className="text-5xl font-bold text-brand-accent/30">{step.n}</span>
              <h3 className="mt-4 text-2xl font-bold text-white">{step.title}</h3>
              <p className="mt-3 text-brand-300 leading-relaxed">{step.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
