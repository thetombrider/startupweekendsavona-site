"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { pastEditions, site } from "@/lib/content";
import type { Edition } from "@/lib/types";
import { ArrowIcon, ButtonLink } from "./ui";
import { cn } from "@/lib/utils";

export function SiteHeader({ edition }: { edition: Edition }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [editionsOpen, setEditionsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    { href: `${edition.slug === "/" ? "" : edition.slug}#about`, label: "L’evento" },
    { href: `${edition.slug === "/" ? "" : edition.slug}#agenda`, label: "Agenda" },
    { href: `${edition.slug === "/" ? "" : edition.slug}#people`, label: "Mentors" },
    { href: `${edition.slug === "/" ? "" : edition.slug}#premi`, label: "Premi" },
    { href: `${edition.slug === "/" ? "" : edition.slug}#faq`, label: "FAQ" },
  ];

  const ctaHref = edition.isCurrent ? edition.ticketUrl! : "/";
  const ctaLabel = edition.isCurrent ? "Biglietti" : "Edizione 2026";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "bg-ink/90 shadow-lg shadow-black/20 backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:h-[4.5rem] sm:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-3 text-paper">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-lime text-ink">
            <span className="font-display text-[11px] font-bold leading-none tracking-tight">
              SW
            </span>
          </span>
          <span className="leading-none">
            <span className="block font-display text-[12px] font-semibold tracking-[0.12em] whitespace-nowrap uppercase">
              Startup Weekend
            </span>
            <span className="mt-1 block text-[10px] tracking-[0.28em] text-white/60 uppercase">
              Savona
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm text-white/75 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-lime"
            >
              {link.label}
            </a>
          ))}
          <div
            className="relative"
            onMouseEnter={() => setEditionsOpen(true)}
            onMouseLeave={() => setEditionsOpen(false)}
          >
            <button className="transition-colors hover:text-lime">
              Edizioni
            </button>
            {editionsOpen ? (
              <div className="absolute top-full right-0 pt-3">
                <div className="min-w-44 rounded-2xl border border-white/10 bg-ink-soft p-2 shadow-2xl">
                  <Link
                    href="/"
                    className="block rounded-xl px-3 py-2 text-paper hover:bg-white/5"
                  >
                    2026 · in corso
                  </Link>
                  {pastEditions.map((item) => (
                    <Link
                      key={item.year}
                      href={item.slug}
                      className="block rounded-xl px-3 py-2 text-white/70 hover:bg-white/5 hover:text-paper"
                    >
                      {item.year}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </nav>

        <div className="flex items-center gap-3">
          <ButtonLink
            href={ctaHref}
            variant="lime"
            className="hidden !px-5 !py-2 sm:inline-flex"
            external={edition.isCurrent}
          >
            {ctaLabel}
            <ArrowIcon />
          </ButtonLink>
          <button
            className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-paper lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Apri menu"
          >
            <span className="sr-only">Menu</span>
            <div className="space-y-1.5">
              <span
                className={cn(
                  "block h-px w-4 bg-current transition",
                  open && "translate-y-1 rotate-45",
                )}
              />
              <span
                className={cn(
                  "block h-px w-4 bg-current transition",
                  open && "-translate-y-1 -rotate-45",
                )}
              />
            </div>
          </button>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-white/10 bg-ink px-5 py-8 lg:hidden">
          <div className="flex flex-col gap-5 text-paper">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-display text-2xl"
              >
                {link.label}
              </a>
            ))}
            <p className="pt-2 text-xs tracking-[0.2em] text-white/40 uppercase">
              Edizioni passate
            </p>
            {pastEditions.map((item) => (
              <Link key={item.year} href={item.slug} onClick={() => setOpen(false)}>
                Edizione {item.year}
              </Link>
            ))}
            <ButtonLink
              href={ctaHref}
              variant="lime"
              className="mt-2"
              external={edition.isCurrent}
            >
              {ctaLabel}
            </ButtonLink>
            <p className="text-xs text-white/40">{site.email}</p>
          </div>
        </div>
      ) : null}
    </header>
  );
}
