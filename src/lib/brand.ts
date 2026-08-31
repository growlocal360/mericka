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
    cta: "Partner with Mericka",
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
    img: "/images/industrial-painting-and-coating-mericka-group.jpg",
    points: ["Blasting & surface prep", "Protective coatings", "Tank liners"],
    cta: "Fight corrosion",
  },
  {
    title: "Insulation",
    slug: "insulation",
    img: "/images/industrial-insulation-services-mericka-group.jpg",
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
  { name: "Performance Contractors", logo: "/clients/performance-contractors-inc-logo.png", sector: "petrochemical" },
  { name: "CCC Group", logo: "/clients/ccc-group.jpg", sector: "petrochemical" },
  { name: "Kent", logo: "/clients/kent.svg", sector: "petrochemical" },
  { name: "State of Washington", logo: "/clients/state-of-washington.svg", sector: "advanced-manufacturing" },
  { name: "Crusoe", logo: "/clients/crusoe-energy.svg", sector: "data-centers" },
  { name: "Yaya Foods", logo: "/clients/yaya-foods.webp", sector: "food-beverage-manufacturing" },
  { name: "Quantum Industrial", logo: "/clients/quantum-industrial.png", sector: "" },
] as const;

// Which service (craft) pages have a sector-specific sub-service (combo) page,
// and that combo's service slug. Only Scaffolding & Access currently.
export const craftComboService: Record<string, string> = {
  scaffolding: "scaffolding-and-access-solutions",
};

// Sector menu categories, in display order. Each sector's `category` must
// match one of these; sectors with an unknown/blank category fall under "Other".
export const sectorCategories = [
  "Energy",
  "Advanced Industries",
  "Infrastructure & Government",
  "Manufacturing",
] as const;

// Order within each category follows this array order.
export const sectors = [
  // --- Energy ---
  { name: "Downstream Oil & Gas", slug: "downstream-oil-gas", icon: "Waves", category: "Energy",
    description: "Refining, processing, and product distribution facilities operating around the clock.",
    cta: "Keep the units running" },
  { name: "Midstream Oil & Gas", slug: "midstream-oil-gas", icon: "Droplet", category: "Energy",
    description: "Pipelines, gathering, and storage assets across the energy corridor.",
    cta: "Follow the pipeline" },
  { name: "Petrochemical", slug: "petrochemical", icon: "FlaskConical", category: "Energy",
    description: "Complex chemical plants where safety, precision, and uptime are non-negotiable.",
    cta: "Inside the plant" },
  { name: "Power Generation", slug: "power-generation", icon: "Zap", category: "Energy",
    description: "Generating stations and turbine halls kept online through every outage and upgrade.",
    cta: "Keep the lights on" },
  { name: "LNG", slug: "lng", icon: "Flame", category: "Energy",
    description: "Liquefaction trains, storage, and export terminals where cryogenic work leaves no room for error.",
    cta: "Onto the terminal" },
  // --- Advanced Industries ---
  { name: "Advanced Manufacturing", slug: "advanced-manufacturing", icon: "Factory", category: "Advanced Industries",
    description: "Cleanroom-adjacent and high-spec environments for advanced manufacturing.",
    cta: "Where precision counts" },
  { name: "Semiconductor", slug: "semiconductor", icon: "Microchip", category: "Advanced Industries",
    description: "Fab construction and outage support with cleanroom protocol awareness.",
    cta: "Step inside the fab" },
  { name: "Data Centers", slug: "data-centers", icon: "Cpu", category: "Advanced Industries",
    description: "Mission-critical hyperscale and colocation builds with no margin for delay.",
    cta: "Keep pace" },
  { name: "Aerospace", slug: "aerospace", icon: "Rocket", category: "Advanced Industries",
    description: "Engine, airframe, and component plants where delivery schedules leave no room for slip.",
    cta: "Hold the tolerance" },
  { name: "Pharmaceutical", slug: "pharmaceutical", icon: "Pill", category: "Advanced Industries",
    description: "Cleanroom-adjacent production environments where contamination control and documentation govern every scope.",
    cta: "Protect the batch" },
  // --- Infrastructure & Government ---
  { name: "Government Sector", slug: "government-sector", icon: "Building2", category: "Infrastructure & Government",
    description: "Public facilities and infrastructure delivered to spec, on schedule, and to code.",
    cta: "Built to spec" },
  // --- Manufacturing ---
  { name: "Food & Beverage Manufacturing", slug: "food-beverage-manufacturing", icon: "UtensilsCrossed", category: "Manufacturing",
    description: "Processing and packaging plants held to strict sanitation, uptime, and food-grade standards.",
    cta: "Keep the line moving" },
] as const;

export const stats = [
  { value: "9", label: "Years in business" },
  { value: "10", label: "Sectors served" },
  { value: "50+", label: "Projects completed" },
  { value: "0.0", label: "TRIR safety record" },
] as const;

export const marqueeImages = [
  "/images/scaffolding.jpg",
  "/images/product-page-scaffolding-and-turnaround.jpg",
  "/images/industrial-painting-and-coating-mericka-group.jpg",
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
  "/images/mericka-group-downstream-oil-gas-services-home-hero.jpg";

// Office locations. Fallback for the /locations page; the live list is managed
// in the CMS (locations table).
export const locations = [
  { name: "Houston Office", address: "2323 S Houston Ave, Building 5", city: "Humble", state: "TX", zip: "77396", isHeadquarters: true },
  { name: "Port Arthur Office", address: "401 Marcontell", city: "Port Arthur", state: "TX", zip: "77640", isHeadquarters: false },
  { name: "Brownsville Office", address: "912 N. Indiana Ave.", city: "Brownsville", state: "TX", zip: "78521", isHeadquarters: false },
  { name: "Louisiana Office", address: "2102 W. Kenny Dr.", city: "Gonzales", state: "LA", zip: "70737", isHeadquarters: false },
] as const;
