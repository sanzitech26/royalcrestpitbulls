import Link from "next/link";
import { cardClasses } from "@/components/admin/fields";
import { PageHeader } from "@/components/admin/page-header";
import { requireAdmin } from "@/lib/admin/auth";
import { formatDate } from "@/lib/admin/format";

export default async function SignaturesPage() {
  const { supabase } = await requireAdmin();

  // no `signature` column here: each drawn signature is up to 150 KB, so it's only loaded on the detail page
  const { data, error } = await supabase
    .from("contract_signatures")
    .select("id, created_at, full_name, puppy, email, phone, policy_version")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-8">
      <PageHeader
        title="Contract signatures"
        description="Everyone who has signed the Return & Refund Policy on the website. These are records, so they can be viewed and printed but not edited or deleted."
      />

      {error && (
        <p role="alert" className="rounded-lg bg-red-50 p-4 text-sm font-medium text-red-700">
          Couldn&rsquo;t load signatures: {error.message}
        </p>
      )}

      <div className={`${cardClasses} overflow-x-auto p-0 sm:p-0`}>
        <table className="w-full min-w-160 text-left text-sm">
          <thead className="border-b border-ink/10 text-xs tracking-wide text-ink/60 uppercase">
            <tr>
              <th className="px-5 py-3 font-semibold">Signed</th>
              <th className="px-5 py-3 font-semibold">Name</th>
              <th className="px-5 py-3 font-semibold">Puppy</th>
              <th className="px-5 py-3 font-semibold">Contact</th>
              <th className="px-5 py-3 font-semibold">Policy</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/10">
            {data?.map((row) => (
              <tr key={row.id}>
                <td className="px-5 py-3 whitespace-nowrap text-ink/70">{formatDate(row.created_at)}</td>
                <td className="px-5 py-3 font-semibold text-ink">{row.full_name}</td>
                <td className="px-5 py-3 text-ink/80">{row.puppy}</td>
                <td className="px-5 py-3 text-ink/70">
                  <div>{row.email}</div>
                  <div className="text-xs">{row.phone}</div>
                </td>
                <td className="px-5 py-3 text-ink/70">{row.policy_version}</td>
                <td className="px-5 py-3 text-right">
                  <Link
                    href={`/admin/signatures/${row.id}`}
                    className="font-medium text-gold hover:text-gold-light"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
            {!data?.length && (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-ink/60">
                  No contracts have been signed yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
