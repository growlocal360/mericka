export type EntityKey =
  | "services"
  | "capabilities"
  | "sectors"
  | "sector_services"
  | "clients"
  | "projects"
  | "news"
  | "careers"
  | "team"
  | "locations";

export type FieldKind =
  | "text"
  | "textarea"
  | "rich"
  | "image"
  | "number"
  | "boolean"
  | "select"
  | "reference"
  | "tags"
  | "date";

export interface FieldDef {
  name: string;
  label: string;
  kind: FieldKind;
  required?: boolean;
  options?: { value: string; label: string }[];
  /** For kind: "reference" — the entity whose rows populate the dropdown. */
  refEntity?: EntityKey;
  /** Column stored as this field's value (default "name"). */
  refValueField?: string;
  /** Column shown as the option label (default "name"). */
  refLabelField?: string;
  /** Comma-separated text input that maps to string[] in DB */
  arrayValues?: boolean;
}

export interface EntityConfig {
  key: EntityKey;
  /** Postgres table name */
  table: string;
  /** Plural label in admin UI */
  label: string;
  /** Singular label */
  labelSingular: string;
  /** Column with the title — used for default sort + slug source */
  titleField: "name" | "title";
  /** Form fields rendered on new/edit pages */
  fields: FieldDef[];
}

