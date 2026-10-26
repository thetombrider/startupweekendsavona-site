"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  loadMetaPixel,
  OPEN_COOKIE_PREFERENCES,
  saveConsent,
  trackPixel,
  useConsent,
  type Consent,
} from "@/lib/meta-pixel";

export function CookieConsent() {
  const consent = useConsent();
  const pathname = usePathname();
  const [reopened, setReopened] = useState(false);

  useEffect(() => {
    const onOpen = () => setReopened(true);
    window.addEventListener(OPEN_COOKIE_PREFERENCES, onOpen);
    return () => window.removeEventListener(OPEN_COOKIE_PREFERENCES, onOpen);
  }, []);

  useEffect(() => {
    if (consent === "granted") {
      loadMetaPixel();
      window.fbq?.("consent", "grant");
    } else if (consent === "denied") {
      window.fbq?.("consent", "revoke");
    }
  }, [consent]);

  useEffect(() => {
    if (consent === "granted") trackPixel("PageView");
  }, [consent, pathname]);

  if (consent === "unknown" || (consent !== null && !reopened)) return null;

  function choose(value: Consent) {
    saveConsent(value);
    setReopened(false);
  }

  return (
    <div
      role="dialog"
      aria-label="Preferenze cookie"
      className="fixed inset-x-3 bottom-3 z-50 rounded-2xl border border-white/10 bg-ink p-5 text-paper shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] sm:inset-x-auto sm:right-6 sm:bottom-6 sm:max-w-md"
    >
      <p className="text-sm leading-relaxed text-white/80">
        Usiamo cookie di Meta per misurare le nostre campagne e mostrarti
        annunci pertinenti. Il sito funziona anche se li rifiuti.{" "}
        <Link href="/cookie-policy" className="text-blue hover:underline">
          Cookie policy
        </Link>
      </p>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => choose("denied")}
          className="rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold transition hover:border-blue hover:text-blue"
        >
          Rifiuta
        </button>
        <button
          type="button"
          onClick={() => choose("granted")}
          className="rounded-full bg-blue px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-deep"
        >
          Accetta
        </button>
      </div>
    </div>
  );
}

export function CookiePreferencesButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_PREFERENCES))}
    >
      Preferenze cookie
    </button>
  );
}
