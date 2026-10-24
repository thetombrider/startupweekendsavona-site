import type { TicketTier } from "./types";

export const TICKET_EVENT = "ticket-click";

export type TierStatus = "past" | "active" | "upcoming";

export type TierView = TicketTier & { status: TierStatus };

export type TicketState = {
  tiers: TierView[];
  current?: TierView;
  next?: TierView;
  /** True when `next` goes on sale as soon as `current` ends. */
  nextFollowsCurrent: boolean;
  totalSeats: number;
};

const time = (iso: string) => new Date(iso).getTime();

function statusAt(tier: TicketTier, now: number): TierStatus {
  if (now >= time(tier.endAt)) return "past";
  return now >= time(tier.startAt) ? "active" : "upcoming";
}

export function getTicketState(tiers: TicketTier[], now: number): TicketState {
  const all: TierView[] = tiers
    .map((tier) => ({ ...tier, status: statusAt(tier, now) }))
    .sort((a, b) => time(a.startAt) - time(b.startAt));

  // Hidden tiers stay secret only while another tier is on sale.
  const anotherOnSale = all.some(
    (tier) => !tier.hiddenUntilStart && tier.status === "active",
  );
  const visible = all.filter(
    (tier) =>
      !tier.hiddenUntilStart || tier.status !== "upcoming" || !anotherOnSale,
  );

  const current = visible
    .filter((tier) => tier.status === "active")
    .sort((a, b) => a.price - b.price)[0];

  const next = visible.find(
    (tier) =>
      tier.status === "upcoming" &&
      (!current || time(tier.startAt) >= time(current.endAt)),
  );

  return {
    tiers: visible,
    current,
    next,
    nextFollowsCurrent:
      !!current && !!next && time(next.startAt) === time(current.endAt),
    totalSeats: tiers.reduce((sum, tier) => sum + tier.seats, 0),
  };
}

const dateFormatter = new Intl.DateTimeFormat("it-IT", {
  day: "numeric",
  month: "long",
  timeZone: "Europe/Rome",
});

export function formatTierDate(iso: string) {
  return dateFormatter.format(new Date(iso));
}

const timeFormatter = new Intl.DateTimeFormat("it-IT", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/Rome",
});

export function formatTierTime(iso: string) {
  return timeFormatter.format(new Date(iso));
}

export function formatPrice(price: number) {
  return `${price} €`;
}

export function formatTimeLeft(target: string, now: number) {
  const diff = Math.max(0, new Date(target).getTime() - now);
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff / 3_600_000) % 24);
  const minutes = Math.floor((diff / 60_000) % 60);
  if (days >= 1) return `${days}g ${hours}h`;
  if (hours >= 1) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}
