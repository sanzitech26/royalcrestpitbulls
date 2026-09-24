import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Session-aware client for admin pages and server actions. Always create a fresh one per request.
export async function createServerSupabase() {
  const cookieStore = await cookies();

  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll(list) {
        try {
          list.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Server Components can't write cookies; src/proxy.ts refreshes the session on every /admin request.
        }
      },
    },
  });
}
