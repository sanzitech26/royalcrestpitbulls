import nodemailer from "nodemailer";

// Emails the site admin over SMTP (Gmail unless SMTP_HOST says otherwise). Server-only: the credentials are plain env
// vars, never NEXT_PUBLIC_. Logs and returns false instead of throwing, so a mail problem never breaks a form.
export async function sendAdminEmail({
  subject,
  text,
  replyTo,
}: {
  subject: string;
  text: string;
  replyTo: { name: string; address: string };
}): Promise<boolean> {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) {
    console.error("email: SMTP_USER / SMTP_PASS are not set");
    return false;
  }

  const port = Number(process.env.SMTP_PORT) || 465;
  const timeout = 10_000; // a stuck mail server must not leave the visitor staring at a spinner
  try {
    await nodemailer
      .createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port,
        secure: port === 465,
        auth: { user, pass },
        connectionTimeout: timeout,
        greetingTimeout: timeout,
        socketTimeout: timeout,
      })
      .sendMail({
        from: `"RoyalCrest Pitbulls website" <${user}>`,
        to: process.env.INQUIRY_TO_EMAIL || user,
        replyTo,
        subject,
        text,
      });
    return true;
  } catch (e) {
    console.error("email: send failed:", e instanceof Error ? e.message : e);
    return false;
  }
}
