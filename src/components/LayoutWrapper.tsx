"use client";
import { usePathname } from "next/navigation";
import Script from "next/script";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import type { NavData } from "@/lib/taxonomy";

export default function LayoutWrapper({
  children,
  nav,
}: {
  children: React.ReactNode;
  nav: NavData;
}) {
  const pathname = usePathname();
  const hide = pathname.startsWith("/admin") || pathname.startsWith("/login") || pathname.startsWith("/auth");
  if (hide) return <>{children}</>;
  return (
    <>
      <Navigation sectors={nav.sectors} services={nav.services} />
      <main>{children}</main>
      <Footer services={nav.services} />
      {/* LeadConnector chat widget — public site only, lazy-loaded so it
          doesn't block initial page load. */}
      <Script
        src="https://widgets.leadconnectorhq.com/loader.js"
        data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
        data-widget-id="6a355a29ab6f01632610e50a"
        strategy="lazyOnload"
      />
    </>
  );
}
