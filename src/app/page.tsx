import Hero from "@/components/Hero";
import ServicesOverview from "@/components/ServicesOverview";
import CapabilitiesOverview from "@/components/CapabilitiesOverview";
import ImageMarquee from "@/components/ImageMarquee";
import StatsBar from "@/components/StatsBar";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import SectorsGrid from "@/components/SectorsGrid";
import CTASection from "@/components/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <CapabilitiesOverview />
      <ImageMarquee />
      <StatsBar />
      <ProjectsShowcase />
      <SectorsGrid />
      <CTASection />
    </>
  );
}
