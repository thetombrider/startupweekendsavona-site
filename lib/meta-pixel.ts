"use client";

import { useSyncExternalStore } from "react";

export const META_PIXEL_ID = "1160926998906447";

const CONSENT_KEY = "sws-cookie-consent";
export const OPEN_COOKIE_PREFERENCES = "sws:open-cookie-preferences";

export type Consent = "granted" | "denied";

type Fbq = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push: Fbq;
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

const listeners = new Set<() => void>();

function readConsent(): Consent | null {
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** Stored cookie choice; "unknown" during SSR. */
export function useConsent(): Consent | null | "unknown" {
  return useSyncExternalStore(subscribe, readConsent, () => "unknown");
}

export function saveConsent(consent: Consent) {
  try {
    window.localStorage.setItem(CONSENT_KEY, consent);
  } catch {}
  listeners.forEach((listener) => listener());
}

export function loadMetaPixel() {
  if (window.fbq) return;
  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue.push(args);
  } as Fbq;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  window.fbq = fbq;
  window._fbq = fbq;
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);
  fbq("init", META_PIXEL_ID);
}

/** No-op unless the visitor accepted cookies and the pixel is loaded. */
export function trackPixel(
  event: string,
  params?: Record<string, unknown>,
  options?: { eventID?: string },
) {
  window.fbq?.("track", event, params ?? {}, options ?? {});
}
