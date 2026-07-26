import { Search, SlidersHorizontal, X } from "lucide-react";
import { motion } from "framer-motion";

const SearchFilterBar = ({
  search,
  setSearch,
  category,
  setCategory,
  categories,
  priceRange,
  setPriceRange,
  sort,
  setSort,
  onClear,
}) => {
  const hasActiveFilters =
    search || category !== "all" || priceRange.min || priceRange.max;

  return (
    <div className="mb-8 flex flex-col gap-4 rounded-xl2 bg-white p-4 shadow-card sm:flex-row sm:flex-wrap sm:items-center">
      <div className="relative flex-1 min-w-[200px]">
        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full rounded-full border border-ink/10 bg-surface py-2.5 pl-9 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="rounded-full border border-ink/10 bg-surface px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
      >
        <option value="all">All categories</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <div className="flex items-center gap-2">
        <SlidersHorizontal size={14} className="text-ink-soft" />
        <input
          type="number"
          min="0"
          value={priceRange.min}
          onChange={(e) =>
            setPriceRange((p) => ({ ...p, min: e.target.value }))
          }
          placeholder="Min $"
          className="w-20 rounded-full border border-ink/10 bg-surface px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
        <span className="text-ink-soft">–</span>
        <input
          type="number"
          min="0"
          value={priceRange.max}
          onChange={(e) =>
            setPriceRange((p) => ({ ...p, max: e.target.value }))
          }
          placeholder="Max $"
          className="w-20 rounded-full border border-ink/10 bg-surface px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="rounded-full border border-ink/10 bg-surface px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
      >
        <option value="">Sort: Newest</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
        <option value="name_asc">Name: A–Z</option>
      </select>

      {hasActiveFilters && (
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onClear}
          className="flex items-center gap-1 rounded-full bg-surface-alt px-3 py-2.5 text-sm font-medium text-primary-dark transition hover:bg-primary/10"
        >
          <X size={14} /> Clear
        </motion.button>
      )}
    </div>
  );
};

export default SearchFilterBar;
