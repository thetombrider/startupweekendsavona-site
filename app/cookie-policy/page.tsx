import type { Metadata } from "next";
import { CookiePreferencesButton } from "@/components/cookie-consent";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Container } from "@/components/ui";
import { edition2026, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Cookie policy",
  description: `Come ${site.name} usa cookie e strumenti di misurazione.`,
  robots: { index: false },
};

export default function CookiePolicyPage() {
  return (
    <>
      <SiteHeader edition={edition2026} />
      <main className="bg-paper pt-28 pb-24">
        <Container className="max-w-3xl">
          <p className="text-xs tracking-[0.28em] text-blue uppercase">Privacy</p>
          <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Cookie policy
          </h1>
          <div className="mt-10 space-y-8 text-base leading-relaxed text-muted [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-ink">
            <section>
              <h2>Chi siamo</h2>
              <p className="mt-2">
                Il sito {site.url.replace("https://", "")} è gestito da{" "}
                {site.organizer}. Per qualsiasi domanda scrivi a{" "}
                <a href={`mailto:${site.email}`} className="text-blue hover:underline">
                  {site.email}
                </a>
                .
              </p>
            </section>
            <section>
              <h2>Strumenti tecnici e statistiche</h2>
              <p className="mt-2">
                Salviamo nel tuo browser la scelta che fai sul banner, per non
                chiedertela a ogni visita. Per le statistiche di visita usiamo
                Umami, che non usa cookie e raccoglie solo dati aggregati e
                anonimi. Questi strumenti non richiedono il tuo consenso.
              </p>
            </section>
            <section>
              <h2>Meta Pixel (solo con il tuo consenso)</h2>
              <p className="mt-2">
                Se accetti, carichiamo il Meta Pixel di Meta Platforms Ireland
                Ltd. Imposta cookie come <code>_fbp</code> e ci permette di
                misurare l’efficacia delle campagne su Facebook e Instagram
                (visite, click sui biglietti, acquisti) e di mostrarti annunci
                pertinenti. Meta tratta questi dati secondo la propria{" "}
                <a
                  href="https://www.facebook.com/privacy/policy/"
                  className="text-blue hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  informativa privacy
                </a>
                . Se rifiuti, il pixel non viene caricato.
              </p>
            </section>
            <section>
              <h2>Servizi di terze parti</h2>
              <p className="mt-2">
                L’acquisto dei biglietti avviene tramite Eventbrite: quando apri
                il checkout, Eventbrite può impostare i propri cookie secondo la
                sua cookie policy. Il video dell’evento è ospitato su YouTube in
                modalità privacy avanzata e viene caricato solo quando premi play.
              </p>
            </section>
            <section>
              <h2>Cambiare idea</h2>
              <p className="mt-2">
                Puoi modificare la tua scelta in qualsiasi momento.
              </p>
              <CookiePreferencesButton className="mt-4 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white hover:bg-black" />
            </section>
          </div>
        </Container>
      </main>
      <SiteFooter edition={edition2026} />
    </>
  );
}
