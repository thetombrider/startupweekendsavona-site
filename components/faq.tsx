"use client";

import { useState } from "react";
import { faqs } from "@/lib/content";
import { getTicketState } from "@/lib/tickets";
import type { TicketTier } from "@/lib/types";
import { useNow } from "@/lib/use-now";
import { cn } from "@/lib/utils";

export function Faq({ tiers }: { tiers?: TicketTier[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const now = useNow();
  const { current, next } = getTicketState(tiers ?? [], now);
  const promo =
    now && current?.hiddenUntilStart && next && next.price > current.price
      ? { current, next }
      : undefined;

  return (
    <div className="mx-auto max-w-3xl divide-y divide-line rounded-3xl border border-line bg-white/50">
      {faqs.map((item, index) => {
        const isOpen = open === index;
        return (
          <div key={item.question}>
            <button
              className="flex w-full items-start justify-between gap-6 px-6 py-5 text-left"
              onClick={() => setOpen(isOpen ? null : index)}
              aria-expanded={isOpen}
            >
              <span className="font-display text-lg font-semibold tracking-tight">
                {item.question}
              </span>
              <span
                className={cn(
                  "mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line text-lg leading-none",
                  isOpen && "bg-ink text-blue",
                )}
              >
                {isOpen ? "–" : "+"}
              </span>
            </button>
            {isOpen ? (
              <p className="whitespace-pre-line px-6 pb-6 text-sm leading-relaxed text-muted sm:text-base">
                {promo && "promoAnswer" in item && item.promoAnswer
                  ? item.promoAnswer(promo.current, promo.next)
                  : item.answer}
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
