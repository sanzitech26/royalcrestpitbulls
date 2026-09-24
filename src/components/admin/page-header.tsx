export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">{title}</h1>
        {description && <p className="mt-2 max-w-2xl text-ink/70">{description}</p>}
        <span className="mt-4 block h-0.5 w-16 rounded-full bg-gold" />
      </div>
      {action}
    </header>
  );
}
