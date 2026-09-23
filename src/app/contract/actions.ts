"use server";

import { createClient } from "@supabase/supabase-js";
import { puppies } from "@/data/puppies";
import { policyVersion, undecidedPuppy } from "@/data/refund-policy";

export type SignState = { ok: boolean; error?: string; name?: string };

const text = (data: FormData, key: string) => String(data.get(key) ?? "").trim();

// ponytail: anon key + insert-only RLS (supabase/migrations). Someone could still POST rows straight to Supabase, limited
// only by the table CHECKs; move to a service-role key here + deny-all RLS if spam ever shows up.
export async function signContract(_prev: SignState, formData: FormData): Promise<SignState> {
  if (text(formData, "website")) return { ok: true }; // honeypot: real visitors never see this field, bots fill it

  const row = {
    puppy: text(formData, "puppy"),
    full_name: text(formData, "full_name"),
    email: text(formData, "email"),
    phone: text(formData, "phone"),
    delivery_address: text(formData, "delivery_address"),
    accepted: formData.get("accepted") === "on",
    policy_version: policyVersion,
    signature: text(formData, "signature"),
  };
  const { signature } = row;

  const problems: [boolean, string][] = [
    [row.puppy !== undecidedPuppy && !puppies.some((p) => p.name === row.puppy), "Please choose a puppy."],
    [row.full_name.length < 2 || row.full_name.length > 100, "Please enter your full name."],
    [!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(row.email) || row.email.length > 200, "Please enter a valid email address."],
    [row.phone.length < 7 || row.phone.length > 30, "Please enter a valid phone number."],
    [row.delivery_address.length < 2 || row.delivery_address.length > 300, "Please enter your delivery address, or “Pickup”."],
    [!row.accepted, "Please confirm that you have read and agree to the policy."],
    [!signature.startsWith("data:image/png;base64,") || signature.length > 150_000, "Please sign in the box."],
  ];
  const problem = problems.find(([bad]) => bad);
  if (problem) return { ok: false, error: problem[1] };

  const unavailable: SignState = {
    ok: false,
    error: "We couldn't record your signature just now. Please try again, or contact us and we'll sort it out.",
  };

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    console.error("contract: NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY are not set");
    return unavailable;
  }

  const { error } = await createClient(url, key, { auth: { persistSession: false } })
    .from("contract_signatures")
    .insert(row);
  if (error) {
    console.error("contract: insert failed:", error.message);
    return unavailable;
  }

  return { ok: true, name: row.full_name };
}
