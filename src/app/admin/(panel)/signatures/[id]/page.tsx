import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { cardClasses } from "@/components/admin/fields";
import { PageHeader } from "@/components/admin/page-header";
import { PrintButton } from "@/components/admin/print-button";
import { requireAdmin } from "@/lib/admin/auth";
import { formatDate } from "@/lib/admin/format";

export default async function SignaturePage(props: PageProps<"/admin/signatures/[id]">) {
  const { id } = await props.params;
  const { supabase } = await requireAdmin();

  const { data: row } = await supabase.from("contract_signatures").select("*").eq("id", id).maybeSingle();
  if (!row) notFound();

  const details = [
    ["Signed on", formatDate(row.created_at)],
    ["Full name", row.full_name],
    ["Puppy", row.puppy],
    ["Email", row.email],
    ["Phone", row.phone],
    ["Delivery address", row.delivery_address],
    ["Policy version", row.policy_version],
    ["Agreed to the policy", row.accepted ? "Yes" : "No"],
  ];

  return (
    <div className="space-y-8">
      <Link
        href="/admin/signatures"
        className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold-light print:hidden"
      >
        <ArrowLeft className="size-4" />
        All signatures
      </Link>

      <div className="print:hidden">
        <PageHeader title={row.full_name} description={`Signed the Return & Refund Policy for ${row.puppy}.`} action={<PrintButton />} />
      </div>
      <h1 className="hidden font-display text-2xl font-bold print:block">
        RoyalCrest Pitbulls &mdash; Signed Return &amp; Refund Policy
      </h1>

      <div className={`${cardClasses} max-w-3xl print:p-0 print:shadow-none`}>
        <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
          {details.map(([label, value]) => (
            <div key={label}>
              <dt className="text-xs tracking-wide text-ink/50 uppercase">{label}</dt>
              <dd className="mt-0.5 text-sm font-semibold break-words text-ink">{value}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-8 text-xs tracking-wide text-ink/50 uppercase">Signature</p>
        <div className="relative mt-2 h-40 overflow-hidden rounded-lg border border-ink/15 bg-white">
          <Image src={row.signature} alt={`Signature of ${row.full_name}`} fill unoptimized className="object-contain" />
        </div>
      </div>
    </div>
  );
}
