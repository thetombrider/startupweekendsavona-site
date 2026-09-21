"use client";

import { useMemo, useSyncExternalStore } from "react";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function subscribe(onStoreChange: () => void) {
  const id = window.setInterval(onStoreChange, 1000);
  return () => window.clearInterval(id);
}

function getSnapshot() {
  return Date.now();
}

function getServerSnapshot() {
  return 0;
}

export function Countdown({ target }: { target: string }) {
  const date = useMemo(() => new Date(target).getTime(), [target]);
  const now = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (now === 0) {
    return (
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {["Giorni", "Ore", "Min", "Sec"].map((label) => (
          <TimeBox key={label} value="—" label={label} />
        ))}
      </div>
    );
  }

  const diff = Math.max(0, date - now);
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff / 3_600_000) % 24);
  const minutes = Math.floor((diff / 60_000) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-3">
      <TimeBox value={pad(days)} label="Giorni" />
      <TimeBox value={pad(hours)} label="Ore" />
      <TimeBox value={pad(minutes)} label="Min" />
      <TimeBox value={pad(seconds)} label="Sec" />
    </div>
  );
}

function TimeBox({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-2 py-3 text-center backdrop-blur-sm sm:px-3 sm:py-4">
      <div className="font-display text-2xl font-semibold tracking-tight text-paper sm:text-4xl">
        {value}
      </div>
      <div className="mt-1 text-[10px] tracking-[0.22em] text-white/50 uppercase">
        {label}
      </div>
    </div>
  );
}
