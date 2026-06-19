"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import slugify from "slugify";
import { Loader2 } from "lucide-react";
import type { JSONContent } from "@tiptap/react";
import type { EntityConfig, FieldDef } from "@/lib/admin/entities";
import ImageUpload from "@/components/admin/ImageUpload";

const RichTextEditor = dynamic(() => import("@/components/editor/RichTextEditor"), { ssr: false });

type Value = string | number | boolean | string[] | JSONContent | null;
type FormState = Record<string, Value>;

interface Props {
  entity: EntityConfig;
  initial?: FormState;
  mode: "new" | "edit";
}

function emptyState(entity: EntityConfig): FormState {
  const state: FormState = {};
  for (const f of entity.fields) {
    if (f.kind === "boolean") state[f.name] = false;
    else if (f.kind === "number") state[f.name] = 0;
    else if (f.arrayValues) state[f.name] = [];
    else if (f.kind === "rich") state[f.name] = null;
    else state[f.name] = "";
  }
  return state;
}

export default function EntityForm({ entity, initial, mode }: Props) {
  const router = useRouter();
  const [state, setState] = useState<FormState>({ ...emptyState(entity), ...(initial ?? {}) });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set(name: string, v: Value) {
    setState((prev) => ({ ...prev, [name]: v }));
  }

  function autoSlug() {
    // Only entities that actually have a slug column should get an auto slug
    // (team_members and locations don't).
    if (!entity.fields.some((f) => f.name === "slug")) return;
    const titleVal = state[entity.titleField];
    if (typeof titleVal !== "string" || !titleVal) return;
    set("slug", slugify(titleVal, { lower: true, strict: true }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const body = { ...state };
    // strip empty strings for nullable date/text fields
    for (const f of entity.fields) {
      if ((f.kind === "date" || f.kind === "text" || f.kind === "textarea") && body[f.name] === "") {
        body[f.name] = null;
      }
      if (f.kind === "number" && body[f.name] === "") body[f.name] = 0;
    }

    const url = mode === "new" ? `/api/admin/${entity.key}` : `/api/admin/${entity.key}/${initial?.id}`;
    const method = mode === "new" ? "POST" : "PUT";
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => null);
        throw new Error(j?.error ?? "Save failed");
      }
      router.push(`/admin/${entity.key}`);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
      setSaving(false);
    }
  }

  async function onDelete() {
    if (!initial?.id || !confirm(`Delete this ${entity.labelSingular}?`)) return;
    setSaving(true);
    const res = await fetch(`/api/admin/${entity.key}/${initial.id}`, { method: "DELETE" });
    if (res.ok) {
      router.push(`/admin/${entity.key}`);
      router.refresh();
    } else {
      const j = await res.json().catch(() => null);
      setError(j?.error ?? "Delete failed");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6 max-w-3xl">
      {entity.fields.map((f) => (
        <FieldRow key={f.name} field={f} value={state[f.name]} onChange={(v) => set(f.name, v)} onTitleBlur={f.name === entity.titleField ? autoSlug : undefined} />
      ))}
      {error && <p className="text-sm text-brand-highlight">{error}</p>}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-brand-highlight text-white font-semibold hover:brightness-110 transition-all disabled:opacity-60"
        >
          {saving && <Loader2 className="w-4 h-4 animate-spin" />}
          {mode === "new" ? "Create" : "Save changes"}
        </button>
        {mode === "edit" && (
          <button
            type="button"
            onClick={onDelete}
            className="px-5 py-2.5 rounded-lg border border-brand-200 text-brand-700 hover:bg-brand-50 transition-colors"
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
}

function FieldRow({
  field,
  value,
  onChange,
  onTitleBlur,
}: {
  field: FieldDef;
  value: Value;
  onChange: (v: Value) => void;
  onTitleBlur?: () => void;
}) {
  const labelEl = (
    <label htmlFor={field.name} className="block text-sm font-semibold text-brand-700 mb-1.5">
      {field.label} {field.required && "*"}
    </label>
  );

  if (field.kind === "boolean") {
    return (
      <div className="flex items-center gap-3">
        <input
          id={field.name}
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
          className="w-4 h-4 accent-brand-highlight"
        />
        <label htmlFor={field.name} className="text-sm font-semibold text-brand-700">
          {field.label}
        </label>
      </div>
    );
  }
  if (field.kind === "textarea") {
    return (
      <div>
        {labelEl}
        <textarea
          id={field.name}
          rows={4}
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 border border-brand-200 rounded-lg focus:outline-none focus:border-brand-accent"
        />
      </div>
    );
  }
  if (field.kind === "number") {
    return (
      <div>
        {labelEl}
        <input
          id={field.name}
          type="number"
          value={typeof value === "number" ? value : 0}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full max-w-xs px-3 py-2 border border-brand-200 rounded-lg focus:outline-none focus:border-brand-accent"
        />
      </div>
    );
  }
  if (field.kind === "select") {
    return (
      <div>
        {labelEl}
        <select
          id={field.name}
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full max-w-md px-3 py-2 border border-brand-200 rounded-lg focus:outline-none focus:border-brand-accent bg-white"
        >
          <option value="">— select —</option>
          {field.options?.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>
    );
  }
  if (field.kind === "tags") {
    const text = Array.isArray(value) ? value.join(", ") : "";
    return (
      <div>
        {labelEl}
        <input
          id={field.name}
          type="text"
          value={text}
          onChange={(e) =>
            onChange(
              e.target.value
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
            )
          }
          className="w-full px-3 py-2 border border-brand-200 rounded-lg focus:outline-none focus:border-brand-accent"
        />
      </div>
    );
  }
  if (field.kind === "image") {
    return (
      <ImageUpload
        label={field.label}
        value={typeof value === "string" ? value : null}
        onChange={(v) => onChange(v)}
        folder={field.name}
      />
    );
  }
  if (field.kind === "date") {
    const v = typeof value === "string" ? value.slice(0, 10) : "";
    return (
      <div>
        {labelEl}
        <input
          id={field.name}
          type="date"
          value={v}
          onChange={(e) => onChange(e.target.value || null)}
          className="w-full max-w-xs px-3 py-2 border border-brand-200 rounded-lg focus:outline-none focus:border-brand-accent"
        />
      </div>
    );
  }
  if (field.kind === "rich") {
    return (
      <div>
        {labelEl}
        <RichTextEditor content={value as JSONContent | null} onChange={onChange} />
      </div>
    );
  }
  return (
    <div>
      {labelEl}
      <input
        id={field.name}
        type="text"
        value={typeof value === "string" ? value : ""}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onTitleBlur}
        required={field.required}
        className="w-full px-3 py-2 border border-brand-200 rounded-lg focus:outline-none focus:border-brand-accent"
      />
    </div>
  );
}
