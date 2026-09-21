import Link from "next/link";
import { pastEditions, site } from "@/lib/content";
import type { Edition } from "@/lib/types";
import { Container } from "./ui";

export function SiteFooter({ edition }: { edition: Edition }) {
  return (
    <footer className="bg-ink text-paper">
      <Container className="grid gap-12 py-16 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl font-semibold">
            Startup Weekend Savona
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/60">
            Learn, think and build like a startup. Un evento organizzato da{" "}
            <a
              href={site.organizerUrl}
              className="text-lime hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {site.organizer}
            </a>
            .
          </p>
        </div>
        <div>
          <p className="text-xs tracking-[0.22em] text-white/40 uppercase">
            Contatti
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-3 block text-sm hover:text-lime"
          >
            {site.email}
          </a>
          <div className="mt-4 flex gap-4 text-sm text-white/70">
            <a href={site.instagram} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
        <div>
          <p className="text-xs tracking-[0.22em] text-white/40 uppercase">
            Edizioni passate
          </p>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            {pastEditions.map((item) => (
              <Link key={item.year} href={item.slug} className="hover:text-lime">
                Edizione {item.year}
              </Link>
            ))}
            {!edition.isCurrent ? (
              <Link href="/" className="text-lime">
                Torna all’edizione 2026
              </Link>
            ) : null}
          </div>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. Powered by Techstars.</p>
          <p>{edition.venue}</p>
        </Container>
      </div>
    </footer>
  );
}
