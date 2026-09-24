import { cache } from "react";
import { redirect } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase/server";

// Call at the top of every admin page and server action, not just in a layout: layouts don't re-run on client
// navigation and never protect the pages or actions below them. Row Level Security still backs this up in the database.
export const requireAdmin = cache(async () => {
  const supabase = await createServerSupabase();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: isAdmin } = await supabase.rpc("is_admin");
  if (!isAdmin) redirect("/admin/login?error=denied");

  return { supabase, user };
});
