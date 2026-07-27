import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { LogOut, Pencil, Plus, Trash2, MoreVertical } from "lucide-react";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";
import ProductFormModal from "../components/ProductFormModal.jsx";

const ActionDropdown = ({ product, onEdit, onDelete }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="rounded-full p-2 text-ink-soft transition hover:bg-surface-alt"
        aria-label="Actions"
      >
        <MoreVertical size={16} />
      </button>

      {open && (
        <div className="absolute right-0 z-10 mt-1 w-32 rounded-lg border border-ink/10 bg-white py-1 shadow-lg">
          <button
            onClick={() => {
              setOpen(false);
              onEdit(product);
            }}
            className="flex w-full items-center gap-2 px-3 py-2 text-xs font-medium text-ink-soft hover:bg-surface-alt hover:text-primary"
          >
            <Pencil size={14} /> Edit
          </button>
          <button
            onClick={() => {
              setOpen(false);
              onDelete(product._id);
            }}
            className="flex w-full items-center gap-2 px-3 py-2 text-xs font-medium text-sale hover:bg-sale/10"
          >
            <Trash2 size={14} /> Delete
          </button>
        </div>
      )}
    </div>
  );
};

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = () => {
    setLoading(true);
    api
      .get("/products")
      .then((res) => setProducts(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openAdd = () => {
    setEditingProduct(null);
    setModalOpen(true);
  };

  const openEdit = (product) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  const handleSubmit = async (form) => {
    if (editingProduct) {
      await api.put(`/products/${editingProduct._id}`, form);
    } else {
      await api.post("/products", form);
    }
    fetchProducts();
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    await api.delete(`/products/${id}`);
    fetchProducts();
  };

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-sm text-ink-soft">Signed in as {user?.email}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={openAdd}
            className="flex items-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
          >
            <Plus size={16} /> Add product
          </button>
          <button
            onClick={logout}
            className="flex items-center gap-1.5 rounded-full border border-ink/10 px-4 py-2.5 text-sm font-semibold text-ink-soft transition hover:bg-surface-alt"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl2 bg-white shadow-card">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-alt text-ink-soft">
            <tr>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-ink-soft">
                  Loading products...
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-ink-soft">
                  No products yet. Add your first one.
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <motion.tr
                  key={p._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-t border-ink/5"
                >
                  <td className="flex items-center gap-3 px-4 py-3">
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      className="h-10 w-10 rounded-lg object-cover"
                    />
                    <span className="line-clamp-1 font-medium">{p.name}</span>
                  </td>
                  <td className="px-4 py-3 text-ink-soft">{p.category}</td>
                  <td className="px-4 py-3 font-semibold">
                    ${p.price.toFixed(2)}
                  </td>
                  <td className="px-4 py-3">{p.stock}</td>
                  <td className="px-4 py-3 text-right">
                    {/* Desktop View */}
                    <div className="hidden justify-end gap-2 md:flex">
                      <button
                        onClick={() => openEdit(p)}
                        className="rounded-full p-2 text-ink-soft transition hover:bg-primary/10 hover:text-primary"
                        aria-label="Edit"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="rounded-full p-2 text-ink-soft transition hover:bg-sale/10 hover:text-sale"
                        aria-label="Delete"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    {/* Mobile View */}
                    <div className="md:hidden">
                      <ActionDropdown
                        product={p}
                        onEdit={openEdit}
                        onDelete={handleDelete}
                      />
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <ProductFormModal
          product={editingProduct}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </main>
  );
};

export default AdminDashboard;
