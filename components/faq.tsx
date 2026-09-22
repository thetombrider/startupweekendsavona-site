"use client";

import { useState } from "react";
import { faqs } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

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
                {item.answer}
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
