import { createClient } from "@supabase/supabase-js";

// Stateless, cookie-free client for public reads (puppies, testimonials, FAQ) so those pages stay cacheable.
export function createAnonClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    console.error("supabase: NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY are not set");
    return null;
  }
  return createClient(url, key, { auth: { persistSession: false } });
}
