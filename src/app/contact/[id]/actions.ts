"use server";

import type { InquiryState } from "@/app/contact/actions";
import { getPuppies } from "@/lib/content";
import { deliverInquiry } from "@/lib/inquiry";

export type PuppyInquiryState = InquiryState & { puppy?: string };

const text = (data: FormData, key: string) => String(data.get(key) ?? "").trim();

export async function sendPuppyInquiry(_prev: PuppyInquiryState, formData: FormData): Promise<PuppyInquiryState> {
  if (text(formData, "website")) return { ok: true }; // honeypot: real visitors never see this field, bots fill it

  const row = {
    name: text(formData, "name"),
    email: text(formData, "email"),
    phone: text(formData, "phone"),
    puppy: text(formData, "puppy"), // empty = "Not sure yet"
    address: text(formData, "address"),
    message: text(formData, "message"),
  };
  const puppies = await getPuppies();

  const problems: [boolean, string][] = [
    [row.name.length < 2 || row.name.length > 100, "Please enter your full name."],
    [!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(row.email) || row.email.length > 200, "Please enter a valid email address."],
    [row.phone !== "" && (row.phone.length < 7 || row.phone.length > 30), "Please enter a valid phone number, or leave it blank."],
    [row.puppy !== "" && !puppies.some((p) => p.name === row.puppy), "Please choose one of the listed puppies."],
    [row.address.length > 300, "Please shorten your address (300 characters at most)."],
    [row.message.length < 5 || row.message.length > 2000, "Please write a message (up to 2,000 characters)."],
  ];
  const problem = problems.find(([bad]) => bad);
  if (problem) return { ok: false, error: problem[1] };

  const result = await deliverInquiry({
    ...row,
    subject: "puppies",
    // empty optional fields are left out so the row (and the email) only carries what was filled in
    phone: row.phone || undefined,
    puppy: row.puppy || undefined,
    address: row.address || undefined,
  });
  return result.ok ? { ok: true, name: row.name, puppy: row.puppy } : result;
}
