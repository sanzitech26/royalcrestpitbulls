"use server";

import { redirect } from "next/navigation";
import { text, type FormState } from "@/lib/admin/form";
import { createServerSupabase } from "@/lib/supabase/server";

export async function login(_previous: FormState, formData: FormData): Promise<FormState> {
  const email = text(formData, "email");
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { error: "Enter your email and password." };

  const supabase = await createServerSupabase();

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: "Incorrect email or password." };

  const { data: isAdmin, error: adminError } = await supabase.rpc("is_admin");
  if (adminError) {
    await supabase.auth.signOut();
    return { error: `Signed in, but admin access couldn't be checked: ${adminError.message}` };
  }
  if (!isAdmin) {
    await supabase.auth.signOut();
    return { error: "This account doesn't have admin access." };
  }

  redirect("/admin");
}

export async function logout() {
  const supabase = await createServerSupabase();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
