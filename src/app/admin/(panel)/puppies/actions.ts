"use server";

import { redirect } from "next/navigation";
import { puppyStatuses } from "@/data/puppies";
import { requireAdmin } from "@/lib/admin/auth";
import { failed, firstProblem, refreshSite, text, whole, type FormState } from "@/lib/admin/form";

const slugify = (name: string) =>
  name
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 50) || "puppy";

// ponytail: replaced or deleted photos stay in the puppy-photos bucket (a few hundred KB each); clear them out in the Supabase dashboard if it ever matters.
export async function savePuppy(_previous: FormState, formData: FormData): Promise<FormState> {
  const { supabase } = await requireAdmin();
  const editing = text(formData, "id"); // empty when adding a puppy

  const row = {
    name: text(formData, "name"),
    price: whole(formData, "price"),
    gender: text(formData, "gender"),
    date_of_birth: text(formData, "date_of_birth"),
    breed: text(formData, "breed"),
    color: text(formData, "color"),
    status: text(formData, "status"),
    image: text(formData, "image"),
  };

  const problem = firstProblem([
    [row.name.length < 1 || row.name.length > 60, "Please enter the puppy's name."],
    [!Number.isFinite(row.price) || row.price > 1_000_000, "Please enter the price as a whole number of dollars."],
    [row.gender !== "Male" && row.gender !== "Female", "Please choose a gender."],
    [!/^\d{4}-\d{2}-\d{2}$/.test(row.date_of_birth), "Please enter the date of birth."],
    [new Date(row.date_of_birth).getTime() > Date.now(), "The date of birth can't be in the future."],
    [row.breed.length < 1 || row.breed.length > 60, "Please enter the breed."],
    [row.color.length < 1 || row.color.length > 60, "Please enter the color."],
    [!(puppyStatuses as readonly string[]).includes(row.status), "Please choose a status."],
    [!/^(\/[^/]|https:\/\/)/.test(row.image), "Please upload a photo."],
  ]);
  if (problem) return problem;

  if (editing) {
    const { error } = await supabase.from("puppies").update(row).eq("id", editing);
    if (error) return failed(error);
    refreshSite();
    return { ok: true };
  }

  // The URL slug comes from the name; add -2, -3… when two puppies share one.
  const base = slugify(row.name);
  const { data: taken } = await supabase.from("puppies").select("id").like("id", `${base}%`);
  const used = new Set(taken?.map((puppy) => puppy.id));
  let id = base;
  for (let n = 2; used.has(id); n++) id = `${base}-${n}`;

  const { error } = await supabase.from("puppies").insert({ id, ...row });
  if (error) return failed(error);

  refreshSite();
  redirect("/admin/puppies");
}

export async function setPuppyStatus(_previous: FormState, formData: FormData): Promise<FormState> {
  const { supabase } = await requireAdmin();
  const status = text(formData, "status");

  const problem = firstProblem([[!(puppyStatuses as readonly string[]).includes(status), "Unknown status."]]);
  if (problem) return problem;

  const { error } = await supabase.from("puppies").update({ status }).eq("id", text(formData, "id"));
  if (error) return failed(error);

  refreshSite();
  return { ok: true };
}

export async function deletePuppy(_previous: FormState, formData: FormData): Promise<FormState> {
  const { supabase } = await requireAdmin();

  const { error } = await supabase.from("puppies").delete().eq("id", text(formData, "id"));
  if (error) return failed(error);

  refreshSite();
  redirect("/admin/puppies");
}
