import { redirect } from "next/navigation";
import { AdminForm } from "@/components/admin/admin-form";
import { Field, fieldClasses } from "@/components/admin/fields";
import { Logo } from "@/components/layout/logo";
import { Eyebrow } from "@/components/ui/eyebrow";
import { createServerSupabase } from "@/lib/supabase/server";
import { login } from "./actions";

export default async function LoginPage(props: PageProps<"/admin/login">) {
  const { error } = await props.searchParams;

  // already signed in as an admin: skip the form
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user && (await supabase.rpc("is_admin")).data) redirect("/admin");

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4 py-12">
      <div className="w-full max-w-md">
        <Logo href="/" className="justify-center" />

        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <Eyebrow>Admin</Eyebrow>
          <h1 className="mt-2 font-display text-3xl font-bold text-ink">Sign in</h1>
          <p className="mt-2 text-sm text-ink/70">Manage puppies, reviews, FAQs and messages.</p>

          {error === "denied" && (
            <p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm font-medium text-red-700">
              That account doesn&rsquo;t have admin access. Sign in with a different account.
            </p>
          )}

          <AdminForm action={login} submitLabel="Sign in" className="mt-6">
            <Field label="Email">
              <input name="email" type="email" required autoComplete="email" className={fieldClasses} />
            </Field>
            <Field label="Password">
              <input
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className={fieldClasses}
              />
            </Field>
          </AdminForm>
        </div>
      </div>
    </div>
  );
}
