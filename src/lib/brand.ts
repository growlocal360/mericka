export const brand = {
  name: "Mericka Group",
  short: "Mericka Group",
  tagline: "Scaffolding, Coatings & Insulation, Engineered for Uptime",
  phone: "844-637-4252",
  phoneHref: "tel:+18446374252",
  email: "info@merickagroup.com",
  emailHref: "mailto:info@merickagroup.com",
  hqLines: ["Mericka Group LLC", "2323 S Houston Ave, Building 5", "Humble, TX 77396"],
  logo: "/mericka-group-contractor-horizontal.svg",
  logoWhite: "/mericka-group-logo-white.svg",
  symbol: "/mericka-group-contactor-symbol.svg",
} as const;

export const services = [
  {
    title: "Scaffolding & Access Solutions",
    slug: "scaffolding-and-access-solutions",
    img: "/images/scaffolding.jpg",
    points: ["Scaffold erection", "Elevated work platforms", "Stair towers"],
    cta: "See the access scope",
  },
  {
    title: "Turnaround & Outage Support",
    slug: "turnaround-and-outage-support",
    img: "/images/product-page-scaffolding-and-turnaround.jpg",
    points: ["Planned turnarounds", "Outage execution", "Emergency callouts"],
    cta: "Plan your turnaround",
  },
  {
    title: "Nested Facility Maintenance Programs",
    slug: "nested-facility-maintenance-programs",
    img: "/images/Nested-Maintenance-Background-Picture.jpg",
    points: ["Multi-skilled crews", "Data-driven planning", "On-site coverage"],
    cta: "Staff your site",
  },
  {
    title: "Subcontracting Partnerships",
    slug: "subcontracting-partnerships",
    img: "/images/scaffold-background-2.jpg",
    points: ["Soft-craft labor", "Schedule reliability", "A trusted ally"],
    cta: "Partner with us",
  },
  {
    title: "Comprehensive Storage Tank Services",
    slug: "comprehensive-storage-tank-services",
    img: "/images/tank-services.jpg",
    points: ["Inspection & repair", "Coatings & linings", "Asset protection"],
    cta: "Extend tank life",
  },
  {
    title: "Pipeline Maintenance Programs",
    slug: "pipeline-maintenance-programs",
    img: "/images/more-pipes.jpg",
    points: ["Maintenance programs", "Compliance support", "Integrity management"],
    cta: "Protect your pipeline",
  },
] as const;

export const crafts = [
  {
    title: "Scaffolding & Access",
    slug: "scaffolding",
    img: "/images/scaffolding.jpg",
    points: ["Work at any height", "Stair towers & platforms", "Scaffold inspection & tagging"],
    cta: "Reach any height",
  },
  {
    title: "Industrial Coatings & Painting",
    slug: "industrial-coatings",
    img: "/images/paint-spray.jpg",
    points: ["Blasting & surface prep", "Protective coatings", "Tank liners"],
    cta: "Fight corrosion",
  },
  {
    title: "Insulation",
    slug: "insulation",
    img: "/images/pipes.jpg",
    points: ["Hot & cold systems", "Removable blankets", "Jacketing"],
    cta: "Cut energy loss",
  },
  {
    title: "Fireproofing",
    slug: "fireproofing",
    img: "/images/Fireproofing.jpg",
    points: ["Cementitious", "Intumescent", "Steel & vessel skirts"],
    cta: "Buy critical time",
  },
] as const;

// Client roster — powers the homepage logo scroller, the Projects page
// "Trusted By" showcase, and the Client dropdown on the Project admin form.
// This is the fallback; the live list is managed in the CMS (clients table).
export const clients = [
  { name: "ExxonMobil", logo: "/clients/exxonmobil.svg", sector: "downstream-oil-gas" },
  { name: "Chevron Phillips Chemical", logo: "/clients/chevron-phillips.svg", sector: "petrochemical" },
  { name: "SpaceX", logo: "/clients/spacex.svg", sector: "advanced-manufacturing" },
  { name: "Kiewit", logo: "/clients/kiewit.jpg", sector: "data-centers" },
  { name: "Targa Resources", logo: "/clients/targa.jpg", sector: "midstream-oil-gas" },
  { name: "Hilcorp", logo: "/clients/hilcorp.svg", sector: "midstream-oil-gas" },
  { name: "Venture Global", logo: "/clients/venture-global.svg", sector: "midstream-oil-gas" },
  { name: "Saulsbury Industries", logo: "/clients/saulsbury.svg", sector: "petrochemical" },
  { name: "Performance Contractors", logo: "/clients/performance-contractors.png", sector: "petrochemical" },
  { name: "CCC Group", logo: "/clients/ccc-group.jpg", sector: "petrochemical" },
  { name: "Kent", logo: "/clients/kent.svg", sector: "petrochemical" },
  { name: "State of Washington", logo: "/clients/state-of-washington.svg", sector: "advanced-manufacturing" },
] as const;

// Which service (craft) pages have a sector-specific sub-service (combo) page,
// and that combo's service slug. Only Scaffolding & Access currently.
export const craftComboService: Record<string, string> = {
  scaffolding: "scaffolding-and-access-solutions",
};

export const sectors = [
  { name: "Downstream Oil & Gas", slug: "downstream-oil-gas", icon: "Waves",
    description: "Refining, processing, and product distribution facilities operating around the clock.",
    cta: "Keep the units running" },
  { name: "Petrochemical", slug: "petrochemical", icon: "FlaskConical",
    description: "Complex chemical plants where safety, precision, and uptime are non-negotiable.",
    cta: "Inside the plant" },
  { name: "Advanced Manufacturing", slug: "advanced-manufacturing", icon: "Factory",
    description: "Cleanroom-adjacent and high-spec environments for advanced manufacturing.",
    cta: "Where precision counts" },
  { name: "Data Centers", slug: "data-centers", icon: "Cpu",
    description: "Mission-critical hyperscale and colocation builds with no margin for delay.",
    cta: "How we keep pace" },
  { name: "Semiconductor", slug: "semiconductor", icon: "Microchip",
    description: "Fab construction and outage support with cleanroom protocol awareness.",
    cta: "Step inside the fab" },
  { name: "Midstream Oil & Gas", slug: "midstream-oil-gas", icon: "Droplet",
    description: "Pipelines, gathering, and storage assets across the energy corridor.",
    cta: "Follow the pipeline" },
] as const;

export const stats = [
  { value: "20+", label: "Years in business" },
  { value: "6", label: "Sectors served" },
  { value: "500+", label: "Projects completed" },
  { value: "0.0", label: "TRIR safety record" },
] as const;

export const marqueeImages = [
  "/images/scaffolding.jpg",
  "/images/product-page-scaffolding-and-turnaround.jpg",
  "/images/paint-spray.jpg",
  "/images/Paint-spray-tank-roof.jpg",
  "/images/pipes.jpg",
  "/images/tank-services.jpg",
  "/images/Fireproofing.jpg",
  "/images/scaffold-background-2.jpg",
  "/images/Nested-Maintenance-Background-Picture.jpg",
  "/images/painting-dome.jpg",
  "/images/more-pipes.jpg",
  "/images/mericka-group-employees.jpg",
];

export const heroImage =
  "https://zeykdqgjsamlngfuimcp.supabase.co/storage/v1/object/public/uploads/hero_image_url/1781845766503-4iuga9.jpg";
