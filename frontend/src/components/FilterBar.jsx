import { Search, SlidersHorizontal, X } from "lucide-react";

// Styled native <select> so the filter dropdowns inherit the tactical theme
// without pulling in a dependency.
function Select({ label, value, onChange, options }) {
  return (
    <div className="relative">
      <label className="label-mono absolute -top-2 left-3 z-10 bg-ink-900 px-1.5 text-amber/70">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 cursor-pointer appearance-none rounded-md border border-ink-700 bg-ink-850 pl-4 pr-9 font-mono text-sm text-ink-100 outline-none transition focus:border-amber/60 focus:ring-1 focus:ring-amber/40"
      >
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-ink-850">
            {opt}
          </option>
        ))}
      </select>
      <SlidersHorizontal
        size={14}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-400"
      />
    </div>
  );
}

export default function FilterBar({
  search,
  onSearch,
  variant,
  onVariant,
  era,
  onEra,
  variants,
  eras,
  resultCount,
}) {
  const hasActiveFilters = search || variant !== "All" || era !== "All";

  return (
    <div className="mx-auto max-w-7xl px-5 pb-2 pt-8 sm:px-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Search */}
        <div className="relative flex-1 lg:max-w-md">
          <Search
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search designation, armament, variant…"
            className="h-12 w-full rounded-md border border-ink-700 bg-ink-850 pl-12 pr-10 font-mono text-sm text-ink-100 placeholder:text-ink-500 outline-none transition focus:border-amber/60 focus:ring-1 focus:ring-amber/40"
          />
          {search && (
            <button
              onClick={() => onSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 transition hover:text-ink-100"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4">
          <Select label="Variant" value={variant} onChange={onVariant} options={["All", ...variants]} />
          <Select label="Era" value={era} onChange={onEra} options={["All", ...eras]} />

          {hasActiveFilters && (
            <button
              onClick={() => {
                onSearch("");
                onVariant("All");
                onEra("All");
              }}
              className="flex h-11 items-center gap-1.5 rounded-md border border-ink-700 px-3 font-mono text-xs uppercase tracking-wide text-ink-300 transition hover:border-alert/50 hover:text-alert"
            >
              <X size={14} /> Reset
            </button>
          )}
        </div>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <span className="label-mono text-ink-400">
          {resultCount} {resultCount === 1 ? "Record" : "Records"}
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-ink-700 to-transparent" />
      </div>
    </div>
  );
}
