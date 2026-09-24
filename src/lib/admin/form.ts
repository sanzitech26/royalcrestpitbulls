import { revalidatePath } from "next/cache";

export type FormState = { ok?: boolean; error?: string };

export const text = (data: FormData, key: string) => String(data.get(key) ?? "").trim();

// NaN when the field is empty, negative or not a plain whole number
export const whole = (data: FormData, key: string) => {
  const value = text(data, key);
  return /^\d{1,9}$/.test(value) ? Number(value) : NaN;
};

// [failed?, message] pairs, first failure wins — same shape the contract action uses
export const firstProblem = (problems: [boolean, string][]): FormState | undefined => {
  const found = problems.find(([failed]) => failed);
  return found ? { error: found[1] } : undefined;
};

// Admin-only pages, so the database's own message (e.g. which CHECK failed) is fine to show.
export const failed = (error: { message: string }): FormState => ({ error: error.message });

// A server action only re-renders the current page if something is revalidated, so every action ends with one of these.
// Admin-only changes (inquiries):
export const refreshAdmin = () => revalidatePath("/admin", "layout");

// Changes to public content: public pages are cached (revalidate = 60), so this makes edits show immediately.
export const refreshSite = () => revalidatePath("/", "layout");
