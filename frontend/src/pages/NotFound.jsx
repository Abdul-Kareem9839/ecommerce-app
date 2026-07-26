import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="mx-auto flex max-w-3xl flex-col items-center justify-center px-6 py-24 text-center">
      <div className="rounded-3xl border border-ink/10 bg-white p-10 shadow-card">
        <p className="text-sm uppercase tracking-[0.3em] text-ink-soft">404</p>
        <h1 className="mt-4 text-4xl font-semibold">Page not found</h1>
        <p className="mt-3 text-sm text-ink-soft">
          Sorry, we couldn’t find the page you were looking for.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
