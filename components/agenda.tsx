"use client";

import { useState } from "react";
import type { AgendaDay } from "@/lib/types";
import { cn } from "@/lib/utils";

export function Agenda({ days }: { days: AgendaDay[] }) {
  const [active, setActive] = useState(days[0]?.id ?? "");
  const day = days.find((item) => item.id === active) ?? days[0];

  return (
    <div>
      <div className="mx-auto flex max-w-2xl rounded-full bg-paper-2 p-1">
        {days.map((item) => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className={cn(
              "flex-1 rounded-full px-2 py-2.5 text-sm font-medium transition sm:px-4",
              item.id === active
                ? "bg-ink text-paper shadow-sm"
                : "text-ink-soft hover:text-ink",
            )}
          >
            <span className="block leading-tight">{item.label}</span>
            <span
              className={cn(
                "mt-0.5 block text-[11px] leading-tight whitespace-nowrap",
                item.id === active ? "text-blue" : "text-muted",
              )}
            >
              {item.date}
            </span>
          </button>
        ))}
      </div>

      <ol className="mx-auto mt-10 max-w-2xl">
        {day.items.map((item, index) => (
          <li
            key={`${item.time}-${item.title}`}
            className="grid grid-cols-[88px_16px_1fr] items-start gap-4 py-3"
          >
            <span className="pt-0.5 font-mono text-sm text-blue">{item.time}</span>
            <span className="relative mt-2 flex justify-center">
              <span className="h-2.5 w-2.5 rounded-full bg-blue ring-4 ring-blue/20" />
              {index < day.items.length - 1 ? (
                <span className="absolute top-3 h-8 w-px bg-line" />
              ) : null}
            </span>
            <span className="text-base text-ink-soft">{item.title}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
