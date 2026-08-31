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

      // Aerospace is a live sector again; only its old SUB-pages redirect to it
      // (:path+ requires a sub-segment so bare /aerospace hits the page).
      { source: "/aerospace/:path+", destination: "/aerospace", permanent: true },

      // Retired sector × service pages → the parent sector page.
      { source: "/:sector(downstream-oil-gas|petrochemical|semiconductor)/turnaround-and-outage-support", destination: "/:sector", permanent: true },
      { source: "/:sector(downstream-oil-gas|petrochemical|semiconductor)/nested-facility-maintenance-programs", destination: "/:sector", permanent: true },
      { source: "/:sector(downstream-oil-gas|petrochemical|semiconductor)/subcontracting-partnerships", destination: "/:sector", permanent: true },
      { source: "/:sector(downstream-oil-gas|petrochemical|semiconductor)/comprehensive-storage-tank-services", destination: "/:sector", permanent: true },

      // Old slugs that pointed at those now-retired pages → parent sector page.
      { source: "/petrochemical/nested-facility-maintenance", destination: "/petrochemical", permanent: true },
      { source: "/petrochemical/tank-services", destination: "/petrochemical", permanent: true },
      { source: "/semiconductor/nested-facility-maintenance", destination: "/semiconductor", permanent: true },
      { source: "/semiconductor/tank-services", destination: "/semiconductor", permanent: true },
      { source: "/downstream-oil-and-gas-market/turnaround-and-outage-support", destination: "/downstream-oil-gas", permanent: true },
      { source: "/downstream-oil-and-gas-market/nested-facility-maintenance", destination: "/downstream-oil-gas", permanent: true },
      { source: "/downstream-oil-and-gas-market/subcontracting-partnerships", destination: "/downstream-oil-gas", permanent: true },
      { source: "/downstream-oil-and-gas-market/tank-services", destination: "/downstream-oil-gas", permanent: true },

      // ===== Old flat pages from the previous site (no 1:1 equivalent) =====
      // Renamed content pages.
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/vision-values", destination: "/company", permanent: true },
      { source: "/privacy-policy-accessibility-statement", destination: "/privacy", permanent: true },
      { source: "/advanced-technologies", destination: "/advanced-manufacturing", permanent: true },
      { source: "/data-center", destination: "/data-centers", permanent: true },
      { source: "/data-center.html", destination: "/data-centers", permanent: true },
      { source: "/comprehensive-storage-tank", destination: "/comprehensive-storage-tank-services", permanent: true },

      // Old service-area location pages (nested under /service-area-locations/)
      // → the Locations page. Wildcard covers every city sub-page.
      { source: "/service-area-locations", destination: "/locations", permanent: true },
      { source: "/service-area-locations/:path*", destination: "/locations", permanent: true },

      // Old geo / service landing pages → the closest service or sector page.
      { source: "/austin-tx-data-center-painting", destination: "/industrial-coatings", permanent: true },
      { source: "/austin-tx-data-center-scaffolding-access-services", destination: "/scaffolding", permanent: true },
      { source: "/austin-tx-fireproofing-passive-fire-protection", destination: "/fireproofing", permanent: true },
      { source: "/industrial-fireproofing-data-centers-san-antonio", destination: "/fireproofing", permanent: true },
      { source: "/industrial-scaffolding-and-access-dallas-tx", destination: "/scaffolding", permanent: true },
      { source: "/industrial-scaffolding-data-centers-san-antonio-tx", destination: "/scaffolding", permanent: true },
      { source: "/industrial-scaffolding-in-ashburn-va", destination: "/scaffolding", permanent: true },
      { source: "/data-center-soft-craft-contractor-dallas-tx", destination: "/data-centers", permanent: true },
      { source: "/data-center-soft-craft-labor-solutions-texas", destination: "/data-centers", permanent: true },
      { source: "/soft-craft-services-data-centers-san-antonio-tx", destination: "/data-centers", permanent: true },
      { source: "/semiconductor-facility-services-phoenix-az", destination: "/semiconductor", permanent: true },
      { source: "/semiconductor/turnaround-support-phoenix-az", destination: "/semiconductor", permanent: true },
    ];
  },
};

export default nextConfig;
