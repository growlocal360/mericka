import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { Resend } from "resend";

// Where submissions are emailed. Overridable via env if needed.
const CONTACT_TO = process.env.CONTACT_TO ?? "info@merickagroup.com";
// Must be an address on a domain you've verified in Resend.
const CONTACT_FROM =
  process.env.CONTACT_FROM ?? "Mericka Group Website <noreply@merickagroup.com>";

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
  const phone = (body.phone as string | undefined)?.trim() || null;
  const company = (body.company as string | undefined)?.trim() || null;
  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // 1) Store the submission (still viewable in /admin → Submissions).
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("contact_submissions")
      .insert({ name, email, phone, company, message });
    if (error) {
      console.error("contact insert", error);
      return NextResponse.json(
        { error: "Could not save submission. Try again later." },
        { status: 500 }
      );
    }
  } catch (e) {
    console.error("contact handler", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

  // 2) Email a notification (best-effort — the submission is already saved,
  //    so we never fail the request if the email can't be sent).
  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    try {
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: CONTACT_FROM,
        to: CONTACT_TO,
        replyTo: email,
        subject: `New website inquiry from ${name}`,
        text:
          `New submission from the Mericka Group website:\n\n` +
          `Name: ${name}\n` +
          `Email: ${email}\n` +
          `Phone: ${phone ?? "—"}\n` +
          `Company: ${company ?? "—"}\n\n` +
          `Message:\n${message}\n`,
      });
    } catch (e) {
      console.error("contact email", e);
    }
  } else {
    console.warn("RESEND_API_KEY not set — skipping contact email");
  }

  return NextResponse.json({ ok: true });
}
