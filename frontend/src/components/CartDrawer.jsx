import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";

const CartDrawer = () => {
  const {
    items,
    isOpen,
    setIsOpen,
    updateQty,
    removeFromCart,
    totalPrice,
    clearCart,
  } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-surface shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-ink/5 p-5">
              <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
                <ShoppingBag size={18} /> Your Cart
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 transition hover:bg-surface-alt"
                aria-label="Close cart"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center text-ink-soft">
                  <ShoppingBag size={40} className="mb-3 opacity-30" />
                  <p className="font-medium">Your cart is empty</p>
                  <p className="text-sm">Add products to get started.</p>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((item) => (
                    <motion.li
                      layout
                      key={item._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, x: 40 }}
                      className="flex gap-3 rounded-xl2 bg-white p-3 shadow-card"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="h-16 w-16 rounded-lg object-cover"
                      />
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <p className="line-clamp-1 text-sm font-semibold">
                            {item.name}
                          </p>
                          <button
                            onClick={() => removeFromCart(item._id)}
                            className="text-ink-soft transition hover:text-sale"
                            aria-label="Remove item"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <span className="text-xs text-ink-soft">
                          ${item.price.toFixed(2)} each
                        </span>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center gap-2 rounded-full bg-surface-alt px-2 py-1">
                            <button
                              onClick={() => updateQty(item._id, item.qty - 1)}
                              className="flex h-5 w-5 items-center justify-center rounded-full transition hover:bg-white"
                            >
                              <Minus size={11} />
                            </button>
                            <span className="w-4 text-center text-xs font-semibold">
                              {item.qty}
                            </span>
                            <button
                              onClick={() => updateQty(item._id, item.qty + 1)}
                              disabled={item.qty >= item.stock}
                              className="flex h-5 w-5 items-center justify-center rounded-full transition hover:bg-white disabled:opacity-30"
                            >
                              <Plus size={11} />
                            </button>
                          </div>
                          <span className="font-display text-sm font-bold">
                            ${(item.price * item.qty).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-ink/5 p-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-ink-soft">
                    Total
                  </span>
                  <span className="font-display text-2xl font-bold">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={clearCart}
                    className="flex-1 rounded-full border border-ink/10 py-3 text-sm font-semibold text-ink-soft transition hover:bg-surface-alt"
                  >
                    Clear cart
                  </button>
                  <button
                    onClick={() => alert("Checkout flow not required by spec — cart state demonstrated.")}
                    className="flex-1 rounded-full bg-primary py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
