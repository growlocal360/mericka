"use client";

import { useState, Suspense } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Loader2 } from "lucide-react";
import { brand } from "@/lib/brand";

function LoginInner() {
  const router = useRouter();
  const params = useSearchParams();
  const initialError =
    params.get("error") === "unauthorized" ? "That email isn't approved for admin access." : null;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(initialError);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError || !data.user) {
      setError(signInError?.message ?? "Sign-in failed.");
      setLoading(false);
      return;
    }
    const { data: approved } = await supabase
      .from("approved_emails")
      .select("id")
      .eq("email", data.user.email)
      .single();
    if (!approved) {
      await supabase.auth.signOut();
      setError("That email isn't approved for admin access.");
      setLoading(false);
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-950 p-6">
      <div className="w-full max-w-md bg-brand-900 border border-brand-800 rounded-2xl p-8 shadow-2xl">
        <Image
          src={brand.logo}
          alt={brand.short}
          width={200}
          height={45}
          className="h-10 w-auto mb-6"
        />
        <h1 className="text-2xl font-bold text-white mb-1">Admin Sign In</h1>
        <p className="text-sm text-brand-300 mb-6">Enter your approved admin credentials.</p>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-brand-200 mb-1.5">Email</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-brand-800 border border-brand-700 text-white rounded-lg focus:outline-none focus:border-brand-accent"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-brand-200 mb-1.5">Password</label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-brand-800 border border-brand-700 text-white rounded-lg focus:outline-none focus:border-brand-accent"
            />
          </div>
          {error && <p className="text-sm text-brand-highlight">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-brand-highlight text-white font-semibold hover:brightness-110 transition-all disabled:opacity-60"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-brand-950" />}>
      <LoginInner />
    </Suspense>
  );
}
