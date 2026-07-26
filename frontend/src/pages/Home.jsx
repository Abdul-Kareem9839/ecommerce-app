import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import api from "../api/axios.js";
import ProductGrid from "../components/ProductGrid.jsx";
import SearchFilterBar from "../components/SearchFilterBar.jsx";

const useDebounce = (value, delay = 350) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
};

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [sort, setSort] = useState("");

  const debouncedSearch = useDebounce(search);
  const debouncedMin = useDebounce(priceRange.min);
  const debouncedMax = useDebounce(priceRange.max);

  useEffect(() => {
    api.get("/products/categories").then((res) => setCategories(res.data));
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (debouncedSearch) params.search = debouncedSearch;
    if (category !== "all") params.category = category;
    if (debouncedMin) params.minPrice = debouncedMin;
    if (debouncedMax) params.maxPrice = debouncedMax;
    if (sort) params.sort = sort;

    api
      .get("/products", { params })
      .then((res) => setProducts(res.data))
      .finally(() => setLoading(false));
  }, [debouncedSearch, category, debouncedMin, debouncedMax, sort]);

  const clearFilters = () => {
    setSearch("");
    setCategory("all");
    setPriceRange({ min: "", max: "" });
    setSort("");
  };

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10"
      >
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Curated goods for everyday life
        </h1>
        <p className="mt-2 max-w-xl text-ink-soft">
          Search, filter, and shop {products.length ? `${products.length} ` : ""}
          products across every category — updated live.
        </p>
      </motion.div>

      <SearchFilterBar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        categories={categories}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        sort={sort}
        setSort={setSort}
        onClear={clearFilters}
      />

      <ProductGrid products={products} loading={loading} />
    </main>
  );
};

export default Home;
