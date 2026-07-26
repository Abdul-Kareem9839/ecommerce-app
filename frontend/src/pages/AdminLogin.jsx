import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

const AdminLogin = () => {
  const { login, error, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await login(email, password);
    if (ok) navigate("/admin");
  };

  return (
    <main className="mx-auto flex max-w-md flex-col items-center px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full rounded-xl2 bg-white p-8 shadow-card"
      >
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Lock size={20} />
          </div>
          <h1 className="font-display text-xl font-semibold">Admin Login</h1>
          <p className="mt-1 text-sm text-ink-soft">
            Sign in to manage products.
          </p>
        </div>

        {error && (
          <p className="mb-4 rounded-lg bg-sale/10 px-3 py-2 text-center text-sm text-sale">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full rounded-lg border border-ink/10 px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full rounded-lg border border-ink/10 px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-primary py-3 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </motion.div>
    </main>
  );
};

export default AdminLogin;
