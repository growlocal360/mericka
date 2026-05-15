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
  symbol: "/mericka-group-contactor-symbol.svg",
} as const;

export const services = [
  {
    title: "Pre-Construction Services",
    slug: "pre-construction",
    img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=70",
    points: ["Estimating & budget", "Constructability review", "Site logistics planning"],
  },
  {
    title: "Execution Services",
    slug: "execution",
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=70",
    points: ["Scaffold erection", "Industrial coatings", "Insulation install", "Passive fireproofing"],
  },
  {
    title: "Maintenance and Outage Services",
    slug: "maintenance-outage",
    img: "https://images.unsplash.com/photo-1581092919535-7c5dca6f7d92?auto=format&fit=crop&w=1200&q=70",
    points: ["Turnaround support", "Inspection & repair", "Emergency callouts"],
  },
] as const;

export const sectors = [
  { name: "Downstream Oil & Gas", slug: "downstream-oil-gas", icon: "Waves",
    description: "Refining, processing, and product distribution facilities operating around the clock." },
  { name: "Petrochemical", slug: "petrochemical", icon: "FlaskConical",
    description: "Complex chemical plants where safety, precision, and uptime are non-negotiable." },
  { name: "Aerospace", slug: "aerospace", icon: "Rocket",
    description: "Cleanroom-adjacent and high-spec environments for aerospace manufacturing." },
  { name: "Data Centers", slug: "data-centers", icon: "Cpu",
    description: "Mission-critical hyperscale and colocation builds with no margin for delay." },
  { name: "Semiconductor", slug: "semiconductor", icon: "Microchip",
    description: "Fab construction and outage support with cleanroom protocol awareness." },
  { name: "Midstream Oil & Gas", slug: "midstream-oil-gas", icon: "Droplet",
    description: "Pipelines, gathering, and storage assets across the energy corridor." },
] as const;

export const stats = [
  { value: "20+", label: "Years in business" },
  { value: "6", label: "Sectors served" },
  { value: "500+", label: "Projects completed" },
  { value: "0.0", label: "TRIR safety record" },
] as const;

export const marqueeImages = [
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=70",
  "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=600&q=70",
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=70",
  "https://images.unsplash.com/photo-1581092919535-7c5dca6f7d92?auto=format&fit=crop&w=600&q=70",
  "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=600&q=70",
  "https://images.unsplash.com/photo-1573164574511-73c773193279?auto=format&fit=crop&w=600&q=70",
  "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=600&q=70",
  "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=600&q=70",
];

export const heroImage =
  "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=2000&q=70";
