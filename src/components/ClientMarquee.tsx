import Image from "next/image";
import { getClients } from "@/lib/clients";

// Continuously scrolling strip of client logos for the homepage.
// Pure-CSS marquee (reuses --animate-marquee from globals.css), so this
// stays a server component and reads the roster straight from the CMS.
export default async function ClientMarquee() {
  const clients = await getClients();
  if (clients.length === 0) return null;

  // Duplicate the row so the loop is seamless.
  const row = [...clients, ...clients];

  return (
    <section className="py-14 bg-white border-y border-brand-100 overflow-hidden">
      <p className="text-center text-sm tracking-wider font-semibold text-brand-500 uppercase mb-10">
        Trusted by the industry&apos;s leaders
      </p>
      <div className="group overflow-hidden">
        <div className="flex w-max items-center animate-[var(--animate-marquee)] group-hover:[animation-play-state:paused]">
          {row.map((c, i) => (
            <div
              key={`${c.name}-${i}`}
              className="mx-8 flex h-14 w-40 flex-shrink-0 items-center justify-center"
            >
              {c.logo_url && (
                <Image
                  src={c.logo_url}
                  alt={c.name}
                  width={160}
                  height={56}
                  unoptimized
                  className="max-h-14 w-auto object-contain opacity-60 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
