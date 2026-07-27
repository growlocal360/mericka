import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import { getNavData } from "@/lib/taxonomy";

const sans = Inter({ variable: "--font-brand-sans", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-brand-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mericka Group | Scaffolding, Coatings & Insulation, Engineered for Uptime",
  description:
    "Mericka Group delivers scaffolding, painting, insulation, and fireproofing services across pre-construction, execution, and maintenance & outage phases.",
  openGraph: { title: "Mericka Group", type: "website", locale: "en_US" },
};

// Nav lists come from the CMS; revalidate so added/removed sectors and
// services show up in the menu within the window.
export const revalidate = 60;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const nav = await getNavData();
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${sans.variable} ${mono.variable} antialiased bg-white text-brand-900`}>
        <LayoutWrapper nav={nav}>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
