import { safeList } from "@/lib/supabase/safe";
import { locations as locationsFallback } from "@/lib/brand";

export type LocationView = {
  name: string;
  address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  phone: string | null;
  email: string | null;
  is_headquarters: boolean;
};

// Published locations from the CMS, HQ first. Falls back to the static list in
// brand.ts when the table is empty or unreachable.
export async function getLocations(): Promise<LocationView[]> {
  const db = await safeList<LocationView>((sb) =>
    sb
      .from("locations")
      .select("name, address, city, state, zip, phone, email, is_headquarters")
      .eq("published", true)
      .order("is_headquarters", { ascending: false })
      .order("name", { ascending: true })
  );
  if (db.length) return db;

  return locationsFallback.map((l) => ({
    name: l.name,
    address: l.address,
    city: l.city,
    state: l.state,
    zip: l.zip,
    phone: null,
    email: null,
    is_headquarters: l.isHeadquarters,
  }));
}
