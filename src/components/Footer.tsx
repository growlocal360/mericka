import Image from "next/image";
import Link from "next/link";
import { Linkedin, Facebook, Instagram, Phone, Mail, MapPin } from "lucide-react";
import { brand, services } from "@/lib/brand";

const companyLinks = [
  { href: "/company", label: "About" },
  { href: "/company#team", label: "Team" },
  { href: "/energy-services", label: "Energy Services" },
  { href: "/sectors", label: "Sectors" },
  { href: "/careers", label: "Careers" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[linear-gradient(to_right,#0d3676,#151725)] border-t border-white/10 py-16 text-brand-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Image
              src={brand.logoWhite}
              alt={brand.short}
              width={200}
              height={45}
              className="h-10 w-auto mb-4"
            />
            <p className="text-sm leading-relaxed mb-6 max-w-xs">{brand.tagline}.</p>
            <div className="flex items-center gap-3">
              <a href="#" aria-label="LinkedIn" className="text-brand-300 hover:text-brand-highlight transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Facebook" className="text-brand-300 hover:text-brand-highlight transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Instagram" className="text-brand-300 hover:text-brand-highlight transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 tracking-wider uppercase text-sm">Services</h3>
            <ul className="space-y-2 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/${s.slug}`} className="hover:text-brand-100 transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 tracking-wider uppercase text-sm">Company</h3>
            <ul className="space-y-2 text-sm">
              {companyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-brand-100 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 tracking-wider uppercase text-sm">Headquarters</h3>
            <address className="not-italic space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-brand-accent" />
                <span>
                  {brand.hqLines.map((line, i) => (
                    <span key={i} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0 text-brand-accent" />
                <a href={brand.phoneHref} className="hover:text-brand-100 transition-colors">
                  {brand.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0 text-brand-accent" />
                <a href={brand.emailHref} className="hover:text-brand-100 transition-colors">
                  {brand.email}
                </a>
              </div>
            </address>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-brand-400">
          <p>© {year} {brand.name}. All rights reserved.</p>
          <Link href="/privacy" className="hover:text-brand-100 transition-colors">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
