import SectorsGrid from "@/components/SectorsGrid";

export const metadata = {
  title: "Sectors | Mericka Group",
  description: "Industries served by Mericka Group.",
};

export default function SectorsPage() {
  return (
    <div className="pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <header className="max-w-3xl">
          <span className="text-sm tracking-wider font-semibold text-brand-accent uppercase">
            Sectors
          </span>
          <h1 className="mt-3 text-5xl font-bold text-brand-900">Industries we serve</h1>
        </header>
      </div>
      <SectorsGrid />
    </div>
  );
}
