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
    // Flat URLs are canonical; 301 any old nested detail links to the root slug.
    return [
      { source: "/sectors/:slug", destination: "/:slug", permanent: true },
      { source: "/services/:slug", destination: "/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
