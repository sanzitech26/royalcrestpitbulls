import { sendAdminEmail } from "@/lib/email";
import { createAnonClient } from "@/lib/supabase/anon";

type NewInquiry = {
  name: string;
  email: string;
  subject: string;
  message: string;
  // optional: only the puppy contact form sends these, and only when filled in
  phone?: string;
  address?: string;
  puppy?: string;
};

const failed = "We couldn't send your message just now. Please try again, or email us directly.";

// Saves an inquiry (the admin's inbox at /admin/inquiries) and emails it to the admin, both at once. Succeeds if either
// worked, so a message is never silently lost; each half logs its own failure.
// ponytail: no rate limit beyond each form's honeypot, so a bot that beats it also sends an email per submission. Add
// a rate limit or captcha if that ever happens.
export async function deliverInquiry(row: NewInquiry): Promise<{ ok: boolean; error?: string }> {
  const details = [
    ["Name", row.name],
    ["Email", row.email],
    ["Phone", row.phone],
    ["Puppy", row.puppy],
    ["Address", row.address],
  ]
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`);

  const db = createAnonClient();
  const [saved, mailed] = await Promise.all([
    (async () => {
      if (!db) return false;
      // no .select(): visitors may insert but never read `inquiries`
      const { error } = await db.from("inquiries").insert(row);
      if (error) console.error("inquiry: insert failed:", error.message);
      return !error;
    })(),
    sendAdminEmail({
      // the subject only ever carries a puppy name that was checked against the database, never raw visitor text
      subject: row.puppy ? `New inquiry about ${row.puppy}` : "New message from the website",
      text: `${details.join("\n")}\n\nMessage:\n${row.message}`,
      replyTo: { name: row.name.replace(/[\r\n]+/g, " "), address: row.email },
    }),
  ]);

  return saved || mailed ? { ok: true } : { ok: false, error: failed };
}
