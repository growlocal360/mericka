import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    },
  },
  async redirects() {
    return [
      // Flat URLs are canonical; 301 any old nested detail links to the root slug.
      { source: "/sectors/:slug", destination: "/:slug", permanent: true },
      { source: "/services/:slug", destination: "/:slug", permanent: true },

      // Sector slug changes from the old site.
      { source: "/downstream-oil-and-gas-market", destination: "/downstream-oil-gas", permanent: true },
      { source: "/midstream-oil-and-gas-market", destination: "/midstream-oil-gas", permanent: true },

      // Sector × service pages: only Scaffolding & Access Solutions is kept.
      // Old slugs → the surviving canonical scaffolding pages.
      { source: "/semiconductor/scaffolding-access-solutions", destination: "/semiconductor/scaffolding-and-access-solutions", permanent: true },
      { source: "/downstream-oil-and-gas-market/scaffolding-and-access-solutions", destination: "/downstream-oil-gas/scaffolding-and-access-solutions", permanent: true },

      // Retired sector × service pages → the parent sector page.
      { source: "/:sector(aerospace|downstream-oil-gas|petrochemical|semiconductor)/turnaround-and-outage-support", destination: "/:sector", permanent: true },
      { source: "/:sector(aerospace|downstream-oil-gas|petrochemical|semiconductor)/nested-facility-maintenance-programs", destination: "/:sector", permanent: true },
      { source: "/:sector(aerospace|downstream-oil-gas|petrochemical|semiconductor)/subcontracting-partnerships", destination: "/:sector", permanent: true },
      { source: "/:sector(aerospace|downstream-oil-gas|petrochemical|semiconductor)/comprehensive-storage-tank-services", destination: "/:sector", permanent: true },

      // Old slugs that pointed at those now-retired pages → parent sector page.
      { source: "/aerospace/nested-facility-maintenance-program", destination: "/aerospace", permanent: true },
      { source: "/aerospace/tank-services", destination: "/aerospace", permanent: true },
      { source: "/petrochemical/nested-facility-maintenance", destination: "/petrochemical", permanent: true },
      { source: "/petrochemical/tank-services", destination: "/petrochemical", permanent: true },
      { source: "/semiconductor/nested-facility-maintenance", destination: "/semiconductor", permanent: true },
      { source: "/semiconductor/tank-services", destination: "/semiconductor", permanent: true },
      { source: "/downstream-oil-and-gas-market/turnaround-and-outage-support", destination: "/downstream-oil-gas", permanent: true },
      { source: "/downstream-oil-and-gas-market/nested-facility-maintenance", destination: "/downstream-oil-gas", permanent: true },
      { source: "/downstream-oil-and-gas-market/subcontracting-partnerships", destination: "/downstream-oil-gas", permanent: true },
      { source: "/downstream-oil-and-gas-market/tank-services", destination: "/downstream-oil-gas", permanent: true },
    ];
  },
};

export default nextConfig;
