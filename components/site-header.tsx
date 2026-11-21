"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { pastEditions, site } from "@/lib/content";
import type { Edition } from "@/lib/types";
import { Logo } from "./logo";
import { ArrowIcon, ButtonLink } from "./ui";
import { TICKET_DISCOUNT_SHORT_LABEL, TICKET_INTEREST_HREF } from "@/lib/ticket-interest";
import { cn } from "@/lib/utils";

export function SiteHeader({
  edition,
  overlay = false,
}: {
  edition: Edition;
  overlay?: boolean;
}) {
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
    { href: `${edition.slug === "/" ? "" : edition.slug}#people`, label: "Mentor" },
    { href: `${edition.slug === "/" ? "" : edition.slug}#premi`, label: "Premi" },
    { href: `${edition.slug === "/" ? "" : edition.slug}#faq`, label: "FAQ" },
    ...(edition.isCurrent && edition.tickets
      ? [{ href: "#biglietti", label: "Prezzi" }]
      : []),
  ];

  const onLight = overlay && !scrolled && !open;
  const ctaHref = edition.isCurrent ? TICKET_INTEREST_HREF : "/";
  const ctaLabel = edition.isCurrent ? TICKET_DISCOUNT_SHORT_LABEL : "Edizione 2026";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        onLight
          ? "bg-transparent"
          : "bg-ink/95 shadow-lg shadow-black/20 backdrop-blur-xl",
      )}
    >
      <div className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between px-5 sm:h-20 sm:px-8">
        <Logo
          className="h-10 w-auto sm:h-12"
          priority
          tone={onLight ? "dark" : "light"}
        />

        <nav
          className={cn(
            "hidden items-center gap-7 text-sm lg:flex",
            onLight ? "text-ink/75" : "text-white/75",
          )}
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-blue"
            >
              {link.label}
            </a>
          ))}
          <div
            className="relative"
            onMouseEnter={() => setEditionsOpen(true)}
            onMouseLeave={() => setEditionsOpen(false)}
          >
            <Link
              href="/edizioni"
              className="transition-colors hover:text-blue"
            >
              Edizioni
            </Link>
            {editionsOpen ? (
              <div className="absolute top-full right-0 pt-3">
                <div className="min-w-44 rounded-2xl border border-white/10 bg-ink p-2 shadow-2xl">
                  <Link
                    href="/edizioni"
                    className="block rounded-xl px-3 py-2 text-paper hover:bg-white/5"
                  >
                    Tutte le edizioni
                  </Link>
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
            variant="accent"
            className="min-h-10 shrink-0 whitespace-nowrap !px-3 !py-1.5 !text-xs !leading-tight !text-ink lg:min-h-0 lg:!px-4 lg:!py-2 lg:!text-sm"
            trackEvent={edition.isCurrent ? "ticket-interest-link" : undefined}
            trackPosition="header"
          >
            {edition.isCurrent ? (
              <>
                <span className="lg:hidden">Compra −10%</span>
                <span className="hidden lg:inline">{ctaLabel}</span>
              </>
            ) : ctaLabel}
            <ArrowIcon className="hidden shrink-0 lg:block" />
          </ButtonLink>
          <button
            className={cn(
              "grid h-10 w-10 place-items-center rounded-full border lg:hidden",
              onLight
                ? "border-ink/15 text-ink"
                : "border-white/15 text-paper",
            )}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Chiudi menu" : "Apri menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
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
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full z-40 h-[calc(100dvh-4.25rem)] overflow-y-auto border-t border-white/10 bg-ink px-5 py-8 sm:h-[calc(100dvh-5rem)] lg:hidden"
        >
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
            <Link href="/edizioni" onClick={() => setOpen(false)}>
              Tutte le edizioni
            </Link>
            {pastEditions.map((item) => (
              <Link key={item.year} href={item.slug} onClick={() => setOpen(false)}>
                Edizione {item.year}
              </Link>
            ))}
            <a
              href={ctaHref}
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-blue px-6 py-3 text-sm font-semibold tracking-wide text-ink hover:bg-blue-deep"
              data-umami-event={edition.isCurrent ? "ticket-interest-link" : undefined}
              data-umami-event-position="mobile-menu"
            >
              {ctaLabel}
              <ArrowIcon />
            </a>
            <p className="text-xs text-white/40">{site.email}</p>
          </div>
        </div>
      ) : null}
    </header>
  );
}
