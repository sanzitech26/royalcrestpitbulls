import type { Ancestor } from "@/data/bloodlines";

function PedigreeNode({ name, sub }: { name: string; sub?: string }) {
  return (
    <div className="whitespace-nowrap rounded-lg border border-ink/10 bg-white px-3 py-2 shadow-sm">
      <p className="text-sm font-semibold text-ink">{name}</p>
      {sub && <p className="text-[11px] tracking-wide text-ink/50 uppercase">{sub}</p>}
    </div>
  );
}

export function PedigreeTree({
  node,
  sub,
  hasIncoming,
}: {
  node: Ancestor;
  sub?: string;
  hasIncoming?: boolean;
}) {
  return (
    <div className="relative flex items-center gap-6">
      {hasIncoming && (
        <span className="absolute top-1/2 -left-6 h-px w-6 -translate-y-1/2 bg-gold/30" />
      )}
      <PedigreeNode name={node.name} sub={sub} />
      {node.children && (
        <div className="relative flex flex-col justify-center gap-4 border-l-2 border-gold/30 pl-6">
          <span className="absolute top-1/2 -left-6 h-px w-6 -translate-y-1/2 bg-gold/30" />
          {node.children.map((child) => (
            <PedigreeTree key={child.name} node={child} hasIncoming />
          ))}
        </div>
      )}
    </div>
  );
}
