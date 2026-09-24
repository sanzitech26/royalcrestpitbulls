import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Optimistic gate only: refreshes the session cookies and sends visitors with no session to the login page.
// The real admin check is requireAdmin() in src/lib/admin/auth.ts, backed by Row Level Security in the database.
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(list, headers) {
        list.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        list.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        Object.entries(headers).forEach(([key, value]) => response.headers.set(key, value));
      },
    },
  });

  const { data } = await supabase.auth.getClaims();
  if (!data?.claims && request.nextUrl.pathname !== "/admin/login") {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  return response;
}

export const config = { matcher: ["/admin/:path*"] };
