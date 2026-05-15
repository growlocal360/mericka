import Link from "next/link";
import { notFound } from "next/navigation";
import EntityForm from "@/components/admin/EntityForm";
import { ENTITIES, type EntityKey } from "@/lib/admin/entities";
import { createClient } from "@/lib/supabase/server";

export default async function AdminEntityEdit({
  params,
}: {
  params: Promise<{ entity: string; id: string }>;
}) {
  const { entity, id } = await params;
  const cfg = ENTITIES[entity as EntityKey];
  if (!cfg) notFound();

  let record: Record<string, unknown> | null = null;
  try {
    const sb = await createClient();
    const { data } = await sb.from(cfg.table).select("*").eq("id", id).single();
    record = data;
  } catch {
    record = null;
  }
  if (!record) notFound();

  return (
    <div>
      <Link href={`/admin/${cfg.key}`} className="text-brand-accent hover:text-brand-highlight text-sm font-medium">
        ← Back to {cfg.label}
      </Link>
      <h1 className="mt-4 mb-8 text-3xl font-bold text-brand-900">
        Edit {cfg.labelSingular}
      </h1>
      <EntityForm entity={cfg} mode="edit" initial={record as never} />
    </div>
  );
}
