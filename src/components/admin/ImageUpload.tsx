"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Upload, X, ImageIcon } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Props {
  value: string | null;
  onChange: (url: string | null) => void;
  bucket?: string;
  folder?: string;
  label?: string;
}

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];

export default function ImageUpload({
  value,
  onChange,
  bucket = "uploads",
  folder = "misc",
  label = "Image",
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = async (file: File) => {
    setError(null);
    if (!ALLOWED.includes(file.type)) {
      setError("Unsupported file type.");
      return;
    }
    if (file.size > MAX_BYTES) {
      setError("File too large (max 5MB).");
      return;
    }
    setUploading(true);
    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop()?.toLowerCase() ?? "bin";
      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, { upsert: true });
      if (upErr) throw upErr;
      const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
      onChange(data.publicUrl);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Upload failed";
      setError(msg);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-brand-700 mb-2">{label}</label>
      {value ? (
        <div className="relative inline-block">
          <div className="relative w-64 h-40 rounded-lg overflow-hidden border border-brand-200">
            <Image src={value} alt="" fill sizes="256px" className="object-cover" />
          </div>
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute -top-2 -right-2 bg-brand-highlight text-white p-1.5 rounded-full shadow"
            aria-label="Remove image"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            const file = e.dataTransfer.files?.[0];
            if (file) handleFile(file);
          }}
          onClick={() => inputRef.current?.click()}
          className={`w-full max-w-md border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            dragging ? "border-brand-accent bg-brand-accent/5" : "border-brand-200 hover:border-brand-accent/60"
          }`}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2 text-brand-600">
              <Upload className="w-6 h-6 animate-pulse" />
              <span>Uploading…</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-brand-600">
              <ImageIcon className="w-6 h-6" />
              <span className="font-medium">Drop image or click to upload</span>
              <span className="text-xs text-brand-400">JPG, PNG, WebP, SVG · max 5MB</span>
            </div>
          )}
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={ALLOWED.join(",")}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
      {error && <p className="mt-2 text-sm text-brand-highlight">{error}</p>}
    </div>
  );
}
