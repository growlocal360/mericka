import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { ENTITIES, type EntityKey } from "@/lib/admin/entities";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ entity: string; id: string }> }
) {
  const { entity, id } = await params;
  const cfg = ENTITIES[entity as EntityKey];
  if (!cfg) return NextResponse.json({ error: "Unknown entity" }, { status: 404 });

  try {
    const sb = await createClient();
    const { data, error } = await sb.from(cfg.table).select("*").eq("id", id).single();
    if (error) return NextResponse.json({ error: error.message }, { status: 404 });
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ entity: string; id: string }> }
) {
  const { entity, id } = await params;
  const cfg = ENTITIES[entity as EntityKey];
  if (!cfg) return NextResponse.json({ error: "Unknown entity" }, { status: 404 });

  const sb = await createClient();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  delete (body as Record<string, unknown>).id;
  delete (body as Record<string, unknown>).created_at;
  (body as Record<string, unknown>).updated_at = new Date().toISOString();

  const { data, error } = await sb.from(cfg.table).update(body).eq("id", id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ entity: string; id: string }> }
) {
  const { entity, id } = await params;
  const cfg = ENTITIES[entity as EntityKey];
  if (!cfg) return NextResponse.json({ error: "Unknown entity" }, { status: 404 });

  const sb = await createClient();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { error } = await sb.from(cfg.table).delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