export const ENTITIES: Record<EntityKey, EntityConfig> = {
  // The 4 live services the site shows in the nav, footer, and homepage.
  // Backed by the `crafts` table (/scaffolding, /industrial-coatings, ...).
  services: {
    key: "services",
    table: "crafts",
    label: "Services",
    labelSingular: "Service",
    titleField: "name",
    fields: [
      { name: "name", label: "Name", kind: "text", required: true },
      { name: "slug", label: "Slug", kind: "text", required: true },
      { name: "tagline", label: "Tagline", kind: "text" },
      { name: "positioning_headline", label: "Positioning Headline", kind: "text" },
      { name: "benefits", label: "Key Benefits (one per line)", kind: "tags", arrayValues: true },
      { name: "capabilities", label: "Capabilities (one per line)", kind: "tags", arrayValues: true },
      { name: "summary", label: "What We Do (summary)", kind: "textarea" },
      { name: "icon", label: "Lucide Icon Name", kind: "text" },
      { name: "hero_image_url", label: "Hero Image", kind: "image" },
      { name: "description", label: "Description (optional, extra detail)", kind: "rich" },
      { name: "display_order", label: "Display Order", kind: "number" },
      { name: "published", label: "Published", kind: "boolean" },
    ],
  },
  // Legacy program pages carried over from the previous site.
  // Backed by the `services` table (/scaffolding-and-access-solutions, ...).
  capabilities: {
    key: "capabilities",
    table: "services",
    label: "Capabilities",
    labelSingular: "Capability",
    titleField: "name",
    fields: [
      { name: "name", label: "Name", kind: "text", required: true },
      { name: "slug", label: "Slug", kind: "text", required: true },
      { name: "tagline", label: "Tagline", kind: "text" },
      { name: "positioning_headline", label: "Positioning Headline", kind: "text" },
      { name: "benefits", label: "Key Benefits (one per line)", kind: "tags", arrayValues: true },
      { name: "capabilities", label: "Capabilities (one per line)", kind: "tags", arrayValues: true },
      { name: "summary", label: "What We Do (summary)", kind: "textarea" },
      { name: "phase", label: "Phase", kind: "select", options: [
        { value: "pre-construction", label: "Pre-Construction" },
        { value: "execution", label: "Execution" },
        { value: "maintenance-outage", label: "Maintenance & Outage" },
      ] },
      { name: "icon", label: "Lucide Icon Name", kind: "text" },
      { name: "hero_image_url", label: "Hero Image", kind: "image" },
      { name: "description", label: "Description (optional, extra detail)", kind: "rich" },
      { name: "display_order", label: "Display Order", kind: "number" },
      { name: "published", label: "Published", kind: "boolean" },
    ],
  },
  sectors: {
    key: "sectors",
    table: "sectors",
    label: "Sectors",
    labelSingular: "Sector",
    titleField: "name",
    fields: [
      { name: "name", label: "Name", kind: "text", required: true },
      { name: "slug", label: "Slug", kind: "text", required: true },
      { name: "icon", label: "Lucide Icon Name", kind: "text" },
      { name: "hero_image_url", label: "Hero Image", kind: "image" },
      { name: "intro_image_url", label: "Intro Section Image", kind: "image" },
      { name: "description", label: "Description", kind: "rich" },
      { name: "display_order", label: "Display Order", kind: "number" },
      { name: "published", label: "Published", kind: "boolean" },
    ],
  },
  sector_services: {
    key: "sector_services",
    table: "sector_services",
    label: "Sector Services",
    labelSingular: "Sector Service",
    titleField: "title",
    fields: [
      // Both dropdowns read live from their own tables, so any sector or
      // service added later is immediately available here — no code change
      // needed to build new sector × service pages.
      { name: "sector_slug", label: "Sector", kind: "reference", required: true,
        refEntity: "sectors", refValueField: "slug", refLabelField: "name" },
      { name: "service_slug", label: "Service", kind: "reference", required: true,
        refEntity: "services", refValueField: "slug", refLabelField: "name" },
      { name: "title", label: "Title", kind: "text", required: true },
      { name: "meta_description", label: "Meta Description", kind: "textarea" },
      { name: "hero_image_url", label: "Hero Image", kind: "image" },
      { name: "content", label: "Content", kind: "rich" },
      { name: "display_order", label: "Display Order", kind: "number" },
      { name: "published", label: "Published", kind: "boolean" },
    ],
  },
  clients: {
    key: "clients",
    table: "clients",
    label: "Clients",
    labelSingular: "Client",
    titleField: "name",
    fields: [
      { name: "name", label: "Name", kind: "text", required: true },
      { name: "logo_url", label: "Logo", kind: "image" },
      { name: "location", label: "Location(s)", kind: "text" },
      { name: "sector_slug", label: "Sector", kind: "select", options: [
        { value: "aerospace", label: "Aerospace" },
        { value: "petrochemical", label: "Petrochemical" },
        { value: "semiconductor", label: "Semiconductor" },
        { value: "downstream-oil-gas", label: "Downstream Oil & Gas" },
        { value: "midstream-oil-gas", label: "Midstream Oil & Gas" },
        { value: "data-centers", label: "Data Centers" },
      ] },
      { name: "website", label: "Website", kind: "text" },
      { name: "display_order", label: "Display Order", kind: "number" },
      { name: "published", label: "Published", kind: "boolean" },
    ],
  },
  projects: {
    key: "projects",
    table: "projects",
    label: "Projects",
    labelSingular: "Project",
    titleField: "title",
    fields: [
      { name: "title", label: "Title", kind: "text", required: true },
      { name: "slug", label: "Slug", kind: "text", required: true },
      { name: "client", label: "Client", kind: "reference", refEntity: "clients", refValueField: "name", refLabelField: "name" },
      { name: "location", label: "Location", kind: "text" },
      { name: "excerpt", label: "Excerpt", kind: "textarea" },
      { name: "featured_image", label: "Featured Image", kind: "image" },
      { name: "services_used", label: "Services Used (one per line)", kind: "tags", arrayValues: true },
      { name: "sectors", label: "Sectors (one per line)", kind: "tags", arrayValues: true },
      { name: "description", label: "Description", kind: "rich" },
      { name: "completed_at", label: "Completed Date", kind: "date" },
      { name: "featured", label: "Featured", kind: "boolean" },
      { name: "published", label: "Published", kind: "boolean" },
    ],
  },
  news: {
    key: "news",
    table: "news_articles",
    label: "News & Blog",
    labelSingular: "Article",
    titleField: "title",
    fields: [
      { name: "title", label: "Title", kind: "text", required: true },
      { name: "slug", label: "Slug", kind: "text", required: true },
      { name: "type", label: "Type", kind: "select", options: [
        { value: "news", label: "News" },
        { value: "blog", label: "Blog" },
      ] },
      { name: "excerpt", label: "Excerpt", kind: "textarea" },
      { name: "featured_image", label: "Featured Image", kind: "image" },
      { name: "content", label: "Content", kind: "rich" },
      { name: "published_at", label: "Publish Date", kind: "date" },
      { name: "published", label: "Published", kind: "boolean" },
    ],
  },
  careers: {
    key: "careers",
    table: "job_postings",
    label: "Careers",
    labelSingular: "Job Posting",
    titleField: "title",
    fields: [
      { name: "title", label: "Title", kind: "text", required: true },
      { name: "slug", label: "Slug", kind: "text", required: true },
      { name: "department", label: "Department", kind: "text" },
      { name: "location", label: "Location", kind: "text" },
      { name: "employment_type", label: "Employment Type", kind: "text" },
      { name: "salary_range", label: "Salary Range", kind: "text" },
      { name: "description", label: "Description", kind: "rich" },
      { name: "requirements", label: "Requirements", kind: "rich" },
      { name: "expires_at", label: "Expires", kind: "date" },
      { name: "published", label: "Published", kind: "boolean" },
    ],
  },
  team: {
    key: "team",
    table: "team_members",
    label: "Team",
    labelSingular: "Team Member",
    titleField: "name",
    fields: [
      { name: "name", label: "Name", kind: "text", required: true },
      { name: "title", label: "Title", kind: "text", required: true },
      { name: "email", label: "Email", kind: "text" },
      { name: "phone", label: "Phone", kind: "text" },
      { name: "bio", label: "Bio", kind: "textarea" },
      { name: "photo_url", label: "Photo", kind: "image" },
      { name: "display_order", label: "Display Order", kind: "number" },
      { name: "published", label: "Published", kind: "boolean" },
    ],
  },
  locations: {
    key: "locations",
    table: "locations",
    label: "Locations",
    labelSingular: "Location",
    titleField: "name",
    fields: [
      { name: "name", label: "Name", kind: "text", required: true },
      { name: "address", label: "Address", kind: "text" },
      { name: "city", label: "City", kind: "text" },
      { name: "state", label: "State", kind: "text" },
      { name: "zip", label: "Zip", kind: "text" },
      { name: "phone", label: "Phone", kind: "text" },
      { name: "email", label: "Email", kind: "text" },
      { name: "lat", label: "Latitude", kind: "number" },
      { name: "lng", label: "Longitude", kind: "number" },
      { name: "is_headquarters", label: "Headquarters", kind: "boolean" },
      { name: "published", label: "Published", kind: "boolean" },
    ],
  },
};
