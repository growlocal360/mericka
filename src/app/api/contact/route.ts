import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const name = (body.name as string | undefined)?.trim();
  const email = (body.email as string | undefined)?.trim();
  const message = (body.message as string | undefined)?.trim();
  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("contact_submissions").insert({
      name,
      email,
      phone: (body.phone as string | undefined) ?? null,
      company: (body.company as string | undefined) ?? null,
      message,
    });
    if (error) {
      console.error("contact insert", error);
      return NextResponse.json({ error: "Could not save submission. Try again later." }, { status: 500 });
    }
  } catch (e) {
    console.error("contact handler", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
