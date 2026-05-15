import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request: { headers: request.headers } });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  // If Supabase isn't configured yet, allow everything through so local bring-up works.
  if (!url || !key || url.includes("placeholder")) return response;

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request: { headers: request.headers } });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  const { data: { user } } = await supabase.auth.getUser();

  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!user) return NextResponse.redirect(new URL("/login", request.url));
    const { data: approved } = await supabase
      .from("approved_emails")
      .select("id")
      .eq("email", user.email)
      .single();
    if (!approved) return NextResponse.redirect(new URL("/login?error=unauthorized", request.url));
  }

  if (request.nextUrl.pathname === "/login" && user) {
    const { data: approved } = await supabase
      .from("approved_emails")
      .select("id")
      .eq("email", user.email)
      .single();
    if (approved) return NextResponse.redirect(new URL("/admin", request.url));
  }

  return response;
}

export const config = { matcher: ["/admin/:path*", "/login"] };
