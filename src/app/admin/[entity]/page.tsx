import { notFound } from "next/navigation";
import EntityList from "@/components/admin/EntityList";
import { ENTITIES, type EntityKey } from "@/lib/admin/entities";

export default async function AdminEntityList({ params }: { params: Promise<{ entity: string }> }) {
  const { entity } = await params;
  const cfg = ENTITIES[entity as EntityKey];
  if (!cfg) notFound();
  return <EntityList entity={cfg} />;
}
