import Image from "next/image";
import {
  aboutCopy,
  alumni,
  howItWorks,
  meals,
  press,
  pressAllUrl,
  pressAlsoIn,
  pastEditions,
  stats,
  techstarsNetworkNote,
  valueProps,
} from "@/lib/content";
import { TICKET_EVENT } from "@/lib/tickets";
import type { Edition, Person } from "@/lib/types";
import { Agenda } from "./agenda";
import { Countdown } from "./countdown";
import { Faq } from "./faq";
import { PriceUrgency, StickyTicketBar, TicketTiers } from "./tickets";
import { ArrowIcon, ButtonLink, Container, SectionHeading } from "./ui";

const buildTime = Date.now();

export function EventPage({ edition }: { edition: Edition }) {
  const ticketHref = edition.isCurrent ? edition.ticketUrl! : "/";
  const fallbackNow = buildTime;
  const tiers = edition.isCurrent ? edition.tickets : undefined;

  return (
    <main>
      <Hero
        edition={edition}
        ticketHref={ticketHref}
        fallbackNow={fallbackNow}
      />
      <Marquee />
      <About edition={edition} ticketHref={ticketHref} />
      <ValueProps />
      <StatsBand />
      <HowItWorks />
      <Alumni />
      <Prizes edition={edition} />
      <Food />
      {tiers ? (
        <TicketsSection
          edition={edition}
          ticketHref={ticketHref}
          fallbackNow={fallbackNow}
        />
      ) : null}
      <PeopleSection edition={edition} />
      <Facilitator person={edition.facilitator} />
      <AgendaSection edition={edition} ticketHref={ticketHref} />
      <Gallery edition={edition} />
      <VideoRecap edition={edition} />
      <PastEditionRecap edition={edition} />
      <Press />
      <Sponsors edition={edition} />
      <FaqSection />
      <FinalCta edition={edition} ticketHref={ticketHref} />
      {tiers ? (
        <StickyTicketBar
          tiers={tiers}
          ticketUrl={ticketHref}
          fallbackNow={fallbackNow}
        />
      ) : null}
    </main>
  );
}

function Hero({
  edition,
  ticketHref,
  fallbackNow,
}: {
  edition: Edition;
  ticketHref: string;
  fallbackNow: number;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-paper">
      <div className="pointer-events-none absolute -top-24 right-[-8%] font-display text-[38vw] leading-none font-bold text-white/[0.03] select-none">
        54
      </div>

      <Container className="relative grid items-center gap-10 pt-28 pb-16 sm:pb-20 lg:min-h-[100svh] lg:pt-24 lg:pb-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <div>
          {!edition.isCurrent ? (
            <p className="mb-5 inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs tracking-[0.2em] text-blue uppercase">
              Archivio · Edizione {edition.year}
            </p>
          ) : null}
          <p className="text-xs tracking-[0.32em] text-blue uppercase">
            {edition.kicker}
          </p>
          <h1 className="font-display mt-4 text-4xl leading-[0.95] font-semibold tracking-tight sm:text-6xl xl:text-7xl">
            {edition.headline}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/75">
            {edition.datesLabel} · {edition.venue}
          </p>
          {edition.isCurrent && edition.tickets ? (
            <div className="mt-8">
              <PriceUrgency
                tiers={edition.tickets}
                fallbackNow={fallbackNow}
                eventStart={edition.startAt}
              >
                <HeroActions edition={edition} ticketHref={ticketHref} />
              </PriceUrgency>
            </div>
          ) : (
            <div className="mt-8">
              <HeroActions edition={edition} ticketHref={ticketHref} />
            </div>
          )}
          {edition.isCurrent && !edition.tickets ? (
            <div className="mt-14 max-w-xl">
              <p className="mb-3 text-xs tracking-[0.24em] text-white/50 uppercase">
                Manca
              </p>
              <Countdown target={edition.startAt} />
            </div>
          ) : null}
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] lg:aspect-[4/5]">
          <Image
            src={edition.heroImage}
            alt="Partecipanti di Startup Weekend Savona"
            fill
            priority
            quality={80}
            className="object-cover object-center"
            sizes="(min-width: 1024px) 45vw, 100vw"
          />
          {edition.isCurrent ? (
            <p className="absolute bottom-4 left-4 rounded-full bg-ink/80 px-4 py-2 text-xs font-semibold text-paper backdrop-blur-md sm:text-sm">
              80+ partecipanti nelle edizioni passate
            </p>
          ) : null}
        </div>
      </Container>
    </section>
  );
}

