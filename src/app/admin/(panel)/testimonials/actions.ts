"use server";

import { requireAdmin } from "@/lib/admin/auth";
import { failed, firstProblem, refreshSite, text, whole, type FormState } from "@/lib/admin/form";

export async function saveTestimonial(_previous: FormState, formData: FormData): Promise<FormState> {
  const { supabase } = await requireAdmin();
  const id = text(formData, "id"); // empty when adding

  const row = {
    name: text(formData, "name"),
    location: text(formData, "location"),
    puppy: text(formData, "puppy"),
    rating: whole(formData, "rating"),
    quote: text(formData, "quote"),
    published: formData.get("published") === "on",
  };

  const problem = firstProblem([
    [row.name.length < 1 || row.name.length > 100, "Please enter the customer's name."],
    [row.location.length < 1 || row.location.length > 100, "Please enter their city and state."],
    [row.puppy.length < 1 || row.puppy.length > 60, "Please enter the name of the puppy they adopted."],
    [!(row.rating >= 1 && row.rating <= 5), "Please choose a rating from 1 to 5."],
    [row.quote.length < 10 || row.quote.length > 1000, "The review should be 10 to 1,000 characters."],
  ]);
  if (problem) return problem;

  const { error } = id
    ? await supabase.from("testimonials").update(row).eq("id", id)
    : await supabase.from("testimonials").insert(row);
  if (error) return failed(error);

  refreshSite();
  return { ok: true };
}

export async function deleteTestimonial(_previous: FormState, formData: FormData): Promise<FormState> {
  const { supabase } = await requireAdmin();

  const { error } = await supabase.from("testimonials").delete().eq("id", text(formData, "id"));
  if (error) return failed(error);

  refreshSite();
  return { ok: true };
}
