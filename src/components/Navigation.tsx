"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import clsx from "clsx";
import { brand, services, sectors } from "@/lib/brand";

type DropdownKey = "services" | "sectors" | "company" | null;

const companyLinks = [
  { href: "/company", label: "About" },
  { href: "/company#team", label: "Team" },
  { href: "/careers", label: "Careers" },
  { href: "/news", label: "News" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState<DropdownKey>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-300",
        scrolled
          ? "bg-brand-900/95 backdrop-blur-md shadow-lg border-b border-brand-800"
          : "bg-brand-900/80 backdrop-blur-sm"
      )}
    >
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center" aria-label={brand.short}>
          <Image
            src={brand.logo}
            alt={brand.short}
            width={200}
            height={45}
            priority
            className="h-10 w-auto"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          <DropdownLink
            label="Services"
            isOpen={open === "services"}
            onEnter={() => setOpen("services")}
            onLeave={() => setOpen(null)}
            href="/services"
            items={[
              { href: "/energy-services", label: "Energy Services" },
              ...services.map((s) => ({ href: `/${s.slug}`, label: s.title })),
            ]}
          />
          <DropdownLink
            label="Sectors"
            isOpen={open === "sectors"}
            onEnter={() => setOpen("sectors")}
            onLeave={() => setOpen(null)}
            href="/sectors"
            items={sectors.map((s) => ({ href: `/${s.slug}`, label: s.name }))}
          />
          <DropdownLink
            label="Company"
            isOpen={open === "company"}
            onEnter={() => setOpen("company")}
            onLeave={() => setOpen(null)}
            href="/company"
            items={companyLinks}
          />
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <a
            href={brand.phoneHref}
            className="flex items-center gap-2 text-brand-100 hover:text-brand-highlight transition-colors text-sm font-medium"
          >
            <Phone className="w-4 h-4" />
            {brand.phone}
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center px-5 py-2.5 rounded-lg bg-brand-highlight text-white font-semibold hover:brightness-110 transition-all"
          >
            Get In Touch
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden text-white p-2 -mr-2"
          aria-label="Open menu"
        >
          <Menu className="w-7 h-7" />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 z-50 bg-brand-950"
          >
            <div className="flex items-center justify-between h-20 px-4 sm:px-6 border-b border-brand-800">
              <Image src={brand.logo} alt={brand.short} width={180} height={40} className="h-10 w-auto" />
              <button onClick={() => setMobileOpen(false)} className="text-white p-2 -mr-2" aria-label="Close menu">
                <X className="w-7 h-7" />
              </button>
            </div>
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="p-6 flex flex-col gap-1"
            >
              <MobileGroup label="Services" href="/services" items={[{ href: "/energy-services", label: "Energy Services" }, ...services.map((s) => ({ href: `/${s.slug}`, label: s.title }))]} onClick={() => setMobileOpen(false)} />
              <MobileGroup label="Sectors" href="/sectors" items={sectors.map((s) => ({ href: `/${s.slug}`, label: s.name }))} onClick={() => setMobileOpen(false)} />
              <MobileGroup label="Company" href="/company" items={companyLinks} onClick={() => setMobileOpen(false)} />
              <a href={brand.phoneHref} className="mt-6 flex items-center gap-2 text-brand-200 hover:text-brand-highlight transition-colors py-3">
                <Phone className="w-5 h-5" /> {brand.phone}
              </a>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="mt-3 inline-flex justify-center items-center px-6 py-3 rounded-lg bg-brand-highlight text-white font-semibold"
              >
                Get In Touch
              </Link>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function DropdownLink({
  label,
  href,
  items,
  isOpen,
  onEnter,
  onLeave,
}: {
  label: string;
  href: string;
  items: { href: string; label: string }[];
  isOpen: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <div onMouseEnter={onEnter} onMouseLeave={onLeave} className="relative">
      <Link
        href={href}
        className="flex items-center gap-1 px-4 py-2 text-brand-100 hover:text-white font-medium transition-colors"
      >
        {label}
        <ChevronDown className={clsx("w-4 h-4 transition-transform", isOpen && "rotate-180")} />
      </Link>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="absolute left-0 top-full pt-3 w-72"
          >
            <div className="bg-brand-900 border border-brand-800 shadow-xl rounded-xl p-2 overflow-hidden">
              {items.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  className="block px-4 py-2.5 text-brand-200 hover:bg-brand-800 hover:text-white rounded-lg transition-colors"
                >
                  {it.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileGroup({
  label,
  href,
  items,
  onClick,
}: {
  label: string;
  href: string;
  items: { href: string; label: string }[];
  onClick: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-brand-800 last:border-b-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-4 text-white text-lg font-semibold"
      >
        {label}
        <ChevronDown className={clsx("w-5 h-5 transition-transform", open && "rotate-180")} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-3 flex flex-col">
              <Link href={href} onClick={onClick} className="py-2 text-brand-accent">
                View all {label}
              </Link>
              {items.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  onClick={onClick}
                  className="py-2 text-brand-300 hover:text-white"
                >
                  {it.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
