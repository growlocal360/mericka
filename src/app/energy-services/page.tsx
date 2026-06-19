import Image from "next/image";
import CapabilitiesOverview from "@/components/CapabilitiesOverview";
import ServicesOverview from "@/components/ServicesOverview";
import CTASection from "@/components/CTASection";

export const metadata = {
  title: "Energy Services | Mericka Group",
  description:
    "Scaffold, paint, insulation, and fireproofing — soft-craft services for energy and industrial facilities.",
};

export default function EnergyServicesPage() {
  return (
    <article>
      <header className="relative h-[55vh] min-h-[420px] bg-brand-900 flex items-end overflow-hidden">
        <Image
          src="/images/scaffold-background-2.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-900/80 to-brand-900/40" />
        <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-16">
          <span className="text-sm tracking-wider font-semibold text-brand-accent uppercase">
            What We Do
          </span>
          <h1 className="mt-3 text-5xl sm:text-6xl font-bold text-white">Energy Services</h1>
          <p className="mt-4 text-xl text-brand-200 italic">
            Scaffold, Paint, Insulation, Fireproofing
          </p>
        </div>
      </header>

      <CapabilitiesOverview />
      <ServicesOverview />
      <CTASection />
    </article>
  );
}
