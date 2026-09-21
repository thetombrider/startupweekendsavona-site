import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-ink px-6 text-center text-paper">
      <div>
        <p className="text-xs tracking-[0.28em] text-lime uppercase">404</p>
        <h1 className="font-display mt-4 text-4xl font-semibold">
          Questa pagina non esiste.
        </h1>
        <p className="mt-3 text-white/60">
          Torna all’edizione 2026 di Startup Weekend Savona.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-lime px-6 py-3 text-sm font-semibold text-ink"
        >
          Vai alla home
        </Link>
      </div>
    </main>
  );
}