function HeroActions({
  edition,
  ticketHref,
}: {
  edition: Edition;
  ticketHref: string;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <ButtonLink
        href={ticketHref}
        variant="accent"
        external={edition.isCurrent}
        className="!py-4 text-base"
        trackEvent={edition.isCurrent ? TICKET_EVENT : undefined}
        trackPosition="hero"
      >
        {edition.ticketLabel}
        <ArrowIcon />
      </ButtonLink>
      {edition.isCurrent ? (
        <ButtonLink href="#come-funziona" variant="ghost" className="!py-4">
          Come funziona
        </ButtonLink>
      ) : null}
    </div>
  );
}

function Marquee() {
  const items = [
    "Idee",
    "Team",
    "Mentor",
    "Validazione",
    "Prototipo",
    "Pitch finale",
    "Giuria",
    "54 ore",
  ];
  const loop = [...items, ...items, ...items, ...items];
  return (
    <div className="border-y border-ink/10 bg-blue py-3 text-white">
      <div className="marquee">
        <div className="marquee-track font-display text-sm font-semibold tracking-[0.28em] uppercase">
          {loop.map((item, i) => (
            <span key={`${item}-${i}`} className="mx-6 inline-flex items-center gap-6">
              {item}
              <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function About({
  edition,
  ticketHref,
}: {
  edition: Edition;
  ticketHref: string;
}) {
  return (
    <section id="about" className="scroll-mt-24 py-24 sm:py-32">
      <Container className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="text-xs tracking-[0.28em] text-blue uppercase">
            Learn, Network, Startup
          </p>
          <h2 className="font-display mt-4 text-3xl leading-[1.1] font-semibold tracking-tight sm:text-5xl">
            Tre giorni per pensare, lavorare e costruire come una startup.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
            {aboutCopy}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 text-sm font-semibold">
            {edition.isCurrent ? (
              <ButtonLink
                href={ticketHref}
                variant="accent"
                external
                trackEvent={TICKET_EVENT}
                trackPosition="about"
              >
                Compra il biglietto
                <ArrowIcon />
              </ButtonLink>
            ) : null}
            <a
              href={edition.brochureUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue hover:text-blue-deep"
            >
              Scarica la brochure
              <ArrowIcon />
            </a>
            <a
              href={edition.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue hover:text-blue-deep"
            >
              Come arrivare alla Fortezza
              <ArrowIcon />
            </a>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-blue/40 blur-2xl" />
          <div className="overflow-hidden rounded-[1.75rem] border border-line">
            <Image
              src={edition.aboutImage}
              alt="Team al lavoro durante Startup Weekend"
              width={1024}
              height={683}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-4 max-w-[220px] rounded-2xl bg-ink p-4 text-paper shadow-xl">
            <p className="font-display text-3xl font-semibold">54h</p>
            <p className="mt-1 text-xs leading-relaxed text-white/70">
              Dall’idea al pitch, con mentori, team e una giuria di investitori.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

function ValueProps() {
  return (
    <section className="pb-8">
      <Container className="grid gap-4 md:grid-cols-2">
        {valueProps.map((item) => (
          <article
            key={item.index}
            className="rounded-[1.75rem] border border-line bg-white/60 p-6 transition sm:p-7 hover:-translate-y-0.5 hover:shadow-lg"
          >
            <p className="font-mono text-xs tracking-[0.2em] text-blue">
              {item.index}
            </p>
            <h3 className="font-display mt-3 text-xl font-semibold tracking-tight sm:mt-4 sm:text-2xl">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted sm:mt-3 sm:text-base">
              {item.body}
            </p>
          </article>
        ))}
      </Container>
    </section>
  );
}

function StatsBand() {
  return (
    <section className="mt-20 bg-ink py-14 text-paper">
      <Container className="grid grid-cols-2 gap-8 lg:grid-cols-4">
        {stats.map((item) => (
          <div key={item.label} className="text-center lg:text-left">
            <p className="font-display text-4xl font-semibold tracking-tight text-blue sm:text-5xl">
              {item.value}
            </p>
            <p className="mt-2 text-xs tracking-[0.18em] text-white/60 uppercase">
              {item.label}
            </p>
          </div>
        ))}
        <p className="col-span-2 text-center text-sm text-white/50 lg:col-span-4 lg:text-left">
          {techstarsNetworkNote}
        </p>
      </Container>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="come-funziona" className="scroll-mt-24 py-24 sm:py-32">
      <SectionHeading
        eyebrow="Come funziona"
        title="Tre giorni, una startup"
        body="Non serve avere un’idea né un team: puoi venire da solo e unirti a un progetto il venerdì sera."
      />
      <Container className="mt-14 grid gap-5 md:grid-cols-3">
        {howItWorks.map((step, i) => (
          <article
            key={step.title}
            className="rounded-[1.75rem] border border-line bg-white p-7"
          >
            <p className="grid h-10 w-10 place-items-center rounded-full bg-blue font-display text-lg font-semibold text-white">
              {i + 1}
            </p>
            <p className="mt-6 text-xs tracking-[0.22em] text-blue uppercase">
              {step.when}
            </p>
            <h3 className="font-display mt-2 text-2xl font-semibold tracking-tight">
              {step.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
              {step.body}
            </p>
          </article>
        ))}
      </Container>
    </section>
  );
}

function Alumni() {
  return (
    <section className="pb-24 sm:pb-32">
      <Container>
        {alumni.map((item) => (
          <a
            key={item.name}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group grid gap-6 rounded-[2rem] bg-blue p-8 text-white transition hover:bg-blue-deep sm:p-12 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-12"
          >
            <div>
              <p className="text-xs tracking-[0.24em] text-white/70 uppercase">
                Nata qui · Edizione {item.edition}
              </p>
              <Image
                src={item.logo}
                alt={item.name}
                width={1414}
                height={450}
                className="mt-4 h-12 w-auto sm:h-16"
              />
            </div>
            <p className="max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
              {item.description}
            </p>
            <span className="inline-flex items-center gap-2 text-sm font-semibold">
              {item.url.replace("https://", "")}
              <ArrowIcon className="transition group-hover:translate-x-1" />
            </span>
          </a>
        ))}
      </Container>
    </section>
  );
}

function Food() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <div className="grid gap-10 rounded-[2rem] border border-line bg-white p-8 sm:p-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs tracking-[0.24em] text-blue uppercase">
              Vitto incluso
            </p>
            <h2 className="font-display mt-3 text-3xl leading-[1.1] font-semibold tracking-tight sm:text-5xl">
              7 pasti in 3 giorni, tutti compresi nel biglietto
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
              Dal venerdì sera all’aperitivo della domenica non spendi nulla per
              mangiare: colazioni, pranzi, cene, snack e drink sono inclusi. Il
              biglietto costa meno di quanto spenderesti solo per il cibo.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {meals.map((day) => (
              <div key={day.day} className="rounded-2xl bg-paper-2 p-5">
                <p className="text-xs tracking-[0.22em] text-blue uppercase">
                  {day.day}
                </p>
                <ul className="mt-3 space-y-2 font-display text-lg font-semibold">
                  {day.items.map((meal) => (
                    <li key={meal}>{meal}</li>
                  ))}
                </ul>
              </div>
            ))}
            <p className="text-sm text-muted sm:col-span-3">
              + snack e drink per tutto il weekend. Allergie o diete
              particolari? Segnalale al momento dell’acquisto.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

const pressDateFormatter = new Intl.DateTimeFormat("it-IT", {
  month: "long",
  year: "numeric",
});

function Press() {
  return (
    <section id="stampa" className="scroll-mt-24 pb-24">
      <SectionHeading eyebrow="Rassegna stampa" title="Parlano di noi" />
      <Container className="mt-12 grid gap-4 md:grid-cols-3">
        {press.map((article) => (
          <a
            key={article.href}
            href={article.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col rounded-[1.75rem] border border-line bg-white p-7 transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <p className="text-xs tracking-[0.22em] text-blue uppercase">
              {article.outlet}
            </p>
            <p className="mt-1 text-xs text-muted">
              {pressDateFormatter.format(new Date(`${article.date}T12:00:00`))}
            </p>
            <h3 className="font-display mt-4 text-lg leading-snug font-semibold tracking-tight group-hover:text-blue">
              {article.title}
            </h3>
            <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-blue">
              Leggi l’articolo
              <ArrowIcon />
            </span>
          </a>
        ))}
      </Container>
      <Container className="mt-6 text-center text-sm text-muted">
        Ne hanno scritto anche {pressAlsoIn.join(", ")}.{" "}
        <a
          href={pressAllUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-blue hover:underline"
        >
          Tutta la rassegna stampa
        </a>
      </Container>
    </section>
  );
}

function TicketsSection({
  edition,
  ticketHref,
  fallbackNow,
}: {
  edition: Edition;
  ticketHref: string;
  fallbackNow: number;
}) {
  return (
    <section id="biglietti" className="scroll-mt-24 bg-paper-2 py-24 sm:py-32">
      <SectionHeading
        eyebrow="Biglietti"
        title="Prima compri, meno paghi"
        body="Il prezzo sale man mano che si avvicina l’evento e ogni lotto ha un numero fisso di posti."
      />
      <Container className="mt-12">
        <TicketTiers
          tiers={edition.tickets!}
          ticketUrl={ticketHref}
          fallbackNow={fallbackNow}
        />
      </Container>
    </section>
  );
}

function AgendaSection({
  edition,
  ticketHref,
}: {
  edition: Edition;
  ticketHref: string;
}) {
  return (
    <section id="agenda" className="scroll-mt-24 py-24 sm:py-32">
      <SectionHeading
        eyebrow="Agenda"
        title="54 ore, minuto per minuto"
        body="Venerdì pitch e formazione dei team. Sabato mentoring e prototipo. Domenica il palco, la giuria e l’aperitivo."
      />
      <Container className="mt-12">
        <Agenda days={edition.agenda} />
        <div className="mt-12 flex justify-center">
          <ButtonLink
            href={ticketHref}
            variant="accent"
            external={edition.isCurrent}
            trackEvent={edition.isCurrent ? TICKET_EVENT : undefined}
            trackPosition="agenda"
          >
            {edition.ticketLabel}
            <ArrowIcon />
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

function PeopleSection({ edition }: { edition: Edition }) {
  return (
    <section id="people" className="scroll-mt-24 bg-ink py-24 text-paper sm:py-32">
      <Container>
        <SectionHeading
          invert
          eyebrow="Community"
          title="Giuria e mentor"
          body={
            edition.peopleComingSoon
              ? "I nomi dell’edizione 2026 saranno annunciati a breve. Intanto, il palco della Fortezza si sta riempiendo."
              : "Founder, investor e operator che ti spingono a validare in fretta, e a pitchare ancora meglio."
          }
        />
        <div className="mt-16">
          <h3 className="text-xs tracking-[0.24em] text-blue uppercase">Giuria</h3>
          <PeopleGrid
            people={edition.jury}
            comingSoon={edition.peopleComingSoon}
            moreComing={edition.peopleMoreComing}
            count={4}
          />
        </div>
        <div className="mt-16">
          <h3 className="text-xs tracking-[0.24em] text-blue uppercase">Mentor</h3>
          <PeopleGrid
            people={edition.mentors}
            comingSoon={edition.peopleComingSoon}
            moreComing={edition.peopleMoreComing}
            count={8}
          />
        </div>
      </Container>
    </section>
  );
}

function MoreComingCard() {
  return (
    <article className="aspect-[4/5] rounded-3xl border border-dashed border-white/15 bg-white/5 p-5">
      <div className="flex h-full flex-col justify-end">
        <p className="text-xs tracking-[0.2em] text-white/40 uppercase">
          In arrivo
        </p>
        <p className="mt-1 font-display text-lg">Altri nomi in arrivo</p>
      </div>
    </article>
  );
}

function PeopleGrid({
  people,
  comingSoon,
  moreComing,
  count,
}: {
  people: Person[];
  comingSoon?: boolean;
  moreComing?: boolean;
  count: number;
}) {
  if (comingSoon) {
    return (
      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="aspect-[4/5] rounded-3xl border border-dashed border-white/15 bg-white/5 p-5"
          >
            <div className="flex h-full flex-col justify-end">
              <p className="text-xs tracking-[0.2em] text-white/40 uppercase">
                In arrivo
              </p>
              <p className="mt-1 font-display text-lg">Annuncio a breve</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
      {people.map((person) => (
        <article
          key={person.name}
          className="group overflow-hidden rounded-3xl bg-white/5"
        >
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src={person.image}
              alt={person.name}
              fill
              className="object-cover object-top transition duration-500 group-hover:scale-105"
              sizes="(min-width: 1024px) 20vw, 50vw"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/50 to-transparent p-4">
              <p className="font-display text-base font-semibold leading-tight">
                {person.name}
              </p>
              <p className="mt-1 text-xs text-white/70">{person.role}</p>
            </div>
          </div>
        </article>
      ))}
      {moreComing ? <MoreComingCard /> : null}
    </div>
  );
}

function Facilitator({ person }: { person: Person }) {
  return (
    <section className="bg-paper py-20">
      <Container className="grid items-center gap-10 rounded-[2rem] bg-white p-6 shadow-sm md:grid-cols-[280px_1fr] md:p-10">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-[280px] overflow-hidden rounded-[1.5rem]">
          <Image
            src={person.image}
            alt={person.name}
            fill
            className="object-cover"
            sizes="280px"
          />
        </div>
        <div>
          <p className="text-xs tracking-[0.24em] text-blue uppercase">
            Facilitatore
          </p>
          <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            {person.name}
          </h2>
          <p className="mt-3 max-w-xl text-muted">{person.role}</p>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-ink-soft sm:text-base">
            Guida il weekend, tiene il ritmo delle 54 ore e aiuta i team a
            passare dall’idea al pitch senza perdere il filo della validazione.
          </p>
        </div>
      </Container>
    </section>
  );
}

function Prizes({ edition }: { edition: Edition }) {
  return (
    <section id="premi" className="scroll-mt-24 bg-ink py-24 text-paper sm:py-32">
      <SectionHeading
        invert
        eyebrow="Premi"
        title="In palio per i team vincitori"
        body={[
          "Supporto legale per costituire la startup, consulenze, coworking e sessioni con esperti: premi pensati per far partire davvero il progetto.",
          edition.prizesNote,
        ]
          .filter(Boolean)
          .join(" ")}
      />
      <Container className="mt-12 grid gap-5 lg:grid-cols-3">
        {edition.prizes.map((tier) => (
          <article
            key={tier.place}
            className={
              tier.rank === 1
                ? "rounded-[1.75rem] bg-blue p-7 text-white shadow-2xl shadow-blue/20 lg:-translate-y-3"
                : "rounded-[1.75rem] border border-white/10 bg-white/5 p-7"
            }
          >
            <p
              className={
                tier.rank === 1
                  ? "font-display text-2xl font-semibold tracking-tight"
                  : "font-display text-2xl font-semibold tracking-tight text-blue"
              }
            >
              {tier.place}
            </p>
            {edition.prizesComingSoon || tier.items.length === 0 ? (
              <p className="mt-6 text-sm text-white/60">In arrivo</p>
            ) : (
              <ul className="mt-6 space-y-3 text-sm leading-relaxed">
                {tier.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      className={
                        tier.rank === 1
                          ? "mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white"
                          : "mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue"
                      }
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </Container>
    </section>
  );
}

function Gallery({ edition }: { edition: Edition }) {
  return (
    <section className="py-24">
      <SectionHeading
        eyebrow="Atmosfera"
        title="Lo spirito del weekend"
        body="Pitch nella fortezza, team fino a tardi, mentori al tavolo, aperitivo della domenica."
      />
      <Container className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3">
        {edition.gallery.map((src) => (
          <div
            key={src}
            className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem]"
          >
            <Image
              src={src}
              alt="Momenti di Startup Weekend Savona"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 33vw, 50vw"
            />
          </div>
        ))}
      </Container>
    </section>
  );
}

function VideoRecap({ edition }: { edition: Edition }) {
  if (!edition.recapVideoUrl) return null;

  return (
    <section id="video" className="scroll-mt-24 bg-ink py-24 text-paper sm:py-32">
      <SectionHeading
        invert
        eyebrow="Video recap"
        title={`Rivivi Startup Weekend Savona ${edition.year}`}
        body="Tre giorni di idee, team, mentoring e pitch alla Fortezza del Priamar."
      />
      <Container className="mt-12">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[1.75rem] border border-white/10 bg-black shadow-2xl">
          <div className="aspect-video">
            <iframe
              className="h-full w-full"
              src={edition.recapVideoUrl}
              title={`Video recap Startup Weekend Savona ${edition.year}`}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
        <p className="mt-5 text-center text-sm text-white/50">
          Video ufficiale dell’edizione {edition.year}
        </p>
      </Container>
    </section>
  );
}

function PastEditionRecap({ edition }: { edition: Edition }) {
  if (!edition.isCurrent) return null;

  const latestPastEdition = pastEditions[0];

  return (
    <section className="pb-24">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 rounded-[2rem] border border-line bg-white p-8 sm:flex-row sm:items-center sm:p-10">
          <div>
            <p className="text-xs tracking-[0.24em] text-blue uppercase">
              Edizione {latestPastEdition.year}
            </p>
            <h2 className="font-display mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              Hai perso l’edizione {latestPastEdition.year}?
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
              Rivivi il weekend e scopri cosa succede a Startup Weekend Savona.
            </p>
          </div>
          <ButtonLink
            href={`${latestPastEdition.slug}#video`}
            variant="dark"
            className="!bg-ink !text-white hover:!bg-black"
          >
            Guarda il recap
            <ArrowIcon />
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

function Sponsors({ edition }: { edition: Edition }) {
  return (
    <section id="sponsor" className="bg-white py-24">
      <SectionHeading
        eyebrow="Ecosistema"
        title="Chi rende possibile il weekend"
      />
      <Container className="mt-14 space-y-14">
        {edition.sponsorGroups
          .filter((group) => !group.comingSoon && group.sponsors.length > 0)
          .map((group) => (
            <div key={group.title}>
              <h3 className="text-center text-xs tracking-[0.24em] text-blue uppercase">
                {group.title}
              </h3>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                {group.sponsors.map((sponsor) => (
                  <div
                    key={`${group.title}-${sponsor.name}-${sponsor.image}`}
                    className="grid h-24 w-[160px] place-items-center rounded-2xl border border-line bg-paper px-4"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={sponsor.image}
                      alt={sponsor.name}
                      className="max-h-14 max-w-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
      </Container>
    </section>
  );
}

function FaqSection() {
  return (
    <section id="faq" className="scroll-mt-24 py-24 sm:py-32">
      <SectionHeading eyebrow="FAQ" title="Tutto quello che serve sapere" />
      <Container className="mt-12">
        <Faq />
      </Container>
    </section>
  );
}

function FinalCta({
  edition,
  ticketHref,
}: {
  edition: Edition;
  ticketHref: string;
}) {
  return (
    <section className="pb-24">
      <Container>
        <div className="overflow-hidden rounded-[2rem] bg-ink px-8 py-14 text-center text-paper">
          <p className="text-xs tracking-[0.28em] text-blue uppercase">
            {edition.datesLabel}
          </p>
          <h2 className="font-display mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-5xl">
            {edition.isCurrent
              ? "Porta un’idea. Esci con una startup."
              : "La prossima edizione è nel 2026."}
          </h2>
          <div className="mt-8">
            <ButtonLink
              href={ticketHref}
              variant="accent"
              external={edition.isCurrent}
              trackEvent={edition.isCurrent ? TICKET_EVENT : undefined}
              trackPosition="final-cta"
            >
              {edition.ticketLabel}
              <ArrowIcon />
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
