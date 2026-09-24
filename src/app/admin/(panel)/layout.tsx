import { AdminShell } from "@/components/admin/admin-shell";
import { requireAdmin } from "@/lib/admin/auth";

export default async function PanelLayout({ children }: LayoutProps<"/admin">) {
  const { supabase, user } = await requireAdmin();
  const { count } = await supabase
    .from("inquiries")
    .select("*", { count: "exact", head: true })
    .eq("status", "new");

  return (
    <AdminShell email={user.email} newInquiries={count ?? 0}>
      {children}
    </AdminShell>
  );
}
