import { EventPage } from "@/components/event-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { edition2026, site } from "@/lib/content";

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: `Techstars Startup Weekend Savona ${edition2026.year}`,
  description: site.description,
  startDate: edition2026.startAt,
  endDate: "2026-12-06T21:00:00+01:00",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  inLanguage: "it",
  url: site.url,
  image: [`${site.url}${edition2026.heroImage}`],
  isAccessibleForFree: false,
  location: {
    "@type": "Place",
    name: "Fortezza del Priamar",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Corso Giuseppe Mazzini, 1",
      postalCode: "17100",
      addressLocality: "Savona",
      addressRegion: "SV",
      addressCountry: "IT",
    },
  },
  organizer: {
    "@type": "Organization",
    name: site.organizer,
    url: site.organizerUrl,
    email: site.email,
  },
  offers: (edition2026.tickets ?? [])
    .filter((tier) => !tier.hiddenUntilStart)
    .map((tier) => ({
      "@type": "Offer",
      name: tier.name,
      price: tier.price,
      priceCurrency: "EUR",
      availability: "https://schema.org/LimitedAvailability",
      validFrom: tier.startAt,
      validThrough: tier.endAt,
      url: edition2026.ticketUrl,
    })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(eventJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <SiteHeader edition={edition2026} overlay />
      <EventPage edition={edition2026} />
      <SiteFooter edition={edition2026} />
      <div className="h-20 bg-ink sm:hidden" aria-hidden="true" />
    </>
  );
}
