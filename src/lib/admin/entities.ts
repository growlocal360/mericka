export type EntityKey =
  | "services"
  | "sectors"
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
  | "tags"
  | "date";

export interface FieldDef {
  name: string;
  label: string;
  kind: FieldKind;
  required?: boolean;
  options?: { value: string; label: string }[];
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
  services: {
    key: "services",
    table: "services",
    label: "Services",
    labelSingular: "Service",
    titleField: "name",
    fields: [
      { name: "name", label: "Name", kind: "text", required: true },
      { name: "slug", label: "Slug", kind: "text", required: true },
      { name: "tagline", label: "Tagline", kind: "text" },
      { name: "positioning_headline", label: "Positioning Headline", kind: "text" },
      { name: "benefits", label: "Key Benefits (comma separated)", kind: "tags", arrayValues: true },
      { name: "capabilities", label: "Capabilities (comma separated)", kind: "tags", arrayValues: true },
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
  projects: {
    key: "projects",
    table: "projects",
    label: "Projects",
    labelSingular: "Project",
    titleField: "title",
    fields: [
      { name: "title", label: "Title", kind: "text", required: true },
      { name: "slug", label: "Slug", kind: "text", required: true },
      { name: "client", label: "Client", kind: "text" },
      { name: "location", label: "Location", kind: "text" },
      { name: "excerpt", label: "Excerpt", kind: "textarea" },
      { name: "featured_image", label: "Featured Image", kind: "image" },
      { name: "services_used", label: "Services Used (comma separated)", kind: "tags", arrayValues: true },
      { name: "sectors", label: "Sectors (comma separated)", kind: "tags", arrayValues: true },
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
