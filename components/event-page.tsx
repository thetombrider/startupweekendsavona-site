import Image from "next/image";
import { aboutCopy, stats, valueProps } from "@/lib/content";
import type { Edition, Person } from "@/lib/types";
import { Agenda } from "./agenda";
import { Countdown } from "./countdown";
import { Faq } from "./faq";
import { Logo } from "./logo";
import { ArrowIcon, ButtonLink, Container, SectionHeading } from "./ui";

export function EventPage({ edition }: { edition: Edition }) {
  const ticketHref = edition.isCurrent ? edition.ticketUrl! : "/";

  return (
    <main>
      <Hero edition={edition} ticketHref={ticketHref} />
      <Marquee />
      <About edition={edition} />
      <ValueProps />
      <StatsBand />
      <AgendaSection edition={edition} ticketHref={ticketHref} />
      <PeopleSection edition={edition} />
      <Facilitator person={edition.facilitator} />
      <Prizes edition={edition} />
      {edition.isCurrent ? (
        <CountdownBand edition={edition} ticketHref={ticketHref} />
      ) : null}
      <Gallery edition={edition} />
      <Sponsors edition={edition} />
      <FaqSection />
      <FinalCta edition={edition} ticketHref={ticketHref} />
    </main>
  );
}

function Hero({
  edition,
  ticketHref,
}: {
  edition: Edition;
  ticketHref: string;
}) {
  return (
    <section className="grain relative isolate min-h-[100svh] overflow-hidden bg-ink text-paper">
      <Image
        src={edition.heroImage}
        alt="Partecipanti di Startup Weekend Savona"
        fill
        priority
        className="object-cover object-center opacity-40"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/55 to-ink" />
      <div className="pointer-events-none absolute -top-24 right-[-8%] font-display text-[38vw] leading-none font-bold text-white/[0.04] select-none">
        54
      </div>

      <Container className="relative flex min-h-[100svh] flex-col justify-end pb-16 pt-28 sm:pb-20">
        <div className="max-w-4xl">
          <Logo className="mb-8 h-14 w-auto sm:h-[4.5rem]" />
          {!edition.isCurrent ? (
            <p className="mb-5 inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs tracking-[0.2em] text-blue uppercase">
              Archivio · Edizione {edition.year}
            </p>
          ) : null}
          <p className="text-xs tracking-[0.32em] text-blue uppercase">
            {edition.kicker}
          </p>
          <h1 className="font-display mt-4 max-w-4xl text-4xl leading-[0.95] font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            {edition.headline}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/75">
            {edition.datesLabel} · {edition.venue}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={ticketHref} variant="accent" external={edition.isCurrent}>
              {edition.ticketLabel}
              <ArrowIcon />
            </ButtonLink>
            <ButtonLink href={edition.brochureUrl} variant="ghost" external>
              Download brochure
            </ButtonLink>
            <ButtonLink href={edition.mapUrl} variant="ghost" external>
              Come arrivare
            </ButtonLink>
          </div>
        </div>

        {edition.isCurrent ? (
          <div className="mt-14 max-w-xl">
            <p className="mb-3 text-xs tracking-[0.24em] text-white/50 uppercase">
              Manca
            </p>
            <Countdown target={edition.startAt} />
          </div>
        ) : null}
      </Container>
    </section>
  );
}

function Marquee() {
  const items = [
    "Pitch",
    "Team",
    "Build",
    "Mentor",
    "Validate",
    "Prototype",
    "Pitch finale",
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

function About({ edition }: { edition: Edition }) {
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
          <p className="mt-4 text-base leading-relaxed text-ink-soft sm:text-lg">
            Sarai tu il prossimo startupper ad avviare la propria attività?
          </p>
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
            className="rounded-[1.75rem] border border-line bg-white/60 p-7 transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <p className="font-mono text-xs tracking-[0.2em] text-blue">
              {item.index}
            </p>
            <h3 className="font-display mt-4 text-2xl font-semibold tracking-tight">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
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
          <ButtonLink href={ticketHref} variant="dark" external={edition.isCurrent}>
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
          title="Giuria e mentors"
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
            count={4}
          />
        </div>
        <div className="mt-16">
          <h3 className="text-xs tracking-[0.24em] text-blue uppercase">Mentors</h3>
          <PeopleGrid
            people={edition.mentors}
            comingSoon={edition.peopleComingSoon}
            count={8}
          />
        </div>
      </Container>
    </section>
  );
}

function PeopleGrid({
  people,
  comingSoon,
  count,
}: {
  people: Person[];
  comingSoon?: boolean;
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
    <section id="premi" className="scroll-mt-24 pb-24">
      <SectionHeading
        eyebrow="Premi"
        title="Cosa si porta a casa chi vince"
        body={edition.prizesNote}
      />
      <Container className="mt-12 grid gap-5 lg:grid-cols-3">
        {edition.prizes.map((tier) => (
          <article
            key={tier.place}
            className={
              tier.rank === 1
                ? "rounded-[1.75rem] bg-ink p-7 text-paper lg:-translate-y-3"
                : "rounded-[1.75rem] border border-line bg-white p-7"
            }
          >
            <p
              className={
                tier.rank === 1
                  ? "text-xs tracking-[0.22em] text-blue uppercase"
                  : "text-xs tracking-[0.22em] text-blue uppercase"
              }
            >
              {tier.place}
            </p>
            {edition.prizesComingSoon || tier.items.length === 0 ? (
              <p className="mt-6 text-sm text-muted">Coming soon…</p>
            ) : (
              <ul className="mt-6 space-y-3 text-sm leading-relaxed">
                {tier.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      className={
                        tier.rank === 1
                          ? "mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue"
                          : "mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink"
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

function CountdownBand({
  edition,
  ticketHref,
}: {
  edition: Edition;
  ticketHref: string;
}) {
  return (
    <section className="bg-ink py-16 text-paper">
      <Container className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
        <div>
          <p className="text-xs tracking-[0.24em] text-blue uppercase">
            {edition.datesLabel}
          </p>
          <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
            I posti sono limitati. Il Priamar no.
          </h2>
          <div className="mt-8">
            <ButtonLink href={ticketHref} variant="accent" external>
              {edition.ticketLabel}
              <ArrowIcon />
            </ButtonLink>
          </div>
        </div>
        <Countdown target={edition.startAt} />
      </Container>
    </section>
  );
}

function Gallery({ edition }: { edition: Edition }) {
  return (
    <section className="py-24">
      <SectionHeading
        eyebrow="Atmosphere"
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

function Sponsors({ edition }: { edition: Edition }) {
  return (
    <section id="sponsor" className="bg-white py-24">
      <SectionHeading
        eyebrow="Ecosistema"
        title="Chi rende possibile il weekend"
      />
      <Container className="mt-14 space-y-14">
        {edition.sponsorGroups.map((group) => (
          <div key={group.title}>
            <h3 className="text-center text-xs tracking-[0.24em] text-blue uppercase">
              {group.title}
            </h3>
            {group.comingSoon ? (
              <p className="mt-6 text-center text-sm text-muted">
                Annuncio in arrivo
              </p>
            ) : (
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
            )}
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
            <ButtonLink href={ticketHref} variant="accent" external={edition.isCurrent}>
              {edition.ticketLabel}
              <ArrowIcon />
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
