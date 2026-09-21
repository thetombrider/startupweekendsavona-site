import { EventPage } from "@/components/event-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { edition2026 } from "@/lib/content";

export default function Home() {
  return (
    <>
      <SiteHeader edition={edition2026} overlay />
      <EventPage edition={edition2026} />
      <SiteFooter edition={edition2026} />
    </>
  );
}
