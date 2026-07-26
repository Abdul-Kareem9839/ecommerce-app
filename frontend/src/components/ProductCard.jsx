import { motion } from "framer-motion";
import { Plus, Check } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext.jsx";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const outOfStock = product.stock <= 0;

  const handleAdd = () => {
    if (outOfStock) return;
    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
      className="group relative flex flex-col overflow-hidden rounded-xl2 bg-white shadow-card transition-shadow hover:shadow-card-hover"
    >
      <div className="relative aspect-square overflow-hidden bg-surface-alt">
        <img
          src={product.imageUrl}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary-dark backdrop-blur">
          {product.category}
        </span>
        {outOfStock && (
          <span className="absolute inset-0 flex items-center justify-center bg-ink/50 text-sm font-semibold text-white backdrop-blur-sm">
            Out of stock
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="line-clamp-2 font-display text-base font-semibold leading-snug text-ink">
          {product.name}
        </h3>
        <p className="line-clamp-2 text-sm text-ink-soft">
          {product.description}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <span className="font-display text-lg font-bold text-ink">
            ${product.price.toFixed(2)}
          </span>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleAdd}
            disabled={outOfStock}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:bg-ink/20"
            aria-label="Add to cart"
          >
            {justAdded ? <Check size={16} /> : <Plus size={16} />}
          </motion.button>
        </div>
        {product.stock > 0 && product.stock <= 5 && (
          <span className="text-xs font-medium text-sale">
            Only {product.stock} left
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;
