"use server";

import { inquiryStatuses } from "@/data/inquiries";
import { requireAdmin } from "@/lib/admin/auth";
import { failed, firstProblem, refreshAdmin, text, type FormState } from "@/lib/admin/form";

export async function setInquiryStatus(_previous: FormState, formData: FormData): Promise<FormState> {
  const { supabase } = await requireAdmin();
  const id = text(formData, "id");
  const status = text(formData, "status");

  const problem = firstProblem([[!(inquiryStatuses as readonly string[]).includes(status), "Unknown status."]]);
  if (problem) return problem;

  const { error } = await supabase.from("inquiries").update({ status }).eq("id", id);
  if (error) return failed(error);

  refreshAdmin();
  return { ok: true };
}

export async function deleteInquiry(_previous: FormState, formData: FormData): Promise<FormState> {
  const { supabase } = await requireAdmin();

  const { error } = await supabase.from("inquiries").delete().eq("id", text(formData, "id"));
  if (error) return failed(error);

  refreshAdmin();
  return { ok: true };
}
