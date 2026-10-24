"use client";

import { useSyncExternalStore } from "react";

let cachedNow = 0;
const listeners = new Set<() => void>();
let intervalId: number | undefined;

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  if (intervalId === undefined) {
    cachedNow = Date.now();
    intervalId = window.setInterval(() => {
      cachedNow = Date.now();
      listeners.forEach((listener) => listener());
    }, 1000);
  }
  return () => {
    listeners.delete(onStoreChange);
    if (listeners.size === 0 && intervalId !== undefined) {
      window.clearInterval(intervalId);
      intervalId = undefined;
    }
  };
}

function getSnapshot() {
  return cachedNow;
}

function getServerSnapshot() {
  return 0;
}

/** Current timestamp, ticking every second on the client; 0 during SSR. */
export function useNow() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
