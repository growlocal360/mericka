import Image from "next/image";
import Link from "next/link";
import { Linkedin, Facebook, Instagram, Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { brand, services } from "@/lib/brand";

const companyLinks = [
  { href: "/company", label: "About" },
  { href: "/energy-services", label: "Energy Services" },
  { href: "/sectors", label: "Sectors" },
  { href: "/projects", label: "Projects" },
  { href: "/careers", label: "Careers" },
  { href: "/news", label: "News" },
];

function FooterCol({
  label,
  links,
  className,
}: {
  label: string;
  links: { href: string; label: string }[];
  className?: string;
}) {
  return (
    <div className={className}>
      <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-brand-highlight">{label}</h3>
      <ul className="mt-5 space-y-3 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="group inline-flex items-center gap-2 text-brand-300 transition-colors hover:text-white"
            >
              <span className="h-px w-0 bg-brand-highlight transition-all duration-300 group-hover:w-4" />
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden text-brand-200 bg-[linear-gradient(135deg,#0d3676_0%,#0d1b3a_46%,#151725_100%)]">
      {/* red safety stripe */}
      <div className="h-1 w-full bg-[linear-gradient(to_right,#be1f24,#7a1418)]" />

      {/* atmosphere: red glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-[8%] h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(190,31,36,0.20),transparent_70%)] blur-2xl" />
      </div>

      {/* faint symbol watermark — 75% of footer height, anchored bottom-right */}
      <Image
        src={brand.symbol}
        alt=""
        width={460}
        height={460}
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-[75%] w-auto max-w-none select-none opacity-[0.05]"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* CTA band */}
        <div className="flex flex-col gap-8 border-b border-white/10 py-14 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-brand-highlight">
              Let&apos;s collaborate
            </span>
            <h2 className="mt-4 max-w-xl text-3xl font-bold leading-tight text-white sm:text-4xl">
              Engineered access, coatings &amp; uptime — delivered on schedule.
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-lg bg-brand-highlight px-6 py-3.5 font-semibold text-white transition hover:brightness-110"
            >
              Collaborate Now
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <a
              href={brand.phoneHref}
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
            >
              <Phone className="h-4 w-4 text-brand-highlight" /> {brand.phone}
            </a>
          </div>
        </div>

        {/* main grid */}
        <div className="grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Image
              src={brand.logoWhite}
              alt={brand.short}
              width={200}
              height={45}
              className="h-10 w-auto"
            />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-brand-300">{brand.tagline}.</p>
            <div className="mt-6 flex items-center gap-3">
              {[
                { Icon: Linkedin, label: "LinkedIn" },
                { Icon: Facebook, label: "Facebook" },
                { Icon: Instagram, label: "Instagram" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-brand-200 transition hover:border-brand-highlight hover:bg-brand-highlight/20 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterCol
            className="lg:col-span-3"
            label="Services"
            links={services.map((s) => ({ href: `/${s.slug}`, label: s.title }))}
          />
          <FooterCol className="lg:col-span-2" label="Company" links={companyLinks} />

          <div className="lg:col-span-3">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-brand-highlight">
              Headquarters
            </h3>
            <address className="mt-5 space-y-4 text-sm not-italic">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-none text-brand-highlight" />
                <span className="text-brand-300">
                  {brand.hqLines.map((line, i) => (
                    <span key={i} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </div>
              <a
                href={brand.phoneHref}
                className="flex items-center gap-3 text-brand-200 transition-colors hover:text-white"
              >
                <Phone className="h-4 w-4 flex-none text-brand-highlight" />
                {brand.phone}
              </a>
              <a
                href={brand.emailHref}
                className="flex items-center gap-3 text-brand-200 transition-colors hover:text-white"
              >
                <Mail className="h-4 w-4 flex-none text-brand-highlight" />
                {brand.email}
              </a>
            </address>
          </div>
        </div>

        {/* bottom bar */}
        <div className="flex flex-col gap-3 border-t border-white/10 py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-brand-400">
            © {year} {brand.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-xs">
            <span className="font-mono uppercase tracking-[0.2em] text-brand-500">
              Engineered for uptime
            </span>
            <Link href="/privacy" className="text-brand-400 transition-colors hover:text-white">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
