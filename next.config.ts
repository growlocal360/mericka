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

      // Sector × service combo pages — old slugs → new canonical slugs.
      { source: "/aerospace/nested-facility-maintenance-program", destination: "/aerospace/nested-facility-maintenance-programs", permanent: true },
      { source: "/aerospace/tank-services", destination: "/aerospace/comprehensive-storage-tank-services", permanent: true },
      { source: "/petrochemical/nested-facility-maintenance", destination: "/petrochemical/nested-facility-maintenance-programs", permanent: true },
      { source: "/petrochemical/tank-services", destination: "/petrochemical/comprehensive-storage-tank-services", permanent: true },
      { source: "/semiconductor/scaffolding-access-solutions", destination: "/semiconductor/scaffolding-and-access-solutions", permanent: true },
      { source: "/semiconductor/nested-facility-maintenance", destination: "/semiconductor/nested-facility-maintenance-programs", permanent: true },
      { source: "/semiconductor/tank-services", destination: "/semiconductor/comprehensive-storage-tank-services", permanent: true },
      { source: "/downstream-oil-and-gas-market/scaffolding-and-access-solutions", destination: "/downstream-oil-gas/scaffolding-and-access-solutions", permanent: true },
      { source: "/downstream-oil-and-gas-market/turnaround-and-outage-support", destination: "/downstream-oil-gas/turnaround-and-outage-support", permanent: true },
      { source: "/downstream-oil-and-gas-market/nested-facility-maintenance", destination: "/downstream-oil-gas/nested-facility-maintenance-programs", permanent: true },
      { source: "/downstream-oil-and-gas-market/subcontracting-partnerships", destination: "/downstream-oil-gas/subcontracting-partnerships", permanent: true },
      { source: "/downstream-oil-and-gas-market/tank-services", destination: "/downstream-oil-gas/comprehensive-storage-tank-services", permanent: true },
    ];
  },
};

export default nextConfig;
