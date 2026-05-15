import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { ENTITIES, type EntityKey } from "@/lib/admin/entities";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ entity: string }> }) {
  const { entity } = await params;
  const cfg = ENTITIES[entity as EntityKey];
  if (!cfg) return NextResponse.json({ error: "Unknown entity" }, { status: 404 });
  try {
    const sb = await createClient();
    const orderField = cfg.fields.some((f) => f.name === "display_order")
      ? "display_order"
      : cfg.fields.some((f) => f.name === "published_at")
      ? "published_at"
      : "created_at";
    const { data, error } = await sb
      .from(cfg.table)
      .select("*")
      .order(orderField, { ascending: true, nullsFirst: false });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ entity: string }> }) {
  const { entity } = await params;
  const cfg = ENTITIES[entity as EntityKey];
  if (!cfg) return NextResponse.json({ error: "Unknown entity" }, { status: 404 });

  const sb = await createClient();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  delete (body as Record<string, unknown>).id;
  const { data, error } = await sb.from(cfg.table).insert(body).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
