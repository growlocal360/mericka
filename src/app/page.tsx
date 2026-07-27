import Hero from "@/components/Hero";
import ClientMarquee from "@/components/ClientMarquee";
import ServicesOverview from "@/components/ServicesOverview";
import ImageMarquee from "@/components/ImageMarquee";
import StatsBar from "@/components/StatsBar";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import SectorsGrid from "@/components/SectorsGrid";
import CTASection from "@/components/CTASection";
import { getSectorCards } from "@/lib/taxonomy";

export const revalidate = 60;

export default async function HomePage() {
  const sectors = await getSectorCards();
  return (
    <>
      <Hero />
      <ClientMarquee />
      <ServicesOverview />
      <ImageMarquee />
      <StatsBar />
      <ProjectsShowcase />
      <SectorsGrid sectors={sectors} />
      <CTASection />
    </>
  );
}
