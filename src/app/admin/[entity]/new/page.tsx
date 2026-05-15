import Link from "next/link";
import { notFound } from "next/navigation";
import EntityForm from "@/components/admin/EntityForm";
import { ENTITIES, type EntityKey } from "@/lib/admin/entities";

export default async function AdminEntityNew({ params }: { params: Promise<{ entity: string }> }) {
  const { entity } = await params;
  const cfg = ENTITIES[entity as EntityKey];
  if (!cfg) notFound();
  return (
    <div>
      <Link href={`/admin/${cfg.key}`} className="text-brand-accent hover:text-brand-highlight text-sm font-medium">
        ← Back to {cfg.label}
      </Link>
      <h1 className="mt-4 mb-8 text-3xl font-bold text-brand-900">New {cfg.labelSingular}</h1>
      <EntityForm entity={cfg} mode="new" />
    </div>
  );
}
