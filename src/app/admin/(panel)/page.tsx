import Link from "next/link";
import { Inbox, PawPrint, Signature, type LucideIcon } from "lucide-react";
import { cardClasses, Pill } from "@/components/admin/fields";
import { PageHeader } from "@/components/admin/page-header";
import { IconCircle } from "@/components/ui/icon-circle";
import { inquirySubjects } from "@/data/inquiries";
import { requireAdmin } from "@/lib/admin/auth";
import { formatDate } from "@/lib/admin/format";

const count = { count: "exact", head: true } as const;

function Stat({ icon, label, value, href }: { icon: LucideIcon; label: string; value: number; href: string }) {
  return (
    <Link href={href} className={`${cardClasses} flex items-center gap-4 transition-shadow hover:shadow-md`}>
      <IconCircle icon={icon} />
      <div>
        <p className="font-display text-3xl font-bold text-ink">{value}</p>
        <p className="text-sm text-ink/60">{label}</p>
      </div>
    </Link>
  );
}

export default async function DashboardPage() {
  const { supabase } = await requireAdmin();

  const [newInquiries, available, reserved, signatures, latestInquiries, latestSignatures] = await Promise.all([
    supabase.from("inquiries").select("*", count).eq("status", "new"),
    supabase.from("puppies").select("*", count).eq("status", "available"),
    supabase.from("puppies").select("*", count).eq("status", "reserved"),
    supabase.from("contract_signatures").select("*", count),
    supabase
      .from("inquiries")
      .select("id, name, subject, status, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("contract_signatures")
      .select("id, full_name, puppy, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const problem = [newInquiries, available, reserved, signatures, latestInquiries, latestSignatures].find(
    (result) => result.error
  )?.error;

  return (
    <div className="space-y-8">
      <PageHeader title="Dashboard" description="What needs your attention on the website." />

      {problem && (
        <p role="alert" className="rounded-lg bg-red-50 p-4 text-sm font-medium text-red-700">
          Some data couldn&rsquo;t be loaded: {problem.message}. If this is a new setup, check that both SQL migrations
          in <code>supabase/migrations</code> have been run.
        </p>
      )}

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <Stat icon={Inbox} label="New inquiries" value={newInquiries.count ?? 0} href="/admin/inquiries?status=new" />
        <Stat icon={PawPrint} label="Puppies available" value={available.count ?? 0} href="/admin/puppies" />
        <Stat icon={PawPrint} label="Puppies reserved" value={reserved.count ?? 0} href="/admin/puppies" />
        <Stat icon={Signature} label="Signed contracts" value={signatures.count ?? 0} href="/admin/signatures" />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className={cardClasses}>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold tracking-wide text-ink uppercase">Latest inquiries</h2>
            <Link href="/admin/inquiries" className="text-sm font-medium text-gold hover:text-gold-light">
              View all
            </Link>
          </div>
          <ul className="mt-3 divide-y divide-ink/10">
            {latestInquiries.data?.map((inquiry) => (
              <li key={inquiry.id} className="flex items-center justify-between gap-3 py-3 text-sm">
                <div className="min-w-0">
                  <p className="truncate font-semibold text-ink">{inquiry.name}</p>
                  <p className="text-xs text-ink/60">
                    {inquirySubjects.find((s) => s.value === inquiry.subject)?.label ?? inquiry.subject} &middot;{" "}
                    {formatDate(inquiry.created_at)}
                  </p>
                </div>
                <Pill tone={inquiry.status === "new" ? "gold" : "gray"}>
                  {inquiry.status === "new" ? "New" : "Handled"}
                </Pill>
              </li>
            ))}
            {!latestInquiries.data?.length && <li className="py-3 text-sm text-ink/60">No messages yet.</li>}
          </ul>
        </section>

        <section className={cardClasses}>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold tracking-wide text-ink uppercase">Latest signed contracts</h2>
            <Link href="/admin/signatures" className="text-sm font-medium text-gold hover:text-gold-light">
              View all
            </Link>
          </div>
          <ul className="mt-3 divide-y divide-ink/10">
            {latestSignatures.data?.map((row) => (
              <li key={row.id}>
                <Link
                  href={`/admin/signatures/${row.id}`}
                  className="flex items-center justify-between gap-3 py-3 text-sm hover:text-gold"
                >
                  <span className="min-w-0 truncate font-semibold text-ink">{row.full_name}</span>
                  <span className="shrink-0 text-xs text-ink/60">
                    {row.puppy} &middot; {formatDate(row.created_at)}
                  </span>
                </Link>
              </li>
            ))}
            {!latestSignatures.data?.length && <li className="py-3 text-sm text-ink/60">No contracts signed yet.</li>}
          </ul>
        </section>
      </div>
    </div>
  );
}
