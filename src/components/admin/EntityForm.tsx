"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import slugify from "slugify";
import { Loader2, X } from "lucide-react";
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

  function normalizeSlug() {
    // Clean whatever's in the slug field on blur so a pasted title/sentence
    // can't be saved as an invalid slug (spaces, capitals, punctuation).
    const v = state["slug"];
    if (typeof v !== "string" || !v) return;
    const cleaned = slugify(v, { lower: true, strict: true });
    if (cleaned !== v) set("slug", cleaned);
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
        <FieldRow key={f.name} field={f} value={state[f.name]} onChange={(v) => set(f.name, v)} onTitleBlur={f.name === entity.titleField ? autoSlug : f.name === "slug" ? normalizeSlug : undefined} />
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
  if (field.kind === "reference") {
    return <ReferenceField field={field} value={value} onChange={onChange} labelEl={labelEl} />;
  }
  if (field.kind === "multiselect") {
    return <MultiSelectField field={field} value={value} onChange={onChange} labelEl={labelEl} />;
  }
  if (field.kind === "tags") {
    return <TagsField field={field} value={value} onChange={onChange} labelEl={labelEl} />;
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
  if (field.kind === "images") {
    return <MultiImageField field={field} value={value} onChange={onChange} />;
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

// List field, one item per line. Newlines (rather than commas) are the
// separator so a single item can itself contain commas — e.g. "Corrosion
// mitigation for tanks, pipe, concrete, and steel". Keeps its own text state
// so half-typed lines and trailing blank lines survive while editing; the
// trimmed array is what gets saved.
function TagsField({
  field,
  value,
  onChange,
  labelEl,
}: {
  field: FieldDef;
  value: Value;
  onChange: (v: Value) => void;
  labelEl: React.ReactNode;
}) {
  const [text, setText] = useState(() => (Array.isArray(value) ? value.join("\n") : ""));

  function handle(next: string) {
    setText(next);
    onChange(
      next
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean)
    );
  }

  return (
    <div>
      {labelEl}
      <textarea
        id={field.name}
        rows={5}
        value={text}
        onChange={(e) => handle(e.target.value)}
        className="w-full px-3 py-2 border border-brand-200 rounded-lg focus:outline-none focus:border-brand-accent"
      />
      <p className="mt-1.5 text-xs text-brand-500">
        One item per line. Commas inside a line are kept as-is.
      </p>
    </div>
  );
}

// A list of uploaded images stored as a string[] of URLs. Reuses ImageUpload
// as the "add another" control and shows removable thumbnails for each.
function MultiImageField({
  field,
  value,
  onChange,
}: {
  field: FieldDef;
  value: Value;
  onChange: (v: Value) => void;
}) {
  const images: string[] = Array.isArray(value)
    ? value.filter((v): v is string => typeof v === "string")
    : [];

  return (
    <div>
      <label className="block text-sm font-semibold text-brand-700 mb-2">{field.label}</label>
      {images.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-3">
          {images.map((url, i) => (
            <div key={`${url}-${i}`} className="relative">
              <div className="relative h-24 w-32 overflow-hidden rounded-lg border border-brand-200 bg-brand-50">
                <Image
                  src={url}
                  alt=""
                  fill
                  sizes="128px"
                  unoptimized={url.endsWith(".svg")}
                  className="object-cover"
                />
              </div>
              <button
                type="button"
                onClick={() => onChange(images.filter((_, idx) => idx !== i))}
                className="absolute -top-2 -right-2 rounded-full bg-brand-highlight p-1 text-white shadow"
                aria-label="Remove image"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
      <ImageUpload
        label="Add image"
        value={null}
        onChange={(url) => {
          if (url) onChange([...images, url]);
        }}
        folder={field.name}
      />
    </div>
  );
}

// Checkbox list whose options are loaded live from another table, storing the
// chosen values as a string[] (e.g. a Project's Services Used / Sectors pull
// their options from the services / sectors tables).
function MultiSelectField({
  field,
  value,
  onChange,
  labelEl,
}: {
  field: FieldDef;
  value: Value;
  onChange: (v: Value) => void;
  labelEl: React.ReactNode;
}) {
  const [options, setOptions] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    if (!field.refEntity) return;
    let active = true;
    const vf = field.refValueField ?? "name";
    const lf = field.refLabelField ?? "name";
    fetch(`/api/admin/${field.refEntity}`)
      .then((r) => (r.ok ? r.json() : []))
      .then((rows: Record<string, unknown>[]) => {
        if (!active || !Array.isArray(rows)) return;
        setOptions(
          rows
            .map((r) => ({ value: String(r[vf] ?? ""), label: String(r[lf] ?? "") }))
            .filter((o) => o.value)
        );
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [field.refEntity, field.refValueField, field.refLabelField]);

  const selected: string[] = Array.isArray(value)
    ? value.filter((v): v is string => typeof v === "string")
    : [];
  const optionValues = new Set(options.map((o) => o.value));
  // Preserve any saved values that aren't (or are no longer) in the list.
  const extras = selected.filter((v) => !optionValues.has(v));

  function toggle(v: string) {
    onChange(selected.includes(v) ? selected.filter((x) => x !== v) : [...selected, v]);
  }

  return (
    <div>
      {labelEl}
      <div className="max-w-md max-h-56 overflow-y-auto rounded-lg border border-brand-200 p-3 space-y-1.5">
        {options.map((o) => (
          <label key={o.value} className="flex items-center gap-2.5 text-sm text-brand-700 cursor-pointer">
            <input
              type="checkbox"
              checked={selected.includes(o.value)}
              onChange={() => toggle(o.value)}
              className="w-4 h-4 accent-brand-highlight"
            />
            {o.label}
          </label>
        ))}
        {extras.map((v) => (
          <label key={v} className="flex items-center gap-2.5 text-sm text-brand-500 cursor-pointer">
            <input
              type="checkbox"
              checked
              onChange={() => toggle(v)}
              className="w-4 h-4 accent-brand-highlight"
            />
            {v} <span className="text-xs">(not in list)</span>
          </label>
        ))}
        {options.length === 0 && extras.length === 0 && (
          <p className="text-sm text-brand-400">No options found.</p>
        )}
      </div>
    </div>
  );
}

// Dropdown whose options are loaded live from another table (e.g. the Client
// field on a Project pulls its options from the clients table).
function ReferenceField({
  field,
  value,
  onChange,
  labelEl,
}: {
  field: FieldDef;
  value: Value;
  onChange: (v: Value) => void;
  labelEl: React.ReactNode;
}) {
  const [options, setOptions] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    if (!field.refEntity) return;
    let active = true;
    const vf = field.refValueField ?? "name";
    const lf = field.refLabelField ?? "name";
    fetch(`/api/admin/${field.refEntity}`)
      .then((r) => (r.ok ? r.json() : []))
      .then((rows: Record<string, unknown>[]) => {
        if (!active || !Array.isArray(rows)) return;
        setOptions(
          rows
            .map((r) => ({ value: String(r[vf] ?? ""), label: String(r[lf] ?? "") }))
            .filter((o) => o.value)
        );
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [field.refEntity, field.refValueField, field.refLabelField]);

  const current = typeof value === "string" ? value : "";
  // Keep a legacy/free-text value selectable even if it's not in the list.
  const currentListed = current === "" || options.some((o) => o.value === current);

  return (
    <div>
      {labelEl}
      <select
        id={field.name}
        value={current}
        onChange={(e) => onChange(e.target.value)}
        className="w-full max-w-md px-3 py-2 border border-brand-200 rounded-lg focus:outline-none focus:border-brand-accent bg-white"
      >
        <option value="">— select —</option>
        {!currentListed && <option value={current}>{current} (unlisted)</option>}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
