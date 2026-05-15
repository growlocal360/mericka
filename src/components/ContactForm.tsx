"use client";

import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);
    const form = new FormData(e.currentTarget);
    const body = Object.fromEntries(form.entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => null);
        throw new Error(j?.error ?? "Submission failed");
      }
      setStatus("success");
      e.currentTarget.reset();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Submission failed";
      setError(msg);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-brand-50 border border-brand-accent/30 rounded-2xl p-10 text-center">
        <CheckCircle2 className="w-12 h-12 text-brand-accent mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-brand-900">Thanks — we got it.</h2>
        <p className="mt-3 text-brand-600">We&apos;ll be in touch within one business day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="bg-white border border-brand-100 rounded-2xl p-8 shadow-sm space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field name="name" label="Name" required />
        <Field name="email" label="Email" type="email" required />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field name="phone" label="Phone" />
        <Field name="company" label="Company" />
      </div>
      <div>
        <label className="block text-sm font-semibold text-brand-700 mb-1.5">Message *</label>
        <textarea
          name="message"
          required
          rows={6}
          className="w-full px-3 py-2 border border-brand-200 rounded-lg focus:outline-none focus:border-brand-accent transition-colors"
        />
      </div>
      {error && <p className="text-sm text-brand-highlight">{error}</p>}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-brand-highlight text-white font-semibold hover:brightness-110 transition-all disabled:opacity-60"
      >
        {status === "submitting" && <Loader2 className="w-4 h-4 animate-spin" />}
        Send message
      </button>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  required = false,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-semibold text-brand-700 mb-1.5">
        {label} {required && "*"}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full px-3 py-2 border border-brand-200 rounded-lg focus:outline-none focus:border-brand-accent transition-colors"
      />
    </div>
  );
}
