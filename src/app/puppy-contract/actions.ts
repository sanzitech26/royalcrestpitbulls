"use server";

import { optionLabel, paymentMethods, shippingOptions, termsVersion, undecidedPuppy } from "@/data/puppy-contract";
import { getPuppies } from "@/lib/content";
import { sendAdminEmail } from "@/lib/email";
import { createAnonClient } from "@/lib/supabase/anon";

export type SignState = { ok: boolean; error?: string; name?: string };

const text = (data: FormData, key: string) => String(data.get(key) ?? "").trim();

// ponytail: anon key + insert-only RLS (supabase/migrations). Someone could still POST rows straight to Supabase, limited
// only by the table CHECKs; move to a service-role key here + deny-all RLS if spam ever shows up.
export async function signContract(_prev: SignState, formData: FormData): Promise<SignState> {
  if (text(formData, "website")) return { ok: true }; // honeypot: real visitors never see this field, bots fill it

  const price = text(formData, "agreed_price").replace(/[$,\s]/g, "");
  const row = {
    puppy: text(formData, "puppy"),
    full_name: text(formData, "full_name"),
    email: text(formData, "email"),
    phone: text(formData, "phone"),
    delivery_address: text(formData, "delivery_address"),
    agreed_price: price ? Number(price) : null,
    shipping_option: text(formData, "shipping_option"),
    payment_method: text(formData, "payment_method"),
    accepted: formData.get("accepted") === "yes",
    policy_version: termsVersion,
    signature: text(formData, "signature"),
  };
  const { signature } = row;
  const puppies = await getPuppies();

  const problems: [boolean, string][] = [
    [row.puppy !== undecidedPuppy && !puppies.some((p) => p.name === row.puppy), "Please choose a puppy."],
    [row.full_name.length < 2 || row.full_name.length > 100, "Please enter your full name."],
    [!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(row.email) || row.email.length > 200, "Please enter a valid email address."],
    [row.phone.length < 7 || row.phone.length > 30, "Please enter a valid phone number."],
    [
      row.agreed_price !== null &&
        !(Number.isInteger(row.agreed_price) && row.agreed_price >= 0 && row.agreed_price <= 1_000_000),
      "Please enter the agreed price in whole dollars, or leave it blank.",
    ],
    [row.delivery_address.length < 2 || row.delivery_address.length > 300, "Please enter your delivery address."],
    [!shippingOptions.some((o) => o.value === row.shipping_option), "Please choose a shipping option."],
    [!paymentMethods.some((o) => o.value === row.payment_method), "Please choose a payment method."],
    [!row.accepted, "Please accept the terms and conditions to sign."],
    [!signature.startsWith("data:image/png;base64,") || signature.length > 150_000, "Please sign in the box."],
  ];
  const problem = problems.find(([bad]) => bad);
  if (problem) return { ok: false, error: problem[1] };

  const db = createAnonClient();
  const { error } = db
    ? await db.from("contract_signatures").insert(row) // no .select(): visitors may insert but never read signatures
    : { error: { message: "no database connection" } };
  if (error) {
    console.error("contract: insert failed:", error.message);
    return {
      ok: false,
      error: "We couldn't record your signature just now. Please try again, or contact us and we'll sort it out.",
    };
  }

  // ponytail: the team gets a text summary only (the drawn signature is viewed in /admin/signatures); the buyer isn't
  // emailed because a public form that emails whatever address is typed in can be used to spam third parties. Best
  // effort: the signature is already saved, so a mail problem never fails the signing.
  await sendAdminEmail({
    // only a puppy name checked against the database (or the fixed "not sure" choice), never raw visitor text
    subject: `Puppy contract signed for ${row.puppy}`,
    text: [
      `Name: ${row.full_name}`,
      `Email: ${row.email}`,
      `Phone: ${row.phone}`,
      `Puppy: ${row.puppy}`,
      `Agreed price: ${row.agreed_price === null ? "(not given)" : `$${row.agreed_price}`}`,
      `Delivery address: ${row.delivery_address}`,
      `Shipping: ${optionLabel(shippingOptions, row.shipping_option)}`,
      `Payment method: ${optionLabel(paymentMethods, row.payment_method)}`,
      `Terms version: ${row.policy_version}`,
      "",
      "The drawn signature is saved: open Contract signatures in /admin to view and print it.",
    ].join("\n"),
    replyTo: { name: row.full_name.replace(/[\r\n]+/g, " "), address: row.email },
  });

  return { ok: true, name: row.full_name };
}
