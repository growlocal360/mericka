import type { Metadata } from "next";
import { MapPin, Phone, Mail } from "lucide-react";
import { getLocations } from "@/lib/locations";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Locations | Mericka Group",
  description: "Mericka Group regional offices across Texas and Louisiana.",
};

export default async function LocationsPage() {
  const locations = await getLocations();

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-16 max-w-3xl">
          <span className="text-sm tracking-wider font-semibold text-brand-accent uppercase">
            Locations
          </span>
          <h1 className="mt-3 text-5xl font-bold text-brand-900">Where we operate</h1>
          <p className="mt-5 text-lg text-brand-600">
            Regional offices across Texas and Louisiana, positioned close to the
            facilities and turnarounds we support.
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-6">
          {locations.map((l) => {
            const cityLine = [
              [l.city, l.state].filter(Boolean).join(", "),
              l.zip,
            ]
              .filter(Boolean)
              .join(" ");
            return (
              <div
                key={l.name}
                className="bg-white border border-brand-100 rounded-2xl p-8 hover:border-brand-accent/40 hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-xl font-bold text-brand-accent">{l.name}</h2>
                  {l.is_headquarters && (
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-highlight bg-brand-highlight/10 rounded-full px-2.5 py-0.5">
                      HQ
                    </span>
                  )}
                </div>
                <address className="not-italic space-y-3 text-brand-600">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 flex-none text-brand-accent" />
                    <span>
                      {l.address && (
                        <span className="block">{l.address}</span>
                      )}
                      {cityLine && <span className="block">{cityLine}</span>}
                    </span>
                  </div>
                  {l.phone && (
                    <a
                      href={`tel:${l.phone.replace(/[^0-9+]/g, "")}`}
                      className="flex items-center gap-3 hover:text-brand-highlight transition-colors"
                    >
                      <Phone className="h-4 w-4 flex-none text-brand-accent" />
                      {l.phone}
                    </a>
                  )}
                  {l.email && (
                    <a
                      href={`mailto:${l.email}`}
                      className="flex items-center gap-3 hover:text-brand-highlight transition-colors"
                    >
                      <Mail className="h-4 w-4 flex-none text-brand-accent" />
                      {l.email}
                    </a>
                  )}
                </address>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
