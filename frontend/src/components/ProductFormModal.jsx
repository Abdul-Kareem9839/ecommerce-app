import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const emptyForm = {
  name: "",
  imageUrl: "",
  category: "",
  price: "",
  description: "",
  stock: "",
};

const ProductFormModal = ({ product, onClose, onSubmit }) => {
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        imageUrl: product.imageUrl,
        category: product.category,
        price: product.price,
        description: product.description,
        stock: product.stock,
      });
    } else {
      setForm(emptyForm);
    }
  }, [product]);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await onSubmit({
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      });
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save product");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-lg rounded-xl2 bg-white p-6 shadow-2xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold">
            {product ? "Edit Product" : "Add Product"}
          </h3>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 transition hover:bg-surface-alt"
          >
            <X size={18} />
          </button>
        </div>

        {error && (
          <p className="mb-3 rounded-lg bg-sale/10 px-3 py-2 text-sm text-sale">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Product name"
            required
            className="w-full rounded-lg border border-ink/10 px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          <input
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="Image URL"
            required
            className="w-full rounded-lg border border-ink/10 px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="Category"
              required
              className="w-full rounded-lg border border-ink/10 px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <input
              name="price"
              type="number"
              step="0.01"
              min="0"
              value={form.price}
              onChange={handleChange}
              placeholder="Price"
              required
              className="w-full rounded-lg border border-ink/10 px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <input
            name="stock"
            type="number"
            min="0"
            value={form.stock}
            onChange={handleChange}
            placeholder="Stock count"
            required
            className="w-full rounded-lg border border-ink/10 px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            required
            rows={3}
            className="w-full rounded-lg border border-ink/10 px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-full bg-primary py-3 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:opacity-60"
          >
            {saving ? "Saving..." : product ? "Save changes" : "Add product"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ProductFormModal;
