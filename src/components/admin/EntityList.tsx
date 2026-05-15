"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Plus, Search, Pencil } from "lucide-react";
import type { EntityConfig } from "@/lib/admin/entities";

type Row = {
  id: string;
  slug?: string | null;
  name?: string | null;
  title?: string | null;
  published?: boolean | null;
};

export default function EntityList({ entity }: { entity: EntityConfig }) {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/admin/${entity.key}`)
      .then(async (r) => {
        if (!r.ok) throw new Error((await r.json()).error ?? "Failed to load");
        return r.json();
      })
      .then((data) => {
        if (!cancelled) setRows(data);
      })
      .catch((e) => {
        if (!cancelled) setError(e.message);
      });
    return () => {
      cancelled = true;
    };
  }, [entity.key]);

  const filtered = useMemo(() => {
    if (!rows) return [];
    const s = search.toLowerCase().trim();
    if (!s) return rows;
    return rows.filter((r) =>
      [(r.name ?? ""), (r.title ?? ""), (r.slug ?? "")]
        .some((v) => v.toLowerCase().includes(s))
    );
  }, [rows, search]);

  return (
    <div>
      <div className="flex items-end justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold text-brand-900">{entity.label}</h1>
          <p className="text-brand-600 mt-1">Manage {entity.label.toLowerCase()}.</p>
        </div>
        <Link
          href={`/admin/${entity.key}/new`}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-highlight text-white font-semibold hover:brightness-110 transition-all"
        >
          <Plus className="w-4 h-4" /> New {entity.labelSingular}
        </Link>
      </div>

      <div className="bg-white border border-brand-100 rounded-xl">
        <div className="p-4 border-b border-brand-100 flex items-center gap-2">
          <Search className="w-4 h-4 text-brand-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search…"
            className="flex-1 bg-transparent focus:outline-none text-brand-900"
          />
        </div>

        {error ? (
          <p className="p-6 text-sm text-brand-highlight">{error}</p>
        ) : rows === null ? (
          <p className="p-6 text-sm text-brand-500">Loading…</p>
        ) : filtered.length === 0 ? (
          <p className="p-6 text-sm text-brand-500 italic">No {entity.label.toLowerCase()} yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wider text-brand-500 border-b border-brand-100">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Slug</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 w-16"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-b border-brand-50 last:border-b-0 hover:bg-brand-50/50">
                  <td className="px-4 py-3 font-medium text-brand-900">{r.name ?? r.title ?? "—"}</td>
                  <td className="px-4 py-3 text-brand-500 font-mono text-xs">{r.slug ?? "—"}</td>
                  <td className="px-4 py-3">
                    {r.published == null ? (
                      <span className="text-brand-400">—</span>
                    ) : r.published ? (
                      <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-800">
                        Published
                      </span>
                    ) : (
                      <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-brand-100 text-brand-600">
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/${entity.key}/${r.id}/edit`}
                      className="inline-flex items-center gap-1 text-brand-accent hover:text-brand-highlight"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
