"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { trackPixel, useConsent } from "@/lib/meta-pixel";
import { TICKET_DISCOUNT_LABEL } from "@/lib/ticket-interest";
import { cn } from "@/lib/utils";
import { ArrowIcon } from "./ui";

declare global {
  interface Window {
    umami?: { track: (event: string, data?: Record<string, unknown>) => void };
  }
}

const SUBMIT_ERROR = "Invio non riuscito. Riprova tra poco.";
const DISCOUNT_DETAILS = "Lascia la tua email: ti mandiamo subito il codice sconto e il link per acquistare.";

export function TicketInterest({
  position,
  id,
  className,
}: {
  position: string;
  id?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [outcome, setOutcome] = useState<"saved" | "preview">();
  const [error, setError] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const restoreFocus = useRef(false);
  const emailId = useId();
  const detailId = useId();
  const consent = useConsent();

  useEffect(() => {
    if (open) input.current?.focus();
    else if (restoreFocus.current) {
      trigger.current?.focus();
      restoreFocus.current = false;
    }
  }, [open]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const email = new FormData(event.currentTarget).get("email");
    setPending(true);
    setError("");
    let preview: boolean;
    try {
      const response = await fetch("/api/ticket-interest", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        setError(
          response.status === 400 ? "Inserisci un indirizzo email valido." : SUBMIT_ERROR,
        );
        return;
      }
      const result = await response.json();
      if (typeof result?.preview !== "boolean") {
        setError(SUBMIT_ERROR);
        return;
      }
      preview = result.preview;
    } catch {
      setError(SUBMIT_ERROR);
      return;
    } finally {
      setPending(false);
    }

    setOutcome(preview ? "preview" : "saved");
    if (!preview) {
      if (consent === "granted") trackPixel("Lead");
      window.umami?.track("ticket-lead", { position });
    }
  }

  return (
    <div
      id={id}
      tabIndex={id ? -1 : undefined}
      onFocus={(event) => {
        if (id && event.target === event.currentTarget) {
          if (open) input.current?.focus();
          else setOpen(true);
        }
      }}
      className={cn("inline-flex max-w-full min-w-0 flex-col text-left", className)}
    >
      {!open ? (
        <>
          <button
            ref={trigger}
            type="button"
            className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-blue px-5 py-2 text-sm leading-snug font-semibold text-ink transition-colors hover:bg-blue-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
            aria-describedby={detailId}
            data-umami-event="ticket-interest-open"
            data-umami-event-position={position}
            onClick={() => setOpen(true)}
          >
            {TICKET_DISCOUNT_LABEL} <ArrowIcon className="shrink-0" />
          </button>
          <p id={detailId} className="mt-2 max-w-80 text-xs leading-relaxed opacity-80">
            {DISCOUNT_DETAILS}
          </p>
        </>
      ) : outcome ? null : (
        <form
          onSubmit={submit}
          onKeyDown={(event) => {
            if (event.key !== "Escape" || pending) return;
            event.preventDefault();
            restoreFocus.current = true;
            setError("");
            setOpen(false);
          }}
          className="w-full sm:w-72"
        >
          <label htmlFor={emailId} className="sr-only">
            Indirizzo email
          </label>
          <div className="flex min-h-12 items-center gap-1 rounded-full border border-blue bg-paper p-1 text-ink transition-shadow focus-within:ring-2 focus-within:ring-blue/50">
            <input
              ref={input}
              id={emailId}
              name="email"
              type="email"
              autoComplete="email"
              placeholder="La tua email"
              required
              maxLength={254}
              readOnly={pending}
              aria-describedby={detailId}
              onChange={() => error && setError("")}
              className="min-w-0 flex-1 bg-transparent px-2 pl-3 text-base outline-none placeholder:text-muted"
            />
            <button
              type="submit"
              disabled={pending}
              aria-label={pending ? "Invio…" : "Ricevi il codice"}
              className="inline-flex min-h-10 shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-full bg-blue px-3 text-sm font-semibold text-ink transition-colors hover:bg-blue-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-deep disabled:cursor-wait disabled:opacity-70"
            >
              {pending ? "Invio…" : (
                <>
                  <span>Ricevi<span className="hidden sm:inline"> il codice</span></span>
                  <ArrowIcon className="h-3.5 w-3.5" />
                </>
              )}
            </button>
          </div>
          <p id={detailId} className="mt-2 text-xs leading-relaxed opacity-80">
            {DISCOUNT_DETAILS}{" "}
            <a href="/cookie-policy#aggiornamenti-biglietti" className="underline underline-offset-2">
              Privacy
            </a>
          </p>
        </form>
      )}
      <div role="status" className="text-sm">
        {outcome ? (
          <>
            <p className="inline-flex min-h-12 max-w-sm items-center gap-2 rounded-2xl border border-blue/50 bg-blue/10 px-4 py-2 font-semibold">
              <span aria-hidden="true">✓</span>
              Grazie! Controlla la posta, anche in Spam: ti abbiamo inviato il codice
              sconto e il link per comprare i biglietti. Ti aspettiamo!
            </p>
            {outcome === "preview" ? (
              <p className="mt-2 text-xs opacity-80">Anteprima: nessuna email inviata.</p>
            ) : null}
          </>
        ) : error ? <p className="mt-2 font-medium">{error}</p> : null}
      </div>
    </div>
  );
}
