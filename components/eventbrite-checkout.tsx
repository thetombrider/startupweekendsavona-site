"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";
import { TICKET_EVENT } from "@/lib/tickets";

const TRIGGER_ID = "eventbrite-checkout-trigger";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign"];

type EBWidgets = {
  createWidget: (config: Record<string, unknown>) => void;
};

declare global {
  interface Window {
    EBWidgets?: EBWidgets;
    umami?: { track: (event: string, data?: Record<string, unknown>) => void };
  }
}

export function EventbriteCheckout({
  eventId,
  utm,
}: {
  eventId: string;
  utm: Record<string, string>;
}) {
  const ready = useRef(false);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!ready.current || e.defaultPrevented) return;
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }
      const link = (e.target as Element | null)?.closest?.(
        `a[data-umami-event="${TICKET_EVENT}"]`,
      );
      const trigger = document.getElementById(TRIGGER_ID);
      if (!link || !trigger) return;
      e.preventDefault();
      trigger.click();
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  function init() {
    if (!window.EBWidgets || window.location.protocol !== "https:") return;
    const params = new URLSearchParams(window.location.search);
    const hasPageUtm = UTM_KEYS.some((key) => params.has(key));
    window.EBWidgets.createWidget({
      widgetType: "checkout",
      eventId,
      modal: true,
      modalTriggerElementId: TRIGGER_ID,
      iframeTitle: "Acquista il biglietto",
      extraParams: hasPageUtm
        ? undefined
        : Object.entries(utm).map(([name, value]) => ({ name, value })),
      onOrderComplete: () => window.umami?.track("ticket-purchase"),
    });
    ready.current = true;
  }

  return (
    <>
      <button
        id={TRIGGER_ID}
        type="button"
        hidden
        aria-hidden="true"
        tabIndex={-1}
      />
      <Script
        src="https://www.eventbrite.com/static/widgets/eb_widgets.js"
        strategy="lazyOnload"
        onReady={init}
      />
    </>
  );
}
