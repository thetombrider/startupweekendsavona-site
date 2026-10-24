"use client";

import { useEffect, useState, type ReactNode } from "react";
import { ticketIncludes } from "@/lib/content";
import {
  formatPrice,
  formatTierDate,
  formatTierTime,
  formatTimeLeft,
  getTicketState,
  TICKET_EVENT,
  type TierView,
} from "@/lib/tickets";
import type { TicketTier } from "@/lib/types";
import { useNow } from "@/lib/use-now";
import { cn } from "@/lib/utils";
import { Countdown } from "./countdown";
import { ArrowIcon, ButtonLink } from "./ui";

function useTicketState(tiers: TicketTier[], fallbackNow: number) {
  const now = useNow() || fallbackNow;
  return { now, ...getTicketState(tiers, now) };
}

export function TicketTiers({
  tiers,
  ticketUrl,
  fallbackNow,
}: {
  tiers: TicketTier[];
  ticketUrl: string;
  fallbackNow: number;
}) {
  const {
    now,
    tiers: visible,
    current,
    next,
    nextFollowsCurrent,
    totalSeats,
  } = useTicketState(tiers, fallbackNow);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
      <div className="rounded-[2rem] bg-ink p-6 text-paper sm:p-10">
        {current ? (
          <>
            <p className="inline-flex items-center gap-2 text-xs tracking-[0.24em] text-blue uppercase">
              <span className="h-2 w-2 animate-pulse rounded-full bg-blue" />
              In vendita ora · {current.name}
            </p>
            <div className="mt-5 flex flex-wrap items-end gap-x-4 gap-y-2">
              <p className="font-display text-6xl font-semibold tracking-tight sm:text-7xl">
                {formatPrice(current.price)}
              </p>
              {next && nextFollowsCurrent ? (
                <p className="pb-2 text-lg text-white/50 line-through decoration-blue/70">
                  {formatPrice(next.price)}
                </p>
              ) : null}
            </div>
            <p className="mt-4 text-base text-white/80">
              Solo {current.seats} biglietti a questo prezzo.{" "}
              {nextFollowsCurrent && next ? "Tra " : "Il lotto chiude tra "}
              <span className="font-semibold text-paper">
                {formatTimeLeft(current.endAt, now)}
              </span>
              {nextFollowsCurrent && next
                ? `, poi il prezzo sale a ${formatPrice(next.price)}.`
                : "."}
            </p>
          </>
        ) : next ? (
          <>
            <p className="text-xs tracking-[0.24em] text-blue uppercase">
              Prossimo lotto · {next.name}
            </p>
            <p className="font-display mt-5 text-6xl font-semibold tracking-tight sm:text-7xl">
              {formatPrice(next.price)}
            </p>
            <p className="mt-4 text-base text-white/80">
              {next.seats} biglietti in vendita dal {formatTierDate(next.startAt)}{" "}
              alle {formatTierTime(next.startAt)}, tra{" "}
              <span className="font-semibold text-paper">
                {formatTimeLeft(next.startAt, now)}
              </span>
              .
            </p>
          </>
        ) : (
          <>
            <p className="text-xs tracking-[0.24em] text-blue uppercase">
              Biglietti
            </p>
            <p className="font-display mt-4 text-3xl font-semibold tracking-tight">
              Controlla la disponibilità su Eventbrite
            </p>
          </>
        )}

        <div className="mt-8">
          <ButtonLink
            href={ticketUrl}
            variant="accent"
            external
            className="w-full !py-4 text-base sm:w-auto"
            trackEvent={TICKET_EVENT}
            trackPosition="tickets"
          >
            {current
              ? `Compra a ${formatPrice(current.price)}`
              : "Vai su Eventbrite"}
            <ArrowIcon />
          </ButtonLink>
          <p className="mt-3 text-xs text-white/50">
            {totalSeats} posti in totale · acquisto sicuro su Eventbrite
          </p>
        </div>

        <ol className="mt-10 grid gap-3 sm:grid-cols-2">
          {visible.map((tier) => (
            <TierRow key={tier.name} tier={tier} isCurrent={tier === current} />
          ))}
        </ol>
      </div>

      <div className="rounded-[2rem] border border-line bg-white p-6 sm:p-10">
        <p className="text-xs tracking-[0.24em] text-blue uppercase">
          Cosa include
        </p>
        <h3 className="font-display mt-3 text-2xl font-semibold tracking-tight">
          Tutto il weekend, tutto incluso
        </h3>
        <ul className="mt-6 space-y-4 text-sm leading-relaxed sm:text-base">
          {ticketIncludes.map((item) => (
            <li key={item} className="flex gap-3">
              <CheckIcon />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function TierRow({ tier, isCurrent }: { tier: TierView; isCurrent: boolean }) {
  return (
    <li
      className={cn(
        "flex items-center justify-between gap-4 rounded-2xl border px-4 py-3",
        isCurrent
          ? "border-blue bg-blue/10"
          : "border-white/10 bg-white/[0.03]",
        tier.status === "past" && "opacity-50",
      )}
    >
      <div>
        <p className="text-sm font-semibold">{tier.name}</p>
        <p className="mt-0.5 text-xs text-white/55">
          {tier.status === "past"
            ? "Terminato"
            : tier.status === "active"
              ? isCurrent
                ? `In vendita · ${tier.seats} posti`
                : `In vendita fino al ${formatTierDate(tier.endAt)}`
              : `Dal ${formatTierDate(tier.startAt)}`}
        </p>
      </div>
      <p
        className={cn(
          "font-display text-xl font-semibold",
          tier.status === "past" && "line-through",
        )}
      >
        {formatPrice(tier.price)}
      </p>
    </li>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="mt-0.5 h-5 w-5 shrink-0 text-blue"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M6 10.5l2.5 2.5L14 7.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PriceUrgency({
  tiers,
  fallbackNow,
  eventStart,
  children,
}: {
  tiers: TicketTier[];
  fallbackNow: number;
  eventStart: string;
  children?: ReactNode;
}) {
  const { current, next, nextFollowsCurrent } = useTicketState(
    tiers,
    fallbackNow,
  );

  if (!current && !next) {
    return (
      <div className="max-w-xl">
        <p className="mb-3 text-xs tracking-[0.24em] text-white/50 uppercase">
          Manca
        </p>
        <Countdown target={eventStart} />
        {children ? <div className="mt-6">{children}</div> : null}
      </div>
    );
  }

  const tier = current ?? next!;
  const rising = current && next && nextFollowsCurrent ? next : undefined;

  return (
    <div className="max-w-2xl rounded-[1.75rem] border border-blue/40 bg-ink/70 p-5 shadow-[0_30px_80px_-40px_rgba(0,153,221,0.8)] backdrop-blur-md sm:p-7">
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <div>
          <p className="inline-flex items-center gap-2 text-xs tracking-[0.24em] text-blue uppercase">
            {current ? (
              <span className="h-2 w-2 animate-pulse rounded-full bg-blue" />
            ) : null}
            {current ? "In vendita ora" : "Prossimo lotto"} · {tier.name}
          </p>
          <div className="mt-2 flex items-end gap-3">
            <p className="font-display text-5xl leading-none font-semibold tracking-tight text-paper sm:text-6xl">
              {formatPrice(tier.price)}
            </p>
            {rising ? (
              <p className="pb-1 text-xl text-white/50 line-through decoration-blue/80 sm:text-2xl">
                {formatPrice(rising.price)}
              </p>
            ) : null}
          </div>
        </div>
        <p className="text-sm text-white/70 sm:text-right">
          {current
            ? `Solo ${tier.seats} biglietti a questo prezzo`
            : `${tier.seats} biglietti dal ${formatTierDate(tier.startAt)}`}
        </p>
      </div>
      <p className="mt-4 mb-3 text-sm font-semibold text-paper sm:text-base">
        {rising
          ? `Il prezzo sale a ${formatPrice(rising.price)} tra:`
          : current
            ? "Il lotto chiude tra:"
            : "In vendita tra:"}
      </p>
      <Countdown target={current ? current.endAt : tier.startAt} />
      {children ? <div className="mt-5">{children}</div> : null}
    </div>
  );
}

export function StickyTicketBar({
  tiers,
  ticketUrl,
  fallbackNow,
}: {
  tiers: TicketTier[];
  ticketUrl: string;
  fallbackNow: number;
}) {
  const { now, current, next, nextFollowsCurrent } = useTicketState(
    tiers,
    fallbackNow,
  );
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.8;
      const ticketsSection = document.getElementById("biglietti");
      const rect = ticketsSection?.getBoundingClientRect();
      const ticketsInView =
        !!rect && rect.top < window.innerHeight && rect.bottom > 0;
      setVisible(pastHero && !ticketsInView);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] text-paper backdrop-blur-lg transition-transform duration-300 sm:hidden",
        visible ? "translate-y-0" : "translate-y-full",
      )}
      aria-hidden={!visible}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">
            {current
              ? `${current.name} · ${formatPrice(current.price)}`
              : next
                ? `${next.name} · ${formatPrice(next.price)}`
                : "Startup Weekend Savona"}
          </p>
          <p className="truncate text-xs text-white/60">
            {current && next && nextFollowsCurrent
              ? `Sale a ${formatPrice(next.price)} tra ${formatTimeLeft(current.endAt, now)}`
              : current
                ? `Chiude tra ${formatTimeLeft(current.endAt, now)}`
                : next
                  ? `In vendita tra ${formatTimeLeft(next.startAt, now)}`
                  : "Posti limitati"}
          </p>
        </div>
        <ButtonLink
          href={ticketUrl}
          variant="accent"
          external
          className="shrink-0 !px-5 !py-2.5"
          trackEvent={TICKET_EVENT}
          trackPosition="sticky-bar"
        >
          Compra
          <ArrowIcon />
        </ButtonLink>
      </div>
    </div>
  );
}
