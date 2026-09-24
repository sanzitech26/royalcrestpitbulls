"use server";

import { faqCategories } from "@/data/faqs";
import { requireAdmin } from "@/lib/admin/auth";
import { failed, firstProblem, refreshSite, text, whole, type FormState } from "@/lib/admin/form";

export async function saveFaq(_previous: FormState, formData: FormData): Promise<FormState> {
  const { supabase } = await requireAdmin();
  const id = text(formData, "id"); // empty when adding

  const category = text(formData, "category");
  const question = text(formData, "question");
  const answer = text(formData, "answer");
  const order = text(formData, "sort_order");

  const problem = firstProblem([
    [!faqCategories.some((c) => c.title === category), "Please choose a category."],
    [question.length < 5 || question.length > 300, "The question should be 5 to 300 characters."],
    [answer.length < 5 || answer.length > 2000, "The answer should be 5 to 2,000 characters."],
    [order !== "" && Number.isNaN(whole(formData, "sort_order")), "The order must be a whole number, or blank."],
  ]);
  if (problem) return problem;

  // blank order = last in its category
  let sortOrder = order === "" ? 0 : whole(formData, "sort_order");
  if (order === "") {
    const { data: last } = await supabase
      .from("faq_items")
      .select("sort_order")
      .eq("category", category)
      .order("sort_order", { ascending: false })
      .limit(1);
    sortOrder = (last?.[0]?.sort_order ?? 0) + 1;
  }

  const row = { category, question, answer, sort_order: sortOrder };
  const { error } = id
    ? await supabase.from("faq_items").update(row).eq("id", id)
    : await supabase.from("faq_items").insert(row);
  if (error) return failed(error);

  refreshSite();
  return { ok: true };
}

export async function deleteFaq(_previous: FormState, formData: FormData): Promise<FormState> {
  const { supabase } = await requireAdmin();

  const { error } = await supabase.from("faq_items").delete().eq("id", text(formData, "id"));
  if (error) return failed(error);

  refreshSite();
  return { ok: true };
}
