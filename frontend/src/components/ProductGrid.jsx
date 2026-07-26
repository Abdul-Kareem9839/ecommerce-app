import { AnimatePresence, motion } from "framer-motion";
import ProductCard from "./ProductCard.jsx";

const SkeletonCard = () => (
  <div className="animate-pulse overflow-hidden rounded-xl2 bg-white shadow-card">
    <div className="aspect-square bg-surface-alt" />
    <div className="space-y-2 p-4">
      <div className="h-4 w-3/4 rounded bg-surface-alt" />
      <div className="h-3 w-full rounded bg-surface-alt" />
      <div className="h-6 w-1/3 rounded bg-surface-alt" />
    </div>
  </div>
);

const ProductGrid = ({ products, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl2 bg-white/60 py-24 text-center shadow-card">
        <p className="font-display text-lg font-semibold text-ink">
          No products match your search
        </p>
        <p className="mt-1 text-sm text-ink-soft">
          Try adjusting your filters or search term.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      layout
      className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4"
    >
      <AnimatePresence>
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProductGrid;
