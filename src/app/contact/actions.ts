"use server";

import { inquirySubjects } from "@/data/inquiries";
import { deliverInquiry } from "@/lib/inquiry";

export type InquiryState = { ok: boolean; error?: string; name?: string };

const text = (data: FormData, key: string) => String(data.get(key) ?? "").trim();

// ponytail: anon key + insert-only RLS on `inquiries` (supabase/migrations). Someone could still POST rows straight to
// Supabase, limited only by the table CHECKs; move to a service-role key here + deny-all RLS if spam ever shows up.
export async function sendInquiry(_prev: InquiryState, formData: FormData): Promise<InquiryState> {
  if (text(formData, "website")) return { ok: true }; // honeypot: real visitors never see this field, bots fill it

  const row = {
    name: text(formData, "name"),
    email: text(formData, "email"),
    subject: text(formData, "subject"),
    message: text(formData, "message"),
  };

  const problems: [boolean, string][] = [
    [row.name.length < 2 || row.name.length > 100, "Please enter your full name."],
    [!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(row.email) || row.email.length > 200, "Please enter a valid email address."],
    [!inquirySubjects.some((s) => s.value === row.subject), "Please choose a subject."],
    [row.message.length < 5 || row.message.length > 2000, "Please write a message (up to 2,000 characters)."],
  ];
  const problem = problems.find(([bad]) => bad);
  if (problem) return { ok: false, error: problem[1] };

  // saved in /admin/inquiries and emailed to the admin (see lib/inquiry.ts)
  const result = await deliverInquiry(row);
  return result.ok ? { ok: true, name: row.name } : result;
}
