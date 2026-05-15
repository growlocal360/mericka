import ContactForm from "@/components/ContactForm";
import { brand } from "@/lib/brand";
import { Phone, Mail, MapPin } from "lucide-react";

export const metadata = { title: "Contact | Mericka Group" };

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16">
        <div>
          <span className="text-sm tracking-wider font-semibold text-brand-accent uppercase">Contact</span>
          <h1 className="mt-3 text-5xl font-bold text-brand-900">Get in touch</h1>
          <p className="mt-5 text-lg text-brand-600 leading-relaxed">
            Tell us about your scope, schedule, and safety targets. We&apos;ll be in touch within one business day.
          </p>

          <div className="mt-10 space-y-5">
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-brand-accent mt-0.5" />
              <div>
                <p className="text-sm uppercase tracking-wider text-brand-500 font-semibold">Phone</p>
                <a href={brand.phoneHref} className="text-brand-900 hover:text-brand-highlight transition-colors">
                  {brand.phone}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-brand-accent mt-0.5" />
              <div>
                <p className="text-sm uppercase tracking-wider text-brand-500 font-semibold">Email</p>
                <a href={brand.emailHref} className="text-brand-900 hover:text-brand-highlight transition-colors">
                  {brand.email}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-brand-accent mt-0.5" />
              <div>
                <p className="text-sm uppercase tracking-wider text-brand-500 font-semibold">Headquarters</p>
                <address className="not-italic text-brand-900">
                  {brand.hqLines.map((l, i) => <div key={i}>{l}</div>)}
                </address>
              </div>
            </div>
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
