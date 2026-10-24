import type { TicketTier } from "./types";

export const TICKET_EVENT = "ticket-click";

export type TierStatus = "past" | "active" | "upcoming";

export type TierView = TicketTier & { status: TierStatus };

export type TicketState = {
  tiers: TierView[];
  current?: TierView;
  next?: TierView;
  totalSeats: number;
};

export function getTicketState(tiers: TicketTier[], now: number): TicketState {
  const visible: TierView[] = tiers
    .filter(
      (tier) => !tier.hiddenUntilStart || new Date(tier.startAt).getTime() <= now,
    )
    .map((tier) => {
      const start = new Date(tier.startAt).getTime();
      const end = new Date(tier.endAt).getTime();
      const status: TierStatus =
        now >= end ? "past" : now >= start ? "active" : "upcoming";
      return { ...tier, status };
    })
    .sort(
      (a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime(),
    );

  const current = visible
    .filter((tier) => tier.status === "active")
    .sort((a, b) => a.price - b.price)[0];

  const currentEnd = current ? new Date(current.endAt).getTime() : now;
  const next = visible.find(
    (tier) =>
      tier.status === "upcoming" &&
      new Date(tier.startAt).getTime() >= currentEnd,
  );

  return {
    tiers: visible,
    current,
    next,
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
