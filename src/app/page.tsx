import Hero from "@/components/Hero";
import ClientMarquee from "@/components/ClientMarquee";
import ServicesOverview from "@/components/ServicesOverview";
import ImageMarquee from "@/components/ImageMarquee";
import StatsBar from "@/components/StatsBar";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import SectorsGrid from "@/components/SectorsGrid";
import CTASection from "@/components/CTASection";

export const revalidate = 60;

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientMarquee />
      <ServicesOverview />
      <ImageMarquee />
      <StatsBar />
      <ProjectsShowcase />
      <SectorsGrid />
      <CTASection />
    </>
  );
}
