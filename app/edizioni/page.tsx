import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ArrowIcon, Container } from "@/components/ui";
import { edition2026, pastEditions } from "@/lib/content";

export const metadata: Metadata = {
  title: "Edizioni passate",
  description:
    "Archivio di Startup Weekend Savona: giuria, mentori, premi, agenda e sponsor delle edizioni 2025 e 2024.",
};

export default function EditionsIndexPage() {
  return (
    <>
      <SiteHeader edition={edition2026} />
      <main className="bg-paper pt-28 pb-24">
        <Container>
          <p className="text-xs tracking-[0.28em] text-blue uppercase">Archivio</p>
          <h1 className="font-display mt-3 max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
            Edizioni passate
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted">
            Stessa struttura dell’edizione in corso: agenda, giuria, mentors,
            premi, sponsor e FAQ, con tutti i nomi e i materiali di allora.
          </p>

          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            {pastEditions.map((edition) => (
              <Link
                key={edition.year}
                href={edition.slug}
                className="group overflow-hidden rounded-[1.75rem] border border-line bg-white transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="relative aspect-[16/9]">
                  <Image
                    src={edition.heroImage}
                    alt={`Startup Weekend Savona ${edition.year}`}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
                  <p className="absolute bottom-4 left-5 font-display text-3xl font-semibold text-white">
                    {edition.year}
                  </p>
                </div>
                <div className="p-6 sm:p-8">
                  <p className="text-xs tracking-[0.22em] text-blue uppercase">
                    {edition.datesLabel}
                  </p>
                  <h2 className="font-display mt-2 text-2xl font-semibold tracking-tight">
                    {edition.headline}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {edition.recap}
                  </p>
                  <p className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue">
                    Vedi giuria, mentors e premi
                    <ArrowIcon />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </main>
      <SiteFooter edition={edition2026} />
    </>
  );
}
