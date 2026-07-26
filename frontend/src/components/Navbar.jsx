import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShoppingBag, Sparkles } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";

const Navbar = () => {
  const { totalItems, setIsOpen } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-ink/5 bg-surface/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl2 bg-gradient-to-br from-primary to-accent">
            <Sparkles size={18} className="text-white" strokeWidth={2.5} />
          </div>
          <span className="font-display text-xl font-semibold tracking-tight">
            Aurora
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-ink-soft md:flex">
          <Link to="/" className="transition hover:text-ink">
            Shop
          </Link>
          <Link to="/admin" className="transition hover:text-ink">
            Admin
          </Link>
        </nav>

        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => setIsOpen(true)}
          className="relative flex h-10 w-10 items-center justify-center rounded-full bg-ink text-surface transition hover:bg-primary"
          aria-label="Open cart"
        >
          <ShoppingBag size={18} />
          {totalItems > 0 && (
            <motion.span
              key={totalItems}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-sale px-1 text-[11px] font-bold text-white"
            >
              {totalItems}
            </motion.span>
          )}
        </motion.button>
      </div>
    </header>
  );
};

export default Navbar;
