const stats = [
  { value: "100+", label: "Happy Families" },
  { value: "5+ Years", label: "Breeding Experience" },
  { value: "Health Guarantee", label: "On All Puppies" },
  { value: "Lifetime Support", label: "For Our Families" },
];

export function StatsBar() {
  return (
    <div className="bg-charcoal">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-y divide-white/10 px-6 py-10 sm:grid-cols-4 sm:divide-x sm:divide-y-0">
        {stats.map(({ value, label }) => (
          <div key={label} className="px-4 py-4 text-center sm:py-0">
            <p className="font-display text-2xl font-bold text-gold sm:text-3xl">
              {value}
            </p>
            <p className="mt-1 text-sm text-white/70">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
