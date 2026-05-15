"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

type Project = {
  id: string;
  slug: string;
  title: string;
  client: string | null;
  location: string | null;
  featured_image: string | null;
  sectors: string[] | null;
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="relative block h-96 rounded-2xl overflow-hidden group bg-brand-100"
    >
      {project.featured_image && (
        <Image
          src={project.featured_image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-900/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        {project.sectors && project.sectors[0] && (
          <span className="inline-block px-3 py-1 mb-3 text-xs rounded-full bg-brand-accent/20 border border-brand-accent/40 text-brand-100 uppercase tracking-wider">
            {project.sectors[0]}
          </span>
        )}
        <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
        <p className="text-sm text-brand-300">
          {[project.client, project.location].filter(Boolean).join(" · ")}
        </p>
      </div>
    </Link>
  );
}

export default function ProjectsShowcaseClient({ projects }: { projects: Project[] }) {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex items-end justify-between flex-wrap gap-6"
        >
          <div>
            <span className="text-sm tracking-wider font-semibold text-brand-accent uppercase">
              Selected Projects
            </span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-bold text-brand-900">Recent Work</h2>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-brand-900 font-semibold hover:text-brand-highlight transition-colors"
          >
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <ProjectCard project={p} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
